/**
 * Banking Extension Module
 * 
 * Industry-specific extension for Swiss banking compliance and processes.
 * Extends the generic core framework with banking-specific functionality.
 */

const BankingDataModels = require('./models');
const BankingValidation = require('./validation');
const BankingProcesses = require('./processes');
const BankingCompliance = require('./compliance');

class BankingExtension {
  constructor() {
    this.extensionName = 'banking';
    this.version = '1.0.0';
    this.industry = 'banking';
    this.ecosystem = 'swiss_banking';
    this.initialized = false;

    // Extension components
    this.dataModels = new BankingDataModels();
    this.validation = new BankingValidation();
    this.processes = new BankingProcesses();
    this.compliance = new BankingCompliance();
  }

  /**
   * Initialize the banking extension
   */
  async initialize(coreFramework) {
    try {
      console.log('🏦 Initializing Banking Extension...');

      this.coreFramework = coreFramework;

      // Initialize extension components
      await this.dataModels.initialize(coreFramework);
      await this.validation.initialize(coreFramework);
      await this.processes.initialize(coreFramework);
      await this.compliance.initialize(coreFramework);

      // Register banking-specific schemas
      await this.registerBankingSchemas(coreFramework);

      // Register banking-specific processes
      await this.registerBankingProcesses(coreFramework);

      // Register banking compliance rules
      await this.registerComplianceRules(coreFramework);

      this.initialized = true;
      console.log('✅ Banking Extension initialized successfully');

      return {
        success: true,
        extension: this.extensionName,
        version: this.version,
        components: ['dataModels', 'validation', 'processes', 'compliance']
      };

    } catch (error) {
      console.error('❌ Banking Extension initialization failed:', error);
      throw error;
    }
  }

  /**
   * Register banking-specific schemas
   */
  async registerBankingSchemas(coreFramework) {
    const validationEngine = coreFramework.getComponent('validationEngine');
    if (!validationEngine) return;

    // Register enhanced customer schemas for banking
    validationEngine.registerExtensionSchema(this.extensionName, 'bankingCustomer', 
      this.dataModels.getBankingCustomerSchema()
    );

    // Register KYC data schema
    validationEngine.registerExtensionSchema(this.extensionName, 'kycData', 
      this.dataModels.getKycDataSchema()
    );

    // Register compliance data schema
    validationEngine.registerExtensionSchema(this.extensionName, 'complianceData', 
      this.dataModels.getComplianceDataSchema()
    );

    // Register account data schema
    validationEngine.registerExtensionSchema(this.extensionName, 'accountData', 
      this.dataModels.getAccountDataSchema()
    );

    console.log('📋 Banking schemas registered');
  }

  /**
   * Register banking-specific processes
   */
  async registerBankingProcesses(coreFramework) {
    const processOrchestrator = coreFramework.getComponent('processOrchestrator');
    if (!processOrchestrator) return;

    // Register banking customer onboarding process
    processOrchestrator.registerProcess('banking_customer_onboarding', 
      this.processes.getBankingOnboardingProcess()
    );

    // Register KYC enhancement process
    processOrchestrator.registerProcess('banking_kyc_enhancement', 
      this.processes.getKycEnhancementProcess()
    );

    // Register Swiss banking compliance check
    processOrchestrator.registerProcess('swiss_banking_compliance', 
      this.processes.getSwissBankingComplianceProcess()
    );

    // Register account opening process
    processOrchestrator.registerProcess('banking_account_opening', 
      this.processes.getAccountOpeningProcess()
    );

    console.log('⚙️ Banking processes registered');
  }

  /**
   * Register banking compliance rules
   */
  async registerComplianceRules(coreFramework) {
    // Register Swiss banking specific compliance rules
    this.compliance.registerSwissBankingRules(coreFramework);
    
    // Register FINMA compliance requirements
    this.compliance.registerFinmaCompliance(coreFramework);
    
    // Register anti-money laundering rules
    this.compliance.registerAmlRules(coreFramework);

    console.log('📜 Banking compliance rules registered');
  }

  /**
   * Transform universal data to banking format
   */
  transformFromUniversal(universalData) {
    return this.dataModels.transformFromUniversal(universalData);
  }

  /**
   * Transform banking data to universal format
   */
  transformToUniversal(bankingData) {
    return this.dataModels.transformToUniversal(bankingData);
  }

  /**
   * Validate banking-specific data
   */
  async validateBankingData(data, schemaName) {
    return this.validation.validate(data, schemaName);
  }

  /**
   * Execute banking-specific process
   */
  async executeBankingProcess(processName, data) {
    return this.processes.execute(processName, data);
  }

  /**
   * Check banking compliance
   */
  async checkCompliance(customerData, complianceType) {
    return this.compliance.check(customerData, complianceType);
  }

  /**
   * Get banking extension capabilities
   */
  getCapabilities() {
    return {
      name: this.extensionName,
      version: this.version,
      industry: this.industry,
      ecosystem: this.ecosystem,
      features: [
        'swiss_banking_compliance',
        'finma_regulations',
        'kyc_enhancement',
        'aml_screening',
        'customer_onboarding',
        'account_management',
        'regulatory_reporting'
      ],
      dataModels: [
        'bankingCustomer',
        'kycData', 
        'complianceData',
        'accountData'
      ],
      processes: [
        'banking_customer_onboarding',
        'banking_kyc_enhancement', 
        'swiss_banking_compliance',
        'banking_account_opening'
      ],
      validationSchemas: [
        'bankingCustomer',
        'kycData',
        'complianceData',
        'accountData'
      ]
    };
  }

  /**
   * Get extension health status
   */
  async getHealthStatus() {
    try {
      const componentHealth = {
        dataModels: await this.dataModels.getHealthStatus(),
        validation: await this.validation.getHealthStatus(),
        processes: await this.processes.getHealthStatus(),
        compliance: await this.compliance.getHealthStatus()
      };

      const allHealthy = Object.values(componentHealth).every(h => h.status === 'healthy');

      return {
        extension: this.extensionName,
        status: allHealthy ? 'healthy' : 'degraded',
        version: this.version,
        initialized: this.initialized,
        components: componentHealth
      };

    } catch (error) {
      return {
        extension: this.extensionName,
        status: 'error',
        error: error.message,
        initialized: this.initialized
      };
    }
  }

  /**
   * Shutdown extension
   */
  async shutdown() {
    console.log('🔄 Shutting down Banking Extension...');
    
    try {
      await this.compliance.shutdown();
      await this.processes.shutdown();
      await this.validation.shutdown();
      await this.dataModels.shutdown();
      
      this.initialized = false;
      console.log('✅ Banking Extension shutdown complete');
    } catch (error) {
      console.error('❌ Error shutting down Banking Extension:', error);
      throw error;
    }
  }
}

module.exports = BankingExtension;