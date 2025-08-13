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

// Import routes
const consentRoutes = require('./routes/consent');
const customerRoutes = require('./routes/customer');
const identificationRoutes = require('./routes/identification');
const checksRoutes = require('./routes/checks');
const signatureRoutes = require('./routes/signature');
const registryRoutes = require('./routes/registry');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Health check (no authentication required)
app.use('/health', healthRoutes);

// API routes with authentication
app.use('/v1/consent', authMiddleware.optional, consentRoutes);
app.use('/v1/customer', authMiddleware.required, mtlsMiddleware, customerRoutes);
app.use('/v1/identification', authMiddleware.required, identificationRoutes);
app.use('/v1/checks', authMiddleware.required, checksRoutes);
app.use('/v1/signature', authMiddleware.required, signatureRoutes);
app.use('/v1/registry', authMiddleware.optional, registryRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Open API Kundenbeziehung - Swiss National Standard',
    version: '1.0.0',
    documentation: '/docs',
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
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`🚀 Open API Kundenbeziehung server running on port ${PORT}`);
    logger.info(`📚 API Documentation available at http://localhost:${PORT}/docs`);
    logger.info(`💚 Health check available at http://localhost:${PORT}/health`);
    logger.info(`🏛️ Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;