/**
 * Universal Trust Network
 * 
 * Manages trust relationships and network topology for the federated system,
 * supporting hybrid architecture with central standards and decentralized data.
 */

const crypto = require('crypto');

/**
 * Trust Network Manager
 */
class TrustNetwork {
  constructor(config = {}) {
    this.config = {
      enableTrustPropagation: true,
      trustDecayRate: 0.02, // 2% decay per month
      minTrustThreshold: 0.3,
      maxTrustChainLength: 3,
      enableCrossBorder: false,
      ...config
    };
    
    this.trustRelationships = new Map();
    this.reputationScores = new Map();
    this.trustChains = new Map(); // Cached trust chains
    this.networkTopology = new Map();
    this.trustEvents = [];
  }

  async initialize() {
    console.log(' Initializing Trust Network...');
    
    // Initialize network topology
    this.initializeNetworkTopology();
    
    // Start trust maintenance
    this.startTrustMaintenance();
    
    console.log(' Trust Network initialized');
  }

  initializeNetworkTopology() {
    this.networkTopology.set('architecture', 'hybrid_federated');
    this.networkTopology.set('hubs', new Set());
    this.networkTopology.set('participants', new Set());
    this.networkTopology.set('edges', new Map());
    
    // System as primary hub
    const systemHub = 'SYSTEM-API-001';
    this.networkTopology.get('hubs').add(systemHub);
    this.networkTopology.get('participants').add(systemHub);
    this.reputationScores.set(systemHub, {
      score: 1.0,
      interactions: 0,
      lastUpdated: new Date()
    });
  }

  async establishTrust(fromParticipant, toParticipant, trustLevel = 0.5, metadata = {}) {
    const trustKey = `${fromParticipant}:${toParticipant}`;
    
    const trustRelationship = {
      from: fromParticipant,
      to: toParticipant,
      trustLevel: Math.min(Math.max(trustLevel, 0), 1),
      establishedAt: new Date(),
      lastVerified: new Date(),
      metadata: {
        establishmentReason: metadata.reason || 'manual',
        industry: metadata.industry,
        mutualTrust: metadata.mutualTrust || false,
        ...metadata
      },
      status: 'active'
    };
    
    this.trustRelationships.set(trustKey, trustRelationship);
    
    if (trustRelationship.metadata.mutualTrust) {
      const reverseTrustKey = `${toParticipant}:${fromParticipant}`;
      this.trustRelationships.set(reverseTrustKey, {
        ...trustRelationship,
        from: toParticipant,
        to: fromParticipant
      });
    }
    
    this.recordTrustEvent('trust_established', {
      from: fromParticipant,
      to: toParticipant,
      trustLevel,
      mutual: trustRelationship.metadata.mutualTrust
    });
    
    console.log(` Trust established: ${fromParticipant} -> ${toParticipant} (${trustLevel})`);
    
    return { success: true, trustKey, trustLevel: trustRelationship.trustLevel };
  }

  async calculateTrust(fromParticipant, toParticipant) {
    // Direct trust check
    const directTrust = this.getDirectTrust(fromParticipant, toParticipant);
    if (directTrust) {
      return {
        trustLevel: directTrust.trustLevel,
        path: [fromParticipant, toParticipant],
        hops: 1,
        type: 'direct'
      };
    }
    
    // Trust chain if enabled
    if (this.config.enableTrustPropagation) {
      const trustChain = this.findTrustChain(fromParticipant, toParticipant);
      if (trustChain) return trustChain;
    }
    
    return {
      trustLevel: 0,
      path: [],
      hops: 0,
      type: 'none'
    };
  }

  findTrustChain(fromParticipant, toParticipant, maxHops = 3) {
    const visited = new Set();
    const queue = [{ participant: fromParticipant, path: [fromParticipant], trustLevel: 1.0, hops: 0 }];
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      if (current.hops >= maxHops || visited.has(current.participant)) {
        continue;
      }
      
      visited.add(current.participant);
      
      const outgoingTrusts = this.getOutgoingTrusts(current.participant);
      
      for (const trust of outgoingTrusts) {
        const cumulativeTrust = current.trustLevel * trust.trustLevel;
        
        if (trust.to === toParticipant) {
          return {
            trustLevel: cumulativeTrust,
            path: [...current.path, trust.to],
            hops: current.hops + 1,
            type: 'chain'
          };
        }
        
        if (cumulativeTrust >= this.config.minTrustThreshold) {
          queue.push({
            participant: trust.to,
            path: [...current.path, trust.to],
            trustLevel: cumulativeTrust,
            hops: current.hops + 1
          });
        }
      }
    }
    
    return null;
  }

  async recordInteraction(fromParticipant, toParticipant, interactionData) {
    const trustKey = `${fromParticipant}:${toParticipant}`;
    const trust = this.trustRelationships.get(trustKey);
    
    if (!trust) return;
    
    let trustAdjustment = 0;
    
    if (interactionData.success) {
      trustAdjustment = 0.01;
      if (interactionData.responseTime < 1000) {
        trustAdjustment += 0.005;
      }
    } else {
      trustAdjustment = -0.05;
    }
    
    trust.trustLevel = Math.min(Math.max(trust.trustLevel + trustAdjustment, 0), 1);
    trust.lastVerified = new Date();
    
    this.updateReputationScore(toParticipant, interactionData);
    
    this.recordTrustEvent('interaction_recorded', {
      from: fromParticipant,
      to: toParticipant,
      success: interactionData.success,
      trustAdjustment
    });
  }

  updateReputationScore(participantId, interactionData) {
    let reputation = this.reputationScores.get(participantId) || {
      score: 0.5,
      interactions: 0,
      lastUpdated: new Date()
    };
    
    if (interactionData.success) {
      reputation.score = Math.min(reputation.score + 0.01, 1.0);
    } else {
      reputation.score = Math.max(reputation.score - 0.02, 0);
    }
    
    reputation.interactions += 1;
    reputation.lastUpdated = new Date();
    
    this.reputationScores.set(participantId, reputation);
  }

  getDirectTrust(from, to) {
    return this.trustRelationships.get(`${from}:${to}`);
  }

  getOutgoingTrusts(participantId) {
    return Array.from(this.trustRelationships.values()).filter(t => t.from === participantId);
  }

  getNetworkStats() {
    const participants = this.networkTopology.get('participants');
    const trustLevels = Array.from(this.trustRelationships.values()).map(t => t.trustLevel);
    const avgTrust = trustLevels.reduce((sum, t) => sum + t, 0) / trustLevels.length || 0;
    
    return {
      participants: participants.size,
      trustRelationships: this.trustRelationships.size,
      averageTrust: avgTrust,
      trustDistribution: {
        high: trustLevels.filter(t => t >= 0.8).length,
        medium: trustLevels.filter(t => t >= 0.5 && t < 0.8).length,
        low: trustLevels.filter(t => t < 0.5).length
      }
    };
  }

  recordTrustEvent(eventType, eventData) {
    this.trustEvents.push({
      type: eventType,
      data: eventData,
      timestamp: new Date(),
      id: crypto.randomUUID()
    });
    
    // Keep last 1000 events
    if (this.trustEvents.length > 1000) {
      this.trustEvents = this.trustEvents.slice(-1000);
    }
  }

  startTrustMaintenance() {
    // Daily trust decay
    setInterval(() => {
      this.applyTrustDecay();
    }, 24 * 60 * 60 * 1000);
  }

  applyTrustDecay() {
    const now = new Date();
    let decayedCount = 0;
    
    for (const [key, trust] of this.trustRelationships) {
      const monthsAge = (now - trust.lastVerified) / (30 * 24 * 60 * 60 * 1000);
      
      if (monthsAge > 0) {
        const decayAmount = monthsAge * this.config.trustDecayRate;
        const newTrustLevel = Math.max(trust.trustLevel - decayAmount, 0);
        
        if (newTrustLevel !== trust.trustLevel) {
          trust.trustLevel = newTrustLevel;
          decayedCount++;
          
          if (newTrustLevel === 0) {
            this.trustRelationships.delete(key);
          }
        }
      }
    }
    
    if (decayedCount > 0) {
      console.log(`🕰 Applied trust decay to ${decayedCount} relationships`);
    }
  }

  async getHealthStatus() {
    const stats = this.getNetworkStats();
    
    return {
      status: stats.participants > 0 ? 'healthy' : 'degraded',
      network: {
        participants: stats.participants,
        relationships: stats.trustRelationships,
        avgTrust: stats.averageTrust
      }
    };
  }

  async shutdown() {
    console.log(' Shutting down Trust Network...');
    console.log(' Trust Network shutdown complete');
  }
}

module.exports = TrustNetwork;