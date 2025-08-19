# Open API Kundenbeziehung - Demo Instructions

This document provides comprehensive instructions for running all demonstration scripts of the Open API Kundenbeziehung framework. Each demo showcases specific aspects of the system based on the requirements and specifications from the conclusions documentation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Individual Demo Scripts](#individual-demo-scripts)
4. [Demo Categories](#demo-categories)
5. [Troubleshooting](#troubleshooting)
6. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### System Requirements

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **Operating System**: Windows, macOS, or Linux
- **Terminal/Command Line**: Access to command line interface

### Required Dependencies

Install the required dependencies before running any demos:

```bash
npm install axios chalk
```

### API Server

Most demos require the API server to be running. Start the server before running demos:

```bash
# Navigate to the API directory
cd api

# Install dependencies (first time only)
npm install

# Start the API server
npm start
```

The API server will be available at `http://localhost:3000` by default.

---

## Quick Start

### Run All Demos Sequentially

Use the provided script to run all demonstrations in the recommended order:

```bash
# Make the script executable (Linux/macOS only)
chmod +x run-all-demos.sh

# Run all demos
./run-all-demos.sh
```

### Run Individual Demo

To run a specific demo, execute the corresponding script:

```bash
node [demo-script-name].js
```

---

## Individual Demo Scripts

### 1. Reference Process Demo (`reference-process-demo.js`)

**Purpose**: Demonstrates the generic 10-step universal reference process that works across all industries and ecosystems.

**Key Features**:
- Shows the complete 10-step framework from initialization to completion
- Industry-agnostic business logic and modular process execution
- Demonstrates cross-industry compatibility and extensible architecture

**Usage**:
```bash
node reference-process-demo.js
```

**Duration**: ~3-4 minutes

**Expected Output**:
- Process initialization and framework readiness check
- Step-by-step execution of all 10 stages
- Process summary with timing and completion metrics
- Framework capabilities overview

---

### 2. Consent Flow Demo (`consent-flow-demo.js`)

**Purpose**: Demonstrates FAPI 2.0 compliant consent management system with granular permissions and secure authentication flow.

**Key Features**:
- FAPI 2.0 Advanced security implementation
- Granular field-level consent control
- Complete consent lifecycle management
- GDPR/DSG compliant consent handling

**Usage**:
```bash
node consent-flow-demo.js
```

**Duration**: ~4-5 minutes

**Expected Output**:
- 8-step consent lifecycle demonstration
- Service discovery and data requirements specification
- Granular consent selection and approval process
- Real-time consent enforcement and revocation

---

### 3. UC1: Banking Account Opening Demo (`uc1-banking-account-opening-demo.js`)

**Purpose**: Demonstrates efficiency gains of API-based banking account opening compared to traditional manual processes.

**Key Features**:
- Shows 67% time reduction through data reuse
- Compares traditional vs API-based processes
- Demonstrates seamless integration between banks during bank switching
- Addresses standardized data modules from the Referenzprozess

**Usage**:
```bash
node uc1-banking-account-opening-demo.js
```

**Duration**: ~3-4 minutes

**Expected Output**:
- Traditional process simulation (90 minutes simulated)
- API-based process demonstration (30 minutes simulated)
- Efficiency comparison and business impact analysis
- Regulatory compliance benefits

**Business Value**: Reduces customer onboarding time by 67%, improves customer satisfaction, and decreases operational costs.

---

### 4. UC2: Re-identification Process Demo (`uc2-reidentification-demo.js`)

**Purpose**: Demonstrates efficiency gains of API-based customer re-identification using verified data reuse.

**Key Features**:
- Shows 85% efficiency improvement
- Leverages existing identity verification from other providers
- GwG-compliant data transfer with proper Level of Assurance
- Eliminates redundant verification processes

**Usage**:
```bash
node uc2-reidentification-demo.js
```

**Duration**: ~3-4 minutes

**Expected Output**:
- Traditional re-identification process (125 minutes simulated)
- API-based re-identification (19 minutes simulated)
- Privacy-preserving identity verification
- Cross-provider identity data reuse

**Business Value**: Reduces re-identification costs for providers, improves customer experience, and increases security through standardized verification.

---

### 5. UC3: Age Verification Demo (`uc3-age-verification-demo.js`)

**Purpose**: Demonstrates privacy-preserving age verification through attribute-based verification without full identity disclosure.

**Key Features**:
- Attribute-only disclosure (age ≥18: YES/NO) without revealing actual age
- Privacy-by-Design implementation
- Cross-industry reusability (6+ industry scenarios)
- GDPR data minimization compliance

**Usage**:
```bash
node uc3-age-verification-demo.js
```

**Duration**: ~4-5 minutes

**Expected Output**:
- Traditional age verification with full identity exposure
- Attribute-based verification for adult customer (access granted)
- Attribute-based verification for minor customer (access denied with alternatives)
- Cross-industry application scenarios
- GDPR compliance analysis

**Business Value**: Provides privacy-compliant age verification, reduces costs through reusability, and ensures compliance across industries.

---

### 6. UC4: EVV Lifecycle Management Demo (`uc4-evv-lifecycle-demo.js`)

**Purpose**: Demonstrates integrated customer lifecycle management for External Wealth Management (EVV) clients across different providers.

**Key Features**:
- Portfolio data synchronization across providers
- KYC data reuse for verified wealth management clients
- MiFID II suitability assessment integration
- Automated portfolio transfer coordination

**Usage**:
```bash
node uc4-evv-lifecycle-demo.js
```

**Duration**: ~4-5 minutes

**Expected Output**:
- Traditional EVV lifecycle with fragmented data (325 minutes simulated)
- Integrated EVV lifecycle management (71 minutes simulated)
- Portfolio synchronization and transfer coordination
- Regulatory compliance for wealth management

**Business Value**: Improves data quality, reduces compliance costs, enhances client experience, and strengthens competitive dynamics.

---

### 7. Banking MVP Demo (`banking-mvp-demo.js`)

**Purpose**: Demonstrates the minimum viable product implementation focusing on core banking functionalities.

**Key Features**:
- Core banking API functionality
- Basic customer data management
- Essential compliance features
- Foundation for extended use cases

**Usage**:
```bash
node banking-mvp-demo.js
```

**Duration**: ~2-3 minutes

**Expected Output**:
- Core banking operations demonstration
- Customer data flow examples
- Basic API interactions

---

### 8. Verification Process Demo (`verification-process-demo.js`)

**Purpose**: Demonstrates the comprehensive testing and verification framework with multi-layer testing strategy.

**Key Features**:
- Multi-layer testing (Unit → Integration → System → Acceptance)
- Community-based validation and external reviews
- Real-time quality metrics and compliance monitoring
- Production readiness assessment

**Usage**:
```bash
node verification-process-demo.js
```

**Duration**: ~3-4 minutes

**Expected Output**:
- Layer-by-layer test execution results
- Community validation with partner feedback
- Quality dashboard with production readiness status
- Independent audit results

---

## Demo Categories

### Core Framework Demos
- **Reference Process Demo**: Universal 10-step process
- **Consent Flow Demo**: FAPI 2.0 consent management
- **Banking MVP Demo**: Core banking functionality

### Use Case Demonstrations
- **UC1: Banking Account Opening**: 67% time reduction
- **UC2: Re-identification Process**: 85% efficiency improvement  
- **UC3: Age Verification**: Privacy-by-design cross-industry solution
- **UC4: EVV Lifecycle Management**: Wealth management data integration

### Quality Assurance Demo
- **Verification Process Demo**: Testing framework and production readiness

---

## Troubleshooting

### Common Issues

**1. "API server not available" Error**
```
Solution: Ensure the API server is running
> cd api && npm start
```

**2. "Missing dependency" Error**
```
Solution: Install required dependencies
> npm install axios chalk
```

**3. "Permission denied" Error (Linux/macOS)**
```
Solution: Make scripts executable
> chmod +x *.js
> chmod +x run-all-demos.sh
```

**4. Connection Timeout**
```
Solution: Check if API server is responsive
> curl http://localhost:3000/health
```

### Debug Mode

For detailed debugging information, set the debug environment variable:

```bash
DEBUG=true node [demo-script].js
```

### API Server Issues

If the API server fails to start:

1. Check port availability: `netstat -an | grep 3000`
2. Kill existing processes: `pkill -f "node.*3000"`
3. Restart with: `cd api && npm start`

---

## Advanced Configuration

### Environment Variables

Configure demos using environment variables:

```bash
# API server URL (default: http://localhost:3000)
export API_BASE_URL=http://localhost:3000

# Demo execution speed (default: normal)
export DEMO_SPEED=fast|normal|slow

# Enable debug output
export DEBUG=true
```

### Custom Configuration

Create a `.env` file in the root directory:

```
API_BASE_URL=http://localhost:3000
DEMO_TIMEOUT=30000
LOG_LEVEL=info
```

### Running Demos in Different Environments

**Development Environment**:
```bash
NODE_ENV=development node [demo-script].js
```

**Production-like Testing**:
```bash
NODE_ENV=production API_BASE_URL=https://your-api-server.com node [demo-script].js
```

---

## Demo Execution Order Recommendations

### Full Demonstration Session (45-60 minutes)
1. **Reference Process Demo** (4 min) - Foundation overview
2. **Consent Flow Demo** (5 min) - Security and privacy
3. **UC1: Banking Account Opening** (4 min) - Primary use case
4. **UC2: Re-identification Process** (4 min) - Data reuse
5. **UC3: Age Verification** (5 min) - Cross-industry application
6. **UC4: EVV Lifecycle Management** (5 min) - Advanced use case
7. **Verification Process Demo** (4 min) - Quality assurance

### Quick Overview Session (15-20 minutes)
1. **Reference Process Demo** (4 min)
2. **UC1: Banking Account Opening** (4 min)
3. **UC3: Age Verification** (3 min)
4. **Verification Process Demo** (3 min)

### Technical Deep Dive Session (20-30 minutes)
1. **Consent Flow Demo** (5 min)
2. **Banking MVP Demo** (3 min)
3. **UC2: Re-identification Process** (4 min)
4. **UC4: EVV Lifecycle Management** (5 min)
5. **Verification Process Demo** (4 min)

---

## Expected Performance Metrics

### Demo Performance Benchmarks

| Demo | Expected Duration | API Calls | Key Metrics |
|------|------------------|-----------|-------------|
| Reference Process | 3-4 min | ~15 | 10 steps, 100% completion |
| Consent Flow | 4-5 min | ~12 | 8 steps, FAPI 2.0 compliance |
| UC1 Banking | 3-4 min | ~8 | 67% time reduction |
| UC2 Re-identification | 3-4 min | ~6 | 85% efficiency improvement |
| UC3 Age Verification | 4-5 min | ~5 | 6 industry scenarios |
| UC4 EVV Lifecycle | 4-5 min | ~10 | 78% time reduction |
| Banking MVP | 2-3 min | ~6 | Core functionality |
| Verification Process | 3-4 min | ~0 | Quality dashboard |

### System Resource Requirements

- **Memory**: ~50MB per demo
- **CPU**: Low utilization (primarily I/O bound)
- **Network**: Requires API server connectivity
- **Disk**: Minimal (logging only)

---

## Support and Documentation

### Additional Resources

- **API Documentation**: `/api/docs` (when server is running)
- **Conclusion Documents**: `/documentation/Fachliche Conclusions Open API Kundenbeziehung/`
- **Technical Implementation**: `/documentation/Umsetzung und Implementierung/`

### Getting Help

If you encounter issues:

1. Check this documentation first
2. Verify API server is running and accessible
3. Check the console output for specific error messages
4. Review the individual demo script documentation

### Demo Feedback

For demo improvements or questions:
- Document any issues encountered
- Note performance variations from expected benchmarks
- Provide feedback on clarity and business value demonstration

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Compatibility**: Node.js 16+, All major operating systems