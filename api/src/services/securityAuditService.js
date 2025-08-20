const crypto = require('crypto');
const logger = require('../utils/logger');

/**
 * Security Audit Service for FAPI 2.0 Compliance
 * 
 * This service provides comprehensive security auditing capabilities
 * including audit logging, security event tracking, and compliance monitoring.
 */
class SecurityAuditService {
  constructor() {
    this.auditLog = new Map(); // Use persistent storage in production
    this.securityMetrics = {
      authenticationAttempts: 0,
      authenticationFailures: 0,
      tokenIssuances: 0,
      consentViolations: 0,
      securityIncidents: 0,
      fapiViolations: 0
    };
    this.alertThresholds = {
      failedAuthPerMinute: 10,
      securityIncidentsPerHour: 5,
      fapiViolationsPerHour: 3
    };
  }

  /**
   * Log authentication event
   */
  logAuthenticationEvent(eventData) {
    const auditEntry = this.createAuditEntry('AUTHENTICATION', eventData);
    
    // Update metrics
    this.securityMetrics.authenticationAttempts++;
    if (!eventData.success) {
      this.securityMetrics.authenticationFailures++;
      
      // Check for suspicious activity
      this.checkFailedAuthPattern(eventData);
    }
    
    // Log to audit trail
    this.addToAuditLog(auditEntry);
    
    // Log to application logger
    if (eventData.success) {
      logger.info('Authentication successful', {
        userId: eventData.userId,
        clientId: eventData.clientId,
        method: eventData.method,
        ip: eventData.ip,
        userAgent: eventData.userAgent,
        auditId: auditEntry.id
      });
    } else {
      logger.warn('Authentication failed', {
        reason: eventData.reason,
        clientId: eventData.clientId,
        method: eventData.method,
        ip: eventData.ip,
        userAgent: eventData.userAgent,
        auditId: auditEntry.id
      });
    }
  }

  /**
   * Log token issuance event
   */
  logTokenIssuanceEvent(eventData) {
    const auditEntry = this.createAuditEntry('TOKEN_ISSUANCE', eventData);
    
    // Update metrics
    this.securityMetrics.tokenIssuances++;
    
    // Add to audit log
    this.addToAuditLog(auditEntry);
    
    logger.info('Tokens issued', {
      clientId: eventData.clientId,
      scope: eventData.scope,
      grantType: eventData.grantType,
      tokenType: eventData.tokenType,
      dpopBound: eventData.dpopBound || false,
      expiresIn: eventData.expiresIn,
      ip: eventData.ip,
      auditId: auditEntry.id
    });
  }

  /**
   * Log consent management event
   */
  logConsentEvent(eventData) {
    const auditEntry = this.createAuditEntry('CONSENT', eventData);
    
    // Check for consent violations
    if (eventData.violation) {
      this.securityMetrics.consentViolations++;
      this.logSecurityIncident({
        type: 'CONSENT_VIOLATION',
        description: eventData.violationReason,
        ...eventData
      });
    }
    
    // Add to audit log
    this.addToAuditLog(auditEntry);
    
    const logLevel = eventData.violation ? 'warn' : 'info';
    logger[logLevel]('Consent event', {
      action: eventData.action,
      consentId: eventData.consentId,
      userId: eventData.userId,
      dataCategories: eventData.dataCategories,
      purpose: eventData.purpose,
      granted: eventData.granted,
      violation: eventData.violation || false,
      ip: eventData.ip,
      auditId: auditEntry.id
    });
  }

  /**
   * Log FAPI compliance event
   */
  logFAPIComplianceEvent(eventData) {
    const auditEntry = this.createAuditEntry('FAPI_COMPLIANCE', eventData);
    
    if (!eventData.compliant) {
      this.securityMetrics.fapiViolations++;
      
      // Critical FAPI violations should be treated as security incidents
      if (eventData.severity === 'critical') {
        this.logSecurityIncident({
          type: 'FAPI_VIOLATION',
          description: eventData.violationDescription,
          ...eventData
        });
      }
    }
    
    // Add to audit log
    this.addToAuditLog(auditEntry);
    
    const logLevel = eventData.compliant ? 'debug' : 'warn';
    logger[logLevel]('FAPI compliance check', {
      endpoint: eventData.endpoint,
      requirement: eventData.requirement,
      compliant: eventData.compliant,
      violationType: eventData.violationType,
      clientId: eventData.clientId,
      ip: eventData.ip,
      auditId: auditEntry.id
    });
  }

  /**
   * Log security incident
   */
  logSecurityIncident(eventData) {
    const auditEntry = this.createAuditEntry('SECURITY_INCIDENT', {
      ...eventData,
      severity: eventData.severity || 'medium',
      status: 'open'
    });
    
    // Update metrics
    this.securityMetrics.securityIncidents++;
    
    // Add to audit log
    this.addToAuditLog(auditEntry);
    
    // Alert on critical incidents
    if (eventData.severity === 'critical') {
      this.triggerSecurityAlert(auditEntry);
    }
    
    logger.error('Security incident', {
      type: eventData.type,
      description: eventData.description,
      severity: eventData.severity,
      clientId: eventData.clientId,
      userId: eventData.userId,
      ip: eventData.ip,
      userAgent: eventData.userAgent,
      auditId: auditEntry.id
    });
  }

  /**
   * Log API access event
   */
  logAPIAccessEvent(eventData) {
    const auditEntry = this.createAuditEntry('API_ACCESS', eventData);
    
    // Add to audit log
    this.addToAuditLog(auditEntry);
    
    // Only log sensitive endpoints or errors
    if (eventData.sensitive || eventData.statusCode >= 400) {
      const logLevel = eventData.statusCode >= 500 ? 'error' : 
                      eventData.statusCode >= 400 ? 'warn' : 'info';
      
      logger[logLevel]('API access', {
        method: eventData.method,
        endpoint: eventData.endpoint,
        statusCode: eventData.statusCode,
        responseTime: eventData.responseTime,
        userId: eventData.userId,
        clientId: eventData.clientId,
        ip: eventData.ip,
        userAgent: eventData.userAgent,
        sensitive: eventData.sensitive || false,
        auditId: auditEntry.id
      });
    }
  }

  /**
   * Create audit entry
   */
  createAuditEntry(eventType, eventData) {
    const auditEntry = {
      id: this.generateAuditId(),
      timestamp: new Date(),
      eventType,
      eventData: {
        ...eventData,
        // Remove sensitive data from audit log
        password: undefined,
        client_secret: undefined,
        access_token: eventData.access_token ? '[REDACTED]' : undefined,
        refresh_token: eventData.refresh_token ? '[REDACTED]' : undefined
      },
      hash: null // Will be calculated below
    };
    
    // Calculate integrity hash
    auditEntry.hash = this.calculateAuditHash(auditEntry);
    
    return auditEntry;
  }

  /**
   * Add entry to audit log
   */
  addToAuditLog(auditEntry) {
    this.auditLog.set(auditEntry.id, auditEntry);
    
    // Cleanup old entries (keep last 10000 in memory)
    if (this.auditLog.size > 10000) {
      const oldestKey = this.auditLog.keys().next().value;
      this.auditLog.delete(oldestKey);
    }
  }

  /**
   * Check for failed authentication patterns
   */
  checkFailedAuthPattern(eventData) {
    const recentFailures = Array.from(this.auditLog.values())
      .filter(entry => 
        entry.eventType === 'AUTHENTICATION' &&
        !entry.eventData.success &&
        entry.eventData.ip === eventData.ip &&
        (new Date() - entry.timestamp) < 60000 // Last minute
      );
    
    if (recentFailures.length >= this.alertThresholds.failedAuthPerMinute) {
      this.logSecurityIncident({
        type: 'BRUTE_FORCE_ATTEMPT',
        description: `${recentFailures.length} failed authentication attempts from ${eventData.ip}`,
        severity: 'high',
        ip: eventData.ip,
        userAgent: eventData.userAgent
      });
    }
  }

  /**
   * Trigger security alert
   */
  triggerSecurityAlert(auditEntry) {
    // In production, this would send alerts to security team
    logger.error('SECURITY ALERT TRIGGERED', {
      auditId: auditEntry.id,
      incidentType: auditEntry.eventData.type,
      severity: auditEntry.eventData.severity,
      timestamp: auditEntry.timestamp
    });
    
    // Could integrate with external alerting systems
    // e.g., PagerDuty, Slack, email notifications
  }

  /**
   * Generate audit ID
   */
  generateAuditId() {
    return `audit_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  }

  /**
   * Calculate audit entry hash for integrity
   */
  calculateAuditHash(auditEntry) {
    const hashData = JSON.stringify({
      id: auditEntry.id,
      timestamp: auditEntry.timestamp,
      eventType: auditEntry.eventType,
      eventData: auditEntry.eventData
    });
    
    return crypto.createHash('sha256').update(hashData).digest('hex');
  }

  /**
   * Get security metrics
   */
  getSecurityMetrics() {
    return {
      ...this.securityMetrics,
      auditLogSize: this.auditLog.size,
      timestamp: new Date()
    };
  }

  /**
   * Get audit log entries
   */
  getAuditLog(filters = {}) {
    let entries = Array.from(this.auditLog.values());
    
    // Apply filters
    if (filters.eventType) {
      entries = entries.filter(entry => entry.eventType === filters.eventType);
    }
    
    if (filters.startDate) {
      entries = entries.filter(entry => entry.timestamp >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      entries = entries.filter(entry => entry.timestamp <= new Date(filters.endDate));
    }
    
    if (filters.ip) {
      entries = entries.filter(entry => entry.eventData.ip === filters.ip);
    }
    
    if (filters.clientId) {
      entries = entries.filter(entry => entry.eventData.clientId === filters.clientId);
    }
    
    // Sort by timestamp (newest first)
    entries.sort((a, b) => b.timestamp - a.timestamp);
    
    // Apply limit
    if (filters.limit) {
      entries = entries.slice(0, filters.limit);
    }
    
    return entries;
  }

  /**
   * Validate FAPI 2.0 request compliance
   */
  validateFAPICompliance(req, endpoint) {
    const violations = [];
    
    // Check for HTTPS (in production)
    if (process.env.NODE_ENV === 'production' && req.protocol !== 'https') {
      violations.push({
        requirement: 'HTTPS_REQUIRED',
        description: 'FAPI 2.0 requires HTTPS in production'
      });
    }
    
    // Check for mTLS client authentication on sensitive endpoints
    const sensitiveEndpoints = ['/token', '/par', '/userinfo'];
    if (sensitiveEndpoints.some(path => endpoint.includes(path))) {
      if (!req.client || !req.client.authMethod) {
        violations.push({
          requirement: 'MTLS_CLIENT_AUTH',
          description: 'mTLS client authentication required'
        });
      }
    }
    
    // Check for DPoP binding on token endpoint
    if (endpoint.includes('/token')) {
      const dpopHeader = req.headers.dpop;
      if (!dpopHeader) {
        violations.push({
          requirement: 'DPOP_BINDING',
          description: 'DPoP proof recommended for token endpoint'
        });
      }
    }
    
    // Log compliance check
    this.logFAPIComplianceEvent({
      endpoint,
      compliant: violations.length === 0,
      violations,
      clientId: req.client?.id,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    return violations;
  }

  /**
   * Generate security report
   */
  generateSecurityReport(timeframe = '24h') {
    const cutoffTime = new Date();
    switch (timeframe) {
      case '1h':
        cutoffTime.setHours(cutoffTime.getHours() - 1);
        break;
      case '24h':
        cutoffTime.setHours(cutoffTime.getHours() - 24);
        break;
      case '7d':
        cutoffTime.setDate(cutoffTime.getDate() - 7);
        break;
    }
    
    const recentEntries = this.getAuditLog({
      startDate: cutoffTime,
      limit: 10000
    });
    
    const report = {
      timeframe,
      generatedAt: new Date(),
      summary: {
        totalEvents: recentEntries.length,
        authenticationAttempts: recentEntries.filter(e => e.eventType === 'AUTHENTICATION').length,
        authenticationFailures: recentEntries.filter(e => e.eventType === 'AUTHENTICATION' && !e.eventData.success).length,
        tokenIssuances: recentEntries.filter(e => e.eventType === 'TOKEN_ISSUANCE').length,
        consentEvents: recentEntries.filter(e => e.eventType === 'CONSENT').length,
        securityIncidents: recentEntries.filter(e => e.eventType === 'SECURITY_INCIDENT').length,
        fapiViolations: recentEntries.filter(e => e.eventType === 'FAPI_COMPLIANCE' && !e.eventData.compliant).length
      },
      topClients: this.getTopClients(recentEntries),
      topIPs: this.getTopIPs(recentEntries),
      recentIncidents: recentEntries
        .filter(e => e.eventType === 'SECURITY_INCIDENT')
        .slice(0, 10)
    };
    
    return report;
  }

  /**
   * Get top clients by activity
   */
  getTopClients(entries) {
    const clientCounts = {};
    
    entries.forEach(entry => {
      const clientId = entry.eventData.clientId;
      if (clientId) {
        clientCounts[clientId] = (clientCounts[clientId] || 0) + 1;
      }
    });
    
    return Object.entries(clientCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([clientId, count]) => ({ clientId, count }));
  }

  /**
   * Get top IPs by activity
   */
  getTopIPs(entries) {
    const ipCounts = {};
    
    entries.forEach(entry => {
      const ip = entry.eventData.ip;
      if (ip) {
        ipCounts[ip] = (ipCounts[ip] || 0) + 1;
      }
    });
    
    return Object.entries(ipCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }));
  }

  /**
   * Initialize audit service
   */
  async initialize() {
    logger.info('Security Audit Service initialized');
    
    // Start periodic cleanup and reporting
    this.startPeriodicTasks();
  }

  /**
   * Start periodic maintenance tasks
   */
  startPeriodicTasks() {
    // Generate hourly security reports
    setInterval(() => {
      const report = this.generateSecurityReport('1h');
      
      // Log summary if there are incidents or violations
      if (report.summary.securityIncidents > 0 || report.summary.fapiViolations > 0) {
        logger.warn('Hourly security summary', report.summary);
      }
    }, 60 * 60 * 1000); // Every hour
    
    // Check for unusual patterns every 15 minutes
    setInterval(() => {
      this.checkSecurityPatterns();
    }, 15 * 60 * 1000); // Every 15 minutes
  }

  /**
   * Check for unusual security patterns
   */
  checkSecurityPatterns() {
    const recentEntries = this.getAuditLog({
      startDate: new Date(Date.now() - 15 * 60 * 1000), // Last 15 minutes
      limit: 1000
    });
    
    // Check for unusual volume of failures
    const failures = recentEntries.filter(e => 
      e.eventType === 'AUTHENTICATION' && !e.eventData.success
    );
    
    if (failures.length > 50) { // Threshold for 15 minutes
      this.logSecurityIncident({
        type: 'UNUSUAL_FAILURE_VOLUME',
        description: `Unusual volume of authentication failures: ${failures.length} in 15 minutes`,
        severity: 'medium'
      });
    }
  }

  /**
   * Shutdown audit service
   */
  async shutdown() {
    logger.info('Security Audit Service shutting down');
    
    // In production, ensure all audit logs are persisted
    const finalReport = this.generateSecurityReport('24h');
    logger.info('Final security report', finalReport.summary);
  }
}

module.exports = SecurityAuditService;