# SSL Certificate Structure for FAPI 2.0 mTLS

This directory contains the SSL certificate infrastructure for the Swiss Open API Kundenbeziehung implementation, providing FAPI 2.0 compliant mTLS authentication.

## Directory Structure

```
ssl/
├── README.md                     # This file
├── generate-certificates.sh      # Certificate generation script
├── certificate-info.txt          # Generated certificate information
├── ca/                          # Certificate Authority
│   ├── ca.key                   # CA private key (KEEP SECURE!)
│   ├── ca.crt                   # CA certificate
│   └── ca.conf                  # CA configuration
├── server/                      # Server certificates
│   ├── server.key               # Server private key
│   ├── server.crt               # Server certificate
│   └── server.conf              # Server certificate configuration
└── clients/                     # Client certificates for mTLS
    ├── banking-client-001/      # Demo banking client
    │   ├── banking-client-001.key
    │   ├── banking-client-001.crt
    │   ├── banking-client-001.p12
    │   ├── banking-client-001.conf
    │   └── p12-password.txt
    ├── insurance-client-001/    # Demo insurance client
    └── government-client-001/   # Demo government client
```

## Quick Start

### 1. Generate Certificates

Run the certificate generation script to create all necessary certificates:

```bash
cd /api/ssl
./generate-certificates.sh
```

This will generate:
- Certificate Authority (CA) certificate and private key
- Server certificate for HTTPS/mTLS (valid for api.kundenbeziehung.ch)
- Demo client certificates for testing mTLS authentication

### 2. Verify Certificate Generation

Check that all certificates were created successfully:

```bash
# Verify CA certificate
openssl x509 -in ca/ca.crt -text -noout | head -20

# Verify server certificate
openssl x509 -in server/server.crt -text -noout | head -20
openssl verify -CAfile ca/ca.crt server/server.crt

# Verify client certificate (example)
openssl verify -CAfile ca/ca.crt clients/banking-client-001/banking-client-001.crt
```

### 3. Configure nginx

The nginx.conf already references the certificates in the correct locations:
- Server certificate: `/etc/nginx/ssl/server.crt`
- Server private key: `/etc/nginx/ssl/server.key`
- CA certificate: `/etc/nginx/ssl/ca.crt`

### 4. Test mTLS Connection

Test the mTLS setup with a client certificate:

```bash
# Test HTTPS connection with client certificate
openssl s_client -connect localhost:443 \
  -cert clients/banking-client-001/banking-client-001.crt \
  -key clients/banking-client-001/banking-client-001.key \
  -CAfile ca/ca.crt \
  -servername api.kundenbeziehung.ch
```

## FAPI 2.0 Compliance Features

### Security Standards Met

- **mTLS Client Authentication**: Client certificates with `clientAuth` extended key usage
- **Strong Cryptography**: RSA 2048-bit minimum, SHA-256 signatures
- **Certificate Binding**: JWK thumbprint binding for DPoP tokens
- **Proper Key Management**: Secure private key storage with restricted permissions

### Certificate Validation

All certificates include proper extensions for FAPI 2.0:
- Server certificates: `serverAuth` extended key usage, SAN for multiple domains
- Client certificates: `clientAuth` extended key usage
- Proper certificate chain validation through CA

### Integration with OAuth 2.1/OIDC

The certificates work with the OAuth implementation for:
- mTLS client authentication in token endpoint
- Certificate-bound access tokens (DPoP)
- Client certificate validation middleware
- Security audit logging

## Production Deployment

### Security Best Practices

1. **CA Private Key Security**
   - Store CA private key offline in production
   - Use hardware security modules (HSM) for CA operations
   - Implement proper key ceremony procedures

2. **Certificate Management**
   - Monitor certificate expiration dates
   - Implement automated renewal procedures
   - Use certificate transparency monitoring
   - Plan certificate revocation procedures

3. **Client Certificate Distribution**
   - Replace demo certificates with real institution certificates
   - Use secure distribution channels for client certificates
   - Implement certificate enrollment protocols

### Environment-Specific Configuration

#### Development
```bash
# Use generated demo certificates
# Self-signed CA is acceptable
# Client certificates for testing
```

#### Staging
```bash
# Use staging CA or intermediate CA
# Mirror production certificate structure
# Test certificate renewal procedures
```

#### Production
```bash
# Use production CA with offline root
# Real institution client certificates
# Proper DNS names and IP addresses
# Certificate monitoring and alerting
```

## Integration with Docker

The certificates are mounted into the nginx container:

```yaml
# docker-compose.yaml excerpt
nginx:
  volumes:
    - ./ssl:/etc/nginx/ssl:ro
```

This makes certificates available at:
- `/etc/nginx/ssl/server.crt`
- `/etc/nginx/ssl/server.key`
- `/etc/nginx/ssl/ca.crt`

## Troubleshooting

### Common Issues

1. **Certificate Permission Errors**
   ```bash
   # Fix private key permissions
   chmod 600 ssl/server/server.key
   chmod 600 ssl/ca/ca.key
   chmod 600 ssl/clients/*/*.key
   ```

2. **Certificate Verification Failures**
   ```bash
   # Check certificate chain
   openssl verify -CAfile ca/ca.crt server/server.crt
   
   # Check certificate details
   openssl x509 -in server/server.crt -text -noout
   ```

3. **nginx SSL Errors**
   ```bash
   # Test nginx configuration
   nginx -t
   
   # Check certificate paths in nginx.conf
   # Ensure certificates are readable by nginx user
   ```

4. **Client Certificate Issues**
   ```bash
   # Verify client certificate
   openssl x509 -in clients/banking-client-001/banking-client-001.crt -purpose
   
   # Check extended key usage includes clientAuth
   openssl x509 -in clients/banking-client-001/banking-client-001.crt -text | grep -A5 "Extended Key Usage"
   ```

### Certificate Validation Commands

```bash
# CA Certificate Info
openssl x509 -in ca/ca.crt -noout -subject -issuer -dates

# Server Certificate Chain
openssl verify -CAfile ca/ca.crt -verbose server/server.crt

# Client Certificate Purpose
openssl x509 -in clients/banking-client-001/banking-client-001.crt -noout -purpose

# Certificate Fingerprint (for JWK thumbprint)
openssl x509 -in clients/banking-client-001/banking-client-001.crt -noout -fingerprint -sha256
```

## Related Documentation

- [nginx.conf](../nginx.conf) - Nginx configuration with mTLS settings
- [FAPI 2.0 Implementation](../src/middleware/mtls.js) - mTLS middleware
- [Security Middleware](../src/middleware/security.js) - FAPI compliance validation
- [OAuth Routes](../src/routes/oauth.js) - OAuth 2.1/OIDC implementation

## Support

For certificate-related issues:
1. Check certificate-info.txt for detailed certificate information
2. Verify certificate permissions and paths
3. Test certificate chain validation
4. Review nginx error logs for SSL-related errors
5. Validate FAPI 2.0 compliance requirements