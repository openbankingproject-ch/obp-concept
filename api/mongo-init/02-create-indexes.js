/**
 * MongoDB Initialization Script - Index Creation
 * Swiss Open API Kundenbeziehung - Performance and Compliance Indexes
 * 
 * This script creates necessary indexes for optimal performance and
 * FAPI 2.0 compliance requirements including audit trails and fast lookups.
 */

// Switch to the application database
const dbName = 'openapi-kundenbeziehung';
db = db.getSiblingDB(dbName);

print('=== Creating Database Indexes for Performance and Compliance ===');

// Core Framework Indexes
print('\n1. Creating Core Framework Indexes...');

// Participants - multi-industry participant registry
db.participants.createIndex({ "participantId": 1 }, { unique: true });
db.participants.createIndex({ "industry": 1, "status": 1 });
db.participants.createIndex({ "certificateFingerprint": 1 }, { sparse: true });
db.participants.createIndex({ "createdAt": 1 });
db.participants.createIndex({ "lastUpdated": 1 });
print('✓ Participants collection indexes created');

// Trust Networks - relationship management
db.trust_networks.createIndex({ "networkId": 1 }, { unique: true });
db.trust_networks.createIndex({ "participants": 1 });
db.trust_networks.createIndex({ "trustLevel": 1 });
db.trust_networks.createIndex({ "status": 1, "validUntil": 1 });
print('✓ Trust networks collection indexes created');

// Processes - orchestration engine
db.processes.createIndex({ "processId": 1, "instanceId": 1 }, { unique: true });
db.processes.createIndex({ "processType": 1, "status": 1 });
db.processes.createIndex({ "participantId": 1, "status": 1 });
db.processes.createIndex({ "createdAt": 1 });
db.processes.createIndex({ "lastUpdated": 1 });
db.processes.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 }); // TTL index
print('✓ Processes collection indexes created');

// Consent Records - privacy compliance
db.consent_records.createIndex({ "consentId": 1 }, { unique: true });
db.consent_records.createIndex({ "userId": 1, "status": 1 });
db.consent_records.createIndex({ "clientId": 1 });
db.consent_records.createIndex({ "purpose": 1 });
db.consent_records.createIndex({ "dataCategories": 1 });
db.consent_records.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
db.consent_records.createIndex({ "createdAt": 1 });
print('✓ Consent records collection indexes created');

// Data Schemas - schema registry
db.data_schemas.createIndex({ "schemaId": 1, "version": 1 }, { unique: true });
db.data_schemas.createIndex({ "schemaType": 1, "status": 1 });
db.data_schemas.createIndex({ "industry": 1 });
db.data_schemas.createIndex({ "createdAt": 1 });
print('✓ Data schemas collection indexes created');

// Audit Logs - security compliance (FAPI 2.0 requirement)
db.audit_logs.createIndex({ "auditId": 1 }, { unique: true });
db.audit_logs.createIndex({ "eventType": 1, "timestamp": 1 });
db.audit_logs.createIndex({ "userId": 1, "timestamp": 1 });
db.audit_logs.createIndex({ "clientId": 1, "timestamp": 1 });
db.audit_logs.createIndex({ "ip": 1, "timestamp": 1 });
db.audit_logs.createIndex({ "severity": 1, "timestamp": 1 });
db.audit_logs.createIndex({ "timestamp": 1 }, { expireAfterSeconds: 7776000 }); // 90 days retention
print('✓ Audit logs collection indexes created (90-day TTL)');

// Extensions - extension registry
db.extensions.createIndex({ "extensionId": 1 }, { unique: true });
db.extensions.createIndex({ "type": 1, "status": 1 });
db.extensions.createIndex({ "industry": 1 });
print('✓ Extensions collection indexes created');

// Validations - validation results
db.validations.createIndex({ "validationId": 1 }, { unique: true });
db.validations.createIndex({ "processId": 1, "step": 1 });
db.validations.createIndex({ "status": 1, "timestamp": 1 });
db.validations.createIndex({ "timestamp": 1 }, { expireAfterSeconds: 2592000 }); // 30 days retention
print('✓ Validations collection indexes created (30-day TTL)');

// OAuth 2.1/OIDC/FAPI 2.0 Indexes
print('\n2. Creating OAuth/OIDC/FAPI 2.0 Indexes...');

// OAuth Clients - client registry
db.oauth_clients.createIndex({ "client_id": 1 }, { unique: true });
db.oauth_clients.createIndex({ "client_name": 1 });
db.oauth_clients.createIndex({ "status": 1 });
db.oauth_clients.createIndex({ "created_at": 1 });
db.oauth_clients.createIndex({ "certificate_thumbprint": 1 }, { sparse: true });
print('✓ OAuth clients collection indexes created');

// Authorization Codes - short-lived codes
db.oauth_codes.createIndex({ "code": 1 }, { unique: true });
db.oauth_codes.createIndex({ "client_id": 1 });
db.oauth_codes.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 });
print('✓ OAuth codes collection indexes created (TTL)');

// OAuth Tokens - access and refresh tokens
db.oauth_tokens.createIndex({ "token_id": 1 }, { unique: true });
db.oauth_tokens.createIndex({ "client_id": 1, "user_id": 1 });
db.oauth_tokens.createIndex({ "token_type": 1, "status": 1 });
db.oauth_tokens.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 });
db.oauth_tokens.createIndex({ "dpop_jwk_thumbprint": 1 }, { sparse: true });
print('✓ OAuth tokens collection indexes created (TTL)');

// OAuth Consents - user authorization records
db.oauth_consents.createIndex({ "consent_id": 1 }, { unique: true });
db.oauth_consents.createIndex({ "user_id": 1, "client_id": 1 });
db.oauth_consents.createIndex({ "scope": 1 });
db.oauth_consents.createIndex({ "status": 1, "created_at": 1 });
print('✓ OAuth consents collection indexes created');

// OAuth Sessions - authentication sessions
db.oauth_sessions.createIndex({ "session_id": 1 }, { unique: true });
db.oauth_sessions.createIndex({ "user_id": 1 });
db.oauth_sessions.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 });
print('✓ OAuth sessions collection indexes created (TTL)');

// PAR Requests - Pushed Authorization Request storage
db.oauth_par_requests.createIndex({ "request_uri": 1 }, { unique: true });
db.oauth_par_requests.createIndex({ "client_id": 1 });
db.oauth_par_requests.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 });
print('✓ OAuth PAR requests collection indexes created (TTL)');

// JWK Keys - JWT signing key management
db.jwk_keys.createIndex({ "kid": 1 }, { unique: true });
db.jwk_keys.createIndex({ "use": 1, "status": 1 });
db.jwk_keys.createIndex({ "created_at": 1 });
print('✓ JWK keys collection indexes created');

// DPoP Nonces - replay protection
db.dpop_nonces.createIndex({ "nonce": 1 }, { unique: true });
db.dpop_nonces.createIndex({ "client_id": 1 });
db.dpop_nonces.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 });
print('✓ DPoP nonces collection indexes created (TTL)');

// Use Case Specific Indexes
print('\n3. Creating Use Case Specific Indexes...');

// Customers - UC1 Banking Account Opening
db.customers.createIndex({ "customerId": 1 }, { unique: true });
db.customers.createIndex({ "sharedCustomerHash": 1 }, { unique: true, sparse: true });
db.customers.createIndex({ "status": 1 });
db.customers.createIndex({ "bankId": 1, "status": 1 });
db.customers.createIndex({ "createdAt": 1 });
db.customers.createIndex({ "lastUpdated": 1 });
print('✓ Customers collection indexes created');

// Identifications - UC2 Re-identification, UC3 Age Verification
db.identifications.createIndex({ "identificationId": 1 }, { unique: true });
db.identifications.createIndex({ "customerId": 1 });
db.identifications.createIndex({ "verificationType": 1, "status": 1 });
db.identifications.createIndex({ "identityHash": 1 }, { sparse: true });
db.identifications.createIndex({ "createdAt": 1 });
print('✓ Identifications collection indexes created');

// Account Applications - UC1 specific data
db.account_applications.createIndex({ "applicationId": 1 }, { unique: true });
db.account_applications.createIndex({ "customerId": 1 });
db.account_applications.createIndex({ "bankId": 1, "status": 1 });
db.account_applications.createIndex({ "applicationDate": 1 });
db.account_applications.createIndex({ "status": 1, "lastUpdated": 1 });
print('✓ Account applications collection indexes created');

// Verification Requests - UC3 Age Verification
db.verification_requests.createIndex({ "verificationId": 1 }, { unique: true });
db.verification_requests.createIndex({ "requesterId": 1 });
db.verification_requests.createIndex({ "verificationType": 1, "status": 1 });
db.verification_requests.createIndex({ "ageThreshold": 1 });
db.verification_requests.createIndex({ "createdAt": 1 });
print('✓ Verification requests collection indexes created');

// EVV Lifecycles - UC4 EVV Lifecycle Management
db.evv_lifecycles.createIndex({ "evvId": 1 }, { unique: true });
db.evv_lifecycles.createIndex({ "customerId": 1 });
db.evv_lifecycles.createIndex({ "status": 1, "phase": 1 });
db.evv_lifecycles.createIndex({ "providerId": 1 });
db.evv_lifecycles.createIndex({ "createdAt": 1 });
print('✓ EVV lifecycles collection indexes created');

// Documents - document metadata storage
db.documents.createIndex({ "documentId": 1 }, { unique: true });
db.documents.createIndex({ "customerId": 1, "documentType": 1 });
db.documents.createIndex({ "processId": 1 });
db.documents.createIndex({ "hash": 1 }, { unique: true });
db.documents.createIndex({ "createdAt": 1 });
db.documents.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0, sparse: true });
print('✓ Documents collection indexes created');

// Signatures - digital signature tracking
db.signatures.createIndex({ "signatureId": 1 }, { unique: true });
db.signatures.createIndex({ "documentId": 1 });
db.signatures.createIndex({ "signerId": 1 });
db.signatures.createIndex({ "signatureType": 1, "status": 1 });
db.signatures.createIndex({ "createdAt": 1 });
print('✓ Signatures collection indexes created');

// Compliance Reports - regulatory reporting
db.compliance_reports.createIndex({ "reportId": 1 }, { unique: true });
db.compliance_reports.createIndex({ "reportType": 1, "period": 1 });
db.compliance_reports.createIndex({ "generatedAt": 1 });
db.compliance_reports.createIndex({ "status": 1 });
print('✓ Compliance reports collection indexes created');

// Summary and Performance Notes
print('\n=== Index Creation Complete ===');
print('Performance optimizations implemented:');
print('• Unique indexes for primary identifiers');
print('• Compound indexes for common query patterns');
print('• TTL indexes for automatic cleanup of expired data');
print('• Sparse indexes for optional fields');
print('• Time-based indexes for audit trails and reporting');
print('');
print('FAPI 2.0 Compliance indexes:');
print('• Audit log indexes for security monitoring');
print('• Client certificate thumbprint indexes');
print('• DPoP nonce indexes for replay protection');
print('• Token binding and expiration tracking');
print('');
print('Data retention policies (TTL indexes):');
print('• Process instances: expire based on expiresAt field');
print('• Consent records: expire based on expiresAt field');
print('• Audit logs: 90 days retention');
print('• Validation results: 30 days retention');
print('• OAuth codes: expire based on expires_at field');
print('• OAuth tokens: expire based on expires_at field');
print('• OAuth sessions: expire based on expires_at field');
print('• PAR requests: expire based on expires_at field');
print('• DPoP nonces: expire based on expires_at field');
print('• Documents: expire based on expiresAt field (if set)');
print('');
print('Database initialization complete. Ready for production use.');