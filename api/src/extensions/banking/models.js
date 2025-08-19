/**
 * Banking Data Models
 * 
 * Swiss banking-specific data models and transformations
 */

const joi = require('joi');

class BankingDataModels {
  constructor() {
    this.initialized = false;
  }

  async initialize(coreFramework) {
    console.log('📊 Initializing Banking Data Models...');
    this.coreFramework = coreFramework;
    this.initialized = true;
    console.log('✅ Banking Data Models initialized');
  }

  /**
   * Get banking customer schema (extends universal customer)
   */
  getBankingCustomerSchema() {
    return joi.object({
      // Core universal fields
      customerId: joi.string().required().max(255),
      customerHash: joi.string().pattern(/^[a-f0-9]{64}$/),
      basicData: joi.object({
        lastName: joi.string().max(100).required(),
        givenName: joi.string().max(100).required(),
        birthDate: joi.date().iso().required(),
        nationality: joi.array().items(joi.string().length(2)).min(1).required(),
        gender: joi.string().valid('male', 'female', 'other', 'not_specified'),
        maritalStatus: joi.string().valid('single', 'married', 'divorced', 'widowed', 'separated'),
        language: joi.string().length(2).default('de')
      }).required(),

      contactInformation: joi.object({
        primaryEmail: joi.string().email().required(),
        mobilePhone: joi.string().pattern(/^\+[1-9]\d{1,14}$/).required(),
        landlinePhone: joi.string().pattern(/^\+[1-9]\d{1,14}$/),
        preferredContactMethod: joi.string().valid('email', 'sms', 'phone', 'post').default('email'),
        communicationLanguage: joi.string().valid('de', 'fr', 'it', 'en').default('de')
      }).required(),

      addressData: joi.object({
        residentialAddress: joi.object({
          street: joi.string().max(100).required(),
          postalCode: joi.string().max(20).required(),
          city: joi.string().max(50).required(),
          region: joi.string().max(10), // Swiss canton code
          country: joi.string().length(2).required(),
          addressType: joi.string().valid('residential', 'business', 'temporary').default('residential')
        }).required(),
        correspondenceAddress: joi.object({
          street: joi.string().max(100),
          postalCode: joi.string().max(20),
          city: joi.string().max(50),
          region: joi.string().max(10),
          country: joi.string().length(2),
          addressType: joi.string().valid('residential', 'business', 'po_box')
        }).optional()
      }).required(),

      identification: joi.object({
        identificationMethod: joi.string().valid(
          'video_identification', 
          'in_person_identification', 
          'electronic_id',
          'qualified_signature'
        ).required(),
        documentType: joi.string().valid('id_card', 'passport', 'driving_license').required(),
        documentNumber: joi.string().max(50).required(),
        issuingAuthority: joi.string().max(100).required(),
        issueDate: joi.date().iso().required(),
        expiryDate: joi.date().iso().required(),
        issuingCountry: joi.string().length(2).required(),
        levelOfAssurance: joi.string().valid('low', 'medium', 'high').required(),
        verificationDate: joi.date().iso().required(),
        verificationMethod: joi.string().max(100).required()
      }).required(),

      // Banking-specific KYC data
      kycData: joi.object({
        occupation: joi.string().max(100).required(),
        employer: joi.string().max(100),
        employmentType: joi.string().valid('employed', 'self_employed', 'unemployed', 'retired', 'student').required(),
        annualIncome: joi.object({
          amount: joi.number().positive().required(),
          currency: joi.string().length(3).default('CHF')
        }).required(),
        totalAssets: joi.object({
          amount: joi.number().positive(),
          currency: joi.string().length(3).default('CHF')
        }),
        sourceOfFunds: joi.string().valid(
          'salary', 'business_income', 'investment_income', 'inheritance', 
          'gift', 'pension', 'social_benefits', 'other'
        ).required(),
        sourceOfWealthDescription: joi.string().max(500),
        expectedTransactionVolume: joi.object({
          monthly: joi.object({
            amount: joi.number().positive(),
            currency: joi.string().length(3).default('CHF')
          }),
          annual: joi.object({
            amount: joi.number().positive(), 
            currency: joi.string().length(3).default('CHF')
          })
        }),
        pepStatus: joi.boolean().default(false),
        pepDetails: joi.object({
          position: joi.string().max(200),
          jurisdiction: joi.string().length(2),
          startDate: joi.date().iso(),
          endDate: joi.date().iso(),
          familyMember: joi.boolean().default(false),
          closeAssociate: joi.boolean().default(false)
        }).when('pepStatus', { is: true, then: joi.required() }),
        riskRating: joi.string().valid('low', 'medium', 'high').default('medium'),
        lastKycUpdate: joi.date().iso()
      }).required(),

      // Swiss banking compliance data
      complianceData: joi.object({
        fatcaStatus: joi.string().valid('us_person', 'non_us_person', 'recalcitrant').required(),
        fatcaDetails: joi.object({
          w8Form: joi.boolean(),
          w9Form: joi.boolean(),
          substantialUsOwner: joi.boolean(),
          tinNumber: joi.string().max(50)
        }).when('fatcaStatus', { is: 'us_person', then: joi.required() }),
        
        crsReportable: joi.boolean().required(),
        crsDetails: joi.object({
          reportingJurisdictions: joi.array().items(joi.string().length(2)),
          selfCertification: joi.boolean()
        }).when('crsReportable', { is: true, then: joi.required() }),
        
        taxResidencies: joi.array().items(joi.object({
          country: joi.string().length(2).required(),
          isPrimary: joi.boolean().default(false),
          tinNumber: joi.string().max(50),
          reasonCode: joi.string().max(10) // If no TIN available
        })).min(1).required(),
        
        sanctionsScreening: joi.object({
          sanctionsList: joi.string().valid('clear', 'potential_match', 'confirmed_match').required(),
          pepCheck: joi.string().valid('clear', 'potential_match', 'confirmed_match').required(),
          adverseMedia: joi.string().valid('clear', 'minor_issues', 'significant_issues').required(),
          lastScreeningDate: joi.date().iso().required(),
          nextScreeningDate: joi.date().iso()
        }).required(),
        
        amlRiskRating: joi.string().valid('low', 'medium', 'high').required(),
        amlRiskFactors: joi.array().items(joi.string().valid(
          'high_risk_country', 'cash_intensive_business', 'complex_structure',
          'political_exposure', 'adverse_media', 'sanctions_proximity'
        )),
        
        swissBankingCompliance: joi.object({
          dueDiligenceLevel: joi.string().valid('simplified', 'ordinary', 'enhanced').required(),
          dueDiligenceDate: joi.date().iso().required(),
          dueDiligenceValidUntil: joi.date().iso().required(),
          beneficialOwnerIdentified: joi.boolean().default(true),
          controllingPersonsIdentified: joi.boolean().default(true),
          finmaCompliant: joi.boolean().default(true),
          lastComplianceReview: joi.date().iso()
        }).required()
      }).required(),

      // Banking account relationships
      accountRelationships: joi.array().items(joi.object({
        accountId: joi.string().required(),
        accountType: joi.string().valid(
          'checking', 'savings', 'investment', 'loan', 'credit_card', 'mortgage'
        ).required(),
        relationshipType: joi.string().valid(
          'owner', 'authorized_signatory', 'beneficiary', 'guardian'
        ).required(),
        startDate: joi.date().iso(),
        endDate: joi.date().iso(),
        status: joi.string().valid('active', 'inactive', 'closed').default('active')
      })),

      // Metadata
      metadata: joi.object({
        originator: joi.string().max(50).required(), // Institution ID that created record
        industry: joi.string().default('banking'),
        ecosystem: joi.string().default('swiss_banking'),
        createdAt: joi.date().iso().required(),
        lastUpdated: joi.date().iso().required(),
        version: joi.string().default('1.0'),
        dataClassification: joi.string().valid('public', 'internal', 'confidential', 'restricted').default('confidential'),
        retentionPolicy: joi.string().max(100),
        verificationStatus: joi.string().valid('unverified', 'pending', 'verified', 'rejected').default('pending'),
        dataQualityScore: joi.number().min(0).max(100)
      }).required()
    });
  }

  /**
   * Get KYC data schema
   */
  getKycDataSchema() {
    return joi.object({
      customerId: joi.string().required(),
      kycLevel: joi.string().valid('basic', 'enhanced', 'premium').required(),
      completionDate: joi.date().iso(),
      validUntil: joi.date().iso(),
      documentsRequired: joi.array().items(joi.string()),
      documentsReceived: joi.array().items(joi.object({
        documentType: joi.string().required(),
        documentId: joi.string().required(),
        receivedAt: joi.date().iso().required(),
        verified: joi.boolean().default(false)
      })),
      riskAssessment: joi.object({
        overallRisk: joi.string().valid('low', 'medium', 'high').required(),
        riskFactors: joi.array().items(joi.string()),
        mitigationMeasures: joi.array().items(joi.string()),
        reviewDate: joi.date().iso(),
        approvedBy: joi.string()
      })
    });
  }

  /**
   * Get compliance data schema
   */
  getComplianceDataSchema() {
    return joi.object({
      customerId: joi.string().required(),
      complianceChecks: joi.array().items(joi.object({
        checkType: joi.string().valid('sanctions', 'pep', 'adverse_media', 'credit', 'fraud').required(),
        result: joi.string().valid('pass', 'fail', 'review_required').required(),
        score: joi.number().min(0).max(100),
        details: joi.object(),
        performedAt: joi.date().iso().required(),
        performedBy: joi.string().required()
      })),
      overallComplianceStatus: joi.string().valid('compliant', 'non_compliant', 'under_review').required(),
      lastReviewDate: joi.date().iso(),
      nextReviewDate: joi.date().iso(),
      exceptions: joi.array().items(joi.object({
        exceptionType: joi.string().required(),
        reason: joi.string().required(),
        approvedBy: joi.string().required(),
        approvalDate: joi.date().iso().required(),
        expiryDate: joi.date().iso()
      }))
    });
  }

  /**
   * Get account data schema
   */
  getAccountDataSchema() {
    return joi.object({
      accountId: joi.string().required(),
      customerId: joi.string().required(),
      accountNumber: joi.string().required(),
      accountType: joi.string().valid(
        'checking', 'savings', 'investment', 'loan', 'credit_card', 'mortgage'
      ).required(),
      currency: joi.string().length(3).default('CHF'),
      status: joi.string().valid('active', 'inactive', 'closed', 'suspended').required(),
      openedDate: joi.date().iso().required(),
      closedDate: joi.date().iso(),
      balance: joi.object({
        available: joi.number().required(),
        current: joi.number().required(),
        currency: joi.string().length(3).default('CHF')
      }),
      limits: joi.object({
        dailyTransferLimit: joi.number().positive(),
        monthlyTransferLimit: joi.number().positive(),
        overdraftLimit: joi.number()
      }),
      features: joi.array().items(joi.string().valid(
        'online_banking', 'mobile_banking', 'card_access', 'international_transfers'
      )),
      riskCategory: joi.string().valid('low', 'medium', 'high').default('medium'),
      monitoringLevel: joi.string().valid('standard', 'enhanced', 'intensive').default('standard')
    });
  }

  /**
   * Transform universal customer data to banking format
   */
  transformFromUniversal(universalData) {
    // Universal data already contains banking structure
    // Add any banking-specific transformations here
    return {
      ...universalData,
      // Add banking-specific calculated fields
      bankingSpecific: {
        complianceScore: this.calculateComplianceScore(universalData),
        relationshipTenure: this.calculateRelationshipTenure(universalData),
        productEligibility: this.assessProductEligibility(universalData)
      }
    };
  }

  /**
   * Transform banking data to universal format
   */
  transformToUniversal(bankingData) {
    // Remove banking-specific fields that aren't part of universal schema
    const { bankingSpecific, ...universalData } = bankingData;
    
    // Ensure all required universal fields are present
    return {
      customerId: bankingData.customerId,
      customerHash: bankingData.customerHash,
      basicData: bankingData.basicData,
      contactInformation: bankingData.contactInformation,
      addressData: bankingData.addressData,
      identification: bankingData.identification,
      kycData: bankingData.kycData,
      complianceData: bankingData.complianceData,
      metadata: {
        ...bankingData.metadata,
        transformedFrom: 'banking',
        transformedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Calculate compliance score
   */
  calculateComplianceScore(customerData) {
    let score = 100; // Start with perfect score

    // Deduct points for risk factors
    if (customerData.kycData?.pepStatus) score -= 20;
    if (customerData.complianceData?.amlRiskRating === 'high') score -= 30;
    if (customerData.complianceData?.amlRiskRating === 'medium') score -= 10;
    if (customerData.complianceData?.sanctionsScreening?.sanctionsList !== 'clear') score -= 40;
    if (customerData.complianceData?.fatcaStatus === 'recalcitrant') score -= 25;
    
    // Add points for positive factors
    if (customerData.identification?.levelOfAssurance === 'high') score += 5;
    if (customerData.complianceData?.swissBankingCompliance?.finmaCompliant) score += 5;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculate relationship tenure
   */
  calculateRelationshipTenure(customerData) {
    if (!customerData.metadata?.createdAt) return null;
    
    const createdDate = new Date(customerData.metadata.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: diffDays,
      years: Math.floor(diffDays / 365),
      category: diffDays < 365 ? 'new' : diffDays < 1095 ? 'established' : 'long_term'
    };
  }

  /**
   * Assess product eligibility
   */
  assessProductEligibility(customerData) {
    const eligibility = {
      basicBanking: true, // Everyone gets basic banking
      creditProducts: false,
      investmentProducts: false,
      premiumServices: false
    };

    // Credit products eligibility
    if (customerData.kycData?.annualIncome?.amount >= 50000 && 
        customerData.complianceData?.amlRiskRating !== 'high') {
      eligibility.creditProducts = true;
    }

    // Investment products eligibility  
    if (customerData.kycData?.totalAssets?.amount >= 100000 &&
        customerData.identification?.levelOfAssurance === 'high') {
      eligibility.investmentProducts = true;
    }

    // Premium services eligibility
    if (customerData.kycData?.totalAssets?.amount >= 500000 ||
        customerData.kycData?.annualIncome?.amount >= 200000) {
      eligibility.premiumServices = true;
    }

    return eligibility;
  }

  /**
   * Generate Swiss banking customer hash
   */
  generateSwissBankingHash(basicData, additionalData = {}) {
    const crypto = require('crypto');
    
    // Include Swiss-specific elements in hash
    const hashInput = [
      basicData.lastName,
      basicData.givenName, 
      basicData.birthDate,
      basicData.nationality.sort().join(','),
      additionalData.ahvNumber || '', // Swiss social security number if available
      'CH-BANKING' // Swiss banking identifier
    ].join('|');
    
    return crypto.createHash('sha256').update(hashInput).digest('hex');
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    return {
      status: this.initialized ? 'healthy' : 'not_initialized',
      initialized: this.initialized,
      coreFrameworkIntegration: !!this.coreFramework
    };
  }

  /**
   * Shutdown
   */
  async shutdown() {
    this.initialized = false;
    console.log('📊 Banking Data Models shut down');
  }
}

module.exports = BankingDataModels;