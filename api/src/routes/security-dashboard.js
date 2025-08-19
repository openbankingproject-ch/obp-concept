const express = require('express');
const logger = require('../utils/logger');
const { securityAudit } = require('../middleware/security');

const router = express.Router();

/**
 * Internal authentication middleware for security dashboard
 */
const authenticateInternal = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'unauthorized',
      error_description: 'Bearer token required for security dashboard access'
    });
  }
  
  const token = authHeader.substring(7);
  const expectedToken = process.env.SECURITY_DASHBOARD_TOKEN || process.env.INTERNAL_API_TOKEN || 'change-in-production';
  
  if (token !== expectedToken) {
    return res.status(401).json({
      error: 'unauthorized',
      error_description: 'Invalid security dashboard token'
    });
  }
  
  next();
};

/**
 * GET /security/metrics - Real-time security metrics
 */
router.get('/metrics', authenticateInternal, (req, res) => {
  try {
    const metrics = securityAudit.getSecurityMetrics();
    
    res.json({
      status: 'operational',
      metrics,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    logger.error('Security metrics retrieval failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to retrieve security metrics'
    });
  }
});

/**
 * GET /security/audit-log - Audit log entries
 */
router.get('/audit-log', authenticateInternal, (req, res) => {
  try {
    const {
      eventType,
      startDate,
      endDate,
      ip,
      clientId,
      limit = 100,
      page = 1
    } = req.query;
    
    const filters = {
      eventType,
      startDate,
      endDate,
      ip,
      clientId,
      limit: Math.min(parseInt(limit), 1000), // Max 1000 entries per request
      offset: (parseInt(page) - 1) * parseInt(limit)
    };
    
    const auditEntries = securityAudit.getAuditLog(filters);
    
    res.json({
      entries: auditEntries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: auditEntries.length
      },
      filters,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    logger.error('Audit log retrieval failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to retrieve audit log'
    });
  }
});

/**
 * GET /security/incidents - Security incidents
 */
router.get('/incidents', authenticateInternal, (req, res) => {
  try {
    const {
      severity,
      type,
      startDate,
      endDate,
      limit = 50
    } = req.query;
    
    const filters = {
      eventType: 'SECURITY_INCIDENT',
      startDate,
      endDate,
      limit: Math.min(parseInt(limit), 500)
    };
    
    let incidents = securityAudit.getAuditLog(filters);
    
    // Apply additional filters
    if (severity) {
      incidents = incidents.filter(incident => 
        incident.eventData.severity === severity
      );
    }
    
    if (type) {
      incidents = incidents.filter(incident => 
        incident.eventData.type === type
      );
    }
    
    // Add incident summary
    const severityCounts = {
      critical: incidents.filter(i => i.eventData.severity === 'critical').length,
      high: incidents.filter(i => i.eventData.severity === 'high').length,
      medium: incidents.filter(i => i.eventData.severity === 'medium').length,
      low: incidents.filter(i => i.eventData.severity === 'low').length
    };
    
    res.json({
      incidents,
      summary: {
        total: incidents.length,
        severityCounts,
        recentCritical: incidents.filter(i => 
          i.eventData.severity === 'critical' && 
          (new Date() - i.timestamp) < 24 * 60 * 60 * 1000 // Last 24 hours
        ).length
      },
      filters,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    logger.error('Security incidents retrieval failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to retrieve security incidents'
    });
  }
});

/**
 * GET /security/report - Generate security report
 */
router.get('/report', authenticateInternal, (req, res) => {
  try {
    const { timeframe = '24h' } = req.query;
    
    // Validate timeframe
    const validTimeframes = ['1h', '24h', '7d'];
    if (!validTimeframes.includes(timeframe)) {
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'Invalid timeframe. Must be one of: 1h, 24h, 7d'
      });
    }
    
    const report = securityAudit.generateSecurityReport(timeframe);
    
    res.json(report);
    
  } catch (error) {
    logger.error('Security report generation failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to generate security report'
    });
  }
});

/**
 * GET /security/fapi-compliance - FAPI compliance status
 */
router.get('/fapi-compliance', authenticateInternal, (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filters = {
      eventType: 'FAPI_COMPLIANCE',
      startDate,
      endDate,
      limit: 1000
    };
    
    const complianceEvents = securityAudit.getAuditLog(filters);
    
    // Calculate compliance statistics
    const totalChecks = complianceEvents.length;
    const compliantChecks = complianceEvents.filter(e => e.eventData.compliant).length;
    const nonCompliantChecks = totalChecks - compliantChecks;
    
    // Group violations by type
    const violationsByType = {};
    complianceEvents
      .filter(e => !e.eventData.compliant)
      .forEach(event => {
        event.eventData.violations?.forEach(violation => {
          const type = violation.requirement;
          violationsByType[type] = (violationsByType[type] || 0) + 1;
        });
      });
    
    // Recent violations (last 24 hours)
    const recentViolations = complianceEvents.filter(e => 
      !e.eventData.compliant && 
      (new Date() - e.timestamp) < 24 * 60 * 60 * 1000
    );
    
    const complianceStatus = {
      overall: {
        totalChecks,
        compliantChecks,
        nonCompliantChecks,
        compliancePercentage: totalChecks > 0 ? 
          Math.round((compliantChecks / totalChecks) * 100) : 100
      },
      violations: {
        byType: violationsByType,
        recent24h: recentViolations.length,
        mostCommon: Object.entries(violationsByType)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([type, count]) => ({ type, count }))
      },
      trends: {
        // Could add trend analysis here
        improving: nonCompliantChecks === 0,
        riskLevel: nonCompliantChecks === 0 ? 'low' : 
                  nonCompliantChecks < 10 ? 'medium' : 'high'
      },
      timestamp: new Date().toISOString()
    };
    
    res.json(complianceStatus);
    
  } catch (error) {
    logger.error('FAPI compliance status retrieval failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to retrieve FAPI compliance status'
    });
  }
});

/**
 * GET /security/health - Security service health check
 */
router.get('/health', authenticateInternal, (req, res) => {
  try {
    const metrics = securityAudit.getSecurityMetrics();
    
    // Determine health status based on metrics
    const isHealthy = 
      metrics.securityIncidents < 10 && // Less than 10 incidents
      metrics.fapiViolations < 5 && // Less than 5 FAPI violations
      metrics.auditLogSize > 0; // Audit log is working
    
    const healthStatus = {
      status: isHealthy ? 'healthy' : 'degraded',
      checks: {
        auditService: metrics.auditLogSize > 0 ? 'pass' : 'fail',
        securityIncidents: metrics.securityIncidents < 10 ? 'pass' : 'warn',
        fapiCompliance: metrics.fapiViolations < 5 ? 'pass' : 'warn',
        authenticationHealth: metrics.authenticationFailures < metrics.authenticationAttempts * 0.1 ? 'pass' : 'warn'
      },
      metrics: {
        auditLogSize: metrics.auditLogSize,
        securityIncidents: metrics.securityIncidents,
        fapiViolations: metrics.fapiViolations,
        authFailureRate: metrics.authenticationAttempts > 0 ? 
          Math.round((metrics.authenticationFailures / metrics.authenticationAttempts) * 100) : 0
      },
      timestamp: new Date().toISOString()
    };
    
    const statusCode = healthStatus.status === 'healthy' ? 200 : 
                      healthStatus.status === 'degraded' ? 200 : 503;
    
    res.status(statusCode).json(healthStatus);
    
  } catch (error) {
    logger.error('Security health check failed', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    
    res.status(503).json({
      status: 'unhealthy',
      error: 'Security health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;