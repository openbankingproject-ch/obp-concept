/**
 * Validation Service
 * 
 * Business logic layer that provides validation capabilities
 * integrated with the core framework validation engine.
 */

class ValidationService {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.initialized = false;
  }

  async initialize() {
    console.log(' Initializing Validation Service...');
    this.initialized = true;
    console.log(' Validation Service initialized');
  }

  /**
   * Validate data with optional extension support
   */
  async validate(data, schemaName, options = {}) {
    try {
      if (!this.coreFramework) {
        return {
          valid: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE',
          message: 'Validation engine not available'
        };
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        return {
          valid: false,
          error: 'VALIDATION_ENGINE_UNAVAILABLE',
          message: 'Validation engine component not available'
        };
      }

      const result = await validationEngine.validate(
        data, 
        schemaName, 
        options.extensionName,
        options.validationOptions
      );

      return {
        valid: result.valid,
        errors: result.errors || [],
        warnings: result.warnings || [],
        value: result.value,
        quality: result.quality,
        timestamp: result.timestamp,
        duration: result.duration
      };

    } catch (error) {
      console.error('Error in validation:', error);
      return {
        valid: false,
        error: 'VALIDATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Bulk validation for multiple data items
   */
  async validateBulk(dataArray, schemaName, options = {}) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE',
          message: 'Validation engine not available'
        };
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        return {
          success: false,
          error: 'VALIDATION_ENGINE_UNAVAILABLE',
          message: 'Validation engine component not available'
        };
      }

      const result = await validationEngine.validateBulk(
        dataArray,
        schemaName,
        options.extensionName
      );

      return {
        success: true,
        results: result.results,
        summary: result.summary
      };

    } catch (error) {
      console.error('Error in bulk validation:', error);
      return {
        success: false,
        error: 'VALIDATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Validate API request (Express middleware helper)
   */
  validateRequest(schemaName) {
    return async (req, res, next) => {
      try {
        const validation = await this.validate(req.body, schemaName, {
          extensionName: req.headers['x-extension'] || null,
          validationOptions: {
            includeQuality: true
          }
        });

        if (!validation.valid) {
          return res.status(400).json({
            error: 'VALIDATION_FAILED',
            message: 'Request validation failed',
            details: validation.errors,
            warnings: validation.warnings,
            timestamp: new Date().toISOString()
          });
        }

        // Attach validated data to request
        req.validatedData = validation.value;
        req.dataQuality = validation.quality;

        next();
      } catch (error) {
        console.error('Request validation error:', error);
        res.status(500).json({
          error: 'VALIDATION_ENGINE_ERROR',
          message: 'Validation engine error',
          timestamp: new Date().toISOString()
        });
      }
    };
  }

  /**
   * Register custom validation schema
   */
  async registerSchema(schemaName, schema, extensionName = null) {
    try {
      if (!this.coreFramework) {
        throw new Error('Core framework not available');
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        throw new Error('Validation engine not available');
      }

      if (extensionName) {
        validationEngine.registerExtensionSchema(extensionName, schemaName, schema);
      } else {
        // This would need to be added to the ValidationEngine class
        validationEngine.customValidators.set(schemaName, schema);
      }

      return { success: true, schemaName, extensionName };

    } catch (error) {
      console.error('Error registering schema:', error);
      throw error;
    }
  }

  /**
   * Get validation statistics
   */
  async getValidationStats() {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        return {
          success: false,
          error: 'VALIDATION_ENGINE_UNAVAILABLE'
        };
      }

      const stats = validationEngine.getValidationStats();
      
      return {
        success: true,
        stats: {
          ...stats,
          framework: 'openapi_kundenbeziehung',
          timestamp: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('Error getting validation stats:', error);
      return {
        success: false,
        error: 'STATS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Clear validation cache
   */
  async clearCache() {
    try {
      if (!this.coreFramework) {
        throw new Error('Core framework not available');
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        throw new Error('Validation engine not available');
      }

      validationEngine.clearCache();
      
      return { success: true, message: 'Validation cache cleared' };

    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }

  /**
   * List available schemas
   */
  async listSchemas() {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        return {
          success: false,
          error: 'VALIDATION_ENGINE_UNAVAILABLE'
        };
      }

      const schemas = validationEngine.listSchemas();
      
      return {
        success: true,
        schemas: {
          ...schemas,
          timestamp: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('Error listing schemas:', error);
      return {
        success: false,
        error: 'LISTING_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Assess data quality
   */
  async assessDataQuality(data, schemaName, options = {}) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (!validationEngine) {
        return {
          success: false,
          error: 'VALIDATION_ENGINE_UNAVAILABLE'
        };
      }

      // First validate to get schema
      const validation = await validationEngine.validate(data, schemaName, options.extensionName);
      
      if (!validation.valid) {
        return {
          success: false,
          error: 'VALIDATION_REQUIRED',
          message: 'Data must be valid before quality assessment'
        };
      }

      const schema = validationEngine.getValidationSchema(schemaName, options.extensionName);
      const quality = await validationEngine.assessDataQuality(data, schema, options.extensionName);

      return {
        success: true,
        quality: {
          ...quality,
          schemaName,
          extensionName: options.extensionName,
          timestamp: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('Error assessing data quality:', error);
      return {
        success: false,
        error: 'QUALITY_ASSESSMENT_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Validate customer hash generation
   */
  validateCustomerHash(basicData, providedHash) {
    try {
      if (!this.coreFramework) {
        return {
          valid: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const dataModels = this.coreFramework.getComponent('dataModels');
      if (!dataModels) {
        return {
          valid: false,
          error: 'DATA_MODELS_UNAVAILABLE'
        };
      }

      const calculatedHash = dataModels.generateCustomerHash(basicData);
      const valid = calculatedHash === providedHash;

      return {
        valid,
        calculatedHash,
        providedHash,
        message: valid ? 'Hash validation successful' : 'Hash mismatch'
      };

    } catch (error) {
      console.error('Error validating customer hash:', error);
      return {
        valid: false,
        error: 'HASH_VALIDATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    try {
      const stats = await this.getValidationStats();
      
      return {
        status: this.initialized ? 'healthy' : 'not_initialized',
        initialized: this.initialized,
        coreFrameworkIntegration: !!this.coreFramework,
        validationEngine: stats.success ? 'available' : 'unavailable',
        stats: stats.success ? stats.stats : null
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        initialized: this.initialized
      };
    }
  }

  /**
   * Shutdown
   */
  async shutdown() {
    console.log(' Shutting down Validation Service...');
    this.initialized = false;
    console.log(' Validation Service shutdown complete');
  }
}

module.exports = ValidationService;