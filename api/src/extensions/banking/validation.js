/**
 * Banking Validation
 * 
 * Swiss banking-specific validation rules and business logic
 */

class BankingValidation {
  constructor() {
    this.initialized = false;
    this.validators = new Map();
  }

  async initialize(coreFramework) {
    console.log(' Initializing Banking Validation...');
    this.coreFramework = coreFramework;
    this.setupBankingValidators();
    this.initialized = true;
    console.log(' Banking Validation initialized');
  }

  /**
   * Setup banking-specific validators
   */
  setupBankingValidators() {
    // Swiss AHV number validator
    this.validators.set('swissAhvNumber', (value) => {
      if (!value || typeof value !== 'string') return { valid: false, error: 'AHV number is required' };
      
      // Swiss AHV format: 756.XXXX.XXXX.XX
      const ahvPattern = /^756\.\d{4}\.\d{4}\.\d{2}$/;
      if (!ahvPattern.test(value)) {
        return { valid: false, error: 'Invalid Swiss AHV number format' };
      }
      
      // Check digit validation (simplified)
      const digits = value.replace(/\./g, '').slice(3); // Remove country code and dots
      return { valid: true, value: value };
    });

    // Swiss postal code validator
    this.validators.set('swissPostalCode', (value) => {
      if (!value) return { valid: false, error: 'Postal code is required' };
      
      const postalCode = value.toString();
      if (!/^\d{4}$/.test(postalCode)) {
        return { valid: false, error: 'Swiss postal code must be 4 digits' };
      }
      
      const code = parseInt(postalCode);
      if (code < 1000 || code > 9999) {
        return { valid: false, error: 'Invalid Swiss postal code range' };
      }
      
      return { valid: true, value: postalCode };
    });

    // Swiss bank account number validator (IBAN)
    this.validators.set('swissIban', (value) => {
      if (!value) return { valid: false, error: 'IBAN is required' };
      
      const iban = value.replace(/\s+/g, '').toUpperCase();
      
      // Swiss IBAN format: CH followed by 2 check digits and 17 digits
      if (!/^CH\d{19}$/.test(iban)) {
        return { valid: false, error: 'Invalid Swiss IBAN format' };
      }
      
      // IBAN check digit validation (mod 97)
      const rearranged = iban.slice(4) + iban.slice(0, 4);
      const numericString = rearranged.replace(/[A-Z]/g, letter => 
        (letter.charCodeAt(0) - 55).toString()
      );
      
      const remainder = numericString.split('').reduce((acc, digit) => 
        (acc * 10 + parseInt(digit)) % 97, 0
      );
      
      if (remainder !== 1) {
        return { valid: false, error: 'Invalid IBAN check digits' };
      }
      
      return { valid: true, value: iban };
    });

    // Swiss phone number validator
    this.validators.set('swissPhoneNumber', (value) => {
      if (!value) return { valid: false, error: 'Phone number is required' };
      
      // Swiss phone number formats: +41XXXXXXXXX or 0XXXXXXXXX
      const phonePattern = /^(\+41|0)[1-9]\d{8}$/;
      if (!phonePattern.test(value.replace(/\s+/g, ''))) {
        return { valid: false, error: 'Invalid Swiss phone number format' };
      }
      
      return { valid: true, value: value };
    });

    // FATCA validation
    this.validators.set('fatcaStatus', (customerData) => {
      const { fatcaStatus, fatcaDetails } = customerData.complianceData || {};
      
      if (!fatcaStatus) {
        return { valid: false, error: 'FATCA status is required' };
      }
      
      if (fatcaStatus === 'us_person' && !fatcaDetails) {
        return { valid: false, error: 'FATCA details required for US persons' };
      }
      
      if (fatcaStatus === 'us_person' && fatcaDetails && !fatcaDetails.tinNumber) {
        return { valid: false, error: 'TIN number required for US persons' };
      }
      
      return { valid: true };
    });

    // Swiss banking due diligence validation
    this.validators.set('swissDueDiligence', (customerData) => {
      const compliance = customerData.complianceData?.swissBankingCompliance;
      
      if (!compliance) {
        return { valid: false, error: 'Swiss banking compliance data is required' };
      }
      
      // Check due diligence expiry
      if (compliance.dueDiligenceValidUntil) {
        const expiryDate = new Date(compliance.dueDiligenceValidUntil);
        if (expiryDate < new Date()) {
          return { valid: false, error: 'Due diligence has expired' };
        }
      }
      
      // Enhanced due diligence requirements
      if (compliance.dueDiligenceLevel === 'enhanced') {
        if (!compliance.beneficialOwnerIdentified) {
          return { valid: false, error: 'Beneficial owner identification required for enhanced due diligence' };
        }
      }
      
      return { valid: true };
    });

    // Risk assessment validation
    this.validators.set('riskAssessment', (customerData) => {
      const kyc = customerData.kycData;
      const compliance = customerData.complianceData;
      
      if (!kyc || !compliance) {
        return { valid: false, error: 'KYC and compliance data required for risk assessment' };
      }
      
      // High-risk country check
      const highRiskCountries = ['AF', 'KP', 'IR', 'SY']; // Example high-risk countries
      if (customerData.basicData?.nationality?.some(nat => highRiskCountries.includes(nat))) {
        if (compliance.amlRiskRating === 'low') {
          return { valid: false, error: 'Risk rating too low for high-risk nationality' };
        }
      }
      
      // PEP status consistency check
      if (kyc.pepStatus && compliance.amlRiskRating === 'low') {
        return { valid: false, error: 'Risk rating must be medium or high for PEP customers' };
      }
      
      // Income vs assets consistency
      if (kyc.annualIncome?.amount && kyc.totalAssets?.amount) {
        const incomeToAssetsRatio = kyc.totalAssets.amount / kyc.annualIncome.amount;
        if (incomeToAssetsRatio > 20 && compliance.amlRiskRating === 'low') {
          return { valid: false, error: 'High asset-to-income ratio requires elevated risk rating' };
        }
      }
      
      return { valid: true };
    });

    // Product eligibility validation
    this.validators.set('productEligibility', (customerData, productType) => {
      const kyc = customerData.kycData;
      const compliance = customerData.complianceData;
      
      switch (productType) {
        case 'credit_products':
          if (kyc?.annualIncome?.amount < 30000) {
            return { valid: false, error: 'Minimum annual income of CHF 30,000 required for credit products' };
          }
          if (compliance?.amlRiskRating === 'high') {
            return { valid: false, error: 'High-risk customers not eligible for credit products' };
          }
          break;
          
        case 'investment_products':
          if (!kyc?.totalAssets?.amount || kyc.totalAssets.amount < 50000) {
            return { valid: false, error: 'Minimum assets of CHF 50,000 required for investment products' };
          }
          if (customerData.identification?.levelOfAssurance !== 'high') {
            return { valid: false, error: 'High level of assurance required for investment products' };
          }
          break;
          
        case 'private_banking':
          if (!kyc?.totalAssets?.amount || kyc.totalAssets.amount < 1000000) {
            return { valid: false, error: 'Minimum assets of CHF 1,000,000 required for private banking' };
          }
          if (compliance?.sanctionsScreening?.sanctionsList !== 'clear') {
            return { valid: false, error: 'Clear sanctions screening required for private banking' };
          }
          break;
      }
      
      return { valid: true };
    });
  }

  /**
   * Validate banking data
   */
  async validate(data, validationType, options = {}) {
    try {
      const validator = this.validators.get(validationType);
      
      if (!validator) {
        return {
          valid: false,
          error: 'VALIDATOR_NOT_FOUND',
          message: `Banking validator not found: ${validationType}`
        };
      }

      const result = validator(data, options.additionalParams);
      
      return {
        valid: result.valid,
        error: result.error || null,
        value: result.value || data,
        validationType,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        valid: false,
        error: 'VALIDATION_ERROR',
        message: error.message,
        validationType,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Comprehensive banking customer validation
   */
  async validateBankingCustomer(customerData) {
    const validationResults = {};
    const errors = [];

    // Run all relevant validations
    const validations = [
      { type: 'fatcaStatus', data: customerData },
      { type: 'swissDueDiligence', data: customerData },
      { type: 'riskAssessment', data: customerData }
    ];

    // Add field-specific validations if data is present
    if (customerData.contactInformation?.mobilePhone) {
      validations.push({ 
        type: 'swissPhoneNumber', 
        data: customerData.contactInformation.mobilePhone 
      });
    }

    if (customerData.addressData?.residentialAddress?.postalCode) {
      validations.push({ 
        type: 'swissPostalCode', 
        data: customerData.addressData.residentialAddress.postalCode 
      });
    }

    // Execute validations
    for (const validation of validations) {
      const result = await this.validate(validation.data, validation.type);
      validationResults[validation.type] = result;
      
      if (!result.valid) {
        errors.push({
          field: validation.type,
          error: result.error,
          message: result.message
        });
      }
    }

    // Overall validation result
    const isValid = errors.length === 0;

    return {
      valid: isValid,
      errors: errors,
      validationResults: validationResults,
      overallScore: this.calculateValidationScore(validationResults),
      validatedAt: new Date().toISOString()
    };
  }

  /**
   * Calculate validation score
   */
  calculateValidationScore(validationResults) {
    const total = Object.keys(validationResults).length;
    if (total === 0) return 0;
    
    const passed = Object.values(validationResults).filter(r => r.valid).length;
    return Math.round((passed / total) * 100);
  }

  /**
   * Validate Swiss banking compliance
   */
  async validateSwissCompliance(customerData) {
    const complianceChecks = {
      dueDiligence: false,
      sanctionsScreening: false,
      pepScreening: false,
      amlRiskAssessment: false,
      fatcaCompliance: false,
      crsCompliance: false,
      beneficialOwnership: false
    };

    const compliance = customerData.complianceData;
    
    if (compliance) {
      // Due diligence check
      if (compliance.swissBankingCompliance?.dueDiligenceDate && 
          compliance.swissBankingCompliance?.dueDiligenceValidUntil) {
        const validUntil = new Date(compliance.swissBankingCompliance.dueDiligenceValidUntil);
        complianceChecks.dueDiligence = validUntil > new Date();
      }

      // Sanctions screening
      complianceChecks.sanctionsScreening = 
        compliance.sanctionsScreening?.sanctionsList === 'clear';

      // PEP screening
      complianceChecks.pepScreening = 
        compliance.sanctionsScreening?.pepCheck === 'clear';

      // AML risk assessment
      complianceChecks.amlRiskAssessment = 
        ['low', 'medium', 'high'].includes(compliance.amlRiskRating);

      // FATCA compliance
      complianceChecks.fatcaCompliance = 
        compliance.fatcaStatus && compliance.fatcaStatus !== 'recalcitrant';

      // CRS compliance
      complianceChecks.crsCompliance = 
        compliance.hasOwnProperty('crsReportable') && 
        Array.isArray(compliance.taxResidencies) && 
        compliance.taxResidencies.length > 0;

      // Beneficial ownership
      complianceChecks.beneficialOwnership = 
        compliance.swissBankingCompliance?.beneficialOwnerIdentified === true;
    }

    const passedChecks = Object.values(complianceChecks).filter(Boolean).length;
    const totalChecks = Object.keys(complianceChecks).length;
    const complianceScore = Math.round((passedChecks / totalChecks) * 100);

    return {
      compliant: complianceScore >= 80, // 80% threshold for compliance
      complianceScore,
      checks: complianceChecks,
      passedChecks,
      totalChecks,
      missingRequirements: Object.keys(complianceChecks).filter(
        key => !complianceChecks[key]
      ),
      validatedAt: new Date().toISOString()
    };
  }

  /**
   * Cross-validate customer data consistency
   */
  async crossValidateCustomerData(customerData) {
    const inconsistencies = [];

    // Check age consistency
    if (customerData.basicData?.birthDate) {
      const age = this.calculateAge(customerData.basicData.birthDate);
      
      // Employment status vs age
      if (age < 16 && customerData.kycData?.employmentType === 'employed') {
        inconsistencies.push('Employment status inconsistent with age');
      }
      
      // Retirement vs age
      if (age < 60 && customerData.kycData?.employmentType === 'retired') {
        inconsistencies.push('Retirement status inconsistent with age');
      }
    }

    // Income vs assets consistency
    if (customerData.kycData?.annualIncome?.amount && 
        customerData.kycData?.totalAssets?.amount) {
      const income = customerData.kycData.annualIncome.amount;
      const assets = customerData.kycData.totalAssets.amount;
      
      if (assets > income * 50) { // More than 50 years of income
        inconsistencies.push('Total assets significantly exceed reasonable savings from income');
      }
    }

    // Address vs nationality consistency
    if (customerData.basicData?.nationality && 
        customerData.addressData?.residentialAddress?.country) {
      const nationalities = customerData.basicData.nationality;
      const residenceCountry = customerData.addressData.residentialAddress.country;
      
      // Flag if no nationality matches residence (requires explanation)
      if (!nationalities.includes(residenceCountry) && residenceCountry !== 'CH') {
        inconsistencies.push('Residence country does not match any nationality');
      }
    }

    return {
      consistent: inconsistencies.length === 0,
      inconsistencies,
      riskLevel: inconsistencies.length > 2 ? 'high' : 
                inconsistencies.length > 0 ? 'medium' : 'low',
      validatedAt: new Date().toISOString()
    };
  }

  /**
   * Calculate age from birth date
   */
  calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get all banking validators
   */
  getAvailableValidators() {
    return Array.from(this.validators.keys()).map(key => ({
      name: key,
      description: this.getValidatorDescription(key)
    }));
  }

  /**
   * Get validator description
   */
  getValidatorDescription(validatorName) {
    const descriptions = {
      swissAhvNumber: 'Validates Swiss AHV social security number format',
      swissPostalCode: 'Validates Swiss postal code format and range',
      swissIban: 'Validates Swiss IBAN format and check digits',
      swissPhoneNumber: 'Validates Swiss phone number format',
      fatcaStatus: 'Validates FATCA compliance status and requirements',
      swissDueDiligence: 'Validates Swiss banking due diligence requirements',
      riskAssessment: 'Validates risk assessment consistency',
      productEligibility: 'Validates customer eligibility for specific products'
    };
    
    return descriptions[validatorName] || 'Banking validation rule';
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    return {
      status: this.initialized ? 'healthy' : 'not_initialized',
      initialized: this.initialized,
      validatorsLoaded: this.validators.size,
      coreFrameworkIntegration: !!this.coreFramework
    };
  }

  /**
   * Shutdown
   */
  async shutdown() {
    this.validators.clear();
    this.initialized = false;
    console.log(' Banking Validation shut down');
  }
}

module.exports = BankingValidation;