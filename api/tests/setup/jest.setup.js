/**
 * Global Jest Setup
 * 
 * This file runs once before all tests and sets up global test configuration,
 * custom matchers, and shared utilities for the test environment.
 */

// Configure test environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce noise during testing

// Configure test-specific environment variables
process.env.JWT_SECRET = 'test-jwt-secret-change-in-production';
process.env.INTERNAL_API_TOKEN = 'test-internal-api-token';
process.env.SECURITY_DASHBOARD_TOKEN = 'test-security-dashboard-token';
process.env.SKIP_CLIENT_AUTH = 'false'; // Test with authentication enabled
process.env.TRUSTED_CERTS_DIR = './tests/fixtures/certificates';

// Mock external dependencies that should not be called during tests
jest.mock('node-fetch', () => jest.fn());

// Global test utilities
global.testUtils = {
  // Generate test JWT token
  generateTestJWT: (payload = {}) => {
    const jwt = require('jsonwebtoken');
    const defaultPayload = {
      sub: 'test-user-id',
      client_id: 'test-client-id',
      institution_id: 'TEST-BANK-001',
      scope: 'openid profile customer:read customer:write',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      iss: 'test-issuer'
    };
    
    return jwt.sign(
      { ...defaultPayload, ...payload },
      process.env.JWT_SECRET,
      { algorithm: 'HS256' } // Use HS256 for tests (simpler)
    );
  },

  // Generate test client certificate
  generateTestClientCert: (institutionId = 'TEST-BANK-001') => ({
    subject: {
      CN: `client.${institutionId.toLowerCase()}.test`,
      serialized: `CN=client.${institutionId.toLowerCase()}.test,O=Test Bank,C=CH`
    },
    issuer: {
      CN: 'Test CA',
      O: 'Test Authority'
    },
    valid_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    valid_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    fingerprint: 'AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD',
    modulus: Buffer.alloc(256, 'test') // Mock RSA modulus
  }),

  // Wait for async operations
  waitFor: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),

  // Clean up test data
  cleanup: async () => {
    // Clear any test data, close connections, etc.
    // This can be extended as needed
  }
};

// Custom Jest matchers
expect.extend({
  // Check if response is valid OAuth error
  toBeOAuthError(received) {
    const pass = received && 
                 typeof received.error === 'string' &&
                 ['invalid_request', 'invalid_client', 'invalid_grant', 
                  'unauthorized_client', 'unsupported_grant_type', 'invalid_scope',
                  'server_error', 'temporarily_unavailable'].includes(received.error);
    
    return {
      message: () => `expected ${JSON.stringify(received)} to be a valid OAuth error`,
      pass
    };
  },

  // Check if response is valid JWT
  toBeValidJWT(received) {
    const jwt = require('jsonwebtoken');
    let pass = false;
    let decoded = null;
    
    try {
      decoded = jwt.decode(received, { complete: true });
      pass = decoded && decoded.header && decoded.payload;
    } catch (error) {
      pass = false;
    }
    
    return {
      message: () => `expected ${received} to be a valid JWT`,
      pass
    };
  },

  // Check if response matches FAPI 2.0 requirements
  toBeFAPICompliant(received) {
    const requiredHeaders = ['cache-control', 'x-content-type-options'];
    const hasRequiredHeaders = requiredHeaders.every(header => 
      Object.keys(received.headers || {}).some(h => h.toLowerCase() === header)
    );
    
    return {
      message: () => `expected response to be FAPI 2.0 compliant`,
      pass: hasRequiredHeaders
    };
  },

  // Check if audit log entry is valid
  toBeValidAuditEntry(received) {
    const pass = received &&
                 typeof received.id === 'string' &&
                 received.timestamp instanceof Date &&
                 typeof received.eventType === 'string' &&
                 typeof received.eventData === 'object' &&
                 typeof received.hash === 'string';
    
    return {
      message: () => `expected ${JSON.stringify(received)} to be a valid audit entry`,
      pass
    };
  }
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit in test environment, just log
});

// Suppress deprecation warnings in test output
process.noDeprecation = true;

// Set longer timeout for async operations
jest.setTimeout(30000);

// Console methods to reduce noise during tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  // Only log errors that are not expected test errors
  const message = args.join(' ');
  if (!message.includes('Test error') && !message.includes('Expected error')) {
    originalConsoleError(...args);
  }
};

console.warn = (...args) => {
  // Only log warnings that are not expected test warnings
  const message = args.join(' ');
  if (!message.includes('Test warning') && !message.includes('Expected warning')) {
    originalConsoleWarn(...args);
  }
};