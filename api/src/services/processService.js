/**
 * Process Service
 * 
 * Business logic layer for process orchestration that integrates
 * with the core framework process engine.
 */

class ProcessService {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.initialized = false;
  }

  async initialize() {
    console.log(' Initializing Process Service...');
    this.initialized = true;
    console.log(' Process Service initialized');
  }

  /**
   * Execute a process workflow
   */
  async executeProcess(processName, processData, userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE',
          message: 'Core framework not available'
        };
      }

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (!processOrchestrator) {
        return {
          success: false,
          error: 'PROCESS_ORCHESTRATOR_UNAVAILABLE',
          message: 'Process orchestrator not available'
        };
      }

      // Add user context to process data
      const enhancedData = {
        ...processData,
        userContext,
        coreComponents: this.coreFramework.components,
        executedBy: userContext.institutionId,
        requestId: require('uuid').v4(),
        timestamp: new Date().toISOString()
      };

      const result = await processOrchestrator.executeProcess(processName, enhancedData);

      return {
        success: result.success,
        processInstance: result.processInstance,
        result: result.result,
        steps: result.steps,
        duration: result.duration,
        completedAt: result.completedAt
      };

    } catch (error) {
      console.error('Error executing process:', error);
      return {
        success: false,
        error: 'PROCESS_EXECUTION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Get process status
   */
  async getProcessStatus(processInstanceId) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (!processOrchestrator) {
        return {
          success: false,
          error: 'PROCESS_ORCHESTRATOR_UNAVAILABLE'
        };
      }

      const processInstance = processOrchestrator.activeProcesses.get(processInstanceId);
      if (!processInstance) {
        return {
          success: false,
          error: 'PROCESS_NOT_FOUND',
          message: 'Process instance not found'
        };
      }

      return {
        success: true,
        processInstance: {
          instanceId: processInstance.instanceId,
          processName: processInstance.processName,
          status: processInstance.status,
          currentStep: processInstance.currentStep,
          steps: processInstance.steps,
          createdAt: processInstance.createdAt,
          completedAt: processInstance.completedAt,
          duration: processInstance.duration
        }
      };

    } catch (error) {
      console.error('Error getting process status:', error);
      return {
        success: false,
        error: 'PROCESS_STATUS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * List available processes
   */
  async listProcesses() {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (!processOrchestrator) {
        return {
          success: false,
          error: 'PROCESS_ORCHESTRATOR_UNAVAILABLE'
        };
      }

      const processes = Array.from(processOrchestrator.processDefinitions.keys()).map(name => {
        const definition = processOrchestrator.processDefinitions.get(name);
        return {
          name,
          description: definition.description,
          steps: definition.steps.length,
          version: definition.version || '1.0'
        };
      });

      return {
        success: true,
        processes
      };

    } catch (error) {
      console.error('Error listing processes:', error);
      return {
        success: false,
        error: 'PROCESS_LISTING_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Get process analytics
   */
  async getProcessAnalytics(timeframe = '7d') {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (!processOrchestrator) {
        return {
          success: false,
          error: 'PROCESS_ORCHESTRATOR_UNAVAILABLE'
        };
      }

      // Get process execution history
      const completedProcesses = Array.from(processOrchestrator.processHistory.values());
      const now = new Date();
      const timeframeMs = this.parseTimeframe(timeframe);
      const cutoffDate = new Date(now - timeframeMs);

      const recentProcesses = completedProcesses.filter(p => 
        new Date(p.createdAt) >= cutoffDate
      );

      // Calculate analytics
      const analytics = {
        totalExecutions: recentProcesses.length,
        successfulExecutions: recentProcesses.filter(p => p.status === 'completed').length,
        failedExecutions: recentProcesses.filter(p => p.status === 'failed').length,
        averageExecutionTime: this.calculateAverageExecutionTime(recentProcesses),
        processByType: this.groupProcessesByType(recentProcesses),
        mostExecutedProcesses: this.getMostExecutedProcesses(recentProcesses),
        executionTrends: this.calculateExecutionTrends(recentProcesses),
        timeframe,
        generatedAt: now.toISOString()
      };

      return {
        success: true,
        analytics
      };

    } catch (error) {
      console.error('Error getting process analytics:', error);
      return {
        success: false,
        error: 'ANALYTICS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Parse timeframe string to milliseconds
   */
  parseTimeframe(timeframe) {
    const match = timeframe.match(/^(\d+)([dhm])$/);
    if (!match) return 7 * 24 * 60 * 60 * 1000; // Default 7 days
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'm': return value * 60 * 1000; // minutes
      case 'h': return value * 60 * 60 * 1000; // hours
      case 'd': return value * 24 * 60 * 60 * 1000; // days
      default: return 7 * 24 * 60 * 60 * 1000; // Default 7 days
    }
  }

  /**
   * Calculate average execution time
   */
  calculateAverageExecutionTime(processes) {
    const completedProcesses = processes.filter(p => p.duration);
    
    if (completedProcesses.length === 0) {
      return null;
    }
    
    const totalTime = completedProcesses.reduce((sum, p) => sum + p.duration, 0);
    const averageMs = totalTime / completedProcesses.length;
    
    return Math.round(averageMs);
  }

  /**
   * Group processes by type
   */
  groupProcessesByType(processes) {
    const groupedProcesses = {};
    
    processes.forEach(process => {
      const type = process.processName;
      if (!groupedProcesses[type]) {
        groupedProcesses[type] = {
          count: 0,
          successful: 0,
          failed: 0
        };
      }
      
      groupedProcesses[type].count++;
      if (process.status === 'completed') {
        groupedProcesses[type].successful++;
      } else if (process.status === 'failed') {
        groupedProcesses[type].failed++;
      }
    });
    
    return groupedProcesses;
  }

  /**
   * Get most executed processes
   */
  getMostExecutedProcesses(processes) {
    const processCount = {};
    
    processes.forEach(process => {
      const name = process.processName;
      processCount[name] = (processCount[name] || 0) + 1;
    });
    
    return Object.entries(processCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([processName, count]) => ({ processName, count }));
  }

  /**
   * Calculate execution trends
   */
  calculateExecutionTrends(processes) {
    // Group by day
    const dailyExecutions = {};
    
    processes.forEach(process => {
      const day = new Date(process.createdAt).toISOString().split('T')[0];
      if (!dailyExecutions[day]) {
        dailyExecutions[day] = {
          total: 0,
          successful: 0,
          failed: 0
        };
      }
      
      dailyExecutions[day].total++;
      if (process.status === 'completed') {
        dailyExecutions[day].successful++;
      } else if (process.status === 'failed') {
        dailyExecutions[day].failed++;
      }
    });
    
    return dailyExecutions;
  }

  /**
   * Retry failed process
   */
  async retryProcess(processInstanceId, userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (!processOrchestrator) {
        return {
          success: false,
          error: 'PROCESS_ORCHESTRATOR_UNAVAILABLE'
        };
      }

      // Get original process instance
      const originalProcess = processOrchestrator.processHistory.get(processInstanceId);
      if (!originalProcess) {
        return {
          success: false,
          error: 'PROCESS_NOT_FOUND',
          message: 'Original process instance not found'
        };
      }

      if (originalProcess.status !== 'failed') {
        return {
          success: false,
          error: 'PROCESS_NOT_RETRYABLE',
          message: 'Only failed processes can be retried'
        };
      }

      // Execute the process again with original data
      const retryResult = await this.executeProcess(
        originalProcess.processName,
        originalProcess.data,
        userContext
      );

      return {
        success: retryResult.success,
        originalProcessId: processInstanceId,
        newProcessId: retryResult.processInstance?.instanceId,
        retryResult
      };

    } catch (error) {
      console.error('Error retrying process:', error);
      return {
        success: false,
        error: 'PROCESS_RETRY_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    try {
      let processOrchestratorHealth = 'unavailable';
      let activeProcesses = 0;
      let processHistory = 0;

      if (this.coreFramework) {
        const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
        if (processOrchestrator) {
          processOrchestratorHealth = 'available';
          activeProcesses = processOrchestrator.activeProcesses.size;
          processHistory = processOrchestrator.processHistory.size;
        }
      }

      return {
        status: this.initialized ? 'healthy' : 'not_initialized',
        initialized: this.initialized,
        coreFrameworkIntegration: !!this.coreFramework,
        processOrchestrator: processOrchestratorHealth,
        statistics: {
          activeProcesses,
          processHistory
        }
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
    console.log(' Shutting down Process Service...');
    this.initialized = false;
    console.log(' Process Service shutdown complete');
  }
}

module.exports = ProcessService;