/**
 * MongoDB Initialization Script - Seed Data
 * Swiss Open API Kundenbeziehung - Initial Data Setup
 * 
 * This script creates initial seed data for development and testing,
 * including participants, trust networks, and OAuth client configurations.
 */

// Switch to the application database
const dbName = 'openapi-kundenbeziehung';
db = db.getSiblingDB(dbName);

print('=== Seeding Initial Data for Development and Testing ===');

// Helper function to generate timestamp
const now = new Date();
const futureDate = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year from now

// 1. Seed Core Participants
print('\n1. Creating Core Participants...');

const coreParticipants = [
  {
    participantId: 'swiss-national-bank',
    name: 'Swiss National Bank',
    industry: 'central-banking',
    type: 'central-authority',
    status: 'active',
    certificateFingerprint: 'sha256:sample-snb-cert-fingerprint-12345',
    endpoints: {
      base: 'https://api.snb.ch',
      discovery: 'https://api.snb.ch/.well-known/openid-configuration',
      trust: 'https://api.snb.ch/v1/trust'
    },
    trustLevel: 'sovereign',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    metadata: {
      jurisdiction: 'CH',
      regulator: true,
      centralAuthority: true
    }
  },
  {
    participantId: 'finma-regulator',
    name: 'Swiss Financial Market Supervisory Authority FINMA',
    industry: 'regulation',
    type: 'regulator',
    status: 'active',
    certificateFingerprint: 'sha256:sample-finma-cert-fingerprint-67890',
    endpoints: {
      base: 'https://api.finma.ch',
      discovery: 'https://api.finma.ch/.well-known/openid-configuration',
      compliance: 'https://api.finma.ch/v1/compliance'
    },
    trustLevel: 'regulatory',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    metadata: {
      jurisdiction: 'CH',
      regulator: true,
      supervisory: true
    }
  },
  {
    participantId: 'demo-bank-001',
    name: 'Swiss Demo Bank AG',
    industry: 'banking',
    type: 'financial-institution',
    status: 'active',
    certificateFingerprint: 'sha256:sample-bank-cert-fingerprint-abc123',
    endpoints: {
      base: 'https://api.demo-bank.ch',
      discovery: 'https://api.demo-bank.ch/.well-known/openid-configuration',
      customer: 'https://api.demo-bank.ch/v1/customer',
      accounts: 'https://api.demo-bank.ch/v1/accounts'
    },
    trustLevel: 'institutional',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    metadata: {
      jurisdiction: 'CH',
      license: 'banking-license-001',
      services: ['account-opening', 'payments', 'lending']
    }
  },
  {
    participantId: 'demo-insurance-001',
    name: 'Swiss Demo Insurance Ltd',
    industry: 'insurance',
    type: 'insurance-company',
    status: 'active',
    certificateFingerprint: 'sha256:sample-insurance-cert-fingerprint-def456',
    endpoints: {
      base: 'https://api.demo-insurance.ch',
      discovery: 'https://api.demo-insurance.ch/.well-known/openid-configuration',
      policies: 'https://api.demo-insurance.ch/v1/policies',
      claims: 'https://api.demo-insurance.ch/v1/claims'
    },
    trustLevel: 'institutional',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    metadata: {
      jurisdiction: 'CH',
      license: 'insurance-license-001',
      services: ['life-insurance', 'property-insurance']
    }
  },
  {
    participantId: 'demo-government-001',
    name: 'Swiss Demo Government Services',
    industry: 'government',
    type: 'government-agency',
    status: 'active',
    certificateFingerprint: 'sha256:sample-gov-cert-fingerprint-ghi789',
    endpoints: {
      base: 'https://api.demo-gov.ch',
      discovery: 'https://api.demo-gov.ch/.well-known/openid-configuration',
      identity: 'https://api.demo-gov.ch/v1/identity',
      services: 'https://api.demo-gov.ch/v1/services'
    },
    trustLevel: 'governmental',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    metadata: {
      jurisdiction: 'CH',
      authority: 'federal',
      services: ['identity-verification', 'civil-registry']
    }
  }
];

db.participants.insertMany(coreParticipants);
print(`✓ Inserted ${coreParticipants.length} core participants`);

// 2. Seed Trust Networks
print('\n2. Creating Trust Networks...');

const trustNetworks = [
  {
    networkId: 'swiss-financial-network',
    name: 'Swiss Financial Services Trust Network',
    description: 'Primary trust network for Swiss financial institutions',
    participants: [
      'swiss-national-bank',
      'finma-regulator', 
      'demo-bank-001',
      'demo-insurance-001'
    ],
    trustLevel: 'high',
    status: 'active',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    governance: {
      operator: 'swiss-national-bank',
      rules: 'https://trust.snb.ch/rules/financial-network',
      compliance: 'FAPI-2.0'
    }
  },
  {
    networkId: 'swiss-government-network',
    name: 'Swiss Government Services Trust Network',
    description: 'Trust network for government and regulated entities',
    participants: [
      'swiss-national-bank',
      'finma-regulator',
      'demo-government-001'
    ],
    trustLevel: 'sovereign',
    status: 'active',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    governance: {
      operator: 'demo-government-001',
      rules: 'https://trust.gov.ch/rules/government-network',
      compliance: 'eIDAS'
    }
  },
  {
    networkId: 'demo-cross-sector-network',
    name: 'Demo Cross-Sector Trust Network',
    description: 'Multi-industry demo network for testing interoperability',
    participants: [
      'demo-bank-001',
      'demo-insurance-001',
      'demo-government-001'
    ],
    trustLevel: 'medium',
    status: 'active',
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate,
    governance: {
      operator: 'demo-bank-001',
      rules: 'https://demo.kundenbeziehung.ch/trust-rules',
      compliance: 'GDPR'
    }
  }
];

db.trust_networks.insertMany(trustNetworks);
print(`✓ Inserted ${trustNetworks.length} trust networks`);

// 3. Seed OAuth Clients
print('\n3. Creating OAuth Client Registrations...');

const oauthClients = [
  {
    client_id: 'banking-client-001',
    client_name: 'Swiss Demo Bank - Customer Onboarding',
    client_type: 'confidential',
    status: 'active',
    industry: 'banking',
    participant_id: 'demo-bank-001',
    redirect_uris: [
      'https://demo-bank.ch/callback',
      'https://demo-bank.ch/oauth/callback',
      'http://localhost:3001/callback'
    ],
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    scope: 'openid profile customer:read customer:write consent:manage account:read',
    token_endpoint_auth_method: 'private_key_jwt',
    require_pushed_authorization_requests: true,
    require_signed_request_object: true,
    certificate_thumbprint: 'sha256:banking-client-cert-thumbprint-001',
    jwks_uri: 'https://demo-bank.ch/.well-known/jwks.json',
    created_at: now,
    updated_at: now,
    expires_at: futureDate,
    metadata: {
      use_cases: ['UC1-account-opening'],
      compliance_level: 'FAPI-2.0',
      industry_extensions: ['banking-mvp']
    }
  },
  {
    client_id: 'insurance-client-001',
    client_name: 'Swiss Demo Insurance - Policy Management',
    client_type: 'confidential',
    status: 'active',
    industry: 'insurance',
    participant_id: 'demo-insurance-001',
    redirect_uris: [
      'https://demo-insurance.ch/callback',
      'https://demo-insurance.ch/oauth/callback'
    ],
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    scope: 'openid profile customer:read consent:manage identity:verify',
    token_endpoint_auth_method: 'private_key_jwt',
    require_pushed_authorization_requests: true,
    require_signed_request_object: true,
    certificate_thumbprint: 'sha256:insurance-client-cert-thumbprint-001',
    jwks_uri: 'https://demo-insurance.ch/.well-known/jwks.json',
    created_at: now,
    updated_at: now,
    expires_at: futureDate,
    metadata: {
      use_cases: ['UC2-reidentification', 'UC3-age-verification'],
      compliance_level: 'FAPI-2.0',
      industry_extensions: ['insurance']
    }
  },
  {
    client_id: 'government-client-001',
    client_name: 'Swiss Government Services - Identity Verification',
    client_type: 'confidential',
    status: 'active',
    industry: 'government',
    participant_id: 'demo-government-001',
    redirect_uris: [
      'https://demo-gov.ch/callback',
      'https://demo-gov.ch/oauth/callback'
    ],
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    scope: 'openid profile identity:verify identity:issue consent:manage',
    token_endpoint_auth_method: 'private_key_jwt',
    require_pushed_authorization_requests: true,
    require_signed_request_object: true,
    certificate_thumbprint: 'sha256:government-client-cert-thumbprint-001',
    jwks_uri: 'https://demo-gov.ch/.well-known/jwks.json',
    created_at: now,
    updated_at: now,
    expires_at: futureDate,
    metadata: {
      use_cases: ['UC2-reidentification', 'UC3-age-verification', 'UC4-evv-lifecycle'],
      compliance_level: 'eIDAS',
      industry_extensions: ['government']
    }
  }
];

db.oauth_clients.insertMany(oauthClients);
print(`✓ Inserted ${oauthClients.length} OAuth client registrations`);

// 4. Seed Data Schemas
print('\n4. Creating Data Schema Definitions...');

const dataSchemas = [
  {
    schemaId: 'customer-data-schema',
    version: '1.0.0',
    schemaType: 'customer-profile',
    industry: 'universal',
    status: 'active',
    schema: {
      type: 'object',
      properties: {
        customerId: { type: 'string', pattern: '^[a-zA-Z0-9-]{8,64}$' },
        sharedCustomerHash: { type: 'string', pattern: '^[a-f0-9]{64}$' },
        personalData: {
          type: 'object',
          properties: {
            firstName: { type: 'string', maxLength: 100 },
            lastName: { type: 'string', maxLength: 100 },
            dateOfBirth: { type: 'string', format: 'date' },
            nationality: { type: 'string', pattern: '^[A-Z]{2}$' }
          },
          required: ['firstName', 'lastName', 'dateOfBirth']
        }
      },
      required: ['customerId', 'personalData']
    },
    createdAt: now,
    validFrom: now,
    validUntil: futureDate
  },
  {
    schemaId: 'banking-account-application-schema',
    version: '1.0.0',
    schemaType: 'application-data',
    industry: 'banking',
    status: 'active',
    schema: {
      type: 'object',
      properties: {
        applicationId: { type: 'string' },
        accountType: { 
          type: 'string',
          enum: ['current', 'savings', 'business', 'investment']
        },
        initialDeposit: { type: 'number', minimum: 0 },
        riskProfile: {
          type: 'string',
          enum: ['conservative', 'moderate', 'aggressive']
        }
      },
      required: ['applicationId', 'accountType']
    },
    createdAt: now,
    validFrom: now,
    validUntil: futureDate
  }
];

db.data_schemas.insertMany(dataSchemas);
print(`✓ Inserted ${dataSchemas.length} data schema definitions`);

// 5. Seed Process Definitions
print('\n5. Creating Process Definitions...');

const processDefinitions = [
  {
    processId: 'referenzprozess-complete',
    instanceId: 'definition',
    processType: 'reference-process',
    name: 'Universal 10-Step Customer Onboarding Reference Process',
    status: 'active',
    version: '1.0.0',
    industry: 'universal',
    participantId: 'system',
    definition: {
      phases: [
        {
          phaseId: 'phase_1',
          name: 'Setup und Produktauswahl',
          steps: ['step_1_initialization', 'step_2_self_declaration']
        },
        {
          phaseId: 'phase_2',
          name: 'Datenerfassung',
          steps: ['step_3_data_collection', 'step_4_document_upload', 'step_5_additional_info']
        },
        {
          phaseId: 'phase_3',
          name: 'Verifikation und Compliance',
          steps: ['step_6_identity_verification', 'step_7_compliance_check']
        },
        {
          phaseId: 'phase_4',
          name: 'Vertragsabschluss',
          steps: ['step_8_contract_creation', 'step_9_signature', 'step_10_completion']
        }
      ]
    },
    createdAt: now,
    lastUpdated: now,
    validUntil: futureDate
  }
];

db.processes.insertMany(processDefinitions);
print(`✓ Inserted ${processDefinitions.length} process definitions`);

// 6. Create initial extension configurations
print('\n6. Creating Extension Configurations...');

const extensions = [
  {
    extensionId: 'banking-mvp-extension',
    name: 'Banking MVP Extension',
    type: 'industry',
    industry: 'banking',
    version: '1.0.0',
    status: 'active',
    configuration: {
      useCases: ['UC1-account-opening'],
      dataModels: ['customer-profile', 'account-application'],
      processes: ['account-opening-process'],
      validations: ['banking-kyc-validation', 'credit-assessment']
    },
    createdAt: now,
    lastUpdated: now
  },
  {
    extensionId: 'identity-verification-extension',
    name: 'Identity Verification Extension',
    type: 'service',
    industry: 'universal',
    version: '1.0.0',
    status: 'active',
    configuration: {
      useCases: ['UC2-reidentification', 'UC3-age-verification'],
      dataModels: ['identity-data', 'verification-result'],
      processes: ['identity-verification-process'],
      validations: ['identity-validation', 'age-threshold-check']
    },
    createdAt: now,
    lastUpdated: now
  }
];

db.extensions.insertMany(extensions);
print(`✓ Inserted ${extensions.length} extension configurations`);

// 7. Create sample audit log entry
print('\n7. Creating Sample Audit Log Entry...');

const sampleAuditLog = {
  auditId: `audit_${Date.now()}_sample`,
  timestamp: now,
  eventType: 'SYSTEM_INITIALIZATION',
  eventData: {
    action: 'database_seed',
    description: 'Initial seed data created during database initialization',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  },
  hash: 'sample-hash-for-integrity-verification'
};

db.audit_logs.insertOne(sampleAuditLog);
print('✓ Created sample audit log entry');

// Summary
print('\n=== Seed Data Creation Complete ===');
print('');
print('Database successfully seeded with:');
print(`• ${coreParticipants.length} core participants (banks, insurance, government, regulators)`);
print(`• ${trustNetworks.length} trust networks (financial, government, cross-sector)`);
print(`• ${oauthClients.length} OAuth client registrations (FAPI 2.0 compliant)`);
print(`• ${dataSchemas.length} data schema definitions (customer, banking)`);
print(`• ${processDefinitions.length} process definitions (10-step reference process)`);
print(`• ${extensions.length} extension configurations (banking MVP, identity verification)`);
print('• 1 sample audit log entry');
print('');
print('Ready for development and testing with:');
print('• Multi-industry participant registry');
print('• FAPI 2.0 compliant OAuth clients');
print('• Universal reference process definitions');
print('• Industry-specific extensions');
print('• Trust network relationships');
print('');
print('Next steps:');
print('1. Start the application server');
print('2. Test OAuth flows with seeded clients');
print('3. Run demo scripts to verify functionality');
print('4. Monitor audit logs for security compliance');