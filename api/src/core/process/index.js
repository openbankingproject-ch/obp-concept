/**
 * Universal Process Orchestration Engine
 * 
 * Implements the generic 10-step reference process that can be customized
 * for any industry or use case while maintaining consistency and auditability.
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Process Orchestrator
 * Manages execution of multi-step processes with industry extensions
 */
class ProcessOrchestrator {
  constructor(config = {}) {
    this.config = {
      enableAuditTrail: true,
      maxStepTimeout: 30000, // 30 seconds
      maxRetries: 3,
      parallelSteps: true,
      ...config
    };
    
    this.processes = new Map(); // Active process instances
    this.processDefinitions = new Map(); // Process definitions
    this.stepHandlers = new Map(); // Step implementation handlers
    this.extensionHandlers = new Map(); // Extension-specific handlers
    
    // Initialize universal process definitions
    this.initializeUniversalProcesses();
  }

  async initialize() {
    console.log(' Initializing Process Orchestration Engine...');
    
    // Register universal step handlers
    this.registerUniversalStepHandlers();
    
    console.log(' Process Orchestration Engine initialized');
  }

  /**
   * Initialize universal process definitions
   */
  initializeUniversalProcesses() {
    // Universal 10-Step Customer Data Exchange Process
    this.processDefinitions.set('customer_data_exchange', {
      processId: 'customer_data_exchange',
      name: 'Universal Customer Data Exchange',
      version: '1.0',
      description: 'Generic 10-step process for customer data exchange across any industry',
      
      steps: [
        {
          stepId: 'step_1_customer_check',
          name: 'Customer Existence Check',
          type: 'validation',
          description: 'Check if customer exists in providing system',
          required: true,
          timeout: 10000,
          retries: 2,
          inputs: ['customerId', 'basicData'],
          outputs: ['customerExists', 'identificationDate', 'levelOfAssurance']
        },
        
        {
          stepId: 'step_2_participant_validation',
          name: 'Participant Validation',
          type: 'validation',
          description: 'Validate requesting and providing participants',
          required: true,
          timeout: 5000,
          retries: 1,
          inputs: ['requestingParticipant', 'providingParticipant'],
          outputs: ['participantsValid', 'trustLevel']
        },
        
        {
          stepId: 'step_3_consent_initiation',
          name: 'Consent Request Initiation',
          type: 'external_call',
          description: 'Create consent request for customer approval',
          required: true,
          timeout: 15000,
          retries: 2,
          inputs: ['customerId', 'dataCategories', 'purpose', 'expiryDate'],
          outputs: ['consentId', 'consentUrl', 'qrCode']
        },
        
        {
          stepId: 'step_4_customer_notification',
          name: 'Customer Notification',
          type: 'notification',
          description: 'Notify customer about consent request',
          required: false,
          timeout: 10000,
          retries: 1,
          parallel: true,
          inputs: ['customerId', 'consentUrl', 'contactMethod'],
          outputs: ['notificationSent', 'deliveryStatus']
        },
        
        {
          stepId: 'step_5_consent_validation',
          name: 'Consent Validation',
          type: 'validation',
          description: 'Validate customer consent approval',
          required: true,
          timeout: 300000, // 5 minutes for customer to respond
          retries: 0,
          inputs: ['consentId'],
          outputs: ['consentStatus', 'approvedCategories', 'permissions']
        },
        
        {
          stepId: 'step_6_data_preparation',
          name: 'Data Preparation',
          type: 'transformation',
          description: 'Prepare customer data based on consent',
          required: true,
          timeout: 20000,
          retries: 2,
          inputs: ['customerId', 'approvedCategories', 'permissions'],
          outputs: ['customerData', 'dataQualityScore']
        },
        
        {
          stepId: 'step_7_data_validation',
          name: 'Data Validation',
          type: 'validation',
          description: 'Validate prepared data quality and completeness',
          required: true,
          timeout: 15000,
          retries: 1,
          inputs: ['customerData', 'validationRules'],
          outputs: ['validationResult', 'qualityScore', 'warnings']
        },
        
        {
          stepId: 'step_8_secure_transmission',
          name: 'Secure Data Transmission',
          type: 'external_call',
          description: 'Securely transmit data to requesting participant',
          required: true,
          timeout: 30000,
          retries: 2,
          inputs: ['customerData', 'requestingParticipant', 'encryptionKeys'],
          outputs: ['transmissionId', 'deliveryConfirmation']
        },
        
        {
          stepId: 'step_9_audit_logging',
          name: 'Audit Trail Logging',
          type: 'storage',
          description: 'Log complete audit trail of data exchange',
          required: true,
          timeout: 10000,
          retries: 2,
          parallel: true,
          inputs: ['processId', 'allStepResults', 'participants'],
          outputs: ['auditId', 'auditRecordStored']
        },
        
        {
          stepId: 'step_10_completion_notification',
          name: 'Process Completion Notification',
          type: 'notification',
          description: 'Notify all parties of successful completion',
          required: false,
          timeout: 10000,
          retries: 1,
          parallel: true,
          inputs: ['processId', 'participants', 'summary'],
          outputs: ['notificationsSent', 'completionTime']
        }
      ],
      
      // Process-level configuration
      configuration: {
        maxExecutionTime: 3600000, // 1 hour
        enableRollback: true,
        auditLevel: 'full',
        securityLevel: 'high'
      }
    });

    // Simplified Customer Check Process
    this.processDefinitions.set('customer_check', {
      processId: 'customer_check',
      name: 'Customer Existence Check',
      version: '1.0',
      description: 'Simplified process to check if customer exists',
      
      steps: [
        {
          stepId: 'step_1_validate_input',
          name: 'Input Validation',
          type: 'validation',
          required: true,
          inputs: ['sharedCustomerHash', 'basicData'],
          outputs: ['validationResult']
        },
        
        {
          stepId: 'step_2_customer_lookup',
          name: 'Customer Database Lookup',
          type: 'external_call',
          required: true,
          inputs: ['sharedCustomerHash', 'basicData'],
          outputs: ['customerExists', 'identificationDate', 'levelOfAssurance']
        },
        
        {
          stepId: 'step_3_response_formatting',
          name: 'Format Response',
          type: 'transformation',
          required: true,
          inputs: ['customerExists', 'identificationDate', 'levelOfAssurance'],
          outputs: ['formattedResponse']
        }
      ]
    });

    // Customer Data Request Process
    this.processDefinitions.set('customer_data_request', {
      processId: 'customer_data_request',
      name: 'Customer Data Request',
      version: '1.0',
      description: 'Process to request and retrieve customer data with consent',
      
      steps: [
        {
          stepId: 'step_1_consent_validation',
          name: 'Validate Consent',
          type: 'validation',
          required: true,
          inputs: ['consentToken', 'purpose', 'dataCategories'],
          outputs: ['consentValid', 'permissions']
        },
        
        {
          stepId: 'step_2_data_retrieval',
          name: 'Retrieve Customer Data',
          type: 'external_call',
          required: true,
          inputs: ['customerId', 'permissions', 'dataCategories'],
          outputs: ['customerData']
        },
        
        {
          stepId: 'step_3_data_filtering',
          name: 'Filter Data by Permissions',
          type: 'transformation',
          required: true,
          inputs: ['customerData', 'permissions'],
          outputs: ['filteredData']
        },
        
        {
          stepId: 'step_4_audit_access',
          name: 'Audit Data Access',
          type: 'storage',
          required: true,
          parallel: true,
          inputs: ['customerId', 'requestingParticipant', 'accessedData'],
          outputs: ['auditRecorded']
        }
      ]
    });

    console.log(` Initialized ${this.processDefinitions.size} universal process definitions`);
  }

  /**
   * Register universal step handlers
   */
  registerUniversalStepHandlers() {
    // Validation step handler
    this.stepHandlers.set('validation', async (stepConfig, inputs, context) => {
      const { validationEngine } = context.coreComponents;
      
      if (stepConfig.stepId === 'step_1_customer_check') {
        return await this.handleCustomerExistenceCheck(inputs, context);
      }
      
      if (stepConfig.stepId === 'step_1_validate_input') {
        return await this.handleInputValidation(inputs, context);
      }
      
      if (stepConfig.stepId === 'step_1_consent_validation') {
        return await this.handleConsentValidation(inputs, context);
      }
      
      // Generic validation
      return await validationEngine.validate(inputs.data, inputs.schema);
    });

    // Transformation step handler
    this.stepHandlers.set('transformation', async (stepConfig, inputs, context) => {
      if (stepConfig.stepId === 'step_3_response_formatting') {
        return this.handleResponseFormatting(inputs, context);
      }
      
      if (stepConfig.stepId === 'step_3_data_filtering') {
        return this.handleDataFiltering(inputs, context);
      }
      
      // Generic transformation
      return inputs;
    });

    // External call step handler
    this.stepHandlers.set('external_call', async (stepConfig, inputs, context) => {
      if (stepConfig.stepId === 'step_2_customer_lookup') {
        return await this.handleCustomerLookup(inputs, context);
      }
      
      if (stepConfig.stepId === 'step_2_data_retrieval') {
        return await this.handleDataRetrieval(inputs, context);
      }
      
      // Generic external call
      console.log(`External call step: ${stepConfig.stepId}`);
      return { success: true };
    });

    // Storage step handler
    this.stepHandlers.set('storage', async (stepConfig, inputs, context) => {
      if (stepConfig.stepId === 'step_4_audit_access') {
        return await this.handleAuditStorage(inputs, context);
      }
      
      // Generic storage
      console.log(`Storage step: ${stepConfig.stepId}`, inputs);
      return { stored: true, timestamp: new Date().toISOString() };
    });

    // Notification step handler
    this.stepHandlers.set('notification', async (stepConfig, inputs, context) => {
      console.log(`Notification step: ${stepConfig.stepId}`, inputs);
      return { sent: true, timestamp: new Date().toISOString() };
    });
  }

  /**
   * Execute a process
   */
  async executeProcess(processId, inputs, extensionName = null, options = {}) {
    const processInstance = uuidv4();
    const startTime = new Date();
    
    try {
      // Get process definition
      const processDefinition = this.getProcessDefinition(processId, extensionName);
      if (!processDefinition) {
        throw new Error(`Process definition not found: ${processId}`);
      }

      // Initialize process context
      const context = {
        processInstance,
        processId,
        extensionName,
        startTime,
        inputs,
        options,
        results: {},
        auditTrail: [],
        coreComponents: inputs.coreComponents || {}
      };

      // Store active process
      this.processes.set(processInstance, {
        ...context,
        status: 'running',
        currentStep: null
      });

      console.log(` Starting process: ${processId} [${processInstance}]`);

      // Execute steps
      const result = await this.executeSteps(processDefinition.steps, context);

      // Mark as completed
      const activeProcess = this.processes.get(processInstance);
      if (activeProcess) {
        activeProcess.status = 'completed';
        activeProcess.endTime = new Date();
        activeProcess.duration = activeProcess.endTime - startTime;
      }

      console.log(` Process completed: ${processId} [${processInstance}] in ${Date.now() - startTime}ms`);

      return {
        success: true,
        processInstance,
        result,
        duration: Date.now() - startTime,
        auditTrail: context.auditTrail
      };

    } catch (error) {
      // Mark as failed
      const activeProcess = this.processes.get(processInstance);
      if (activeProcess) {
        activeProcess.status = 'failed';
        activeProcess.error = error.message;
        activeProcess.endTime = new Date();
      }

      console.error(` Process failed: ${processId} [${processInstance}]:`, error);

      return {
        success: false,
        processInstance,
        error: error.message,
        duration: Date.now() - startTime,
        auditTrail: context.auditTrail
      };
    } finally {
      // Clean up after some time
      setTimeout(() => {
        this.processes.delete(processInstance);
      }, 60000); // Keep for 1 minute
    }
  }

  /**
   * Execute process steps
   */
  async executeSteps(steps, context) {
    const results = {};
    const parallelSteps = [];
    
    for (const step of steps) {
      if (step.parallel && this.config.parallelSteps) {
        parallelSteps.push(step);
        continue;
      }
      
      // Execute sequential step
      const stepResult = await this.executeStep(step, context);
      results[step.stepId] = stepResult;
      
      // Update context with step results
      Object.assign(context.results, stepResult.outputs || {});
    }
    
    // Execute parallel steps
    if (parallelSteps.length > 0) {
      const parallelResults = await Promise.allSettled(
        parallelSteps.map(step => this.executeStep(step, context))
      );
      
      parallelResults.forEach((result, index) => {
        const step = parallelSteps[index];
        if (result.status === 'fulfilled') {
          results[step.stepId] = result.value;
          Object.assign(context.results, result.value.outputs || {});
        } else {
          results[step.stepId] = {
            success: false,
            error: result.reason.message,
            required: step.required
          };
        }
      });
    }
    
    return results;
  }

  /**
   * Execute individual step
   */
  async executeStep(stepConfig, context) {
    const stepStart = Date.now();
    const activeProcess = this.processes.get(context.processInstance);
    
    if (activeProcess) {
      activeProcess.currentStep = stepConfig.stepId;
    }

    try {
      console.log(` Executing step: ${stepConfig.stepId}`);

      // Prepare step inputs
      const stepInputs = this.prepareStepInputs(stepConfig, context);
      
      // Get step handler
      const handler = this.stepHandlers.get(stepConfig.type);
      if (!handler) {
        throw new Error(`No handler found for step type: ${stepConfig.type}`);
      }

      // Execute step with timeout and retries
      const stepResult = await this.executeWithRetries(
        () => handler(stepConfig, stepInputs, context),
        stepConfig.retries || this.config.maxRetries,
        stepConfig.timeout || this.config.maxStepTimeout
      );

      // Record in audit trail
      if (this.config.enableAuditTrail) {
        context.auditTrail.push({
          stepId: stepConfig.stepId,
          stepName: stepConfig.name,
          success: true,
          duration: Date.now() - stepStart,
          timestamp: new Date().toISOString(),
          inputs: stepInputs,
          outputs: stepResult
        });
      }

      console.log(` Step completed: ${stepConfig.stepId} in ${Date.now() - stepStart}ms`);

      return {
        success: true,
        outputs: stepResult,
        duration: Date.now() - stepStart
      };

    } catch (error) {
      // Record failure in audit trail
      if (this.config.enableAuditTrail) {
        context.auditTrail.push({
          stepId: stepConfig.stepId,
          stepName: stepConfig.name,
          success: false,
          error: error.message,
          duration: Date.now() - stepStart,
          timestamp: new Date().toISOString()
        });
      }

      if (stepConfig.required !== false) {
        throw error;
      }

      console.warn(` Optional step failed: ${stepConfig.stepId}: ${error.message}`);
      return {
        success: false,
        error: error.message,
        duration: Date.now() - stepStart
      };
    }
  }

  /**
   * Prepare inputs for step execution
   */
  prepareStepInputs(stepConfig, context) {
    const stepInputs = {};
    
    // Map required inputs from context
    if (stepConfig.inputs) {
      for (const inputName of stepConfig.inputs) {
        stepInputs[inputName] = context.inputs[inputName] || context.results[inputName];
      }
    }
    
    return stepInputs;
  }

  /**
   * Execute function with retries and timeout
   */
  async executeWithRetries(fn, maxRetries, timeout) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await Promise.race([
          fn(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Step timeout')), timeout)
          )
        ]);
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        console.warn(`Step attempt ${attempt + 1} failed, retrying:`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      }
    }
  }

  /**
   * Step implementation methods
   */
  async handleCustomerExistenceCheck(inputs, context) {
    // This would typically call the customer database
    console.log('Checking customer existence for:', inputs.customerId);
    return {
      customerExists: true,
      identificationDate: '2024-01-10T10:00:00Z',
      levelOfAssurance: 'high'
    };
  }

  async handleInputValidation(inputs, context) {
    const { validationEngine } = context.coreComponents;
    return validationEngine?.validate(inputs, 'customerCheck') || { valid: true };
  }

  async handleConsentValidation(inputs, context) {
    const { consentEngine } = context.coreComponents;
    return consentEngine?.validate(inputs.consentToken, inputs.purpose) || { valid: true };
  }

  handleResponseFormatting(inputs, context) {
    return {
      formattedResponse: {
        match: inputs.customerExists,
        identificationDate: inputs.identificationDate,
        levelOfAssurance: inputs.levelOfAssurance,
        validUntil: new Date(Date.now() + 24 * 30 * 24 * 60 * 60 * 1000).toISOString() // 24 months
      }
    };
  }

  handleDataFiltering(inputs, context) {
    // Filter customer data based on consent permissions
    const { customerData, permissions } = inputs;
    const filteredData = { ...customerData };
    
    // Apply filtering logic based on permissions
    if (!permissions?.read) {
      return { filteredData: null };
    }
    
    return { filteredData };
  }

  async handleCustomerLookup(inputs, context) {
    // This would typically query the customer database
    console.log('Looking up customer:', inputs.sharedCustomerHash);
    return {
      customerExists: true,
      identificationDate: '2024-01-10T10:00:00Z',
      levelOfAssurance: 'high'
    };
  }

  async handleDataRetrieval(inputs, context) {
    console.log('Retrieving customer data for:', inputs.customerId);
    return {
      customerData: {
        basicData: { /* customer data */ },
        metadata: { accessedAt: new Date().toISOString() }
      }
    };
  }

  async handleAuditStorage(inputs, context) {
    console.log('Storing audit record for data access:', inputs.customerId);
    return {
      auditRecorded: true,
      auditId: uuidv4(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get process definition (with extension support)
   */
  getProcessDefinition(processId, extensionName = null) {
    if (extensionName && this.extensionHandlers.has(extensionName)) {
      const handler = this.extensionHandlers.get(extensionName);
      const customProcess = handler.getProcessDefinition?.(processId);
      if (customProcess) {
        return customProcess;
      }
    }
    
    return this.processDefinitions.get(processId);
  }

  /**
   * Register extension handler
   */
  registerExtensionHandler(extensionName, handler) {
    this.extensionHandlers.set(extensionName, handler);
    console.log(` Registered process handler for extension: ${extensionName}`);
  }

  /**
   * Get process status
   */
  getProcessStatus(processInstance) {
    return this.processes.get(processInstance);
  }

  /**
   * List active processes
   */
  listActiveProcesses() {
    return Array.from(this.processes.values());
  }

  async getHealthStatus() {
    return {
      status: 'healthy',
      processes: {
        definitions: this.processDefinitions.size,
        active: this.processes.size,
        extensions: this.extensionHandlers.size
      }
    };
  }

  async shutdown() {
    console.log(' Shutting down Process Orchestrator...');
    // Wait for active processes to complete or timeout
    console.log(' Process Orchestrator shutdown complete');
  }
}

module.exports = ProcessOrchestrator;