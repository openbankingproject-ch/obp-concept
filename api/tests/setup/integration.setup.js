/**
 * Integration Test Setup
 * 
 * Configuration for integration tests that test API contracts,
 * service communication, and external dependencies.
 */

const request = require('supertest');

// Integration test utilities
global.integrationTestUtils = {
  // Test server instance (will be set in individual test files)
  testServer: null,

  // Create test client for API requests
  createTestClient: (app) => {
    return {
      get: (url) => request(app).get(url),
      post: (url) => request(app).post(url),
      put: (url) => request(app).put(url),
      delete: (url) => request(app).delete(url),
      patch: (url) => request(app).patch(url)
    };
  },

  // Add authentication headers
  withAuth: (testRequest, token) => {
    return testRequest.set('Authorization', `Bearer ${token}`);
  },

  // Add DPoP headers
  withDPoP: (testRequest, dpopProof) => {
    return testRequest.set('DPoP', dpopProof);
  },

  // Add client certificate headers (for testing mTLS simulation)
  withClientCert: (testRequest, cert) => {
    const certHeader = Buffer.from(JSON.stringify(cert)).toString('base64');
    return testRequest.set('X-Client-Certificate', certHeader);
  },

  // Validate OAuth error response
  validateOAuthError: (response, expectedError) => {
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body).toHaveProperty('error', expectedError);
    expect(response.body).toHaveProperty('error_description');
    expect(response.body).toHaveProperty('timestamp');
  },

  // Validate successful token response
  validateTokenResponse: (response) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('token_type');
    expect(response.body).toHaveProperty('expires_in');
    expect(response.body.access_token).toBeValidJWT();
  },

  // Validate OIDC discovery response
  validateDiscoveryResponse: (response) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('issuer');
    expect(response.body).toHaveProperty('authorization_endpoint');
    expect(response.body).toHaveProperty('token_endpoint');
    expect(response.body).toHaveProperty('jwks_uri');
    expect(response.body).toHaveProperty('response_types_supported');
    expect(response.body).toHaveProperty('subject_types_supported');
  },

  // Generate test DPoP proof
  generateDPoPProof: async (httpMethod, httpUri, accessToken = null) => {
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    const { v4: uuidv4 } = require('uuid');

    // Generate test key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    // Export public key as JWK
    const publicJwk = {
      kty: 'RSA',
      use: 'sig',
      alg: 'PS256',
      n: publicKey.export({ format: 'jwk' }).n,
      e: publicKey.export({ format: 'jwk' }).e
    };

    // Create DPoP proof payload
    const dpopPayload = {
      jti: uuidv4(),
      htm: httpMethod.toUpperCase(),
      htu: httpUri,
      iat: Math.floor(Date.now() / 1000)
    };

    // Add access token hash if provided
    if (accessToken) {
      const tokenHash = crypto
        .createHash('sha256')
        .update(accessToken)
        .digest('base64url');
      dpopPayload.ath = tokenHash;
    }

    // Sign DPoP proof
    return jwt.sign(dpopPayload, privateKey, {
      algorithm: 'PS256',
      header: {
        typ: 'dpop+jwt',
        alg: 'PS256',
        jwk: publicJwk
      }
    });
  },

  // Generate test PAR request
  createPARRequest: (overrides = {}) => ({
    client_id: 'test-client-001',
    response_type: 'code',
    scope: 'openid profile customer:read',
    redirect_uri: 'https://client.test/callback',
    state: 'test-state-' + Date.now(),
    code_challenge: 'test-code-challenge',
    code_challenge_method: 'S256',
    nonce: 'test-nonce-' + Date.now(),
    ...overrides
  }),

  // Generate test authorization request
  createAuthRequest: (overrides = {}) => ({
    response_type: 'code',
    client_id: 'test-client-001',
    redirect_uri: 'https://client.test/callback',
    scope: 'openid profile customer:read',
    state: 'test-state-' + Date.now(),
    code_challenge: 'test-code-challenge',
    code_challenge_method: 'S256',
    nonce: 'test-nonce-' + Date.now(),
    ...overrides
  }),

  // Generate test token request
  createTokenRequest: (code, overrides = {}) => ({
    grant_type: 'authorization_code',
    client_id: 'test-client-001',
    code,
    redirect_uri: 'https://client.test/callback',
    code_verifier: 'test-code-verifier',
    ...overrides
  }),

  // Wait for async operations with timeout
  waitForCondition: async (condition, timeout = 5000, interval = 100) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }
};

// Setup and teardown for integration tests
let testDataCleanup = [];

beforeEach(() => {
  testDataCleanup = [];
});

afterEach(async () => {
  // Clean up test data
  for (const cleanup of testDataCleanup) {
    await cleanup();
  }
  testDataCleanup = [];
});

// Helper to register cleanup functions
global.addCleanup = (cleanupFn) => {
  testDataCleanup.push(cleanupFn);
};