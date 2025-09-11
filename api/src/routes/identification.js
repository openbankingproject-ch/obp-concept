const express = require('express');
const { v4: uuidv4 } = require('uuid');
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

// In-memory storage for identification processes (use database in production)
const identificationProcesses = new Map();

/**
 * Verify customer identification
 * POST /identification/verify
 */
router.post('/verify', requireAuth, validateRequest('identificationRequest'), async (req, res) => {
  try {
    const {
      customerId,
      identificationType,
      documentData,
      biometricData
    } = req.body;

    const verificationId = uuidv4();
    const startTime = new Date();

    logger.info('Identity verification started', {
      verificationId,
      customerId,
      identificationType,
      institutionId: req.user.institutionId,
      userId: req.user.id
    });

    // Create verification process record
    const verificationProcess = {
      verificationId,
      customerId,
      identificationType,
      status: 'processing',
      startedAt: startTime,
      institutionId: req.user.institutionId,
      userId: req.user.id,
      steps: [],
      metadata: {}
    };

    identificationProcesses.set(verificationId, verificationProcess);

    try {
      let verificationResult;

      // Process based on identification type
      switch (identificationType) {
        case 'eid_verification':
          verificationResult = await processEIdVerification(documentData, verificationProcess);
          break;
          
        case 'document_verification':
          verificationResult = await processDocumentVerification(documentData, verificationProcess);
          break;
          
        case 'biometric_verification':
          verificationResult = await processBiometricVerification(biometricData, verificationProcess);
          break;
          
        default:
          throw new Error(`Unsupported identification type: ${identificationType}`);
      }

      // Update process with results
      verificationProcess.status = verificationResult.success ? 'completed' : 'failed';
      verificationProcess.completedAt = new Date();
      verificationProcess.duration = verificationProcess.completedAt - startTime;
      verificationProcess.result = verificationResult;

      // Store verification results using core framework if available
      if (coreFramework && verificationResult.success) {
        await storeVerificationResult(verificationId, verificationResult, coreFramework);
      }

      logger.info('Identity verification completed', {
        verificationId,
        success: verificationResult.success,
        levelOfAssurance: verificationResult.levelOfAssurance,
        duration: verificationProcess.duration
      });

      res.json({
        verificationId,
        status: verificationResult.success ? 'success' : 'failed',
        levelOfAssurance: verificationResult.levelOfAssurance,
        verificationMethod: verificationResult.verificationMethod,
        timestamp: verificationProcess.completedAt,
        errors: verificationResult.errors || [],
        metadata: {
          duration: verificationProcess.duration,
          steps: verificationProcess.steps.length
        }
      });

    } catch (verificationError) {
      // Update process with error
      verificationProcess.status = 'error';
      verificationProcess.completedAt = new Date();
      verificationProcess.error = verificationError.message;

      logger.error('Identity verification failed', {
        verificationId,
        error: verificationError.message,
        customerId
      });

      res.status(400).json({
        verificationId,
        status: 'failed',
        error: 'VERIFICATION_FAILED',
        message: verificationError.message,
        timestamp: verificationProcess.completedAt
      });
    }

  } catch (error) {
    logger.error('Error in identity verification:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to process identity verification',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get verification status
 * GET /identification/verify/:verificationId
 */
router.get('/verify/:verificationId', requireAuth, (req, res) => {
  try {
    const { verificationId } = req.params;
    const process = identificationProcesses.get(verificationId);

    if (!process) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Verification process not found',
        timestamp: new Date().toISOString()
      });
    }

    // Check if user has permission to view this verification
    if (process.institutionId !== req.user.institutionId) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Access denied to this verification process',
        timestamp: new Date().toISOString()
      });
    }

    const response = {
      verificationId: process.verificationId,
      status: process.status,
      identificationType: process.identificationType,
      startedAt: process.startedAt,
      completedAt: process.completedAt,
      duration: process.duration,
      steps: process.steps.map(step => ({
        stepName: step.name,
        status: step.status,
        timestamp: step.timestamp
      }))
    };

    // Include result details if completed
    if (process.result) {
      response.levelOfAssurance = process.result.levelOfAssurance;
      response.verificationMethod = process.result.verificationMethod;
      response.errors = process.result.errors;
    }

    res.json(response);

  } catch (error) {
    logger.error('Error retrieving verification status:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve verification status',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Re-verify existing identification
 * POST /identification/reverify
 */
router.post('/reverify', requireAuth, async (req, res) => {
  try {
    const { customerId, reason } = req.body;

    if (!customerId) {
      return res.status(400).json({
        error: 'MISSING_PARAMETER',
        message: 'customerId is required',
        timestamp: new Date().toISOString()
      });
    }

    logger.info('Re-verification requested', {
      customerId,
      reason,
      institutionId: req.user.institutionId,
      userId: req.user.id
    });

    // Find existing verification for customer
    const existingVerifications = Array.from(identificationProcesses.values())
      .filter(p => p.customerId === customerId && p.status === 'completed')
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    if (existingVerifications.length === 0) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'No existing verification found for customer',
        timestamp: new Date().toISOString()
      });
    }

    const latestVerification = existingVerifications[0];
    
    // Check if re-verification is needed (e.g., if last verification was > 24 months ago)
    const verificationAge = Date.now() - new Date(latestVerification.completedAt);
    const maxAge = 24 * 30 * 24 * 60 * 60 * 1000; // 24 months in milliseconds

    const reverificationResult = {
      customerId,
      latestVerification: {
        verificationId: latestVerification.verificationId,
        completedAt: latestVerification.completedAt,
        levelOfAssurance: latestVerification.result?.levelOfAssurance,
        age: Math.floor(verificationAge / (24 * 60 * 60 * 1000)) // days
      },
      reverificationRequired: verificationAge > maxAge,
      reason: reason || 'periodic_review',
      timestamp: new Date().toISOString()
    };

    if (reverificationResult.reverificationRequired) {
      reverificationResult.message = 'Re-verification required - existing verification has expired';
      reverificationResult.maxAllowedAge = '24 months';
    } else {
      reverificationResult.message = 'Existing verification is still valid';
      reverificationResult.validUntil = new Date(new Date(latestVerification.completedAt).getTime() + maxAge).toISOString();
    }

    res.json(reverificationResult);

  } catch (error) {
    logger.error('Error in re-verification check:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to process re-verification request',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * E-ID verification process
 */
async function processEIdVerification(documentData, process) {
  process.steps.push({
    name: 'eid_validation',
    status: 'processing',
    timestamp: new Date()
  });

  // Mock E-ID verification (implement actual E-ID integration)
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time

  const success = Math.random() > 0.1; // 90% success rate for testing

  process.steps[process.steps.length - 1].status = success ? 'completed' : 'failed';

  if (success) {
    return {
      success: true,
      levelOfAssurance: 'high',
      verificationMethod: 'swiss_eid',
      documentType: 'eid',
      verificationDate: new Date().toISOString(),
      metadata: {
        eidProvider: 'SwissID',
        nfcVerified: true,
        biometricMatch: true
      }
    };
  } else {
    return {
      success: false,
      levelOfAssurance: 'none',
      errors: ['E-ID verification failed', 'Invalid or expired E-ID']
    };
  }
}

/**
 * Document verification process
 */
async function processDocumentVerification(documentData, process) {
  process.steps.push({
    name: 'document_analysis',
    status: 'processing',
    timestamp: new Date()
  });

  // Mock document verification
  await new Promise(resolve => setTimeout(resolve, 2000));

  const success = Math.random() > 0.2; // 80% success rate

  process.steps[process.steps.length - 1].status = success ? 'completed' : 'failed';

  if (success) {
    // Mock OCR and validation results
    return {
      success: true,
      levelOfAssurance: 'substantial',
      verificationMethod: 'document_ocr_validation',
      documentType: documentData.documentType || 'id_card',
      verificationDate: new Date().toISOString(),
      extractedData: {
        documentNumber: 'E12345678',
        issuingAuthority: 'Stadt Zürich',
        expiryDate: '2030-01-15'
      },
      metadata: {
        ocrConfidence: 0.96,
        securityFeatures: ['watermark', 'microprint'],
        documentQuality: 'good'
      }
    };
  } else {
    return {
      success: false,
      levelOfAssurance: 'none',
      errors: ['Document image quality too low', 'Unable to extract required information']
    };
  }
}

/**
 * Biometric verification process
 */
async function processBiometricVerification(biometricData, process) {
  process.steps.push({
    name: 'liveness_detection',
    status: 'processing',
    timestamp: new Date()
  });

  process.steps.push({
    name: 'face_matching',
    status: 'processing',
    timestamp: new Date()
  });

  // Mock biometric verification
  await new Promise(resolve => setTimeout(resolve, 3000));

  const livenessSuccess = Math.random() > 0.15; // 85% success rate
  const faceMatchSuccess = Math.random() > 0.1; // 90% success rate

  process.steps[0].status = livenessSuccess ? 'completed' : 'failed';
  process.steps[1].status = faceMatchSuccess ? 'completed' : 'failed';

  const overallSuccess = livenessSuccess && faceMatchSuccess;

  if (overallSuccess) {
    return {
      success: true,
      levelOfAssurance: 'high',
      verificationMethod: 'biometric_face_match',
      verificationDate: new Date().toISOString(),
      metadata: {
        livenessScore: 0.94,
        matchingScore: 0.88,
        qualityScore: 0.92
      }
    };
  } else {
    const errors = [];
    if (!livenessSuccess) errors.push('Liveness detection failed');
    if (!faceMatchSuccess) errors.push('Face matching failed');

    return {
      success: false,
      levelOfAssurance: 'none',
      errors
    };
  }
}

/**
 * Store verification result using core framework
 */
async function storeVerificationResult(verificationId, result, coreFramework) {
  try {
    // Use core framework to store verification result
    // This could integrate with the data models and process orchestrator
    
    const dataModels = coreFramework.getComponent('dataModels');
    if (dataModels) {
      // Store in universal format
      const universalResult = {
        verificationId,
        verificationDate: result.verificationDate,
        levelOfAssurance: result.levelOfAssurance,
        verificationMethod: result.verificationMethod,
        documentType: result.documentType,
        metadata: {
          ...result.metadata,
          storedAt: new Date().toISOString(),
          framework: 'openapi_kundenbeziehung'
        }
      };
      
      // TODO: Implement actual storage logic
      console.log('Verification result stored:', universalResult);
    }
  } catch (error) {
    logger.warn('Failed to store verification result in core framework:', error);
    // Don't fail the verification if storage fails
  }
}

module.exports = router;
module.exports.setCoreFramework = setCoreFramework;