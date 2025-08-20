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

// In-memory storage for check processes (use database in production)
const checkProcesses = new Map();

/**
 * Perform comprehensive background checks
 * POST /checks/comprehensive
 */
router.post('/comprehensive', requireAuth, validateRequest('comprehensiveCheckRequest'), async (req, res) => {
  try {
    const {
      customerId,
      customerData,
      checkTypes
    } = req.body;

    const checkId = uuidv4();
    const startTime = new Date();

    logger.info('Comprehensive checks started', {
      checkId,
      customerId,
      checkTypes,
      institutionId: req.user.institutionId,
      userId: req.user.id
    });

    // Create check process record
    const checkProcess = {
      checkId,
      customerId,
      checkTypes,
      status: 'processing',
      startedAt: startTime,
      institutionId: req.user.institutionId,
      userId: req.user.id,
      results: {},
      overallRisk: 'unknown'
    };

    checkProcesses.set(checkId, checkProcess);

    try {
      // Execute each check type in parallel
      const checkPromises = checkTypes.map(checkType => 
        executeCheck(checkType, customerData, checkProcess)
      );

      const checkResults = await Promise.allSettled(checkPromises);

      // Process results
      for (let i = 0; i < checkTypes.length; i++) {
        const checkType = checkTypes[i];
        const result = checkResults[i];

        if (result.status === 'fulfilled') {
          checkProcess.results[checkType] = result.value;
        } else {
          checkProcess.results[checkType] = {
            status: 'error',
            error: result.reason.message,
            score: 0.5, // Neutral score on error
            timestamp: new Date().toISOString()
          };
        }
      }

      // Calculate overall risk assessment
      checkProcess.overallRisk = calculateOverallRisk(checkProcess.results);
      checkProcess.status = 'completed';
      checkProcess.completedAt = new Date();
      checkProcess.duration = checkProcess.completedAt - startTime;

      logger.info('Comprehensive checks completed', {
        checkId,
        overallRisk: checkProcess.overallRisk,
        duration: checkProcess.duration,
        checkCount: checkTypes.length
      });

      res.json({
        checkId,
        results: checkProcess.results,
        overallRisk: checkProcess.overallRisk,
        timestamp: checkProcess.completedAt,
        metadata: {
          duration: checkProcess.duration,
          checksPerformed: checkTypes,
          checkCount: checkTypes.length
        }
      });

    } catch (processingError) {
      checkProcess.status = 'error';
      checkProcess.completedAt = new Date();
      checkProcess.error = processingError.message;

      logger.error('Comprehensive checks failed', {
        checkId,
        error: processingError.message,
        customerId
      });

      res.status(500).json({
        checkId,
        status: 'error',
        error: 'PROCESSING_FAILED',
        message: processingError.message,
        timestamp: checkProcess.completedAt
      });
    }

  } catch (error) {
    logger.error('Error in comprehensive checks:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to process background checks',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get check results
 * GET /checks/comprehensive/:checkId
 */
router.get('/comprehensive/:checkId', requireAuth, (req, res) => {
  try {
    const { checkId } = req.params;
    const process = checkProcesses.get(checkId);

    if (!process) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Check process not found',
        timestamp: new Date().toISOString()
      });
    }

    // Check if user has permission to view this check
    if (process.institutionId !== req.user.institutionId) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Access denied to this check process',
        timestamp: new Date().toISOString()
      });
    }

    const response = {
      checkId: process.checkId,
      status: process.status,
      checkTypes: process.checkTypes,
      startedAt: process.startedAt,
      completedAt: process.completedAt,
      duration: process.duration,
      results: process.results,
      overallRisk: process.overallRisk
    };

    res.json(response);

  } catch (error) {
    logger.error('Error retrieving check results:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve check results',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Perform specific check type
 * POST /checks/:checkType
 */
router.post('/:checkType', requireAuth, async (req, res) => {
  try {
    const { checkType } = req.params;
    const { customerId, customerData } = req.body;

    if (!['sanctions', 'pep', 'crime', 'adverse_media', 'credit', 'zek_iko'].includes(checkType)) {
      return res.status(400).json({
        error: 'INVALID_CHECK_TYPE',
        message: `Unsupported check type: ${checkType}`,
        supportedTypes: ['sanctions', 'pep', 'crime', 'adverse_media', 'credit', 'zek_iko'],
        timestamp: new Date().toISOString()
      });
    }

    const checkId = uuidv4();

    logger.info('Individual check started', {
      checkId,
      checkType,
      customerId,
      institutionId: req.user.institutionId
    });

    const checkProcess = {
      checkId,
      customerId,
      checkTypes: [checkType],
      status: 'processing',
      startedAt: new Date(),
      institutionId: req.user.institutionId
    };

    const result = await executeCheck(checkType, customerData, checkProcess);

    logger.info('Individual check completed', {
      checkId,
      checkType,
      status: result.status,
      score: result.score
    });

    res.json({
      checkId,
      checkType,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error(`Error in ${req.params.checkType} check:`, error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: `Failed to perform ${req.params.checkType} check`,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Execute individual check
 */
async function executeCheck(checkType, customerData, checkProcess) {
  const startTime = Date.now();

  try {
    let result;

    switch (checkType) {
      case 'sanctions':
        result = await performSanctionsCheck(customerData);
        break;
      case 'pep':
        result = await performPepCheck(customerData);
        break;
      case 'crime':
        result = await performCrimeCheck(customerData);
        break;
      case 'adverse_media':
        result = await performAdverseMediaCheck(customerData);
        break;
      case 'credit':
        result = await performCreditCheck(customerData);
        break;
      case 'zek_iko':
        result = await performZekIkoCheck(customerData);
        break;
      default:
        throw new Error(`Unsupported check type: ${checkType}`);
    }

    return {
      ...result,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };

  } catch (error) {
    return {
      status: 'error',
      error: error.message,
      score: 0.5, // Neutral score on error
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Sanctions list screening
 */
async function performSanctionsCheck(customerData) {
  // Mock sanctions screening (implement actual screening service integration)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const riskScore = Math.random();
  
  if (riskScore > 0.95) {
    return {
      status: 'blocked',
      score: 1.0,
      details: 'Match found on sanctions list',
      matches: [{
        list: 'UN Consolidated List',
        matchScore: 0.98,
        reason: 'Name and DOB match'
      }]
    };
  } else if (riskScore > 0.85) {
    return {
      status: 'alert',
      score: 0.8,
      details: 'Potential match requiring review',
      matches: [{
        list: 'OFAC SDN List',
        matchScore: 0.72,
        reason: 'Similar name'
      }]
    };
  } else {
    return {
      status: 'clear',
      score: 0.05,
      details: 'No sanctions matches found',
      matches: []
    };
  }
}

/**
 * PEP (Politically Exposed Person) check
 */
async function performPepCheck(customerData) {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const riskScore = Math.random();
  
  if (riskScore > 0.92) {
    return {
      status: 'alert',
      score: 0.9,
      details: 'Customer identified as PEP',
      pepDetails: {
        category: 'domestic_pep',
        position: 'Government Official',
        country: 'CH',
        enhanced_dd_required: true
      }
    };
  } else if (riskScore > 0.85) {
    return {
      status: 'alert',
      score: 0.6,
      details: 'Customer is relative/associate of PEP',
      pepDetails: {
        category: 'rca_pep',
        relationship: 'family_member',
        enhanced_dd_required: true
      }
    };
  } else {
    return {
      status: 'clear',
      score: 0.1,
      details: 'No PEP connections found',
      pepDetails: null
    };
  }
}

/**
 * Criminal background check
 */
async function performCrimeCheck(customerData) {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const riskScore = Math.random();
  
  if (riskScore > 0.95) {
    return {
      status: 'alert',
      score: 0.95,
      details: 'Criminal record found',
      findings: [{
        type: 'financial_crime',
        severity: 'high',
        date: '2020-05-15',
        jurisdiction: 'CH'
      }]
    };
  } else {
    return {
      status: 'clear',
      score: 0.05,
      details: 'No criminal records found',
      findings: []
    };
  }
}

/**
 * Adverse media screening
 */
async function performAdverseMediaCheck(customerData) {
  await new Promise(resolve => setTimeout(resolve, 1800));

  const riskScore = Math.random();
  
  if (riskScore > 0.88) {
    return {
      status: 'alert',
      score: 0.75,
      details: 'Negative media coverage found',
      articles: [{
        title: 'Business dispute reported',
        date: '2023-03-20',
        source: 'Financial Times',
        relevance: 0.8
      }]
    };
  } else {
    return {
      status: 'clear',
      score: 0.15,
      details: 'No adverse media found',
      articles: []
    };
  }
}

/**
 * Credit bureau check
 */
async function performCreditCheck(customerData) {
  await new Promise(resolve => setTimeout(resolve, 2500));

  const riskScore = Math.random();
  const creditScore = Math.floor(300 + riskScore * 550); // 300-850 scale
  
  return {
    status: creditScore < 500 ? 'alert' : 'clear',
    score: riskScore,
    details: `Credit score: ${creditScore}`,
    creditInfo: {
      score: creditScore,
      rating: creditScore >= 700 ? 'excellent' : 
              creditScore >= 600 ? 'good' : 
              creditScore >= 500 ? 'fair' : 'poor',
      bureau: 'Swiss Credit Bureau',
      reportDate: new Date().toISOString()
    }
  };
}

/**
 * ZEK/IKO debt information check (Swiss-specific)
 */
async function performZekIkoCheck(customerData) {
  await new Promise(resolve => setTimeout(resolve, 1600));

  const riskScore = Math.random();
  
  if (riskScore > 0.85) {
    return {
      status: 'alert',
      score: 0.8,
      details: 'Debt information found',
      debts: [{
        type: 'credit_card_debt',
        amount: 25000,
        currency: 'CHF',
        status: 'active',
        reportingBank: 'Anonymized'
      }]
    };
  } else {
    return {
      status: 'clear',
      score: 0.2,
      details: 'No debt information found',
      debts: []
    };
  }
}

/**
 * Calculate overall risk assessment
 */
function calculateOverallRisk(results) {
  const scores = Object.values(results).map(r => r.score || 0.5);
  
  if (scores.length === 0) return 'unknown';
  
  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const maxScore = Math.max(...scores);
  
  // If any individual check has high risk, elevate overall risk
  if (maxScore >= 0.9) return 'high';
  if (avgScore >= 0.7) return 'high';
  if (avgScore >= 0.4) return 'medium';
  return 'low';
}

module.exports = router;
module.exports.setCoreFramework = setCoreFramework;