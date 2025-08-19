const express = require('express');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const QRCode = require('qrcode');
const logger = require('../utils/logger');
const { validateRequest } = require('../middleware/validation');
const { required: requireAuth } = require('../middleware/auth');

const router = express.Router();

// Mock core framework reference (will be injected by app.js)
let coreFramework = null;

/**
 * Set core framework reference
 */
function setCoreFramework(framework) {
  coreFramework = framework;
}

// In-memory storage for signature processes (use database in production)
const signatureProcesses = new Map();

/**
 * Initiate signature process
 * POST /signature/initiate
 */
router.post('/initiate', requireAuth, validateRequest('signatureRequest'), async (req, res) => {
  try {
    const {
      customerId,
      documents,
      signatureType,
      notificationMethod = 'email'
    } = req.body;

    const signatureId = uuidv4();
    const createdAt = new Date();
    const expiryDate = new Date(createdAt.getTime() + (24 * 60 * 60 * 1000)); // 24 hours

    logger.info('Signature process initiated', {
      signatureId,
      customerId,
      signatureType,
      documentCount: documents.length,
      institutionId: req.user.institutionId,
      userId: req.user.id
    });

    // Validate documents
    for (const doc of documents) {
      if (!doc.documentId || !doc.documentName || !doc.documentHash) {
        return res.status(400).json({
          error: 'INVALID_DOCUMENT',
          message: 'Each document must have documentId, documentName, and documentHash',
          timestamp: new Date().toISOString()
        });
      }
    }

    // Create signature process
    const signatureProcess = {
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
      institutionId: req.user.institutionId,
      userId: req.user.id,
      steps: [],
      metadata: {}
    };

    try {
      // Prepare signature URLs and process
      const signatureUrl = await prepareSignatureProcess(signatureProcess);
      
      // Generate QR code for mobile signature
      let qrCode = null;
      try {
        qrCode = await QRCode.toDataURL(signatureUrl, {
          errorCorrectionLevel: 'M',
          type: 'image/png',
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
      } catch (qrError) {
        logger.warn('Failed to generate QR code for signature:', qrError);
      }

      signatureProcess.signatureUrl = signatureUrl;
      signatureProcess.qrCode = qrCode;

      // Store process
      signatureProcesses.set(signatureId, signatureProcess);

      // Send notification to customer
      await sendSignatureNotification(signatureProcess);

      logger.info('Signature process created successfully', {
        signatureId,
        signatureUrl: signatureUrl,
        expiryDate: expiryDate.toISOString()
      });

      res.status(201).json({
        signatureId,
        signatureUrl,
        qrCode,
        expiryDate: expiryDate.toISOString(),
        documents: signatureProcess.documents.map(doc => ({
          documentId: doc.documentId,
          documentName: doc.documentName,
          status: doc.status
        })),
        status: signatureProcess.status,
        signatureType
      });

    } catch (processError) {
      logger.error('Failed to prepare signature process:', processError);
      
      res.status(500).json({
        signatureId,
        error: 'PROCESS_PREPARATION_FAILED',
        message: processError.message,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    logger.error('Error initiating signature process:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to initiate signature process',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get signature status
 * GET /signature/:signatureId/status
 */
router.get('/:signatureId/status', requireAuth, (req, res) => {
  try {
    const { signatureId } = req.params;
    const process = signatureProcesses.get(signatureId);

    if (!process) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Signature process not found',
        timestamp: new Date().toISOString()
      });
    }

    // Check if user has permission to view this signature process
    if (process.institutionId !== req.user.institutionId) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Access denied to this signature process',
        timestamp: new Date().toISOString()
      });
    }

    // Check if process has expired
    if (process.expiryDate < new Date() && process.status === 'pending') {
      process.status = 'expired';
      signatureProcesses.set(signatureId, process);
    }

    const response = {
      signatureId: process.signatureId,
      status: process.status,
      signatureType: process.signatureType,
      createdAt: process.createdAt,
      expiryDate: process.expiryDate,
      documents: process.documents.map(doc => ({
        documentId: doc.documentId,
        documentName: doc.documentName,
        status: doc.status,
        signedAt: doc.signedAt
      })),
      steps: process.steps
    };

    // Include signature details if completed
    if (process.status === 'signed' && process.signatureHash) {
      response.signedAt = process.signedAt;
      response.signatureHash = process.signatureHash;
      
      if (process.certificateInfo) {
        response.certificateInfo = process.certificateInfo;
      }
    }

    res.json(response);

  } catch (error) {
    logger.error('Error retrieving signature status:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve signature status',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Complete signature (typically called by signature service callback)
 * POST /signature/:signatureId/complete
 */
router.post('/:signatureId/complete', requireAuth, async (req, res) => {
  try {
    const { signatureId } = req.params;
    const { signatureData, certificateInfo } = req.body;

    const process = signatureProcesses.get(signatureId);

    if (!process) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Signature process not found',
        timestamp: new Date().toISOString()
      });
    }

    if (process.status !== 'pending') {
      return res.status(400).json({
        error: 'INVALID_STATUS',
        message: `Cannot complete signature in status: ${process.status}`,
        timestamp: new Date().toISOString()
      });
    }

    if (process.expiryDate < new Date()) {
      process.status = 'expired';
      signatureProcesses.set(signatureId, process);
      
      return res.status(400).json({
        error: 'SIGNATURE_EXPIRED',
        message: 'Signature process has expired',
        timestamp: new Date().toISOString()
      });
    }

    try {
      // Process signature completion
      await completeSignatureProcess(process, signatureData, certificateInfo);

      logger.info('Signature process completed', {
        signatureId,
        signatureType: process.signatureType,
        documentCount: process.documents.length,
        customerId: process.customerId
      });

      res.json({
        signatureId,
        status: process.status,
        signedAt: process.signedAt,
        signatureHash: process.signatureHash,
        documents: process.documents.map(doc => ({
          documentId: doc.documentId,
          documentName: doc.documentName,
          status: doc.status,
          signedAt: doc.signedAt
        })),
        certificateInfo: process.certificateInfo
      });

    } catch (completionError) {
      process.status = 'failed';
      process.error = completionError.message;
      process.failedAt = new Date();
      signatureProcesses.set(signatureId, process);

      logger.error('Signature completion failed:', completionError);

      res.status(500).json({
        signatureId,
        status: 'failed',
        error: 'COMPLETION_FAILED',
        message: completionError.message,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    logger.error('Error completing signature:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to complete signature',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Cancel signature process
 * DELETE /signature/:signatureId
 */
router.delete('/:signatureId', requireAuth, (req, res) => {
  try {
    const { signatureId } = req.params;
    const { reason = 'user_request' } = req.body;

    const process = signatureProcesses.get(signatureId);

    if (!process) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Signature process not found',
        timestamp: new Date().toISOString()
      });
    }

    // Check permissions
    if (process.institutionId !== req.user.institutionId) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Access denied to this signature process',
        timestamp: new Date().toISOString()
      });
    }

    if (!['pending'].includes(process.status)) {
      return res.status(400).json({
        error: 'INVALID_STATUS',
        message: `Cannot cancel signature in status: ${process.status}`,
        timestamp: new Date().toISOString()
      });
    }

    // Cancel the process
    process.status = 'cancelled';
    process.cancelledAt = new Date();
    process.cancellationReason = reason;
    process.cancelledBy = req.user.id;

    signatureProcesses.set(signatureId, process);

    logger.info('Signature process cancelled', {
      signatureId,
      reason,
      cancelledBy: req.user.id
    });

    res.json({
      signatureId,
      status: process.status,
      cancelledAt: process.cancelledAt,
      reason: process.cancellationReason
    });

  } catch (error) {
    logger.error('Error cancelling signature:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to cancel signature',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Prepare signature process
 */
async function prepareSignatureProcess(signatureProcess) {
  const { signatureId, signatureType, customerId } = signatureProcess;

  // Add preparation step
  signatureProcess.steps.push({
    step: 'preparation',
    status: 'processing',
    timestamp: new Date()
  });

  // Mock signature service integration
  await new Promise(resolve => setTimeout(resolve, 1000));

  let signatureUrl;

  switch (signatureType) {
    case 'qes':
      // Qualified Electronic Signature
      signatureUrl = `${process.env.SIGNATURE_BASE_URL || 'https://signature.example.com'}/qes/${signatureId}`;
      break;
      
    case 'aes':
      // Advanced Electronic Signature
      signatureUrl = `${process.env.SIGNATURE_BASE_URL || 'https://signature.example.com'}/aes/${signatureId}`;
      break;
      
    case 'simple':
      // Simple Electronic Signature
      signatureUrl = `${process.env.SIGNATURE_BASE_URL || 'https://signature.example.com'}/simple/${signatureId}`;
      break;
      
    default:
      throw new Error(`Unsupported signature type: ${signatureType}`);
  }

  // Mark preparation as completed
  signatureProcess.steps[signatureProcess.steps.length - 1].status = 'completed';

  return signatureUrl;
}

/**
 * Complete signature process
 */
async function completeSignatureProcess(process, signatureData, certificateInfo) {
  const completionTime = new Date();

  // Add completion step
  process.steps.push({
    step: 'signature_completion',
    status: 'processing',
    timestamp: completionTime
  });

  // Mock signature verification and processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate signature hash
  const signatureHash = crypto
    .createHash('sha256')
    .update(`${process.signatureId}:${completionTime.toISOString()}:${JSON.stringify(signatureData)}`)
    .digest('hex');

  // Update process
  process.status = 'signed';
  process.signedAt = completionTime;
  process.signatureHash = signatureHash;

  // Update all documents as signed
  process.documents = process.documents.map(doc => ({
    ...doc,
    status: 'signed',
    signedAt: completionTime,
    signatureHash: crypto
      .createHash('sha256')
      .update(`${doc.documentHash}:${signatureHash}`)
      .digest('hex')
  }));

  // Store certificate information if provided
  if (certificateInfo) {
    process.certificateInfo = {
      issuer: certificateInfo.issuer,
      subject: certificateInfo.subject,
      validFrom: certificateInfo.validFrom,
      validTo: certificateInfo.validTo,
      serialNumber: certificateInfo.serialNumber,
      algorithm: certificateInfo.algorithm || process.signatureType
    };
  }

  // Mark completion step as done
  process.steps[process.steps.length - 1].status = 'completed';

  // Store in core framework if available
  if (coreFramework) {
    await storeSignatureResult(process);
  }
}

/**
 * Send signature notification to customer
 */
async function sendSignatureNotification(signatureProcess) {
  try {
    const { customerId, signatureUrl, notificationMethod, documents } = signatureProcess;

    // Mock notification sending
    console.log(`📧 Would send ${notificationMethod} notification to customer ${customerId}`);
    console.log(`📄 Documents to sign: ${documents.map(d => d.documentName).join(', ')}`);
    console.log(`🔗 Signature URL: ${signatureUrl}`);

    // Add notification step
    signatureProcess.steps.push({
      step: 'customer_notification',
      status: 'completed',
      timestamp: new Date(),
      method: notificationMethod
    });

    // In production, implement actual notification sending:
    // - Email with signature link
    // - SMS with short link
    // - App push notification
    // etc.

  } catch (error) {
    logger.warn('Failed to send signature notification:', error);
    
    signatureProcess.steps.push({
      step: 'customer_notification',
      status: 'failed',
      timestamp: new Date(),
      error: error.message
    });
  }
}

/**
 * Store signature result in core framework
 */
async function storeSignatureResult(signatureProcess) {
  try {
    const processOrchestrator = coreFramework.getComponent('processOrchestrator');
    
    if (processOrchestrator) {
      // Store signature completion event
      const auditData = {
        signatureId: signatureProcess.signatureId,
        customerId: signatureProcess.customerId,
        signatureType: signatureProcess.signatureType,
        documentsCount: signatureProcess.documents.length,
        signedAt: signatureProcess.signedAt,
        signatureHash: signatureProcess.signatureHash,
        certificateInfo: signatureProcess.certificateInfo
      };

      // Execute audit logging process step
      await processOrchestrator.executeProcess('signature_audit', {
        auditData,
        coreComponents: coreFramework.components
      });

      console.log('Signature result stored in core framework');
    }
  } catch (error) {
    logger.warn('Failed to store signature result in core framework:', error);
    // Don't fail the signature process if storage fails
  }
}

module.exports = router;
module.exports.setCoreFramework = setCoreFramework;