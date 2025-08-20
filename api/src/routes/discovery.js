const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();

// Configuration
const ISSUER = process.env.ISSUER || process.env.BASE_URL || 'https://api.kundenbeziehung.ch';

/**
 * GET /.well-known/openid-configuration - OpenID Connect Discovery
 */
router.get('/openid-configuration', (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const discoveryDocument = {
      issuer: ISSUER,
      authorization_endpoint: `${baseUrl}/authorize`,
      token_endpoint: `${baseUrl}/token`,
      userinfo_endpoint: `${baseUrl}/userinfo`,
      introspection_endpoint: `${baseUrl}/introspect`,
      jwks_uri: `${baseUrl}/.well-known/jwks.json`,
      pushed_authorization_request_endpoint: `${baseUrl}/par`,
      
      // Supported response types and modes
      response_types_supported: ['code'],
      response_modes_supported: ['query', 'fragment'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      
      // Subject identifier types
      subject_types_supported: ['public'],
      
      // Supported scopes
      scopes_supported: [
        'openid',
        'profile',
        'email',
        'customer:read',
        'customer:write',
        'consent:manage',
        'identification:read',
        'checks:execute',
        'signature:create'
      ],
      
      // Token endpoint authentication methods
      token_endpoint_auth_methods_supported: [
        'private_key_jwt',
        'tls_client_auth'
      ],
      token_endpoint_auth_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      
      // ID Token signing algorithms
      id_token_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      
      // Request object support
      request_object_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      request_parameter_supported: true,
      request_uri_parameter_supported: true,
      require_request_uri_registration: false,
      
      // Claims
      claims_supported: [
        'sub',
        'iss',
        'aud',
        'exp',
        'iat',
        'auth_time',
        'nonce',
        'name',
        'given_name',
        'family_name',
        'preferred_username',
        'email',
        'email_verified',
        'institution_id'
      ],
      claim_types_supported: ['normal'],
      
      // PKCE support
      code_challenge_methods_supported: ['S256'],
      
      // DPoP support
      dpop_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      
      // FAPI specific
      require_pushed_authorization_requests: true,
      require_signed_request_object: false,
      
      // Additional metadata
      service_documentation: `${baseUrl}/docs`,
      ui_locales_supported: ['de-CH', 'en-US'],
      op_policy_uri: `${baseUrl}/privacy-policy`,
      op_tos_uri: `${baseUrl}/terms-of-service`
    };

    logger.debug('OIDC discovery document served', {
      issuer: ISSUER,
      baseUrl
    });

    res.json(discoveryDocument);

  } catch (error) {
    logger.error('OIDC discovery failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to generate discovery document'
    });
  }
});

/**
 * GET /.well-known/fapi-configuration - FAPI Configuration
 */
router.get('/fapi-configuration', (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const fapiConfiguration = {
      issuer: ISSUER,
      
      // FAPI 2.0 Security Profile compliance
      fapi_profile: '2.0',
      fapi_security_profile: 'baseline',
      fapi_compliance_level: 'full',
      
      // Required FAPI 2.0 features
      require_pushed_authorization_requests: true,
      require_signed_request_object: false, // Optional for baseline profile
      require_request_uri_registration: false,
      
      // Client authentication
      token_endpoint_auth_methods_supported: [
        'private_key_jwt',
        'tls_client_auth'
      ],
      tls_client_certificate_bound_access_tokens: true,
      
      // DPoP (Demonstrating Proof-of-Possession)
      dpop_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      
      // Token binding
      token_binding_methods_supported: [
        'mTLS',
        'DPoP'
      ],
      
      // Algorithms (restricted to FAPI 2.0 approved)
      id_token_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      request_object_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      token_endpoint_auth_signing_alg_values_supported: [
        'PS256',
        'ES256',
        'EdDSA'
      ],
      
      // Security features
      require_pkce: true,
      pkce_code_challenge_methods_supported: ['S256'],
      
      // Grant types (restricted for FAPI 2.0)
      grant_types_supported: [
        'authorization_code',
        'refresh_token'
      ],
      response_types_supported: ['code'],
      response_modes_supported: ['query'],
      
      // Scopes for financial services
      scopes_supported: [
        'openid',
        'profile',
        'customer:read',
        'customer:write',
        'consent:manage',
        'account:read',
        'transaction:read',
        'payment:initiate'
      ],
      
      // Additional FAPI requirements
      max_authorization_code_lifetime: 600, // 10 minutes
      max_access_token_lifetime: 900, // 15 minutes
      max_refresh_token_lifetime: 3600, // 1 hour
      
      // Swiss financial regulations compliance
      regulatory_compliance: [
        'FINMA',
        'DSG', // Swiss Data Protection Act
        'GDPR'
      ],
      
      // Banking industry specific
      supported_use_cases: [
        'account_opening',
        'customer_identification',
        'credit_assessment',
        'regulatory_compliance'
      ],
      
      // Swiss Open Banking features
      swiss_standards_compliance: [
        'Open API Kundenbeziehung',
        'Swiss QR Code',
        'ISO 20022'
      ]
    };

    logger.debug('FAPI configuration document served', {
      profile: fapiConfiguration.fapi_profile,
      compliance: fapiConfiguration.fapi_compliance_level
    });

    res.json(fapiConfiguration);

  } catch (error) {
    logger.error('FAPI configuration failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to generate FAPI configuration'
    });
  }
});

/**
 * GET /.well-known/swiss-banking-metadata - Swiss Banking Specific Metadata
 */
router.get('/swiss-banking-metadata', (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const swissBankingMetadata = {
      issuer: ISSUER,
      
      // Swiss Open Banking Project metadata
      swiss_open_banking_version: '1.0.0',
      kundenbeziehung_api_version: '1.0.0',
      
      // Supported Swiss standards
      supported_standards: [
        'ISO 20022',
        'Swiss QR Code',
        'eBill',
        'SEPA'
      ],
      
      // Regulatory compliance
      finma_compliance: true,
      dsg_compliance: true,
      gdpr_compliance: true,
      
      // Supported banking use cases
      supported_banking_use_cases: [
        {
          use_case: 'UC1',
          name: 'Banking Account Opening',
          description: 'Streamlined account opening with data reuse',
          endpoints: [
            '/v1/customer/check',
            '/v1/customer/data',
            '/v1/consent'
          ]
        },
        {
          use_case: 'UC2', 
          name: 'Customer Re-identification',
          description: 'Quick customer recognition across institutions',
          endpoints: [
            '/v1/identification',
            '/v1/customer/check'
          ]
        },
        {
          use_case: 'UC3',
          name: 'Age Verification',
          description: 'Privacy-preserving age verification',
          endpoints: [
            '/v1/checks/age',
            '/v1/identification'
          ]
        },
        {
          use_case: 'UC4',
          name: 'EVV Lifecycle Management',
          description: 'Investment portfolio and risk management',
          endpoints: [
            '/v1/customer/evv',
            '/v1/signature'
          ]
        }
      ],
      
      // Data categories (Datenbausteine)
      supported_data_categories: [
        'basicData',
        'identification',
        'kycData',
        'addressData',
        'contactData',
        'financialData',
        'riskProfile',
        'consentData'
      ],
      
      // Process framework
      referenzprozess_steps: [
        'customer_recognition',
        'identity_verification',
        'data_collection',
        'risk_assessment',
        'compliance_check',
        'documentation',
        'approval_workflow',
        'account_setup',
        'service_activation',
        'ongoing_monitoring'
      ],
      
      // Technical capabilities
      technical_features: [
        'FAPI 2.0 Security Profile',
        'mTLS Client Authentication', 
        'DPoP Token Binding',
        'PAR (Pushed Authorization Requests)',
        'JWT with PS256/ES256/EdDSA',
        'Real-time Consent Management',
        'Cross-institutional Data Exchange',
        'Privacy-by-Design Architecture'
      ],
      
      // Contact and support
      support: {
        technical_contact: 'technical@kundenbeziehung.ch',
        business_contact: 'business@kundenbeziehung.ch',
        documentation: `${baseUrl}/docs`,
        github: 'https://github.com/openbankingproject-ch/open-api-kundenbeziehung'
      }
    };

    res.json(swissBankingMetadata);

  } catch (error) {
    logger.error('Swiss banking metadata failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to generate Swiss banking metadata'
    });
  }
});

module.exports = router;