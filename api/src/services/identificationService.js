/**
 * Identification Service
 * 
 * Business logic layer for customer identification operations that integrates
 * with the core framework and external identification providers.
 */

class IdentificationService {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.identificationSessions = new Map(); // In-memory storage
    this.initialized = false;
  }

  async initialize() {
    console.log(' Initializing Identification Service...');
    this.initialized = true;
    console.log(' Identification Service initialized');
  }

  /**
   * Initiate customer identification process
   */
  async initiateIdentification(identificationRequest, userContext) {
    try {
      const {
        customerId,
        identificationType = 'video_identification',
        documentTypes = ['id_card', 'passport'],
        returnUrl,
        webhookUrl
      } = identificationRequest;

      // Validate request using core framework
      if (this.coreFramework) {
        const validationEngine = this.coreFramework.getComponent('validationEngine');
        if (validationEngine) {
          const validation = await validationEngine.validate(identificationRequest, 'identificationRequest');
          if (!validation.valid) {
            return {
              success: false,
              error: 'VALIDATION_FAILED',
              details: validation.errors
            };
          }
        }
      }

      const sessionId = require('uuid').v4();
      const createdAt = new Date();
      const expiryDate = new Date(createdAt.getTime() + (24 * 60 * 60 * 1000)); // 24 hours

      // Create identification session
      const session = {
        sessionId,
        customerId,
        identificationType,
        documentTypes,
        status: 'initiated',
        createdAt,
        expiryDate,
        institutionId: userContext.institutionId,
        userId: userContext.id,
        returnUrl,
        webhookUrl,
        steps: [],
        results: {},
        metadata: {}
      };

      // Generate identification URL based on type
      const identificationUrl = await this.generateIdentificationUrl(session);
      session.identificationUrl = identificationUrl;

      // Store session
      this.identificationSessions.set(sessionId, session);

      // Log audit trail
      if (this.coreFramework) {
        await this.logIdentificationAudit('identification_initiated', session, userContext);
      }

      console.log('Identification session initiated:', {
        sessionId,
        customerId,
        identificationType,
        institutionId: userContext.institutionId
      });

      return {
        success: true,
        sessionId,
        identificationUrl,
        expiryDate: expiryDate.toISOString(),
        status: session.status,
        identificationType
      };

    } catch (error) {
      console.error('Error initiating identification:', error);
      return {
        success: false,
        error: 'IDENTIFICATION_INITIATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Get identification session status
   */
  async getIdentificationStatus(sessionId, userContext) {
    try {
      const session = this.identificationSessions.get(sessionId);
      
      if (!session) {
        return {
          success: false,
          error: 'SESSION_NOT_FOUND',
          message: 'Identification session not found'
        };
      }

      // Check permissions
      if (session.institutionId !== userContext.institutionId) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Access denied to this identification session'
        };
      }

      // Check if session has expired
      if (session.expiryDate < new Date() && session.status === 'initiated') {
        session.status = 'expired';
        this.identificationSessions.set(sessionId, session);
      }

      const response = {
        sessionId: session.sessionId,
        customerId: session.customerId,
        identificationType: session.identificationType,
        status: session.status,
        createdAt: session.createdAt,
        expiryDate: session.expiryDate,
        steps: session.steps,
        progress: this.calculateProgress(session)
      };

      // Include results if identification is completed
      if (session.status === 'completed' && session.results) {
        response.identificationResult = {
          levelOfAssurance: session.results.levelOfAssurance,
          identificationDate: session.results.identificationDate,
          documentInfo: session.results.documentInfo,
          biometricMatch: session.results.biometricMatch,
          verificationScore: session.results.verificationScore
        };
      }

      return {
        success: true,
        identification: response
      };

    } catch (error) {
      console.error('Error getting identification status:', error);
      return {
        success: false,
        error: 'STATUS_RETRIEVAL_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Complete identification (called by webhook or manual completion)
   */
  async completeIdentification(sessionId, identificationResult, userContext) {
    try {
      const session = this.identificationSessions.get(sessionId);
      
      if (!session) {
        return {
          success: false,
          error: 'SESSION_NOT_FOUND'
        };
      }

      if (session.status !== 'in_progress' && session.status !== 'initiated') {
        return {
          success: false,
          error: 'INVALID_SESSION_STATUS',
          message: `Cannot complete identification in status: ${session.status}`
        };
      }

      if (session.expiryDate < new Date()) {
        session.status = 'expired';
        this.identificationSessions.set(sessionId, session);
        return {
          success: false,
          error: 'SESSION_EXPIRED'
        };
      }

      // Process identification result
      const processedResult = await this.processIdentificationResult(session, identificationResult);
      
      // Update session
      session.status = processedResult.success ? 'completed' : 'failed';
      session.completedAt = new Date();
      session.results = processedResult.data;
      
      if (!processedResult.success) {
        session.error = processedResult.error;
      }

      // Add completion step
      session.steps.push({
        step: 'identification_completion',
        status: processedResult.success ? 'completed' : 'failed',
        timestamp: session.completedAt,
        data: processedResult.success ? processedResult.data : { error: processedResult.error }
      });

      this.identificationSessions.set(sessionId, session);

      // Log audit trail
      if (this.coreFramework) {
        await this.logIdentificationAudit('identification_completed', session, userContext);
      }

      // Store result in core framework if available
      if (processedResult.success && this.coreFramework) {
        await this.storeIdentificationResult(session);
      }

      // Send webhook notification if configured
      if (session.webhookUrl) {
        await this.sendWebhookNotification(session);
      }

      return {
        success: true,
        sessionId,
        status: session.status,
        completedAt: session.completedAt,
        identificationResult: session.results
      };

    } catch (error) {
      console.error('Error completing identification:', error);
      return {
        success: false,
        error: 'COMPLETION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Generate identification URL based on type
   */
  async generateIdentificationUrl(session) {
    const baseUrl = process.env.IDENTIFICATION_BASE_URL || 'https://identification.example.com';
    
    switch (session.identificationType) {
      case 'video_identification':
        return `${baseUrl}/video/${session.sessionId}`;
      
      case 'document_verification':
        return `${baseUrl}/document/${session.sessionId}`;
      
      case 'biometric_verification':
        return `${baseUrl}/biometric/${session.sessionId}`;
      
      case 'electronic_id':
        return `${baseUrl}/eid/${session.sessionId}`;
      
      default:
        throw new Error(`Unsupported identification type: ${session.identificationType}`);
    }
  }

  /**
   * Calculate identification progress
   */
  calculateProgress(session) {
    if (session.status === 'completed') return 100;
    if (session.status === 'failed' || session.status === 'expired') return 0;
    
    const totalSteps = this.getExpectedSteps(session.identificationType).length;
    const completedSteps = session.steps.filter(s => s.status === 'completed').length;
    
    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Get expected steps for identification type
   */
  getExpectedSteps(identificationType) {
    const stepMappings = {
      'video_identification': [
        'document_capture',
        'face_capture',
        'liveness_check',
        'document_verification',
        'biometric_match',
        'manual_review'
      ],
      'document_verification': [
        'document_capture',
        'document_analysis',
        'fraud_detection',
        'manual_review'
      ],
      'biometric_verification': [
        'face_capture',
        'liveness_check',
        'biometric_match'
      ],
      'electronic_id': [
        'eid_authentication',
        'data_extraction',
        'certificate_validation'
      ]
    };

    return stepMappings[identificationType] || [];
  }

  /**
   * Process identification result
   */
  async processIdentificationResult(session, identificationResult) {
    try {
      // Validate identification result
      if (!identificationResult.documentInfo || !identificationResult.verificationScore) {
        return {
          success: false,
          error: 'INCOMPLETE_IDENTIFICATION_RESULT'
        };
      }

      // Determine level of assurance based on identification type and score
      let levelOfAssurance = 'low';
      if (session.identificationType === 'video_identification' && identificationResult.verificationScore >= 85) {
        levelOfAssurance = 'high';
      } else if (session.identificationType === 'electronic_id') {
        levelOfAssurance = 'high';
      } else if (identificationResult.verificationScore >= 70) {
        levelOfAssurance = 'medium';
      }

      // Process document information
      const documentInfo = {
        documentType: identificationResult.documentInfo.type,
        documentNumber: identificationResult.documentInfo.number,
        issuingCountry: identificationResult.documentInfo.issuingCountry,
        issuingAuthority: identificationResult.documentInfo.issuingAuthority,
        issueDate: identificationResult.documentInfo.issueDate,
        expiryDate: identificationResult.documentInfo.expiryDate,
        validityStatus: identificationResult.documentInfo.validityStatus || 'valid'
      };

      // Extract customer data
      const customerData = {
        lastName: identificationResult.customerData?.lastName,
        givenName: identificationResult.customerData?.givenName,
        birthDate: identificationResult.customerData?.birthDate,
        nationality: identificationResult.customerData?.nationality,
        gender: identificationResult.customerData?.gender,
        address: identificationResult.customerData?.address
      };

      const processedData = {
        levelOfAssurance,
        identificationDate: new Date().toISOString(),
        identificationMethod: `${session.identificationType}_with_document`,
        documentInfo,
        customerData,
        biometricMatch: identificationResult.biometricMatch || null,
        verificationScore: identificationResult.verificationScore,
        fraudIndicators: identificationResult.fraudIndicators || [],
        qualityChecks: identificationResult.qualityChecks || {}
      };

      return {
        success: true,
        data: processedData
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Store identification result in core framework
   */
  async storeIdentificationResult(session) {
    try {
      if (!this.coreFramework) return;

      const dataModels = this.coreFramework.getComponent('dataModels');
      if (dataModels) {
        // Transform and store customer identification data
        const universalCustomerData = dataModels.transformToUniversal({
          customerId: session.customerId,
          identification: session.results,
          metadata: {
            identificationType: session.identificationType,
            sessionId: session.sessionId,
            verifiedBy: session.institutionId
          }
        }, 'banking');

        // Store in customer registry (mock implementation)
        console.log('Identification result stored in core framework');
      }
    } catch (error) {
      console.warn('Failed to store identification result:', error);
    }
  }

  /**
   * Send webhook notification
   */
  async sendWebhookNotification(session) {
    try {
      const payload = {
        sessionId: session.sessionId,
        customerId: session.customerId,
        status: session.status,
        completedAt: session.completedAt,
        identificationType: session.identificationType,
        results: session.results
      };

      // Mock webhook sending
      console.log(`📡 Would send webhook to: ${session.webhookUrl}`);
      console.log('Webhook payload:', JSON.stringify(payload, null, 2));

      // In production, implement actual HTTP POST to webhook URL

    } catch (error) {
      console.warn('Failed to send webhook notification:', error);
    }
  }

  /**
   * Log identification audit trail
   */
  async logIdentificationAudit(event, session, userContext) {
    try {
      if (!this.coreFramework) return;

      const auditData = {
        event,
        sessionId: session.sessionId,
        customerId: session.customerId,
        identificationType: session.identificationType,
        institutionId: userContext.institutionId,
        userId: userContext.userId,
        timestamp: new Date().toISOString(),
        status: session.status
      };

      // Use process orchestrator to log audit trail
      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (processOrchestrator) {
        await processOrchestrator.executeProcess('identification_audit', {
          auditData,
          coreComponents: this.coreFramework.components
        });
      }

    } catch (error) {
      console.warn('Failed to log identification audit:', error);
    }
  }

  /**
   * Get identification statistics
   */
  async getIdentificationStats(timeframe = '30d', userContext) {
    try {
      const sessions = Array.from(this.identificationSessions.values());
      
      // Filter by institution for non-admin users
      const filteredSessions = userContext.permissions?.includes('identification_admin') ? 
        sessions : 
        sessions.filter(s => s.institutionId === userContext.institutionId);

      const now = new Date();
      const timeframeMs = this.parseTimeframe(timeframe);
      const cutoffDate = new Date(now - timeframeMs);

      const recentSessions = filteredSessions.filter(s => 
        new Date(s.createdAt) >= cutoffDate
      );

      const stats = {
        totalSessions: recentSessions.length,
        sessionsByStatus: {
          completed: recentSessions.filter(s => s.status === 'completed').length,
          failed: recentSessions.filter(s => s.status === 'failed').length,
          expired: recentSessions.filter(s => s.status === 'expired').length,
          in_progress: recentSessions.filter(s => s.status === 'in_progress').length,
          initiated: recentSessions.filter(s => s.status === 'initiated').length
        },
        sessionsByType: this.groupSessionsByType(recentSessions),
        averageCompletionTime: this.calculateAverageCompletionTime(recentSessions),
        successRate: recentSessions.length > 0 ? 
          ((recentSessions.filter(s => s.status === 'completed').length / recentSessions.length) * 100).toFixed(2) + '%' : 
          '0%',
        timeframe,
        generatedAt: now.toISOString()
      };

      return {
        success: true,
        stats
      };

    } catch (error) {
      console.error('Error getting identification stats:', error);
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
    if (!match) return 30 * 24 * 60 * 60 * 1000; // Default 30 days
    
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
   * Group sessions by identification type
   */
  groupSessionsByType(sessions) {
    const typeGroups = {};
    sessions.forEach(s => {
      typeGroups[s.identificationType] = (typeGroups[s.identificationType] || 0) + 1;
    });
    return typeGroups;
  }

  /**
   * Calculate average completion time
   */
  calculateAverageCompletionTime(sessions) {
    const completedSessions = sessions.filter(s => s.status === 'completed' && s.completedAt);
    
    if (completedSessions.length === 0) {
      return null;
    }
    
    const totalTime = completedSessions.reduce((sum, session) => {
      const created = new Date(session.createdAt);
      const completed = new Date(session.completedAt);
      return sum + (completed - created);
    }, 0);
    
    const averageMs = totalTime / completedSessions.length;
    const averageMinutes = Math.round(averageMs / (1000 * 60) * 10) / 10;
    
    return `${averageMinutes} minutes`;
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    try {
      const sessionCount = this.identificationSessions.size;
      const activeSessions = Array.from(this.identificationSessions.values())
        .filter(s => s.status === 'initiated' || s.status === 'in_progress').length;

      return {
        status: this.initialized ? 'healthy' : 'not_initialized',
        initialized: this.initialized,
        coreFrameworkIntegration: !!this.coreFramework,
        statistics: {
          totalSessions: sessionCount,
          activeSessions
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
    console.log(' Shutting down Identification Service...');
    this.initialized = false;
    console.log(' Identification Service shutdown complete');
  }
}

module.exports = IdentificationService;