const express = require('express');
const crypto = require('crypto');
const logger = require('../utils/logger');
const { validateRequest } = require('../middleware/validation');
const { requireConsent } = require('../middleware/auth');

const router = express.Router();

// Mock customer database (use real database in production)
const customers = new Map();

// Initialize with sample data
const initializeSampleData = () => {
  const sampleCustomer = {
    sharedCustomerHash: crypto.createHash('sha256').update('Hans Müller 1985-03-15 CH').digest('hex'),
    basicData: {
      lastName: 'Müller',
      givenName: 'Hans Peter',
      birthDate: '1985-03-15',
      nationality: ['CH'],
      gender: 'male',
      maritalStatus: 'married',
      language: 'de'
    },
    contactInformation: {
      primaryEmail: 'hans.mueller@example.ch',
      mobilePhone: '+41791234567',
      preferredContactMethod: 'email',
      communicationLanguage: 'de'
    },
    addressData: {
      residentialAddress: {
        street: 'Bahnhofstrasse 1',
        postalCode: '8001',
        city: 'Zürich',
        region: 'ZH',
        country: 'CH',
        addressType: 'residential'
      }
    },
    identification: {
      identificationMethod: 'video_identification',
      documentType: 'id_card',
      documentNumber: 'E12345678',
      issuingAuthority: 'Stadt Zürich',
      issueDate: '2020-01-15',
      expiryDate: '2030-01-15',
      issuingCountry: 'CH',
      levelOfAssurance: 'high',
      verificationDate: '2024-01-10T10:00:00Z',
      verificationMethod: 'video_ident_with_document'
    },
    kycData: {
      occupation: 'Software Engineer',
      employer: 'Tech AG',
      employmentType: 'employed',
      annualIncome: {
        amount: 120000,
        currency: 'CHF'
      },
      totalAssets: {
        amount: 250000,
        currency: 'CHF'
      },
      sourceOfFunds: 'salary',
      pepStatus: false
    },
    complianceData: {
      fatcaStatus: 'non_us_person',
      crsReportable: false,
      taxResidencies: [
        {
          country: 'CH',
          isPrimary: true,
          tinNumber: '756.1234.5678.90'
        }
      ],
      sanctionsScreening: {
        sanctionsList: 'clear',
        pepCheck: 'clear',
        adverseMedia: 'clear',
        lastScreeningDate: '2024-01-10T10:00:00Z'
      },
      amlRiskRating: 'low'
    },
    metadata: {
      originator: 'CH-BANK-002',
      createdAt: '2024-01-10T10:00:00Z',
      lastUpdated: '2024-01-10T10:00:00Z',
      version: '1.0',
      dataClassification: 'confidential',
      verificationStatus: 'verified'
    }
  };
  
  customers.set(sampleCustomer.sharedCustomerHash, sampleCustomer);
  logger.info('Sample customer data initialized');
};

// Initialize sample data
initializeSampleData();

/**
 * Generate shared customer hash
 */
const generateSharedCustomerHash = (basicData) => {
  const hashInput = `${basicData.lastName} ${basicData.givenName} ${basicData.birthDate} ${basicData.nationality.join(',')}`;
  return crypto.createHash('sha256').update(hashInput).digest('hex');
};

/**
 * Check customer existence
 * POST /customer/check
 */
router.post('/check', validateRequest('customerCheck'), (req, res) => {
  try {
    const { sharedCustomerHash, basicData } = req.body;
    
    logger.info('Customer check request', {
      sharedCustomerHash,
      institutionId: req.user.institutionId,
      ip: req.ip
    });

    // Verify hash matches provided basic data
    const calculatedHash = generateSharedCustomerHash(basicData);
    if (calculatedHash !== sharedCustomerHash) {
      return res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Shared customer hash does not match provided basic data',
        timestamp: new Date().toISOString()
      });
    }

    const customer = customers.get(sharedCustomerHash);
    
    if (!customer) {
      logger.info('Customer not found', { sharedCustomerHash });
      return res.json({
        match: false
      });
    }

    // Verify basic data matches
    const dataMatches = 
      customer.basicData.lastName === basicData.lastName &&
      customer.basicData.givenName === basicData.givenName &&
      customer.basicData.birthDate === basicData.birthDate &&
      JSON.stringify(customer.basicData.nationality.sort()) === JSON.stringify(basicData.nationality.sort());

    if (!dataMatches) {
      logger.warn('Customer data mismatch', { sharedCustomerHash });
      return res.json({
        match: false
      });
    }

    // Check identification validity (24 months for banking)
    const identificationDate = new Date(customer.identification.verificationDate);
    const validityPeriod = 24 * 30 * 24 * 60 * 60 * 1000; // 24 months in milliseconds
    const validUntil = new Date(identificationDate.getTime() + validityPeriod);
    const isValid = validUntil > new Date();

    logger.info('Customer check successful', {
      sharedCustomerHash,
      match: true,
      valid: isValid
    });

    res.json({
      match: true,
      identificationDate: customer.identification.verificationDate,
      levelOfAssurance: customer.identification.levelOfAssurance,
      validUntil: validUntil.toISOString()
    });

  } catch (error) {
    logger.error('Error in customer check:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to check customer',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Request full customer dataset
 * POST /customer/fullRequest
 */
router.post('/fullRequest', 
  validateRequest('fullDataRequest'),
  requireConsent('accountOpening'),
  (req, res) => {
    try {
      const { sharedCustomerHash, purpose, consentToken } = req.body;

      logger.info('Full customer data request', {
        sharedCustomerHash,
        purpose,
        institutionId: req.user.institutionId,
        userId: req.user.id
      });

      const customer = customers.get(sharedCustomerHash);
      
      if (!customer) {
        return res.status(404).json({
          error: 'NOT_FOUND',
          message: 'Customer not found',
          timestamp: new Date().toISOString()
        });
      }

      // Verify consent allows access to this customer
      if (req.user.consent.customerId && req.user.consent.customerId !== sharedCustomerHash) {
        return res.status(403).json({
          error: 'FORBIDDEN',
          message: 'Consent does not cover this customer',
          timestamp: new Date().toISOString()
        });
      }

      // Filter data based on consent permissions
      const allowedCategories = req.user.consent.dataCategories || [];
      const responseData = {};

      if (allowedCategories.includes('basicData')) {
        responseData.basicData = customer.basicData;
      }

      if (allowedCategories.includes('contactInformation')) {
        responseData.contactInformation = customer.contactInformation;
      }

      if (allowedCategories.includes('addressData')) {
        responseData.addressData = customer.addressData;
      }

      if (allowedCategories.includes('identification')) {
        responseData.identification = {
          ...customer.identification,
          // Generate temporary signed URL for document image
          documentImageUrl: customer.identification.documentNumber ? 
            `${process.env.API_BASE_URL}/documents/${customer.identification.documentNumber}?token=${generateDocumentToken(customer.identification.documentNumber)}` : 
            undefined
        };
      }

      if (allowedCategories.includes('kycData')) {
        responseData.kycData = customer.kycData;
      }

      if (allowedCategories.includes('complianceData')) {
        responseData.complianceData = customer.complianceData;
      }

      if (allowedCategories.includes('riskProfile')) {
        responseData.riskProfile = customer.riskProfile;
      }

      // Always include metadata
      responseData.metadata = {
        ...customer.metadata,
        accessedAt: new Date().toISOString(),
        accessedBy: req.user.institutionId,
        purpose
      };

      logger.info('Customer data provided', {
        sharedCustomerHash,
        categories: allowedCategories,
        institutionId: req.user.institutionId
      });

      res.json(responseData);

    } catch (error) {
      logger.error('Error providing customer data:', error);
      res.status(500).json({
        error: 'INTERNAL_ERROR',
        message: 'Failed to provide customer data',
        timestamp: new Date().toISOString()
      });
    }
  }
);

/**
 * Generate temporary document access token
 */
const generateDocumentToken = (documentId) => {
  const payload = {
    documentId,
    exp: Math.floor(Date.now() / 1000) + (10 * 60), // 10 minutes
    purpose: 'document_access'
  };
  
  // In production, use proper JWT signing
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

/**
 * Update customer data (for providing institutions)
 * PUT /customer/:sharedCustomerHash
 */
router.put('/:sharedCustomerHash', validateRequest('updateCustomer'), (req, res) => {
  try {
    const { sharedCustomerHash } = req.params;
    const updates = req.body;

    const customer = customers.get(sharedCustomerHash);
    
    if (!customer) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Customer not found',
        timestamp: new Date().toISOString()
      });
    }

    // Only allow updates from the originating institution
    if (customer.metadata.originator !== req.user.institutionId) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Only originating institution can update customer data',
        timestamp: new Date().toISOString()
      });
    }

    // Merge updates with existing data
    const updatedCustomer = {
      ...customer,
      ...updates,
      metadata: {
        ...customer.metadata,
        lastUpdated: new Date().toISOString(),
        updatedBy: req.user.id,
        version: (parseFloat(customer.metadata.version) + 0.1).toFixed(1)
      }
    };

    customers.set(sharedCustomerHash, updatedCustomer);

    logger.info('Customer data updated', {
      sharedCustomerHash,
      updatedBy: req.user.id,
      institutionId: req.user.institutionId
    });

    res.json({
      sharedCustomerHash,
      version: updatedCustomer.metadata.version,
      lastUpdated: updatedCustomer.metadata.lastUpdated
    });

  } catch (error) {
    logger.error('Error updating customer data:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to update customer data',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;