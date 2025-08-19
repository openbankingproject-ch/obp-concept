/**
 * Universal Validation Engine
 * 
 * Provides comprehensive data validation capabilities that work across
 * any industry while supporting extension-specific validation rules.
 */

const joi = require('joi');

/**
 * Validation Engine
 */
class ValidationEngine {
  constructor(config = {}) {
    this.config = {
      enableCache: true,
      cacheSize: 1000,
      enableStrictMode: false,
      enableFieldLevelValidation: true,
      ...config
    };
    
    this.validationCache = new Map(); // Cache for validation results
    this.customValidators = new Map(); // Custom validation functions
    this.extensionRules = new Map(); // Extension-specific validation rules
    this.dataQualityRules = new Map(); // Data quality assessment rules
    
    // Initialize universal validation rules
    this.initializeUniversalRules();
  }

  async initialize() {
    console.log('🔄 Initializing Validation Engine...');
    
    // Register built-in validators
    this.registerBuiltinValidators();
    
    console.log('✅ Validation Engine initialized');
  }

  /**
   * Initialize universal validation rules
   */
  initializeUniversalRules() {
    // Customer Check Request
    this.customValidators.set('customerCheck', joi.object({
      sharedCustomerHash: joi.string().pattern(/^[a-f0-9]{64}$/).required().description('SHA-256 hash'),
      basicData: joi.object({
        lastName: joi.string().max(100).required(),
        givenName: joi.string().max(100).required(), 
        birthDate: joi.date().iso().max('now').required(),
        nationality: joi.array().items(joi.string().pattern(/^[A-Z]{2}$/)).min(1).max(5).required()
      }).required()
    }));

    // Full Data Request  
    this.customValidators.set('fullDataRequest', joi.object({
      sharedCustomerHash: joi.string().pattern(/^[a-f0-9]{64}$/).required(),
      purpose: joi.string().valid('accountOpening', 'creditAssessment', 'compliance', 'customerUpdate').required(),
      consentToken: joi.string().required(),
      requestingParticipant: joi.string().max(255),
      dataCategories: joi.array().items(joi.string()).min(1)
    }));

    // Consent Creation
    this.customValidators.set('createConsent', joi.object({
      customerId: joi.string().max(255).required(),
      requestingParticipant: joi.string().max(255).required(),
      providingParticipant: joi.string().max(255),
      dataCategories: joi.array().items(joi.string()).min(1).required(),
      purpose: joi.string().required(),
      expiryDate: joi.date().iso().greater('now').required(),
      customerContactMethod: joi.string().valid('email', 'sms', 'app', 'postal', 'phone'),
      permissions: joi.object({
        read: joi.boolean(),
        update: joi.boolean(),
        share: joi.boolean(),
        retain: joi.boolean()
      }),
      context: joi.object({
        industry: joi.string(),
        ecosystem: joi.string(),
        useCase: joi.string(),
        legalBasis: joi.string(),
        retentionPeriod: joi.string()
      })
    }));

    // Participant Registration
    this.customValidators.set('participantRegistration', joi.object({
      participantId: joi.string().max(100).pattern(/^[A-Z0-9-_]+$/).required(),
      name: joi.string().max(255).required(),
      industry: joi.string().valid('banking', 'insurance', 'real_estate', 'mobility', 'retail', 'government', 'healthcare', 'education', 'other').required(),
      ecosystem: joi.string().max(100),
      
      capabilities: joi.object({
        dataProvider: joi.boolean(),
        dataConsumer: joi.boolean(),
        identityProvider: joi.boolean(),
        consentProvider: joi.boolean()
      }),
      
      endpoints: joi.object({
        baseUrl: joi.string().uri().pattern(/^https:\/\//).required(),
        healthCheck: joi.string(),
        consent: joi.string(),
        customer: joi.string()
      }).required(),
      
      certificates: joi.array().items(joi.string()),
      
      contact: joi.object({
        technical: joi.string().email(),
        business: joi.string().email(),
        legal: joi.string().email()
      }),
      
      compliance: joi.object({
        regulations: joi.array().items(joi.string()),
        certifications: joi.array().items(joi.string()),
        dataProtection: joi.string(),
        auditDate: joi.date().iso()
      })
    }));

    // Data Quality Rules
    this.dataQualityRules.set('completeness', (data, schema) => {
      let score = 1.0;
      const requiredFields = this.extractRequiredFields(schema);
      const missingFields = requiredFields.filter(field => !this.hasValue(data, field));
      score = Math.max(0, 1 - (missingFields.length / requiredFields.length));
      return { score, missingFields };
    });

    this.dataQualityRules.set('accuracy', (data, schema) => {
      let score = 1.0;
      // Check data format compliance
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        score = Math.max(0, 1 - (error.details.length * 0.1));
      }
      return { score, issues: error?.details || [] };
    });

    this.dataQualityRules.set('consistency', (data) => {
      let score = 1.0;
      const issues = [];
      
      // Check internal consistency
      if (data.basicData?.birthDate) {
        const age = this.calculateAge(data.basicData.birthDate);
        if (age < 0 || age > 150) {
          score -= 0.3;
          issues.push('Invalid birth date');
        }
      }
      
      return { score: Math.max(0, score), issues };
    });

    console.log(`✅ Initialized ${this.customValidators.size} universal validation rules`);
  }

  /**
   * Register built-in validators
   */
  registerBuiltinValidators() {
    // Swiss-specific validators
    this.customValidators.set('swissPostalCode', joi.string().pattern(/^\d{4}$/));
    this.customValidators.set('swissPhoneNumber', joi.string().pattern(/^\+41\d{9}$/));
    this.customValidators.set('swissIBAN', joi.string().pattern(/^CH\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?[\dA-Z]$/));
    
    // International validators
    this.customValidators.set('isoCountryCode', joi.string().pattern(/^[A-Z]{2}$/));
    this.customValidators.set('isoCurrencyCode', joi.string().pattern(/^[A-Z]{3}$/));
    this.customValidators.set('isoLanguageCode', joi.string().pattern(/^[a-z]{2}$/));
    
    // Business logic validators
    this.customValidators.set('futureDate', joi.date().greater('now'));
    this.customValidators.set('pastDate', joi.date().less('now'));
    this.customValidators.set('adultAge', joi.date().max(new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)));
  }

  /**
   * Main validation method
   */
  async validate(data, schemaName, extensionName = null, options = {}) {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(data, schemaName, extensionName);
      if (this.config.enableCache && this.validationCache.has(cacheKey)) {
        const cached = this.validationCache.get(cacheKey);
        console.log(`💨 Validation cache hit for ${schemaName}`);
        return cached;
      }

      // Get validation schema
      const schema = this.getValidationSchema(schemaName, extensionName);
      if (!schema) {
        return {
          valid: false,
          errors: [{
            field: 'schema',
            code: 'SCHEMA_NOT_FOUND',
            message: `Validation schema '${schemaName}' not found`,
            severity: 'error'
          }],
          timestamp: new Date().toISOString()
        };
      }

      // Perform validation
      const validationOptions = {
        abortEarly: false,
        allowUnknown: !this.config.enableStrictMode,
        stripUnknown: false,
        ...options
      };

      const { error, value, warning } = schema.validate(data, validationOptions);

      // Build result
      const result = {
        valid: !error,
        errors: [],
        warnings: [],
        value: error ? undefined : value,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        schemaName,
        extensionName
      };

      // Process errors
      if (error) {
        result.errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          code: detail.type.toUpperCase().replace(/\./g, '_'),
          message: detail.message,
          severity: 'error',
          value: detail.context?.value
        }));
      }

      // Process warnings
      if (warning) {
        result.warnings = warning.details.map(detail => ({
          field: detail.path.join('.'),
          code: detail.type.toUpperCase().replace(/\./g, '_'),
          message: detail.message,
          severity: 'warning'
        }));
      }

      // Perform data quality assessment
      if (result.valid && options.includeQuality !== false) {
        result.quality = await this.assessDataQuality(value, schema, extensionName);
      }

      // Apply extension-specific validation
      if (result.valid && extensionName) {
        const extensionResult = await this.applyExtensionValidation(value, schemaName, extensionName);
        if (!extensionResult.valid) {
          result.valid = false;
          result.errors.push(...extensionResult.errors);
        }
        if (extensionResult.warnings) {
          result.warnings.push(...extensionResult.warnings);
        }
      }

      // Cache result
      if (this.config.enableCache) {
        this.cacheValidationResult(cacheKey, result);
      }

      // Log validation
      if (result.valid) {
        console.log(`✅ Validation successful: ${schemaName} in ${result.duration}ms`);
      } else {
        console.log(`❌ Validation failed: ${schemaName} with ${result.errors.length} errors`);
      }

      return result;

    } catch (error) {
      console.error('Validation engine error:', error);
      return {
        valid: false,
        errors: [{
          field: 'validation',
          code: 'VALIDATION_ENGINE_ERROR',
          message: error.message,
          severity: 'error'
        }],
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime
      };
    }
  }

  /**
   * Assess data quality
   */
  async assessDataQuality(data, schema, extensionName = null) {
    const quality = {
      overallScore: 0,
      scores: {},
      issues: [],
      recommendations: []
    };

    let totalScore = 0;
    let ruleCount = 0;

    // Apply universal quality rules
    for (const [ruleName, ruleFunction] of this.dataQualityRules) {
      try {
        const ruleResult = ruleFunction(data, schema);
        quality.scores[ruleName] = ruleResult.score;
        totalScore += ruleResult.score;
        ruleCount++;

        if (ruleResult.issues) {
          quality.issues.push(...ruleResult.issues.map(issue => ({
            rule: ruleName,
            issue,
            severity: 'warning'
          })));
        }

        if (ruleResult.missingFields) {
          quality.recommendations.push(...ruleResult.missingFields.map(field => ({
            type: 'completeness',
            message: `Consider providing value for field: ${field}`,
            field
          })));
        }

      } catch (error) {
        console.warn(`Data quality rule '${ruleName}' failed:`, error);
      }
    }

    // Apply extension quality rules
    if (extensionName && this.extensionRules.has(extensionName)) {
      const extensionRules = this.extensionRules.get(extensionName);
      for (const [ruleName, ruleFunction] of extensionRules) {
        try {
          const ruleResult = ruleFunction(data, schema);
          quality.scores[`${extensionName}:${ruleName}`] = ruleResult.score;
          totalScore += ruleResult.score;
          ruleCount++;

          if (ruleResult.issues) {
            quality.issues.push(...ruleResult.issues.map(issue => ({
              rule: `${extensionName}:${ruleName}`,
              issue,
              severity: 'warning'
            })));
          }

        } catch (error) {
          console.warn(`Extension data quality rule '${extensionName}:${ruleName}' failed:`, error);
        }
      }
    }

    // Calculate overall score
    quality.overallScore = ruleCount > 0 ? totalScore / ruleCount : 0;

    // Add overall quality recommendations
    if (quality.overallScore < 0.7) {
      quality.recommendations.push({
        type: 'overall',
        message: 'Data quality is below recommended threshold (0.7)',
        priority: 'high'
      });
    }

    return quality;
  }

  /**
   * Apply extension-specific validation
   */
  async applyExtensionValidation(data, schemaName, extensionName) {
    // This would be implemented by extensions
    return { valid: true, errors: [], warnings: [] };
  }

  /**
   * Get validation schema
   */
  getValidationSchema(schemaName, extensionName = null) {
    // Try extension-specific schema first
    if (extensionName) {
      const extensionKey = `${extensionName}:${schemaName}`;
      if (this.customValidators.has(extensionKey)) {
        return this.customValidators.get(extensionKey);
      }
    }

    // Fallback to universal schema
    return this.customValidators.get(schemaName);
  }

  /**
   * Register extension schema
   */
  registerExtensionSchema(extensionName, schemaName, schema) {
    const key = `${extensionName}:${schemaName}`;
    this.customValidators.set(key, schema);
    console.log(`✅ Registered extension validation schema: ${key}`);
  }

  /**
   * Register extension quality rule
   */
  registerExtensionQualityRule(extensionName, ruleName, ruleFunction) {
    if (!this.extensionRules.has(extensionName)) {
      this.extensionRules.set(extensionName, new Map());
    }
    
    this.extensionRules.get(extensionName).set(ruleName, ruleFunction);
    console.log(`✅ Registered extension quality rule: ${extensionName}:${ruleName}`);
  }

  /**
   * Bulk validation
   */
  async validateBulk(dataArray, schemaName, extensionName = null) {
    const results = [];
    
    for (const data of dataArray) {
      const result = await this.validate(data, schemaName, extensionName);
      results.push(result);
    }
    
    return {
      results,
      summary: {
        total: results.length,
        valid: results.filter(r => r.valid).length,
        invalid: results.filter(r => !r.valid).length,
        avgQuality: results.reduce((sum, r) => sum + (r.quality?.overallScore || 0), 0) / results.length
      }
    };
  }

  /**
   * Helper methods
   */
  generateCacheKey(data, schemaName, extensionName) {
    const crypto = require('crypto');
    const key = `${schemaName}:${extensionName || 'universal'}:${JSON.stringify(data)}`;
    return crypto.createHash('md5').update(key).digest('hex');
  }

  cacheValidationResult(cacheKey, result) {
    // Simple LRU cache
    if (this.validationCache.size >= this.config.cacheSize) {
      const firstKey = this.validationCache.keys().next().value;
      this.validationCache.delete(firstKey);
    }
    
    this.validationCache.set(cacheKey, result);
  }

  extractRequiredFields(schema) {
    // Extract required fields from Joi schema (simplified)
    const requiredFields = [];
    // This would need proper Joi schema introspection
    return requiredFields;
  }

  hasValue(data, fieldPath) {
    const fields = fieldPath.split('.');
    let current = data;
    
    for (const field of fields) {
      if (current == null || typeof current !== 'object') {
        return false;
      }
      current = current[field];
    }
    
    return current != null && current !== '';
  }

  calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Clear validation cache
   */
  clearCache() {
    this.validationCache.clear();
    console.log('✅ Validation cache cleared');
  }

  /**
   * Get validation statistics
   */
  getValidationStats() {
    return {
      schemas: {
        universal: Array.from(this.customValidators.keys()).filter(k => !k.includes(':')).length,
        extension: Array.from(this.customValidators.keys()).filter(k => k.includes(':')).length
      },
      cache: {
        size: this.validationCache.size,
        maxSize: this.config.cacheSize,
        hitRate: 0 // TODO: Track hit rate
      },
      qualityRules: this.dataQualityRules.size,
      extensionRules: this.extensionRules.size
    };
  }

  async getHealthStatus() {
    return {
      status: 'healthy',
      validation: {
        schemas: this.customValidators.size,
        qualityRules: this.dataQualityRules.size,
        cache: this.validationCache.size
      }
    };
  }

  async shutdown() {
    console.log('🔄 Shutting down Validation Engine...');
    this.clearCache();
    console.log('✅ Validation Engine shutdown complete');
  }
}

module.exports = ValidationEngine;