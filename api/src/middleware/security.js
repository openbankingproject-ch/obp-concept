const crypto = require('crypto');
const logger = require('../utils/logger');
const SecurityAuditService = require('../services/securityAuditService');

// Initialize security audit service
const securityAudit = new SecurityAuditService();

/**
 * Security middleware for FAPI 2.0 compliance and threat protection
 */

/**
 * Enhanced request validation and security headers
 */
const securityHeaders = (req, res, next) => {
  // FAPI 2.0 security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // FAPI 2.0 cache control for sensitive endpoints
  const sensitiveEndpoints = ['/token', '/userinfo', '/introspect', '/authorize'];
  if (sensitiveEndpoints.some(endpoint => req.path.includes(endpoint))) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
  }
  
  // Add request ID for tracing
  req.requestId = crypto.randomBytes(16).toString('hex');
  res.setHeader('X-Request-ID', req.requestId);
  
  next();
};

/**
 * FAPI 2.0 compliance validation middleware
 */
const fapiComplianceValidation = (req, res, next) => {
  const startTime = Date.now();
  
  // Validate FAPI compliance
  const violations = securityAudit.validateFAPICompliance(req, req.path);
  
  // If critical violations exist, reject the request
  const criticalViolations = violations.filter(v => 
    v.requirement === 'HTTPS_REQUIRED' || 
    (req.path.includes('/token') && v.requirement === 'MTLS_CLIENT_AUTH')
  );
  
  if (criticalViolations.length > 0) {
    securityAudit.logSecurityIncident({
      type: 'FAPI_CRITICAL_VIOLATION',
      description: 'Critical FAPI 2.0 compliance violation',
      violations: criticalViolations,
      severity: 'high',
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      endpoint: req.path
    });
    
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'Request does not meet FAPI 2.0 security requirements',
      violations: criticalViolations.map(v => v.description)
    });
  }
  
  // Attach request metadata
  req.security = {
    requestId: req.requestId,
    startTime,
    fapiViolations: violations,
    compliant: violations.length === 0
  };
  
  next();
};

/**
 * Rate limiting with security audit integration
 */
const createSecurityRateLimit = (options = {}) => {
  const {
    windowMs = 60000, // 1 minute
    max = 100, // requests per window
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = options;
  
  const requests = new Map(); // Use Redis in production
  
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get or create request log for this IP
    if (!requests.has(key)) {
      requests.set(key, []);
    }
    
    const requestLog = requests.get(key);
    
    // Remove old requests outside the window
    const validRequests = requestLog.filter(timestamp => timestamp > windowStart);
    requests.set(key, validRequests);
    
    // Check if limit exceeded
    if (validRequests.length >= max) {
      securityAudit.logSecurityIncident({
        type: 'RATE_LIMIT_EXCEEDED',
        description: `Rate limit exceeded: ${validRequests.length} requests in ${windowMs}ms`,
        severity: 'medium',
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        endpoint: req.path,
        requestCount: validRequests.length,
        limit: max
      });
      
      return res.status(429).json({
        error: 'rate_limit_exceeded',
        error_description: 'Too many requests',
        retry_after: Math.ceil(windowMs / 1000),
        timestamp: new Date().toISOString()
      });
    }
    
    // Add current request to log
    validRequests.push(now);
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance
      for (const [ip, log] of requests.entries()) {
        const validEntries = log.filter(timestamp => timestamp > windowStart);
        if (validEntries.length === 0) {
          requests.delete(ip);
        } else {
          requests.set(ip, validEntries);
        }
      }
    }
    
    next();
  };
};

/**
 * Input validation and sanitization
 */
const inputValidation = (req, res, next) => {
  // Check for common injection patterns
  const suspiciousPatterns = [
    /(\<script|\<iframe|\<object)/i, // XSS
    /(union|select|insert|update|delete|drop|create|alter|exec|execute)/i, // SQL injection
    /(\.\.\/)|(\.\.\\)/g, // Path traversal
    /(\$\{|\%\{)/i, // Template injection
    /javascript:/i, // JavaScript protocol
    /on\w+\s*=/i // Event handlers
  ];
  
  // Check request body and query parameters
  const checkValue = (value, path) => {
    if (typeof value === 'string') {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          securityAudit.logSecurityIncident({
            type: 'SUSPICIOUS_INPUT',
            description: `Suspicious input detected in ${path}`,
            severity: 'medium',
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            endpoint: req.path,
            suspiciousValue: value.substring(0, 100), // First 100 chars only
            pattern: pattern.toString()
          });
          
          return false;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      for (const [key, val] of Object.entries(value)) {
        if (!checkValue(val, `${path}.${key}`)) {
          return false;
        }
      }
    }
    return true;
  };
  
  // Validate query parameters
  if (!checkValue(req.query, 'query')) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'Suspicious input detected in request parameters'
    });
  }
  
  // Validate request body
  if (req.body && !checkValue(req.body, 'body')) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'Suspicious input detected in request body'
    });
  }
  
  next();
};

/**
 * API access logging with security context
 */
const securityAccessLog = (req, res, next) => {
  const startTime = Date.now();
  
  // Override res.json to capture response
  const originalJson = res.json;
  let responseBody = null;
  
  res.json = function(body) {
    responseBody = body;
    return originalJson.call(this, body);
  };
  
  // Override res.end to log after response
  const originalEnd = res.end;
  res.end = function(...args) {
    const duration = Date.now() - startTime;
    
    // Determine if this is a sensitive endpoint
    const sensitiveEndpoints = [
      '/token', '/userinfo', '/introspect', '/authorize',
      '/v1/customer', '/v1/consent', '/v1/identification'
    ];
    const isSensitive = sensitiveEndpoints.some(endpoint => req.path.includes(endpoint));
    
    // Log API access
    securityAudit.logAPIAccessEvent({
      method: req.method,
      endpoint: req.path,
      statusCode: res.statusCode,
      responseTime: duration,
      requestSize: req.headers['content-length'] || 0,
      responseSize: args[0] ? args[0].length : 0,
      userId: req.user?.id,
      clientId: req.user?.clientId || req.client?.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      requestId: req.requestId,
      sensitive: isSensitive,
      errorType: responseBody?.error,
      fapiCompliant: req.security?.compliant
    });
    
    // Log errors separately
    if (res.statusCode >= 400) {
      const logLevel = res.statusCode >= 500 ? 'error' : 'warn';
      logger[logLevel]('API error response', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        error: responseBody?.error,
        errorDescription: responseBody?.error_description,
        duration,
        requestId: req.requestId,
        userId: req.user?.id,
        clientId: req.client?.id,
        ip: req.ip
      });
    }
    
    originalEnd.apply(this, args);
  };
  
  next();
};

/**
 * Token binding validation for FAPI 2.0
 */
const validateTokenBinding = (req, res, next) => {
  // Skip if no user context (not authenticated)
  if (!req.user) {
    return next();
  }
  
  // Check if token is DPoP-bound
  if (req.user.dpopBound) {
    const dpopProof = req.headers.dpop;
    
    if (!dpopProof) {
      securityAudit.logSecurityIncident({
        type: 'DPOP_BINDING_VIOLATION',
        description: 'DPoP-bound token used without DPoP proof',
        severity: 'high',
        userId: req.user.id,
        clientId: req.user.clientId,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        endpoint: req.path
      });
      
      return res.status(401).json({
        error: 'invalid_dpop_proof',
        error_description: 'DPoP proof required for this token'
      });
    }
    
    // DPoP validation is handled in auth middleware
    // This just logs the successful binding validation
    securityAudit.logFAPIComplianceEvent({
      endpoint: req.path,
      requirement: 'DPOP_TOKEN_BINDING',
      compliant: true,
      clientId: req.user.clientId,
      ip: req.ip
    });
  }
  
  next();
};

/**
 * Client certificate validation for mTLS
 */
const validateClientCertificate = (req, res, next) => {
  // Skip validation if client is already authenticated
  if (req.client) {
    return next();
  }
  
  // Check if mTLS is required for this endpoint
  const mtlsRequiredEndpoints = ['/token', '/par', '/register'];
  const requiresMTLS = mtlsRequiredEndpoints.some(endpoint => req.path.includes(endpoint));
  
  if (requiresMTLS) {
    securityAudit.logSecurityIncident({
      type: 'MTLS_REQUIRED_VIOLATION',
      description: 'mTLS required endpoint accessed without client certificate',
      severity: 'high',
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      endpoint: req.path
    });
    
    return res.status(401).json({
      error: 'invalid_client',
      error_description: 'mTLS client authentication required'
    });
  }
  
  next();
};

/**
 * Security incident response
 */
const securityIncidentResponse = (err, req, res, next) => {
  // Log security-related errors
  if (err.name === 'ValidationError' || err.name === 'AuthenticationError') {
    securityAudit.logSecurityIncident({
      type: 'SECURITY_ERROR',
      description: err.message,
      severity: 'medium',
      errorName: err.name,
      stack: err.stack,
      userId: req.user?.id,
      clientId: req.client?.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      endpoint: req.path,
      requestId: req.requestId
    });
  }
  
  next(err);
};

/**
 * Initialize security audit service
 */
const initializeSecurityAudit = async () => {
  await securityAudit.initialize();
  return securityAudit;
};

// Rate limiter instances for different endpoints
const generalRateLimit = createSecurityRateLimit({
  windowMs: 60000, // 1 minute
  max: 100 // 100 requests per minute
});

const authRateLimit = createSecurityRateLimit({
  windowMs: 60000, // 1 minute
  max: 20 // 20 auth requests per minute
});

const tokenRateLimit = createSecurityRateLimit({
  windowMs: 60000, // 1 minute
  max: 50 // 50 token requests per minute
});

module.exports = {
  securityHeaders,
  fapiComplianceValidation,
  inputValidation,
  securityAccessLog,
  validateTokenBinding,
  validateClientCertificate,
  securityIncidentResponse,
  generalRateLimit,
  authRateLimit,
  tokenRateLimit,
  initializeSecurityAudit,
  securityAudit
};