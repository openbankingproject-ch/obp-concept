/** @type {import('jest').Config} */
module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Root directories for tests and source code
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  
  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/__tests__/**/*.js'
  ],
  
  // Coverage configuration (>95% target as per Conclusion 08)
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json',
    'clover'
  ],
  
  // Coverage thresholds (FAPI 2.0 requires high code coverage)
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    // Critical files require 100% coverage
    './src/middleware/security.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    './src/middleware/auth.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    './src/middleware/mtls.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    './src/routes/oauth.js': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  
  // Files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/app.js', // Main app file excluded from coverage
    '!src/**/*.config.js',
    '!src/**/index.js', // Simple export files
    '!src/**/*.mock.js',
    '!src/**/*.fixture.js'
  ],
  
  // Test setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/jest.setup.js'
  ],
  
  // Module path mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Transform configuration
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,
  
  // Test timeout (increased for integration tests)
  testTimeout: 30000,
  
  // Verbose output for debugging
  verbose: true,
  
  // Bail on first test failure in CI
  bail: process.env.CI ? 1 : 0,
  
  // Watch mode ignore patterns
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/logs/',
    '<rootDir>/docs/'
  ],
  
  // Global variables available in tests
  globals: {
    'process.env.NODE_ENV': 'test',
    'process.env.JWT_SECRET': 'test-secret-key',
    'process.env.INTERNAL_API_TOKEN': 'test-internal-token'
  },
  
  // Test projects for different test types
  projects: [
    // Unit tests
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/setup/unit.setup.js']
    },
    
    // Integration tests
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/setup/integration.setup.js'],
      testTimeout: 60000 // Longer timeout for integration tests
    },
    
    // System tests (End-to-End)
    {
      displayName: 'system',
      testMatch: ['<rootDir>/tests/system/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/setup/system.setup.js'],
      testTimeout: 120000 // Even longer timeout for E2E tests
    },
    
    // Acceptance tests (Use Case validation)
    {
      displayName: 'acceptance',
      testMatch: ['<rootDir>/tests/acceptance/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/setup/acceptance.setup.js'],
      testTimeout: 180000 // Longest timeout for full use case tests
    }
  ],
  
  // Reporter configuration for different environments
  reporters: [
    'default',
    ...(process.env.CI ? [
      ['jest-junit', {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
        suiteName: 'Open API Kundenbeziehung Tests'
      }],
      ['github-actions', { silent: false }]
    ] : []),
    ...(process.env.GENERATE_COVERAGE_BADGES ? [
      ['jest-coverage-badges', {
        outputDir: 'coverage/badges'
      }]
    ] : [])
  ],
  
  // Error handling
  errorOnDeprecated: true,
  
  // Performance optimization
  maxWorkers: process.env.CI ? 2 : '50%',
  
  // Cache configuration
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/tests'],
  
  // File extensions to consider
  moduleFileExtensions: ['js', 'json', 'node']
};