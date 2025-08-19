/**
 * Service Layer Index
 * 
 * Central service registry that provides business logic services
 * integrated with the core framework for use by Express routes.
 */

const ConsentService = require('./consentService');
const CustomerService = require('./customerService');
const ValidationService = require('./validationService');
const ProcessService = require('./processService');
const RegistryService = require('./registryService');
const IdentificationService = require('./identificationService');
const ChecksService = require('./checksService');
const SignatureService = require('./signatureService');

/**
 * Service Manager
 * Initializes and manages all business logic services
 */
class ServiceManager {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.services = {};
    this.initialized = false;
  }

  /**
   * Initialize all services
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      console.log('🔄 Initializing Service Layer...');

      // Initialize services with core framework dependencies
      this.services.consent = new ConsentService(this.coreFramework);
      this.services.customer = new CustomerService(this.coreFramework);
      this.services.validation = new ValidationService(this.coreFramework);
      this.services.process = new ProcessService(this.coreFramework);
      this.services.registry = new RegistryService(this.coreFramework);
      this.services.identification = new IdentificationService(this.coreFramework);
      this.services.checks = new ChecksService(this.coreFramework);
      this.services.signature = new SignatureService(this.coreFramework);

      // Initialize each service
      for (const [name, service] of Object.entries(this.services)) {
        if (typeof service.initialize === 'function') {
          await service.initialize();
          console.log(`✅ Service initialized: ${name}`);
        }
      }

      this.initialized = true;
      console.log('✅ Service Layer initialized successfully');

    } catch (error) {
      console.error('❌ Service Layer initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get service instance
   */
  getService(serviceName) {
    if (!this.initialized) {
      throw new Error('Service layer not initialized');
    }

    const service = this.services[serviceName];
    if (!service) {
      throw new Error(`Service not found: ${serviceName}`);
    }

    return service;
  }

  /**
   * Get all services
   */
  getAllServices() {
    return { ...this.services };
  }

  /**
   * Get service health status
   */
  async getHealthStatus() {
    const health = {
      status: 'healthy',
      services: {},
      initialized: this.initialized
    };

    if (!this.initialized) {
      health.status = 'not_initialized';
      return health;
    }

    // Check each service health
    for (const [name, service] of Object.entries(this.services)) {
      try {
        if (typeof service.getHealthStatus === 'function') {
          health.services[name] = await service.getHealthStatus();
        } else {
          health.services[name] = { status: 'healthy', info: 'No health check implemented' };
        }
      } catch (error) {
        health.services[name] = { 
          status: 'error', 
          error: error.message 
        };
        health.status = 'degraded';
      }
    }

    // If any service is unhealthy, mark overall as degraded
    const serviceStatuses = Object.values(health.services).map(s => s.status);
    if (serviceStatuses.some(status => status === 'unhealthy')) {
      health.status = 'unhealthy';
    } else if (serviceStatuses.some(status => status === 'degraded' || status === 'error')) {
      health.status = 'degraded';
    }

    return health;
  }

  /**
   * Shutdown all services
   */
  async shutdown() {
    console.log('🔄 Shutting down Service Layer...');

    for (const [name, service] of Object.entries(this.services)) {
      try {
        if (typeof service.shutdown === 'function') {
          await service.shutdown();
          console.log(`✅ Service shut down: ${name}`);
        }
      } catch (error) {
        console.error(`❌ Error shutting down service ${name}:`, error);
      }
    }

    this.initialized = false;
    console.log('✅ Service Layer shutdown complete');
  }
}

// Singleton instance
let serviceManagerInstance = null;

/**
 * Create service manager instance
 */
function createServiceManager(coreFramework) {
  if (serviceManagerInstance) {
    throw new Error('Service manager already created');
  }
  
  serviceManagerInstance = new ServiceManager(coreFramework);
  return serviceManagerInstance;
}

/**
 * Get service manager instance
 */
function getServiceManager() {
  if (!serviceManagerInstance) {
    throw new Error('Service manager not created. Call createServiceManager first.');
  }
  
  return serviceManagerInstance;
}

module.exports = {
  ServiceManager,
  createServiceManager,
  getServiceManager,
  
  // Export service classes for direct use if needed
  ConsentService,
  CustomerService,
  ValidationService,
  ProcessService,
  RegistryService,
  IdentificationService,
  ChecksService,
  SignatureService
};