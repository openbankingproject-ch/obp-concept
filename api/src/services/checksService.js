/**
 * Checks Service
 * 
 * Business logic layer for various verification checks (KYC, AML, sanctions, etc.)
 * that integrates with the core framework and external compliance providers.
 */

class ChecksService {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.checkResults = new Map(); // In-memory storage
    this.initialized = false;
  }

  async initialize() {
    console.log(' Initializing Checks Service...');
    this.initialized = true;
    console.log(' Checks Service initialized');
  }

  /**
   * Perform comprehensive customer checks (KYC/AML/Sanctions)
   */
  async performCustomerChecks(checkRequest, userContext) {
    try {
      const {
        customerId,
        customerData,
        checkTypes = ['sanctions', 'pep', 'adverse_media', 'identity_verification'],
        riskProfile = 'standard'
      } = checkRequest;

      // Validate request using core framework
      if (this.coreFramework) {
        const validationEngine = this.coreFramework.getComponent('validationEngine');
        if (validationEngine) {
          const validation = await validationEngine.validate(checkRequest, 'customerChecks');
          if (!validation.valid) {
            return {
              success: false,
              error: 'VALIDATION_FAILED',
              details: validation.errors
            };
          }
        }
      }

      const checkId = require('uuid').v4();
      const startTime = new Date();

      // Create check session
      const checkSession = {
        checkId,
        customerId,
        checkTypes,
        riskProfile,
        status: 'in_progress',
        startTime,
        institutionId: userContext.institutionId,
        userId: userContext.id,
        results: {},
        overallRisk: null,
        recommendations: []
      };

      this.checkResults.set(checkId, checkSession);

      // Execute checks based on types
      const checkPromises = checkTypes.map(checkType => 
        this.executeCheck(checkType, customerData, riskProfile, checkSession)
      );

      const checkResults = await Promise.allSettled(checkPromises);
      
      // Process results
      let overallRisk = 'low';
      const recommendations = [];
      
      checkResults.forEach((result, index) => {
        const checkType = checkTypes[index];
        
        if (result.status === 'fulfilled') {
          checkSession.results[checkType] = result.value;
          
          // Determine overall risk level
          if (result.value.riskLevel === 'high') {
            overallRisk = 'high';
          } else if (result.value.riskLevel === 'medium' && overallRisk !== 'high') {
            overallRisk = 'medium';
          }

          // Add recommendations
          if (result.value.recommendations) {
            recommendations.push(...result.value.recommendations);
          }
        } else {
          checkSession.results[checkType] = {
            status: 'failed',
            error: result.reason.message,
            riskLevel: 'unknown'
          };
          
          // Failed checks increase overall risk
          if (overallRisk !== 'high') {
            overallRisk = 'medium';
          }
        }
      });

      // Update session
      checkSession.status = 'completed';
      checkSession.completedTime = new Date();
      checkSession.overallRisk = overallRisk;
      checkSession.recommendations = recommendations;
      checkSession.duration = checkSession.completedTime - checkSession.startTime;

      this.checkResults.set(checkId, checkSession);

      // Log audit trail
      if (this.coreFramework) {
        await this.logCheckAudit(checkSession, userContext);
      }

      console.log('Customer checks completed:', {
        checkId,
        customerId,
        overallRisk,
        duration: checkSession.duration
      });

      return {
        success: true,
        checkId,
        overallRisk,
        results: checkSession.results,
        recommendations,
        duration: checkSession.duration,
        completedAt: checkSession.completedTime
      };

    } catch (error) {
      console.error('Error performing customer checks:', error);
      return {
        success: false,
        error: 'CHECKS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Execute individual check
   */
  async executeCheck(checkType, customerData, riskProfile, checkSession) {
    switch (checkType) {
      case 'sanctions':
        return await this.executeSanctionsCheck(customerData, riskProfile);
      
      case 'pep':
        return await this.executePepCheck(customerData, riskProfile);
      
      case 'adverse_media':
        return await this.executeAdverseMediaCheck(customerData, riskProfile);
      
      case 'identity_verification':
        return await this.executeIdentityVerificationCheck(customerData, riskProfile);
      
      case 'fraud_check':
        return await this.executeFraudCheck(customerData, riskProfile);
      
      case 'credit_check':
        return await this.executeCreditCheck(customerData, riskProfile);
      
      default:
        throw new Error(`Unsupported check type: ${checkType}`);
    }
  }

  /**
   * Execute sanctions screening
   */
  async executeSanctionsCheck(customerData, riskProfile) {
    // Mock sanctions check - in production, integrate with actual sanctions screening service
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

    const sanctionsLists = [
      'OFAC SDN',
      'EU Sanctions',
      'UN Sanctions',
      'HMT Sanctions',
      'SECO Sanctions'
    ];

    // Mock screening results
    const isMatch = Math.random() < 0.02; // 2% chance of sanctions match
    const matchScore = isMatch ? Math.random() * 40 + 80 : Math.random() * 30; // 80-100 for matches, 0-30 for non-matches

    let riskLevel = 'low';
    let status = 'clear';
    const recommendations = [];

    if (isMatch && matchScore >= 90) {
      riskLevel = 'high';
      status = 'potential_match';
      recommendations.push('Manual review required - high confidence sanctions match');
      recommendations.push('Do not proceed with onboarding until cleared by compliance');
    } else if (matchScore >= 70) {
      riskLevel = 'medium';
      status = 'requires_review';
      recommendations.push('Manual review recommended - possible name similarity');
    }

    return {
      checkType: 'sanctions',
      status,
      riskLevel,
      matchScore: Math.round(matchScore * 10) / 10,
      screenedLists: sanctionsLists,
      matches: isMatch ? [{
        listName: 'OFAC SDN',
        matchedName: `${customerData.lastName}, ${customerData.givenName}`,
        confidence: matchScore,
        reason: 'Name similarity'
      }] : [],
      lastScreeningDate: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Execute PEP (Politically Exposed Person) check
   */
  async executePepCheck(customerData, riskProfile) {
    // Mock PEP check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 300));

    const isPep = Math.random() < 0.05; // 5% chance of PEP match
    const matchScore = isPep ? Math.random() * 30 + 70 : Math.random() * 40;

    let riskLevel = 'low';
    let status = 'clear';
    const recommendations = [];

    if (isPep && matchScore >= 85) {
      riskLevel = 'high';
      status = 'pep_identified';
      recommendations.push('Enhanced due diligence required for PEP');
      recommendations.push('Obtain senior management approval');
    } else if (matchScore >= 60) {
      riskLevel = 'medium';
      status = 'possible_pep';
      recommendations.push('Additional verification recommended');
    }

    return {
      checkType: 'pep',
      status,
      riskLevel,
      matchScore: Math.round(matchScore * 10) / 10,
      pepCategory: isPep ? 'domestic_pep' : null,
      jurisdiction: isPep ? customerData.nationality?.[0] || 'CH' : null,
      position: isPep ? 'Government Official' : null,
      familyMember: false,
      closeAssociate: false,
      lastScreeningDate: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Execute adverse media check
   */
  async executeAdverseMediaCheck(customerData, riskProfile) {
    // Mock adverse media check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1800 + 400));

    const hasAdverseMedia = Math.random() < 0.03; // 3% chance of adverse media
    const severity = hasAdverseMedia ? ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] : null;

    let riskLevel = 'low';
    let status = 'clear';
    const recommendations = [];

    if (hasAdverseMedia) {
      riskLevel = severity;
      status = 'adverse_media_found';
      
      if (severity === 'high') {
        recommendations.push('Significant adverse media found - detailed investigation required');
        recommendations.push('Consider enhanced monitoring');
      } else if (severity === 'medium') {
        recommendations.push('Moderate adverse media - review and assess relevance');
      }
    }

    return {
      checkType: 'adverse_media',
      status,
      riskLevel,
      severity,
      articlesFound: hasAdverseMedia ? Math.floor(Math.random() * 5) + 1 : 0,
      categories: hasAdverseMedia ? ['Financial Crime', 'Regulatory'] : [],
      dateRange: {
        earliest: hasAdverseMedia ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
        latest: hasAdverseMedia ? new Date().toISOString().split('T')[0] : null
      },
      lastScreeningDate: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Execute identity verification check
   */
  async executeIdentityVerificationCheck(customerData, riskProfile) {
    // Mock identity verification check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 200));

    const verificationScore = Math.random() * 100;
    let riskLevel = 'low';
    let status = 'verified';
    const recommendations = [];

    if (verificationScore < 60) {
      riskLevel = 'high';
      status = 'verification_failed';
      recommendations.push('Identity verification failed - additional documentation required');
    } else if (verificationScore < 80) {
      riskLevel = 'medium';
      status = 'partial_verification';
      recommendations.push('Additional identity checks recommended');
    }

    return {
      checkType: 'identity_verification',
      status,
      riskLevel,
      verificationScore: Math.round(verificationScore * 10) / 10,
      dataConsistency: verificationScore > 70,
      documentValidity: verificationScore > 60,
      biometricMatch: verificationScore > 80,
      addressVerification: verificationScore > 75,
      lastVerificationDate: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Execute fraud check
   */
  async executeFraudCheck(customerData, riskProfile) {
    // Mock fraud check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1200 + 300));

    const fraudScore = Math.random() * 100;
    let riskLevel = 'low';
    let status = 'clear';
    const recommendations = [];

    if (fraudScore > 80) {
      riskLevel = 'high';
      status = 'high_fraud_risk';
      recommendations.push('High fraud risk detected - immediate review required');
      recommendations.push('Consider declining application');
    } else if (fraudScore > 60) {
      riskLevel = 'medium';
      status = 'moderate_fraud_risk';
      recommendations.push('Moderate fraud risk - additional verification recommended');
    }

    return {
      checkType: 'fraud_check',
      status,
      riskLevel,
      fraudScore: Math.round(fraudScore * 10) / 10,
      riskFactors: fraudScore > 60 ? ['Device fingerprinting', 'Velocity checks'] : [],
      deviceRisk: fraudScore > 50 ? 'medium' : 'low',
      behaviorAnalysis: fraudScore > 70 ? 'suspicious' : 'normal',
      lastFraudCheck: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Execute credit check
   */
  async executeCreditCheck(customerData, riskProfile) {
    // Mock credit check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

    const creditScore = Math.floor(Math.random() * 400) + 400; // 400-800 range
    let riskLevel = 'low';
    let status = 'acceptable';
    const recommendations = [];

    if (creditScore < 500) {
      riskLevel = 'high';
      status = 'poor_credit';
      recommendations.push('Poor credit history - consider enhanced terms or decline');
    } else if (creditScore < 650) {
      riskLevel = 'medium';
      status = 'fair_credit';
      recommendations.push('Fair credit - standard terms with monitoring');
    }

    return {
      checkType: 'credit_check',
      status,
      riskLevel,
      creditScore,
      creditRating: creditScore > 700 ? 'excellent' : creditScore > 650 ? 'good' : creditScore > 500 ? 'fair' : 'poor',
      paymentHistory: Math.random() > 0.3,
      creditUtilization: Math.round(Math.random() * 80 + 10), // 10-90%
      lengthOfHistory: Math.floor(Math.random() * 20) + 1, // 1-20 years
      lastCreditCheck: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Get check results
   */
  async getCheckResults(checkId, userContext) {
    try {
      const checkSession = this.checkResults.get(checkId);
      
      if (!checkSession) {
        return {
          success: false,
          error: 'CHECK_NOT_FOUND',
          message: 'Check session not found'
        };
      }

      // Check permissions
      if (checkSession.institutionId !== userContext.institutionId) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Access denied to this check session'
        };
      }

      return {
        success: true,
        checkResults: {
          checkId: checkSession.checkId,
          customerId: checkSession.customerId,
          status: checkSession.status,
          overallRisk: checkSession.overallRisk,
          results: checkSession.results,
          recommendations: checkSession.recommendations,
          startTime: checkSession.startTime,
          completedTime: checkSession.completedTime,
          duration: checkSession.duration
        }
      };

    } catch (error) {
      console.error('Error getting check results:', error);
      return {
        success: false,
        error: 'RETRIEVAL_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Log check audit trail
   */
  async logCheckAudit(checkSession, userContext) {
    try {
      if (!this.coreFramework) return;

      const auditData = {
        checkId: checkSession.checkId,
        customerId: checkSession.customerId,
        checkTypes: checkSession.checkTypes,
        overallRisk: checkSession.overallRisk,
        institutionId: userContext.institutionId,
        userId: userContext.userId,
        timestamp: new Date().toISOString(),
        duration: checkSession.duration
      };

      // Use process orchestrator to log audit trail
      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (processOrchestrator) {
        await processOrchestrator.executeProcess('checks_audit', {
          auditData,
          coreComponents: this.coreFramework.components
        });
      }

    } catch (error) {
      console.warn('Failed to log checks audit:', error);
    }
  }

  /**
   * Get checks statistics
   */
  async getChecksStats(timeframe = '30d', userContext) {
    try {
      const checks = Array.from(this.checkResults.values());
      
      // Filter by institution for non-admin users
      const filteredChecks = userContext.permissions?.includes('checks_admin') ? 
        checks : 
        checks.filter(c => c.institutionId === userContext.institutionId);

      const now = new Date();
      const timeframeMs = this.parseTimeframe(timeframe);
      const cutoffDate = new Date(now - timeframeMs);

      const recentChecks = filteredChecks.filter(c => 
        new Date(c.startTime) >= cutoffDate
      );

      const stats = {
        totalChecks: recentChecks.length,
        checksByRisk: {
          low: recentChecks.filter(c => c.overallRisk === 'low').length,
          medium: recentChecks.filter(c => c.overallRisk === 'medium').length,
          high: recentChecks.filter(c => c.overallRisk === 'high').length
        },
        checksByType: this.groupChecksByType(recentChecks),
        averageCheckTime: this.calculateAverageCheckTime(recentChecks),
        riskDistribution: this.calculateRiskDistribution(recentChecks),
        timeframe,
        generatedAt: now.toISOString()
      };

      return {
        success: true,
        stats
      };

    } catch (error) {
      console.error('Error getting checks stats:', error);
      return {
        success: false,
        error: 'STATS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Parse timeframe string to milliseconds
   */
  parseTimeframe(timeframe) {
    const match = timeframe.match(/^(\d+)([dhm])$/);
    if (!match) return 30 * 24 * 60 * 60 * 1000;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 30 * 24 * 60 * 60 * 1000;
    }
  }

  /**
   * Group checks by type
   */
  groupChecksByType(checks) {
    const typeGroups = {};
    
    checks.forEach(check => {
      check.checkTypes.forEach(type => {
        typeGroups[type] = (typeGroups[type] || 0) + 1;
      });
    });
    
    return typeGroups;
  }

  /**
   * Calculate average check time
   */
  calculateAverageCheckTime(checks) {
    const completedChecks = checks.filter(c => c.duration);
    
    if (completedChecks.length === 0) {
      return null;
    }
    
    const totalTime = completedChecks.reduce((sum, c) => sum + c.duration, 0);
    const averageMs = totalTime / completedChecks.length;
    
    return Math.round(averageMs / 1000 * 10) / 10 + ' seconds';
  }

  /**
   * Calculate risk distribution
   */
  calculateRiskDistribution(checks) {
    const total = checks.length;
    if (total === 0) return { low: '0%', medium: '0%', high: '0%' };
    
    const low = checks.filter(c => c.overallRisk === 'low').length;
    const medium = checks.filter(c => c.overallRisk === 'medium').length;
    const high = checks.filter(c => c.overallRisk === 'high').length;
    
    return {
      low: ((low / total) * 100).toFixed(1) + '%',
      medium: ((medium / total) * 100).toFixed(1) + '%',
      high: ((high / total) * 100).toFixed(1) + '%'
    };
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    try {
      const checksCount = this.checkResults.size;
      const activeChecks = Array.from(this.checkResults.values())
        .filter(c => c.status === 'in_progress').length;

      return {
        status: this.initialized ? 'healthy' : 'not_initialized',
        initialized: this.initialized,
        coreFrameworkIntegration: !!this.coreFramework,
        statistics: {
          totalChecks: checksCount,
          activeChecks
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
    console.log(' Shutting down Checks Service...');
    this.initialized = false;
    console.log(' Checks Service shutdown complete');
  }
}

module.exports = ChecksService;