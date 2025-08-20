# API Endpoint Design Implementation

Complete implementation of RESTful API endpoints and data models for the Swiss Open API Kundenbeziehung framework.

**Reference Document**: [04 API Endpoint Design.md](../../documentation/Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/04%20API%20Endpoint%20Design.md)

## OpenAPI Specification Implementation

### Complete API Documentation
**Implementation**: `/openapi.yaml`

The system provides comprehensive OpenAPI 3.0 specification with FAPI 2.0 extensions:

```yaml
openapi: 3.0.3
info:
  title: Swiss Open API Kundenbeziehung
  version: 1.0.0
  description: Standardized API for secure customer relationship management
  
security:
  - OAuth2:
      - customer:read
      - customer:write
      - consent:manage
      
paths:
  /v1/customer/check:
    post:
      summary: Customer existence verification
      security:
        - OAuth2: [customer:read]
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerCheckRequest'
      responses:
        '200':
          description: Customer verification result
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerCheckResponse'
```

## Core API Endpoints Implementation

### Customer Management Endpoints
**Implementation**: `/src/routes/customer.js`

Complete customer data management with privacy-preserving operations:

```javascript
class CustomerAPIController {
  // POST /v1/customer/check - Customer existence verification
  async checkCustomer(req, res) {
    const checkRequest = {
      sharedCustomerHash: req.body.sharedCustomerHash,
      basicData: req.body.basicData,
      requestingInstitution: req.authenticatedClient.clientId,
      purpose: req.body.purpose
    };
    
    const validationResult = await this.validateCheckRequest(checkRequest);
    if (!validationResult.valid) {
      return res.status(400).json({ error: 'invalid_request', details: validationResult.errors });
    }
    
    const customerExists = await customerService.checkCustomerExistence(checkRequest);
    
    securityAudit.logCustomerCheck(checkRequest, customerExists, req);
    
    res.json({
      match: customerExists.match,
      matchConfidence: customerExists.confidence,
      identificationDate: customerExists.identificationDate,
      levelOfAssurance: customerExists.levelOfAssurance,
      validUntil: customerExists.validUntil
    });
  }
  
  // POST /v1/customer/data - Secure customer data exchange
  async getCustomerData(req, res) {
    const dataRequest = {
      customerId: req.body.customerId,
      requestedFields: req.body.requestedFields,
      purpose: req.body.purpose,
      consentToken: req.body.consentToken,
      requestingInstitution: req.authenticatedClient.clientId
    };
    
    // Validate consent before data access
    const consentValidation = await consentService.validateDataAccess(dataRequest);
    if (!consentValidation.permitted) {
      return res.status(403).json({ 
        error: 'insufficient_consent',
        details: consentValidation.violations 
      });
    }
    
    const customerData = await customerService.getCustomerData(
      dataRequest, 
      consentValidation.allowedFields
    );
    
    res.json({
      customerId: dataRequest.customerId,
      data: customerData,
      consentId: consentValidation.consentId,
      dataCategories: consentValidation.allowedCategories
    });
  }
}
```

### Consent Management Endpoints  
**Implementation**: `/src/routes/consent.js`

Comprehensive consent lifecycle management:

```javascript
class ConsentAPIController {
  // POST /v1/consent/create - Create consent request
  async createConsent(req, res) {
    const consentRequest = {
      customerId: req.body.customerId,
      requestingInstitution: req.authenticatedClient.clientId,
      providingInstitution: req.body.providingInstitution,
      purpose: req.body.purpose,
      dataCategories: req.body.dataCategories,
      fieldLevelRequirements: req.body.fieldRequirements,
      expiryDate: req.body.expiryDate
    };
    
    const consent = await consentService.createConsentRequest(consentRequest);
    
    res.status(201).json({
      consentId: consent.id,
      status: consent.status,
      consentUrl: `${process.env.CONSENT_UI_BASE_URL}/consent/${consent.id}`,
      qrCode: generateConsentQRCode(consent.id),
      expiryDate: consent.expiryDate
    });
  }
  
  // GET /v1/consent/{consentId}/status - Check consent status
  async getConsentStatus(req, res) {
    const consentId = req.params.consentId;
    const consent = await consentService.getConsentStatus(consentId);
    
    res.json({
      consentId: consentId,
      status: consent.status,
      grantedAt: consent.grantedAt,
      expiresAt: consent.expiresAt,
      grantedFields: consent.grantedFields,
      restrictions: consent.restrictions
    });
  }
  
  // DELETE /v1/consent/{consentId} - Withdraw consent
  async withdrawConsent(req, res) {
    const consentId = req.params.consentId;
    const customerId = req.body.customerId;
    
    await consentService.withdrawConsent(consentId, customerId);
    
    res.status(204).end();
  }
}
```

### Identity Verification Endpoints
**Implementation**: `/src/routes/identification.js`

Multi-method identity verification with Level of Assurance:

```javascript
class IdentificationAPIController {
  // POST /v1/identification/verify - Identity verification
  async verifyIdentity(req, res) {
    const verificationRequest = {
      customerId: req.body.customerId,
      verificationMethods: req.body.methods,
      requiredLoA: req.body.requiredLevelOfAssurance,
      documents: req.body.documents,
      requestingInstitution: req.authenticatedClient.clientId
    };
    
    const verificationResult = await identificationService.verifyIdentity(verificationRequest);
    
    res.json({
      verificationId: verificationResult.id,
      status: verificationResult.status,
      levelOfAssurance: verificationResult.levelOfAssurance,
      verificationMethods: verificationResult.methodsUsed,
      validUntil: verificationResult.validUntil,
      verificationProvider: verificationResult.provider
    });
  }
  
  // GET /v1/identification/{verificationId}/result - Get verification result
  async getVerificationResult(req, res) {
    const verificationId = req.params.verificationId;
    const result = await identificationService.getVerificationResult(verificationId);
    
    res.json({
      verificationId: verificationId,
      status: result.status,
      levelOfAssurance: result.levelOfAssurance,
      completedAt: result.completedAt,
      validUntil: result.validUntil
    });
  }
}
```

## Data Models Implementation

### Universal Data Models
**Implementation**: `/src/core/models/index.js`

Industry-agnostic data models with extension support:

```javascript
const UniversalDataModels = {
  Customer: {
    // Basisdaten (Essential Core Data)
    basisdaten: {
      customerId: { type: String, required: true, encrypted: true },
      lastName: { type: String, required: true },
      givenName: { type: String, required: true },
      birthDate: { type: Date, required: true },
      nationality: { type: String, required: false },
      address: {
        street: String,
        city: String,
        postalCode: String,
        country: { type: String, default: 'CH' }
      }
    },
    
    // Erweiterte Daten (Enhanced Industry Data)
    erweiterteDaten: {
      banking: { type: Map, ref: 'BankingExtension' },
      insurance: { type: Map, ref: 'InsuranceExtension' },
      investment: { type: Map, ref: 'InvestmentExtension' }
    }
  },
  
  Consent: {
    id: { type: String, required: true, unique: true },
    customerId: { type: String, required: true, encrypted: true },
    requestingInstitution: { type: String, required: true },
    providingInstitution: { type: String, required: true },
    purpose: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'granted', 'denied', 'withdrawn', 'expired'],
      default: 'pending'
    },
    fieldLevelConsent: { type: Map },
    createdAt: { type: Date, default: Date.now },
    grantedAt: Date,
    expiresAt: Date,
    withdrawnAt: Date
  }
};
```

### Banking Extension Data Models
**Implementation**: `/src/extensions/banking/models.js`

Banking-specific data models with FINMA compliance:

```javascript
const BankingDataModels = {
  BankingCustomer: {
    accountInformation: {
      primaryAccountNumber: { type: String, encrypted: true },
      accountType: { type: String, enum: ['savings', 'checking', 'investment'] },
      accountStatus: { type: String, enum: ['active', 'suspended', 'closed'] },
      openingDate: Date,
      accountBalance: { type: Number, encrypted: true }
    },
    
    kycInformation: {
      riskProfile: { type: String, enum: ['low', 'medium', 'high'] },
      pepStatus: { type: Boolean, default: false },
      sanctionsCheck: {
        status: String,
        lastChecked: Date,
        result: String
      },
      sourceOfFunds: String,
      expectedTransactionVolume: Number
    },
    
    mifidInformation: {
      investorProfile: String,
      riskTolerance: String,
      investmentExperience: String,
      financialSituation: String,
      investmentObjectives: [String]
    }
  }
};
```

## Request/Response Validation

### Comprehensive Input Validation
**Implementation**: `/src/middleware/validation.js`

Multi-layer request validation with security checks:

```javascript
const { Joi } = require('joi');

const APIValidationSchemas = {
  customerCheckRequest: Joi.object({
    sharedCustomerHash: Joi.string().pattern(/^sha256:[a-fA-F0-9]{64}$/).required(),
    basicData: Joi.object({
      lastName: Joi.string().min(1).max(100).required(),
      givenName: Joi.string().min(1).max(100).required(),
      birthDate: Joi.date().iso().max('now').required()
    }).required(),
    purpose: Joi.string().valid('accountOpening', 'reidentification', 'ageVerification').required()
  }),
  
  consentRequest: Joi.object({
    customerId: Joi.string().pattern(/^[a-zA-Z0-9-_]{1,100}$/).required(),
    providingInstitution: Joi.string().pattern(/^CH-[A-Z]+-[0-9]+$/).required(),
    purpose: Joi.string().valid('accountOpening', 'dataPortability', 'creditAssessment').required(),
    dataCategories: Joi.array().items(
      Joi.string().valid('basicData', 'identification', 'financial', 'kyc')
    ).min(1).required(),
    expiryDate: Joi.date().iso().min('now').max(Joi.ref('$maxConsentDuration')).required()
  })
};

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });
    
    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        code: detail.type
      }));
      
      securityAudit.logValidationFailure(validationErrors, req);
      
      return res.status(400).json({
        error: 'validation_failed',
        details: validationErrors
      });
    }
    
    req.validatedBody = value;
    next();
  };
};
```

## Error Handling and Response Formatting

### Standardized Error Responses
**Implementation**: `/src/middleware/error-handler.js`

Consistent error handling with security-aware responses:

```javascript
class APIErrorHandler {
  handleError(error, req, res, next) {
    const errorResponse = this.formatErrorResponse(error);
    
    // Log error for monitoring
    logger.error('API Error', {
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      clientId: req.authenticatedClient?.clientId
    });
    
    // Security audit for sensitive errors
    if (this.isSecurityRelevantError(error)) {
      securityAudit.logSecurityError(error, req);
    }
    
    res.status(errorResponse.status).json(errorResponse.body);
  }
  
  formatErrorResponse(error) {
    switch (error.type) {
      case 'VALIDATION_ERROR':
        return {
          status: 400,
          body: {
            error: 'invalid_request',
            error_description: 'Request validation failed',
            details: error.details
          }
        };
        
      case 'CONSENT_ERROR':
        return {
          status: 403,
          body: {
            error: 'insufficient_consent',
            error_description: 'Valid consent required for this operation',
            consent_required: error.requiredConsent
          }
        };
        
      case 'AUTHENTICATION_ERROR':
        return {
          status: 401,
          body: {
            error: 'invalid_client',
            error_description: 'Client authentication failed'
          }
        };
        
      default:
        return {
          status: 500,
          body: {
            error: 'server_error',
            error_description: 'An internal error occurred'
          }
        };
    }
  }
}
```

## API Versioning and Compatibility

### Semantic Versioning Implementation
**Implementation**: `/src/routes/versioning.js`

Forward-compatible API versioning with deprecation management:

```javascript
class APIVersionManager {
  constructor() {
    this.supportedVersions = ['1.0', '1.1'];
    this.deprecatedVersions = [];
    this.currentVersion = '1.1';
  }
  
  versionMiddleware(req, res, next) {
    const requestedVersion = req.headers['api-version'] || '1.0';
    
    if (!this.supportedVersions.includes(requestedVersion)) {
      return res.status(400).json({
        error: 'unsupported_version',
        supported_versions: this.supportedVersions,
        requested_version: requestedVersion
      });
    }
    
    if (this.deprecatedVersions.includes(requestedVersion)) {
      res.set('Deprecation', 'true');
      res.set('Sunset', this.getDeprecationDate(requestedVersion));
    }
    
    req.apiVersion = requestedVersion;
    next();
  }
}
```

## Performance Optimization

### Response Caching and Compression
**Implementation**: Enhanced middleware stack

```javascript
const performanceMiddleware = [
  compression({ threshold: 1024 }), // Gzip compression
  helmet(), // Security headers
  rateLimit({ // Rate limiting
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // requests per window
    message: 'Too many requests'
  }),
  responseTime(), // Response time tracking
];
```

### Database Query Optimization
**Implementation**: Optimized data access patterns

```javascript
class OptimizedDataAccess {
  async getCustomerWithConsent(customerId, requestingInstitution) {
    // Use database indexes and query optimization
    return await this.database.query(`
      SELECT c.*, con.status as consent_status, con.granted_fields
      FROM customers c
      LEFT JOIN consents con ON c.id = con.customer_id 
        AND con.requesting_institution = ?
        AND con.status = 'granted'
        AND con.expires_at > NOW()
      WHERE c.id = ?
    `, [requestingInstitution, customerId]);
  }
}
```

## API Testing and Validation

### Contract Testing
**Implementation**: `/tests/integration/api/contract-validation.test.js`

OpenAPI specification compliance testing:

```javascript
describe('API Contract Validation', () => {
  it('should comply with OpenAPI specification', async () => {
    const response = await testClient
      .post('/v1/customer/check')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        sharedCustomerHash: 'sha256:' + 'a'.repeat(64),
        basicData: {
          lastName: 'Müller',
          givenName: 'Hans', 
          birthDate: '1985-03-15'
        },
        purpose: 'accountOpening'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchSchema(schemas.CustomerCheckResponse);
    expect(response.headers['content-type']).toContain('application/json');
  });
});
```

## Integration with Core Framework

### Universal Process Integration
API endpoints are fully integrated with the 10-step reference process:

```javascript
class ProcessIntegratedAPI {
  async handleCustomerDataRequest(req, res) {
    // Initiate universal reference process
    const processInstance = await referenzprozessOrchestrator.initiateProcess({
      customerId: req.body.customerId,
      processType: 'dataExchange',
      requestingInstitution: req.authenticatedClient.clientId
    });
    
    // Execute process steps with API context
    const result = await referenzprozessOrchestrator.executeProcess(processInstance);
    
    return res.json(result.customerData);
  }
}
```

For detailed background information and API design principles, see: [04 API Endpoint Design.md](../../documentation/Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/04%20API%20Endpoint%20Design.md)