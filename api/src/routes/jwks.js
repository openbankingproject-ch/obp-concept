const express = require('express');
const crypto = require('crypto');
const { generateKeyPair, exportJWK } = require('jose');
const logger = require('../utils/logger');

const router = express.Router();

// In-memory key storage (use secure key management service in production)
let currentKeyPair = null;
let jwkSet = null;
let keyRotationInterval = null;

// Key configuration
const KEY_ROTATION_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
const KEY_ALGORITHM = 'PS256'; // FAPI 2.0 compliant

/**
 * Initialize signing keys
 */
async function initializeKeys() {
  try {
    logger.info('Initializing JWT signing keys...');
    
    await rotateKeys();
    
    // Set up automatic key rotation
    keyRotationInterval = setInterval(rotateKeys, KEY_ROTATION_INTERVAL);
    
    logger.info('JWT key management initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize JWT keys:', error);
    throw error;
  }
}

/**
 * Rotate signing keys
 */
async function rotateKeys() {
  try {
    logger.info('Rotating JWT signing keys...');
    
    // Generate new RSA key pair for PS256 (FAPI 2.0 compliant)
    const keyPair = await generateKeyPair('PS256', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });
    
    // Generate key ID
    const keyId = crypto.randomBytes(16).toString('hex');
    
    // Export public key as JWK
    const publicJwk = await exportJWK(keyPair.publicKey);
    publicJwk.kid = keyId;
    publicJwk.use = 'sig';
    publicJwk.alg = 'PS256';
    
    // Store key pair
    const previousKeyPair = currentKeyPair;
    currentKeyPair = {
      keyId,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
      publicJwk,
      createdAt: new Date(),
      algorithm: 'PS256'
    };
    
    // Update JWK Set (keep previous key for verification during transition)
    const keys = [currentKeyPair.publicJwk];
    
    // Include previous key for 1 hour during rotation
    if (previousKeyPair && (new Date() - previousKeyPair.createdAt) < 60 * 60 * 1000) {
      keys.push(previousKeyPair.publicJwk);
    }
    
    jwkSet = {
      keys
    };
    
    logger.info('JWT keys rotated successfully', {
      keyId,
      algorithm: 'PS256',
      keysInSet: keys.length
    });
    
  } catch (error) {
    logger.error('Key rotation failed:', error);
    throw error;
  }
}

/**
 * GET /.well-known/jwks.json - JSON Web Key Set
 */
router.get('/jwks.json', (req, res) => {
  try {
    if (!jwkSet) {
      logger.error('JWK Set not initialized');
      return res.status(503).json({
        error: 'service_unavailable',
        error_description: 'Key management service not available'
      });
    }
    
    // Add cache headers for JWK Set (short cache duration for security)
    res.set({
      'Cache-Control': 'public, max-age=3600', // 1 hour
      'Content-Type': 'application/json'
    });
    
    logger.debug('JWK Set served', {
      keyCount: jwkSet.keys.length,
      keyIds: jwkSet.keys.map(key => key.kid)
    });
    
    res.json(jwkSet);
    
  } catch (error) {
    logger.error('JWK Set endpoint failed', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to serve JWK Set'
    });
  }
});

/**
 * GET /keys/info - Key Management Information (Internal endpoint)
 */
router.get('/keys/info', (req, res) => {
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
    
    if (!currentKeyPair) {
      return res.status(503).json({
        error: 'service_unavailable',
        error_description: 'Key management not initialized'
      });
    }
    
    const keyInfo = {
      current_key: {
        kid: currentKeyPair.keyId,
        algorithm: currentKeyPair.algorithm,
        created_at: currentKeyPair.createdAt,
        age_hours: Math.floor((new Date() - currentKeyPair.createdAt) / (1000 * 60 * 60))
      },
      jwk_set: {
        key_count: jwkSet?.keys?.length || 0,
        keys: jwkSet?.keys?.map(key => ({
          kid: key.kid,
          kty: key.kty,
          alg: key.alg,
          use: key.use
        })) || []
      },
      rotation: {
        interval_hours: KEY_ROTATION_INTERVAL / (1000 * 60 * 60),
        next_rotation: new Date(currentKeyPair.createdAt.getTime() + KEY_ROTATION_INTERVAL)
      }
    };
    
    res.json(keyInfo);
    
  } catch (error) {
    logger.error('Key info endpoint failed', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to retrieve key information'
    });
  }
});

/**
 * POST /keys/rotate - Manual Key Rotation (Internal endpoint)
 */
router.post('/keys/rotate', async (req, res) => {
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
    
    const previousKeyId = currentKeyPair?.keyId;
    await rotateKeys();
    
    logger.info('Manual key rotation completed', {
      previousKeyId,
      newKeyId: currentKeyPair.keyId,
      requestIp: req.ip
    });
    
    res.json({
      message: 'Keys rotated successfully',
      previous_key_id: previousKeyId,
      new_key_id: currentKeyPair.keyId,
      rotation_time: currentKeyPair.createdAt
    });
    
  } catch (error) {
    logger.error('Manual key rotation failed', {
      error: error.message,
      stack: error.stack,
      requestIp: req.ip
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Key rotation failed'
    });
  }
});

/**
 * Get current signing key (for internal use)
 */
function getCurrentSigningKey() {
  return currentKeyPair;
}

/**
 * Get JWK by key ID
 */
function getJwkByKeyId(keyId) {
  if (!jwkSet || !jwkSet.keys) {
    return null;
  }
  
  return jwkSet.keys.find(key => key.kid === keyId);
}

/**
 * Cleanup resources
 */
function shutdown() {
  if (keyRotationInterval) {
    clearInterval(keyRotationInterval);
    keyRotationInterval = null;
  }
  
  logger.info('JWT key management shut down');
}

// Initialize keys when module is loaded
initializeKeys().catch(error => {
  logger.error('Fatal error initializing JWT keys:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = router;
module.exports.getCurrentSigningKey = getCurrentSigningKey;
module.exports.getJwkByKeyId = getJwkByKeyId;
module.exports.initializeKeys = initializeKeys;
module.exports.rotateKeys = rotateKeys;
module.exports.shutdown = shutdown;