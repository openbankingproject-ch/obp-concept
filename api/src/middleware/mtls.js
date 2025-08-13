const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// Trusted institution certificates registry
const TRUSTED_CERTIFICATES = new Map();

/**
 * Load trusted certificates from directory
 */
const loadTrustedCertificates = () => {
  const certsDir = process.env.TRUSTED_CERTS_DIR || './certs/trusted';
  
  try {
    if (fs.existsSync(certsDir)) {
      const certFiles = fs.readdirSync(certsDir).filter(file => file.endsWith('.pem'));
      
      certFiles.forEach(file => {
        const certPath = path.join(certsDir, file);
        const certContent = fs.readFileSync(certPath, 'utf8');
        const institutionId = file.replace('.pem', '');
        
        TRUSTED_CERTIFICATES.set(institutionId, {
          certificate: certContent,
          fingerprint: generateFingerprint(certContent),
          loadedAt: new Date()
        });
        
        logger.info(`Loaded certificate for institution: ${institutionId}`);
      });
    } else {
      logger.warn(`Trusted certificates directory not found: ${certsDir}`);
    }
  } catch (error) {
    logger.error('Error loading trusted certificates:', error);
  }
};

/**
 * Generate certificate fingerprint
 */
const generateFingerprint = (certificate) => {
  return crypto
    .createHash('sha256')
    .update(certificate)
    .digest('hex')
    .toUpperCase()
    .match(/.{2}/g)
    .join(':');
};

/**
 * Extract certificate from request
 */
const extractClientCertificate = (req) => {
  // In production, this would come from TLS handshake
  // For development/testing, we check headers or custom fields
  
  if (req.socket && req.socket.getPeerCertificate) {
    const cert = req.socket.getPeerCertificate();
    if (cert && Object.keys(cert).length > 0) {
      return cert;
    }
  }
  
  // Development mode: check for certificate in headers
  if (process.env.NODE_ENV !== 'production') {
    const certHeader = req.headers['x-client-certificate'];
    if (certHeader) {
      try {
        return JSON.parse(Buffer.from(certHeader, 'base64').toString());
      } catch (error) {
        logger.warn('Invalid client certificate header format');
      }
    }
  }
  
  return null;
};

/**
 * Validate client certificate
 */
const validateClientCertificate = (cert, institutionId) => {
  if (!cert) {
    return { valid: false, reason: 'No client certificate provided' };
  }
  
  // Check if institution is trusted
  const trustedCert = TRUSTED_CERTIFICATES.get(institutionId);
  if (!trustedCert) {
    return { valid: false, reason: 'Institution not in trusted registry' };
  }
  
  // Validate certificate properties
  if (cert.subject && cert.subject.CN) {
    const commonName = cert.subject.CN;
    if (!commonName.includes(institutionId)) {
      return { valid: false, reason: 'Certificate common name mismatch' };
    }
  }
  
  // Check certificate validity period
  if (cert.valid_from && cert.valid_to) {
    const now = new Date();
    const validFrom = new Date(cert.valid_from);
    const validTo = new Date(cert.valid_to);
    
    if (now < validFrom || now > validTo) {
      return { valid: false, reason: 'Certificate not within validity period' };
    }
  }
  
  // Validate fingerprint if available
  if (cert.fingerprint) {
    const expectedFingerprint = trustedCert.fingerprint;
    if (cert.fingerprint !== expectedFingerprint) {
      return { valid: false, reason: 'Certificate fingerprint mismatch' };
    }
  }
  
  return { valid: true };
};

/**
 * mTLS middleware for high-security endpoints
 */
const mtlsMiddleware = (req, res, next) => {
  try {
    // Skip mTLS in development if explicitly disabled
    if (process.env.NODE_ENV !== 'production' && process.env.SKIP_MTLS === 'true') {
      logger.debug('Skipping mTLS validation in development mode');
      return next();
    }
    
    const institutionId = req.user?.institutionId;
    if (!institutionId) {
      return res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Institution ID required for mTLS validation',
        timestamp: new Date().toISOString()
      });
    }
    
    const clientCert = extractClientCertificate(req);
    const validation = validateClientCertificate(clientCert, institutionId);
    
    if (!validation.valid) {
      logger.warn('mTLS validation failed', {
        institutionId,
        reason: validation.reason,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
      
      return res.status(401).json({
        error: 'MTLS_VALIDATION_FAILED',
        message: 'Client certificate validation failed',
        timestamp: new Date().toISOString()
      });
    }
    
    // Attach certificate info to request
    req.clientCertificate = {
      institutionId,
      fingerprint: clientCert.fingerprint,
      subject: clientCert.subject,
      issuer: clientCert.issuer,
      validatedAt: new Date()
    };
    
    logger.debug('mTLS validation successful', {
      institutionId,
      fingerprint: clientCert.fingerprint,
      ip: req.ip
    });
    
    next();
  } catch (error) {
    logger.error('mTLS middleware error:', error);
    
    return res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Certificate validation error',
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Optional mTLS middleware
 */
const optionalMtls = (req, res, next) => {
  try {
    const institutionId = req.user?.institutionId;
    if (institutionId) {
      const clientCert = extractClientCertificate(req);
      const validation = validateClientCertificate(clientCert, institutionId);
      
      if (validation.valid) {
        req.clientCertificate = {
          institutionId,
          fingerprint: clientCert.fingerprint,
          subject: clientCert.subject,
          issuer: clientCert.issuer,
          validatedAt: new Date()
        };
        
        req.mtlsValidated = true;
      } else {
        req.mtlsValidated = false;
      }
    }
    
    next();
  } catch (error) {
    logger.error('Optional mTLS middleware error:', error);
    req.mtlsValidated = false;
    next();
  }
};

/**
 * Get institution certificate info
 */
const getInstitutionCertificate = (institutionId) => {
  return TRUSTED_CERTIFICATES.get(institutionId);
};

/**
 * Add trusted certificate
 */
const addTrustedCertificate = (institutionId, certificate) => {
  TRUSTED_CERTIFICATES.set(institutionId, {
    certificate,
    fingerprint: generateFingerprint(certificate),
    loadedAt: new Date()
  });
  
  logger.info(`Added trusted certificate for institution: ${institutionId}`);
};

/**
 * Remove trusted certificate
 */
const removeTrustedCertificate = (institutionId) => {
  const removed = TRUSTED_CERTIFICATES.delete(institutionId);
  if (removed) {
    logger.info(`Removed trusted certificate for institution: ${institutionId}`);
  }
  return removed;
};

/**
 * List all trusted institutions
 */
const listTrustedInstitutions = () => {
  return Array.from(TRUSTED_CERTIFICATES.keys());
};

// Initialize trusted certificates on module load
loadTrustedCertificates();

module.exports = mtlsMiddleware;
module.exports.optional = optionalMtls;
module.exports.loadTrustedCertificates = loadTrustedCertificates;
module.exports.addTrustedCertificate = addTrustedCertificate;
module.exports.removeTrustedCertificate = removeTrustedCertificate;
module.exports.listTrustedInstitutions = listTrustedInstitutions;
module.exports.getInstitutionCertificate = getInstitutionCertificate;