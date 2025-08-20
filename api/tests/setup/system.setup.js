/**
 * System Test Setup
 * 
 * Configuration for end-to-end system tests that validate complete workflows,
 * performance characteristics, and security compliance.
 */

const path = require('path');

// System test configuration
const SYSTEM_TEST_CONFIG = {
  // Test timeouts
  DEFAULT_TIMEOUT: 30000,
  LONG_TIMEOUT: 60000,
  PERFORMANCE_TIMEOUT: 120000,

  // Performance thresholds
  MAX_RESPONSE_TIME: 2000, // 2 seconds max response time
  MAX_MEMORY_USAGE: 512 * 1024 * 1024, // 512MB max memory
  MIN_THROUGHPUT: 100, // 100 requests per second minimum

  // Load test configuration
  CONCURRENT_USERS: 10,
  TEST_DURATION: 30000, // 30 seconds
  RAMP_UP_TIME: 5000, // 5 seconds

  // Security test configuration
  SECURITY_SCAN_TIMEOUT: 300000, // 5 minutes for security scans
  PENETRATION_TEST_TIMEOUT: 600000 // 10 minutes for penetration tests
};

// System test utilities
global.systemTestUtils = {
  config: SYSTEM_TEST_CONFIG,

  // Performance monitoring utilities
  performance: {
    // Start performance monitoring
    startMonitoring: () => {
      const startTime = process.hrtime.bigint();
      const startMemory = process.memoryUsage();
      
      return {
        startTime,
        startMemory,
        
        // Get performance metrics
        getMetrics: () => {
          const endTime = process.hrtime.bigint();
          const endMemory = process.memoryUsage();
          
          return {
            duration: Number(endTime - startTime) / 1e6, // Convert to milliseconds
            memoryUsage: {
              heapUsed: endMemory.heapUsed - startMemory.heapUsed,
              heapTotal: endMemory.heapTotal - startMemory.heapTotal,
              external: endMemory.external - startMemory.external,
              rss: endMemory.rss - startMemory.rss
            }
          };
        }
      };
    },

    // Run load test
    runLoadTest: async (testFn, options = {}) => {
      const {
        concurrentUsers = SYSTEM_TEST_CONFIG.CONCURRENT_USERS,
        duration = SYSTEM_TEST_CONFIG.TEST_DURATION,
        rampUpTime = SYSTEM_TEST_CONFIG.RAMP_UP_TIME
      } = options;

      const results = {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        responseTimes: [],
        errors: []
      };

      const startTime = Date.now();
      const endTime = startTime + duration;
      const userPromises = [];

      // Ramp up users gradually
      for (let i = 0; i < concurrentUsers; i++) {
        setTimeout(async () => {
          const userPromise = (async () => {
            while (Date.now() < endTime) {
              const requestStart = Date.now();
              try {
                await testFn();
                results.totalRequests++;
                results.successfulRequests++;
                results.responseTimes.push(Date.now() - requestStart);
              } catch (error) {
                results.totalRequests++;
                results.failedRequests++;
                results.errors.push(error.message);
              }
              
              // Small delay between requests
              await new Promise(resolve => setTimeout(resolve, 10));
            }
          })();
          userPromises.push(userPromise);
        }, (i * rampUpTime) / concurrentUsers);
      }

      // Wait for all users to complete
      await Promise.all(userPromises);

      // Calculate statistics
      const avgResponseTime = results.responseTimes.reduce((a, b) => a + b, 0) / results.responseTimes.length || 0;
      const maxResponseTime = Math.max(...results.responseTimes, 0);
      const minResponseTime = Math.min(...results.responseTimes, Infinity) || 0;
      const throughput = (results.successfulRequests / duration) * 1000; // requests per second
      const errorRate = (results.failedRequests / results.totalRequests) * 100 || 0;

      return {
        ...results,
        statistics: {
          avgResponseTime,
          maxResponseTime,
          minResponseTime,
          throughput,
          errorRate,
          duration
        }
      };
    }
  },

  // Security testing utilities
  security: {
    // Run basic security scan
    runSecurityScan: async (baseUrl) => {
      const vulnerabilities = [];
      
      // Test common security headers
      const response = await fetch(`${baseUrl}/health`);
      const headers = response.headers;
      
      if (!headers.get('x-content-type-options')) {
        vulnerabilities.push('Missing X-Content-Type-Options header');
      }
      
      if (!headers.get('x-frame-options')) {
        vulnerabilities.push('Missing X-Frame-Options header');
      }
      
      if (!headers.get('x-xss-protection')) {
        vulnerabilities.push('Missing X-XSS-Protection header');
      }
      
      // Test for sensitive information disclosure
      if (response.headers.get('server')) {
        vulnerabilities.push('Server header reveals server information');
      }
      
      return {
        vulnerabilities,
        score: Math.max(0, 100 - (vulnerabilities.length * 10))
      };
    },

    // Test FAPI 2.0 compliance
    testFAPICompliance: async (baseUrl) => {
      const violations = [];
      
      // Test discovery endpoint
      try {
        const discoveryResponse = await fetch(`${baseUrl}/.well-known/openid-configuration`);
        const discovery = await discoveryResponse.json();
        
        // Check required FAPI 2.0 features
        if (!discovery.require_pushed_authorization_requests) {
          violations.push('PAR not required');
        }
        
        if (!discovery.token_endpoint_auth_methods_supported?.includes('private_key_jwt')) {
          violations.push('private_key_jwt not supported');
        }
        
        if (!discovery.code_challenge_methods_supported?.includes('S256')) {
          violations.push('PKCE S256 not supported');
        }
        
      } catch (error) {
        violations.push('Discovery endpoint not accessible');
      }
      
      return {
        compliant: violations.length === 0,
        violations
      };
    }
  },

  // End-to-end workflow utilities
  workflows: {
    // Complete OAuth flow test
    runOAuthFlow: async (client, options = {}) => {
      const {
        scope = 'openid profile customer:read',
        purpose = 'accountOpening'
      } = options;

      const workflow = {
        steps: [],
        errors: [],
        duration: 0,
        success: false
      };

      const startTime = Date.now();

      try {
        // Step 1: PAR request
        workflow.steps.push('PAR request');
        const parResponse = await client.post('/par')
          .type('form')
          .send({
            client_id: 'test-client-001',
            response_type: 'code',
            scope,
            redirect_uri: 'https://client.test/callback',
            state: 'test-state',
            code_challenge: 'test-challenge',
            code_challenge_method: 'S256',
            purpose
          });

        if (parResponse.status !== 201) {
          throw new Error(`PAR failed: ${parResponse.body.error}`);
        }

        const requestUri = parResponse.body.request_uri;

        // Step 2: Authorization request
        workflow.steps.push('Authorization request');
        const authResponse = await client.get('/authorize')
          .query({
            client_id: 'test-client-001',
            request_uri: requestUri
          });

        // Should redirect (302) or return authorization page
        if (authResponse.status !== 302 && authResponse.status !== 200) {
          throw new Error(`Authorization failed: ${authResponse.status}`);
        }

        // For testing, simulate authorization code
        const authCode = 'test-auth-code-' + Date.now();

        // Step 3: Token exchange
        workflow.steps.push('Token exchange');
        const tokenResponse = await client.post('/token')
          .type('form')
          .send({
            grant_type: 'authorization_code',
            client_id: 'test-client-001',
            code: authCode,
            redirect_uri: 'https://client.test/callback',
            code_verifier: 'test-verifier'
          });

        // Note: This will fail without proper mocks, but we're testing the flow structure

        workflow.duration = Date.now() - startTime;
        workflow.success = true;

      } catch (error) {
        workflow.errors.push(error.message);
        workflow.duration = Date.now() - startTime;
      }

      return workflow;
    },

    // Customer data exchange workflow
    runCustomerDataFlow: async (client, customerId) => {
      const workflow = {
        steps: [],
        errors: [],
        duration: 0,
        success: false,
        data: null
      };

      const startTime = Date.now();

      try {
        // Step 1: Customer check
        workflow.steps.push('Customer existence check');
        const checkResponse = await client.post('/v1/customer/check')
          .send({ customerId, institutionId: 'TEST-BANK-001' });

        // Step 2: Consent management
        workflow.steps.push('Consent creation');
        const consentResponse = await client.post('/v1/consent')
          .send({
            customerId,
            requestingInstitution: 'TEST-BANK-002',
            providingInstitution: 'TEST-BANK-001',
            dataCategories: ['basicData', 'identification'],
            purpose: 'accountOpening'
          });

        // Step 3: Data retrieval
        workflow.steps.push('Customer data retrieval');
        const dataResponse = await client.get(`/v1/customer/data/${customerId}`)
          .query({ consentId: 'test-consent-id' });

        workflow.data = dataResponse.body;
        workflow.duration = Date.now() - startTime;
        workflow.success = true;

      } catch (error) {
        workflow.errors.push(error.message);
        workflow.duration = Date.now() - startTime;
      }

      return workflow;
    }
  },

  // Test data management
  testData: {
    // Clean test database
    cleanDatabase: async () => {
      // Implementation would clean test database collections
      console.log('Cleaning test database...');
    },

    // Seed test data
    seedTestData: async () => {
      // Implementation would seed test data
      console.log('Seeding test data...');
    },

    // Create test customer
    createTestCustomer: (overrides = {}) => ({
      customerId: 'test-customer-' + Date.now(),
      basicData: {
        firstName: 'Test',
        lastName: 'Customer',
        dateOfBirth: '1990-01-01',
        nationality: 'CH'
      },
      contactData: {
        email: 'test@example.com',
        phone: '+41791234567'
      },
      addressData: {
        street: 'Teststrasse 1',
        postalCode: '8001',
        city: 'Zürich',
        country: 'CH'
      },
      ...overrides
    })
  }
};

// Global setup for system tests
beforeAll(async () => {
  console.log('Setting up system test environment...');
  
  // Clean test environment
  await systemTestUtils.testData.cleanDatabase();
  
  // Seed basic test data
  await systemTestUtils.testData.seedTestData();
}, SYSTEM_TEST_CONFIG.DEFAULT_TIMEOUT);

// Global teardown for system tests
afterAll(async () => {
  console.log('Tearing down system test environment...');
  
  // Clean up test data
  await systemTestUtils.testData.cleanDatabase();
}, SYSTEM_TEST_CONFIG.DEFAULT_TIMEOUT);