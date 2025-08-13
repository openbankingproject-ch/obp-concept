const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_ISSUER = process.env.JWT_ISSUER || 'open-api-kundenbeziehung';

/**
 * Verify JWT token and extract claims
 */
const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      algorithms: ['HS256', 'RS256']
    });
    
    // Validate required claims
    if (!decoded.sub || !decoded.iat || !decoded.exp) {
      throw new Error('Invalid token structure');
    }
    
    // Check if token is expired
    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
    
    return decoded;
  } catch (error) {
    logger.warn('Token verification failed:', error.message);
    throw error;
  }
};

/**
 * Extract Bearer token from Authorization header
 */
const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
};

/**
 * Validate consent claims in JWT token
 */
const validateConsentClaims = (decoded, requiredPurpose) => {
  const consentClaim = decoded.consent;
  
  if (!consentClaim) {
    return false;
  }
  
  // Check if consent is granted
  if (!consentClaim.granted) {
    return false;
  }
  
  // Check purpose if specified
  if (requiredPurpose && consentClaim.purpose !== requiredPurpose) {
    return false;
  }
  
  // Check expiry
  if (consentClaim.expiresAt && new Date(consentClaim.expiresAt) < new Date()) {
    return false;
  }
  
  return true;
};

/**
 * Required authentication middleware
 */
const required = async (req, res, next) => {
  try {
    const token = extractBearerToken(req);
    
    if (!token) {
      return res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Authentication required',
        timestamp: new Date().toISOString()
      });
    }
    
    const decoded = await verifyToken(token);
    
    // Attach user info to request
    req.user = {
      id: decoded.sub,
      clientId: decoded.client_id,
      institutionId: decoded.institution_id,
      scopes: decoded.scope ? decoded.scope.split(' ') : [],
      consent: decoded.consent
    };
    
    // Log authentication
    logger.debug('Authentication successful', {
      userId: req.user.id,
      clientId: req.user.clientId,
      institutionId: req.user.institutionId,
      ip: req.ip
    });
    
    next();
  } catch (error) {
    logger.warn('Authentication failed', {
      error: error.message,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Invalid or expired token',
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Optional authentication middleware
 */
const optional = async (req, res, next) => {
  try {
    const token = extractBearerToken(req);
    
    if (token) {
      const decoded = await verifyToken(token);
      req.user = {
        id: decoded.sub,
        clientId: decoded.client_id,
        institutionId: decoded.institution_id,
        scopes: decoded.scope ? decoded.scope.split(' ') : [],
        consent: decoded.consent
      };
    }
    
    next();
  } catch (error) {
    // For optional auth, continue without user context
    logger.debug('Optional authentication failed, continuing without user context', {
      error: error.message,
      ip: req.ip
    });
    next();
  }
};

/**
 * Require specific scope
 */
const requireScope = (requiredScope) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Authentication required',
        timestamp: new Date().toISOString()
      });
    }
    
    if (!req.user.scopes.includes(requiredScope)) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: `Scope '${requiredScope}' required`,
        timestamp: new Date().toISOString()
      });
    }
    
    next();
  };
};

/**
 * Require valid consent for specific purpose
 */
const requireConsent = (purpose) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Authentication required',
        timestamp: new Date().toISOString()
      });
    }
    
    if (!validateConsentClaims(req.user, purpose)) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Valid consent required for this operation',
        timestamp: new Date().toISOString()
      });
    }
    
    next();
  };
};

/**
 * Generate JWT token for testing purposes
 */
const generateTestToken = (payload) => {
  const defaultPayload = {
    iss: JWT_ISSUER,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    sub: 'test-user',
    client_id: 'test-client',
    institution_id: 'CH-BANK-001',
    scope: 'customer:read customer:write consent:manage',
    consent: {
      granted: true,
      purpose: 'accountOpening',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      dataCategories: ['basicData', 'identification', 'kycData']
    }
  };
  
  return jwt.sign({ ...defaultPayload, ...payload }, JWT_SECRET);
};

module.exports = {
  required,
  optional,
  requireScope,
  requireConsent,
  verifyToken,
  generateTestToken,
  validateConsentClaims
};