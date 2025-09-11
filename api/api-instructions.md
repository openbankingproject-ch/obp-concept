# Swiss Open API Kundenbeziehung - API Instructions

Comprehensive usage guide for developers, system integrators, and business stakeholders implementing the Swiss Open API Kundenbeziehung framework.

## Table of Contents

1. [Getting Started](#getting-started)
2. [API Usage Guide](#api-usage-guide)
3. [Running Demos](#running-demos)
4. [Testing and Verification](#testing-and-verification)
5. [Production Deployment](#production-deployment)
6. [Real-World Integration Examples](#real-world-integration-examples)
7. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

**System Requirements**:
- Node.js 16+ or higher
- Docker and Docker Compose
- npm or yarn package manager
- Git for version control

**Technical Knowledge**:
- RESTful API concepts
- OAuth 2.1/OIDC authentication flows
- JSON Web Tokens (JWT)
- Basic cryptography concepts (mTLS, digital signatures)

### Installation and Setup

#### Option 1: Docker Deployment (Recommended)

```bash
# Clone the repository
git clone https://github.com/swiss-open-banking/obp-concept.git
cd obp-concept/api

# Setup environment configuration
cp env-config.sh.example env-config.sh
# Edit env-config.sh with your specific configuration

# Build and start all services
docker-compose up -d

# Verify installation
curl http://localhost:3000/health
```

#### Option 2: Local Development Setup

```bash
# Clone and navigate
git clone https://github.com/swiss-open-banking/obp-concept.git
cd obp-concept/api

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env file with your configuration

# Initialize database (if using local database)
npm run db:setup

# Start development server
npm run dev

# Verify installation
curl http://localhost:3000/health
```

#### Option 3: Production Kubernetes Deployment

```bash
# Deploy to Kubernetes cluster
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/config/
kubectl apply -f k8s/secrets/
kubectl apply -f k8s/deployments/
kubectl apply -f k8s/services/
kubectl apply -f k8s/ingress/

# Verify deployment
kubectl get pods -n obp-api
kubectl get services -n obp-api
```

### Initial Configuration

#### Environment Configuration

Edit your environment configuration file:

```bash
# Core API Configuration
API_PORT=3000
API_HOST=0.0.0.0
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=obp_kundenbeziehung
DB_USER=obp_user
DB_PASSWORD=secure_password

# OAuth 2.1/OIDC Configuration
ISSUER=https://api.kundenbeziehung.ch
JWT_SIGNING_ALGORITHM=PS256
JWT_EXPIRY=900

# FAPI 2.0 Configuration
FAPI_COMPLIANCE_MODE=strict
REQUIRE_MTLS=true
REQUIRE_DPOP=true
PAR_EXPIRY_SECONDS=60

# Security Configuration
HTTPS_ENABLED=true
TLS_CERT_PATH=/path/to/server.crt
TLS_KEY_PATH=/path/to/server.key
CLIENT_CERT_CA_PATH=/path/to/ca.crt

# Industry Extensions
BANKING_EXTENSION_ENABLED=true
INSURANCE_EXTENSION_ENABLED=false
FINTECH_EXTENSION_ENABLED=false
```

#### Certificate Setup

For production deployment, configure TLS certificates:

```bash
# Generate development certificates (for testing only)
npm run generate:dev-certs

# Or configure production certificates
export TLS_CERT_PATH=/path/to/production/server.crt
export TLS_KEY_PATH=/path/to/production/server.key
export CLIENT_CERT_CA_PATH=/path/to/production/ca.crt
```

---

## API Usage Guide

### Authentication and Authorization

#### Step 1: Client Registration

Register your application with the authorization server:

```bash
curl -X POST http://localhost:3000/clients/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "My Banking App",
    "redirect_uris": ["https://myapp.ch/callback"],
    "token_endpoint_auth_method": "private_key_jwt",
    "industry_type": "banking",
    "swiss_finma_supervised": true,
    "data_processing_agreement": "https://myapp.ch/dpa"
  }'
```

Response:
```json
{
  "client_id": "CH-BANK-001",
  "client_secret": "generated-secret",
  "registration_access_token": "registration-token",
  "registration_client_uri": "https://api.kundenbeziehung.ch/clients/CH-BANK-001"
}
```

#### Step 2: FAPI 2.0 OAuth Flow

**Step 2a: Pushed Authorization Request (PAR)**

```javascript
const parRequest = {
  client_id: 'CH-BANK-001',
  response_type: 'code',
  scope: 'customer:read consent:manage',
  redirect_uri: 'https://myapp.ch/callback',
  code_challenge: generatePKCEChallenge(),
  code_challenge_method: 'S256'
};

const parResponse = await fetch('http://localhost:3000/par', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(parRequest)
});

const { request_uri, expires_in } = await parResponse.json();
```

**Step 2b: Authorization Request**

```javascript
const authUrl = `http://localhost:3000/authorize?` +
  `client_id=${parRequest.client_id}&` +
  `request_uri=${request_uri}`;

// Redirect user to authUrl for authentication
```

**Step 2c: Token Exchange**

```javascript
const tokenRequest = {
  grant_type: 'authorization_code',
  code: 'received-auth-code',
  client_id: 'CH-BANK-001',
  code_verifier: 'pkce-verifier'
};

const tokenResponse = await fetch('http://localhost:3000/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(tokenRequest)
});

const { access_token, token_type, expires_in } = await tokenResponse.json();
// token_type will be "DPoP"
```

### Core API Endpoints

#### Customer Existence Check

```javascript
const customerCheckRequest = {
  sharedCustomerHash: 'sha256:' + sha256('customer-unique-identifier'),
  basicData: {
    lastName: 'Müller',
    givenName: 'Hans',
    birthDate: '1985-03-15'
  },
  purpose: 'accountOpening'
};

const dpopProof = generateDPoPProof('POST', '/v1/customer/check', access_token);

const response = await fetch('http://localhost:3000/v1/customer/check', {
  method: 'POST',
  headers: {
    'Authorization': `DPoP ${access_token}`,
    'DPoP': dpopProof,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(customerCheckRequest)
});

const result = await response.json();
```

Expected Response:
```json
{
  "match": true,
  "matchConfidence": 0.98,
  "identificationDate": "2024-01-15T10:30:00Z",
  "levelOfAssurance": "high",
  "validUntil": "2024-12-31T23:59:59Z"
}
```

#### Consent Management

**Create Consent Request**:

```javascript
const consentRequest = {
  customerId: 'customer-id-hash',
  providingInstitution: 'CH-BANK-002',
  purpose: 'accountOpening',
  dataCategories: ['basicData', 'identification', 'kyc'],
  fieldRequirements: {
    basicData: ['lastName', 'givenName', 'birthDate', 'address'],
    identification: ['idNumber', 'idType'],
    kyc: ['riskProfile']
  },
  expiryDate: '2024-12-31T23:59:59Z'
};

const consentResponse = await fetch('http://localhost:3000/v1/consent/create', {
  method: 'POST',
  headers: {
    'Authorization': `DPoP ${access_token}`,
    'DPoP': generateDPoPProof('POST', '/v1/consent/create', access_token),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(consentRequest)
});

const consent = await consentResponse.json();
```

**Customer Data Access** (after consent granted):

```javascript
const dataRequest = {
  customerId: 'customer-id-hash',
  requestedFields: ['basicData', 'identification'],
  purpose: 'accountOpening',
  consentToken: consent.consentToken
};

const customerData = await fetch('http://localhost:3000/v1/customer/data', {
  method: 'POST',
  headers: {
    'Authorization': `DPoP ${access_token}`,
    'DPoP': generateDPoPProof('POST', '/v1/customer/data', access_token),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataRequest)
});
```

#### Identity Verification

```javascript
const verificationRequest = {
  customerId: 'customer-id-hash',
  methods: ['document_verification', 'biometric_check'],
  requiredLevelOfAssurance: 'high',
  documents: [
    {
      type: 'swiss_id',
      documentHash: 'sha256:document-hash'
    }
  ]
};

const verificationResponse = await fetch('http://localhost:3000/v1/identification/verify', {
  method: 'POST',
  headers: {
    'Authorization': `DPoP ${access_token}`,
    'DPoP': generateDPoPProof('POST', '/v1/identification/verify', access_token),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(verificationRequest)
});
```

### Error Handling

The API uses standardized error responses:

```javascript
try {
  const response = await apiCall();
  const data = await response.json();
  
  if (!response.ok) {
    switch (data.error) {
      case 'invalid_request':
        console.error('Request validation failed:', data.details);
        break;
      case 'insufficient_consent':
        console.error('Consent required:', data.consent_required);
        break;
      case 'invalid_client':
        console.error('Authentication failed');
        break;
      default:
        console.error('API error:', data.error_description);
    }
  }
} catch (error) {
  console.error('Network error:', error.message);
}
```

---

## Running Demos

### Interactive Demonstrations

The system includes comprehensive interactive demonstrations showcasing all use cases:

#### Run All Demos Sequentially

```bash
# Make script executable (Unix systems)
chmod +x demo/run-all-demos.sh

# Run complete demonstration session (53-69 minutes)
./demo/run-all-demos.sh

# Quick overview session (17-21 minutes)
./demo/run-all-demos.sh --quick

# Technical deep dive session (27-35 minutes)
./demo/run-all-demos.sh --technical
```

#### Individual Demo Execution

**Demo 1: Universal Reference Process**
```bash
cd demo/referenzprozess
node reference-process-demo.js
```

**Demo 1.1: Banking Account Opening (UC1)**
```bash
cd demo/referenzprozess/use-cases
node uc1-banking-account-opening-demo.js
```

**Demo 1.2: Customer Re-identification (UC2)**
```bash
cd demo/referenzprozess/use-cases
node uc2-reidentification-demo.js
```

**Demo 1.3: Age Verification (UC3)**
```bash
cd demo/referenzprozess/use-cases
node uc3-age-verification-demo.js
```

**Demo 1.4: EVV Lifecycle Management (UC4)**
```bash
cd demo/referenzprozess/use-cases
node uc4-evv-lifecycle-demo.js
```

**Demo 2: Data Onboarding**
```bash
cd demo
node data-onboarding-blöckli-demo.js
```

**Demo 3: Consent Security Flow**
```bash
cd demo
node consent-security-flow-demo.js
```

**Demo 4: Verification Process**
```bash
cd demo
node verification-process-demo.js
```

**Demo 5: MVP Implementation**
```bash
cd demo
node mvp-implementation-demo.js
```

#### Demo Configuration

Configure demo execution with environment variables:

```bash
# Demo execution speed
export DEMO_SPEED=normal  # fast|normal|slow

# API server URL
export API_BASE_URL=http://localhost:3000

# Enable debug output
export DEBUG=true

# Business metrics analysis
export BUSINESS_METRICS=true
```

---

## Testing and Verification

### 4-Layer Testing Strategy

#### Layer 1: Unit Testing

Run unit tests with coverage reporting:

```bash
# Run all unit tests
npm run test:unit

# Run with coverage
npm run test:unit:coverage

# Run specific test suites
npm test src/middleware/security.test.js
npm test src/core/process.test.js
npm test src/routes/oauth.test.js
```

#### Layer 2: Integration Testing

Test API contracts and service integration:

```bash
# Run integration tests
npm run test:integration

# Test OAuth flow integration
npm run test:integration:oauth

# Test API contract compliance
npm run test:integration:contracts

# Test security compliance
npm run test:integration:security
```

#### Layer 3: System Testing

End-to-end workflow and performance testing:

```bash
# Run system tests
npm run test:system

# Performance testing
npm run test:system:performance

# Load testing
npm run test:system:load

# Security testing
npm run test:system:security
```

#### Layer 4: Acceptance Testing

Use case validation and stakeholder acceptance:

```bash
# Run acceptance tests
npm run test:acceptance

# Test specific use cases
npm run test:acceptance:uc1
npm run test:acceptance:uc2
npm run test:acceptance:uc3
npm run test:acceptance:uc4

# Stakeholder acceptance criteria validation
npm run test:acceptance:stakeholder
```

#### Complete Test Suite

```bash
# Run all tests with coverage
npm test

# Run tests with detailed reporting
npm run test:report

# Run tests in CI/CD mode
npm run test:ci
```

### FAPI 2.0 Compliance Testing

```bash
# FAPI 2.0 compliance validation
npm run test:fapi-compliance

# Security compliance check
npm run security:audit

# OAuth 2.1 flow validation
npm run test:oauth-compliance
```

### Quality Metrics and Coverage

```bash
# Generate comprehensive coverage report
npm run coverage:report

# Check code quality metrics
npm run quality:check

# Security vulnerability scan
npm run security:scan

# Performance benchmarking
npm run performance:benchmark
```

---

## Production Deployment

### Docker Production Deployment

#### Single Node Deployment

```bash
# Production Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs api
```

#### Kubernetes Production Deployment

```yaml
# k8s/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../base
  
patchesStrategicMerge:
  - production-config.yaml
  - production-secrets.yaml

replicas:
  - name: obp-api-server
    count: 3

images:
  - name: obp-api
    newTag: v1.0.0
```

Deploy to Kubernetes:
```bash
# Deploy to production
kubectl apply -k k8s/production/

# Monitor deployment
kubectl get pods -n obp-production
kubectl logs -f deployment/obp-api-server -n obp-production

# Check service health
kubectl get services -n obp-production
```

### Production Configuration

#### Environment Variables for Production

```bash
# Production Environment Configuration
NODE_ENV=production
API_PORT=3000
HTTPS_ENABLED=true
FAPI_COMPLIANCE_MODE=strict

# Database (Production)
DB_HOST=prod-db.internal
DB_SSL=true
DB_CONNECTION_POOL_SIZE=20

# Security (Production)
REQUIRE_MTLS=true
REQUIRE_DPOP=true
JWT_SIGNING_ALGORITHM=PS256
TLS_MIN_VERSION=1.3

# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_ENABLED=true
LOG_LEVEL=info
AUDIT_LOG_ENABLED=true

# Performance
REDIS_ENABLED=true
CACHE_TTL=3600
RATE_LIMIT_ENABLED=true
```

#### SSL/TLS Configuration

```bash
# Production TLS setup
export TLS_CERT_PATH=/etc/ssl/certs/api.kundenbeziehung.ch.crt
export TLS_KEY_PATH=/etc/ssl/private/api.kundenbeziehung.ch.key
export CLIENT_CERT_CA_PATH=/etc/ssl/certs/client-ca.crt

# Verify TLS configuration
openssl s_client -connect api.kundenbeziehung.ch:443 -servername api.kundenbeziehung.ch
```

### Health Monitoring

#### Health Check Endpoints

```bash
# Basic health check
curl https://api.kundenbeziehung.ch/health

# Detailed system status
curl https://api.kundenbeziehung.ch/health/detailed

# Readiness check (for Kubernetes)
curl https://api.kundenbeziehung.ch/ready

# Security dashboard (authenticated)
curl -H "Authorization: Bearer admin-token" \
  https://api.kundenbeziehung.ch/security/dashboard
```

#### Monitoring Setup

```bash
# Prometheus metrics
curl https://api.kundenbeziehung.ch/metrics

# Application logs
kubectl logs -f deployment/obp-api-server -n production

# Security audit logs
kubectl logs -f deployment/obp-api-server -n production | grep SECURITY

# Performance metrics
kubectl top pods -n production
```

---

## Real-World Integration Examples

### Banking Integration Example

Complete example for a Swiss bank implementing account opening:

```javascript
// SwissBankAPIClient.js
class SwissBankAPIClient {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.privateKey = config.privateKey;
    this.accessToken = null;
  }
  
  async initialize() {
    // Complete OAuth 2.1 flow with FAPI 2.0
    await this.performClientAuthentication();
    this.accessToken = await this.obtainAccessToken();
  }
  
  async openBankAccount(customerData) {
    // Step 1: Check if customer exists at other banks
    const existingCustomer = await this.checkCustomerExistence(customerData);
    
    if (existingCustomer.match) {
      // Step 2: Request consent for data reuse
      const consent = await this.requestConsentForDataReuse(customerData);
      
      if (consent.granted) {
        // Step 3: Retrieve existing customer data
        const customerProfile = await this.getCustomerData(consent);
        
        // Step 4: Open account with existing data (67% faster)
        return await this.createAccountFromProfile(customerProfile);
      }
    }
    
    // Fallback: Traditional account opening process
    return await this.traditionalAccountOpening(customerData);
  }
  
  async checkCustomerExistence(customerData) {
    const request = {
      sharedCustomerHash: this.generateCustomerHash(customerData),
      basicData: {
        lastName: customerData.lastName,
        givenName: customerData.givenName,
        birthDate: customerData.birthDate
      },
      purpose: 'accountOpening'
    };
    
    return await this.apiCall('POST', '/v1/customer/check', request);
  }
  
  async apiCall(method, endpoint, data) {
    const dpopProof = this.generateDPoPProof(method, endpoint, this.accessToken);
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `DPoP ${this.accessToken}`,
        'DPoP': dpopProof,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new APIError(await response.json());
    }
    
    return await response.json();
  }
}

// Usage example
const bankClient = new SwissBankAPIClient({
  baseUrl: 'https://api.kundenbeziehung.ch',
  clientId: 'CH-BANK-001',
  clientSecret: process.env.CLIENT_SECRET,
  privateKey: fs.readFileSync('./private-key.pem')
});

await bankClient.initialize();

const newAccount = await bankClient.openBankAccount({
  lastName: 'Mustermann',
  givenName: 'Max',
  birthDate: '1985-01-15',
  address: {
    street: 'Bahnhofstrasse 1',
    city: 'Zürich',
    postalCode: '8001',
    country: 'CH'
  }
});
```

### Insurance Integration Example

```javascript
// SwissInsuranceAPIClient.js
class SwissInsuranceAPIClient {
  async performAgeVerification(customerId, minimumAge) {
    // Privacy-preserving age verification without identity disclosure
    const ageVerificationRequest = {
      customerId: this.hashCustomerId(customerId),
      minimumAge: minimumAge,
      verificationMethod: 'zero_knowledge_proof'
    };
    
    const result = await this.apiCall('POST', '/v1/age-verification', ageVerificationRequest);
    
    return {
      ageRequirementMet: result.ageRequirementMet,
      actualAge: null, // Never disclosed for privacy
      privacyPreserving: true,
      verificationTimestamp: result.timestamp
    };
  }
}
```

### Fintech Integration Example

```javascript
// FintechServiceClient.js
class FintechServiceClient {
  async performCrossProviderVerification(customerId) {
    // Leverage trust network for customer verification
    const verificationRequest = {
      customerId: customerId,
      trustNetworkValidation: true,
      requiredTrustScore: 0.8
    };
    
    const trustProviders = await this.apiCall('GET', '/v1/trust/providers', {
      minTrustScore: 0.8,
      capabilities: ['customer_verification']
    });
    
    for (const provider of trustProviders) {
      const verification = await this.requestVerificationFromProvider(
        provider.id, 
        verificationRequest
      );
      
      if (verification.verified) {
        return verification;
      }
    }
    
    throw new VerificationError('No trusted provider could verify customer');
  }
}
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Authentication Issues

**Problem**: "invalid_client" error during OAuth flow
```json
{
  "error": "invalid_client",
  "error_description": "Client authentication failed"
}
```

**Solutions**:
```bash
# Check client registration
curl -X GET http://localhost:3000/clients/CH-BANK-001

# Verify client credentials
echo "Check CLIENT_ID and CLIENT_SECRET in environment"

# Test client certificate (for mTLS)
openssl x509 -in client.crt -text -noout

# Verify private key JWT generation
node -e "console.log(require('./utils/jwt-helper').generateClientAssertion())"
```

#### 2. FAPI 2.0 Compliance Issues

**Problem**: "FAPI compliance violation" errors
```json
{
  "error": "invalid_request",
  "error_description": "FAPI 2.0 compliance violation",
  "violations": ["HTTPS_REQUIRED", "DPOP_PROOF_REQUIRED"]
}
```

**Solutions**:
```bash
# Ensure HTTPS in production
export HTTPS_ENABLED=true
export NODE_ENV=production

# Generate DPoP proof correctly
node -e "console.log(require('./utils/dpop-helper').generateDPoPProof('POST', '/v1/customer/check', 'access-token'))"

# Verify mTLS configuration
curl --cert client.crt --key client.key https://api.kundenbeziehung.ch/token
```

#### 3. Consent Management Issues

**Problem**: "insufficient_consent" error
```json
{
  "error": "insufficient_consent",
  "error_description": "Valid consent required for this operation",
  "consent_required": ["basicData", "identification"]
}
```

**Solutions**:
```bash
# Check consent status
curl -H "Authorization: DPoP access-token" \
  http://localhost:3000/v1/consent/consent-id/status

# Create new consent request
curl -X POST http://localhost:3000/v1/consent/create \
  -H "Content-Type: application/json" \
  -d '{"dataCategories": ["basicData", "identification"], "purpose": "accountOpening"}'

# Verify consent token validity
node -e "console.log(require('jsonwebtoken').decode('consent-jwt-token'))"
```

#### 4. Performance Issues

**Problem**: Slow API response times

**Diagnostics**:
```bash
# Check system resources
docker stats obp-api

# Monitor database performance
docker exec -it obp-postgres pg_stat_activity

# Check cache hit rates
redis-cli info stats

# Monitor API metrics
curl http://localhost:3000/metrics | grep response_time
```

**Solutions**:
```bash
# Enable Redis caching
export REDIS_ENABLED=true

# Optimize database connections
export DB_CONNECTION_POOL_SIZE=20

# Enable response compression
export COMPRESSION_ENABLED=true

# Scale horizontally (Kubernetes)
kubectl scale deployment obp-api-server --replicas=3
```

#### 5. Testing Issues

**Problem**: Test failures in CI/CD

**Solutions**:
```bash
# Run tests locally with same environment
NODE_ENV=test npm test

# Check test database connection
npm run test:db:health

# Verify test certificates
npm run test:certs:validate

# Run specific failing test with verbose output
npm test -- --testNamePattern="OAuth flow" --verbose

# Check test coverage
npm run test:coverage -- --coverage-threshold=95
```

### Debugging Tools and Commands

#### API Debugging

```bash
# Enable debug mode
export DEBUG=obp:*
npm run dev

# Test API endpoints
curl -v http://localhost:3000/health
curl -v http://localhost:3000/.well-known/openid-configuration

# Validate OpenAPI specification
npx swagger-codegen-cli validate -i openapi.yaml

# Test OAuth flow step by step
npm run debug:oauth-flow
```

#### Database Debugging

```bash
# Connect to database
docker exec -it obp-postgres psql -U obp_user -d obp_kundenbeziehung

# Check database schema
\dt
\d customers
\d consents

# Check database connections
SELECT * FROM pg_stat_activity WHERE datname = 'obp_kundenbeziehung';
```

#### Certificate Debugging

```bash
# Verify server certificate
openssl s_client -connect localhost:3000 -servername localhost

# Check certificate chain
openssl verify -CAfile ca.crt server.crt

# Inspect client certificate
openssl x509 -in client.crt -text -noout

# Test mTLS connection
curl --cert client.crt --key client.key https://localhost:3000/token
```

### Performance Monitoring

#### Application Metrics

```bash
# Prometheus metrics
curl http://localhost:3000/metrics

# Health dashboard
curl http://localhost:3000/health/detailed

# Security dashboard (admin access required)
curl -H "Authorization: Bearer admin-token" http://localhost:3000/security/dashboard
```

#### System Monitoring

```bash
# Container resource usage
docker stats

# Kubernetes pod metrics
kubectl top pods -n obp-api

# Network connectivity
netstat -tlnp | grep 3000

# Log analysis
tail -f logs/app.log | grep ERROR
```

### Support and Resources

#### Documentation Resources
- **OpenAPI Specification**: `/openapi.yaml`
- **Implementation Details**: `doc/implementation-details.md`
- **Demo Instructions**: `demo/DEMO-INSTRUCTIONS.md`
- **File Structure**: `doc/file-structure.txt`

#### Community Support
- **GitHub Issues**: Report bugs and feature requests
- **Technical Discussions**: Architecture and implementation questions
- **Security Reports**: Private security vulnerability reporting

#### Professional Support
- **Integration Support**: Commercial integration assistance
- **Training Programs**: Developer and business user training
- **Certification**: FAPI 2.0 compliance certification assistance

---

**Swiss Open API Kundenbeziehung** - Setting the global standard for secure financial data exchange

*For additional support and detailed technical questions, please refer to the main project documentation or contact the development team through the appropriate channels.*