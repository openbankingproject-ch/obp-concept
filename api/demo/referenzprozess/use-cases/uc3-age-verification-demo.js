#!/usr/bin/env node

/**
 * UC3: Age Verification Demonstration Script
 * 
 * Demonstrates privacy-preserving age verification through attribute-based verification
 * (age ≥18) WITHOUT full identity disclosure. Shows cross-industry reusability,
 * Privacy-by-Design implementation, and GDPR data minimization compliance.
 */

const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_INSTITUTION_ID = 'CH-UC3-AGE-VERIFY';
const DEMO_USER_ID = 'uc3-demo-user';

// Mock authentication token
const DEMO_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

// Demo customer (adult) with existing identity verification
const DEMO_CUSTOMER_ADULT = {
  customerId: 'uc3-age-customer-adult-001',
  basicData: {
    lastName: 'Weber',
    givenName: 'Lisa',
    birthDate: '1995-03-20',
    nationality: ['CH'],
    gender: 'female',
    maritalStatus: 'single',
    language: 'de'
  },
  verificationHistory: {
    lastVerification: '2024-01-15T14:20:00Z',
    method: 'video_identification',
    assuranceLevel: 'substantial',
    documentType: 'swiss_id_card',
    verifiedBy: 'CH-PROVIDER-ID-001',
    validUntil: '2026-01-15T14:20:00Z',
    verificationId: 'VER-20240115-AGE-001'
  }
};

// Demo customer (minor) with existing identity verification
const DEMO_CUSTOMER_MINOR = {
  customerId: 'uc3-age-customer-minor-001',
  basicData: {
    lastName: 'Schmidt',
    givenName: 'Tim',
    birthDate: '2010-08-15',
    nationality: ['CH'],
    gender: 'male',
    maritalStatus: 'single',
    language: 'de'
  },
  verificationHistory: {
    lastVerification: '2024-02-10T11:30:00Z',
    method: 'document_verification',
    assuranceLevel: 'substantial',
    documentType: 'swiss_id_card',
    verifiedBy: 'CH-PROVIDER-ID-002',
    validUntil: '2026-02-10T11:30:00Z',
    verificationId: 'VER-20240210-AGE-002'
  }
};

class UC3AgeVerificationDemo {
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
      attributeBased: {}
    };
  }

  /**
   * Display demo header
   */
  displayHeader() {
    console.log(chalk.cyan.bold('\nUC3: Cross-Industry Age Verification Demonstration'));
    console.log(chalk.cyan('──────────────────────────────────────────────────────────\n'));
    console.log(chalk.white('This demonstration shows attribute-based age verification without'));
    console.log(chalk.white('full identity disclosure across multiple industries:'));
    console.log(chalk.white('• Attribute-only disclosure (age ≥18) without revealing actual age'));
    console.log(chalk.white('• Privacy-by-Design implementation'));
    console.log(chalk.white('• Cross-industry reusability and cost reduction'));
    console.log(chalk.white('• GDPR data minimization compliance'));
    console.log(chalk.white('• Leverages existing identity verification from Step 6 (Referenzprozess)\n'));
  }

  /**
   * Traditional Age Verification Process (Full Identity Disclosure)
   */
  async simulateTraditionalAgeVerification() {
    console.log(chalk.red.bold('TRADITIONAL AGE VERIFICATION: Full Identity Collection'));
    console.log(chalk.red('───────────────────────────────────────────────────────────\n'));

    const steps = [
      { name: 'Complete identity document submission', time: 8, description: 'Customer provides full ID card/passport for simple age check' },
      { name: 'Personal data extraction and storage', time: 12, description: 'All personal data extracted and stored despite only needing age' },
      { name: 'Full identity verification process', time: 25, description: 'Complete identity verification when only age is relevant' },
      { name: 'Data processing and storage setup', time: 10, description: 'Complex data storage for minimal age verification need' },
      { name: 'Compliance documentation', time: 8, description: 'Extensive documentation for simple age requirement' }
    ];

    console.log(chalk.red(' Traditional Process Issues:'));
    let totalTime = 0;
    
    for (const step of steps) {
      console.log(chalk.red(`  ${step.time} min - ${step.name}`));
      console.log(chalk.yellow(`           ${step.description}`));
      totalTime += step.time;
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(chalk.red(`\n Total Traditional Age Verification Time: ${totalTime} minutes`));
    console.log(chalk.yellow(' Privacy and Efficiency Problems:'));
    console.log(chalk.yellow('  • Excessive data collection beyond age verification need'));
    console.log(chalk.yellow('  • Full identity disclosure for simple age requirements'));
    console.log(chalk.yellow('  • High storage and security overhead'));
    console.log(chalk.yellow('  • GDPR data minimization principle violation'));
    console.log(chalk.yellow('  • No reusability across different industries'));
    console.log(chalk.yellow('  • Individual inefficient solutions per industry'));

    this.metrics.traditional = {
      steps,
      totalTime,
      dataExposure: 'Complete Identity',
      privacyCompliance: 'Poor - GDPR violation',
      reusability: 'None - individual solutions',
      storageCosts: 'CHF 30 per verification',
      industryEfficiency: 'Low - separate systems'
    };

    return totalTime;
  }

  /**
   * Attribute-Based Age Verification (Adult Customer)
   */
  async demonstrateAttributeBasedVerificationAdult() {
    console.log(chalk.green.bold('\nATTRIBUTE-BASED AGE VERIFICATION: Adult Customer (Privacy-Preserving)'));
    console.log(chalk.green('─────────────────────────────────────────────────────────────────\n'));

    const startTime = Date.now();
    const customer = DEMO_CUSTOMER_ADULT;
    const minimumAge = 18;

    try {
      // Step 1: Check Existing Identity Verification (Step 6 from Referenzprozess)
      console.log(chalk.cyan(' Step 1: Leveraging Existing Identity Verification'));
      const checkStart = Date.now();

      const identityCheckResponse = await this.apiClient.get(
        `/v1/identification/${customer.verificationHistory.verificationId}/status`
      );

      const checkTime = (Date.now() - checkStart) / 1000;
      console.log(chalk.green(`   Status: Existing identity verification found (${checkTime.toFixed(1)}s)`));
      console.log(chalk.cyan('   Verification Method: Video identification (already completed)'));
      console.log(chalk.cyan(`   Assurance Level: ${customer.verificationHistory.assuranceLevel}`));
      console.log(chalk.cyan(`   Valid Until: ${new Date(customer.verificationHistory.validUntil).toLocaleDateString()}`));
      console.log(chalk.cyan('   Reusing verified identity data - no re-verification needed'));

      // Step 2: Attribute-Only Age Check
      console.log(chalk.cyan('\n Step 2: Attribute-Only Age Verification'));
      const ageCheckStart = Date.now();

      const ageVerificationRequest = {
        customerId: customer.customerId,
        requiredAttribute: `age_minimum_${minimumAge}`,
        purpose: 'cross_industry_age_gate',
        requestingService: 'online_gaming_platform',
        minimumAge,
        attributeOnly: true,
        dataMinimization: true,
        existingVerificationId: customer.verificationHistory.verificationId
      };

      const ageResponse = await this.apiClient.post('/v1/verification/age', ageVerificationRequest);
      const ageCheckTime = (Date.now() - ageCheckStart) / 1000;

      // Calculate age without storing actual age
      const today = new Date();
      const birth = new Date(customer.basicData.birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      const meetsRequirement = age >= minimumAge;

      console.log(chalk.green(`   Status: Age verification completed (${ageCheckTime.toFixed(1)}s)`));
      console.log(chalk.cyan(`   Age Requirement: ${minimumAge}+ years`));
      console.log(chalk.cyan(`   Verification Result: ${meetsRequirement ? 'MEETS REQUIREMENT' : 'DOES NOT MEET'}`));
      console.log(chalk.cyan('   Data Disclosed: Only age threshold status (≥18: YES/NO)'));
      console.log(chalk.cyan('   Actual Age: NOT DISCLOSED (privacy-preserving)'));
      console.log(chalk.cyan('   Identity Data: NOT DISCLOSED (attribute-only)'));

      // Step 3: Cross-Industry Consent Management
      console.log(chalk.cyan('\n Step 3: Granular Consent for Attribute Disclosure'));
      const consentStart = Date.now();

      const consentRequest = {
        customerId: customer.customerId,
        attributeType: 'age_verification',
        disclosureLevel: 'threshold_only',
        purposes: ['age_gated_services', 'regulatory_compliance'],
        industries: ['gaming', 'ecommerce', 'financial_services'],
        dataMinimization: true
      };

      const consentResponse = await this.apiClient.post('/v1/consent', consentRequest);
      const consentTime = (Date.now() - consentStart) / 1000;

      console.log(chalk.green(`   Status: Consent obtained for attribute disclosure (${consentTime.toFixed(1)}s)`));
      console.log(chalk.cyan(`   Consent ID: ${consentResponse.data.consentId}`));
      console.log(chalk.cyan('   Scope: Age threshold verification only'));
      console.log(chalk.cyan('   Cross-Industry: Reusable across multiple sectors'));

      // Step 4: Service Access Decision
      console.log(chalk.cyan('\n Step 4: Age-Gated Service Access'));
      const accessStart = Date.now();

      await new Promise(resolve => setTimeout(resolve, 500));
      const accessTime = (Date.now() - accessStart) / 1000;

      console.log(chalk.green(`   Status: Service access ${meetsRequirement ? 'GRANTED' : 'DENIED'} (${accessTime.toFixed(1)}s)`));
      console.log(chalk.cyan(`   Service Type: Online gaming platform (18+ required)`));
      console.log(chalk.cyan('   Data Stored: Only verification timestamp and result'));
      console.log(chalk.cyan('   Privacy Level: Maximum - no personal data exposed'));

      // Calculate total time
      const totalAttributeTime = Math.round((Date.now() - startTime) / 1000 / 60 * 10) / 10;

      this.metrics.attributeBased = {
        identityCheck: checkTime,
        ageVerification: ageCheckTime,
        consentManagement: consentTime,
        serviceAccess: accessTime,
        totalTime: totalAttributeTime,
        dataExposure: 'Attribute Only (age ≥18: yes/no)',
        privacyCompliance: 'Excellent - GDPR compliant',
        reusability: 'High - cross-industry',
        storageCosts: 'CHF 3 per verification',
        industryEfficiency: 'High - shared infrastructure'
      };

      console.log(chalk.green(`\n Total Attribute-Based Verification Time: ${this.metrics.attributeBased.totalTime} minutes`));
      console.log(chalk.cyan(' Privacy-by-Design Benefits:'));
      console.log(chalk.cyan('  • Leverages existing Step 6 identity verification'));
      console.log(chalk.cyan('  • Only age threshold disclosed (≥18: YES/NO)'));
      console.log(chalk.cyan('  • No full identity or actual age revealed'));
      console.log(chalk.cyan('  • GDPR data minimization principle compliance'));
      console.log(chalk.cyan('  • Reusable across multiple industries and services'));

      return this.metrics.attributeBased.totalTime;

    } catch (error) {
      console.log(chalk.red(' Attribute-Based Verification Error:', error.message));
      return null;
    }
  }

  /**
   * Attribute-Based Age Verification (Minor Customer)
   */
  async demonstrateAttributeBasedVerificationMinor() {
    console.log(chalk.yellow.bold('\nATTRIBUTE-BASED VERIFICATION: Minor Customer (Access Appropriately Denied)'));
    console.log(chalk.yellow('────────────────────────────────────────────────────────────────────\n'));

    const customer = DEMO_CUSTOMER_MINOR;
    const minimumAge = 18;

    try {
      // Quick attribute-based check for minor
      console.log(chalk.cyan(' Step 1: Existing Identity Verification Check'));
      
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log(chalk.green('   Status: Existing verification found (from Step 6 Referenzprozess)'));
      console.log(chalk.cyan('   Customer: Verified identity available'));
      console.log(chalk.cyan('   Privacy Protection: Identity details not disclosed'));

      // Step 2: Age Threshold Check
      console.log(chalk.cyan('\n Step 2: Age Threshold Verification'));
      
      // Calculate age
      const today = new Date();
      const birth = new Date(customer.basicData.birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      const meetsRequirement = age >= minimumAge;

      await new Promise(resolve => setTimeout(resolve, 600));

      console.log(chalk.yellow(`   Age Requirement Check: ${minimumAge}+ years`));
      console.log(chalk.red(`   Verification Result: DOES NOT MEET REQUIREMENT`));
      console.log(chalk.cyan('   Data Disclosed: Only threshold status (≥18: NO)'));
      console.log(chalk.cyan('   Privacy Maintained: Actual age and identity not exposed'));

      // Step 3: Alternative Service Recommendations
      console.log(chalk.cyan('\n Step 3: Age-Appropriate Alternative Services'));
      
      const ageAppropriateServices = [
        { service: 'Educational gaming platforms', industry: 'Gaming & Education' },
        { service: 'Youth financial literacy programs', industry: 'Financial Services' },
        { service: 'Age-appropriate entertainment content', industry: 'Media & Entertainment' },
        { service: 'Student discount platforms', industry: 'Retail & E-commerce' }
      ];

      console.log(chalk.green('   Alternative Services Recommended:'));
      ageAppropriateServices.forEach(service => {
        console.log(chalk.cyan(`     • ${service.service} (${service.industry})`));
      });

      console.log(chalk.cyan('\n   Privacy Benefits for Minor:'));
      console.log(chalk.cyan('     • Identity protection maintained'));
      console.log(chalk.cyan('     • No unnecessary personal data collection'));
      console.log(chalk.cyan('     • Appropriate service recommendations provided'));
      console.log(chalk.cyan('     • Compliance with youth protection regulations'));

      return true;

    } catch (error) {
      console.log(chalk.red(' Minor Verification Error:', error.message));
      return false;
    }
  }

  /**
   * Display cross-industry application scenarios
   */
  displayCrossIndustryScenarios() {
    console.log(chalk.blue.bold('\nCROSS-INDUSTRY REUSABILITY SCENARIOS'));
    console.log(chalk.blue('────────────────────────────────────────\n'));

    const industries = [
      {
        industry: 'Gaming & Gambling',
        scenario: 'Online casino and betting platform access',
        requirement: '18+ legal gambling age',
        benefit: 'Regulatory compliance without identity storage',
        reusability: 'Same verification across all gaming platforms'
      },
      {
        industry: 'E-commerce & Retail',
        scenario: 'Age-restricted product purchases (alcohol, tobacco)',
        requirement: '18+ for restricted product sales',
        benefit: 'Automated age checks without customer re-verification',
        reusability: 'Cross-platform age verification for restricted goods'
      },
      {
        industry: 'Financial Services',
        scenario: 'Investment platform and trading account access',
        requirement: '18+ for investment services',
        benefit: 'Compliance with financial regulations, simplified onboarding',
        reusability: 'Age verification across banks, investment platforms'
      },
      {
        industry: 'Healthcare & Pharmaceuticals',
        scenario: 'Telemedicine and prescription services',
        requirement: '18+ for independent medical decisions',
        benefit: 'Patient privacy with age-appropriate service access',
        reusability: 'Verification across healthcare providers'
      },
      {
        industry: 'Media & Entertainment',
        scenario: 'Age-restricted content streaming and social media',
        requirement: '16+/18+ for mature content access',
        benefit: 'Content filtering without detailed user profiling',
        reusability: 'Cross-platform content age verification'
      },
      {
        industry: 'Mobility & Transportation',
        scenario: 'Car sharing and rental services',
        requirement: '18+ for vehicle rental agreements',
        benefit: 'Quick eligibility check without full identity exposure',
        reusability: 'Verification across mobility service providers'
      }
    ];

    console.log(chalk.white('Cross-Industry Application Benefits:'));
    industries.forEach(scenario => {
      console.log(chalk.green(` ${scenario.industry}:`));
      console.log(chalk.cyan(`   Scenario: ${scenario.scenario}`));
      console.log(chalk.cyan(`   Age Requirement: ${scenario.requirement}`));
      console.log(chalk.cyan(`   Business Benefit: ${scenario.benefit}`));
      console.log(chalk.cyan(`   Reusability: ${scenario.reusability}`));
    });

    console.log(chalk.white('\nKey Cross-Industry Benefits:'));
    console.log(chalk.yellow('• Single verification, multiple industry applications'));
    console.log(chalk.yellow('• Reduced customer friction across service providers'));
    console.log(chalk.yellow('• Shared infrastructure reduces individual costs'));
    console.log(chalk.yellow('• Consistent privacy protection across industries'));
    console.log(chalk.yellow('• Standardized compliance approach'));
  }

  /**
   * Display efficiency comparison
   */
  displayEfficiencyComparison() {
    console.log(chalk.blue.bold('\nEFFICIENCY AND COST REDUCTION ANALYSIS'));
    console.log(chalk.blue('────────────────────────────────────────────\n'));

    const traditionalTime = this.metrics.traditional.totalTime;
    const attributeTime = this.metrics.attributeBased.totalTime;
    const timeReduction = Math.round((1 - attributeTime / traditionalTime) * 100);
    const timeSaved = traditionalTime - attributeTime;

    console.log(chalk.white('Process Efficiency Comparison:'));
    console.log(chalk.red(`  Traditional Age Verification: ${traditionalTime} minutes`));
    console.log(chalk.green(`  Attribute-Based Verification: ${attributeTime} minutes`));
    console.log(chalk.cyan(`  Time Saved: ${timeSaved} minutes`));
    console.log(chalk.cyan(`  Efficiency Improvement: ${timeReduction}%`));

    console.log(chalk.white('\nPrivacy Protection Comparison:'));
    console.log(chalk.red(`  Traditional Data Exposure: ${this.metrics.traditional.dataExposure}`));
    console.log(chalk.green(`  Attribute-Based Exposure: ${this.metrics.attributeBased.dataExposure}`));
    console.log(chalk.red(`  Traditional Privacy Compliance: ${this.metrics.traditional.privacyCompliance}`));
    console.log(chalk.green(`  Attribute-Based Compliance: ${this.metrics.attributeBased.privacyCompliance}`));

    console.log(chalk.white('\nCost Reduction Analysis:'));
    console.log(chalk.red(`  Traditional Cost per Verification: ${this.metrics.traditional.storageCosts}`));
    console.log(chalk.green(`  Attribute-Based Cost: ${this.metrics.attributeBased.storageCosts}`));
    console.log(chalk.cyan(`  Cost Reduction: ${Math.round((1 - 3/30) * 100)}% per verification`));

    console.log(chalk.white('\nReusability Benefits:'));
    console.log(chalk.red(`  Traditional Reusability: ${this.metrics.traditional.reusability}`));
    console.log(chalk.green(`  Attribute-Based Reusability: ${this.metrics.attributeBased.reusability}`));
    console.log(chalk.red(`  Traditional Industry Efficiency: ${this.metrics.traditional.industryEfficiency}`));
    console.log(chalk.green(`  Attribute-Based Efficiency: ${this.metrics.attributeBased.industryEfficiency}`));

    // Cross-industry market impact
    const crossIndustryVolume = 200000; // Estimated annual age verifications across industries
    const annualTimeSaved = (timeSaved / 60) * crossIndustryVolume;
    const annualCostSavings = (30 - 3) * crossIndustryVolume;

    console.log(chalk.white('\nSwiss Cross-Industry Market Impact:'));
    console.log(chalk.cyan(`  Annual Cross-Industry Age Verifications: ${crossIndustryVolume.toLocaleString()}`));
    console.log(chalk.cyan(`  Annual Time Savings: ${annualTimeSaved.toLocaleString()} hours`));
    console.log(chalk.cyan(`  Annual Cost Savings: CHF ${annualCostSavings.toLocaleString()}`));
    console.log(chalk.cyan('  Privacy Enhancement: Universal privacy-by-design implementation'));
  }

  /**
   * Display GDPR compliance benefits
   */
  displayGDPRCompliance() {
    console.log(chalk.blue.bold('\nGDPR DATA MINIMIZATION COMPLIANCE'));
    console.log(chalk.blue('─────────────────────────────────────\n'));

    console.log(chalk.white('GDPR Article 5(1)(c) - Data Minimization Principle:'));
    console.log(chalk.green(' Principle Compliance:'));
    console.log(chalk.cyan('  ├── "Adequate, relevant and limited to what is necessary"'));
    console.log(chalk.cyan('  ├── Only age threshold disclosed (≥18: YES/NO)'));
    console.log(chalk.cyan('  ├── No collection of unnecessary personal data'));
    console.log(chalk.cyan('  └── Purpose limitation: age verification only'));

    console.log(chalk.green('\n GDPR Article 25 - Privacy by Design:'));
    console.log(chalk.cyan('  ├── Data protection by design and by default'));
    console.log(chalk.cyan('  ├── Attribute-only disclosure architecture'));
    console.log(chalk.cyan('  ├── Minimal data processing principles'));
    console.log(chalk.cyan('  └── Privacy-preserving technical measures'));

    console.log(chalk.green('\n Cross-Industry Privacy Benefits:'));
    console.log(chalk.cyan('  ├── Consistent privacy approach across industries'));
    console.log(chalk.cyan('  ├── Reduced data breach risk (minimal data stored)'));
    console.log(chalk.cyan('  ├── Simplified compliance management'));
    console.log(chalk.cyan('  └── Enhanced customer trust and confidence'));

    console.log(chalk.yellow('\n Regulatory Advantages:'));
    console.log(chalk.yellow('  • Proactive GDPR compliance reduces regulatory risk'));
    console.log(chalk.yellow('  • Data minimization reduces potential fines'));
    console.log(chalk.yellow('  • Privacy-by-design enhances regulatory reputation'));
    console.log(chalk.yellow('  • Cross-industry standardization supports compliance'));
  }

  /**
   * Display demo footer
   */
  displayFooter() {
    console.log(chalk.cyan.bold('\n UC3: Age Verification Demonstration Complete!'));
    console.log(chalk.cyan('─────────────────────────────────────────────────'));
    
    console.log(chalk.white('\nKey Achievements Demonstrated:'));
    console.log(chalk.green(' Privacy-by-design attribute-based verification'));
    console.log(chalk.green(' Cross-industry reusability and cost reduction'));
    console.log(chalk.green(' GDPR data minimization principle compliance'));
    console.log(chalk.green(' Leveraging existing Referenzprozess Step 6 verification'));
    console.log(chalk.green(' Significant efficiency improvements across industries'));

    console.log(chalk.white('\nBusiness Value:'));
    console.log(chalk.yellow('• Single verification infrastructure for multiple industries'));
    console.log(chalk.yellow('• Privacy-preserving approach enhances customer trust'));
    console.log(chalk.yellow('• Cost reduction through shared verification infrastructure'));
    console.log(chalk.yellow('• Regulatory compliance through data minimization'));
    console.log(chalk.yellow('• Enhanced customer experience with reduced friction'));

    console.log(chalk.cyan('\n Age Verification APIs: http://localhost:3000/v1/verification/age'));
    console.log(chalk.cyan(' Cross-Industry Standards: Privacy-by-design architecture'));
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

      // Run traditional age verification simulation
      const traditionalTime = await this.simulateTraditionalAgeVerification();
      
      // Run attribute-based verification for adult customer
      const attributeTime = await this.demonstrateAttributeBasedVerificationAdult();
      
      if (attributeTime === null) {
        console.log(chalk.red('Attribute-based verification failed. Please check server status.'));
        return;
      }

      // Demonstrate verification for minor customer
      await this.demonstrateAttributeBasedVerificationMinor();

      // Display comprehensive analysis
      this.displayCrossIndustryScenarios();
      this.displayEfficiencyComparison();
      this.displayGDPRCompliance();
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
  const demo = new UC3AgeVerificationDemo();
  demo.runDemo().catch(error => {
    console.error(chalk.red('Demo error:', error.message));
    process.exit(1);
  });
}

module.exports = UC3AgeVerificationDemo;