/**
 * Universal Extension System
 * 
 * Provides plugin architecture for industry-specific extensions
 * that can customize behavior while maintaining core compatibility.
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Extension Loader and Manager
 */
class ExtensionLoader {
  constructor(config = {}) {
    this.config = {
      extensionsPath: path.join(__dirname, '../../extensions'),
      enableHotReload: false,
      enableSandbox: true,
      maxExtensions: 10,
      ...config
    };
    
    this.extensions = new Map(); // Loaded extensions
    this.extensionMetadata = new Map(); // Extension metadata
    this.hooks = new Map(); // Extension hooks
    this.watchers = new Map(); // File watchers for hot reload
  }

  async initialize() {
    console.log('🔄 Initializing Extension System...');
    
    // Ensure extensions directory exists
    await this.ensureExtensionsDirectory();
    
    // Register core hooks
    this.registerCoreHooks();
    
    console.log('✅ Extension System initialized');
  }

  /**
   * Ensure extensions directory exists
   */
  async ensureExtensionsDirectory() {
    try {
      await fs.access(this.config.extensionsPath);
    } catch (error) {
      await fs.mkdir(this.config.extensionsPath, { recursive: true });
      console.log(`📁 Created extensions directory: ${this.config.extensionsPath}`);
    }
  }

  /**
   * Register core hooks that extensions can use
   */
  registerCoreHooks() {
    // Data processing hooks
    this.hooks.set('before_customer_check', []);
    this.hooks.set('after_customer_check', []);
    this.hooks.set('before_data_request', []);
    this.hooks.set('after_data_request', []);
    
    // Consent hooks
    this.hooks.set('before_consent_create', []);
    this.hooks.set('after_consent_create', []);
    this.hooks.set('before_consent_approve', []);
    this.hooks.set('after_consent_approve', []);
    
    // Process hooks
    this.hooks.set('before_process_start', []);
    this.hooks.set('after_process_complete', []);
    this.hooks.set('process_step_error', []);
    
    // Validation hooks
    this.hooks.set('custom_validation', []);
    this.hooks.set('data_transformation', []);
    
    // Security hooks
    this.hooks.set('auth_enhance', []);
    this.hooks.set('audit_event', []);
  }

  /**
   * Discover available extensions
   */
  async discoverExtensions() {
    try {
      const entries = await fs.readdir(this.config.extensionsPath, { withFileTypes: true });
      const extensions = [];
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const extensionPath = path.join(this.config.extensionsPath, entry.name);
          const extension = await this.loadExtensionMetadata(extensionPath, entry.name);
          if (extension) {
            extensions.push(extension);
          }
        }
      }
      
      console.log(`🔍 Discovered ${extensions.length} extensions`);
      return extensions;
      
    } catch (error) {
      console.error('Error discovering extensions:', error);
      return [];
    }
  }

  /**
   * Load extension metadata
   */
  async loadExtensionMetadata(extensionPath, name) {
    try {
      const manifestPath = path.join(extensionPath, 'manifest.json');
      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);
      
      // Validate manifest
      const validation = this.validateManifest(manifest);
      if (!validation.valid) {
        console.error(`Invalid manifest for extension ${name}:`, validation.errors);
        return null;
      }
      
      return {
        name: manifest.name || name,
        version: manifest.version,
        description: manifest.description,
        author: manifest.author,
        industry: manifest.industry,
        ecosystem: manifest.ecosystem,
        entryPoint: manifest.entryPoint || 'index.js',
        dependencies: manifest.dependencies || {},
        capabilities: manifest.capabilities || [],
        hooks: manifest.hooks || [],
        permissions: manifest.permissions || [],
        path: extensionPath
      };
      
    } catch (error) {
      console.warn(`Could not load manifest for extension ${name}:`, error.message);
      return null;
    }
  }

  /**
   * Validate extension manifest
   */
  validateManifest(manifest) {
    const errors = [];
    
    if (!manifest.name) {
      errors.push('name is required');
    }
    
    if (!manifest.version) {
      errors.push('version is required');
    }
    
    if (!manifest.industry) {
      errors.push('industry is required');
    }
    
    if (!manifest.entryPoint) {
      errors.push('entryPoint is required');
    }
    
    // Validate version format
    if (manifest.version && !/^\d+\.\d+\.\d+/.test(manifest.version)) {
      errors.push('version must be in semver format (e.g., 1.0.0)');
    }
    
    // Validate industry
    const validIndustries = ['banking', 'insurance', 'real_estate', 'mobility', 'retail', 'government', 'healthcare', 'education'];
    if (manifest.industry && !validIndustries.includes(manifest.industry)) {
      errors.push(`industry must be one of: ${validIndustries.join(', ')}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Load extension
   */
  async loadExtension(extensionMetadata) {
    try {
      const { name, path: extensionPath, entryPoint } = extensionMetadata;
      
      // Check if already loaded
      if (this.extensions.has(name)) {
        throw new Error(`Extension ${name} is already loaded`);
      }
      
      // Check extension limit
      if (this.extensions.size >= this.config.maxExtensions) {
        throw new Error(`Maximum number of extensions (${this.config.maxExtensions}) reached`);
      }
      
      // Load extension module
      const extensionModulePath = path.join(extensionPath, entryPoint);
      
      // Clear require cache for hot reload
      if (this.config.enableHotReload) {
        delete require.cache[require.resolve(extensionModulePath)];
      }
      
      const ExtensionClass = require(extensionModulePath);
      
      // Validate extension class
      if (!ExtensionClass || typeof ExtensionClass !== 'function') {
        throw new Error(`Extension ${name} does not export a constructor function`);
      }
      
      // Create extension instance
      const extension = new ExtensionClass(extensionMetadata, this.createExtensionContext(name));
      
      // Validate extension instance
      if (!this.validateExtensionInstance(extension, extensionMetadata)) {
        throw new Error(`Extension ${name} instance validation failed`);
      }
      
      // Store extension
      this.extensions.set(name, extension);
      this.extensionMetadata.set(name, extensionMetadata);
      
      // Register extension hooks
      if (extensionMetadata.hooks) {
        await this.registerExtensionHooks(name, extension, extensionMetadata.hooks);
      }
      
      // Setup hot reload watcher
      if (this.config.enableHotReload) {
        await this.setupHotReload(name, extensionPath);
      }
      
      console.log(`✅ Extension loaded: ${name} v${extensionMetadata.version}`);
      
      return extension;
      
    } catch (error) {
      console.error(`❌ Failed to load extension ${extensionMetadata.name}:`, error);
      throw error;
    }
  }

  /**
   * Create extension context
   */
  createExtensionContext(extensionName) {
    return {
      // Extension identification
      name: extensionName,
      
      // Logging with extension prefix
      log: {
        info: (message, ...args) => console.log(`[${extensionName}] ${message}`, ...args),
        warn: (message, ...args) => console.warn(`[${extensionName}] ${message}`, ...args),
        error: (message, ...args) => console.error(`[${extensionName}] ${message}`, ...args),
        debug: (message, ...args) => console.debug(`[${extensionName}] ${message}`, ...args)
      },
      
      // Hook registration
      registerHook: (hookName, handler) => this.registerHook(hookName, handler, extensionName),
      
      // Event emission
      emit: (eventName, data) => this.emitEvent(extensionName, eventName, data),
      
      // Configuration access
      getConfig: () => this.getExtensionConfig(extensionName),
      setConfig: (config) => this.setExtensionConfig(extensionName, config),
      
      // Storage access (scoped to extension)
      storage: {
        get: (key) => this.getExtensionStorage(extensionName, key),
        set: (key, value) => this.setExtensionStorage(extensionName, key, value),
        delete: (key) => this.deleteExtensionStorage(extensionName, key)
      },
      
      // HTTP client for external calls
      http: this.createHttpClient(extensionName),
      
      // Validation helpers
      validate: (data, schema) => this.validateWithSchema(data, schema, extensionName)
    };
  }

  /**
   * Validate extension instance
   */
  validateExtensionInstance(extension, metadata) {
    // Required methods
    const requiredMethods = ['initialize', 'getName', 'getVersion'];
    for (const method of requiredMethods) {
      if (typeof extension[method] !== 'function') {
        console.error(`Extension missing required method: ${method}`);
        return false;
      }
    }
    
    // Validate name matches
    if (extension.getName() !== metadata.name) {
      console.error('Extension name mismatch');
      return false;
    }
    
    // Validate version matches
    if (extension.getVersion() !== metadata.version) {
      console.error('Extension version mismatch');
      return false;
    }
    
    return true;
  }

  /**
   * Register extension hooks
   */
  async registerExtensionHooks(extensionName, extension, hookNames) {
    for (const hookName of hookNames) {
      if (this.hooks.has(hookName)) {
        const hookHandler = extension[`handle_${hookName}`];
        if (typeof hookHandler === 'function') {
          this.hooks.get(hookName).push({
            extension: extensionName,
            handler: hookHandler.bind(extension)
          });
          console.log(`🔗 Registered hook: ${extensionName}.${hookName}`);
        }
      } else {
        console.warn(`Unknown hook: ${hookName} from extension ${extensionName}`);
      }
    }
  }

  /**
   * Execute hooks
   */
  async executeHooks(hookName, data, context = {}) {
    const hooks = this.hooks.get(hookName);
    if (!hooks || hooks.length === 0) {
      return data;
    }
    
    let result = data;
    
    for (const hook of hooks) {
      try {
        const hookResult = await hook.handler(result, context);
        if (hookResult !== undefined) {
          result = hookResult;
        }
      } catch (error) {
        console.error(`Hook execution failed: ${hook.extension}.${hookName}:`, error);
        // Continue with other hooks unless critical
      }
    }
    
    return result;
  }

  /**
   * Get extension
   */
  getExtension(name) {
    return this.extensions.get(name);
  }

  /**
   * List loaded extensions
   */
  listExtensions() {
    return Array.from(this.extensions.entries()).map(([name, extension]) => ({
      name,
      version: extension.getVersion(),
      description: extension.getDescription?.() || '',
      industry: this.extensionMetadata.get(name)?.industry,
      ecosystem: this.extensionMetadata.get(name)?.ecosystem,
      capabilities: this.extensionMetadata.get(name)?.capabilities,
      loaded: true,
      active: extension.isActive?.() !== false
    }));
  }

  /**
   * Unload extension
   */
  async unloadExtension(name) {
    const extension = this.extensions.get(name);
    if (!extension) {
      throw new Error(`Extension not found: ${name}`);
    }
    
    try {
      // Call extension shutdown if available
      if (typeof extension.shutdown === 'function') {
        await extension.shutdown();
      }
      
      // Remove hooks
      for (const [hookName, hooks] of this.hooks.entries()) {
        const filtered = hooks.filter(h => h.extension !== name);
        this.hooks.set(hookName, filtered);
      }
      
      // Remove from maps
      this.extensions.delete(name);
      this.extensionMetadata.delete(name);
      
      // Stop hot reload watcher
      if (this.watchers.has(name)) {
        this.watchers.get(name).close();
        this.watchers.delete(name);
      }
      
      console.log(`✅ Extension unloaded: ${name}`);
      
    } catch (error) {
      console.error(`❌ Error unloading extension ${name}:`, error);
      throw error;
    }
  }

  /**
   * Hot reload support
   */
  async setupHotReload(extensionName, extensionPath) {
    try {
      const fs = require('fs');
      const watcher = fs.watch(extensionPath, { recursive: true }, async (eventType, filename) => {
        if (filename && (filename.endsWith('.js') || filename.endsWith('.json'))) {
          console.log(`🔄 Hot reloading extension: ${extensionName} (${filename} changed)`);
          
          try {
            // Unload current extension
            await this.unloadExtension(extensionName);
            
            // Reload extension metadata
            const metadata = await this.loadExtensionMetadata(extensionPath, extensionName);
            if (metadata) {
              // Reload extension
              await this.loadExtension(metadata);
            }
          } catch (error) {
            console.error(`Hot reload failed for ${extensionName}:`, error);
          }
        }
      });
      
      this.watchers.set(extensionName, watcher);
      
    } catch (error) {
      console.warn(`Could not setup hot reload for ${extensionName}:`, error);
    }
  }

  /**
   * Extension storage (simple in-memory implementation)
   */
  extensionStorage = new Map();

  getExtensionStorage(extensionName, key) {
    const storageKey = `${extensionName}:${key}`;
    return this.extensionStorage.get(storageKey);
  }

  setExtensionStorage(extensionName, key, value) {
    const storageKey = `${extensionName}:${key}`;
    this.extensionStorage.set(storageKey, value);
  }

  deleteExtensionStorage(extensionName, key) {
    const storageKey = `${extensionName}:${key}`;
    return this.extensionStorage.delete(storageKey);
  }

  /**
   * Extension configuration
   */
  extensionConfigs = new Map();

  getExtensionConfig(extensionName) {
    return this.extensionConfigs.get(extensionName) || {};
  }

  setExtensionConfig(extensionName, config) {
    this.extensionConfigs.set(extensionName, config);
  }

  /**
   * Create HTTP client for extension
   */
  createHttpClient(extensionName) {
    // Simple HTTP client wrapper with logging
    const axios = require('axios');
    
    return {
      get: (url, config) => {
        console.log(`[${extensionName}] HTTP GET: ${url}`);
        return axios.get(url, config);
      },
      post: (url, data, config) => {
        console.log(`[${extensionName}] HTTP POST: ${url}`);
        return axios.post(url, data, config);
      },
      put: (url, data, config) => {
        console.log(`[${extensionName}] HTTP PUT: ${url}`);
        return axios.put(url, data, config);
      },
      delete: (url, config) => {
        console.log(`[${extensionName}] HTTP DELETE: ${url}`);
        return axios.delete(url, config);
      }
    };
  }

  /**
   * Register hook
   */
  registerHook(hookName, handler, extensionName) {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    
    this.hooks.get(hookName).push({
      extension: extensionName,
      handler
    });
  }

  /**
   * Emit event
   */
  emitEvent(extensionName, eventName, data) {
    console.log(`📡 Event from ${extensionName}: ${eventName}`, data);
    // TODO: Implement event bus
  }

  /**
   * Validate with schema
   */
  validateWithSchema(data, schema, extensionName) {
    // TODO: Implement schema validation
    console.log(`[${extensionName}] Validating data with schema`);
    return { valid: true };
  }

  async getHealthStatus() {
    const extensions = Array.from(this.extensions.entries());
    const active = extensions.filter(([name, ext]) => ext.isActive?.() !== false).length;
    
    return {
      status: active === extensions.length ? 'healthy' : 'degraded',
      extensions: {
        total: extensions.length,
        active,
        loaded: this.extensions.size
      },
      hooks: this.hooks.size,
      hotReload: this.config.enableHotReload
    };
  }

  async shutdown() {
    console.log('🔄 Shutting down Extension System...');
    
    // Shutdown all extensions
    for (const [name, extension] of this.extensions) {
      try {
        if (typeof extension.shutdown === 'function') {
          await extension.shutdown();
        }
      } catch (error) {
        console.error(`Error shutting down extension ${name}:`, error);
      }
    }
    
    // Close watchers
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }
    
    this.extensions.clear();
    this.extensionMetadata.clear();
    this.watchers.clear();
    
    console.log('✅ Extension System shutdown complete');
  }
}

module.exports = ExtensionLoader;