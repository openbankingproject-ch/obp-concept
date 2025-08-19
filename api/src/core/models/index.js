/**
 * Universal Data Models for Open API Kundenbeziehung
 * 
 * These models provide the foundational data structures that can be extended
 * by any industry or ecosystem while maintaining consistency and interoperability.
 */

const joi = require('joi');

/**
 * Universal Data Models Manager
 */
class DataModels {
  constructor(config = {}) {
    this.config = config;
    this.schemas = new Map();
    this.extensions = new Map();
    
    // Initialize universal schemas
    this.initializeUniversalSchemas();
  }

  async initialize() {
    console.log(' Initializing Universal Data Models...');
    // Additional async initialization if needed
    console.log(' Universal Data Models initialized');
  }

  /**
   * Initialize core universal schemas that work across any industry
   */
  initializeUniversalSchemas() {
    // Universal Customer Identity
    this.schemas.set('universalCustomer', joi.object({
      // Core identity fields - minimal for cross-industry compatibility
      customerId: joi.string().required().max(255).description('Universal customer identifier'),
      customerHash: joi.string().pattern(/^[a-f0-9]{64}$/).description('SHA-256 hash for privacy-preserving matching'),
      
      // Basic identity (extensible by industries)
      basicData: joi.object({
        lastName: joi.string().max(100),
        givenName: joi.string().max(100),
        birthDate: joi.date().iso(),
        nationality: joi.array().items(joi.string().pattern(/^[A-Z]{2}$/)).min(1).max(5),
        language: joi.string().pattern(/^[a-z]{2}$/)
      }),
      
      // Contact information (universal)
      contactInformation: joi.object({
        primaryEmail: joi.string().email().max(255),
        mobilePhone: joi.string().pattern(/^\+[1-9]\d{1,14}$/),
        preferredContactMethod: joi.string().valid('email', 'sms', 'phone', 'postal', 'app')
      }),
      
      // Address data (universal)
      addressData: joi.object({
        primary: joi.object({
          street: joi.string().max(255),
          city: joi.string().max(100),
          postalCode: joi.string().max(20),
          region: joi.string().max(100),
          country: joi.string().pattern(/^[A-Z]{2}$/),
          type: joi.string().valid('residential', 'business', 'mailing', 'temporary')
        })
      }),
      
      // Universal metadata
      metadata: joi.object({
        originator: joi.string().max(255).description('System/institution that created this record'),
        industry: joi.string().valid('banking', 'insurance', 'real_estate', 'mobility', 'retail', 'government', 'healthcare', 'education', 'other'),
        ecosystem: joi.string().max(100).description('Specific ecosystem within industry'),
        createdAt: joi.date().iso(),
        lastUpdated: joi.date().iso(),
        version: joi.string().max(50),
        dataClassification: joi.string().valid('public', 'internal', 'confidential', 'restricted'),
        verificationStatus: joi.string().valid('unverified', 'verified', 'expired', 'revoked')
      }).required()
    }));

    // Universal Consent Request
    this.schemas.set('universalConsentRequest', joi.object({
      customerId: joi.string().required().max(255),
      requestingParticipant: joi.string().required().max(255).description('Participant requesting data'),
      providingParticipant: joi.string().max(255).description('Participant providing data (optional, can be auto-detected)'),
      
      // Data categories (extensible)
      dataCategories: joi.array().items(
        joi.string().valid(
          // Universal categories
          'basicData', 'contactInformation', 'addressData', 'identification', 
          'verification', 'credentials', 'preferences', 'metadata',
          // Industry-extensible categories
          'industrySpecific', 'extended'
        )
      ).required().min(1),
      
      // Purpose (extensible by industries)
      purpose: joi.string().required().valid(
        // Universal purposes
        'identification', 'verification', 'communication', 'service_provision',
        'compliance', 'customer_update', 'data_portability',
        // Industry-extensible purposes
        'industry_specific'
      ),
      
      // Universal consent properties
      expiryDate: joi.date().iso().required(),
      customerContactMethod: joi.string().valid('email', 'sms', 'app', 'postal', 'phone'),
      
      // Granular permissions
      permissions: joi.object({
        read: joi.boolean().default(true),
        update: joi.boolean().default(false),
        share: joi.boolean().default(false),
        retain: joi.boolean().default(false)
      }),
      
      // Context information
      context: joi.object({
        industry: joi.string(),
        ecosystem: joi.string(),
        useCase: joi.string(),
        legalBasis: joi.string(),
        retentionPeriod: joi.string()
      })
    }));

    // Universal Consent Status
    this.schemas.set('universalConsentStatus', joi.object({
      consentId: joi.string().uuid().required(),
      status: joi.string().valid('pending', 'approved', 'rejected', 'expired', 'revoked').required(),
      customerId: joi.string().required(),
      dataCategories: joi.array().items(joi.string()),
      purpose: joi.string(),
      permissions: joi.object(),
      
      // Timestamps
      createdAt: joi.date().iso(),
      approvedAt: joi.date().iso(),
      rejectedAt: joi.date().iso(),
      revokedAt: joi.date().iso(),
      expiryDate: joi.date().iso(),
      
      // Audit information
      audit: joi.object({
        requestedBy: joi.string(),
        approvedBy: joi.string(),
        revokedBy: joi.string(),
        reason: joi.string()
      })
    }));

    // Universal Participant
    this.schemas.set('universalParticipant', joi.object({
      participantId: joi.string().required().max(100),
      name: joi.string().required().max(255),
      industry: joi.string().required().valid('banking', 'insurance', 'real_estate', 'mobility', 'retail', 'government', 'healthcare', 'education', 'other'),
      ecosystem: joi.string().max(100),
      
      // Technical capabilities
      capabilities: joi.object({
        dataProvider: joi.boolean().default(false),
        dataConsumer: joi.boolean().default(false),
        identityProvider: joi.boolean().default(false),
        consentProvider: joi.boolean().default(false)
      }),
      
      // API endpoints
      endpoints: joi.object({
        baseUrl: joi.string().uri(),
        healthCheck: joi.string().uri(),
        consent: joi.string().uri(),
        customer: joi.string().uri(),
        wellKnown: joi.string().uri()
      }),
      
      // Trust and security
      certificates: joi.array().items(joi.string()).description('X.509 certificates for mTLS'),
      trustLevel: joi.string().valid('basic', 'enhanced', 'premium').default('basic'),
      
      // Registration info
      status: joi.string().valid('pending', 'active', 'suspended', 'inactive').default('pending'),
      registeredAt: joi.date().iso(),
      lastSeen: joi.date().iso(),
      
      // Contact and legal
      contact: joi.object({
        technical: joi.string().email(),
        business: joi.string().email(),
        legal: joi.string().email()
      }),
      
      // Compliance information
      compliance: joi.object({
        regulations: joi.array().items(joi.string()),
        certifications: joi.array().items(joi.string()),
        dataProtection: joi.string(),
        auditDate: joi.date().iso()
      })
    }));

    // Universal Process Step
    this.schemas.set('universalProcessStep', joi.object({
      stepId: joi.string().required(),
      stepName: joi.string().required(),
      stepType: joi.string().valid('validation', 'transformation', 'enrichment', 'notification', 'storage', 'external_call', 'decision'),
      
      input: joi.object(),
      output: joi.object(),
      
      configuration: joi.object({
        timeout: joi.number().integer().min(1).max(300).default(30), // seconds
        retries: joi.number().integer().min(0).max(5).default(3),
        required: joi.boolean().default(true),
        parallel: joi.boolean().default(false)
      }),
      
      validation: joi.object({
        schema: joi.string(),
        rules: joi.array().items(joi.string())
      }),
      
      metadata: joi.object({
        industry: joi.string(),
        ecosystem: joi.string(),
        version: joi.string(),
        description: joi.string()
      })
    }));

    // Universal Validation Result
    this.schemas.set('universalValidationResult', joi.object({
      valid: joi.boolean().required(),
      errors: joi.array().items(joi.object({
        field: joi.string(),
        code: joi.string(),
        message: joi.string(),
        severity: joi.string().valid('error', 'warning', 'info')
      })),
      warnings: joi.array().items(joi.string()),
      score: joi.number().min(0).max(1).description('Data quality score 0-1'),
      timestamp: joi.date().iso(),
      validator: joi.string()
    }));

    console.log(` Initialized ${this.schemas.size} universal schemas`);
  }

  /**
   * Get schema by name
   */
  getSchema(schemaName) {
    return this.schemas.get(schemaName);
  }

  /**
   * Register extension schema
   */
  registerExtensionSchema(extensionName, schemaName, schema) {
    const extensionKey = `${extensionName}:${schemaName}`;
    this.extensions.set(extensionKey, schema);
    console.log(` Registered extension schema: ${extensionKey}`);
  }

  /**
   * Get extension schema
   */
  getExtensionSchema(extensionName, schemaName) {
    const extensionKey = `${extensionName}:${schemaName}`;
    return this.extensions.get(extensionKey);
  }

  /**
   * Validate data against universal or extension schema
   */
  validate(data, schemaName, extensionName = null) {
    let schema;
    
    if (extensionName) {
      schema = this.getExtensionSchema(extensionName, schemaName);
      if (!schema) {
        schema = this.getSchema(schemaName);
      }
    } else {
      schema = this.getSchema(schemaName);
    }
    
    if (!schema) {
      return {
        valid: false,
        errors: [{
          field: 'schema',
          code: 'SCHEMA_NOT_FOUND',
          message: `Schema '${schemaName}' not found${extensionName ? ` for extension '${extensionName}'` : ''}`,
          severity: 'error'
        }]
      };
    }
    
    const { error, value } = schema.validate(data, { 
      abortEarly: false,
      allowUnknown: true, // Allow extension fields
      stripUnknown: false
    });
    
    if (error) {
      return {
        valid: false,
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          code: detail.type.toUpperCase(),
          message: detail.message,
          severity: 'error'
        })),
        value: undefined
      };
    }
    
    return {
      valid: true,
      errors: [],
      value,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create customer hash for privacy-preserving matching
   */
  generateCustomerHash(basicData) {
    const crypto = require('crypto');
    const hashInput = `${basicData.lastName}|${basicData.givenName}|${basicData.birthDate}|${basicData.nationality?.sort().join(',')}`;
    return crypto.createHash('sha256').update(hashInput, 'utf8').digest('hex');
  }

  /**
   * Transform industry-specific data to universal format
   */
  transformToUniversal(industryData, industryType, mapping = null) {
    // Basic transformation - can be extended by specific industry mappings
    const universal = {
      customerId: industryData.id || industryData.customerId,
      basicData: {
        lastName: industryData.lastName || industryData.surname,
        givenName: industryData.givenName || industryData.firstName,
        birthDate: industryData.birthDate || industryData.dateOfBirth,
        nationality: Array.isArray(industryData.nationality) ? industryData.nationality : [industryData.nationality],
        language: industryData.language || industryData.preferredLanguage
      },
      contactInformation: {
        primaryEmail: industryData.email || industryData.primaryEmail,
        mobilePhone: industryData.phone || industryData.mobilePhone,
        preferredContactMethod: industryData.contactMethod || 'email'
      },
      metadata: {
        originator: industryData.originator,
        industry: industryType,
        ecosystem: industryData.ecosystem,
        createdAt: industryData.createdAt || new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        version: '1.0',
        dataClassification: industryData.classification || 'confidential',
        verificationStatus: industryData.verified ? 'verified' : 'unverified'
      }
    };

    // Generate hash for privacy-preserving matching
    if (universal.basicData.lastName && universal.basicData.givenName && universal.basicData.birthDate) {
      universal.customerHash = this.generateCustomerHash(universal.basicData);
    }

    return universal;
  }

  /**
   * Get all available schemas
   */
  listSchemas() {
    return {
      universal: Array.from(this.schemas.keys()),
      extensions: Array.from(this.extensions.keys())
    };
  }

  async getHealthStatus() {
    return {
      status: 'healthy',
      schemas: {
        universal: this.schemas.size,
        extensions: this.extensions.size
      }
    };
  }
}

module.exports = DataModels;