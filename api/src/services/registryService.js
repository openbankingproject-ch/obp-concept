/**
 * Registry Service
 * 
 * Business logic layer for participant registry operations that integrates
 * with the core framework participant registry.
 */

class RegistryService {
  constructor(coreFramework) {
    this.coreFramework = coreFramework;
    this.initialized = false;
  }

  async initialize() {
    console.log('🔄 Initializing Registry Service...');
    this.initialized = true;
    console.log('✅ Registry Service initialized');
  }

  /**
   * Register new participant
   */
  async registerParticipant(participantData, userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE',
          message: 'Core framework not available'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE',
          message: 'Participant registry not available'
        };
      }

      // Validate participant data using core framework
      const validationEngine = this.coreFramework.getComponent('validationEngine');
      if (validationEngine) {
        const validation = await validationEngine.validate(participantData, 'participantRegistration');
        if (!validation.valid) {
          return {
            success: false,
            error: 'VALIDATION_FAILED',
            details: validation.errors
          };
        }
      }

      // Enhance participant data with metadata
      const enhancedData = {
        ...participantData,
        registeredBy: userContext.institutionId,
        registrationDate: new Date().toISOString(),
        status: 'pending_verification',
        metadata: {
          registrationSource: 'api',
          registeredByUser: userContext.userId,
          ...participantData.metadata
        }
      };

      const result = await participantRegistry.register(enhancedData);

      return {
        success: true,
        participantId: result.participantId,
        status: result.status,
        trustScore: result.trustScore,
        registrationDate: result.registrationDate,
        verificationRequired: result.verificationRequired
      };

    } catch (error) {
      console.error('Error registering participant:', error);
      return {
        success: false,
        error: 'REGISTRATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Get participant information
   */
  async getParticipant(participantId, userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE'
        };
      }

      const participant = await participantRegistry.getParticipant(participantId);
      if (!participant) {
        return {
          success: false,
          error: 'PARTICIPANT_NOT_FOUND',
          message: 'Participant not found'
        };
      }

      // Check access permissions (participants can access their own data, others need specific permissions)
      if (participant.institutionId !== userContext.institutionId && 
          !userContext.permissions?.includes('registry_read_all')) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Insufficient permissions to access participant data'
        };
      }

      return {
        success: true,
        participant: {
          participantId: participant.participantId,
          institutionName: participant.institutionName,
          institutionId: participant.institutionId,
          industry: participant.industry,
          ecosystem: participant.ecosystem,
          capabilities: participant.capabilities,
          status: participant.status,
          trustScore: participant.trustScore,
          registrationDate: participant.registrationDate,
          lastActivity: participant.lastActivity,
          contactInfo: participant.contactInfo,
          certificationLevel: participant.certificationLevel
        }
      };

    } catch (error) {
      console.error('Error getting participant:', error);
      return {
        success: false,
        error: 'RETRIEVAL_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Update participant information
   */
  async updateParticipant(participantId, updates, userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE'
        };
      }

      const participant = await participantRegistry.getParticipant(participantId);
      if (!participant) {
        return {
          success: false,
          error: 'PARTICIPANT_NOT_FOUND'
        };
      }

      // Only allow participants to update their own data
      if (participant.institutionId !== userContext.institutionId) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Can only update own participant data'
        };
      }

      // Add update metadata
      const enhancedUpdates = {
        ...updates,
        lastUpdated: new Date().toISOString(),
        updatedBy: userContext.userId
      };

      const result = await participantRegistry.updateParticipant(participantId, enhancedUpdates);

      return {
        success: true,
        participantId: result.participantId,
        version: result.version,
        lastUpdated: result.lastUpdated
      };

    } catch (error) {
      console.error('Error updating participant:', error);
      return {
        success: false,
        error: 'UPDATE_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Discover participants by capabilities
   */
  async discoverParticipants(capability, industry = null, userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE'
        };
      }

      const discoveredParticipants = await participantRegistry.discoverParticipants(capability, industry);

      // Filter participants based on user's context and permissions
      const filteredParticipants = discoveredParticipants.filter(participant => {
        // Always show verified participants
        if (participant.status === 'verified') return true;
        
        // Show own participant regardless of status
        if (participant.institutionId === userContext.institutionId) return true;
        
        // Show others only if they're active
        return participant.status === 'active';
      });

      return {
        success: true,
        participants: filteredParticipants.map(p => ({
          participantId: p.participantId,
          institutionName: p.institutionName,
          industry: p.industry,
          ecosystem: p.ecosystem,
          capabilities: p.capabilities,
          trustScore: p.trustScore,
          status: p.status,
          certificationLevel: p.certificationLevel
        })),
        totalFound: filteredParticipants.length,
        searchCriteria: {
          capability,
          industry,
          requestedBy: userContext.institutionId
        }
      };

    } catch (error) {
      console.error('Error discovering participants:', error);
      return {
        success: false,
        error: 'DISCOVERY_ERROR',
        message: error.message
      };
    }
  }

  /**
   * List all participants (admin function)
   */
  async listParticipants(filters = {}, userContext) {
    try {
      // Check admin permissions
      if (!userContext.permissions?.includes('registry_admin')) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Admin permissions required'
        };
      }

      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE'
        };
      }

      const allParticipants = Array.from(participantRegistry.participants.values());
      
      // Apply filters
      let filteredParticipants = allParticipants;
      
      if (filters.industry) {
        filteredParticipants = filteredParticipants.filter(p => p.industry === filters.industry);
      }
      
      if (filters.status) {
        filteredParticipants = filteredParticipants.filter(p => p.status === filters.status);
      }
      
      if (filters.ecosystem) {
        filteredParticipants = filteredParticipants.filter(p => p.ecosystem === filters.ecosystem);
      }

      return {
        success: true,
        participants: filteredParticipants.map(p => ({
          participantId: p.participantId,
          institutionName: p.institutionName,
          institutionId: p.institutionId,
          industry: p.industry,
          ecosystem: p.ecosystem,
          capabilities: p.capabilities,
          status: p.status,
          trustScore: p.trustScore,
          registrationDate: p.registrationDate,
          lastActivity: p.lastActivity
        })),
        totalCount: filteredParticipants.length,
        filters: filters
      };

    } catch (error) {
      console.error('Error listing participants:', error);
      return {
        success: false,
        error: 'LISTING_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Get registry statistics
   */
  async getRegistryStats(userContext) {
    try {
      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE'
        };
      }

      const allParticipants = Array.from(participantRegistry.participants.values());

      const stats = {
        totalParticipants: allParticipants.length,
        participantsByStatus: {
          verified: allParticipants.filter(p => p.status === 'verified').length,
          active: allParticipants.filter(p => p.status === 'active').length,
          pending: allParticipants.filter(p => p.status === 'pending_verification').length,
          suspended: allParticipants.filter(p => p.status === 'suspended').length
        },
        participantsByIndustry: this.groupParticipantsByIndustry(allParticipants),
        participantsByEcosystem: this.groupParticipantsByEcosystem(allParticipants),
        averageTrustScore: this.calculateAverageTrustScore(allParticipants),
        recentRegistrations: this.getRecentRegistrations(allParticipants),
        generatedAt: new Date().toISOString()
      };

      return {
        success: true,
        stats
      };

    } catch (error) {
      console.error('Error getting registry stats:', error);
      return {
        success: false,
        error: 'STATS_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Group participants by industry
   */
  groupParticipantsByIndustry(participants) {
    const industryGroups = {};
    participants.forEach(p => {
      industryGroups[p.industry] = (industryGroups[p.industry] || 0) + 1;
    });
    return industryGroups;
  }

  /**
   * Group participants by ecosystem
   */
  groupParticipantsByEcosystem(participants) {
    const ecosystemGroups = {};
    participants.forEach(p => {
      ecosystemGroups[p.ecosystem] = (ecosystemGroups[p.ecosystem] || 0) + 1;
    });
    return ecosystemGroups;
  }

  /**
   * Calculate average trust score
   */
  calculateAverageTrustScore(participants) {
    if (participants.length === 0) return 0;
    
    const totalTrust = participants.reduce((sum, p) => sum + (p.trustScore || 0), 0);
    return Math.round((totalTrust / participants.length) * 10) / 10;
  }

  /**
   * Get recent registrations (last 7 days)
   */
  getRecentRegistrations(participants) {
    const sevenDaysAgo = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
    
    return participants.filter(p => 
      new Date(p.registrationDate) >= sevenDaysAgo
    ).length;
  }

  /**
   * Verify participant (admin function)
   */
  async verifyParticipant(participantId, verificationData, userContext) {
    try {
      // Check admin permissions
      if (!userContext.permissions?.includes('registry_admin')) {
        return {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'Admin permissions required'
        };
      }

      if (!this.coreFramework) {
        return {
          success: false,
          error: 'CORE_FRAMEWORK_UNAVAILABLE'
        };
      }

      const participantRegistry = this.coreFramework.getComponent('participantRegistry');
      if (!participantRegistry) {
        return {
          success: false,
          error: 'REGISTRY_UNAVAILABLE'
        };
      }

      const result = await participantRegistry.verifyParticipant(participantId, {
        ...verificationData,
        verifiedBy: userContext.userId,
        verificationDate: new Date().toISOString()
      });

      return {
        success: true,
        participantId: result.participantId,
        status: result.status,
        trustScore: result.trustScore,
        verificationDate: result.verificationDate
      };

    } catch (error) {
      console.error('Error verifying participant:', error);
      return {
        success: false,
        error: 'VERIFICATION_ERROR',
        message: error.message
      };
    }
  }

  /**
   * Health status
   */
  async getHealthStatus() {
    try {
      let registryHealth = 'unavailable';
      let participantCount = 0;

      if (this.coreFramework) {
        const participantRegistry = this.coreFramework.getComponent('participantRegistry');
        if (participantRegistry) {
          registryHealth = 'available';
          participantCount = participantRegistry.participants.size;
        }
      }

      return {
        status: this.initialized ? 'healthy' : 'not_initialized',
        initialized: this.initialized,
        coreFrameworkIntegration: !!this.coreFramework,
        participantRegistry: registryHealth,
        statistics: {
          participantCount
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
    console.log('🔄 Shutting down Registry Service...');
    this.initialized = false;
    console.log('✅ Registry Service shutdown complete');
  }
}

module.exports = RegistryService;