# .env.example
# Copy to .env and adjust values for your environment

# Application
NODE_ENV=development
PORT=3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production-must-be-at-least-256-bits
JWT_ISSUER=open-api-kundenbeziehung
JWT_EXPIRY=1h

# CORS Configuration
ALLOWED_ORIGINS=https://localhost:3000,https://api.openbanking.ch,https://sandbox-api.openbanking.ch

# External URLs
CONSENT_BASE_URL=https://consent.openbanking.ch
API_BASE_URL=https://api.openbanking.ch/v1

# mTLS Configuration
TRUSTED_CERTS_DIR=./certs/trusted
SKIP_MTLS=false

# Database Configuration
MONGODB_URL=mongodb://localhost:27017/openapi-kundenbeziehung
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/api.log

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=another-super-secret-key-for-sessions

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# External Services
E_ID_VALIDATION_URL=https://eid.admin.ch/api/validate
SANCTIONS_SCREENING_URL=https://sanctions.example.com/api/screen
PEP_SCREENING_URL=https://pep.example.com/api/check

# Notification Services
EMAIL_SERVICE_URL=https://email.example.com/api/send
SMS_SERVICE_URL=https://sms.example.com/api/send

# Document Storage
DOCUMENT_STORAGE_URL=https://storage.example.com/api
DOCUMENT_STORAGE_BUCKET=openapi-documents
DOCUMENT_TOKEN_EXPIRY=600

# Encryption
FIELD_ENCRYPTION_KEY=32-byte-key-for-field-level-encryption-change-me
DATA_TOKENIZATION_URL=https://tokenization.example.com/api

# Monitoring & Analytics
PROMETHEUS_METRICS_PORT=9090
JAEGER_ENDPOINT=http://localhost:14268/api/traces
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Health Check
HEALTH_CHECK_TIMEOUT=5000
HEALTH_CHECK_INTERVAL=30000

# Development Only
DEV_MOCK_EXTERNAL_SERVICES=true
DEV_GENERATE_TEST_DATA=true
DEV_SKIP_SIGNATURE_VALIDATION=false