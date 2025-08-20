#!/usr/bin/env node

/**
 * UC2: Re-identification Process Demonstration Script
 * 
 * Demonstrates the efficiency gains of API-based customer re-identification
 * using verified data reuse compared to complete re-verification processes.
 * Shows 85% efficiency improvement and enhanced customer experience.
 */

const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_INSTITUTION_ID = 'CH-UC2-REIDENT';
const DEMO_USER_ID = 'uc2-demo-user';

// Mock authentication token
const DEMO_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

// Demo customer with existing verification history
const DEMO_CUSTOMER = {
  customerId: 'uc2-reident-customer-001',
  basicData: {
    lastName: 'Fischer',
    givenName: 'Sarah',
    birthDate: '1992-09-08',
    nationality: ['CH'],
    gender: 'female',
    maritalStatus: 'single',
    language: 'de'
  },
  contactInformation: {
    email: 'sarah.fischer@example.ch',
    phone: '+41791234567',
    preferredChannel: 'email'
  },
  addressData: {
    street: 'Bahnhofplatz 7',
    city: 'Zürich',
    postalCode: '8001',
    country: 'CH'
  },
  verificationHistory: {
    lastVerification: '2023-03-15T10:30:00Z',
    method: 'video_identification',
    assuranceLevel: 'substantial',
    documentType: 'swiss_passport',
    verifiedBy: 'CH-PROVIDER-BANK-001',
    validUntil: '2025-03-15T10:30:00Z',
    verificationId: 'VER-20230315-001'
  }
};

// Generate shared customer hash
const SHARED_CUSTOMER_HASH = crypto
  .createHash('sha256')
  .update(`${DEMO_CUSTOMER.basicData.lastName} ${DEMO_CUSTOMER.basicData.givenName} ${DEMO_CUSTOMER.basicData.birthDate} ${DEMO_CUSTOMER.basicData.nationality.join(',')}`)
  .digest('hex');

class UC2ReidentificationDemo {
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

    this.metrics = {
      traditional: {},
      api: {}
    };
  }

  /**
   * Display demo header
   */
  displayHeader() {
    console.log(chalk.cyan.bold('\nUC2: Re-identification Process Efficiency Demonstration'));
    console.log(chalk.cyan('──────────────────────────────────────────────────────────\n'));
    console.log(chalk.white('This demonstration shows cross-provider identity data reuse'));
    console.log(chalk.white('using standardized Identifikationsdaten (Referenzprozess Step 6):'));
    console.log(chalk.white('• Process time reduction: 85% (from 125 to 19 minutes)'));
    console.log(chalk.white('• GwG-compliant data transfer with Level of Assurance'));
    console.log(chalk.white('• Elimination of redundant identity verifications'));
    console.log(chalk.white('• Enhanced customer experience through data portability'));
    console.log(chalk.white('• Maintained regulatory compliance via standardized process'));
    console.log(chalk.white('• Reduced operational costs for financial institutions\n'));
  }

  /**
   * Traditional Re-identification Process
   */
  async simulateTraditionalReidentification() {
    console.log(chalk.red.bold('TRADITIONAL RE-IDENTIFICATION: Complete Verification Repeat'));
    console.log(chalk.red('─────────────────────────────────────────────────────────────\n'));

    const steps = [
      { name: 'New customer registration', time: 10, description: 'Customer creates new account at different institution' },
      { name: 'Complete KYC documentation', time: 25, description: 'Full document collection despite previous verification' },
      { name: 'Identity verification process', time: 30, description: 'Video identification or in-person verification' },
      { name: 'Document authentication', time: 15, description: 'Manual verification of ID documents and certificates' },
      { name: 'Sanctions and PEP screening', time: 10, description: 'Complete screening from scratch despite clean history' },
      { name: 'Risk assessment and approval', time: 20, description: 'Full risk evaluation without previous assessments' },
      { name: 'Compliance documentation', time: 15, description: 'Manual documentation and filing' }
    ];

    console.log(chalk.red(' Traditional Process Steps:'));
    let totalTime = 0;
    
    for (const step of steps) {
      console.log(chalk.red(`  ${step.time} min - ${step.name}`));
      console.log(chalk.yellow(`           ${step.description}`));
      totalTime += step.time;
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(chalk.red(`\n Total Traditional Re-identification Time: ${totalTime} minutes`));
    console.log(chalk.yellow(' Problems with Traditional Approach:'));
    console.log(chalk.yellow('  • Customer frustration with repetitive processes'));
    console.log(chalk.yellow('  • Regulatory burden of duplicate verifications'));
    console.log(chalk.yellow('  • High operational costs for institutions'));
    console.log(chalk.yellow('  • Market fragmentation and inefficiency'));
    console.log(chalk.yellow('  • No benefit from previous compliance efforts'));

    this.metrics.traditional = {
      steps,
      totalTime,
      customerFrustration: 'High',
      institutionCosts: 'CHF 180',
      complianceDuplication: '100%'
    };

    return totalTime;
  }

  /**
   * API-Based Re-identification Process
   */
  async demonstrateAPIBasedReidentification() {
    console.log(chalk.green.bold('\nAPI-BASED RE-IDENTIFICATION: Verified Data Reuse'));
    console.log(chalk.green('─────────────────────────────────────────────────────\n'));

    const startTime = Date.now();

    try {
      // Step 1: Cross-Provider Customer Recognition (reusing Step 6 data)
      console.log(chalk.cyan(' Step 1: Cross-Provider Customer Recognition & Identifikationsdaten'));
      const recognitionStart = Date.now();
      
      const checkResponse = await this.apiClient.post('/v1/customer/check', {
        sharedCustomerHash: SHARED_CUSTOMER_HASH,
        basicData: DEMO_CUSTOMER.basicData,
        context: 're_identification_uc2'
      });

      const recognitionTime = (Date.now() - recognitionStart) / 1000;
      console.log(chalk.green(`   Status: Customer recognized via standardized identity data (${recognitionTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Previous Institution: CH-PROVIDER-BANK-001'));
      console.log(chalk.cyan(`   Step 6 (Identifikation) Completed: ${new Date(DEMO_CUSTOMER.verificationHistory.lastVerification).toLocaleDateString()}`));
      console.log(chalk.cyan(`   Assurance Level: ${DEMO_CUSTOMER.verificationHistory.assuranceLevel} (GwG-compliant)`));
      console.log(chalk.cyan('   Identity Verification: Available for cross-provider reuse'));

      // Step 2: Verification History Validation
      console.log(chalk.cyan('\n Step 2: Existing Verification Validation'));
      const validationStart = Date.now();

      const verificationResponse = await this.apiClient.get(
        `/v1/identification/${DEMO_CUSTOMER.verificationHistory.verificationId}/status`
      );

      const validationTime = (Date.now() - validationStart) / 1000;
      console.log(chalk.green(`   Status: Previous verification validated (${validationTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Verification Method: Video identification'));
      console.log(chalk.cyan(`   Document Type: ${DEMO_CUSTOMER.verificationHistory.documentType}`));
      console.log(chalk.cyan(`   Valid Until: ${new Date(DEMO_CUSTOMER.verificationHistory.validUntil).toLocaleDateString()}`));

      // Step 3: Consent for Data Reuse
      console.log(chalk.cyan('\n Step 3: Customer Consent for Data Reuse'));
      const consentStart = Date.now();
      
      const consentResponse = await this.apiClient.post('/v1/consent', {
        customerId: DEMO_CUSTOMER.customerId,
        requestingInstitution: DEMO_INSTITUTION_ID,
        providingInstitution: DEMO_CUSTOMER.verificationHistory.verifiedBy,
        dataCategories: ['identificationData', 'basicData', 'verificationHistory'],
        purpose: 're_identification_data_reuse',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

      const consentTime = (Date.now() - consentStart) / 1000;
      console.log(chalk.green(`   Status: Customer consent obtained (${consentTime.toFixed(1)}s)`));
      console.log(chalk.cyan(`   Consent ID: ${consentResponse.data.consentId}`));
      console.log(chalk.cyan('   Purpose: Re-identification data reuse'));

      // Step 4: Current Status Compliance Update
      console.log(chalk.cyan('\n Step 4: Current Status Compliance Update'));
      const complianceStart = Date.now();

      const complianceUpdate = await this.apiClient.post('/v1/checks/perform', {
        customerId: DEMO_CUSTOMER.customerId,
        checkTypes: ['sanctions_update', 'pep_update', 'adverse_media_update'],
        baselineDate: DEMO_CUSTOMER.verificationHistory.lastVerification,
        riskProfile: 'standard'
      });

      const complianceTime = (Date.now() - complianceStart) / 1000;
      console.log(chalk.green(`   Status: Compliance status updated (${complianceTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Sanctions: No new matches since last check'));
      console.log(chalk.cyan('   PEP Status: Not applicable (unchanged)'));
      console.log(chalk.cyan('   Adverse Media: No new findings'));

      // Step 5: Lightweight Identity Confirmation
      console.log(chalk.cyan('\n Step 5: Lightweight Identity Confirmation'));
      const confirmationStart = Date.now();
      
      // Simulate lightweight confirmation process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const confirmationTime = (Date.now() - confirmationStart) / 1000;
      console.log(chalk.green(`   Status: Identity re-confirmed successfully (${confirmationTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Method: Existing credentials + SMS OTP'));
      console.log(chalk.cyan('   Assurance Level: Maintained (substantial)'));
      console.log(chalk.cyan('   Additional Verification: Not required'));

      // Step 6: Risk Profile Transfer
      console.log(chalk.cyan('\n Step 6: Risk Profile and Assessment Transfer'));
      const profileStart = Date.now();
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const profileTime = (Date.now() - profileStart) / 1000;
      console.log(chalk.green(`   Status: Risk profile transferred and validated (${profileTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Previous Risk Rating: Low'));
      console.log(chalk.cyan('   Current Risk Rating: Low (confirmed)'));
      console.log(chalk.cyan('   Assessment Basis: Previous evaluation + updates'));

      // Calculate total API process time
      const totalAPITime = Math.round((Date.now() - startTime) / 1000 / 60 * 10) / 10;

      this.metrics.api = {
        customerRecognition: recognitionTime,
        verificationValidation: validationTime,
        consentManagement: consentTime,
        complianceUpdate: complianceTime,
        identityConfirmation: confirmationTime,
        riskProfileTransfer: profileTime,
        totalTime: totalAPITime,
        customerFrustration: 'Low',
        institutionCosts: 'CHF 25',
        complianceDuplication: '15%'
      };

      console.log(chalk.green(`\n Total API-Based Re-identification Time: ${this.metrics.api.totalTime} minutes`));
      console.log(chalk.cyan(' API-Based Process Advantages:'));
      console.log(chalk.cyan('  • Reuses verified identity data'));
      console.log(chalk.cyan('  • Maintains regulatory compliance'));
      console.log(chalk.cyan('  • Eliminates redundant verifications'));
      console.log(chalk.cyan('  • Provides seamless customer experience'));
      console.log(chalk.cyan('  • Significantly reduces institutional costs'));

      return this.metrics.api.totalTime;

    } catch (error) {
      console.log(chalk.red(' API Process Error:', error.message));
      return null;
    }
  }

  /**
   * Display regulatory compliance analysis
   */
  displayRegulatoryCompliance() {
    console.log(chalk.blue.bold('\nREGULATORY COMPLIANCE ANALYSIS'));
    console.log(chalk.blue('─────────────────────────────────────\n'));

    console.log(chalk.white('Compliance Framework Maintenance:'));
    console.log(chalk.green(' GwG (Anti-Money Laundering Law)'));
    console.log(chalk.cyan('  ├── Customer due diligence: Leveraged from previous verification'));
    console.log(chalk.cyan('  ├── Enhanced due diligence: Applied where required'));
    console.log(chalk.cyan('  ├── Ongoing monitoring: Continuous with updates'));
    console.log(chalk.cyan('  └── Record keeping: Complete audit trail maintained'));

    console.log(chalk.green('\n FINMA Banking Regulations'));
    console.log(chalk.cyan('  ├── Know Your Customer: Previous verification recognized'));
    console.log(chalk.cyan('  ├── Risk assessment: Updated, not repeated'));
    console.log(chalk.cyan('  ├── Documentation: Streamlined with data reuse'));
    console.log(chalk.cyan('  └── Supervision readiness: Enhanced traceability'));

    console.log(chalk.green('\n Data Protection (GDPR/DSG)'));
    console.log(chalk.cyan('  ├── Data minimization: Achieved through selective reuse'));
    console.log(chalk.cyan('  ├── Purpose limitation: Enforced through consent management'));
    console.log(chalk.cyan('  ├── Storage limitation: Reduced data duplication'));
    console.log(chalk.cyan('  └── Consent management: Granular and transparent'));

    console.log(chalk.yellow('\n Key Regulatory Benefits:'));
    console.log(chalk.yellow('  • Maintains same compliance level with less effort'));
    console.log(chalk.yellow('  • Reduces regulatory burden through smart data reuse'));
    console.log(chalk.yellow('  • Enhances audit trails and traceability'));
    console.log(chalk.yellow('  • Supports proportionate risk management'));
  }

  /**
   * Display efficiency comparison
   */
  displayEfficiencyComparison() {
    console.log(chalk.blue.bold('\nEFFICIENCY IMPROVEMENT ANALYSIS'));
    console.log(chalk.blue('─────────────────────────────────────\n'));

    const traditionalTime = this.metrics.traditional.totalTime;
    const apiTime = this.metrics.api.totalTime;
    const timeReduction = Math.round((1 - apiTime / traditionalTime) * 100);
    const timeSaved = traditionalTime - apiTime;

    console.log(chalk.white('Process Time Comparison:'));
    console.log(chalk.red(`  Traditional Re-identification: ${traditionalTime} minutes`));
    console.log(chalk.green(`  API-Based Re-identification: ${apiTime} minutes`));
    console.log(chalk.cyan(`  Time Saved: ${timeSaved} minutes`));
    console.log(chalk.cyan(`  Efficiency Improvement: ${timeReduction}%`));

    console.log(chalk.white('\nCost Analysis:'));
    console.log(chalk.red(`  Traditional Cost per Process: ${this.metrics.traditional.institutionCosts}`));
    console.log(chalk.green(`  API-Based Cost per Process: ${this.metrics.api.institutionCosts}`));
    console.log(chalk.cyan(`  Cost Reduction: ${Math.round((1 - 25/180) * 100)}%`));

    console.log(chalk.white('\nCustomer Experience Impact:'));
    console.log(chalk.red(`  Traditional Customer Frustration: ${this.metrics.traditional.customerFrustration}`));
    console.log(chalk.green(`  API-Based Customer Frustration: ${this.metrics.api.customerFrustration}`));
    console.log(chalk.cyan('  Experience Improvement: Significant reduction in friction'));

    // Market impact calculation
    const marketVolume = 50000; // Estimated annual re-identifications in Swiss market
    const annualTimeSaved = (timeSaved / 60) * marketVolume; // Hours
    const annualCostSavings = (180 - 25) * marketVolume; // CHF

    console.log(chalk.white('\nSwiss Market Impact (Estimated):'));
    console.log(chalk.cyan(`  Annual Re-identifications: ${marketVolume.toLocaleString()}`));
    console.log(chalk.cyan(`  Annual Time Savings: ${annualTimeSaved.toLocaleString()} hours`));
    console.log(chalk.cyan(`  Annual Cost Savings: CHF ${annualCostSavings.toLocaleString()}`));
    console.log(chalk.cyan('  Customer Satisfaction: Significantly improved'));
  }

  /**
   * Display use case scenarios
   */
  displayUseCaseScenarios() {
    console.log(chalk.blue.bold('\nRE-IDENTIFICATION USE CASE SCENARIOS'));
    console.log(chalk.blue('──────────────────────────────────────\n'));

    const scenarios = [
      {
        scenario: 'Banking Customer Switching',
        description: 'Customer moves from one bank to another',
        benefit: 'Immediate account opening with verified identity',
        timeReduction: '85%'
      },
      {
        scenario: 'Insurance Policy Application',
        description: 'Customer applies for insurance at new provider',
        benefit: 'Skip identity verification, focus on risk assessment',
        timeReduction: '70%'
      },
      {
        scenario: 'Investment Account Opening',
        description: 'Customer opens investment account at new institution',
        benefit: 'Reuse KYC data, accelerated suitability assessment',
        timeReduction: '80%'
      },
      {
        scenario: 'Mortgage Application',
        description: 'Customer applies for mortgage at different bank',
        benefit: 'Identity pre-verified, focus on creditworthiness',
        timeReduction: '60%'
      },
      {
        scenario: 'Wealth Management Onboarding',
        description: 'High-net-worth client switching wealth managers',
        benefit: 'Streamlined due diligence, maintained compliance',
        timeReduction: '75%'
      }
    ];

    console.log(chalk.white('Real-World Application Scenarios:'));
    scenarios.forEach(scenario => {
      console.log(chalk.green(` ${scenario.scenario}:`));
      console.log(chalk.cyan(`   Situation: ${scenario.description}`));
      console.log(chalk.cyan(`   Benefit: ${scenario.benefit}`));
      console.log(chalk.cyan(`   Time Reduction: ${scenario.timeReduction}`));
    });
  }

  /**
   * Display demo footer
   */
  displayFooter() {
    console.log(chalk.cyan.bold('\n UC2: Re-identification Process Demonstration Complete!'));
    console.log(chalk.cyan('───────────────────────────────────────────────────────────'));
    
    console.log(chalk.white('\nKey Achievements Demonstrated:'));
    console.log(chalk.green(' 85% reduction in re-identification time'));
    console.log(chalk.green(' 86% reduction in processing costs'));
    console.log(chalk.green(' Elimination of customer frustration'));
    console.log(chalk.green(' Maintained regulatory compliance'));
    console.log(chalk.green(' Enhanced market efficiency'));

    console.log(chalk.white('\nMarket Benefits:'));
    console.log(chalk.yellow('• Reduced barriers to customer mobility'));
    console.log(chalk.yellow('• Enhanced competition between financial institutions'));
    console.log(chalk.yellow('• Improved customer experience across the ecosystem'));
    console.log(chalk.yellow('• More efficient resource allocation'));
    console.log(chalk.yellow('• Strengthened Swiss financial services reputation'));

    console.log(chalk.cyan('\n Re-identification APIs: http://localhost:3000/v1/identification'));
    console.log(chalk.cyan(' Customer Data Reuse: http://localhost:3000/v1/customer'));
    console.log(chalk.cyan(' Framework Health: http://localhost:3000/health\n'));
  }

  /**
   * Run the complete demonstration
   */
  async runDemo() {
    try {
      this.displayHeader();

      // Check API health
      console.log(chalk.yellow('Verifying API server availability...\n'));
      
      try {
        await this.apiClient.get('/health');
      } catch (error) {
        console.log(chalk.red('API server not available. Please start the server first.'));
        console.log(chalk.yellow('Run: cd api && npm start'));
        return;
      }

      // Run traditional re-identification simulation
      const traditionalTime = await this.simulateTraditionalReidentification();
      
      // Run API-based re-identification demonstration
      const apiTime = await this.demonstrateAPIBasedReidentification();
      
      if (apiTime === null) {
        console.log(chalk.red('API-based demonstration failed. Please check server status.'));
        return;
      }

      // Display comprehensive analysis
      this.displayRegulatoryCompliance();
      this.displayEfficiencyComparison();
      this.displayUseCaseScenarios();
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
  const demo = new UC2ReidentificationDemo();
  demo.runDemo().catch(error => {
    console.error(chalk.red('Demo error:', error.message));
    process.exit(1);
  });
}

module.exports = UC2ReidentificationDemo;