/**
 * Unit Test Setup
 * 
 * Configuration and utilities specific to unit testing.
 * Unit tests should test individual functions and modules in isolation.
 */

// Mock all external dependencies for unit tests
jest.mock('../../src/utils/logger', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn()
}));

// Mock database connections
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  connection: {
    close: jest.fn().mockResolvedValue({})
  },
  model: jest.fn(),
  Schema: jest.fn()
}));

// Mock Redis connections
jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn().mockResolvedValue({}),
    disconnect: jest.fn().mockResolvedValue({}),
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn()
  }))
}));

// Mock crypto for deterministic tests
jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn((size) => Buffer.alloc(size, 'test')),
  randomUUID: jest.fn(() => 'test-uuid-' + Date.now())
}));

// Unit test utilities
global.unitTestUtils = {
  // Create mock request object
  createMockRequest: (overrides = {}) => ({
    method: 'GET',
    path: '/test',
    headers: {},
    query: {},
    body: {},
    params: {},
    ip: '127.0.0.1',
    user: null,
    client: null,
    ...overrides
  }),

  // Create mock response object
  createMockResponse: () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis()
    };
    return res;
  },

  // Create mock next function
  createMockNext: () => jest.fn(),

  // Mock middleware dependencies
  mockMiddlewareDeps: () => ({
    securityAudit: {
      logAuthenticationEvent: jest.fn(),
      logTokenIssuanceEvent: jest.fn(),
      logConsentEvent: jest.fn(),
      logFAPIComplianceEvent: jest.fn(),
      logSecurityIncident: jest.fn(),
      logAPIAccessEvent: jest.fn(),
      validateFAPICompliance: jest.fn(() => []),
      getSecurityMetrics: jest.fn(() => ({
        authenticationAttempts: 0,
        authenticationFailures: 0,
        tokenIssuances: 0,
        consentViolations: 0,
        securityIncidents: 0,
        fapiViolations: 0
      }))
    }
  }),

  // Mock OAuth client
  createMockOAuthClient: (overrides = {}) => ({
    client_id: 'test-client-001',
    client_name: 'Test Client',
    redirect_uris: ['https://client.test/callback'],
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    scope: 'openid profile customer:read',
    token_endpoint_auth_method: 'private_key_jwt',
    require_pushed_authorization_requests: true,
    status: 'active',
    ...overrides
  }),

  // Mock JWT payload
  createMockJWTPayload: (overrides = {}) => ({
    sub: 'test-user-id',
    iss: 'test-issuer',
    aud: 'test-audience',
    client_id: 'test-client-001',
    scope: 'openid profile customer:read',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    ...overrides
  })
};

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});