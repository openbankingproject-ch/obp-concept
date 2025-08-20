/**
 * Docker Health Check Script
 * 
 * This script provides comprehensive health checking for the
 * Open API Kundenbeziehung application in containerized environments.
 */

const http = require('http');
const https = require('https');

const HEALTH_CHECK_TIMEOUT = 5000;
const APP_PORT = process.env.PORT || 3000;
const APP_HOST = process.env.HOST || 'localhost';
const USE_HTTPS = process.env.NODE_ENV === 'production';

/**
 * Perform health check
 */
async function performHealthCheck() {
  try {
    // Check main application health endpoint
    const healthStatus = await checkEndpoint('/health');
    
    if (!healthStatus.success) {
      console.error('Health check failed:', healthStatus.error);
      process.exit(1);
    }

    // Parse health response
    const healthData = JSON.parse(healthStatus.data);
    
    // Verify application is healthy
    if (healthData.status !== 'healthy') {
      console.error('Application status is not healthy:', healthData.status);
      process.exit(1);
    }

    // Check critical services
    const criticalServices = ['database', 'cache', 'security'];
    for (const service of criticalServices) {
      if (healthData.services && healthData.services[service] === 'unhealthy') {
        console.error(`Critical service ${service} is unhealthy`);
        process.exit(1);
      }
    }

    // Check FAPI 2.0 endpoints if configured
    if (process.env.NODE_ENV === 'production') {
      const discoveryStatus = await checkEndpoint('/.well-known/openid-configuration');
      if (!discoveryStatus.success) {
        console.error('OIDC discovery endpoint health check failed:', discoveryStatus.error);
        process.exit(1);
      }
    }

    console.log('Health check passed - Application is healthy');
    console.log(`Health status: ${healthData.status}`);
    console.log(`Version: ${healthData.version || 'unknown'}`);
    console.log(`Timestamp: ${healthData.timestamp}`);
    
    process.exit(0);

  } catch (error) {
    console.error('Health check error:', error.message);
    process.exit(1);
  }
}

/**
 * Check specific endpoint
 */
function checkEndpoint(path) {
  return new Promise((resolve) => {
    const protocol = USE_HTTPS ? https : http;
    const options = {
      hostname: APP_HOST,
      port: APP_PORT,
      path: path,
      method: 'GET',
      timeout: HEALTH_CHECK_TIMEOUT,
      headers: {
        'User-Agent': 'Docker-Health-Check/1.0'
      }
    };

    const req = protocol.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({
            success: true,
            statusCode: res.statusCode,
            data: data
          });
        } else {
          resolve({
            success: false,
            statusCode: res.statusCode,
            error: `HTTP ${res.statusCode}: ${data}`,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Health check timeout'
      });
    });

    req.end();
  });
}

// Execute health check
performHealthCheck();