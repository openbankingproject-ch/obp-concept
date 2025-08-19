/**
 * Signature Service
 * 
 * Business logic layer for electronic signature operations that integrates
 * with the core framework and external signature providers.
 */

class SignatureService {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.signatureSessions = new Map(); // In-memory storage
    this.initialized = false;
  }

  async initialize() {
    console.log('🔄 Initializing Signature Service...');
    this.initialized = true;
    console.log('✅ Signature Service initialized');
  }

  /**
   * Initiate signature process
   */
  async initiateSignature(signatureRequest, userContext) {
    try {
      const {
        customerId,
        documents,
        signatureType = 'aes',
        notificationMethod = 'email',
        expiryHours = 24
      } = signatureRequest;

      // Validate request using core framework
      if (this.coreFramework) {
        const validationEngine = this.coreFramework.getComponent('validationEngine');
        if (validationEngine) {
          const validation = await validationEngine.validate(signatureRequest, 'signatureRequest');
          if (!validation.valid) {
            return {
              success: false,
              error: 'VALIDATION_FAILED',
              details: validation.errors
            };
          }
        }
      }

      const signatureId = require('uuid').v4();
      const createdAt = new Date();
      const expiryDate = new Date(createdAt.getTime() + (expiryHours * 60 * 60 * 1000));

      // Validate documents
      for (const doc of documents) {
        if (!doc.documentId || !doc.documentName || !doc.documentHash) {
          return {
            success: false,
            error: 'INVALID_DOCUMENT',
            message: 'Each document must have documentId, documentName, and documentHash'
          };
        }
      }

      // Create signature session
      const session = {
        signatureId,
        customerId,
        documents: documents.map(doc => ({
          ...doc,
          status: 'pending',
          preparedAt: createdAt
        })),
        signatureType,
        notificationMethod,
        status: 'pending',
        createdAt,
        expiryDate,
        institutionId: userContext.institutionId,
        userId: userContext.id,
        steps: [],
        metadata: {},
        signatureResults: {}
      };

      // Prepare signature process
      const signatureUrl = await this.prepareSignatureProcess(session);
      session.signatureUrl = signatureUrl;

      // Generate QR code for mobile access
      const qrCode = await this.generateQRCode(signatureUrl);
      session.qrCode = qrCode;

      // Store session
      this.signatureSessions.set(signatureId, session);

      // Send notification to customer
      await this.sendSignatureNotification(session);

      // Log audit trail
      if (this.coreFramework) {
        await this.logSignatureAudit('signature_initiated', session, userContext);
      }

      console.log('Signature process initiated:', {
        signatureId,
        customerId,
        signatureType,
        documentCount: documents.length
      });

      return {
        success: true,
        signatureId,
        signatureUrl,
        qrCode,
        expiryDate: expiryDate.toISOString(),
        documents: session.documents.map(doc => ({
          documentId: doc.documentId,
          documentName: doc.documentName,
          status: doc.status
        })),
        status: session.status,
        signatureType
      };

    } catch (error) {
      console.error('Error initiating signature:', error);
      return {
        success: false,
        error: 'SIGNATURE_INITIATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Get signature status
   */
  async getSignatureStatus(signatureId, userContext) {
    try {
      const session = this.signatureSessions.get(signatureId);
      
      if (!session) {
        return {
          success: false,
          error: 'SIGNATURE_NOT_FOUND',
          message: 'Signature session not found'
        };
      }

      // Check permissions
      if (session.institutionId !== userContext.institutionId) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Access denied to this signature session'
        };
      }

      // Check if session has expired
      if (session.expiryDate < new Date() && session.status === 'pending') {
        session.status = 'expired';
        this.signatureSessions.set(signatureId, session);
      }

      const response = {
        signatureId: session.signatureId,
        customerId: session.customerId,
        signatureType: session.signatureType,
        status: session.status,
        createdAt: session.createdAt,
        expiryDate: session.expiryDate,
        documents: session.documents.map(doc => ({
          documentId: doc.documentId,
          documentName: doc.documentName,
          status: doc.status,
          signedAt: doc.signedAt,
          signatureHash: doc.signatureHash
        })),
        steps: session.steps,
        progress: this.calculateSignatureProgress(session)
      };

      // Include signature results if completed
      if (session.status === 'signed' && session.signatureResults) {
        response.signatureResults = {
          signedAt: session.signatureResults.signedAt,
          signatureHash: session.signatureResults.signatureHash,
          certificateInfo: session.signatureResults.certificateInfo,
          signatureMethod: session.signatureResults.signatureMethod
        };
      }

      return {
        success: true,
        signature: response
      };

    } catch (error) {
      console.error('Error getting signature status:', error);
      return {
        success: false,
        error: 'STATUS_RETRIEVAL_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Complete signature process
   */
  async completeSignature(signatureId, signatureData, userContext) {
    try {
      const session = this.signatureSessions.get(signatureId);
      
      if (!session) {
        return {
          success: false,
          error: 'SIGNATURE_NOT_FOUND'
        };
      }

      if (session.status !== 'pending') {
        return {
          success: false,
          error: 'INVALID_SIGNATURE_STATUS',
          message: `Cannot complete signature in status: ${session.status}`
        };
      }

      if (session.expiryDate < new Date()) {
        session.status = 'expired';
        this.signatureSessions.set(signatureId, session);
        return {
          success: false,
          error: 'SIGNATURE_EXPIRED'
        };
      }

      const completionTime = new Date();
      
      // Process signature data
      const processedResult = await this.processSignatureData(session, signatureData);
      
      if (!processedResult.success) {
        session.status = 'failed';
        session.error = processedResult.error;
        session.failedAt = completionTime;
        
        this.signatureSessions.set(signatureId, session);
        
        return {
          success: false,
          error: 'SIGNATURE_PROCESSING_FAILED',
          message: processedResult.error
        };
      }

      // Update session
      session.status = 'signed';
      session.signedAt = completionTime;
      session.signatureResults = processedResult.data;
      
      // Update document statuses
      session.documents = session.documents.map(doc => ({
        ...doc,
        status: 'signed',
        signedAt: completionTime,
        signatureHash: this.generateDocumentSignatureHash(doc, processedResult.data.signatureHash)
      }));

      // Add completion step
      session.steps.push({
        step: 'signature_completion',
        status: 'completed',
        timestamp: completionTime,
        data: processedResult.data
      });

      this.signatureSessions.set(signatureId, session);

      // Store results in core framework
      if (this.coreFramework) {
        await this.storeSignatureResults(session);
      }

      // Log audit trail
      if (this.coreFramework) {
        await this.logSignatureAudit('signature_completed', session, userContext);
      }

      // Send completion notification
      await this.sendCompletionNotification(session);

      console.log('Signature process completed:', {
        signatureId,
        customerId: session.customerId,
        signatureType: session.signatureType,
        documentCount: session.documents.length
      });

      return {
        success: true,
        signatureId,
        status: session.status,
        signedAt: session.signedAt,
        signatureHash: session.signatureResults.signatureHash,
        documents: session.documents.map(doc => ({
          documentId: doc.documentId,
          documentName: doc.documentName,
          status: doc.status,
          signedAt: doc.signedAt,
          signatureHash: doc.signatureHash
        })),
        certificateInfo: session.signatureResults.certificateInfo
      };

    } catch (error) {
      console.error('Error completing signature:', error);
      return {
        success: false,
        error: 'SIGNATURE_COMPLETION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Prepare signature process
   */
  async prepareSignatureProcess(session) {
    const { signatureId, signatureType } = session;

    // Add preparation step
    session.steps.push({
      step: 'preparation',
      status: 'processing',
      timestamp: new Date()
    });

    // Mock signature service preparation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const baseUrl = process.env.SIGNATURE_BASE_URL || 'https://signature.example.com';
    
    let signatureUrl;
    switch (signatureType) {
      case 'qes':
        signatureUrl = `${baseUrl}/qes/${signatureId}`;
        break;
      case 'aes':
        signatureUrl = `${baseUrl}/aes/${signatureId}`;
        break;
      case 'simple':
        signatureUrl = `${baseUrl}/simple/${signatureId}`;
        break;
      default:
        throw new Error(`Unsupported signature type: ${signatureType}`);
    }

    // Mark preparation as completed
    session.steps[session.steps.length - 1].status = 'completed';

    return signatureUrl;
  }

  /**
   * Generate QR code for signature URL
   */
  async generateQRCode(signatureUrl) {
    try {
      // Mock QR code generation - in production, use actual QR code library
      const QRCode = require('qrcode');
      
      return await QRCode.toDataURL(signatureUrl, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.warn('Failed to generate QR code:', error);
      return null;
    }
  }

  /**
   * Process signature data
   */
  async processSignatureData(session, signatureData) {
    try {
      // Validate signature data
      if (!signatureData.signatureValue || !signatureData.timestamp) {
        return {
          success: false,
          error: 'INCOMPLETE_SIGNATURE_DATA'
        };
      }

      // Generate signature hash
      const signatureHash = require('crypto')
        .createHash('sha256')
        .update(`${session.signatureId}:${signatureData.timestamp}:${signatureData.signatureValue}`)
        .digest('hex');

      // Process certificate information if provided
      let certificateInfo = null;
      if (signatureData.certificate) {
        certificateInfo = {
          issuer: signatureData.certificate.issuer,
          subject: signatureData.certificate.subject,
          validFrom: signatureData.certificate.validFrom,
          validTo: signatureData.certificate.validTo,
          serialNumber: signatureData.certificate.serialNumber,
          algorithm: signatureData.certificate.algorithm || session.signatureType
        };
      }

      return {
        success: true,
        data: {
          signatureHash,
          signatureValue: signatureData.signatureValue,
          signedAt: signatureData.timestamp,
          signatureMethod: `${session.signatureType}_electronic_signature`,
          certificateInfo,
          signatureMetadata: {
            ipAddress: signatureData.ipAddress,
            userAgent: signatureData.userAgent,
            location: signatureData.location
          }
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate document signature hash
   */
  generateDocumentSignatureHash(document, mainSignatureHash) {
    return require('crypto')
      .createHash('sha256')
      .update(`${document.documentHash}:${mainSignatureHash}`)
      .digest('hex');
  }

  /**
   * Calculate signature progress
   */
  calculateSignatureProgress(session) {
    if (session.status === 'signed') return 100;
    if (session.status === 'failed' || session.status === 'expired') return 0;
    
    const expectedSteps = ['preparation', 'customer_notification', 'document_review', 'signature_capture', 'signature_completion'];
    const completedSteps = session.steps.filter(s => s.status === 'completed').length;
    
    return Math.round((completedSteps / expectedSteps.length) * 100);
  }

  /**
   * Send signature notification to customer
   */
  async sendSignatureNotification(session) {
    try {
      // Mock notification sending
      console.log(`📧 Would send ${session.notificationMethod} notification to customer ${session.customerId}`);
      console.log(`📄 Documents to sign: ${session.documents.map(d => d.documentName).join(', ')}`);
      console.log(`🔗 Signature URL: ${session.signatureUrl}`);

      // Add notification step
      session.steps.push({
        step: 'customer_notification',
        status: 'completed',
        timestamp: new Date(),
        method: session.notificationMethod
      });

    } catch (error) {
      console.warn('Failed to send signature notification:', error);
      
      session.steps.push({
        step: 'customer_notification',
        status: 'failed',
        timestamp: new Date(),
        error: error.message
      });
    }
  }

  /**
   * Send completion notification
   */
  async sendCompletionNotification(session) {
    try {
      // Mock completion notification
      console.log(`✅ Signature completed notification for customer ${session.customerId}`);
      console.log(`📄 Documents signed: ${session.documents.length}`);

    } catch (error) {
      console.warn('Failed to send completion notification:', error);
    }
  }

  /**
   * Store signature results in core framework
   */
  async storeSignatureResults(session) {
    try {
      if (!this.coreFramework) return;

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      
      if (processOrchestrator) {
        const auditData = {
          signatureId: session.signatureId,
          customerId: session.customerId,
          signatureType: session.signatureType,
          documentsCount: session.documents.length,
          signedAt: session.signedAt,
          signatureHash: session.signatureResults.signatureHash,
          certificateInfo: session.signatureResults.certificateInfo
        };

        await processOrchestrator.executeProcess('signature_storage', {
          auditData,
          coreComponents: this.coreFramework.components
        });

        console.log('Signature results stored in core framework');
      }
    } catch (error) {
      console.warn('Failed to store signature results:', error);
    }
  }

  /**
   * Log signature audit trail
   */
  async logSignatureAudit(event, session, userContext) {
    try {
      if (!this.coreFramework) return;

      const auditData = {
        event,
        signatureId: session.signatureId,
        customerId: session.customerId,
        signatureType: session.signatureType,
        institutionId: userContext.institutionId,
        userId: userContext.userId,
        timestamp: new Date().toISOString(),
        status: session.status
      };

      const processOrchestrator = this.coreFramework.getComponent('processOrchestrator');
      if (processOrchestrator) {
        await processOrchestrator.executeProcess('signature_audit', {
          auditData,
          coreComponents: this.coreFramework.components
        });
      }

    } catch (error) {
      console.warn('Failed to log signature audit:', error);
    }
  }

  /**
   * Get signature statistics
   */
  async getSignatureStats(timeframe = '30d', userContext) {
    try {
      const signatures = Array.from(this.signatureSessions.values());
      
      // Filter by institution for non-admin users
      const filteredSignatures = userContext.permissions?.includes('signature_admin') ? 
        signatures : 
        signatures.filter(s => s.institutionId === userContext.institutionId);

      const now = new Date();
      const timeframeMs = this.parseTimeframe(timeframe);
      const cutoffDate = new Date(now - timeframeMs);

      const recentSignatures = filteredSignatures.filter(s => 
        new Date(s.createdAt) >= cutoffDate
      );

      const stats = {
        totalSignatures: recentSignatures.length,
        signaturesByStatus: {
          signed: recentSignatures.filter(s => s.status === 'signed').length,
          pending: recentSignatures.filter(s => s.status === 'pending').length,
          expired: recentSignatures.filter(s => s.status === 'expired').length,
          failed: recentSignatures.filter(s => s.status === 'failed').length
        },
        signaturesByType: this.groupSignaturesByType(recentSignatures),
        averageCompletionTime: this.calculateAverageCompletionTime(recentSignatures),
        successRate: recentSignatures.length > 0 ? 
          ((recentSignatures.filter(s => s.status === 'signed').length / recentSignatures.length) * 100).toFixed(2) + '%' : 
          '0%',
        timeframe,
        generatedAt: now.toISOString()
      };

      return {
        success: true,
        stats
      };

    } catch (error) {
      console.error('Error getting signature stats:', error);
      return {
        success: false,
        error: 'STATS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Parse timeframe string
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
   * Group signatures by type
   */
  groupSignaturesByType(signatures) {
    const typeGroups = {};
    signatures.forEach(s => {
      typeGroups[s.signatureType] = (typeGroups[s.signatureType] || 0) + 1;
    });
    return typeGroups;
  }

  /**
   * Calculate average completion time
   */
  calculateAverageCompletionTime(signatures) {
    const completedSignatures = signatures.filter(s => s.status === 'signed' && s.signedAt);
    
    if (completedSignatures.length === 0) {
      return null;
    }
    
    const totalTime = completedSignatures.reduce((sum, signature) => {
      const created = new Date(signature.createdAt);
      const signed = new Date(signature.signedAt);
      return sum + (signed - created);
    }, 0);
    
    const averageMs = totalTime / completedSignatures.length;
    const averageHours = Math.round(averageMs / (1000 * 60 * 60) * 10) / 10;
    
    return `${averageHours} hours`;
  }

  /**
   * Cancel signature process
   */
  async cancelSignature(signatureId, reason, userContext) {
    try {
      const session = this.signatureSessions.get(signatureId);
      
      if (!session) {
        return {
          success: false,
          error: 'SIGNATURE_NOT_FOUND'
        };
      }

      // Check permissions
      if (session.institutionId !== userContext.institutionId) {
        return {
          success: false,
          error: 'ACCESS_DENIED'
        };
      }

      if (session.status !== 'pending') {
        return {
          success: false,
          error: 'INVALID_STATUS',
          message: `Cannot cancel signature in status: ${session.status}`
        };
      }

      // Cancel the signature
      session.status = 'cancelled';
      session.cancelledAt = new Date();
      session.cancellationReason = reason;
      session.cancelledBy = userContext.userId;

      this.signatureSessions.set(signatureId, session);

      // Log audit trail
      if (this.coreFramework) {
        await this.logSignatureAudit('signature_cancelled', session, userContext);
      }

      return {
        success: true,
        signatureId,
        status: session.status,
        cancelledAt: session.cancelledAt,
        reason: session.cancellationReason
      };

    } catch (error) {
      console.error('Error cancelling signature:', error);
      return {
        success: false,
        error: 'CANCELLATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    try {
      const signatureCount = this.signatureSessions.size;
      const activeSignatures = Array.from(this.signatureSessions.values())
        .filter(s => s.status === 'pending').length;

      return {
        status: this.initialized ? 'healthy' : 'not_initialized',
        initialized: this.initialized,
        coreFrameworkIntegration: !!this.coreFramework,
        statistics: {
          totalSignatures: signatureCount,
          activeSignatures
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
    console.log('🔄 Shutting down Signature Service...');
    this.initialized = false;
    console.log('✅ Signature Service shutdown complete');
  }
}

module.exports = SignatureService;