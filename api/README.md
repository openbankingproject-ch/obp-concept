# Swiss Open API Kundenbeziehung

A standardized, secure, and privacy-preserving API framework for customer relationship management across the Swiss financial ecosystem.

## Overview

The Swiss Open API Kundenbeziehung (Customer Relationship API) enables financial institutions to securely share customer data while maintaining the highest standards of privacy, security, and regulatory compliance. This framework implements a universal 10-step reference process that works across all financial sectors.

### Key Features

- **FAPI 2.0 Advanced Compliance**: Complete OAuth 2.1/OIDC implementation with mTLS and DPoP
- **Universal 10-Step Process**: Standardized customer relationship management across all industries
- **Privacy-by-Design**: Zero-knowledge proofs and minimal data disclosure
- **Cross-Industry Support**: Banking, insurance, fintech, and government sectors
- **Production-Ready**: Comprehensive testing (>95% coverage) and monitoring

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Bank A        │    │  Swiss Open API │    │   Bank B        │
│   (Customer     │◄──►│  Kundenbeziehung│◄──►│   (Data         │
│    Request)     │    │    Framework    │    │   Provider)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │   Customer      │
                       │   Consent       │
                       │   Management    │
                       └─────────────────┘
```

### Core Components

- **Universal Core Framework** (`/src/core/`): Cross-industry business logic
- **Industry Extensions** (`/src/extensions/`): Sector-specific implementations
- **FAPI 2.0 Security** (`/src/middleware/`, `/src/routes/oauth.js`): Financial-grade security
- **10-Step Reference Process** (`/src/core/process/`): Universal customer onboarding

## Quick Start

### Prerequisites

- Node.js 16+ 
- Docker and Docker Compose
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/swiss-open-banking/obp-concept.git
cd obp-concept/api

# Install dependencies
npm install

# Configure environment
cp env-config.sh.example env-config.sh
# Edit env-config.sh with your configuration

# Start the development server
npm run dev

# Or run with Docker
docker-compose up -d
```

### Verify Installation

```bash
# Check API health
curl http://localhost:3000/health

# View OpenAPI specification
curl http://localhost:3000/openapi.yaml

# Check FAPI 2.0 configuration
curl http://localhost:3000/.well-known/openid-configuration
```

## Use Cases

### UC1: Banking Account Opening
- **Efficiency**: 67% time reduction through data reuse
- **Implementation**: Zielbild 1 direct customer relationship model
- **Demo**: `npm run demo:uc1`

### UC2: Customer Re-identification
- **Efficiency**: 85% improvement through trust network
- **Privacy**: Zero-knowledge identity verification
- **Demo**: `npm run demo:uc2`

### UC3: Age Verification
- **Privacy**: Attribute-only disclosure without identity exposure
- **Industries**: Banking, gaming, e-commerce, media, healthcare
- **Demo**: `npm run demo:uc3`

### UC4: EVV Lifecycle Management
- **Efficiency**: 78% improvement for wealth management
- **Compliance**: MiFID II automated suitability assessment
- **Demo**: `npm run demo:uc4`

## API Endpoints

### Core Endpoints
- `POST /v1/customer/check` - Customer existence verification
- `POST /v1/customer/data` - Secure customer data exchange
- `POST /v1/consent/create` - Consent management
- `POST /v1/identification/verify` - Identity verification

### OAuth 2.1/OIDC Endpoints
- `GET /.well-known/openid-configuration` - OIDC discovery
- `POST /par` - Pushed Authorization Requests
- `GET /authorize` - Authorization endpoint
- `POST /token` - Token endpoint
- `GET /.well-known/jwks.json` - JWK Set

### Management Endpoints
- `GET /health` - Health monitoring
- `GET /metrics` - Performance metrics
- `GET /security/dashboard` - Security monitoring

## Documentation

### Core Documentation
- **[Implementation Details](doc/implementation-details.md)** - Complete technical implementation
- **[API Instructions](api-instructions.md)** - Usage guide and best practices
- **[File Structure](doc/file-structure.txt)** - Project organization
- **[Demo Instructions](demo/DEMO-INSTRUCTIONS.md)** - Comprehensive demo guide

### Section-Specific Documentation
- **[Requirements](doc/02-requirements.md)** - System requirements and specifications
- **[Reference Process](doc/03-reference-process.md)** - 10-step universal process
- **[API Design](doc/04-api-design.md)** - Endpoint design and data models
- **[Trust Network](doc/05-trust-network.md)** - Participant registry and trust framework
- **[Consent & Security](doc/06-consent-security.md)** - FAPI 2.0 security implementation
- **[Testing & Verification](doc/08-testing-verification.md)** - Quality assurance framework

### Regulatory Compliance
- **[Legal Framework](doc/07-legal-framework.md)** - Swiss regulatory compliance
- **FINMA Guidelines** - Swiss financial market supervision compliance
- **GDPR/Swiss DPA** - Data protection and privacy compliance
- **FAPI 2.0 Certification** - Financial-grade API security certification

## Testing

### 4-Layer Testing Strategy

```bash
# Unit Tests (>95% coverage)
npm run test:unit

# Integration Tests (API contracts)
npm run test:integration  

# System Tests (end-to-end workflows)
npm run test:system

# Acceptance Tests (use case validation)
npm run test:acceptance

# Complete test suite
npm test

# Coverage report
npm run test:coverage
```

### Demo Execution

```bash
# Run all demos sequentially
./demo/run-all-demos.sh

# Individual demos
npm run demo:reference-process    # Foundation demo
npm run demo:data-onboarding     # Blöckli architecture
npm run demo:consent-flow        # FAPI 2.0 security
npm run demo:verification        # Quality assurance
npm run demo:mvp                 # Production readiness
```

## Development

### Project Structure
- `src/` - Application source code
  - `core/` - Universal framework core
  - `extensions/` - Industry-specific extensions
  - `routes/` - API endpoints
  - `services/` - Business logic services
  - `middleware/` - Security and validation
- `tests/` - Comprehensive test suite
- `demo/` - Interactive demonstrations
- `doc/` - Technical documentation

### Environment Configuration
- Development: `npm run dev`
- Production: `npm run start`
- Testing: `npm run test:env`
- Docker: `docker-compose up`

## Security

### FAPI 2.0 Advanced Profile
- **mTLS**: Mutual TLS client authentication
- **DPoP**: Proof-of-possession token binding
- **PAR**: Pushed Authorization Requests
- **PKCE**: Proof Key for Code Exchange
- **JWS**: JSON Web Signature validation

### Security Monitoring
- Real-time security dashboard
- Automated threat detection
- Comprehensive audit trails
- GDPR-compliant data processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Run complete test suite: `npm test`
4. Ensure security compliance: `npm run security:audit`
5. Submit a pull request

### Development Guidelines
- Follow Swiss banking security standards
- Maintain FAPI 2.0 compliance
- >95% test coverage required
- Professional documentation (no emojis)
- Coherent with conclusion documents

## Support

### Documentation
- **Technical Support**: [api-instructions.md](api-instructions.md)
- **Developer Guide**: [doc/implementation-details.md](doc/implementation-details.md)
- **Demo Instructions**: [demo/DEMO-INSTRUCTIONS.md](demo/DEMO-INSTRUCTIONS.md)

### Community
- **Issues**: GitHub Issues for bug reports and feature requests
- **Discussions**: Technical discussions and architecture questions
- **Security**: Security vulnerabilities should be reported privately

## License

This project is licensed under the Swiss Open Banking License. See LICENSE file for details.

## Acknowledgments

- Swiss National Bank (Technical Advisory)
- FINMA (Regulatory Compliance Validation) 
- SIX Group (Infrastructure Integration)
- Swiss Banking Industry Partners

---

**Swiss Open API Kundenbeziehung** - Setting the global standard for secure financial data exchange

Version: 1.0 | Last Updated: January 2025 | Certification: FAPI 2.0 Advanced Profile