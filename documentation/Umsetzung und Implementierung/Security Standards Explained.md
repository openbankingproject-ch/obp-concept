# Implemented Security Standards Explained

## Overview

This document explains our implementation of the **FAPI 2.0 Security Profile** for the Swiss Open API Kundenbeziehung project. If you're not very familiar with coding and new to API security standards, this guide will help you understand what we've built and why each component is important.

## What is FAPI 2.0?

**FAPI (Financial-grade API) 2.0** is a security standard developed by the OpenID Foundation specifically for high-value, high-risk scenarios like financial services. Think of it as a set of strict security rules that APIs must follow when handling sensitive financial data.

### Why FAPI 2.0 Matters

In traditional web applications, you might authenticate users with a simple username/password. But when banks and financial institutions exchange customer data, the stakes are much higher:

- **Money is involved**: Unauthorized access could lead to financial theft
- **Personal data**: Sensitive customer information needs protection
- **Regulatory compliance**: Financial services must meet strict legal requirements
- **Trust**: A security breach could destroy institutional trust

FAPI 2.0 provides a framework that addresses these concerns with multiple layers of security.

## Core Concepts Explained

### 1. OAuth 2.1 - The Foundation

**What it is**: OAuth 2.1 is like a valet key system for APIs. Instead of giving someone your house key (password), you give them a temporary key (token) that only opens specific doors (scopes) for a limited time.

**In our implementation**:
```javascript
// Example: A token that allows reading customer data for 15 minutes
{
  "sub": "customer-123",           // Who this token represents
  "scope": "customer:read",        // What they're allowed to do
  "exp": 1634567890,              // When this expires (15 minutes)
  "iss": "our-api-server"         // Who issued this token
}
```

### 2. PAR (Pushed Authorization Requests) - Secure Parameter Transmission

**The Problem**: In traditional OAuth, sensitive parameters are sent through the browser URL, which can be logged, cached, or intercepted.

**The Solution**: PAR lets clients securely "push" their authorization request to the server first, then reference it with a secure URI.

**How it works**:
1. Client sends sensitive data directly to our `/par` endpoint (secure server-to-server)
2. Server returns a secure `request_uri` that expires in 60 seconds
3. Client uses this URI in the authorization flow (no sensitive data in URLs)

**Our implementation** (`src/routes/par.js`):
```javascript
// Client submits authorization request securely
POST /par
{
  "client_id": "CH-BANK-001",
  "scope": "customer:read",
  "redirect_uri": "https://client.com/callback",
  "code_challenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
}

// Server responds with secure URI
{
  "request_uri": "urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c",
  "expires_in": 60
}
```

### 3. DPoP (Demonstrating Proof-of-Possession) - Token Binding

**The Problem**: Traditional OAuth tokens are like cash - whoever has them can use them. If intercepted, they can be replayed by attackers.

**The Solution**: DPoP binds tokens to specific clients using cryptographic proof. It's like having a credit card that only works with your signature.

**How it works**:
1. Client generates a public/private key pair
2. For each API request, client creates a signed "proof" that includes:
   - The HTTP method and URL they're calling
   - A hash of their access token
   - A timestamp
3. Server verifies the proof matches the client's registered public key

**Our implementation** (`src/middleware/auth.js`):
```javascript
// Validate DPoP proof for each request
const validateDPoPProof = async (dpopProof, accessToken, httpMethod, httpUri) => {
  // 1. Extract public key from proof
  // 2. Verify signature matches
  // 3. Check timestamp is recent
  // 4. Verify HTTP method/URI match
  // 5. Confirm token binding
}
```

### 4. Enhanced Client Authentication - Proving Identity

**The Challenge**: How do we know the client making requests is actually who they claim to be?

**Two Options in FAPI 2.0**:

#### Option A: mTLS (Mutual TLS)
- Both client and server present certificates
- Like having both parties show ID cards before talking
- Built into the transport layer (HTTPS with client certificates)

#### Option B: private_key_jwt
- Client signs a JWT with their private key
- Server verifies using the client's registered public key
- More flexible than mTLS, works through proxies and load balancers

**Our implementation** (`src/middleware/mtls.js`):
```javascript
const mtlsMiddleware = async (req, res, next) => {
  // Try mTLS first
  const clientCert = extractClientCertificate(req);
  if (clientCert && validateClientCertificate(clientCert, clientId)) {
    // mTLS successful
  } else {
    // Try private_key_jwt
    const jwtAssertion = req.body?.client_assertion;
    if (jwtAssertion && validatePrivateKeyJWT(jwtAssertion, clientId)) {
      // JWT authentication successful
    }
  }
}
```

### 5. PKCE (Proof Key for Code Exchange) - Preventing Code Interception

**The Problem**: Authorization codes sent through browser redirects could be intercepted.

**The Solution**: PKCE creates a cryptographic link between the initial request and the token exchange.

**How it works**:
1. Client generates a random `code_verifier`
2. Creates a `code_challenge` by hashing the verifier
3. Sends the challenge with authorization request
4. When exchanging code for token, sends the original verifier
5. Server verifies: hash(verifier) === challenge

This ensures only the original client can exchange the authorization code.

## Security Enhancements

### JWT Algorithm Restrictions

**Why**: Some JWT algorithms have known vulnerabilities or are easier to crack.

**FAPI 2.0 Requirements**: Only these algorithms are allowed:
- **PS256**: RSA with SHA-256 and PSS padding (very secure)
- **ES256**: Elliptic Curve with SHA-256 (efficient and secure)
- **EdDSA**: Edwards Curve (modern, very secure)

**Our implementation**:
```javascript
// Strict algorithm validation
const allowedAlgorithms = ['PS256', 'ES256', 'EdDSA'];
const decoded = jwt.verify(token, publicKey, {
  algorithms: allowedAlgorithms
});
```

### Short Token Lifetimes

**Traditional approach**: Tokens valid for hours or days
**FAPI 2.0 approach**: Much shorter lifetimes (15 minutes in our implementation)

**Why**: Shorter lifetimes limit damage if tokens are compromised. The inconvenience is offset by secure refresh mechanisms.

## File-by-File Breakdown

### `/api/package.json`
**Added dependencies**:
- `jose`: Modern JWT library with FAPI 2.0 algorithm support
- `dpop`: DPoP proof validation
- `pkce-challenge`: PKCE implementation
- `node-rsa`: RSA key operations

### `/api/src/routes/par.js` (NEW)
**Purpose**: Implements the PAR endpoint for secure authorization request submission
**Key features**:
- Validates client authentication (mTLS or private_key_jwt)
- Stores authorization parameters securely
- Returns short-lived request URIs (60 seconds max)
- Prevents parameter tampering

### `/api/src/middleware/auth.js` (ENHANCED)
**New features**:
- DPoP proof validation for each request
- JWT algorithm restriction to FAPI 2.0 approved ones
- Token binding verification
- Enhanced error handling with specific FAPI 2.0 error codes

### `/api/src/middleware/mtls.js` (ENHANCED)
**New features**:
- Dual authentication support (mTLS + private_key_jwt)
- Enhanced certificate validation (key strength, validity periods)
- FAPI 2.0 compliant client authentication flow
- Detailed logging for security auditing

### `/api/openapi.yaml` (UPDATED)
**Changes**:
- Security schemes updated for FAPI 2.0
- PAR endpoint documentation added
- DPoP and private_key_jwt authentication documented
- All examples updated for FAPI 2.0 compliance

## Why These Choices?

### 1. **Defense in Depth**
Instead of relying on one security mechanism, we layer multiple:
- Client authentication (who are you?)
- Token binding (prove you're still you)
- Request integrity (confirm this request is authentic)
- Time limits (minimize exposure windows)

### 2. **Industry Standards**
We don't invent our own security - we use battle-tested standards:
- FAPI 2.0: Formally verified by security researchers
- OAuth 2.1: Evolved from years of real-world usage
- JWT: Industry standard for secure token format

### 3. **Flexibility**
Our implementation supports multiple authentication methods:
- mTLS for maximum security
- private_key_jwt for environments where mTLS isn't practical
- DPoP as an alternative to mTLS for token binding

### 4. **Compliance**
Financial institutions must meet regulatory requirements:
- GDPR/DSG for data protection
- Banking regulations (FINMA in Switzerland)
- Open Banking standards

## Common Security Patterns

### 1. **Validate Everything**
```javascript
// Never trust input - validate every parameter
const { error, value } = schema.validate(req.body);
if (error) {
  return res.status(400).json({
    error: 'invalid_request',
    error_description: error.details[0].message
  });
}
```

### 2. **Fail Securely**
```javascript
// Don't reveal why authentication failed
catch (error) {
  logger.warn('Authentication failed', { error: error.message });
  return res.status(401).json({
    error: 'unauthorized',
    error_description: 'Authentication failed'
    // Don't tell attacker specific reason
  });
}
```

### 3. **Time-based Security**
```javascript
// Check timestamps to prevent replay attacks
if (payload.iat > now + 60 || payload.iat < now - 60) {
  throw new Error('Request timestamp out of acceptable range');
}
```

## Integration Example

Here's how a client would integrate with our FAPI 2.0 API:

```javascript
// 1. Create PAR request
const parResponse = await fetch('/par', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // mTLS certificate automatically used by HTTP client
  body: new URLSearchParams({
    client_id: 'CH-BANK-001',
    response_type: 'code',
    scope: 'customer:read',
    redirect_uri: 'https://mybank.com/callback',
    code_challenge: generateCodeChallenge(),
    code_challenge_method: 'S256'
  })
});

// 2. Use request_uri in authorization
const { request_uri } = await parResponse.json();
const authUrl = `https://auth-server.com/authorize?request_uri=${request_uri}`;

// 3. Make API requests with DPoP
const dpopProof = await generateDPoPProof({
  method: 'GET',
  url: 'https://api.com/customer/data',
  accessToken: token
});

const response = await fetch('/customer/data', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'DPoP': dpopProof
  }
});
```

## Benefits of This Implementation

### For Developers:
- **Clear separation of concerns**: Each middleware handles one aspect of security
- **Comprehensive logging**: Easy to debug and audit
- **Standards compliance**: No need to invent custom security
- **Future-proof**: Built on latest specifications

### For Financial Institutions:
- **Regulatory compliance**: Meets current and upcoming requirements
- **Risk reduction**: Multiple layers of security
- **Audit trail**: Complete logging of all security events
- **Interoperability**: Works with other FAPI 2.0 compliant systems

### For End Users:
- **Better security**: Their data is protected by bank-grade security
- **Seamless experience**: Security happens transparently
- **Privacy**: Granular consent management
- **Trust**: Knowing their data is handled according to strict standards

## Testing and Validation

Our implementation includes comprehensive testing for:
- **Token validation**: Ensuring only valid tokens are accepted
- **DPoP proof verification**: Confirming cryptographic proofs
- **Client authentication**: Verifying certificate and JWT validation
- **Error handling**: Ensuring secure failure modes
- **Performance**: Confirming security doesn't impact usability

## Conclusion

This FAPI 2.0 implementation represents the current state-of-the-art in API security for financial services. By layering multiple security mechanisms and following formally verified standards, we create a system that protects sensitive financial data while enabling innovation in open banking.

The complexity is justified by the high-value, high-risk nature of financial data exchange. Each component serves a specific purpose in creating a comprehensive security framework that banks and their customers can trust.