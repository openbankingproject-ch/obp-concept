#!/bin/bash
# Production Certificate Generation Script for FAPI 2.0 mTLS
# Swiss Open API Kundenbeziehung - Production SSL Certificate Setup

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SSL_DIR="$SCRIPT_DIR"
CA_DIR="$SSL_DIR/ca"
SERVER_DIR="$SSL_DIR/server"
CLIENTS_DIR="$SSL_DIR/clients"

# Certificate validity periods (adjust for production)
CA_DAYS=3650      # 10 years for CA
SERVER_DAYS=365   # 1 year for server certificates
CLIENT_DAYS=365   # 1 year for client certificates

# Certificate subject information (customize for your organization)
COUNTRY="CH"
STATE="Zurich"
CITY="Zurich"
ORG="Swiss Open API Kundenbeziehung"
OU="Production Infrastructure"
CA_CN="Swiss OAK Production CA"
SERVER_CN="api.kundenbeziehung.ch"

echo "=== Swiss Open API Kundenbeziehung - FAPI 2.0 Certificate Generation ==="
echo "WARNING: This script generates production certificates for mTLS authentication."
echo "Review all certificate settings before using in production environment."
echo ""

# Function to generate strong random password
generate_password() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-25
}

# Generate CA private key and certificate
echo "1. Generating Certificate Authority (CA)..."
CA_KEY="$CA_DIR/ca.key"
CA_CERT="$CA_DIR/ca.crt"
CA_CONFIG="$CA_DIR/ca.conf"

# Create CA configuration
cat > "$CA_CONFIG" << EOF
[req]
default_bits = 4096
prompt = no
distinguished_name = req_distinguished_name
x509_extensions = v3_ca

[req_distinguished_name]
C=$COUNTRY
ST=$STATE
L=$CITY
O=$ORG
OU=$OU Certificate Authority
CN=$CA_CN

[v3_ca]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical,CA:true,pathlen:0
keyUsage = critical,digitalSignature,cRLSign,keyCertSign
EOF

# Generate CA private key (4096-bit RSA)
openssl genrsa -out "$CA_KEY" 4096
chmod 600 "$CA_KEY"

# Generate CA certificate
openssl req -new -x509 -days $CA_DAYS -key "$CA_KEY" -out "$CA_CERT" -config "$CA_CONFIG"
chmod 644 "$CA_CERT"

echo "   ✓ CA certificate generated: $CA_CERT"
echo "   ✓ CA private key: $CA_KEY (secured with 600 permissions)"

# Generate server certificate and private key
echo ""
echo "2. Generating Server Certificate for HTTPS/mTLS..."
SERVER_KEY="$SERVER_DIR/server.key"
SERVER_CERT="$SERVER_DIR/server.crt"
SERVER_CSR="$SERVER_DIR/server.csr"
SERVER_CONFIG="$SERVER_DIR/server.conf"

# Create server certificate configuration with SAN
cat > "$SERVER_CONFIG" << EOF
[req]
default_bits = 2048
prompt = no
distinguished_name = req_distinguished_name
req_extensions = v3_req

[req_distinguished_name]
C=$COUNTRY
ST=$STATE
L=$CITY
O=$ORG
OU=$OU Server Certificate
CN=$SERVER_CN

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation,digitalSignature,keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = api.kundenbeziehung.ch
DNS.2 = *.kundenbeziehung.ch
DNS.3 = localhost
IP.1 = 127.0.0.1
EOF

# Generate server private key
openssl genrsa -out "$SERVER_KEY" 2048
chmod 600 "$SERVER_KEY"

# Generate server certificate signing request
openssl req -new -key "$SERVER_KEY" -out "$SERVER_CSR" -config "$SERVER_CONFIG"

# Sign server certificate with CA
openssl x509 -req -in "$SERVER_CSR" -CA "$CA_CERT" -CAkey "$CA_KEY" -CAcreateserial \
    -out "$SERVER_CERT" -days $SERVER_DAYS -extensions v3_req -extfile "$SERVER_CONFIG"

chmod 644 "$SERVER_CERT"
rm "$SERVER_CSR"  # Clean up CSR file

echo "   ✓ Server certificate generated: $SERVER_CERT"
echo "   ✓ Server private key: $SERVER_KEY (secured with 600 permissions)"

# Generate client certificates for demo/test purposes
echo ""
echo "3. Generating Client Certificates for mTLS Authentication..."

# List of demo clients to generate certificates for
DEMO_CLIENTS=("banking-client-001" "insurance-client-001" "government-client-001")

for CLIENT_ID in "${DEMO_CLIENTS[@]}"; do
    CLIENT_DIR="$CLIENTS_DIR/$CLIENT_ID"
    mkdir -p "$CLIENT_DIR"
    
    CLIENT_KEY="$CLIENT_DIR/$CLIENT_ID.key"
    CLIENT_CERT="$CLIENT_DIR/$CLIENT_ID.crt"
    CLIENT_CSR="$CLIENT_DIR/$CLIENT_ID.csr"
    CLIENT_CONFIG="$CLIENT_DIR/$CLIENT_ID.conf"
    CLIENT_P12="$CLIENT_DIR/$CLIENT_ID.p12"
    
    # Create client certificate configuration
    cat > "$CLIENT_CONFIG" << EOF
[req]
default_bits = 2048
prompt = no
distinguished_name = req_distinguished_name
req_extensions = v3_req

[req_distinguished_name]
C=$COUNTRY
ST=$STATE
L=$CITY
O=$ORG
OU=$OU Client Certificate
CN=$CLIENT_ID

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation,digitalSignature,keyEncipherment
extendedKeyUsage = clientAuth
EOF
    
    # Generate client private key
    openssl genrsa -out "$CLIENT_KEY" 2048
    chmod 600 "$CLIENT_KEY"
    
    # Generate client certificate signing request
    openssl req -new -key "$CLIENT_KEY" -out "$CLIENT_CSR" -config "$CLIENT_CONFIG"
    
    # Sign client certificate with CA
    openssl x509 -req -in "$CLIENT_CSR" -CA "$CA_CERT" -CAkey "$CA_KEY" -CAcreateserial \
        -out "$CLIENT_CERT" -days $CLIENT_DAYS -extensions v3_req -extfile "$CLIENT_CONFIG"
    
    chmod 644 "$CLIENT_CERT"
    
    # Generate client certificate in PKCS#12 format for easy distribution
    CLIENT_P12_PASSWORD=$(generate_password)
    openssl pkcs12 -export -out "$CLIENT_P12" -inkey "$CLIENT_KEY" -in "$CLIENT_CERT" \
        -certfile "$CA_CERT" -name "$CLIENT_ID" -passout "pass:$CLIENT_P12_PASSWORD"
    
    chmod 600 "$CLIENT_P12"
    
    # Create password file for PKCS#12
    echo "$CLIENT_P12_PASSWORD" > "$CLIENT_DIR/p12-password.txt"
    chmod 600 "$CLIENT_DIR/p12-password.txt"
    
    # Clean up CSR file
    rm "$CLIENT_CSR"
    
    echo "   ✓ Client certificate for $CLIENT_ID generated"
    echo "     - Certificate: $CLIENT_CERT"
    echo "     - Private key: $CLIENT_KEY"
    echo "     - PKCS#12 bundle: $CLIENT_P12"
    echo "     - PKCS#12 password: stored in $CLIENT_DIR/p12-password.txt"
done

# Copy CA certificate to nginx ssl directory (referenced in nginx.conf)
mkdir -p "$SSL_DIR/../ssl"
cp "$CA_CERT" "$SSL_DIR/../ssl/ca.crt"
cp "$SERVER_CERT" "$SSL_DIR/../ssl/server.crt"
cp "$SERVER_KEY" "$SSL_DIR/../ssl/server.key"

echo ""
echo "4. Setting up nginx SSL directory..."
echo "   ✓ Certificates copied to /api/ssl/ for nginx configuration"

# Generate DH parameters for enhanced security
echo ""
echo "5. Generating DH parameters for enhanced TLS security..."
DH_PARAMS="$SSL_DIR/../ssl/dhparam.pem"
openssl dhparam -out "$DH_PARAMS" 2048
chmod 644 "$DH_PARAMS"
echo "   ✓ DH parameters generated: $DH_PARAMS"

# Generate certificate information file
echo ""
echo "6. Generating certificate information and validation guide..."
CERT_INFO="$SSL_DIR/certificate-info.txt"

cat > "$CERT_INFO" << EOF
Swiss Open API Kundenbeziehung - Production Certificate Information
================================================================

Generated on: $(date)
Certificate validity: $SERVER_DAYS days (server), $CLIENT_DAYS days (clients)

Certificate Authority (CA):
- Certificate: $CA_CERT
- Private Key: $CA_KEY (KEEP SECURE!)
- Subject: CN=$CA_CN, O=$ORG, C=$COUNTRY

Server Certificate:
- Certificate: $SERVER_CERT
- Private Key: $SERVER_KEY (KEEP SECURE!)
- Subject: CN=$SERVER_CN, O=$ORG, C=$COUNTRY
- Valid for: api.kundenbeziehung.ch, *.kundenbeziehung.ch, localhost

Client Certificates:
EOF

for CLIENT_ID in "${DEMO_CLIENTS[@]}"; do
    cat >> "$CERT_INFO" << EOF
- $CLIENT_ID:
  * Certificate: $CLIENTS_DIR/$CLIENT_ID/$CLIENT_ID.crt
  * Private Key: $CLIENTS_DIR/$CLIENT_ID/$CLIENT_ID.key
  * PKCS#12 Bundle: $CLIENTS_DIR/$CLIENT_ID/$CLIENT_ID.p12
  * PKCS#12 Password: See $CLIENTS_DIR/$CLIENT_ID/p12-password.txt

EOF
done

cat >> "$CERT_INFO" << EOF

Certificate Validation Commands:
===============================

Verify CA certificate:
openssl x509 -in $CA_CERT -text -noout

Verify server certificate:
openssl x509 -in $SERVER_CERT -text -noout
openssl verify -CAfile $CA_CERT $SERVER_CERT

Verify client certificate (example with banking-client-001):
openssl x509 -in $CLIENTS_DIR/banking-client-001/banking-client-001.crt -text -noout
openssl verify -CAfile $CA_CERT $CLIENTS_DIR/banking-client-001/banking-client-001.crt

Test mTLS connection:
openssl s_client -connect api.kundenbeziehung.ch:443 -cert $CLIENTS_DIR/banking-client-001/banking-client-001.crt -key $CLIENTS_DIR/banking-client-001/banking-client-001.key -CAfile $CA_CERT

FAPI 2.0 Compliance Notes:
=========================
- Server certificate uses RSA 2048-bit key (minimum for FAPI 2.0)
- Client certificates support clientAuth extended key usage
- All certificates signed with SHA-256
- mTLS client authentication configured in nginx.conf
- Certificate binding validation implemented in application layer

Security Reminders:
==================
1. Keep all private keys (.key files) secure and restrict access (600 permissions)
2. Regularly rotate certificates before expiration
3. Monitor certificate validity in production
4. Use proper certificate revocation procedures if compromise is suspected
5. Store CA private key offline in production environments
6. Use hardware security modules (HSM) for production CA operations

Production Deployment Notes:
===========================
- Replace demo client certificates with actual institution certificates
- Use proper DNS names and IP addresses in server certificate SAN
- Implement certificate monitoring and automated renewal
- Configure proper certificate chain validation in load balancers
- Set up certificate transparency monitoring for issued certificates
EOF

echo "   ✓ Certificate information saved: $CERT_INFO"

echo ""
echo "=== Certificate Generation Complete ==="
echo ""
echo "Important Security Reminders:"
echo "• All private keys have been secured with 600 permissions"
echo "• CA private key must be kept extremely secure - consider offline storage"
echo "• Review and customize certificate subjects for your production environment"
echo "• Replace demo client certificates with real institution certificates"
echo "• Monitor certificate expiration dates and implement renewal procedures"
echo ""
echo "Next Steps:"
echo "1. Review generated certificates with: cat $CERT_INFO"
echo "2. Test nginx configuration with generated certificates"
echo "3. Configure client applications with appropriate client certificates"
echo "4. Implement certificate monitoring and renewal automation"
echo ""
echo "For FAPI 2.0 compliance testing, use the generated client certificates"
echo "with your OAuth 2.1/OIDC flows and verify mTLS authentication works correctly."
echo ""