const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();

// Mock core framework reference (will be injected by app.js)
let coreFramework = null;

/**
 * Set core framework reference
 */
function setCoreFramework(framework) {
  coreFramework = framework;
}

/**
 * Health check endpoint
 * GET /health
 */
router.get('/', async (req, res) => {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: Math.floor(process.uptime()),
      services: {}
    };

    // Check core framework health if available
    if (coreFramework) {
      try {
        const coreHealth = await coreFramework.getHealthStatus();
        healthStatus.services.coreFramework = coreHealth;
        
        // If core framework is unhealthy, mark overall status as degraded
        if (coreHealth.framework === 'unhealthy') {
          healthStatus.status = 'unhealthy';
        } else if (coreHealth.framework === 'degraded') {
          healthStatus.status = 'degraded';
        }
      } catch (error) {
        healthStatus.services.coreFramework = {
          status: 'error',
          error: error.message
        };
        healthStatus.status = 'degraded';
      }
    }

    // Check memory usage
    const memoryUsage = process.memoryUsage();
    healthStatus.services.memory = {
      status: memoryUsage.heapUsed < 500 * 1024 * 1024 ? 'healthy' : 'degraded', // 500MB threshold
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
    };

    // Check basic database connectivity (placeholder)
    healthStatus.services.database = {
      status: 'healthy', // TODO: Implement actual database check
      type: 'in-memory',
      latency: '<1ms'
    };

    // Check external dependencies (placeholder)
    healthStatus.services.externalServices = {
      status: 'healthy', // TODO: Implement actual external service checks
      dependencies: []
    };

    // Log health check
    logger.debug('Health check performed', {
      status: healthStatus.status,
      services: Object.keys(healthStatus.services),
      requestId: req.headers['x-request-id']
    });

    // Set HTTP status based on health
    const httpStatus = healthStatus.status === 'healthy' ? 200 : 
                      healthStatus.status === 'degraded' ? 200 : 503;

    res.status(httpStatus).json(healthStatus);

  } catch (error) {
    logger.error('Health check failed:', error);

    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: error.message,
      version: process.env.npm_package_version || '1.0.0'
    });
  }
});

/**
 * Detailed health check (with more comprehensive checks)
 * GET /health/detailed
 */
router.get('/detailed', async (req, res) => {
  try {
    const detailedHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      
      // System information
      system: {
        uptime: Math.floor(process.uptime()),
        platform: process.platform,
        nodeVersion: process.version,
        pid: process.pid,
        memory: {
          usage: process.memoryUsage(),
          free: require('os').freemem(),
          total: require('os').totalmem()
        },
        cpu: {
          usage: process.cpuUsage(),
          loadAverage: require('os').loadavg()
        }
      },

      // Core services
      services: {},

      // Performance metrics
      metrics: {
        requestsPerSecond: 0, // TODO: Implement request tracking
        averageResponseTime: 0, // TODO: Implement response time tracking
        errorRate: 0 // TODO: Implement error rate tracking
      }
    };

    // Get comprehensive core framework health
    if (coreFramework) {
      try {
        detailedHealth.services.coreFramework = await coreFramework.getHealthStatus();
        
        // Get individual component health
        const components = ['dataModels', 'consentEngine', 'processOrchestrator', 
                           'participantRegistry', 'trustNetwork', 'validationEngine', 'extensionLoader'];
        
        detailedHealth.services.components = {};
        for (const componentName of components) {
          const component = coreFramework.getComponent(componentName);
          if (component && typeof component.getHealthStatus === 'function') {
            detailedHealth.services.components[componentName] = await component.getHealthStatus();
          }
        }

        // Get extension health
        detailedHealth.services.extensions = {};
        for (const [extensionName, extension] of coreFramework.extensions) {
          if (typeof extension.getHealthStatus === 'function') {
            detailedHealth.services.extensions[extensionName] = await extension.getHealthStatus();
          }
        }

      } catch (error) {
        detailedHealth.services.coreFramework = {
          status: 'error',
          error: error.message
        };
        detailedHealth.status = 'degraded';
      }
    }

    // Determine overall health status
    const serviceStatuses = Object.values(detailedHealth.services).map(service => service.status);
    if (serviceStatuses.some(status => status === 'unhealthy')) {
      detailedHealth.status = 'unhealthy';
    } else if (serviceStatuses.some(status => status === 'degraded')) {
      detailedHealth.status = 'degraded';
    }

    const httpStatus = detailedHealth.status === 'healthy' ? 200 : 
                      detailedHealth.status === 'degraded' ? 200 : 503;

    res.status(httpStatus).json(detailedHealth);

  } catch (error) {
    logger.error('Detailed health check failed:', error);

    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Detailed health check failed',
      message: error.message
    });
  }
});

/**
 * Readiness probe (Kubernetes-style)
 * GET /health/ready
 */
router.get('/ready', async (req, res) => {
  try {
    let ready = true;
    const checks = {};

    // Check if core framework is initialized
    if (coreFramework) {
      checks.coreFramework = coreFramework.initialized ? 'ready' : 'not_ready';
      if (!coreFramework.initialized) ready = false;
    } else {
      checks.coreFramework = 'not_available';
      ready = false;
    }

    // Check if essential services are available
    checks.database = 'ready'; // TODO: Implement database readiness check
    checks.externalServices = 'ready'; // TODO: Implement external service readiness checks

    const result = {
      ready,
      timestamp: new Date().toISOString(),
      checks
    };

    res.status(ready ? 200 : 503).json(result);

  } catch (error) {
    logger.error('Readiness check failed:', error);
    res.status(503).json({
      ready: false,
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

/**
 * Liveness probe (Kubernetes-style)
 * GET /health/live
 */
router.get('/live', (req, res) => {
  // Simple liveness check - if we can respond, we're alive
  res.status(200).json({
    alive: true,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  });
});

module.exports = router;
module.exports.setCoreFramework = setCoreFramework;