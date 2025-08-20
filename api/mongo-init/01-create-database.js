/**
 * MongoDB Initialization Script - Database Creation
 * Swiss Open API Kundenbeziehung - Production Database Setup
 * 
 * This script runs during MongoDB container initialization to create
 * the database, collections, and necessary indexes for FAPI 2.0 compliance.
 */

// Switch to the application database
const dbName = 'openapi-kundenbeziehung';
db = db.getSiblingDB(dbName);

print('=== Swiss Open API Kundenbeziehung - Database Initialization ===');
print(`Initializing database: ${dbName}`);

// Create application user with appropriate permissions
db.createUser({
  user: 'api-service',
  pwd: process.env.MONGO_API_PASSWORD || 'api-service-password-change-in-production',
  roles: [
    {
      role: 'readWrite',
      db: dbName
    },
    {
      role: 'dbAdmin',
      db: dbName
    }
  ]
});

print('✓ Application service user created: api-service');

// Collections for core framework
const coreCollections = [
  'participants',      // Participant registry
  'trust_networks',    // Trust network relationships
  'processes',         // Process definitions and instances
  'consent_records',   // Consent management
  'data_schemas',      // Schema definitions
  'audit_logs',        // Security audit trail
  'extensions',        // Extension configurations
  'validations'        // Validation rules and results
];

// Collections for OAuth 2.1/OIDC/FAPI 2.0
const oauthCollections = [
  'oauth_clients',       // OAuth client registrations
  'oauth_codes',         // Authorization codes
  'oauth_tokens',        // Access and refresh tokens
  'oauth_consents',      // User consents
  'oauth_sessions',      // Authentication sessions
  'oauth_par_requests',  // PAR request storage
  'jwk_keys',           // JWT signing keys
  'dpop_nonces'         // DPoP proof nonces
];

// Collections for use case data
const useCaseCollections = [
  'customers',          // Customer data (UC1)
  'identifications',    // Identity verification data (UC2, UC3)
  'account_applications', // Account opening applications (UC1)
  'verification_requests', // Age verification requests (UC3)
  'evv_lifecycles',     // EVV lifecycle data (UC4)
  'documents',          // Document storage metadata
  'signatures',         // Digital signatures
  'compliance_reports'  // Compliance and audit reports
];

// Create all collections
[...coreCollections, ...oauthCollections, ...useCaseCollections].forEach(collectionName => {
  db.createCollection(collectionName);
  print(`✓ Collection created: ${collectionName}`);
});

print('\n=== Database Collections Created Successfully ===');
print(`Total collections: ${coreCollections.length + oauthCollections.length + useCaseCollections.length}`);
print('- Core framework collections: ' + coreCollections.length);
print('- OAuth/OIDC collections: ' + oauthCollections.length);
print('- Use case collections: ' + useCaseCollections.length);
print('\nNext: Running index creation script...');