# Consent and Security Implementation

Complete implementation of FAPI 2.0 Advanced Profile security framework with comprehensive consent management for the Swiss Open API Kundenbeziehung.

**Reference Document**: [06 Consent und Security Flow.md](../../documentation/Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/06%20Consent%20und%20Security%20Flow.md)

## FAPI 2.0 Advanced Profile Implementation

### Complete OAuth 2.1/OIDC Authorization Server
**Implementation**: `/src/routes/oauth.js`

The system provides a fully compliant OAuth 2.1 authorization server with FAPI 2.0 enhancements:

```javascript
class FAPI20AuthorizationServer {
  constructor() {
    this.keyManager = new JWKSManager();
    this.parStorage = new PARStorageManager();
    this.clientRegistry = new DynamicClientRegistry();
    this.auditLogger = new SecurityAuditService();
  }

  // Pushed Authorization Requests (PAR) - Required by FAPI 2.0
  async handlePAR(req, res) {
    const parRequest = await this.validatePARRequest(req);
    const requestUri = await this.storePARRequest(parRequest);
    
    return {
      request_uri: requestUri,
      expires_in: 60 // PAR expires in 60 seconds
    };
  }

  // Authorization endpoint with PAR enforcement
  async handleAuthorizationRequest(req, res) {
    if (!req.query.request_uri) {
      throw new FAPI2Error('PAR required - request_uri missing');
    }
    
    const parData = await this.retrievePARRequest(req.query.request_uri);
    if (!parData || parData.expires < Date.now()) {
      throw new FAPI2Error('Invalid or expired request_uri');
    }
    
    return await this.processAuthorizationRequest(parData);
  }
}
```

### Enhanced Security Middleware Stack
**Implementation**: `/src/middleware/security.js`

Multi-layer security validation with FAPI 2.0 compliance checking:

```javascript
const fapi2SecurityStack = [
  enforceHTTPS,
  validateClientCertificate,  // mTLS validation
  validateDPoPProof,          // DPoP token binding
  auditSecurityContext,       // Security event logging
  validateFAPICompliance      // FAPI 2.0 requirement validation
];

// FAPI 2.0 Compliance Validator
const validateFAPICompliance = (req, res, next) => {
  const violations = [];
  
  // Check HTTPS enforcement
  if (!req.secure && process.env.NODE_ENV === 'production') {
    violations.push('HTTPS_REQUIRED');
  }
  
  // Validate mTLS for token endpoint
  if (req.path === '/token' && !req.client.authorized) {
    violations.push('MTLS_CLIENT_AUTH_REQUIRED');
  }
  
  // Check DPoP proof for protected resources
  if (req.path.startsWith('/v1/') && !req.dpop?.valid) {
    violations.push('DPOP_PROOF_REQUIRED');
  }
  
  if (violations.length > 0) {
    securityAudit.logFAPIViolation(violations, req);
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'FAPI 2.0 compliance violation',
      violations
    });
  }
  
  next();
};
```

## Advanced Authentication Mechanisms

### Mutual TLS (mTLS) Implementation
**Implementation**: `/src/middleware/mtls.js`

Complete mTLS implementation with certificate-bound authentication:

```javascript
class MTLSAuthenticator {
  validateClientCertificate(req, res, next) {
    const clientCert = req.connection.getPeerCertificate();
    
    if (!clientCert || !req.client.authorized) {
      return this.handleAuthenticationFailure('CLIENT_CERT_INVALID', req, res);
    }
    
    const certValidation = this.validateCertificateChain(clientCert);
    if (!certValidation.valid) {
      return this.handleAuthenticationFailure('CERT_CHAIN_INVALID', req, res);
    }
    
    const clientId = this.extractClientIdFromCertificate(clientCert);
    const registeredClient = await this.clientRegistry.getClient(clientId);
    
    if (!registeredClient || !this.verifyCertificateBinding(clientCert, registeredClient)) {
      return this.handleAuthenticationFailure('CLIENT_BINDING_FAILED', req, res);
    }
    
    req.authenticatedClient = {
      clientId,
      certificate: clientCert,
      authMethod: 'tls_client_auth'
    };
    
    securityAudit.logSuccessfulAuthentication('mTLS', clientId, req);
    next();
  }
}
```

### DPoP Token Binding Implementation
**Implementation**: `/src/middleware/auth.js`

Demonstration of Proof Key (DPoP) implementation for token binding:

```javascript
class DPoPValidator {
  async validateDPoPProof(req, res, next) {
    const dpopHeader = req.headers.dpop;
    const accessToken = this.extractAccessToken(req);
    
    if (!dpopHeader) {
      return this.handleDPoPError('DPOP_HEADER_MISSING', res);
    }
    
    try {
      const dpopProof = await this.verifyDPoPJWT(dpopHeader);
      const tokenBinding = await this.validateTokenBinding(accessToken, dpopProof);
      
      if (!tokenBinding.valid) {
        return this.handleDPoPError('TOKEN_BINDING_INVALID', res);
      }
      
      req.dpop = {
        valid: true,
        proof: dpopProof,
        binding: tokenBinding
      };
      
      securityAudit.logDPoPValidation(dpopProof.jti, req);
      next();
      
    } catch (error) {
      securityAudit.logDPoPFailure(error, req);
      return this.handleDPoPError('DPOP_VALIDATION_FAILED', res);
    }
  }
}
```

## Comprehensive Consent Management System

### Granular Consent Framework
**Implementation**: `/src/core/consent/index.js`

Privacy-by-design consent management with field-level granularity:

```javascript
class GranularConsentManager {
  async createConsentRequest(requestDetails) {
    const consentRequest = {
      id: generateConsentId(),
      requestingInstitution: requestDetails.requestingInstitution,
      providingInstitution: requestDetails.providingInstitution,
      customerId: requestDetails.customerId,
      purpose: requestDetails.purpose,
      dataCategories: requestDetails.dataCategories,
      fieldLevelConsent: this.generateFieldLevelConsentMatrix(requestDetails),
      expiryDate: this.calculateConsentExpiry(requestDetails.purpose),
      legalBasis: this.determineLegalBasis(requestDetails),
      withdrawalMechanism: this.createWithdrawalMechanism(),
      status: 'pending'
    };
    
    await this.auditTrail.logConsentRequest(consentRequest);
    return consentRequest;
  }
  
  generateFieldLevelConsentMatrix(requestDetails) {
    return {
      basicData: {
        lastName: { required: true, consented: null },
        givenName: { required: true, consented: null },
        birthDate: { required: true, consented: null },
        address: { required: false, consented: null }
      },
      identificationData: {
        idNumber: { required: true, consented: null },
        idType: { required: true, consented: null },
        issuingAuthority: { required: false, consented: null }
      },
      financialData: {
        accountNumbers: { required: false, consented: null },
        transactionHistory: { required: false, consented: null },
        creditScore: { required: false, consented: null }
      }
    };
  }
}
```

### Real-Time Consent Enforcement
**Implementation**: `/src/services/consentService.js`

Dynamic consent validation for all data access operations:

```javascript
class ConsentEnforcementService {
  async validateDataAccess(accessRequest) {
    const consent = await this.getActiveConsent(
      accessRequest.customerId, 
      accessRequest.requestingInstitution
    );
    
    if (!consent || consent.status !== 'granted') {
      throw new ConsentError('NO_VALID_CONSENT', accessRequest);
    }
    
    if (this.hasConsentExpired(consent)) {
      await this.invalidateConsent(consent.id);
      throw new ConsentError('CONSENT_EXPIRED', accessRequest);
    }
    
    const fieldAccess = this.validateFieldLevelAccess(
      accessRequest.requestedFields, 
      consent.fieldLevelConsent
    );
    
    if (fieldAccess.violations.length > 0) {
      securityAudit.logConsentViolation(fieldAccess.violations, accessRequest);
      throw new ConsentError('FIELD_ACCESS_DENIED', fieldAccess.violations);
    }
    
    await this.auditTrail.logDataAccess(accessRequest, consent);
    return {
      permitted: true,
      allowedFields: fieldAccess.allowedFields,
      consentId: consent.id
    };
  }
}
```

## Advanced Security Features

### Security Audit and Monitoring System
**Implementation**: `/src/services/securityAuditService.js`

Comprehensive security monitoring with real-time threat detection:

```javascript
class SecurityAuditService {
  constructor() {
    this.auditLog = new AuditLogger();
    this.threatDetector = new ThreatDetectionEngine();
    this.alertManager = new SecurityAlertManager();
    this.metrics = new SecurityMetricsCollector();
  }
  
  async logSecurityEvent(eventType, eventData, requestContext) {
    const auditEntry = {
      eventId: generateEventId(),
      eventType,
      timestamp: new Date().toISOString(),
      sourceIP: requestContext.ip,
      userAgent: requestContext.headers['user-agent'],
      sessionId: requestContext.sessionId,
      eventData: this.sanitizeEventData(eventData),
      riskScore: await this.calculateRiskScore(eventType, eventData, requestContext)
    };
    
    await this.auditLog.persist(auditEntry);
    await this.threatDetector.analyze(auditEntry);
    
    if (auditEntry.riskScore > CRITICAL_RISK_THRESHOLD) {
      await this.alertManager.triggerCriticalAlert(auditEntry);
    }
    
    this.metrics.recordSecurityEvent(auditEntry);
  }
  
  async detectAnomalousActivity(requestContext) {
    const activityPattern = await this.buildActivityPattern(requestContext);
    const anomalyScore = await this.threatDetector.scoreAnomaly(activityPattern);
    
    if (anomalyScore > ANOMALY_THRESHOLD) {
      return {
        anomalyDetected: true,
        score: anomalyScore,
        recommendedAction: this.getRecommendedSecurityAction(anomalyScore)
      };
    }
    
    return { anomalyDetected: false };
  }
}
```

### JWT Key Management with Automatic Rotation
**Implementation**: `/src/routes/jwks.js`

Enterprise-grade key management with automatic rotation:

```javascript
class JWKSManager {
  constructor() {
    this.keys = new Map();
    this.currentKeyId = null;
    this.rotationScheduler = new KeyRotationScheduler();
    this.keyBackup = new SecureKeyBackup();
  }
  
  async rotateKeys() {
    logger.info('Initiating JWT key rotation...');
    
    // Generate new key pair with strong cryptography
    const keyPair = await generateKeyPair('PS256', { 
      modulusLength: 4096,
      publicExponent: 65537
    });
    
    const keyId = generateSecureKeyId();
    
    // Export public key as JWK with FAPI 2.0 compliant parameters
    const publicJWK = await exportJWK(keyPair.publicKey);
    publicJWK.kid = keyId;
    publicJWK.use = 'sig';
    publicJWK.alg = 'PS256';
    publicJWK.key_ops = ['verify'];
    
    // Store key pair securely
    this.keys.set(keyId, {
      keyPair,
      publicJWK,
      createdAt: new Date(),
      status: 'active'
    });
    
    // Update current key
    this.deprecateOldKeys();
    this.currentKeyId = keyId;
    
    // Backup keys securely
    await this.keyBackup.backupKey(keyId, keyPair);
    
    // Audit key rotation
    securityAudit.logKeyRotation(keyId, this.keys.size);
    
    logger.info('JWT key rotation completed successfully', { keyId });
  }
  
  getJWKSet() {
    const activeKeys = Array.from(this.keys.values())
      .filter(key => key.status === 'active')
      .map(key => key.publicJWK);
    
    return {
      keys: activeKeys
    };
  }
}
```

## Privacy-Preserving Features

### Zero-Knowledge Age Verification
**Implementation**: (UC3 Age Verification)

Privacy-preserving attribute verification without identity disclosure:

```javascript
class ZeroKnowledgeAgeVerifier {
  async verifyAge(customerId, requiredMinimumAge, institutionId) {
    // Generate zero-knowledge proof for age verification
    const ageProofRequest = {
      customerId: this.hashCustomerId(customerId),
      minimumAge: requiredMinimumAge,
      requestingInstitution: institutionId,
      proofType: 'zero_knowledge_age',
      noIdentityDisclosure: true
    };
    
    const ageProof = await this.generateAgeProof(ageProofRequest);
    
    return {
      ageRequirementMet: ageProof.result,
      actualAge: null,           // Never disclosed
      identityRevealed: false,   // Privacy-preserving
      proofValidation: ageProof.validation,
      privacyCompliant: true
    };
  }
}
```

### Selective Data Disclosure
**Implementation**: `/src/core/models/index.js`

Privacy-by-design data models with selective field disclosure:

```javascript
class PrivacyPreservingDataModel {
  constructor(fullDataset, consentMatrix) {
    this.fullData = fullDataset;
    this.consent = consentMatrix;
    this.disclosureLog = new DataDisclosureLogger();
  }
  
  generateSelectiveDisclosure(requestedFields, purpose) {
    const disclosureResult = {
      disclosedFields: {},
      hiddenFields: [],
      privacyScore: 100 // Start with maximum privacy
    };
    
    for (const field of requestedFields) {
      if (this.isFieldConsentGranted(field) && this.isFieldNecessaryForPurpose(field, purpose)) {
        disclosureResult.disclosedFields[field] = this.fullData[field];
        disclosureResult.privacyScore -= this.getPrivacySensitivityScore(field);
      } else {
        disclosureResult.hiddenFields.push(field);
      }
    }
    
    this.disclosureLog.logDisclosure(disclosureResult, purpose);
    return disclosureResult;
  }
}
```

## GDPR and Swiss DPA Compliance

### Automated Compliance Validation
**Implementation**: `/src/core/validation/gdpr-compliance.js`

Comprehensive GDPR compliance validation:

```javascript
class GDPRComplianceValidator {
  validateDataProcessing(processingActivity) {
    const complianceResult = {
      compliant: true,
      violations: [],
      recommendations: []
    };
    
    // Article 5 - Principles of processing personal data
    const principlesCheck = this.validateProcessingPrinciples(processingActivity);
    if (!principlesCheck.compliant) {
      complianceResult.violations.push(...principlesCheck.violations);
    }
    
    // Article 6 - Lawfulness of processing
    const lawfulnessCheck = this.validateLawfulBasis(processingActivity);
    if (!lawfulnessCheck.compliant) {
      complianceResult.violations.push(...lawfulnessCheck.violations);
    }
    
    // Article 7 - Conditions for consent
    const consentCheck = this.validateConsentConditions(processingActivity);
    if (!consentCheck.compliant) {
      complianceResult.violations.push(...consentCheck.violations);
    }
    
    // Data minimization principle validation
    const minimizationCheck = this.validateDataMinimization(processingActivity);
    if (!minimizationCheck.compliant) {
      complianceResult.violations.push(...minimizationCheck.violations);
    }
    
    complianceResult.compliant = complianceResult.violations.length === 0;
    return complianceResult;
  }
}
```

## Security Dashboard and Monitoring

### Real-Time Security Dashboard
**Implementation**: `/src/routes/security-dashboard.js`

Comprehensive security monitoring with real-time metrics:

```javascript
class SecurityDashboard {
  async getSecurityMetrics() {
    return {
      authentication: {
        totalAttempts: await this.getAuthenticationAttempts(),
        successRate: await this.getAuthenticationSuccessRate(),
        failedAttempts: await this.getFailedAuthenticationAttempts(),
        mtlsUsage: await this.getMTLSUsageMetrics(),
        dpopUsage: await this.getDPoPUsageMetrics()
      },
      
      consent: {
        activeConsents: await this.getActiveConsentCount(),
        consentRequests: await this.getConsentRequestMetrics(),
        withdrawals: await this.getConsentWithdrawalMetrics(),
        violations: await this.getConsentViolationMetrics()
      },
      
      compliance: {
        fapiCompliance: await this.getFAPIComplianceScore(),
        gdprCompliance: await this.getGDPRComplianceScore(),
        auditTrailIntegrity: await this.getAuditTrailIntegrity(),
        dataMinimizationScore: await this.getDataMinimizationScore()
      },
      
      threats: {
        detectedAnomalies: await this.getAnomalyDetectionMetrics(),
        securityIncidents: await this.getSecurityIncidentMetrics(),
        riskScore: await this.calculateOverallRiskScore(),
        activeAlerts: await this.getActiveSecurityAlerts()
      }
    };
  }
}
```

## Integration Testing and Validation

### FAPI 2.0 Compliance Testing
**Implementation**: `/tests/integration/security/fapi-compliance.test.js`

Comprehensive FAPI 2.0 compliance validation:

```javascript
describe('FAPI 2.0 Compliance Testing', () => {
  it('should enforce PAR for authorization requests', async () => {
    const authRequest = testUtils.createAuthorizationRequest();
    delete authRequest.request_uri; // Remove PAR requirement
    
    const response = await testClient.get('/authorize').query(authRequest);
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('invalid_request');
    expect(response.body.error_description).toContain('PAR required');
  });
  
  it('should validate mTLS for token endpoint', async () => {
    const tokenRequest = testUtils.createTokenRequest();
    
    const response = await testClient
      .post('/token')
      .type('form')
      .send(tokenRequest);
      // No client certificate provided
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid_client');
  });
  
  it('should validate DPoP proofs for protected resources', async () => {
    const accessToken = await testUtils.generateAccessToken();
    
    const response = await testClient
      .get('/v1/customer/data')
      .set('Authorization', `DPoP ${accessToken}`);
      // No DPoP proof provided
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid_dpop_proof');
  });
});
```

## Demonstration and Use Cases

### Consent Security Flow Demo
**Location**: `/demo/consent_security/consent-flow-demo.js`

Interactive demonstration of the complete consent and security flow:
- FAPI 2.0 Advanced Profile authentication flow
- Granular consent management with field-level permissions
- Real-time consent enforcement and validation
- Security monitoring and incident detection

### Integration with Use Cases
- **UC1**: Secure banking account opening with full consent management
- **UC2**: Privacy-preserving re-identification with trust network security
- **UC3**: Zero-knowledge age verification without identity disclosure
- **UC4**: Secure EVV lifecycle management with MiFID II compliance

## Future Security Enhancements

### Planned Improvements (Q2-Q3 2025)
- **Quantum-Ready Cryptography**: Post-quantum algorithm preparation
- **Advanced Threat Detection**: AI-powered anomaly detection
- **Zero-Trust Architecture**: Complete zero-trust network implementation
- **Biometric Integration**: Enhanced authentication with biometric factors

### International Standards Preparation
- **eIDAS Integration**: European digital identity framework
- **PSD3 Compliance**: Next-generation payment services directive
- **Global FAPI Interoperability**: Cross-border financial API standards

For detailed background information and security specifications, see: [06 Consent und Security Flow.md](../../documentation/Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/06%20Consent%20und%20Security%20Flow.md)