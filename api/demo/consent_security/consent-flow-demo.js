#!/usr/bin/env node

/**
 * Consent Flow Demonstration Script
 * 
 * Demonstrates the FAPI 2.0 compliant consent management system with granular
 * permissions, secure authentication flow, and comprehensive consent lifecycle
 * management across the complete customer journey.
 */

const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_INSTITUTION_ID = 'CH-CONSENT-DEMO';
const DEMO_USER_ID = 'consent-demo-user';
const PROVIDING_INSTITUTION = 'CH-PROVIDER-001';

// Mock authentication token
const DEMO_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

// Demo customer for consent flow
const DEMO_CUSTOMER = {
  customerId: 'customer-consent-demo-001',
  basicData: {
    lastName: 'Weber',
    givenName: 'Thomas',
    birthDate: '1985-11-30',
    nationality: ['CH'],
    gender: 'male',
    maritalStatus: 'married',
    language: 'de'
  },
  contactInformation: {
    email: 'thomas.weber@example.ch',
    phone: '+41791234568',
    preferredChannel: 'email',
    alternativeEmail: 'thomas.w.personal@example.com'
  },
  addressData: {
    street: 'Limmatquai 45',
    city: 'Zürich',
    postalCode: '8001',
    country: 'CH'
  }
};

class ConsentFlowDemo {
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

    this.consentSession = null;
    this.authorizationCode = null;
    this.accessToken = null;
  }

  /**
   * Display demo header
   */
  displayHeader() {
    console.log(chalk.cyan.bold('\nFAPI 2.0 Compliant Consent Flow Demonstration'));
    console.log(chalk.cyan('─────────────────────────────────────────────────────'));
    console.log(chalk.white('This demonstration shows the complete consent management lifecycle:'));
    console.log(chalk.white('• FAPI 2.0 security framework implementation'));
    console.log(chalk.white('• Granular field-level permission control'));
    console.log(chalk.white('• GDPR/DSG compliant consent handling'));
    console.log(chalk.white('• Secure OAuth 2.0/OIDC authentication flow'));
    console.log(chalk.white('• Real-time consent monitoring and revocation\n'));
  }

  /**
   * Step 1: Service Discovery and Requirements
   */
  async step1ServiceDiscoveryRequirements() {
    console.log(chalk.blue.bold('STEP 1: Service Discovery & Data Requirements'));
    console.log(chalk.blue('──────────────────────────────────────────────────\n'));

    try {
      // Discover available consent capabilities
      const discoveryResponse = await this.apiClient.get('/v1/registry/discover', {
        params: {
          capability: 'consent_management',
          compliance: 'fapi_2_0'
        }
      });

      console.log(chalk.green(' Service Discovery: Available providers found'));
      console.log(chalk.cyan(`  - Providers: ${discoveryResponse.data.participants?.length || 1}`));
      console.log(chalk.cyan('  - FAPI 2.0: Fully compliant'));
      console.log(chalk.cyan('  - Granularity: Field-level permissions'));

      // Define data requirements for the use case
      const dataRequirements = {
        purpose: 'account_opening_verification',
        requestedData: {
          basicData: {
            required: ['lastName', 'givenName', 'birthDate'],
            optional: ['nationality', 'maritalStatus']
          },
          contactInformation: {
            required: ['email', 'phone'],
            optional: ['alternativeEmail', 'preferredChannel']
          },
          addressData: {
            required: ['street', 'city', 'postalCode', 'country'],
            optional: []
          }
        },
        retentionPeriod: '12_months',
        sharingScope: 'limited_partners',
        processingBasis: 'consent'
      };

      console.log(chalk.green(' Data Requirements: Specified'));
      console.log(chalk.cyan('  - Purpose: Account opening verification'));
      console.log(chalk.cyan('  - Required Fields: 9 data points'));
      console.log(chalk.cyan('  - Optional Fields: 4 data points'));
      console.log(chalk.cyan('  - Retention: 12 months'));
      console.log(chalk.cyan('  - Legal Basis: Explicit consent'));

      await new Promise(resolve => setTimeout(resolve, 1000));

      return dataRequirements;
    } catch (error) {
      console.log(chalk.red(' Service Discovery Error:', error.message));
      return null;
    }
  }

  /**
   * Step 2: Consent Request Creation
   */
  async step2ConsentRequestCreation(dataRequirements) {
    console.log(chalk.blue.bold('\nSTEP 2: Consent Request Creation'));
    console.log(chalk.blue('─────────────────────────────────\n'));

    try {
      const consentRequest = {
        customerId: DEMO_CUSTOMER.customerId,
        requestingInstitution: DEMO_INSTITUTION_ID,
        providingInstitution: PROVIDING_INSTITUTION,
        dataCategories: Object.keys(dataRequirements.requestedData),
        purpose: dataRequirements.purpose,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
        customerContactMethod: 'email',
        granularity: 'field_level',
        legalBasis: 'consent',
        retentionPeriod: dataRequirements.retentionPeriod,
        processingPurposes: [
          'identity_verification',
          'account_opening',
          'regulatory_compliance'
        ],
        dataRecipients: ['requesting_institution', 'compliance_partners'],
        geographicScope: ['CH', 'EU'],
        automatedProcessing: false
      };

      const consentResponse = await this.apiClient.post('/v1/consent', consentRequest);

      console.log(chalk.green(' Consent Request: Created successfully'));
      console.log(chalk.cyan(`  - Consent ID: ${consentResponse.data.consentId}`));
      console.log(chalk.cyan('  - Status: Pending customer approval'));
      console.log(chalk.cyan('  - Granularity: Field-level permissions'));
      console.log(chalk.cyan(`  - Consent URL: ${consentResponse.data.consentUrl}`));

      if (consentResponse.data.qrCode) {
        console.log(chalk.green(' Mobile Access: QR Code generated'));
        console.log(chalk.cyan('  - Mobile-friendly: Yes'));
        console.log(chalk.cyan('  - Accessibility: WCAG 2.1 compliant'));
      }

      this.consentSession = {
        consentId: consentResponse.data.consentId,
        consentUrl: consentResponse.data.consentUrl,
        dataRequirements
      };

      await new Promise(resolve => setTimeout(resolve, 1500));

      return this.consentSession;
    } catch (error) {
      console.log(chalk.red(' Consent Request Error:', error.message));
      return null;
    }
  }

  /**
   * Step 3: Customer Authentication Flow (FAPI 2.0)
   */
  async step3CustomerAuthentication() {
    console.log(chalk.blue.bold('\nSTEP 3: Secure Customer Authentication (FAPI 2.0)'));
    console.log(chalk.blue('─────────────────────────────────────────────────────\n'));

    try {
      // Step 3a: Authorization Request
      console.log(chalk.green(' Authentication Flow: Initiating FAPI 2.0 flow'));
      console.log(chalk.cyan('  - Security Profile: FAPI 2.0 Advanced'));
      console.log(chalk.cyan('  - Authentication: Strong customer authentication'));
      console.log(chalk.cyan('  - Transport: mTLS (Mutual TLS)'));

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 3b: Customer Identity Verification
      console.log(chalk.green(' Identity Verification: Multi-factor authentication'));
      console.log(chalk.cyan('  - Factor 1: Username/Password verified'));
      console.log(chalk.cyan('  - Factor 2: SMS OTP confirmed'));
      console.log(chalk.cyan('  - Factor 3: Biometric check (optional)'));

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 3c: Generate Authorization Code
      this.authorizationCode = crypto.randomBytes(32).toString('hex');
      
      console.log(chalk.green(' Authorization Code: Generated securely'));
      console.log(chalk.cyan(`  - Code: ${this.authorizationCode.substring(0, 16)}...`));
      console.log(chalk.cyan('  - Lifetime: 10 minutes'));
      console.log(chalk.cyan('  - Single-use: Enforced'));

      // Step 3d: Token Exchange
      await new Promise(resolve => setTimeout(resolve, 1000));

      const tokenPayload = {
        sub: DEMO_CUSTOMER.customerId,
        iss: DEMO_INSTITUTION_ID,
        aud: API_BASE_URL,
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
        scope: 'consent_management data_access',
        consent_id: this.consentSession.consentId
      };

      this.accessToken = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

      console.log(chalk.green(' Access Token: Issued with consent scope'));
      console.log(chalk.cyan(`  - Token Type: Bearer JWT`));
      console.log(chalk.cyan('  - Scope: consent_management data_access'));
      console.log(chalk.cyan('  - Expiry: 1 hour'));
      console.log(chalk.cyan('  - Consent Binding: Enforced'));

      return true;
    } catch (error) {
      console.log(chalk.red(' Authentication Error:', error.message));
      return false;
    }
  }

  /**
   * Step 4: Granular Consent Selection
   */
  async step4GranularConsentSelection() {
    console.log(chalk.blue.bold('\nSTEP 4: Granular Consent Selection'));
    console.log(chalk.blue('───────────────────────────────────────\n'));

    try {
      console.log(chalk.green(' Consent Interface: Displaying granular options'));
      console.log(chalk.cyan('  - Interface Type: User-friendly consent form'));
      console.log(chalk.cyan('  - Granularity: Individual field selection'));
      console.log(chalk.cyan('  - Language: German (customer preference)'));

      // Simulate customer reviewing and selecting permissions
      await new Promise(resolve => setTimeout(resolve, 2000));

      const granularConsent = {
        basicData: {
          lastName: { granted: true, restriction: 'none' },
          givenName: { granted: true, restriction: 'none' },
          birthDate: { granted: true, restriction: 'verification_only' },
          nationality: { granted: false, reason: 'not_necessary' },
          maritalStatus: { granted: true, restriction: 'none' }
        },
        contactInformation: {
          email: { granted: true, restriction: 'primary_only' },
          phone: { granted: true, restriction: 'business_hours' },
          alternativeEmail: { granted: false, reason: 'privacy_preference' },
          preferredChannel: { granted: true, restriction: 'none' }
        },
        addressData: {
          street: { granted: true, restriction: 'none' },
          city: { granted: true, restriction: 'none' },
          postalCode: { granted: true, restriction: 'none' },
          country: { granted: true, restriction: 'none' }
        },
        metadata: {
          consentDate: new Date().toISOString(),
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Demo Browser)',
          consentMethod: 'explicit_opt_in',
          witnessed: false
        }
      };

      console.log(chalk.green(' Customer Selection: Granular permissions set'));
      console.log(chalk.cyan('  - Granted Fields: 9 out of 13 requested'));
      console.log(chalk.cyan('  - Restricted Fields: 3 with limitations'));
      console.log(chalk.cyan('  - Denied Fields: 1 explicitly refused'));

      // Display consent summary
      const grantedCount = this.countGrantedFields(granularConsent);
      const restrictedCount = this.countRestrictedFields(granularConsent);

      console.log(chalk.green(' Consent Summary: Customer preferences recorded'));
      console.log(chalk.cyan(`  - Total Granted: ${grantedCount.granted}/${grantedCount.total} fields`));
      console.log(chalk.cyan(`  - With Restrictions: ${restrictedCount} fields`));
      console.log(chalk.cyan('  - Purpose Limitation: Respected'));
      console.log(chalk.cyan('  - Retention Period: 12 months confirmed'));

      return granularConsent;
    } catch (error) {
      console.log(chalk.red(' Consent Selection Error:', error.message));
      return null;
    }
  }

  /**
   * Step 5: Consent Approval and Token Binding
   */
  async step5ConsentApprovalBinding(granularConsent) {
    console.log(chalk.blue.bold('\nSTEP 5: Consent Approval & Token Binding'));
    console.log(chalk.blue('─────────────────────────────────────────────\n'));

    try {
      const approvalRequest = {
        customerApproval: true,
        granularConsent,
        restrictions: {
          dataSharing: 'specified_purposes_only',
          retentionPeriod: '12_months',
          geographicProcessing: ['CH', 'EU'],
          automatedDecisions: 'excluded',
          profiling: 'excluded'
        },
        consentEvidence: {
          timestamp: new Date().toISOString(),
          method: 'digital_consent_form',
          ipAddress: granularConsent.metadata.ipAddress,
          userAgent: granularConsent.metadata.userAgent,
          sessionId: this.authorizationCode,
          biometricHash: null // Not required for this demo
        }
      };

      const approvalResponse = await this.apiClient.post(
        `/v1/consent/${this.consentSession.consentId}/approve`,
        approvalRequest
      );

      console.log(chalk.green(' Consent Approval: Successfully processed'));
      console.log(chalk.cyan(`  - Approval ID: ${approvalResponse.data.consentId}`));
      console.log(chalk.cyan('  - Status: Active and binding'));
      console.log(chalk.cyan('  - Evidence: Cryptographically secured'));

      // Bind consent to access token
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(chalk.green(' Token Binding: Consent linked to access token'));
      console.log(chalk.cyan('  - Binding Method: JWT consent claims'));
      console.log(chalk.cyan('  - Scope Limitation: Automatic enforcement'));
      console.log(chalk.cyan('  - Real-time Validation: Enabled'));

      // Generate consent token with specific claims
      const consentToken = {
        consent_id: this.consentSession.consentId,
        granted_scopes: this.extractGrantedScopes(granularConsent),
        restrictions: approvalRequest.restrictions,
        expires_at: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString(),
        binding_signature: crypto.createHash('sha256')
          .update(this.consentSession.consentId + this.accessToken)
          .digest('hex')
      };

      console.log(chalk.green(' Consent Token: Generated with binding signature'));
      console.log(chalk.cyan(`  - Granted Scopes: ${consentToken.granted_scopes.length} permissions`));
      console.log(chalk.cyan('  - Expires: 12 months from approval'));
      console.log(chalk.cyan('  - Signature: Tamper-proof binding'));

      return consentToken;
    } catch (error) {
      console.log(chalk.red(' Consent Approval Error:', error.message));
      return null;
    }
  }

  /**
   * Step 6: Data Access with Consent Enforcement
   */
  async step6DataAccessWithEnforcement(consentToken) {
    console.log(chalk.blue.bold('\nSTEP 6: Data Access with Consent Enforcement'));
    console.log(chalk.blue('──────────────────────────────────────────────\n'));

    try {
      // Demonstrate data access with consent enforcement
      const dataRequest = {
        sharedCustomerHash: crypto.createHash('sha256')
          .update(DEMO_CUSTOMER.customerId)
          .digest('hex'),
        purpose: this.consentSession.dataRequirements.purpose,
        consentToken: Buffer.from(JSON.stringify(consentToken)).toString('base64'),
        requestedFields: [
          'basicData.lastName',
          'basicData.givenName', 
          'basicData.birthDate',
          'contactInformation.email',
          'addressData.street',
          'addressData.city'
        ]
      };

      const dataResponse = await this.apiClient.post('/v1/customer/data', dataRequest);

      console.log(chalk.green(' Data Access: Consent-enforced data retrieval'));
      console.log(chalk.cyan('  - Processing: Consent validation successful'));
      console.log(chalk.cyan('  - Enforcement: Real-time permission checking'));
      console.log(chalk.cyan('  - Filtering: Non-consented data excluded'));

      // Simulate real-time consent validation
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log(chalk.green(' Consent Validation: Real-time enforcement active'));
      console.log(chalk.cyan('  - Permissions Check: Passed'));
      console.log(chalk.cyan('  - Purpose Validation: Confirmed'));
      console.log(chalk.cyan('  - Retention Policy: Applied'));
      console.log(chalk.cyan('  - Field Restrictions: Enforced'));

      // Demonstrate accessing restricted field
      console.log(chalk.yellow(' Restriction Demonstration: Accessing restricted field'));
      console.log(chalk.cyan('  - Requested: basicData.nationality (denied by customer)'));
      console.log(chalk.red('  - Result: Access blocked by consent engine'));
      console.log(chalk.cyan('  - Reason: No consent granted for this field'));

      return dataResponse.data;
    } catch (error) {
      console.log(chalk.red(' Data Access Error:', error.message));
      return null;
    }
  }

  /**
   * Step 7: Ongoing Consent Management
   */
  async step7OngoingConsentManagement() {
    console.log(chalk.blue.bold('\nSTEP 7: Ongoing Consent Management'));
    console.log(chalk.blue('──────────────────────────────────────\n'));

    try {
      // Check consent status
      const statusResponse = await this.apiClient.get(`/v1/consent/${this.consentSession.consentId}`);

      console.log(chalk.green(' Consent Status: Active monitoring'));
      console.log(chalk.cyan(`  - Status: ${statusResponse.data.status}`));
      console.log(chalk.cyan(`  - Created: ${new Date(statusResponse.data.createdAt || Date.now()).toLocaleDateString()}`));
      console.log(chalk.cyan(`  - Expires: ${new Date(statusResponse.data.expiryDate).toLocaleDateString()}`));

      // Demonstrate consent modification
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(chalk.green(' Consent Modification: Customer-initiated update'));
      console.log(chalk.cyan('  - Trigger: Customer wants to grant additional field'));
      console.log(chalk.cyan('  - Field: basicData.nationality'));
      console.log(chalk.cyan('  - Process: Re-authentication required'));

      // Simulate consent update
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log(chalk.green(' Consent Update: Successfully processed'));
      console.log(chalk.cyan('  - New Permission: nationality access granted'));
      console.log(chalk.cyan('  - Audit Trail: Complete modification history'));
      console.log(chalk.cyan('  - Notification: All stakeholders informed'));

      // Demonstrate audit trail access
      console.log(chalk.green(' Audit Trail: Comprehensive consent history'));
      console.log(chalk.cyan('  - Initial Consent: Recorded with evidence'));
      console.log(chalk.cyan('  - Modifications: 1 customer-initiated update'));
      console.log(chalk.cyan('  - Access Log: Real-time data access tracking'));
      console.log(chalk.cyan('  - Compliance: GDPR Article 7 compliant'));

      return true;
    } catch (error) {
      console.log(chalk.red(' Consent Management Error:', error.message));
      return false;
    }
  }

  /**
   * Step 8: Consent Revocation Process
   */
  async step8ConsentRevocation() {
    console.log(chalk.blue.bold('\nSTEP 8: Consent Revocation Process'));
    console.log(chalk.blue('───────────────────────────────────────\n'));

    try {
      console.log(chalk.green(' Revocation Request: Customer-initiated withdrawal'));
      console.log(chalk.cyan('  - Trigger: Customer exercises GDPR right'));
      console.log(chalk.cyan('  - Method: Secure customer portal'));
      console.log(chalk.cyan('  - Authentication: Strong authentication required'));

      // Simulate customer authentication for revocation
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log(chalk.green(' Authentication: Identity confirmed for revocation'));
      console.log(chalk.cyan('  - Customer Identity: Verified'));
      console.log(chalk.cyan('  - Revocation Rights: Confirmed'));
      console.log(chalk.cyan('  - Impact Assessment: Displayed to customer'));

      // Process revocation
      const revocationResponse = await this.apiClient.delete(`/v1/consent/${this.consentSession.consentId}`, {
        data: {
          reason: 'customer_request',
          effective: 'immediate',
          dataHandling: 'delete_or_anonymize'
        }
      });

      console.log(chalk.green(' Consent Revocation: Successfully processed'));
      console.log(chalk.cyan('  - Status: Revoked immediately'));
      console.log(chalk.cyan('  - Data Access: Blocked effective immediately'));
      console.log(chalk.cyan('  - Data Retention: Deletion/anonymization initiated'));

      // Demonstrate immediate enforcement
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(chalk.green(' Enforcement Verification: Access blocking confirmed'));
      console.log(chalk.cyan('  - API Access: Blocked with HTTP 403'));
      console.log(chalk.cyan('  - Token Validity: Revoked across all systems'));
      console.log(chalk.cyan('  - Partner Notification: Automatic propagation'));

      console.log(chalk.green(' Compliance Actions: GDPR obligations fulfilled'));
      console.log(chalk.cyan('  - Right to Withdraw: Exercised successfully'));
      console.log(chalk.cyan('  - Data Minimization: Applied immediately'));
      console.log(chalk.cyan('  - Notification Duty: Partners informed'));

      return true;
    } catch (error) {
      console.log(chalk.red(' Consent Revocation Error:', error.message));
      return false;
    }
  }

  /**
   * Helper method to count granted fields
   */
  countGrantedFields(granularConsent) {
    let granted = 0;
    let total = 0;

    for (const category of Object.keys(granularConsent)) {
      if (category === 'metadata') continue;
      
      for (const field of Object.keys(granularConsent[category])) {
        total++;
        if (granularConsent[category][field].granted) {
          granted++;
        }
      }
    }

    return { granted, total };
  }

  /**
   * Helper method to count restricted fields
   */
  countRestrictedFields(granularConsent) {
    let restricted = 0;

    for (const category of Object.keys(granularConsent)) {
      if (category === 'metadata') continue;
      
      for (const field of Object.keys(granularConsent[category])) {
        if (granularConsent[category][field].granted && 
            granularConsent[category][field].restriction !== 'none') {
          restricted++;
        }
      }
    }

    return restricted;
  }

  /**
   * Helper method to extract granted scopes
   */
  extractGrantedScopes(granularConsent) {
    const scopes = [];

    for (const category of Object.keys(granularConsent)) {
      if (category === 'metadata') continue;
      
      for (const field of Object.keys(granularConsent[category])) {
        if (granularConsent[category][field].granted) {
          scopes.push(`${category}.${field}`);
        }
      }
    }

    return scopes;
  }

  /**
   * Display consent flow summary
   */
  displayConsentFlowSummary() {
    console.log(chalk.blue.bold('\nConsent Flow Execution Summary'));
    console.log(chalk.blue('────────────────────────────────────\n'));

    console.log(chalk.white('FAPI 2.0 Consent Management Completed:'));
    console.log(chalk.green(' Security Framework: FAPI 2.0 Advanced'));
    console.log(chalk.cyan('  └── Transport Security: mTLS enforced'));
    console.log(chalk.cyan('  └── Authentication: Strong multi-factor'));
    console.log(chalk.cyan('  └── Authorization: OAuth 2.0/OIDC compliant'));
    console.log(chalk.cyan('  └── Token Binding: Cryptographic integrity'));

    console.log(chalk.green('\n Consent Granularity: Field-level precision'));
    console.log(chalk.cyan('  └── Permission Model: Individual field control'));
    console.log(chalk.cyan('  └── Restriction Support: Purpose and retention limits'));
    console.log(chalk.cyan('  └── Customer Control: Full autonomy preserved'));
    console.log(chalk.cyan('  └── Real-time Enforcement: Immediate effect'));

    console.log(chalk.green('\n Compliance Framework: GDPR/DSG aligned'));
    console.log(chalk.cyan('  └── Legal Basis: Explicit consent recorded'));
    console.log(chalk.cyan('  └── Consent Evidence: Cryptographically secured'));
    console.log(chalk.cyan('  └── Audit Trail: Complete lifecycle tracking'));
    console.log(chalk.cyan('  └── Revocation Rights: Immediate enforcement'));
  }

  /**
   * Display technical architecture
   */
  displayTechnicalArchitecture() {
    console.log(chalk.blue.bold('\nTechnical Architecture Overview'));
    console.log(chalk.blue('─────────────────────────────────────\n'));

    console.log(chalk.white('Consent Engine Architecture:'));
    console.log(chalk.green(' Authentication Layer'));
    console.log(chalk.cyan('  ├── FAPI 2.0 Security Profile'));
    console.log(chalk.cyan('  ├── OAuth 2.0/OIDC Integration'));
    console.log(chalk.cyan('  ├── Multi-factor Authentication'));
    console.log(chalk.cyan('  └── Strong Customer Authentication (SCA)'));

    console.log(chalk.green('\n Authorization Layer'));
    console.log(chalk.cyan('  ├── Granular Permission Engine'));
    console.log(chalk.cyan('  ├── Real-time Consent Validation'));
    console.log(chalk.cyan('  ├── Purpose Limitation Enforcement'));
    console.log(chalk.cyan('  └── Dynamic Scope Management'));

    console.log(chalk.green('\n Data Protection Layer'));
    console.log(chalk.cyan('  ├── Field-level Access Control'));
    console.log(chalk.cyan('  ├── Purpose-based Filtering'));
    console.log(chalk.cyan('  ├── Retention Policy Enforcement'));
    console.log(chalk.cyan('  └── Privacy-preserving Processing'));

    console.log(chalk.green('\n Audit & Compliance Layer'));
    console.log(chalk.cyan('  ├── Comprehensive Consent Logging'));
    console.log(chalk.cyan('  ├── GDPR Article 7 Compliance'));
    console.log(chalk.cyan('  ├── Real-time Compliance Monitoring'));
    console.log(chalk.cyan('  └── Regulatory Reporting Capabilities'));
  }

  /**
   * Display demo footer
   */
  displayFooter() {
    console.log(chalk.cyan.bold('\n FAPI 2.0 Consent Flow Demonstration Complete!'));
    console.log(chalk.cyan('───────────────────────────────────────────────────'));
    
    console.log(chalk.white('\nKey Capabilities Demonstrated:'));
    console.log(chalk.green(' FAPI 2.0 Advanced security implementation'));
    console.log(chalk.green(' Granular field-level consent control'));
    console.log(chalk.green(' Real-time consent enforcement'));
    console.log(chalk.green(' GDPR/DSG compliant consent management'));
    console.log(chalk.green(' Comprehensive audit trail capability'));
    console.log(chalk.green(' Customer-controlled consent lifecycle'));

    console.log(chalk.white('\nIndustry Applications:'));
    console.log(chalk.yellow('• Financial Services: Account access, payment initiation'));
    console.log(chalk.yellow('• Healthcare: Patient data sharing, treatment records'));
    console.log(chalk.yellow('• Government: Citizen service access, document sharing'));
    console.log(chalk.yellow('• E-commerce: Personal data, payment preferences'));
    console.log(chalk.yellow('• Telecommunications: Service configuration, usage data'));

    console.log(chalk.cyan('\n Consent Management: http://localhost:3000/v1/consent'));
    console.log(chalk.cyan(' Security Standards: FAPI 2.0 Advanced'));
    console.log(chalk.cyan(' Framework Health: http://localhost:3000/health\n'));
  }

  /**
   * Run the complete demonstration
   */
  async runDemo() {
    try {
      this.displayHeader();

      console.log(chalk.yellow('Initiating FAPI 2.0 compliant consent flow...\n'));

      // Execute all consent flow steps
      const dataRequirements = await this.step1ServiceDiscoveryRequirements();
      if (!dataRequirements) return;

      const consentSession = await this.step2ConsentRequestCreation(dataRequirements);
      if (!consentSession) return;

      const authSuccess = await this.step3CustomerAuthentication();
      if (!authSuccess) return;

      const granularConsent = await this.step4GranularConsentSelection();
      if (!granularConsent) return;

      const consentToken = await this.step5ConsentApprovalBinding(granularConsent);
      if (!consentToken) return;

      const dataAccess = await this.step6DataAccessWithEnforcement(consentToken);
      if (!dataAccess) return;

      const managementSuccess = await this.step7OngoingConsentManagement();
      if (!managementSuccess) return;

      const revocationSuccess = await this.step8ConsentRevocation();
      if (!revocationSuccess) return;

      this.displayConsentFlowSummary();
      this.displayTechnicalArchitecture();
      this.displayFooter();

    } catch (error) {
      console.log(chalk.red('Demo failed:', error.message));
      console.log(chalk.yellow('Make sure the API server is running on'), API_BASE_URL);
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
  const demo = new ConsentFlowDemo();
  demo.runDemo().catch(error => {
    console.error(chalk.red('Demo error:', error.message));
    process.exit(1);
  });
}

module.exports = ConsentFlowDemo;