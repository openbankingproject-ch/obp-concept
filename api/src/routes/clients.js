const express = require('express');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const joi = require('joi');
const logger = require('../utils/logger');
const mtlsMiddleware = require('../middleware/mtls');

const router = express.Router();

// In-memory client registry (use database in production)
const clientRegistry = new Map();

// Service layer references (injected by app.js)
let serviceManager = null;
let coreFramework = null;

/**
 * Set service manager reference
 */
function setServiceManager(manager) {
  serviceManager = manager;
}

/**
 * Set core framework reference
 */
function setCoreFramework(framework) {
  coreFramework = framework;
}

// Dynamic Client Registration Schema (FAPI 2.0 compliant)
const clientRegistrationSchema = joi.object({
  // Required parameters
  redirect_uris: joi.array().items(joi.string().uri()).min(1).required(),
  
  // Optional parameters
  client_name: joi.string().max(255),
  client_uri: joi.string().uri(),
  logo_uri: joi.string().uri(),
  contacts: joi.array().items(joi.string().email()),
  tos_uri: joi.string().uri(),
  policy_uri: joi.string().uri(),
  
  // Grant types and response types
  grant_types: joi.array().items(joi.string().valid('authorization_code', 'refresh_token')).default(['authorization_code']),
  response_types: joi.array().items(joi.string().valid('code')).default(['code']),
  
  // Scope
  scope: joi.string().default('openid profile customer:read'),
  
  // Client authentication
  token_endpoint_auth_method: joi.string().valid('private_key_jwt', 'tls_client_auth').default('private_key_jwt'),
  token_endpoint_auth_signing_alg: joi.string().valid('PS256', 'ES256', 'EdDSA').default('PS256'),
  
  // FAPI 2.0 specific requirements
  require_pushed_authorization_requests: joi.boolean().default(true),
  require_signed_request_object: joi.boolean().default(false),
  
  // ID Token signing
  id_token_signed_response_alg: joi.string().valid('PS256', 'ES256', 'EdDSA').default('PS256'),
  
  // Request object signing
  request_object_signing_alg: joi.string().valid('PS256', 'ES256', 'EdDSA'),
  
  // JWK Set for client authentication
  jwks_uri: joi.string().uri(),
  jwks: joi.object(),
  
  // Software statement (for regulatory environments)
  software_statement: joi.string(),
  
  // Industry specific
  industry_type: joi.string().valid('banking', 'insurance', 'fintech', 'other').default('banking'),
  regulatory_licenses: joi.array().items(joi.string()),
  
  // Swiss specific
  finma_license: joi.string(),
  swiss_qr_support: joi.boolean().default(false),
  
  // Additional metadata
  application_type: joi.string().valid('web', 'native').default('web'),
  subject_type: joi.string().valid('public', 'pairwise').default('public')
});

/**
 * Client Update Schema (subset of registration schema)
 */
const clientUpdateSchema = joi.object({
  client_name: joi.string().max(255),
  client_uri: joi.string().uri(),
  logo_uri: joi.string().uri(),
  contacts: joi.array().items(joi.string().email()),
  tos_uri: joi.string().uri(),
  policy_uri: joi.string().uri(),
  redirect_uris: joi.array().items(joi.string().uri()).min(1),
  scope: joi.string(),
  jwks_uri: joi.string().uri(),
  jwks: joi.object(),
  industry_type: joi.string().valid('banking', 'insurance', 'fintech', 'other'),
  regulatory_licenses: joi.array().items(joi.string()),
  finma_license: joi.string(),
  swiss_qr_support: joi.boolean()
});

/**
 * POST /register - Dynamic Client Registration
 */
router.post('/register', mtlsMiddleware, async (req, res) => {
  try {
    logger.info('Dynamic client registration request', {
      clientName: req.body.client_name,
      industryType: req.body.industry_type,
      ip: req.ip
    });

    // Validate request body
    const { error, value: validatedClient } = clientRegistrationSchema.validate(req.body);
    if (error) {
      logger.warn('Client registration validation failed', {
        error: error.details,
        ip: req.ip
      });
      
      return res.status(400).json({
        error: 'invalid_client_metadata',
        error_description: error.details[0].message,
        timestamp: new Date().toISOString()
      });
    }

    // Validate client certificate (FAPI 2.0 requires mTLS for DCR)
    if (!req.client) {
      return res.status(401).json({
        error: 'invalid_client',
        error_description: 'mTLS client authentication required for registration',
        timestamp: new Date().toISOString()
      });
    }

    // Validate redirect URIs (HTTPS only for production)
    for (const redirectUri of validatedClient.redirect_uris) {
      try {
        const uri = new URL(redirectUri);
        if (process.env.NODE_ENV === 'production' && uri.protocol !== 'https:') {
          return res.status(400).json({
            error: 'invalid_redirect_uri',
            error_description: 'HTTPS redirect URIs required in production',
            timestamp: new Date().toISOString()
          });
        }
      } catch (uriError) {
        return res.status(400).json({
          error: 'invalid_redirect_uri',
          error_description: `Invalid redirect URI: ${redirectUri}`,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Generate client credentials
    const clientId = generateClientId(validatedClient);
    const clientSecret = validatedClient.token_endpoint_auth_method === 'client_secret_post' 
      ? generateClientSecret() 
      : null; // No secret needed for private_key_jwt or mTLS

    // Create client record
    const clientRecord = {
      client_id: clientId,
      client_secret: clientSecret,
      client_secret_expires_at: clientSecret ? Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) : 0, // 1 year
      
      // Copy validated parameters
      ...validatedClient,
      
      // Metadata
      client_id_issued_at: Math.floor(Date.now() / 1000),
      registration_access_token: generateRegistrationAccessToken(),
      
      // mTLS binding
      tls_client_certificate_subject_dn: req.client?.subject?.serialized || null,
      tls_client_certificate_san_dns: req.client?.subject?.CN || null,
      
      // Status and audit
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
      created_by_ip: req.ip,
      
      // FAPI 2.0 enforcement
      fapi_compliance_level: 'baseline',
      enforce_pkce: true,
      enforce_par: validatedClient.require_pushed_authorization_requests
    };

    // Store client
    clientRegistry.set(clientId, clientRecord);

    // Prepare registration response
    const registrationResponse = {
      client_id: clientId,
      client_secret: clientSecret,
      client_secret_expires_at: clientRecord.client_secret_expires_at,
      client_id_issued_at: clientRecord.client_id_issued_at,
      registration_access_token: clientRecord.registration_access_token,
      registration_client_uri: `${req.protocol}://${req.get('host')}/register/${clientId}`,
      
      // Echo back the registered metadata
      client_name: clientRecord.client_name,
      redirect_uris: clientRecord.redirect_uris,
      grant_types: clientRecord.grant_types,
      response_types: clientRecord.response_types,
      scope: clientRecord.scope,
      token_endpoint_auth_method: clientRecord.token_endpoint_auth_method,
      require_pushed_authorization_requests: clientRecord.require_pushed_authorization_requests,
      require_signed_request_object: clientRecord.require_signed_request_object,
      
      // FAPI specific
      fapi_compliance_level: clientRecord.fapi_compliance_level,
      
      // Swiss specific
      industry_type: clientRecord.industry_type,
      swiss_standards_support: {
        qr_code: clientRecord.swiss_qr_support,
        iso_20022: true,
        finma_compliant: !!clientRecord.finma_license
      }
    };

    logger.info('Client registered successfully', {
      clientId,
      clientName: clientRecord.client_name,
      industryType: clientRecord.industry_type,
      authMethod: clientRecord.token_endpoint_auth_method,
      ip: req.ip
    });

    res.status(201).json(registrationResponse);

  } catch (error) {
    logger.error('Client registration failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Client registration failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /register/:client_id - Get Client Configuration
 */
router.get('/register/:client_id', mtlsMiddleware, (req, res) => {
  try {
    const { client_id } = req.params;
    const authHeader = req.headers.authorization;

    // Extract registration access token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Bearer token required',
        timestamp: new Date().toISOString()
      });
    }

    const registrationToken = authHeader.substring(7);
    const clientRecord = clientRegistry.get(client_id);

    if (!clientRecord) {
      return res.status(404).json({
        error: 'invalid_client',
        error_description: 'Client not found',
        timestamp: new Date().toISOString()
      });
    }

    // Validate registration access token
    if (clientRecord.registration_access_token !== registrationToken) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Invalid registration access token',
        timestamp: new Date().toISOString()
      });
    }

    // Return client configuration (excluding sensitive data)
    const clientConfiguration = {
      client_id: clientRecord.client_id,
      client_secret_expires_at: clientRecord.client_secret_expires_at,
      client_id_issued_at: clientRecord.client_id_issued_at,
      
      client_name: clientRecord.client_name,
      client_uri: clientRecord.client_uri,
      redirect_uris: clientRecord.redirect_uris,
      grant_types: clientRecord.grant_types,
      response_types: clientRecord.response_types,
      scope: clientRecord.scope,
      token_endpoint_auth_method: clientRecord.token_endpoint_auth_method,
      
      industry_type: clientRecord.industry_type,
      status: clientRecord.status,
      fapi_compliance_level: clientRecord.fapi_compliance_level,
      
      created_at: clientRecord.created_at,
      updated_at: clientRecord.updated_at
    };

    logger.debug('Client configuration retrieved', {
      clientId: client_id,
      ip: req.ip
    });

    res.json(clientConfiguration);

  } catch (error) {
    logger.error('Client configuration retrieval failed', {
      error: error.message,
      clientId: req.params.client_id,
      ip: req.ip
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to retrieve client configuration',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * PUT /register/:client_id - Update Client Configuration
 */
router.put('/register/:client_id', mtlsMiddleware, async (req, res) => {
  try {
    const { client_id } = req.params;
    const authHeader = req.headers.authorization;

    // Extract registration access token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Bearer token required',
        timestamp: new Date().toISOString()
      });
    }

    const registrationToken = authHeader.substring(7);
    const clientRecord = clientRegistry.get(client_id);

    if (!clientRecord) {
      return res.status(404).json({
        error: 'invalid_client',
        error_description: 'Client not found',
        timestamp: new Date().toISOString()
      });
    }

    // Validate registration access token
    if (clientRecord.registration_access_token !== registrationToken) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Invalid registration access token',
        timestamp: new Date().toISOString()
      });
    }

    // Validate update request
    const { error, value: validatedUpdates } = clientUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'invalid_client_metadata',
        error_description: error.details[0].message,
        timestamp: new Date().toISOString()
      });
    }

    // Update client record
    const updatedRecord = {
      ...clientRecord,
      ...validatedUpdates,
      updated_at: new Date()
    };

    clientRegistry.set(client_id, updatedRecord);

    logger.info('Client configuration updated', {
      clientId: client_id,
      updatedFields: Object.keys(validatedUpdates),
      ip: req.ip
    });

    // Return updated configuration
    const updatedConfiguration = {
      client_id: updatedRecord.client_id,
      client_secret_expires_at: updatedRecord.client_secret_expires_at,
      client_id_issued_at: updatedRecord.client_id_issued_at,
      
      client_name: updatedRecord.client_name,
      client_uri: updatedRecord.client_uri,
      redirect_uris: updatedRecord.redirect_uris,
      grant_types: updatedRecord.grant_types,
      response_types: updatedRecord.response_types,
      scope: updatedRecord.scope,
      
      industry_type: updatedRecord.industry_type,
      status: updatedRecord.status,
      updated_at: updatedRecord.updated_at
    };

    res.json(updatedConfiguration);

  } catch (error) {
    logger.error('Client configuration update failed', {
      error: error.message,
      clientId: req.params.client_id,
      ip: req.ip
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to update client configuration',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * DELETE /register/:client_id - Delete Client
 */
router.delete('/register/:client_id', mtlsMiddleware, (req, res) => {
  try {
    const { client_id } = req.params;
    const authHeader = req.headers.authorization;

    // Extract registration access token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Bearer token required',
        timestamp: new Date().toISOString()
      });
    }

    const registrationToken = authHeader.substring(7);
    const clientRecord = clientRegistry.get(client_id);

    if (!clientRecord) {
      return res.status(404).json({
        error: 'invalid_client',
        error_description: 'Client not found',
        timestamp: new Date().toISOString()
      });
    }

    // Validate registration access token
    if (clientRecord.registration_access_token !== registrationToken) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Invalid registration access token',
        timestamp: new Date().toISOString()
      });
    }

    // Soft delete - mark as inactive instead of removing
    clientRecord.status = 'inactive';
    clientRecord.deleted_at = new Date();
    clientRecord.deleted_by_ip = req.ip;

    logger.info('Client deleted', {
      clientId: client_id,
      clientName: clientRecord.client_name,
      ip: req.ip
    });

    res.status(204).send();

  } catch (error) {
    logger.error('Client deletion failed', {
      error: error.message,
      clientId: req.params.client_id,
      ip: req.ip
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to delete client',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Generate client ID
 */
function generateClientId(clientData) {
  const prefix = getClientPrefix(clientData.industry_type);
  const randomPart = crypto.randomBytes(12).toString('hex');
  return `${prefix}-${randomPart}`;
}

/**
 * Get client ID prefix based on industry
 */
function getClientPrefix(industryType) {
  const prefixes = {
    banking: 'bank',
    insurance: 'ins',
    fintech: 'fin',
    other: 'app'
  };
  
  return prefixes[industryType] || 'app';
}

/**
 * Generate client secret (for client_secret_post auth method)
 */
function generateClientSecret() {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Generate registration access token
 */
function generateRegistrationAccessToken() {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Get client by client ID (for OAuth flows)
 */
function getClientById(clientId) {
  const client = clientRegistry.get(clientId);
  return client && client.status === 'active' ? client : null;
}

/**
 * List all active clients (internal endpoint)
 */
router.get('/clients', (req, res) => {
  try {
    // Basic auth check for internal endpoint
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Bearer token required'
      });
    }
    
    const token = authHeader.substring(7);
    const expectedToken = process.env.INTERNAL_API_TOKEN || 'change-in-production';
    
    if (token !== expectedToken) {
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Invalid token'
      });
    }

    const activeClients = Array.from(clientRegistry.values())
      .filter(client => client.status === 'active')
      .map(client => ({
        client_id: client.client_id,
        client_name: client.client_name,
        industry_type: client.industry_type,
        created_at: client.created_at,
        updated_at: client.updated_at,
        fapi_compliance_level: client.fapi_compliance_level
      }));

    res.json({
      clients: activeClients,
      total: activeClients.length
    });

  } catch (error) {
    logger.error('Client listing failed', {
      error: error.message,
      ip: req.ip
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to list clients'
    });
  }
});

module.exports = router;
module.exports.setServiceManager = setServiceManager;
module.exports.setCoreFramework = setCoreFramework;
module.exports.getClientById = getClientById;