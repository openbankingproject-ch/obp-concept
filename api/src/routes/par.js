const express = require('express');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const joi = require('joi');
const logger = require('../utils/logger');

const router = express.Router();

// In-memory storage for PAR requests (use Redis in production)
const parStorage = new Map();

// PAR request validation schema (FAPI 2.0 compliant)
const parRequestSchema = joi.object({
  client_id: joi.string().required().max(255),
  response_type: joi.string().valid('code').required(),
  scope: joi.string().required(),
  redirect_uri: joi.string().uri().required(),
  state: joi.string().max(255),
  code_challenge: joi.string().required().max(128),
  code_challenge_method: joi.string().valid('S256').required(),
  nonce: joi.string().max(255),
  // Additional FAPI 2.0 parameters
  claims: joi.string(),
  purpose: joi.string().valid('accountOpening', 'creditAssessment', 'compliance', 'customerUpdate'),
  max_age: joi.number().integer().min(0),
  prompt: joi.string().valid('none', 'login', 'consent', 'select_account')
});

/**
 * POST /par - Pushed Authorization Request (FAPI 2.0)
 * Securely submit authorization request parameters to authorization server
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value: validatedRequest } = parRequestSchema.validate(req.body);
    if (error) {
      logger.warn('PAR request validation failed', {
        error: error.details,
        clientId: req.body.client_id,
        ip: req.ip
      });
      
      return res.status(400).json({
        error: 'invalid_request',
        error_description: error.details[0].message,
        timestamp: new Date().toISOString()
      });
    }

    // Validate client authentication (mTLS or private_key_jwt required)
    if (!req.client) {
      return res.status(401).json({
        error: 'invalid_client',
        error_description: 'Client authentication required for PAR',
        timestamp: new Date().toISOString()
      });
    }

    // Verify client_id matches authenticated client
    if (validatedRequest.client_id !== req.client.id) {
      logger.warn('PAR client_id mismatch', {
        providedClientId: validatedRequest.client_id,
        authenticatedClientId: req.client.id,
        ip: req.ip
      });
      
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'client_id mismatch with authenticated client',
        timestamp: new Date().toISOString()
      });
    }

    // Validate redirect_uri against registered URIs
    if (!isValidRedirectUri(req.client, validatedRequest.redirect_uri)) {
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'redirect_uri not registered for client',
        timestamp: new Date().toISOString()
      });
    }

    // Generate secure request_uri (FAPI 2.0 requirement)
    const requestId = uuidv4();
    const requestUri = `urn:ietf:params:oauth:request_uri:${requestId}`;
    
    // Store PAR request (expires in 60 seconds max per FAPI 2.0)
    const expiresAt = new Date(Date.now() + 60 * 1000); // 60 seconds
    const parData = {
      ...validatedRequest,
      requestId,
      clientId: req.client.id,
      createdAt: new Date(),
      expiresAt,
      used: false
    };

    parStorage.set(requestId, parData);

    // Clean up expired requests (simple cleanup)
    cleanupExpiredRequests();

    logger.info('PAR request created successfully', {
      requestId,
      clientId: req.client.id,
      scope: validatedRequest.scope,
      expiresAt: expiresAt.toISOString(),
      ip: req.ip
    });

    // Return PAR response (FAPI 2.0 compliant)
    res.status(201).json({
      request_uri: requestUri,
      expires_in: 60
    });

  } catch (error) {
    logger.error('PAR request processing failed', {
      error: error.message,
      stack: error.stack,
      clientId: req.body?.client_id,
      ip: req.ip
    });

    res.status(500).json({
      error: 'server_error',
      error_description: 'Internal server error processing PAR request',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /par/:requestId - Retrieve PAR request data (internal endpoint)
 */
router.get('/:requestId', (req, res) => {
  const { requestId } = req.params;
  const parData = parStorage.get(requestId);

  if (!parData) {
    return res.status(404).json({
      error: 'invalid_request_uri',
      error_description: 'Request URI not found or expired',
      timestamp: new Date().toISOString()
    });
  }

  // Check if expired
  if (parData.expiresAt < new Date()) {
    parStorage.delete(requestId);
    return res.status(404).json({
      error: 'invalid_request_uri',
      error_description: 'Request URI expired',
      timestamp: new Date().toISOString()
    });
  }

  // Mark as used (single use per FAPI 2.0)
  if (parData.used) {
    parStorage.delete(requestId);
    return res.status(400).json({
      error: 'invalid_request_uri',
      error_description: 'Request URI already used',
      timestamp: new Date().toISOString()
    });
  }

  parData.used = true;
  res.json(parData);
});

/**
 * Validate redirect URI against client registration
 */
function isValidRedirectUri(client, redirectUri) {
  // In production, check against client's registered redirect URIs
  // For demo purposes, accept HTTPS URIs
  try {
    const uri = new URL(redirectUri);
    return uri.protocol === 'https:' || 
           (process.env.NODE_ENV !== 'production' && uri.hostname === 'localhost');
  } catch {
    return false;
  }
}

/**
 * Clean up expired PAR requests
 */
function cleanupExpiredRequests() {
  const now = new Date();
  for (const [requestId, parData] of parStorage.entries()) {
    if (parData.expiresAt < now) {
      parStorage.delete(requestId);
    }
  }
}

// Clean up expired requests every 5 minutes
setInterval(cleanupExpiredRequests, 5 * 60 * 1000);

module.exports = router;