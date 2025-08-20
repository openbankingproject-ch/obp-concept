#!/usr/bin/env node

/**
 * Banking MVP Demonstration Script
 * 
 * Demonstrates the complete Swiss Banking Customer Data Exchange MVP functionality
 * including core framework, banking extension, and service layer integration.
 */

const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_INSTITUTION_ID = 'CH-BANK-001';
const DEMO_USER_ID = 'demo-user-123';

// Mock authentication token (in production, this would be obtained via OAuth 2.0/FAPI 2.0)
const DEMO_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

// Demo customer data
const DEMO_CUSTOMER = {
  basicData: {
    lastName: 'Müller',
    givenName: 'Hans Peter',
    birthDate: '1985-03-15',
    nationality: ['CH'],
    gender: 'male',
    maritalStatus: 'married',
    language: 'de'
  }
};

// Generate shared customer hash
const SHARED_CUSTOMER_HASH = crypto
  .createHash('sha256')
  .update(`${DEMO_CUSTOMER.basicData.lastName} ${DEMO_CUSTOMER.basicData.givenName} ${DEMO_CUSTOMER.basicData.birthDate} ${DEMO_CUSTOMER.basicData.nationality.join(',')}`)
  .digest('hex');

class BankingMvpDemo {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${DEMO_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Institution-ID': DEMO_INSTITUTION_ID,
        'X-User-ID': DEMO_USER_ID
      },
      timeout: 30000
    });

    this.apiClient.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 503) {
          console.log(chalk.yellow(' Framework is initializing... retrying in 2 seconds'));
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(this.apiClient.request(error.config));
            }, 2000);
          });
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Display demo header
   */
  displayHeader() {
    console.log(chalk.cyan.bold('\nSwiss Banking MVP - Customer Data Exchange Demonstration'));
    console.log(chalk.cyan('─────────────────────────────────────────────────────────────\n'));
    console.log(chalk.white('This demonstration shows the complete Banking MVP implementation:'));
    console.log(chalk.white('• Generic core framework with banking extension'));
    console.log(chalk.white('• Universal data models with Swiss banking compliance'));
    console.log(chalk.white('• Service layer integration with Express routes'));
    console.log(chalk.white('• FAPI 2.0 compliant security architecture'));
    console.log(chalk.white('• Multi-industry extensibility demonstration\n'));
  }

  /**
   * Check API health and framework status
   */
  async checkApiHealth() {
    console.log(chalk.blue.bold('1.  Health Check & Framework Status'));
    console.log(chalk.blue('─────────────────────────────────────────\n'));

    try {
      // Basic health check
      const healthResponse = await this.apiClient.get('/health');
      console.log(chalk.green(' API Health:'), healthResponse.data.status);
      
      if (healthResponse.data.services?.coreFramework) {
        console.log(chalk.green(' Core Framework:'), healthResponse.data.services.coreFramework.status);
        console.log(chalk.cyan('  - Components:'), Object.keys(healthResponse.data.services.coreFramework.components || {}).length);
      }

      if (healthResponse.data.services?.serviceLayer) {
        console.log(chalk.green(' Service Layer:'), healthResponse.data.services.serviceLayer.status);
        console.log(chalk.cyan('  - Services:'), Object.keys(healthResponse.data.services.serviceLayer.services || {}).length);
      }

      // Banking extension info
      const bankingInfoResponse = await this.apiClient.get('/v1/banking/info');
      console.log(chalk.green(' Banking Extension:'), bankingInfoResponse.data.extension.name);
      console.log(chalk.cyan('  - Version:'), bankingInfoResponse.data.extension.version);
      console.log(chalk.cyan('  - Features:'), bankingInfoResponse.data.extension.features.length);
      console.log(chalk.cyan('  - Industry:'), bankingInfoResponse.data.extension.industry);
      console.log(chalk.cyan('  - Ecosystem:'), bankingInfoResponse.data.extension.ecosystem);

      return true;
    } catch (error) {
      console.log(chalk.red(' API Health Check Failed:'), error.message);
      return false;
    }
  }

  /**
   * Demonstrate participant registry
   */
  async demonstrateParticipantRegistry() {
    console.log(chalk.blue.bold('\n2. Participant Registry'));
    console.log(chalk.blue('─────────────────────────────\n'));

    try {
      // Register a new participant
      const registerResponse = await this.apiClient.post('/v1/registry/register', {
        institutionName: 'Demo Swiss Bank',
        institutionId: DEMO_INSTITUTION_ID,
        industry: 'banking',
        ecosystem: 'swiss_banking',
        capabilities: ['customer_data_exchange', 'kyc_verification', 'compliance_checks'],
        contactInfo: {
          email: 'api@demoswissbank.ch',
          phone: '+41441234567'
        },
        certificationLevel: 'finma_regulated',
        complianceLevel: 'enhanced'
      });

      console.log(chalk.green(' Participant Registration:'), registerResponse.data.success);
      console.log(chalk.cyan('  - Participant ID:'), registerResponse.data.participantId);
      console.log(chalk.cyan('  - Trust Score:'), registerResponse.data.trustScore);
      console.log(chalk.cyan('  - Status:'), registerResponse.data.status);

      // Discover participants with customer data exchange capability
      const discoverResponse = await this.apiClient.get('/v1/registry/discover', {
        params: {
          capability: 'customer_data_exchange',
          industry: 'banking'
        }
      });

      console.log(chalk.green(' Participant Discovery:'), discoverResponse.data.success);
      console.log(chalk.cyan('  - Found Participants:'), discoverResponse.data.participants.length);

    } catch (error) {
      console.log(chalk.red(' Participant Registry Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Demonstrate consent management
   */
  async demonstrateConsentManagement() {
    console.log(chalk.blue.bold('\n3.  Consent Management'));
    console.log(chalk.blue('─────────────────────────────\n'));

    try {
      // Create consent request
      const consentResponse = await this.apiClient.post('/v1/consent', {
        customerId: SHARED_CUSTOMER_HASH,
        requestingInstitution: DEMO_INSTITUTION_ID,
        providingInstitution: 'CH-BANK-002',
        dataCategories: [
          'basicData',
          'contactInformation',
          'addressData',
          'identification',
          'kycData',
          'complianceData'
        ],
        purpose: 'account_opening',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        customerContactMethod: 'email'
      });

      console.log(chalk.green(' Consent Request Created:'), !!consentResponse.data.consentId);
      console.log(chalk.cyan('  - Consent ID:'), consentResponse.data.consentId);
      console.log(chalk.cyan('  - Status:'), consentResponse.data.status);
      console.log(chalk.cyan('  - Processing:'), consentResponse.data.processedBy || 'legacy_implementation');
      console.log(chalk.cyan('  - Framework:'), consentResponse.data.framework || 'none');

      this.consentId = consentResponse.data.consentId;

      // Check consent status
      const statusResponse = await this.apiClient.get(`/v1/consent/${this.consentId}`);
      console.log(chalk.green(' Consent Status Retrieved:'), statusResponse.data.status);

    } catch (error) {
      console.log(chalk.red(' Consent Management Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Demonstrate customer checks
   */
  async demonstrateCustomerChecks() {
    console.log(chalk.blue.bold('\n4.  Customer Verification'));
    console.log(chalk.blue('──────────────────────────────\n'));

    try {
      // Perform customer check
      const checkResponse = await this.apiClient.post('/v1/customer/check', {
        sharedCustomerHash: SHARED_CUSTOMER_HASH,
        basicData: DEMO_CUSTOMER.basicData
      });

      console.log(chalk.green(' Customer Check Completed:'), checkResponse.data.match);
      console.log(chalk.cyan('  - Processing:'), checkResponse.data.processedBy || 'legacy_implementation');
      console.log(chalk.cyan('  - Framework:'), checkResponse.data.framework || 'none');
      
      if (checkResponse.data.match) {
        console.log(chalk.cyan('  - Level of Assurance:'), checkResponse.data.levelOfAssurance);
        console.log(chalk.cyan('  - Identification Date:'), checkResponse.data.identificationDate);
        console.log(chalk.cyan('  - Valid Until:'), checkResponse.data.validUntil);
      }

    } catch (error) {
      console.log(chalk.red(' Customer Check Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Demonstrate compliance checks
   */
  async demonstrateComplianceChecks() {
    console.log(chalk.blue.bold('\n5. Banking Compliance Checks'));
    console.log(chalk.blue('───────────────────────────────────\n'));

    try {
      const checksResponse = await this.apiClient.post('/v1/checks/perform', {
        customerId: SHARED_CUSTOMER_HASH,
        customerData: {
          basicData: DEMO_CUSTOMER.basicData,
          kycData: {
            occupation: 'Software Engineer',
            employer: 'Tech AG',
            employmentType: 'employed',
            annualIncome: { amount: 120000, currency: 'CHF' },
            totalAssets: { amount: 250000, currency: 'CHF' },
            sourceOfFunds: 'salary',
            pepStatus: false
          },
          complianceData: {
            fatcaStatus: 'non_us_person',
            crsReportable: false,
            taxResidencies: [{
              country: 'CH',
              isPrimary: true,
              tinNumber: '756.1234.5678.90'
            }],
            amlRiskRating: 'low'
          }
        },
        checkTypes: ['sanctions', 'pep', 'adverse_media', 'identity_verification'],
        riskProfile: 'standard'
      });

      console.log(chalk.green(' Compliance Checks Completed:'), checksResponse.data.success);
      console.log(chalk.cyan('  - Overall Risk:'), checksResponse.data.overallRisk);
      console.log(chalk.cyan('  - Duration:'), checksResponse.data.duration + 'ms');
      
      if (checksResponse.data.results) {
        Object.entries(checksResponse.data.results).forEach(([checkType, result]) => {
          const status = result.status === 'clear' || result.riskLevel === 'low' ? '' : 'WARNING';
          console.log(chalk.cyan(`  - ${checkType}:`), `${status} ${result.riskLevel || result.status}`);
        });
      }

      if (checksResponse.data.recommendations?.length > 0) {
        console.log(chalk.yellow('WARNING - Recommendations:'));
        checksResponse.data.recommendations.forEach(rec => {
          console.log(chalk.yellow(`    • ${rec}`));
        });
      }

    } catch (error) {
      console.log(chalk.red(' Compliance Checks Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Demonstrate identification process
   */
  async demonstrateIdentificationProcess() {
    console.log(chalk.blue.bold('\n6.  Customer Identification'));
    console.log(chalk.blue('────────────────────────────────\n'));

    try {
      const identificationResponse = await this.apiClient.post('/v1/identification/initiate', {
        customerId: SHARED_CUSTOMER_HASH,
        identificationType: 'video_identification',
        documentTypes: ['id_card', 'passport'],
        returnUrl: 'https://demobank.ch/identification/complete',
        webhookUrl: 'https://demobank.ch/webhooks/identification'
      });

      console.log(chalk.green(' Identification Initiated:'), !!identificationResponse.data.sessionId);
      console.log(chalk.cyan('  - Session ID:'), identificationResponse.data.sessionId);
      console.log(chalk.cyan('  - Type:'), identificationResponse.data.identificationType);
      console.log(chalk.cyan('  - Expiry:'), new Date(identificationResponse.data.expiryDate).toLocaleString());

      // Check identification status
      const statusResponse = await this.apiClient.get(
        `/v1/identification/${identificationResponse.data.sessionId}/status`
      );
      
      console.log(chalk.green(' Identification Status:'), statusResponse.data.identification.status);
      console.log(chalk.cyan('  - Progress:'), statusResponse.data.identification.progress + '%');

    } catch (error) {
      console.log(chalk.red(' Identification Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Demonstrate signature process
   */
  async demonstrateSignatureProcess() {
    console.log(chalk.blue.bold('\n7. Electronic Signature'));
    console.log(chalk.blue('─────────────────────────────────\n'));

    try {
      const signatureResponse = await this.apiClient.post('/v1/signature/initiate', {
        customerId: SHARED_CUSTOMER_HASH,
        documents: [
          {
            documentId: 'contract-001',
            documentName: 'Banking Services Agreement',
            documentHash: 'a1b2c3d4e5f6789012345678901234567890abcdef'
          },
          {
            documentId: 'terms-001', 
            documentName: 'Terms and Conditions',
            documentHash: 'fedcba0987654321098765432109876543210abcdef'
          }
        ],
        signatureType: 'aes',
        notificationMethod: 'email'
      });

      console.log(chalk.green(' Signature Process Initiated:'), !!signatureResponse.data.signatureId);
      console.log(chalk.cyan('  - Signature ID:'), signatureResponse.data.signatureId);
      console.log(chalk.cyan('  - Type:'), signatureResponse.data.signatureType);
      console.log(chalk.cyan('  - Documents:'), signatureResponse.data.documents.length);
      console.log(chalk.cyan('  - Status:'), signatureResponse.data.status);

    } catch (error) {
      console.log(chalk.red(' Signature Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Demonstrate full customer data request
   */
  async demonstrateFullDataRequest() {
    console.log(chalk.blue.bold('\n8.  Full Customer Data Exchange'));
    console.log(chalk.blue('─────────────────────────────────────────\n'));

    if (!this.consentId) {
      console.log(chalk.yellow('WARNING - Skipping - no valid consent available'));
      return;
    }

    try {
      // Mock consent token (in production, this would be obtained from consent approval)
      const mockConsentToken = `consent_token_${this.consentId}_${Date.now()}`;

      const dataResponse = await this.apiClient.post('/v1/customer/data', {
        sharedCustomerHash: SHARED_CUSTOMER_HASH,
        purpose: 'account_opening',
        consentToken: mockConsentToken
      });

      console.log(chalk.green(' Customer Data Retrieved:'), !!dataResponse.data.customerData);
      console.log(chalk.cyan('  - Processing:'), dataResponse.data.processedBy || 'legacy_implementation');
      console.log(chalk.cyan('  - Framework:'), dataResponse.data.framework || 'none');
      console.log(chalk.cyan('  - Audit Recorded:'), dataResponse.data.auditRecorded || false);
      
      if (dataResponse.data.customerData) {
        const categories = Object.keys(dataResponse.data.customerData);
        console.log(chalk.cyan('  - Data Categories:'), categories.length);
        categories.forEach(category => {
          console.log(chalk.cyan(`    • ${category}`));
        });
      }

    } catch (error) {
      console.log(chalk.red(' Data Request Error:'), error.response?.data?.message || error.message);
    }
  }

  /**
   * Display framework architecture summary
   */
  displayArchitectureSummary() {
    console.log(chalk.blue.bold('\n9. Architecture Summary'));
    console.log(chalk.blue('──────────────────────────────\n'));

    console.log(chalk.white('Banking MVP Architecture:'));
    console.log(chalk.green(' Generic Core Framework'));
    console.log(chalk.cyan('  ├── Universal Data Models (multi-industry)'));
    console.log(chalk.cyan('  ├── Process Orchestration Engine (10-step universal)'));
    console.log(chalk.cyan('  ├── Validation Engine (extensible schemas)'));
    console.log(chalk.cyan('  ├── Consent Management (GDPR/DSG compliant)'));
    console.log(chalk.cyan('  ├── Participant Registry (trust network)'));
    console.log(chalk.cyan('  └── Extension System (industry plugins)'));

    console.log(chalk.green('\n Banking Extension'));
    console.log(chalk.cyan('  ├── Swiss Banking Data Models'));
    console.log(chalk.cyan('  ├── FINMA Compliance Rules'));
    console.log(chalk.cyan('  ├── KYC/AML Processes'));
    console.log(chalk.cyan('  ├── Banking Validation Rules'));
    console.log(chalk.cyan('  └── Risk Assessment Logic'));

    console.log(chalk.green('\n Service Layer'));
    console.log(chalk.cyan('  ├── Customer Service (data exchange)'));
    console.log(chalk.cyan('  ├── Consent Service (lifecycle management)'));
    console.log(chalk.cyan('  ├── Validation Service (business rules)'));
    console.log(chalk.cyan('  ├── Process Service (workflow orchestration)'));
    console.log(chalk.cyan('  ├── Registry Service (participant management)'));
    console.log(chalk.cyan('  ├── Identification Service (customer verification)'));
    console.log(chalk.cyan('  ├── Checks Service (compliance screening)'));
    console.log(chalk.cyan('  └── Signature Service (electronic signing)'));

    console.log(chalk.green('\n API Layer (FAPI 2.0 compliant)'));
    console.log(chalk.cyan('  ├── Express.js HTTP Server'));
    console.log(chalk.cyan('  ├── OAuth 2.1 / mTLS Authentication'));
    console.log(chalk.cyan('  ├── OpenAPI 3.0 Specification'));
    console.log(chalk.cyan('  └── RESTful Endpoints'));
  }

  /**
   * Display demo footer
   */
  displayFooter() {
    console.log(chalk.cyan.bold('\n Banking MVP Demonstration Complete!'));
    console.log(chalk.cyan('─────────────────────────────────────────'));
    
    console.log(chalk.white('\nKey Features Demonstrated:'));
    console.log(chalk.green(' Multi-industry extensible architecture'));
    console.log(chalk.green(' Swiss banking regulatory compliance'));
    console.log(chalk.green(' Universal customer data exchange'));
    console.log(chalk.green(' Comprehensive consent management'));
    console.log(chalk.green(' Advanced compliance checking'));
    console.log(chalk.green(' Digital identity verification'));
    console.log(chalk.green(' Electronic signature workflows'));
    console.log(chalk.green(' Participant registry and trust network'));

    console.log(chalk.white('\nNext Steps:'));
    console.log(chalk.yellow('• Implement additional industry extensions (healthcare, insurance, etc.)'));
    console.log(chalk.yellow('• Complete FAPI 2.0 security implementation'));
    console.log(chalk.yellow('• Deploy to production environment'));
    console.log(chalk.yellow('• Integrate with Swiss banking infrastructure'));
    console.log(chalk.yellow('• Obtain regulatory approval and certifications'));

    console.log(chalk.cyan('\n Documentation: http://localhost:3000/docs'));
    console.log(chalk.cyan(' Banking Info: http://localhost:3000/v1/banking/info'));
    console.log(chalk.cyan(' Health Check: http://localhost:3000/health\n'));
  }

  /**
   * Run complete demonstration
   */
  async runDemo() {
    try {
      this.displayHeader();

      // Wait for framework to initialize
      console.log(chalk.yellow(' Waiting for framework initialization...\n'));
      let healthy = false;
      let attempts = 0;
      while (!healthy && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        healthy = await this.checkApiHealth();
        attempts++;
      }

      if (!healthy) {
        console.log(chalk.red(' Framework initialization failed or API not accessible'));
        return;
      }

      // Run demonstration steps
      await this.demonstrateParticipantRegistry();
      await this.demonstrateConsentManagement();
      await this.demonstrateCustomerChecks();
      await this.demonstrateComplianceChecks();
      await this.demonstrateIdentificationProcess();
      await this.demonstrateSignatureProcess();
      await this.demonstrateFullDataRequest();

      this.displayArchitectureSummary();
      this.displayFooter();

    } catch (error) {
      console.log(chalk.red(' Demo failed:'), error.message);
      console.log(chalk.yellow('Make sure the Banking MVP server is running on'), API_BASE_URL);
    }
  }
}

// Check for required dependencies
const requiredDeps = ['axios', 'chalk'];
for (const dep of requiredDeps) {
  try {
    require.resolve(dep);
  } catch (error) {
    console.error(` Missing dependency: ${dep}`);
    console.error(`Install with: npm install ${dep}`);
    process.exit(1);
  }
}

// Run demonstration
if (require.main === module) {
  const demo = new BankingMvpDemo();
  demo.runDemo().catch(error => {
    console.error(chalk.red(' Demo error:'), error.message);
    process.exit(1);
  });
}

module.exports = BankingMvpDemo;