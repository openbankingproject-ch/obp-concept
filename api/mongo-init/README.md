# MongoDB Initialization Scripts

This directory contains MongoDB initialization scripts that run automatically when the MongoDB container starts for the first time. These scripts set up the complete database structure for the Swiss Open API Kundenbeziehung implementation.

## Script Execution Order

The scripts run in alphabetical/numerical order during MongoDB container initialization:

1. **01-create-database.js** - Creates database, collections, and application user
2. **02-create-indexes.js** - Creates performance and compliance indexes
3. **03-seed-data.js** - Inserts initial seed data for development/testing

## Script Details

### 01-create-database.js

Creates the application database and all necessary collections:

- **Core Collections**: participants, trust_networks, processes, consent_records, data_schemas, audit_logs, extensions, validations
- **OAuth Collections**: oauth_clients, oauth_codes, oauth_tokens, oauth_consents, oauth_sessions, oauth_par_requests, jwk_keys, dpop_nonces
- **Use Case Collections**: customers, identifications, account_applications, verification_requests, evv_lifecycles, documents, signatures, compliance_reports

Also creates the application service user with appropriate read/write permissions.

### 02-create-indexes.js

Creates comprehensive indexes for:

- **Performance**: Primary key indexes, compound indexes for common queries
- **FAPI 2.0 Compliance**: Security audit indexes, certificate thumbprint indexes
- **Data Lifecycle**: TTL (Time-To-Live) indexes for automatic cleanup
- **Use Case Support**: Industry-specific query optimizations

Key features:
- Automatic expiration of temporary data (codes, tokens, sessions)
- 90-day audit log retention
- 30-day validation result retention
- Optimized queries for all major use cases

### 03-seed-data.js

Inserts initial data for development and testing:

- **5 Core Participants**: Swiss National Bank, FINMA, Demo Bank, Demo Insurance, Demo Government
- **3 Trust Networks**: Financial, Government, and Cross-sector networks
- **3 OAuth Clients**: FAPI 2.0 compliant client registrations for each demo participant
- **Data Schemas**: Customer profile and banking application schemas
- **Process Definitions**: Universal 10-step reference process
- **Extensions**: Banking MVP and Identity Verification extensions

## Database Structure

### Collections Overview

```
Core Framework:
├── participants          # Multi-industry participant registry
├── trust_networks        # Trust network relationships
├── processes            # Process orchestration engine
├── consent_records      # Privacy-compliant consent management
├── data_schemas         # Schema registry for data validation
├── audit_logs          # Security audit trail (FAPI 2.0)
├── extensions          # Industry extension configurations
└── validations         # Validation rules and results

OAuth 2.1/OIDC/FAPI 2.0:
├── oauth_clients        # Client registrations
├── oauth_codes         # Authorization codes (TTL)
├── oauth_tokens        # Access/refresh tokens (TTL)
├── oauth_consents      # User authorization records
├── oauth_sessions      # Authentication sessions (TTL)
├── oauth_par_requests  # PAR storage (TTL)
├── jwk_keys           # JWT signing keys
└── dpop_nonces        # DPoP replay protection (TTL)

Use Cases:
├── customers           # Customer data (UC1)
├── identifications     # Identity verification (UC2, UC3)
├── account_applications # Banking applications (UC1)
├── verification_requests # Age verification (UC3)
├── evv_lifecycles      # EVV lifecycle management (UC4)
├── documents          # Document metadata
├── signatures         # Digital signatures
└── compliance_reports  # Regulatory reporting
```

### Key Features

#### FAPI 2.0 Compliance
- Comprehensive audit logging with integrity protection
- Certificate thumbprint indexes for mTLS
- DPoP nonce management for replay protection
- Token binding and expiration tracking

#### Data Lifecycle Management
- Automatic cleanup of expired data via TTL indexes
- Configurable retention periods for different data types
- Privacy-compliant data expiration

#### Performance Optimization
- Strategic compound indexes for common query patterns
- Unique constraints for data integrity
- Sparse indexes for optional fields

## Configuration

### Environment Variables

The initialization scripts respect these environment variables:

- `MONGO_API_PASSWORD`: Password for the api-service database user
- `NODE_ENV`: Environment setting (affects seed data behavior)

### Docker Integration

The scripts are automatically executed when the MongoDB container starts via docker-compose.yaml:

```yaml
mongo:
  volumes:
    - ./mongo-init:/docker-entrypoint-initdb.d:ro
```

## Development vs Production

### Development Setup
- Includes comprehensive seed data with demo participants
- Sample OAuth clients with test certificates
- Pre-configured trust networks for testing
- Sample process definitions and extensions

### Production Setup
- Remove or replace seed data in 03-seed-data.js
- Use real participant certificates and endpoints
- Configure proper trust network governance
- Implement proper backup and monitoring

## Monitoring and Maintenance

### Index Performance
Monitor index usage and performance:
```javascript
db.collection.getIndexes()
db.collection.stats()
```

### Data Lifecycle
Monitor TTL index effectiveness:
```javascript
db.audit_logs.count() // Should not grow indefinitely
db.oauth_codes.count() // Should stay low (expired codes removed)
```

### Storage Usage
Monitor collection sizes:
```javascript
db.stats()
db.runCommand({collStats: "collection_name"})
```

## Security Considerations

### Database Security
- Application user has minimal required permissions
- Private keys and certificates are never stored in the database
- Audit logs include integrity hashes

### Data Protection
- Customer data uses privacy-preserving hashes
- Automatic expiration of sensitive temporary data
- Compliance with GDPR and Swiss data protection laws

### Access Control
- Database user authentication required
- Network-level access controls via Docker networking
- Regular security audit log monitoring

## Troubleshooting

### Common Issues

1. **Script Execution Failures**
   ```bash
   # Check container logs
   docker-compose logs mongo
   
   # Verify script permissions
   ls -la mongo-init/
   ```

2. **Index Creation Problems**
   ```javascript
   // Check index status
   db.collection.getIndexes()
   
   // Drop and recreate if needed
   db.collection.dropIndex("index_name")
   ```

3. **Seed Data Issues**
   ```javascript
   // Check data insertion
   db.participants.count()
   db.oauth_clients.find()
   
   // Clear and re-seed if needed
   db.dropDatabase()
   ```

### Validation Commands

```javascript
// Verify database structure
show collections

// Check core participants
db.participants.find({}, {participantId: 1, name: 1, industry: 1})

// Verify OAuth clients
db.oauth_clients.find({}, {client_id: 1, client_name: 1, status: 1})

// Check trust networks
db.trust_networks.find({}, {networkId: 1, name: 1, participants: 1})

// Verify indexes
db.audit_logs.getIndexes()
db.oauth_tokens.getIndexes()
```

## Related Documentation

- [Core Framework Documentation](../src/core/README.md)
- [OAuth Implementation](../src/routes/oauth.js)
- [Security Middleware](../src/middleware/security.js)
- [Docker Configuration](../docker-compose.yaml)

## Support

For database initialization issues:
1. Check MongoDB container logs
2. Verify script execution order and permissions
3. Test database connectivity from application
4. Monitor index creation and data seeding progress