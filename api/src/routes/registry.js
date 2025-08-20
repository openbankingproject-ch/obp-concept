const express = require('express');
const logger = require('../utils/logger');
const { validateRequest } = require('../middleware/validation');
const { requireScope } = require('../middleware/auth');

const router = express.Router();

// Mock core framework reference (will be injected by app.js)
let coreFramework = null;

/**
 * Set core framework reference
 */
function setCoreFramework(framework) {
  coreFramework = framework;
}

/**
 * List all participants in the network
 * GET /registry/participants
 */
router.get('/participants', async (req, res) => {
  try {
    const {
      industry,
      ecosystem,
      status = 'active',
      capabilities,
      trustLevel,
      limit = 50,
      offset = 0
    } = req.query;

    if (!coreFramework) {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'Core framework not available',
        timestamp: new Date().toISOString()
      });
    }

    const registryHandler = coreFramework.createRegistryHandler();
    
    // Build filters
    const filters = {
      industry,
      ecosystem,
      status,
      capabilities: capabilities ? capabilities.split(',') : undefined,
      trustLevel,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const participantList = registryHandler.getParticipants(filters);

    logger.info('Participants listed', {
      filters,
      resultCount: participantList.participants.length,
      totalParticipants: participantList.total,
      requestedBy: req.user?.institutionId || 'anonymous'
    });

    res.json({
      participants: participantList.participants,
      pagination: {
        limit: filters.limit,
        offset: filters.offset,
        total: participantList.total,
        hasMore: filters.offset + filters.limit < participantList.total
      },
      summary: {
        industries: participantList.industries,
        ecosystems: participantList.ecosystems,
        totalParticipants: participantList.total
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error listing participants:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to list participants',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Register a new participant
 * POST /registry/participants
 */
router.post('/participants', 
  requireScope('registry:write'),
  validateRequest('participantRegistration'),
  async (req, res) => {
    try {
      if (!coreFramework) {
        return res.status(503).json({
          error: 'SERVICE_UNAVAILABLE',
          message: 'Core framework not available',
          timestamp: new Date().toISOString()
        });
      }

      const registryHandler = coreFramework.createRegistryHandler();
      
      // Add registration metadata
      const participantData = {
        ...req.body,
        registeredBy: req.user.institutionId,
        registrationDate: new Date().toISOString(),
        apiVersion: '1.0'
      };

      const registrationResult = await registryHandler.registerParticipant(participantData);

      logger.info('Participant registered', {
        participantId: participantData.participantId,
        industry: participantData.industry,
        registeredBy: req.user.institutionId,
        trustScore: registrationResult.trustScore
      });

      res.status(201).json({
        success: true,
        participantId: registrationResult.participantId,
        status: registrationResult.status,
        trustScore: registrationResult.trustScore,
        registeredAt: registrationResult.registeredAt,
        message: 'Participant registered successfully'
      });

    } catch (error) {
      logger.error('Error registering participant:', error);
      
      if (error.message.includes('already registered')) {
        return res.status(409).json({
          error: 'PARTICIPANT_EXISTS',
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }

      if (error.message.includes('validation failed')) {
        return res.status(400).json({
          error: 'VALIDATION_FAILED',
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }

      res.status(500).json({
        error: 'INTERNAL_ERROR',
        message: 'Failed to register participant',
        timestamp: new Date().toISOString()
      });
    }
  }
);

/**
 * Get specific participant details
 * GET /registry/participants/:participantId
 */
router.get('/participants/:participantId', async (req, res) => {
  try {
    const { participantId } = req.params;

    if (!coreFramework) {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'Core framework not available',
        timestamp: new Date().toISOString()
      });
    }

    const registryHandler = coreFramework.createRegistryHandler();
    const validation = await registryHandler.validateParticipant(participantId);

    if (!validation.valid) {
      return res.status(404).json({
        error: 'PARTICIPANT_NOT_FOUND',
        message: validation.message || 'Participant not found',
        timestamp: new Date().toISOString()
      });
    }

    // Get trust network status
    let trustStatus = null;
    try {
      const trustNetwork = coreFramework.getComponent('trustNetwork');
      if (trustNetwork) {
        trustStatus = trustNetwork.getParticipantTrustStatus(participantId);
      }
    } catch (error) {
      logger.warn('Could not retrieve trust status:', error);
    }

    const response = {
      participant: validation.participant,
      trustStatus,
      timestamp: new Date().toISOString()
    };

    logger.debug('Participant details retrieved', {
      participantId,
      requestedBy: req.user?.institutionId || 'anonymous'
    });

    res.json(response);

  } catch (error) {
    logger.error('Error retrieving participant details:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve participant details',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Discover participants by capability
 * GET /registry/discover
 */
router.get('/discover', async (req, res) => {
  try {
    const {
      capability,
      industry,
      minTrustScore = 0.5,
      maxResults = 10
    } = req.query;

    if (!capability) {
      return res.status(400).json({
        error: 'MISSING_PARAMETER',
        message: 'capability parameter is required',
        timestamp: new Date().toISOString()
      });
    }

    if (!coreFramework) {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'Core framework not available',
        timestamp: new Date().toISOString()
      });
    }

    const participantRegistry = coreFramework.getComponent('participantRegistry');
    
    if (!participantRegistry) {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'Participant registry not available',
        timestamp: new Date().toISOString()
      });
    }

    const discoveredParticipants = participantRegistry.discoverParticipants(capability, industry)
      .filter(p => p.trustScore >= parseFloat(minTrustScore))
      .slice(0, parseInt(maxResults));

    logger.info('Participant discovery', {
      capability,
      industry,
      minTrustScore,
      foundCount: discoveredParticipants.length,
      requestedBy: req.user?.institutionId || 'anonymous'
    });

    res.json({
      discovery: {
        capability,
        industry,
        minTrustScore: parseFloat(minTrustScore),
        maxResults: parseInt(maxResults)
      },
      participants: discoveredParticipants,
      count: discoveredParticipants.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error in participant discovery:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to discover participants',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get network statistics
 * GET /registry/stats
 */
router.get('/stats', requireScope('registry:read'), async (req, res) => {
  try {
    if (!coreFramework) {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'Core framework not available',
        timestamp: new Date().toISOString()
      });
    }

    const participantRegistry = coreFramework.getComponent('participantRegistry');
    const trustNetwork = coreFramework.getComponent('trustNetwork');

    const stats = {
      timestamp: new Date().toISOString(),
      registry: {},
      trustNetwork: {},
      overview: {}
    };

    // Get registry statistics
    if (participantRegistry) {
      const registryHealth = await participantRegistry.getHealthStatus();
      stats.registry = registryHealth;
    }

    // Get trust network statistics
    if (trustNetwork) {
      const networkStats = trustNetwork.getNetworkStats();
      stats.trustNetwork = networkStats;
    }

    // Calculate overview statistics
    stats.overview = {
      totalParticipants: stats.registry.participants?.total || 0,
      activeParticipants: stats.registry.participants?.active || 0,
      trustRelationships: stats.trustNetwork.trustRelationships || 0,
      averageTrust: stats.trustNetwork.averageTrust || 0,
      networkHealth: 'healthy' // TODO: Calculate based on various factors
    };

    logger.info('Network statistics requested', {
      requestedBy: req.user.institutionId,
      totalParticipants: stats.overview.totalParticipants
    });

    res.json(stats);

  } catch (error) {
    logger.error('Error retrieving network statistics:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve network statistics',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Update participant information (only by the participant itself)
 * PUT /registry/participants/:participantId
 */
router.put('/participants/:participantId',
  requireScope('registry:write'),
  async (req, res) => {
    try {
      const { participantId } = req.params;
      const updates = req.body;

      if (!coreFramework) {
        return res.status(503).json({
          error: 'SERVICE_UNAVAILABLE',
          message: 'Core framework not available',
          timestamp: new Date().toISOString()
        });
      }

      // Only allow participants to update their own information
      if (req.user.institutionId !== participantId) {
        return res.status(403).json({
          error: 'FORBIDDEN',
          message: 'Can only update own participant information',
          timestamp: new Date().toISOString()
        });
      }

      const participantRegistry = coreFramework.getComponent('participantRegistry');
      
      if (!participantRegistry) {
        return res.status(503).json({
          error: 'SERVICE_UNAVAILABLE',
          message: 'Participant registry not available',
          timestamp: new Date().toISOString()
        });
      }

      // Add update metadata
      const updateData = {
        ...updates,
        lastUpdatedBy: req.user.institutionId,
        lastUpdatedAt: new Date().toISOString()
      };

      const updatedParticipant = await participantRegistry.updateParticipant(participantId, updateData);

      logger.info('Participant updated', {
        participantId,
        updatedBy: req.user.institutionId,
        updateFields: Object.keys(updates)
      });

      res.json({
        success: true,
        participantId,
        lastUpdated: updatedParticipant.lastUpdated,
        message: 'Participant information updated successfully'
      });

    } catch (error) {
      logger.error('Error updating participant:', error);
      
      if (error.message.includes('not found')) {
        return res.status(404).json({
          error: 'PARTICIPANT_NOT_FOUND',
          message: 'Participant not found',
          timestamp: new Date().toISOString()
        });
      }

      res.status(500).json({
        error: 'INTERNAL_ERROR',
        message: 'Failed to update participant',
        timestamp: new Date().toISOString()
      });
    }
  }
);

module.exports = router;
module.exports.setCoreFramework = setCoreFramework;