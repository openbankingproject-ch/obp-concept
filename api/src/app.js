const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('dotenv').config();

const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');
const mtlsMiddleware = require('./middleware/mtls');
const validationMiddleware = require('./middleware/validation');

// Core Framework and Service Layer
const CoreFramework = require('./core');
const { createServiceManager } = require('./services');
const BankingExtension = require('./extensions/banking');

// Import routes
const consentRoutes = require('./routes/consent');
const customerRoutes = require('./routes/customer');
const identificationRoutes = require('./routes/identification');
const checksRoutes = require('./routes/checks');
const signatureRoutes = require('./routes/signature');
const registryRoutes = require('./routes/registry');
const healthRoutes = require('./routes/health');
const parRoutes = require('./routes/par');

const app = express();
const PORT = process.env.PORT || 3000;

// Global variables for framework and services
let coreFramework = null;
let serviceManager = null;
let bankingExtension = null;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['https://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Compression and parsing
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // requests per window
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests from this IP, please try again later.',
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/v1', limiter);

// API Documentation
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Open API Kundenbeziehung - Documentation'
}));

// Initialize Core Framework and Services
async function initializeFramework() {
  try {
    logger.info('Initializing Open API Kundenbeziehung Framework...');
    
    // Initialize core framework
    coreFramework = new CoreFramework({
      enableExtensions: true,
      enableTrustNetwork: true,
      enableAuditLogging: true,
      environment: process.env.NODE_ENV || 'development'
    });
    await coreFramework.initialize();
    
    // Initialize banking extension
    bankingExtension = new BankingExtension();
    await bankingExtension.initialize(coreFramework);
    
    // Register banking extension with core framework
    await coreFramework.registerExtension('banking', bankingExtension);
    
    // Initialize service layer
    serviceManager = createServiceManager(coreFramework);
    await serviceManager.initialize();
    
    // Inject dependencies into routes
    injectDependenciesIntoRoutes();
    
    logger.info('Framework initialization complete');
    logger.info(`Banking extension loaded (version: ${bankingExtension.version})`);
    logger.info(`Core components: ${Object.keys(coreFramework.components).length}`);
    logger.info(`Services initialized: ${Object.keys(serviceManager.services).length}`);
    
  } catch (error) {
    logger.error('Framework initialization failed:', error);
    throw error;
  }
}

// Inject dependencies into route modules
function injectDependenciesIntoRoutes() {
  // Set core framework reference in routes that support it
  if (typeof healthRoutes.setCoreFramework === 'function') {
    healthRoutes.setCoreFramework(coreFramework);
  }
  if (typeof registryRoutes.setCoreFramework === 'function') {
    registryRoutes.setCoreFramework(coreFramework);
  }
  if (typeof identificationRoutes.setCoreFramework === 'function') {
    identificationRoutes.setCoreFramework(coreFramework);
  }
  if (typeof checksRoutes.setCoreFramework === 'function') {
    checksRoutes.setCoreFramework(coreFramework);
  }
  if (typeof signatureRoutes.setCoreFramework === 'function') {
    signatureRoutes.setCoreFramework(coreFramework);
  }
  if (typeof consentRoutes.setCoreFramework === 'function') {
    consentRoutes.setCoreFramework(coreFramework);
  }
  if (typeof customerRoutes.setCoreFramework === 'function') {
    customerRoutes.setCoreFramework(coreFramework);
  }
  
  // Set service manager reference in routes that support it
  if (typeof healthRoutes.setServiceManager === 'function') {
    healthRoutes.setServiceManager(serviceManager);
  }
  if (typeof registryRoutes.setServiceManager === 'function') {
    registryRoutes.setServiceManager(serviceManager);
  }
  if (typeof identificationRoutes.setServiceManager === 'function') {
    identificationRoutes.setServiceManager(serviceManager);
  }
  if (typeof checksRoutes.setServiceManager === 'function') {
    checksRoutes.setServiceManager(serviceManager);
  }
  if (typeof signatureRoutes.setServiceManager === 'function') {
    signatureRoutes.setServiceManager(serviceManager);
  }
  if (typeof consentRoutes.setServiceManager === 'function') {
    consentRoutes.setServiceManager(serviceManager);
  }
  if (typeof customerRoutes.setServiceManager === 'function') {
    customerRoutes.setServiceManager(serviceManager);
  }
}

// Middleware to ensure framework is initialized
app.use((req, res, next) => {
  if (!coreFramework || !serviceManager) {
    return res.status(503).json({
      error: 'SERVICE_UNAVAILABLE',
      message: 'Framework is initializing, please try again',
      timestamp: new Date().toISOString()
    });
  }
  
  // Attach framework and services to request object for easy access
  req.coreFramework = coreFramework;
  req.services = serviceManager;
  req.bankingExtension = bankingExtension;
  
  next();
});

// Health check (no authentication required)
app.use('/health', healthRoutes);

// FAPI 2.0 OAuth endpoints (require client authentication)
app.use('/par', mtlsMiddleware, parRoutes);

// API routes with authentication
app.use('/v1/consent', authMiddleware.optional, consentRoutes);
app.use('/v1/customer', authMiddleware.required, mtlsMiddleware, customerRoutes);
app.use('/v1/identification', authMiddleware.required, identificationRoutes);
app.use('/v1/checks', authMiddleware.required, checksRoutes);
app.use('/v1/signature', authMiddleware.required, signatureRoutes);
app.use('/v1/registry', authMiddleware.optional, registryRoutes);

// Banking MVP endpoints
app.get('/v1/banking/info', authMiddleware.optional, (req, res) => {
  if (!bankingExtension) {
    return res.status(503).json({
      error: 'SERVICE_UNAVAILABLE',
      message: 'Banking extension not available'
    });
  }
  
  const capabilities = bankingExtension.getCapabilities();
  
  res.json({
    message: 'Swiss Banking MVP - Customer Data Exchange API',
    extension: capabilities,
    framework: {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      features: [
        'Universal customer data exchange',
        'Swiss banking compliance',
        'FAPI 2.0 security',
        'Multi-industry extensibility'
      ]
    },
    endpoints: {
      customerCheck: '/v1/customer/check',
      customerData: '/v1/customer/data',
      consent: '/v1/consent',
      identification: '/v1/identification',
      checks: '/v1/checks',
      signature: '/v1/signature',
      registry: '/v1/registry'
    },
    documentation: '/docs',
    health: '/health',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Open API Kundenbeziehung - Swiss National Standard',
    version: '1.0.0',
    mvp: 'Banking Customer Data Exchange',
    framework: 'Generic multi-industry API with banking extension',
    documentation: '/docs',
    banking_info: '/v1/banking/info',
    health: '/health',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'The requested endpoint was not found',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Graceful shutdown
async function gracefulShutdown() {
  logger.info('Shutting down gracefully...');
  
  try {
    // Shutdown service layer
    if (serviceManager) {
      await serviceManager.shutdown();
    }
    
    // Shutdown banking extension
    if (bankingExtension) {
      await bankingExtension.shutdown();
    }
    
    // Shutdown core framework
    if (coreFramework) {
      await coreFramework.shutdown();
    }
    
    logger.info('Graceful shutdown complete');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
async function startServer() {
  try {
    // Initialize framework first
    await initializeFramework();
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info('Open API Kundenbeziehung server started successfully');
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API Documentation: http://localhost:${PORT}/docs`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
      logger.info(`Banking info: http://localhost:${PORT}/v1/banking/info`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info('Banking MVP is ready for customer data exchange!');
    });
    
    // Handle server errors
    server.on('error', (error) => {
      logger.error('Server error:', error);
      process.exit(1);
    });
    
    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;