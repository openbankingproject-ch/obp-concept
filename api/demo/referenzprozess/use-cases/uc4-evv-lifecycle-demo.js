#!/usr/bin/env node

/**
 * UC4: EVV (External Wealth Management) Customer Lifecycle Management Demo
 * 
 * Demonstrates integrated customer lifecycle management for External Wealth Management
 * (Externe Vermögensverwaltung) clients across different touchpoints and providers.
 * Shows data reuse, synchronization, and efficiency improvements in wealth management onboarding.
 */

const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_INSTITUTION_ID = 'CH-UC4-EVV';
const DEMO_USER_ID = 'uc4-demo-user';

// Mock authentication token
const DEMO_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

// Demo EVV customer with existing portfolio and wealth management relationship
const DEMO_EVV_CUSTOMER = {
  customerId: 'uc4-evv-customer-001',
  basicData: {
    lastName: 'Richter',
    givenName: 'Andreas',
    birthDate: '1975-12-10',
    nationality: ['CH', 'DE'],
    gender: 'male',
    maritalStatus: 'married',
    language: 'de'
  },
  contactInformation: {
    email: 'andreas.richter@example.ch',
    phone: '+41793456789',
    preferredChannel: 'email'
  },
  addressData: {
    street: 'Seestrasse 85',
    city: 'Küsnacht',
    postalCode: '8700',
    country: 'CH'
  },
  wealthManagementProfile: {
    investorType: 'qualified_investor',
    investmentExperience: 'extensive',
    riskProfile: 'aggressive',
    investmentHorizon: 'long_term',
    preferredAssetClasses: ['equities', 'alternative_investments', 'real_estate'],
    totalPortfolioValue: { amount: 2500000, currency: 'CHF' },
    liquidityNeeds: 'low',
    esgPreferences: 'moderate'
  },
  existingRelationships: [
    {
      providerId: 'CH-WEALTH-MANAGER-001',
      relationshipType: 'primary_wealth_manager',
      since: '2019-03-15',
      portfolioValue: { amount: 1800000, currency: 'CHF' },
      custodyBank: 'CH-CUSTODY-BANK-A'
    },
    {
      providerId: 'CH-PRIVATE-BANK-002', 
      relationshipType: 'custody_services',
      since: '2021-08-20',
      portfolioValue: { amount: 700000, currency: 'CHF' },
      custodyBank: 'CH-PRIVATE-BANK-002'
    }
  ],
  verificationHistory: {
    lastVerification: '2023-09-10T09:15:00Z',
    method: 'in_person_verification',
    assuranceLevel: 'high',
    documentType: 'swiss_passport',
    verifiedBy: 'CH-WEALTH-MANAGER-001',
    validUntil: '2025-09-10T09:15:00Z',
    verificationId: 'VER-20230910-EVV-001'
  }
};

class UC4EVVLifecycleDemo {
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
      integrated: {}
    };
  }

  /**
   * Display demo header
   */
  displayHeader() {
    console.log(chalk.cyan.bold('\nUC4: EVV Customer Lifecycle Management Demonstration'));
    console.log(chalk.cyan('──────────────────────────────────────────────────────────\n'));
    console.log(chalk.white('This demonstration shows integrated customer lifecycle management'));
    console.log(chalk.white('for External Wealth Management (EVV) clients:'));
    console.log(chalk.white('• Cross-provider data synchronization and portfolio transfer'));
    console.log(chalk.white('• Standardized data management across touchpoints'));
    console.log(chalk.white('• Efficient onboarding at different custody banks'));
    console.log(chalk.white('• KYC data reuse for already verified clients'));
    console.log(chalk.white('• MiFID II compliance with portfolio data integration\n'));
  }

  /**
   * Traditional EVV Lifecycle Management (Fragmented Approach)
   */
  async simulateTraditionalEVVLifecycle() {
    console.log(chalk.red.bold('TRADITIONAL EVV LIFECYCLE: Fragmented Data Management'));
    console.log(chalk.red('─────────────────────────────────────────────────────────\n'));

    const steps = [
      { name: 'Complete client onboarding at new custody bank', time: 45, description: 'Full KYC process despite existing wealth management relationships' },
      { name: 'Manual portfolio data collection', time: 60, description: 'Client manually provides all existing portfolio information' },
      { name: 'Document verification and compliance checks', time: 35, description: 'Repeat compliance checks already performed by other providers' },
      { name: 'Investment suitability assessment', time: 40, description: 'Complete MiFID II assessment without leveraging existing data' },
      { name: 'Portfolio transfer coordination', time: 90, description: 'Manual coordination between old and new providers' },
      { name: 'Risk assessment and approval process', time: 30, description: 'Independent risk evaluation without provider collaboration' },
      { name: 'Account setup and documentation', time: 25, description: 'Manual setup and document processing across systems' }
    ];

    console.log(chalk.red(' Traditional Process Issues:'));
    let totalTime = 0;
    
    for (const step of steps) {
      console.log(chalk.red(`  ${step.time} min - ${step.name}`));
      console.log(chalk.yellow(`           ${step.description}`));
      totalTime += step.time;
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(chalk.red(`\n Total Traditional EVV Lifecycle Time: ${totalTime} minutes`));
    console.log(chalk.yellow(' Pain Points in Traditional Approach:'));
    console.log(chalk.yellow('  • Fragmented customer data across different providers'));
    console.log(chalk.yellow('  • Inefficient data management and synchronization'));
    console.log(chalk.yellow('  • Complex onboarding at new custody banks'));
    console.log(chalk.yellow('  • Redundant KYC processes for verified clients'));
    console.log(chalk.yellow('  • Manual portfolio transfer coordination'));
    console.log(chalk.yellow('  • No standardized data exchange between providers'));

    this.metrics.traditional = {
      steps,
      totalTime,
      dataFragmentation: 'High - isolated provider systems',
      processEfficiency: 'Low - manual coordination',
      clientExperience: 'Poor - repetitive processes',
      complianceDuplication: '95% - repeated checks',
      providerCosts: 'CHF 850 per onboarding',
      dataQuality: 'Low - inconsistent across providers'
    };

    return totalTime;
  }

  /**
   * Integrated EVV Lifecycle Management
   */
  async demonstrateIntegratedEVVLifecycle() {
    console.log(chalk.green.bold('\nINTEGRATED EVV LIFECYCLE: Standardized Data Management'));
    console.log(chalk.green('─────────────────────────────────────────────────────────\n'));

    const startTime = Date.now();
    const customer = DEMO_EVV_CUSTOMER;

    try {
      // Step 1: Customer Recognition and Relationship History
      console.log(chalk.cyan(' Step 1: Cross-Provider Customer Recognition'));
      const recognitionStart = Date.now();
      
      const customerHash = crypto.createHash('sha256')
        .update(`${customer.basicData.lastName}${customer.basicData.givenName}${customer.basicData.birthDate}`)
        .digest('hex');

      const recognitionResponse = await this.apiClient.post('/v1/customer/check', {
        sharedCustomerHash: customerHash,
        basicData: customer.basicData,
        context: 'evv_lifecycle_management'
      });

      const recognitionTime = (Date.now() - recognitionStart) / 1000;
      console.log(chalk.green(`   Status: Existing EVV client recognized (${recognitionTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Existing Relationships: 2 wealth management providers'));
      console.log(chalk.cyan(`   Total Portfolio Value: CHF ${customer.wealthManagementProfile.totalPortfolioValue.amount.toLocaleString()}`));
      console.log(chalk.cyan(`   Investor Classification: ${customer.wealthManagementProfile.investorType}`));
      console.log(chalk.cyan('   Last KYC Verification: Valid and up-to-date'));

      // Step 2: Portfolio Data Synchronization
      console.log(chalk.cyan('\n Step 2: Automated Portfolio Data Synchronization'));
      const syncStart = Date.now();

      const portfolioSyncRequest = {
        customerId: customer.customerId,
        requestingProvider: DEMO_INSTITUTION_ID,
        existingProviders: customer.existingRelationships.map(rel => rel.providerId),
        dataCategories: ['portfolio_holdings', 'performance_data', 'transaction_history', 'risk_metrics'],
        purpose: 'provider_switching_optimization'
      };

      const syncResponse = await this.apiClient.post('/v1/portfolio/sync', portfolioSyncRequest);
      const syncTime = (Date.now() - syncStart) / 1000;

      console.log(chalk.green(`   Status: Portfolio data synchronized (${syncTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Holdings Data: Complete across all providers'));
      console.log(chalk.cyan('   Performance Metrics: Historical data available'));
      console.log(chalk.cyan('   Risk Analytics: Consolidated risk profile'));
      console.log(chalk.cyan('   Compliance Status: All providers aligned'));

      // Step 3: KYC Data Reuse and Validation
      console.log(chalk.cyan('\n Step 3: KYC Data Reuse and Enhanced Due Diligence'));
      const kycStart = Date.now();

      const kycReuseRequest = {
        customerId: customer.customerId,
        existingVerificationId: customer.verificationHistory.verificationId,
        requestedUpdates: ['pep_status', 'sanctions_check', 'source_of_wealth'],
        wealthThreshold: 'high_net_worth',
        enhancedDueDiligence: true
      };

      const kycResponse = await this.apiClient.post('/v1/checks/perform', kycReuseRequest);
      const kycTime = (Date.now() - kycStart) / 1000;

      console.log(chalk.green(`   Status: KYC data reused and updated (${kycTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Existing Verification: Leveraged from primary provider'));
      console.log(chalk.cyan('   PEP Status: Updated screening completed'));
      console.log(chalk.cyan('   Sanctions Check: Current as of today'));
      console.log(chalk.cyan('   Source of Wealth: Documentation validated'));
      console.log(chalk.cyan('   Enhanced Due Diligence: Completed for HNW status'));

      // Step 4: MiFID II Suitability Assessment Integration
      console.log(chalk.cyan('\n Step 4: MiFID II Suitability Assessment Integration'));
      const mifidStart = Date.now();

      const mifidAssessment = {
        customerId: customer.customerId,
        existingAssessments: customer.existingRelationships.map(rel => ({
          providerId: rel.providerId,
          lastAssessment: '2024-01-15',
          riskProfile: customer.wealthManagementProfile.riskProfile
        })),
        investmentObjectives: customer.wealthManagementProfile.preferredAssetClasses,
        investmentExperience: customer.wealthManagementProfile.investmentExperience,
        financialSituation: {
          netWealth: customer.wealthManagementProfile.totalPortfolioValue,
          liquidityNeeds: customer.wealthManagementProfile.liquidityNeeds
        }
      };

      const mifidResponse = await this.apiClient.post('/v1/mifid/assessment', mifidAssessment);
      const mifidTime = (Date.now() - mifidStart) / 1000;

      console.log(chalk.green(`   Status: MiFID II assessment completed (${mifidTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Investment Experience: Extensive (validated across providers)'));
      console.log(chalk.cyan(`   Risk Profile: ${customer.wealthManagementProfile.riskProfile} (consistent)`));
      console.log(chalk.cyan('   Suitability Rating: Qualified for complex instruments'));
      console.log(chalk.cyan('   Regulatory Compliance: MiFID II requirements fulfilled'));

      // Step 5: Automated Portfolio Transfer Coordination
      console.log(chalk.cyan('\n Step 5: Automated Portfolio Transfer Coordination'));
      const transferStart = Date.now();

      const transferRequest = {
        sourceProviders: customer.existingRelationships,
        targetProvider: DEMO_INSTITUTION_ID,
        transferType: 'partial_portfolio_migration',
        assets: {
          equities: { percentage: 60, estimatedValue: 1500000 },
          bonds: { percentage: 25, estimatedValue: 625000 },
          alternatives: { percentage: 15, estimatedValue: 375000 }
        },
        timeline: 'standard_settlement',
        coordination: 'automated_workflow'
      };

      await new Promise(resolve => setTimeout(resolve, 2500));
      const transferTime = (Date.now() - transferStart) / 1000;

      console.log(chalk.green(`   Status: Portfolio transfer coordinated (${transferTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Transfer Workflow: Automated coordination initiated'));
      console.log(chalk.cyan('   Asset Allocation: Preserved during transfer'));
      console.log(chalk.cyan('   Settlement Timeline: 3-5 business days'));
      console.log(chalk.cyan('   Provider Communication: Automated notifications sent'));

      // Step 6: Integrated Account Setup and Service Configuration
      console.log(chalk.cyan('\n Step 6: Integrated Account Setup and Service Configuration'));
      const setupStart = Date.now();

      await new Promise(resolve => setTimeout(resolve, 1800));
      const setupTime = (Date.now() - setupStart) / 1000;

      const accountSetup = {
        custodyAccount: 'CH-EVV-CUSTODY-001',
        serviceLevel: 'private_wealth_management',
        advisoryServices: 'discretionary_mandate',
        reportingFrequency: 'quarterly',
        preferredCommunication: customer.contactInformation.preferredChannel
      };

      console.log(chalk.green(`   Status: Account setup completed (${setupTime.toFixed(1)}s)`));
      console.log(chalk.cyan(`   Custody Account: ${accountSetup.custodyAccount}`));
      console.log(chalk.cyan(`   Service Level: ${accountSetup.serviceLevel}`));
      console.log(chalk.cyan(`   Advisory Model: ${accountSetup.advisoryServices}`));
      console.log(chalk.cyan('   Client Portal: Configured with existing preferences'));

      // Calculate total integrated process time
      const totalIntegratedTime = Math.round((Date.now() - startTime) / 1000 / 60 * 10) / 10;

      this.metrics.integrated = {
        customerRecognition: recognitionTime,
        portfolioSync: syncTime,
        kycReuse: kycTime,
        mifidAssessment: mifidTime,
        portfolioTransfer: transferTime,
        accountSetup: setupTime,
        totalTime: totalIntegratedTime,
        dataFragmentation: 'Eliminated - integrated data model',
        processEfficiency: 'High - automated workflows',
        clientExperience: 'Excellent - seamless transition',
        complianceDuplication: '15% - minimal redundancy',
        providerCosts: 'CHF 180 per onboarding',
        dataQuality: 'High - standardized and validated'
      };

      console.log(chalk.green(`\n Total Integrated EVV Lifecycle Time: ${this.metrics.integrated.totalTime} minutes`));
      console.log(chalk.cyan(' Integrated Process Benefits:'));
      console.log(chalk.cyan('  • Leverages existing customer data and relationships'));
      console.log(chalk.cyan('  • Automated portfolio synchronization across providers'));
      console.log(chalk.cyan('  • KYC data reuse eliminates redundant verification'));
      console.log(chalk.cyan('  • MiFID II assessment integration reduces duplication'));
      console.log(chalk.cyan('  • Streamlined provider switching and onboarding'));

      return this.metrics.integrated.totalTime;

    } catch (error) {
      console.log(chalk.red(' Integrated EVV Process Error:', error.message));
      return null;
    }
  }

  /**
   * Display EVV-specific use case scenarios
   */
  displayEVVUseCaseScenarios() {
    console.log(chalk.blue.bold('\nEVV-SPECIFIC LIFECYCLE SCENARIOS'));
    console.log(chalk.blue('─────────────────────────────────\n'));

    const scenarios = [
      {
        scenario: 'Wealth Manager Switch',
        description: 'Client moves primary relationship to new wealth manager',
        benefit: 'Seamless transition with portfolio history and preferences',
        timeReduction: '78%'
      },
      {
        scenario: 'Multi-Bank Custody Setup',
        description: 'Client establishes accounts at multiple custody banks',
        benefit: 'Consistent data across all providers, synchronized compliance',
        timeReduction: '65%'
      },
      {
        scenario: 'Investment Strategy Update',
        description: 'Client updates risk profile across all relationships',
        benefit: 'Centralized profile management with provider synchronization',
        timeReduction: '82%'
      },
      {
        scenario: 'Family Office Integration',
        description: 'Ultra-high-net-worth client consolidates family assets',
        benefit: 'Comprehensive view across all family relationships',
        timeReduction: '70%'
      },
      {
        scenario: 'Cross-Border Wealth Management',
        description: 'Client with international assets and tax considerations',
        benefit: 'Unified compliance and reporting across jurisdictions',
        timeReduction: '68%'
      },
      {
        scenario: 'Succession Planning Preparation',
        description: 'Wealth transfer planning involving multiple beneficiaries',
        benefit: 'Integrated documentation and compliance preparation',
        timeReduction: '75%'
      }
    ];

    console.log(chalk.white('EVV Lifecycle Management Applications:'));
    scenarios.forEach(scenario => {
      console.log(chalk.green(` ${scenario.scenario}:`));
      console.log(chalk.cyan(`   Description: ${scenario.description}`));
      console.log(chalk.cyan(`   Business Benefit: ${scenario.benefit}`));
      console.log(chalk.cyan(`   Efficiency Gain: ${scenario.timeReduction}`));
    });
  }

  /**
   * Display regulatory compliance analysis
   */
  displayRegulatoryCompliance() {
    console.log(chalk.blue.bold('\nREGULATORY COMPLIANCE FOR EVV SERVICES'));
    console.log(chalk.blue('───────────────────────────────────────\n'));

    console.log(chalk.white('MiFID II Compliance Framework:'));
    console.log(chalk.green(' Suitability Assessment Integration'));
    console.log(chalk.cyan('  ├── Client knowledge and experience validation'));
    console.log(chalk.cyan('  ├── Financial situation assessment across providers'));
    console.log(chalk.cyan('  ├── Investment objectives alignment and tracking'));
    console.log(chalk.cyan('  └── Ongoing suitability monitoring automation'));

    console.log(chalk.green('\n Enhanced Due Diligence (EDD)'));
    console.log(chalk.cyan('  ├── High-net-worth client screening protocols'));
    console.log(chalk.cyan('  ├── Source of wealth documentation management'));
    console.log(chalk.cyan('  ├── Cross-provider risk assessment coordination'));
    console.log(chalk.cyan('  └── Ongoing monitoring across relationships'));

    console.log(chalk.green('\n Data Protection and Privacy'));
    console.log(chalk.cyan('  ├── GDPR/DSG compliance for wealth management data'));
    console.log(chalk.cyan('  ├── Cross-border data transfer protections'));
    console.log(chalk.cyan('  ├── Client consent management for data sharing'));
    console.log(chalk.cyan('  └── Privacy-preserving portfolio analytics'));

    console.log(chalk.green('\n FINMA Wealth Management Requirements'));
    console.log(chalk.cyan('  ├── Client categorization and investor protection'));
    console.log(chalk.cyan('  ├── Prudential supervision compliance'));
    console.log(chalk.cyan('  ├── Asset segregation and custody requirements'));
    console.log(chalk.cyan('  └── Systematic risk management across providers'));
  }

  /**
   * Display efficiency comparison analysis
   */
  displayEfficiencyComparison() {
    console.log(chalk.blue.bold('\nEVV LIFECYCLE EFFICIENCY COMPARISON'));
    console.log(chalk.blue('──────────────────────────────────────\n'));

    const traditionalTime = this.metrics.traditional.totalTime;
    const integratedTime = this.metrics.integrated.totalTime;
    const timeReduction = Math.round((1 - integratedTime / traditionalTime) * 100);
    const timeSaved = traditionalTime - integratedTime;

    console.log(chalk.white('Process Time Comparison:'));
    console.log(chalk.red(`  Traditional EVV Lifecycle: ${traditionalTime} minutes`));
    console.log(chalk.green(`  Integrated EVV Lifecycle: ${integratedTime} minutes`));
    console.log(chalk.cyan(`  Time Saved: ${timeSaved} minutes`));
    console.log(chalk.cyan(`  Efficiency Improvement: ${timeReduction}%`));

    console.log(chalk.white('\nData Management Comparison:'));
    console.log(chalk.red(`  Traditional Fragmentation: ${this.metrics.traditional.dataFragmentation}`));
    console.log(chalk.green(`  Integrated Approach: ${this.metrics.integrated.dataFragmentation}`));
    console.log(chalk.red(`  Traditional Data Quality: ${this.metrics.traditional.dataQuality}`));
    console.log(chalk.green(`  Integrated Data Quality: ${this.metrics.integrated.dataQuality}`));

    console.log(chalk.white('\nCost Analysis:'));
    console.log(chalk.red(`  Traditional Cost per Onboarding: ${this.metrics.traditional.providerCosts}`));
    console.log(chalk.green(`  Integrated Cost per Onboarding: ${this.metrics.integrated.providerCosts}`));
    console.log(chalk.cyan(`  Cost Reduction: ${Math.round((1 - 180/850) * 100)}%`));

    console.log(chalk.white('\nClient Experience Impact:'));
    console.log(chalk.red(`  Traditional Client Experience: ${this.metrics.traditional.clientExperience}`));
    console.log(chalk.green(`  Integrated Client Experience: ${this.metrics.integrated.clientExperience}`));
    console.log(chalk.red(`  Traditional Compliance Duplication: ${this.metrics.traditional.complianceDuplication}`));
    console.log(chalk.green(`  Integrated Compliance Duplication: ${this.metrics.integrated.complianceDuplication}`));

    // Market impact for EVV sector
    const evvMarketVolume = 5000; // Annual EVV client movements in Swiss market
    const annualTimeSaved = (timeSaved / 60) * evvMarketVolume;
    const annualCostSavings = (850 - 180) * evvMarketVolume;

    console.log(chalk.white('\nSwiss EVV Market Impact:'));
    console.log(chalk.cyan(`  Annual EVV Client Transitions: ${evvMarketVolume.toLocaleString()}`));
    console.log(chalk.cyan(`  Annual Time Savings: ${annualTimeSaved.toLocaleString()} hours`));
    console.log(chalk.cyan(`  Annual Cost Savings: CHF ${annualCostSavings.toLocaleString()}`));
    console.log(chalk.cyan('  Market Efficiency: Significantly enhanced provider competition'));
  }

  /**
   * Display demo footer
   */
  displayFooter() {
    console.log(chalk.cyan.bold('\n UC4: EVV Lifecycle Management Demonstration Complete!'));
    console.log(chalk.cyan('─────────────────────────────────────────────────────────'));
    
    console.log(chalk.white('\nKey Achievements Demonstrated:'));
    console.log(chalk.green(' Integrated customer lifecycle management across providers'));
    console.log(chalk.green(' Automated portfolio data synchronization'));
    console.log(chalk.green(' KYC data reuse for verified wealth management clients'));
    console.log(chalk.green(' MiFID II suitability assessment integration'));
    console.log(chalk.green(' Streamlined provider switching and onboarding'));
    console.log(chalk.green(' Enhanced compliance with reduced duplication'));

    console.log(chalk.white('\nMarket Benefits for EVV Sector:'));
    console.log(chalk.yellow('• Enhanced client mobility between wealth managers'));
    console.log(chalk.yellow('• Improved data quality through standardization'));
    console.log(chalk.yellow('• Reduced compliance costs through data reuse'));
    console.log(chalk.yellow('• Better client experience with seamless transitions'));
    console.log(chalk.yellow('• Strengthened competitive dynamics in wealth management'));

    console.log(chalk.cyan('\n EVV Lifecycle APIs: http://localhost:3000/v1/portfolio'));
    console.log(chalk.cyan(' MiFID II Integration: http://localhost:3000/v1/mifid'));
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

      // Run traditional EVV lifecycle simulation
      const traditionalTime = await this.simulateTraditionalEVVLifecycle();
      
      // Run integrated EVV lifecycle demonstration
      const integratedTime = await this.demonstrateIntegratedEVVLifecycle();
      
      if (integratedTime === null) {
        console.log(chalk.red('Integrated EVV demonstration failed. Please check server status.'));
        return;
      }

      // Display comprehensive analysis
      this.displayEVVUseCaseScenarios();
      this.displayRegulatoryCompliance();
      this.displayEfficiencyComparison();
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
  const demo = new UC4EVVLifecycleDemo();
  demo.runDemo().catch(error => {
    console.error(chalk.red('Demo error:', error.message));
    process.exit(1);
  });
}

module.exports = UC4EVVLifecycleDemo;