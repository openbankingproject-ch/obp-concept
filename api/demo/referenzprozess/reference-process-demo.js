#!/usr/bin/env node

/**
 * Reference Process Demonstration Script
 * 
 * Demonstrates the generic 10-step universal reference process that works across
 * all industries and ecosystems. Shows how the core framework orchestrates
 * the complete customer onboarding process.
 */

const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_INSTITUTION_ID = 'CH-GENERIC-001';
const DEMO_USER_ID = 'demo-process-user';

// Mock authentication token
const DEMO_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

// Demo customer data for generic process
const DEMO_CUSTOMER = {
  basicData: {
    lastName: 'Schmidt',
    givenName: 'Maria',
    birthDate: '1990-07-22',
    nationality: ['CH'],
    gender: 'female',
    maritalStatus: 'single',
    language: 'de'
  },
  contactInformation: {
    email: 'maria.schmidt@example.ch',
    phone: '+41791234567',
    preferredChannel: 'email'
  },
  addressData: {
    street: 'Bahnhofstrasse 123',
    city: 'Zürich',
    postalCode: '8001',
    country: 'CH'
  }
};

class ReferenceProcessDemo {
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

    this.processInstance = null;
    this.currentStep = 0;
  }

  /**
   * Display demo header
   */
  displayHeader() {
    console.log(chalk.cyan.bold('\nGeneric 10-Step Reference Process Demonstration'));
    console.log(chalk.cyan('────────────────────────────────────────────────────────'));
    console.log(chalk.white('This demonstration shows the universal reference process that works'));
    console.log(chalk.white('across all industries and ecosystems:'));
    console.log(chalk.white('• Generic core framework orchestration'));
    console.log(chalk.white('• Multi-industry data model compatibility'));
    console.log(chalk.white('• Modular process execution'));
    console.log(chalk.white('• Industry-agnostic business logic'));
    console.log(chalk.white('• Extensible architecture for any use case\n'));
  }

  /**
   * Initialize the reference process
   */
  async initializeProcess() {
    console.log(chalk.blue.bold('STEP 0: Process Initialization'));
    console.log(chalk.blue('────────────────────────────────────\n'));

    try {
      // Check if framework is ready
      const healthResponse = await this.apiClient.get('/health');
      
      if (healthResponse.data.status !== 'healthy') {
        throw new Error('Framework not healthy');
      }

      console.log(chalk.green(' Framework Status: Ready'));
      console.log(chalk.cyan('  - Core Components: Active'));
      console.log(chalk.cyan('  - Process Engine: Available'));
      console.log(chalk.cyan('  - Data Models: Loaded'));

      // Generate process instance ID
      this.processInstance = {
        instanceId: crypto.randomUUID(),
        customerId: crypto.createHash('sha256')
          .update(`${DEMO_CUSTOMER.basicData.lastName}${DEMO_CUSTOMER.basicData.givenName}${DEMO_CUSTOMER.basicData.birthDate}`)
          .digest('hex'),
        startTime: new Date(),
        steps: {},
        metadata: {
          industry: 'generic',
          useCase: 'customer_onboarding',
          processType: 'universal_reference'
        }
      };

      console.log(chalk.green(' Process Instance: Created'));
      console.log(chalk.cyan(`  - Instance ID: ${this.processInstance.instanceId.substring(0, 8)}...`));
      console.log(chalk.cyan(`  - Customer Hash: ${this.processInstance.customerId.substring(0, 16)}...`));

      return true;
    } catch (error) {
      console.log(chalk.red(' Process Initialization Failed:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 1: Service Discovery
   */
  async executeStep1ServiceDiscovery() {
    console.log(chalk.blue.bold('\nSTEP 1: Service Discovery'));
    console.log(chalk.blue('─────────────────────────────\n'));

    try {
      // Discover available services
      const discoveryResponse = await this.apiClient.get('/v1/registry/discover', {
        params: {
          capability: 'customer_data_exchange',
          industry: 'generic'
        }
      });

      console.log(chalk.green(' Service Discovery: Completed'));
      console.log(chalk.cyan(`  - Available Services: ${discoveryResponse.data.participants?.length || 0}`));
      console.log(chalk.cyan('  - Capability: Customer Data Exchange'));
      console.log(chalk.cyan('  - Industry: Multi-industry support'));

      // Simulate service selection
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(chalk.green(' Service Selection: Optimal provider identified'));
      console.log(chalk.cyan('  - Provider Rating: Excellent'));
      console.log(chalk.cyan('  - Compliance Level: Full'));
      console.log(chalk.cyan('  - Response Time: <200ms'));

      this.processInstance.steps.step1 = {
        name: 'Service Discovery',
        status: 'completed',
        result: 'Service provider selected',
        timestamp: new Date(),
        duration: 1000
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Service Discovery Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 2: Data Requirements Specification
   */
  async executeStep2DataRequirements() {
    console.log(chalk.blue.bold('\nSTEP 2: Data Requirements Specification'));
    console.log(chalk.blue('──────────────────────────────────────────\n'));

    try {
      // Define required data categories
      const dataRequirements = {
        required: ['basicData', 'contactInformation', 'addressData'],
        optional: ['kycData', 'preferences'],
        sensitive: ['identification', 'financialData'],
        purpose: 'customer_onboarding_generic'
      };

      console.log(chalk.green(' Data Requirements: Analyzed'));
      console.log(chalk.cyan('  - Required Fields: 3 categories'));
      console.log(chalk.cyan('  - Optional Fields: 2 categories'));
      console.log(chalk.cyan('  - Sensitive Data: Protected handling'));

      // Simulate data model validation
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log(chalk.green(' Data Model Validation: Passed'));
      console.log(chalk.cyan('  - Schema Compliance: 100%'));
      console.log(chalk.cyan('  - Industry Standards: Compatible'));
      console.log(chalk.cyan('  - Privacy Rules: Applied'));

      this.processInstance.steps.step2 = {
        name: 'Data Requirements',
        status: 'completed',
        result: dataRequirements,
        timestamp: new Date(),
        duration: 800
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Data Requirements Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 3: Consent Management
   */
  async executeStep3ConsentManagement() {
    console.log(chalk.blue.bold('\nSTEP 3: Consent Management'));
    console.log(chalk.blue('─────────────────────────────\n'));

    try {
      // Create consent request
      const consentRequest = {
        customerId: this.processInstance.customerId,
        requestingInstitution: DEMO_INSTITUTION_ID,
        dataCategories: ['basicData', 'contactInformation', 'addressData'],
        purpose: 'generic_customer_onboarding',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        granularity: 'field_level'
      };

      const consentResponse = await this.apiClient.post('/v1/consent', consentRequest);

      console.log(chalk.green(' Consent Request: Created'));
      console.log(chalk.cyan(`  - Consent ID: ${consentResponse.data.consentId}`));
      console.log(chalk.cyan('  - Granularity: Field-level permissions'));
      console.log(chalk.cyan('  - Purpose: Generic customer onboarding'));

      // Simulate customer consent approval
      await new Promise(resolve => setTimeout(resolve, 2000));

      const approvalResponse = await this.apiClient.post(`/v1/consent/${consentResponse.data.consentId}/approve`, {
        customerApproval: true,
        restrictions: {
          dataSharing: 'limited_purpose',
          retention: '12_months'
        }
      });

      console.log(chalk.green(' Customer Consent: Granted'));
      console.log(chalk.cyan('  - Approval Status: Confirmed'));
      console.log(chalk.cyan('  - Restrictions: Purpose-limited'));
      console.log(chalk.cyan('  - Retention: 12 months'));

      this.processInstance.steps.step3 = {
        name: 'Consent Management',
        status: 'completed',
        result: {
          consentId: consentResponse.data.consentId,
          status: 'approved'
        },
        timestamp: new Date(),
        duration: 2000
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Consent Management Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 4: Identity Verification
   */
  async executeStep4IdentityVerification() {
    console.log(chalk.blue.bold('\nSTEP 4: Identity Verification'));
    console.log(chalk.blue('────────────────────────────────\n'));

    try {
      // Initiate identity verification
      const verificationRequest = {
        customerId: this.processInstance.customerId,
        verificationType: 'document_verification',
        documentTypes: ['id_card', 'passport'],
        assuranceLevel: 'substantial'
      };

      const verificationResponse = await this.apiClient.post('/v1/identification/initiate', verificationRequest);

      console.log(chalk.green(' Identity Verification: Initiated'));
      console.log(chalk.cyan(`  - Session ID: ${verificationResponse.data.sessionId}`));
      console.log(chalk.cyan('  - Method: Document verification'));
      console.log(chalk.cyan('  - Assurance Level: Substantial'));

      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Check verification status
      const statusResponse = await this.apiClient.get(
        `/v1/identification/${verificationResponse.data.sessionId}/status`
      );

      console.log(chalk.green(' Identity Verification: Completed'));
      console.log(chalk.cyan(`  - Status: ${statusResponse.data.identification.status}`));
      console.log(chalk.cyan(`  - Progress: ${statusResponse.data.identification.progress}%`));
      console.log(chalk.cyan('  - Documents: Verified successfully'));

      this.processInstance.steps.step4 = {
        name: 'Identity Verification',
        status: 'completed',
        result: {
          sessionId: verificationResponse.data.sessionId,
          status: 'verified'
        },
        timestamp: new Date(),
        duration: 3000
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Identity Verification Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 5: Data Validation
   */
  async executeStep5DataValidation() {
    console.log(chalk.blue.bold('\nSTEP 5: Data Validation'));
    console.log(chalk.blue('──────────────────────────\n'));

    try {
      // Validate customer data
      console.log(chalk.green(' Data Validation: Processing'));
      console.log(chalk.cyan('  - Basic Data: Validating schema compliance'));

      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log(chalk.cyan('  - Contact Information: Verifying reachability'));
      console.log(chalk.cyan('  - Address Data: Geocoding verification'));
      console.log(chalk.cyan('  - Cross-references: Consistency checks'));

      await new Promise(resolve => setTimeout(resolve, 1000));

      const validationResults = {
        basicData: { valid: true, confidence: 98 },
        contactInformation: { valid: true, confidence: 95 },
        addressData: { valid: true, confidence: 92 },
        overallScore: 95
      };

      console.log(chalk.green(' Data Validation: Completed'));
      console.log(chalk.cyan(`  - Overall Score: ${validationResults.overallScore}%`));
      console.log(chalk.cyan('  - Basic Data: 98% confidence'));
      console.log(chalk.cyan('  - Contact Info: 95% confidence'));
      console.log(chalk.cyan('  - Address Data: 92% confidence'));

      this.processInstance.steps.step5 = {
        name: 'Data Validation',
        status: 'completed',
        result: validationResults,
        timestamp: new Date(),
        duration: 2500
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Data Validation Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 6: Risk Assessment
   */
  async executeStep6RiskAssessment() {
    console.log(chalk.blue.bold('\nSTEP 6: Risk Assessment'));
    console.log(chalk.blue('───────────────────────\n'));

    try {
      // Perform risk assessment
      console.log(chalk.green(' Risk Assessment: Analyzing'));
      console.log(chalk.cyan('  - Profile Analysis: Customer behavior patterns'));

      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log(chalk.cyan('  - Fraud Detection: ML-based screening'));
      console.log(chalk.cyan('  - Compliance Checks: Regulatory requirements'));

      const riskAssessment = {
        overallRisk: 'low',
        riskScore: 15,
        factors: ['clean_history', 'verified_identity', 'stable_address'],
        recommendations: ['standard_processing', 'no_additional_checks']
      };

      console.log(chalk.green(' Risk Assessment: Completed'));
      console.log(chalk.cyan(`  - Overall Risk: ${riskAssessment.overallRisk.toUpperCase()}`));
      console.log(chalk.cyan(`  - Risk Score: ${riskAssessment.riskScore}/100`));
      console.log(chalk.cyan('  - Recommendation: Standard processing'));

      this.processInstance.steps.step6 = {
        name: 'Risk Assessment',
        status: 'completed',
        result: riskAssessment,
        timestamp: new Date(),
        duration: 2000
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Risk Assessment Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 7: Compliance Verification
   */
  async executeStep7ComplianceVerification() {
    console.log(chalk.blue.bold('\nSTEP 7: Compliance Verification'));
    console.log(chalk.blue('─────────────────────────────────\n'));

    try {
      // Perform compliance checks
      const complianceRequest = {
        customerId: this.processInstance.customerId,
        customerData: DEMO_CUSTOMER,
        checkTypes: ['data_protection', 'industry_regulations', 'cross_border'],
        jurisdiction: 'CH'
      };

      console.log(chalk.green(' Compliance Verification: Processing'));
      console.log(chalk.cyan('  - Data Protection: GDPR/DSG compliance'));

      await new Promise(resolve => setTimeout(resolve, 1800));

      console.log(chalk.cyan('  - Industry Regulations: Multi-sector check'));
      console.log(chalk.cyan('  - Cross-border Rules: International standards'));

      const complianceResults = {
        dataProtection: { status: 'compliant', framework: 'GDPR/DSG' },
        industryRegulations: { status: 'compliant', applicable: ['generic', 'financial'] },
        crossBorder: { status: 'compliant', jurisdiction: 'CH/EU' },
        overallCompliance: 'full'
      };

      console.log(chalk.green(' Compliance Verification: Passed'));
      console.log(chalk.cyan('  - Data Protection: Fully compliant'));
      console.log(chalk.cyan('  - Industry Rules: Multi-sector approval'));
      console.log(chalk.cyan('  - Cross-border: CH/EU compatible'));

      this.processInstance.steps.step7 = {
        name: 'Compliance Verification',
        status: 'completed',
        result: complianceResults,
        timestamp: new Date(),
        duration: 1800
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Compliance Verification Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 8: Service Configuration
   */
  async executeStep8ServiceConfiguration() {
    console.log(chalk.blue.bold('\nSTEP 8: Service Configuration'));
    console.log(chalk.blue('─────────────────────────────\n'));

    try {
      // Configure service parameters
      console.log(chalk.green(' Service Configuration: Setting up'));
      console.log(chalk.cyan('  - Service Profile: Customer preferences'));

      await new Promise(resolve => setTimeout(resolve, 1200));

      console.log(chalk.cyan('  - Access Permissions: Role-based configuration'));
      console.log(chalk.cyan('  - Communication: Channel preferences'));

      const serviceConfig = {
        profile: 'standard_customer',
        permissions: ['data_access', 'service_usage', 'support_contact'],
        communication: {
          channel: DEMO_CUSTOMER.contactInformation.preferredChannel,
          frequency: 'as_needed',
          language: DEMO_CUSTOMER.basicData.language
        },
        features: ['basic_services', 'standard_support']
      };

      console.log(chalk.green(' Service Configuration: Applied'));
      console.log(chalk.cyan('  - Profile: Standard customer'));
      console.log(chalk.cyan('  - Permissions: Full access granted'));
      console.log(chalk.cyan(`  - Language: ${serviceConfig.communication.language.toUpperCase()}`));

      this.processInstance.steps.step8 = {
        name: 'Service Configuration',
        status: 'completed',
        result: serviceConfig,
        timestamp: new Date(),
        duration: 1200
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Service Configuration Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 9: Documentation & Signatures
   */
  async executeStep9DocumentationSignatures() {
    console.log(chalk.blue.bold('\nSTEP 9: Documentation & Signatures'));
    console.log(chalk.blue('───────────────────────────────────────\n'));

    try {
      // Initiate signature process
      const signatureRequest = {
        customerId: this.processInstance.customerId,
        documents: [
          {
            documentId: 'terms-generic-001',
            documentName: 'General Terms and Conditions',
            documentHash: crypto.createHash('sha256').update('generic-terms').digest('hex')
          },
          {
            documentId: 'privacy-policy-001',
            documentName: 'Privacy Policy',
            documentHash: crypto.createHash('sha256').update('privacy-policy').digest('hex')
          }
        ],
        signatureType: 'qualified_electronic_signature',
        notificationMethod: 'email'
      };

      const signatureResponse = await this.apiClient.post('/v1/signature/initiate', signatureRequest);

      console.log(chalk.green(' Signature Process: Initiated'));
      console.log(chalk.cyan(`  - Signature ID: ${signatureResponse.data.signatureId}`));
      console.log(chalk.cyan('  - Documents: 2 items prepared'));
      console.log(chalk.cyan('  - Type: Qualified electronic signature'));

      // Simulate signature completion
      await new Promise(resolve => setTimeout(resolve, 3500));

      console.log(chalk.green(' Customer Signatures: Completed'));
      console.log(chalk.cyan('  - Terms & Conditions: Signed'));
      console.log(chalk.cyan('  - Privacy Policy: Acknowledged'));
      console.log(chalk.cyan('  - Legal Validity: Confirmed'));

      this.processInstance.steps.step9 = {
        name: 'Documentation & Signatures',
        status: 'completed',
        result: {
          signatureId: signatureResponse.data.signatureId,
          documentsCount: 2,
          signatureType: 'qualified_electronic'
        },
        timestamp: new Date(),
        duration: 3500
      };

      return true;
    } catch (error) {
      console.log(chalk.red(' Documentation & Signatures Error:', error.message));
      return false;
    }
  }

  /**
   * Execute Step 10: Process Completion & Metadata
   */
  async executeStep10ProcessCompletion() {
    console.log(chalk.blue.bold('\nSTEP 10: Process Completion & Metadata'));
    console.log(chalk.blue('─────────────────────────────────────────\n'));

    try {
      // Finalize process
      const completionTime = new Date();
      const totalDuration = completionTime - this.processInstance.startTime;

      console.log(chalk.green(' Process Completion: Finalizing'));
      console.log(chalk.cyan('  - Data Archival: Secure storage applied'));

      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(chalk.cyan('  - Audit Trail: Complete log created'));
      console.log(chalk.cyan('  - Notifications: Stakeholders informed'));

      const completionMetadata = {
        processInstanceId: this.processInstance.instanceId,
        customerId: this.processInstance.customerId,
        totalDuration: Math.round(totalDuration / 1000),
        stepsCompleted: Object.keys(this.processInstance.steps).length + 1,
        successRate: '100%',
        complianceStatus: 'fully_compliant',
        nextSteps: ['service_activation', 'welcome_communication'],
        archivalReference: `ARC-${Date.now()}`
      };

      console.log(chalk.green(' Process Completion: Successful'));
      console.log(chalk.cyan(`  - Total Duration: ${completionMetadata.totalDuration} seconds`));
      console.log(chalk.cyan(`  - Steps Completed: ${completionMetadata.stepsCompleted}/10`));
      console.log(chalk.cyan('  - Success Rate: 100%'));
      console.log(chalk.cyan('  - Status: Fully compliant'));

      this.processInstance.steps.step10 = {
        name: 'Process Completion',
        status: 'completed',
        result: completionMetadata,
        timestamp: completionTime,
        duration: 1000
      };

      this.processInstance.endTime = completionTime;
      this.processInstance.status = 'completed';

      return true;
    } catch (error) {
      console.log(chalk.red(' Process Completion Error:', error.message));
      return false;
    }
  }

  /**
   * Display process summary
   */
  displayProcessSummary() {
    console.log(chalk.blue.bold('\nProcess Execution Summary'));
    console.log(chalk.blue('──────────────────────────\n'));

    const totalTime = Math.round((this.processInstance.endTime - this.processInstance.startTime) / 1000);
    const completedSteps = Object.keys(this.processInstance.steps).length;

    console.log(chalk.white('Generic 10-Step Reference Process:'));
    console.log(chalk.green(' Process Status: COMPLETED'));
    console.log(chalk.cyan(`  └── Instance ID: ${this.processInstance.instanceId}`));
    console.log(chalk.cyan(`  └── Total Duration: ${totalTime} seconds`));
    console.log(chalk.cyan(`  └── Steps Completed: ${completedSteps}/10`));
    console.log(chalk.cyan(`  └── Success Rate: 100%`));

    console.log(chalk.white('\n Step-by-Step Breakdown:'));
    
    const steps = [
      'Service Discovery',
      'Data Requirements Specification', 
      'Consent Management',
      'Identity Verification',
      'Data Validation',
      'Risk Assessment',
      'Compliance Verification',
      'Service Configuration',
      'Documentation & Signatures',
      'Process Completion & Metadata'
    ];

    steps.forEach((stepName, index) => {
      const stepKey = `step${index + 1}`;
      const stepData = this.processInstance.steps[stepKey];
      const duration = stepData ? `${Math.round(stepData.duration / 1000)}s` : 'N/A';
      console.log(chalk.cyan(`  ${index + 1}. ${stepName}: ${duration}`));
    });
  }

  /**
   * Display framework capabilities
   */
  displayFrameworkCapabilities() {
    console.log(chalk.blue.bold('\nGeneric Framework Capabilities'));
    console.log(chalk.blue('────────────────────────────────────\n'));

    console.log(chalk.white('Universal Architecture:'));
    console.log(chalk.green(' Multi-Industry Support'));
    console.log(chalk.cyan('  ├── Banking & Financial Services'));
    console.log(chalk.cyan('  ├── Healthcare & Insurance'));
    console.log(chalk.cyan('  ├── Government & Public Services'));
    console.log(chalk.cyan('  ├── Telecommunications'));
    console.log(chalk.cyan('  └── E-commerce & Retail'));

    console.log(chalk.green('\n Modular Data Models'));
    console.log(chalk.cyan('  ├── Core Identity Data (universal)'));
    console.log(chalk.cyan('  ├── Industry Extensions (specific)'));
    console.log(chalk.cyan('  ├── Compliance Metadata (regulatory)'));
    console.log(chalk.cyan('  └── Custom Attributes (configurable)'));

    console.log(chalk.green('\n Process Orchestration'));
    console.log(chalk.cyan('  ├── 10-Step Universal Process'));
    console.log(chalk.cyan('  ├── Industry-Specific Variations'));
    console.log(chalk.cyan('  ├── Configurable Business Rules'));
    console.log(chalk.cyan('  └── Real-time Process Monitoring'));

    console.log(chalk.green('\n Security & Compliance'));
    console.log(chalk.cyan('  ├── FAPI 2.0 Security Standards'));
    console.log(chalk.cyan('  ├── Multi-jurisdiction Compliance'));
    console.log(chalk.cyan('  ├── Privacy-by-Design Architecture'));
    console.log(chalk.cyan('  └── Comprehensive Audit Trails'));
  }

  /**
   * Display footer
   */
  displayFooter() {
    console.log(chalk.cyan.bold('\n Universal Reference Process Demonstration Complete!'));
    console.log(chalk.cyan('─────────────────────────────────────────────────────────'));
    
    console.log(chalk.white('\nKey Benefits Demonstrated:'));
    console.log(chalk.green(' Standardized process across all industries'));
    console.log(chalk.green(' Modular architecture for customization'));
    console.log(chalk.green(' Automated compliance verification'));
    console.log(chalk.green(' Real-time process monitoring'));
    console.log(chalk.green(' Comprehensive audit capabilities'));
    console.log(chalk.green(' Privacy-preserving data handling'));

    console.log(chalk.white('\nIndustry Applications:'));
    console.log(chalk.yellow('• Banking: Account opening, loan applications'));
    console.log(chalk.yellow('• Insurance: Policy creation, claims processing'));
    console.log(chalk.yellow('• Healthcare: Patient registration, data sharing'));
    console.log(chalk.yellow('• Government: Citizen services, permit applications'));
    console.log(chalk.yellow('• Telecom: Subscriber onboarding, service activation'));

    console.log(chalk.cyan('\n Framework Documentation: http://localhost:3000/docs'));
    console.log(chalk.cyan(' Process API: http://localhost:3000/v1/process'));
    console.log(chalk.cyan(' Health Status: http://localhost:3000/health\n'));
  }

  /**
   * Run the complete demonstration
   */
  async runDemo() {
    try {
      this.displayHeader();

      // Initialize process
      console.log(chalk.yellow('Initializing universal reference process...\n'));
      const initialized = await this.initializeProcess();
      
      if (!initialized) {
        console.log(chalk.red('Failed to initialize process. Please ensure the API server is running.'));
        return;
      }

      // Execute all 10 steps
      const steps = [
        () => this.executeStep1ServiceDiscovery(),
        () => this.executeStep2DataRequirements(), 
        () => this.executeStep3ConsentManagement(),
        () => this.executeStep4IdentityVerification(),
        () => this.executeStep5DataValidation(),
        () => this.executeStep6RiskAssessment(),
        () => this.executeStep7ComplianceVerification(),
        () => this.executeStep8ServiceConfiguration(),
        () => this.executeStep9DocumentationSignatures(),
        () => this.executeStep10ProcessCompletion()
      ];

      for (const step of steps) {
        const success = await step();
        if (!success) {
          console.log(chalk.red('Process execution failed. Aborting demonstration.'));
          return;
        }
      }

      this.displayProcessSummary();
      this.displayFrameworkCapabilities();
      this.displayFooter();

    } catch (error) {
      console.log(chalk.red('Demo failed:', error.message));
      console.log(chalk.yellow('Make sure the Generic API server is running on'), API_BASE_URL);
    }
  }
}

// Check for required dependencies
const requiredDeps = ['axios', 'chalk'];
for (const dep of requiredDeps) {
  try {
    require.resolve(dep);
  } catch (error) {
    console.error(`Missing dependency: ${dep}`);
    console.error(`Install with: npm install ${dep}`);
    process.exit(1);
  }
}

// Run demonstration
if (require.main === module) {
  const demo = new ReferenceProcessDemo();
  demo.runDemo().catch(error => {
    console.error(chalk.red('Demo error:', error.message));
    process.exit(1);
  });
}

module.exports = ReferenceProcessDemo;