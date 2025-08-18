# 04 API-Endpoint Design - Open API Kundenbeziehung

*Hinweis: Diese Übersicht behandelt das API-Design auf konzeptioneller Ebene. Detaillierte Implementierungsdetails werden in der separaten API-Codebase-Dokumentation erläutert.*

## Überblick API-Architektur

Die Open API Kundenbeziehung folgt dem **OpenAPI 3.0 Standard** und implementiert eine **RESTful Architektur** mit klaren Designprinzipien für maximale Interoperabilität und Developer Experience.

### Design-Prinzipien

#### 1. Resource-Oriented Design
- Jeder Datenbaustein wird als eigenständige Resource modelliert
- Eindeutige Resource-Identifikation über URIs
- Konsistente Naming Conventions

#### 2. Stateless Communication
- Jeder API-Request enthält alle notwendigen Informationen
- Server speichert keine Session-Informationen
- Horizontale Skalierbarkeit durch stateless Design

#### 3. HTTP Semantics
- Korrekte Verwendung von HTTP-Methoden (GET, POST, PUT, DELETE)
- Aussagekräftige HTTP Status Codes
- Standard HTTP Headers für Metadata

#### 4. Security First
- FAPI 2.0 konforme Sicherheitsimplementierung
- OAuth 2.0 / OIDC für Authentifizierung und Autorisierung
- End-to-End Verschlüsselung sensitiver Daten

## Hauptendpunkte

### 1. Customer Management API

#### Base Path: `/api/v1/customers`

```yaml
paths:
  /customers:
    post:
      summary: Create new customer profile
      operationId: createCustomer
      security:
        - OAuth2: [customer:create]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerCreateRequest'
      responses:
        '201':
          description: Customer created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Customer'
                
  /customers/{customerId}:
    get:
      summary: Retrieve customer profile
      operationId: getCustomer
      security:
        - OAuth2: [customer:read]
      parameters:
        - name: customerId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Customer profile retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Customer'
```

### 2. Data Bundle API

#### Base Path: `/api/v1/data-bundles`

```yaml
paths:
  /data-bundles/identity:
    post:
      summary: Request identity data bundle
      operationId: requestIdentityBundle
      security:
        - OAuth2: [data:read]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DataBundleRequest'
      responses:
        '200':
          description: Identity data bundle
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/IdentityBundle'
                
  /data-bundles/address:
    post:
      summary: Request address data bundle
      operationId: requestAddressBundle
      security:
        - OAuth2: [data:read]
      responses:
        '200':
          description: Address data bundle
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressBundle'
```

### 3. Consent Management API

#### Base Path: `/api/v1/consent`

```yaml
paths:
  /consent:
    post:
      summary: Create consent record
      operationId: createConsent
      security:
        - OAuth2: [consent:create]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ConsentRequest'
      responses:
        '201':
          description: Consent created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Consent'
                
  /consent/{consentId}:
    get:
      summary: Retrieve consent details
      operationId: getConsent
      security:
        - OAuth2: [consent:read]
      responses:
        '200':
          description: Consent details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Consent'
                
    delete:
      summary: Withdraw consent
      operationId: withdrawConsent
      security:
        - OAuth2: [consent:delete]
      responses:
        '204':
          description: Consent withdrawn successfully
```

### 4. Identity Verification API

#### Base Path: `/api/v1/identity`

```yaml
paths:
  /identity/verify:
    post:
      summary: Initiate identity verification
      operationId: verifyIdentity
      security:
        - OAuth2: [identity:verify]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/IdentityVerificationRequest'
      responses:
        '202':
          description: Verification initiated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VerificationStatus'
                
  /identity/verification/{verificationId}:
    get:
      summary: Get verification status
      operationId: getVerificationStatus
      security:
        - OAuth2: [identity:read]
      responses:
        '200':
          description: Verification status
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VerificationResult'
```

## Granulare Daten-Endpunkte

### Basisdaten-Endpunkte

#### Personal Data
```yaml
/api/v1/customers/{customerId}/personal-data:
  get:
    summary: Retrieve personal data
    security:
      - OAuth2: [personal:read]
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                firstName:
                  type: string
                  example: "Max"
                lastName:
                  type: string
                  example: "Mustermann"
                dateOfBirth:
                  type: string
                  format: date
                  example: "1990-01-15"
                nationality:
                  type: array
                  items:
                    type: string
                  example: ["CH", "DE"]
```

#### Address Data
```yaml
/api/v1/customers/{customerId}/address:
  get:
    summary: Retrieve address information
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                street:
                  type: string
                  example: "Musterstrasse"
                houseNumber:
                  type: string
                  example: "123"
                postalCode:
                  type: string
                  example: "8001"
                city:
                  type: string
                  example: "Zürich"
                country:
                  type: string
                  example: "CH"
                canton:
                  type: string
                  example: "ZH"
```

#### Contact Data
```yaml
/api/v1/customers/{customerId}/contact:
  get:
    summary: Retrieve contact information
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                  example: "max.mustermann@example.com"
                phoneNumber:
                  type: string
                  example: "+41 44 123 45 67"
                mobileNumber:
                  type: string
                  example: "+41 79 123 45 67"
                preferredCommunication:
                  type: string
                  enum: [email, sms, phone, app]
```

### Erweiterte Daten-Endpunkte

#### Financial Profile
```yaml
/api/v1/customers/{customerId}/financial-profile:
  get:
    summary: Retrieve financial profile
    security:
      - OAuth2: [financial:read]
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                income:
                  type: number
                  format: currency
                  example: 85000
                assets:
                  type: number
                  format: currency
                  example: 250000
                investmentExperience:
                  type: string
                  enum: [beginner, intermediate, expert]
                riskTolerance:
                  type: string
                  enum: [conservative, moderate, aggressive]
```

#### KYC Data
```yaml
/api/v1/customers/{customerId}/kyc:
  get:
    summary: Retrieve KYC information
    security:
      - OAuth2: [kyc:read]
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                kycStatus:
                  type: string
                  enum: [pending, verified, rejected, expired]
                verificationDate:
                  type: string
                  format: date-time
                verificationLevel:
                  type: string
                  enum: [self-declared, EAA, QEAA]
                pepCheck:
                  type: boolean
                sanctionCheck:
                  type: boolean
                riskRating:
                  type: string
                  enum: [low, medium, high]
```

### Ecosystem-spezifische Endpunkte

#### Banking Endpoints
```yaml
/api/v1/customers/{customerId}/banking:
  get:
    summary: Retrieve banking-specific data
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                existingRelationship:
                  type: boolean
                primaryBank:
                  type: boolean
                accountTypes:
                  type: array
                  items:
                    type: string
                    enum: [checking, savings, investment, credit]
                creditScore:
                  type: number
                  minimum: 300
                  maximum: 850
```

#### Insurance Endpoints
```yaml
/api/v1/customers/{customerId}/insurance:
  get:
    summary: Retrieve insurance-specific data
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                riskFactors:
                  type: array
                  items:
                    type: string
                healthStatus:
                  type: string
                  enum: [excellent, good, fair, poor]
                claimsHistory:
                  type: array
                  items:
                    $ref: '#/components/schemas/Claim'
```

#### Mobility Endpoints
```yaml
/api/v1/customers/{customerId}/mobility:
  get:
    summary: Retrieve mobility-specific data
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                driverLicense:
                  type: object
                  properties:
                    number:
                      type: string
                    categories:
                      type: array
                      items:
                        type: string
                    issueDate:
                      type: string
                      format: date
                    expiryDate:
                      type: string
                      format: date
                accidentHistory:
                  type: array
                  items:
                    $ref: '#/components/schemas/Accident'
```

## Request/Response Strukturen

### Standard Request Headers

```yaml
headers:
  Authorization:
    description: OAuth 2.0 Bearer Token
    required: true
    schema:
      type: string
      example: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  Content-Type:
    description: Media type of the request body
    required: true
    schema:
      type: string
      example: "application/json"
  X-Request-ID:
    description: Unique request identifier for tracing
    required: true
    schema:
      type: string
      format: uuid
      example: "550e8400-e29b-41d4-a716-446655440000"
  X-API-Version:
    description: API version being used
    required: false
    schema:
      type: string
      example: "1.0.0"
  X-Client-ID:
    description: Client application identifier
    required: true
    schema:
      type: string
      example: "yuh-mobile-app"
```

### Standard Response Headers

```yaml
headers:
  X-Request-ID:
    description: Echo of request ID for tracing
    schema:
      type: string
      format: uuid
  X-Response-Time:
    description: Server processing time in milliseconds
    schema:
      type: integer
      example: 145
  X-Rate-Limit-Remaining:
    description: Number of requests remaining in current window
    schema:
      type: integer
      example: 95
  X-Rate-Limit-Reset:
    description: UTC timestamp when rate limit window resets
    schema:
      type: integer
      example: 1640995200
  Cache-Control:
    description: Caching directives
    schema:
      type: string
      example: "no-cache, no-store, must-revalidate"
```

### Standard Error Response

```yaml
components:
  schemas:
    ErrorResponse:
      type: object
      required:
        - error
        - message
        - timestamp
        - path
      properties:
        error:
          type: string
          description: Error code
          example: "INVALID_CONSENT"
        message:
          type: string
          description: Human-readable error message
          example: "The provided consent token is invalid or expired"
        details:
          type: object
          description: Additional error details
          properties:
            consentId:
              type: string
              example: "consent-123"
            expiryDate:
              type: string
              format: date-time
              example: "2024-01-15T10:30:00Z"
        timestamp:
          type: string
          format: date-time
          example: "2024-01-20T14:30:00Z"
        path:
          type: string
          example: "/api/v1/customers/123/data-bundles"
        requestId:
          type: string
          format: uuid
          example: "550e8400-e29b-41d4-a716-446655440000"
```

### Success Response Wrapper

```yaml
components:
  schemas:
    SuccessResponse:
      type: object
      required:
        - data
        - meta
      properties:
        data:
          description: The actual response data
          oneOf:
            - $ref: '#/components/schemas/Customer'
            - $ref: '#/components/schemas/DataBundle'
            - type: array
              items:
                $ref: '#/components/schemas/Customer'
        meta:
          type: object
          properties:
            timestamp:
              type: string
              format: date-time
              example: "2024-01-20T14:30:00Z"
            version:
              type: string
              example: "1.0.0"
            requestId:
              type: string
              format: uuid
              example: "550e8400-e29b-41d4-a716-446655440000"
            pagination:
              $ref: '#/components/schemas/Pagination'
```

### Pagination Schema

```yaml
components:
  schemas:
    Pagination:
      type: object
      properties:
        page:
          type: integer
          minimum: 1
          example: 1
        pageSize:
          type: integer
          minimum: 1
          maximum: 100
          example: 20
        totalPages:
          type: integer
          example: 5
        totalItems:
          type: integer
          example: 95
        hasNext:
          type: boolean
          example: true
        hasPrevious:
          type: boolean
          example: false
```

### Data Bundle Request Structure

```yaml
components:
  schemas:
    DataBundleRequest:
      type: object
      required:
        - customerId
        - requestedBundles
        - consentToken
      properties:
        customerId:
          type: string
          format: uuid
          description: Unique customer identifier
          example: "customer-456"
        requestedBundles:
          type: array
          items:
            type: string
            enum: [identity, address, contact, financial, kyc]
          example: ["identity", "address", "contact"]
        consentToken:
          type: string
          description: JWT token containing consent information
          example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
        dataMinimization:
          type: boolean
          default: true
          description: Apply data minimization principles
        validUntil:
          type: string
          format: date-time
          description: When the data request expires
          example: "2024-01-25T14:30:00Z"
        purpose:
          type: string
          description: Purpose of data request
          enum: [onboarding, kyc, re-identification, age-verification]
          example: "onboarding"
```

### Comprehensive Data Schemas

#### Customer Schema

```yaml
components:
  schemas:
    Customer:
      type: object
      required:
        - customerId
        - identity
        - createdAt
        - updatedAt
      properties:
        customerId:
          type: string
          format: uuid
          description: Unique customer identifier
          example: "customer-789"
        identity:
          $ref: '#/components/schemas/Identity'
        address:
          $ref: '#/components/schemas/Address'
        contact:
          $ref: '#/components/schemas/Contact'
        financialProfile:
          $ref: '#/components/schemas/FinancialProfile'
        kycStatus:
          $ref: '#/components/schemas/KYCStatus'
        consent:
          type: array
          items:
            $ref: '#/components/schemas/Consent'
        createdAt:
          type: string
          format: date-time
          example: "2024-01-15T10:30:00Z"
        updatedAt:
          type: string
          format: date-time
          example: "2024-01-20T14:30:00Z"
        version:
          type: integer
          description: Data version for optimistic locking
          example: 1
```

#### Identity Schema

```yaml
    Identity:
      type: object
      required:
        - firstName
        - lastName
        - dateOfBirth
        - nationality
      properties:
        title:
          type: string
          enum: [Mr, Mrs, Ms, Dr, Prof]
          example: "Mr"
        firstName:
          type: string
          minLength: 1
          maxLength: 100
          example: "Max"
        lastName:
          type: string
          minLength: 1
          maxLength: 100
          example: "Mustermann"
        middleName:
          type: string
          maxLength: 100
          example: "Alexander"
        dateOfBirth:
          type: string
          format: date
          example: "1990-01-15"
        placeOfBirth:
          type: string
          maxLength: 100
          example: "Zürich"
        nationality:
          type: array
          items:
            type: string
            pattern: "^[A-Z]{2}$"
          example: ["CH", "DE"]
        gender:
          type: string
          enum: [male, female, other, not_specified]
          example: "male"
        maritalStatus:
          type: string
          enum: [single, married, divorced, widowed, partnership]
          example: "married"
        verificationLevel:
          type: string
          enum: [self-declared, EAA, QEAA]
          example: "QEAA"
        verificationDate:
          type: string
          format: date-time
          example: "2024-01-15T10:30:00Z"
        verificationProvider:
          type: string
          example: "SwissID"
```

#### Address Schema

```yaml
    Address:
      type: object
      required:
        - street
        - city
        - postalCode
        - country
      properties:
        addressType:
          type: string
          enum: [residential, correspondence, business]
          example: "residential"
        street:
          type: string
          maxLength: 200
          example: "Musterstrasse"
        houseNumber:
          type: string
          maxLength: 20
          example: "123A"
        postalCode:
          type: string
          maxLength: 20
          example: "8001"
        city:
          type: string
          maxLength: 100
          example: "Zürich"
        canton:
          type: string
          maxLength: 50
          example: "Zürich"
        country:
          type: string
          pattern: "^[A-Z]{2}$"
          example: "CH"
        coordinates:
          type: object
          properties:
            latitude:
              type: number
              format: double
              example: 47.3769
            longitude:
              type: number
              format: double
              example: 8.5417
        validFrom:
          type: string
          format: date
          example: "2024-01-01"
        validTo:
          type: string
          format: date
          example: "2025-12-31"
```

#### Consent Schema

```yaml
    Consent:
      type: object
      required:
        - consentId
        - dataCategories
        - purposes
        - grantedAt
        - status
      properties:
        consentId:
          type: string
          format: uuid
          example: "consent-abc123"
        customerId:
          type: string
          format: uuid
          example: "customer-456"
        dataCategories:
          type: array
          items:
            type: string
            enum: [identity, address, contact, financial, kyc, health, mobility]
          example: ["identity", "address", "contact"]
        purposes:
          type: array
          items:
            type: string
            enum: [onboarding, kyc, marketing, analytics, service_improvement]
          example: ["onboarding", "kyc"]
        grantedAt:
          type: string
          format: date-time
          example: "2024-01-15T10:30:00Z"
        expiresAt:
          type: string
          format: date-time
          example: "2025-01-15T10:30:00Z"
        withdrawnAt:
          type: string
          format: date-time
          nullable: true
          example: null
        status:
          type: string
          enum: [active, expired, withdrawn, revoked]
          example: "active"
        legalBasis:
          type: string
          enum: [consent, contract, legal_obligation, vital_interests, public_task, legitimate_interests]
          example: "consent"
        dataMinimization:
          type: boolean
          default: true
          description: Whether data minimization principles apply
        consentText:
          type: string
          description: The exact consent text shown to the user
          example: "I consent to the processing of my personal data for account opening purposes"
        ipAddress:
          type: string
          format: ipv4
          description: IP address when consent was granted
          example: "192.168.1.1"
        userAgent:
          type: string
          description: Browser/app user agent when consent was granted
          example: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)"
```

### Webhook Response Structures

#### Event Notification Schema

```yaml
components:
  schemas:
    WebhookEvent:
      type: object
      required:
        - eventId
        - eventType
        - timestamp
        - data
      properties:
        eventId:
          type: string
          format: uuid
          example: "event-abc123"
        eventType:
          type: string
          enum: [
            customer.created,
            customer.updated,
            consent.granted,
            consent.withdrawn,
            verification.completed,
            verification.failed,
            data.requested,
            data.transferred
          ]
          example: "verification.completed"
        timestamp:
          type: string
          format: date-time
          example: "2024-01-20T14:30:00Z"
        customerId:
          type: string
          format: uuid
          example: "customer-456"
        data:
          type: object
          description: Event-specific data payload
          additionalProperties: true
        metadata:
          type: object
          properties:
            source:
              type: string
              example: "identity-service"
            version:
              type: string
              example: "1.0.0"
            correlationId:
              type: string
              format: uuid
              example: "correlation-789"
```

### Validation and Constraints

#### Data Validation Rules

```yaml
components:
  schemas:
    ValidationRules:
      type: object
      description: Comprehensive validation rules for all data types
      properties:
        emailValidation:
          type: object
          properties:
            pattern:
              type: string
              example: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            maxLength:
              type: integer
              example: 254
        phoneValidation:
          type: object
          properties:
            pattern:
              type: string
              example: "^\\+?[1-9]\\d{1,14}$"
            internationalFormat:
              type: boolean
              example: true
        dateValidation:
          type: object
          properties:
            minimumAge:
              type: integer
              example: 18
            maximumAge:
              type: integer
              example: 120
            format:
              type: string
              example: "YYYY-MM-DD"
        addressValidation:
          type: object
          properties:
            validatePostalCode:
              type: boolean
              example: true
            requireCoordinates:
              type: boolean
              example: false
            supportedCountries:
              type: array
              items:
                type: string
              example: ["CH", "DE", "AT", "FR", "IT"]
```

### Rate Limiting and Quotas

#### Rate Limit Headers

```yaml
Rate-Limiting:
  headers:
    X-RateLimit-Limit:
      description: Request limit per time window
      schema:
        type: integer
        example: 100
    X-RateLimit-Remaining:
      description: Requests remaining in current window
      schema:
        type: integer
        example: 75
    X-RateLimit-Reset:
      description: UTC timestamp when limit resets
      schema:
        type: integer
        example: 1640995200
    X-RateLimit-Window:
      description: Time window in seconds
      schema:
        type: integer
        example: 3600
```

#### Quota Management

```yaml
components:
  schemas:
    ApiQuota:
      type: object
      properties:
        clientId:
          type: string
          example: "yuh-mobile-app"
        dailyLimit:
          type: integer
          example: 10000
        monthlyLimit:
          type: integer
          example: 300000
        usedToday:
          type: integer
          example: 2500
        usedThisMonth:
          type: integer
          example: 75000
        resetDaily:
          type: string
          format: time
          example: "00:00:00Z"
        resetMonthly:
          type: integer
          description: Day of month when quota resets
          example: 1
```

### Security Schemas

#### JWT Token Structure

```yaml
components:
  schemas:
    JWTToken:
      type: object
      description: JWT token payload structure
      properties:
        iss:
          type: string
          description: Token issuer
          example: "https://auth.open-api-kundenbeziehung.ch"
        sub:
          type: string
          description: Subject (customer ID)
          example: "customer-456"
        aud:
          type: array
          items:
            type: string
          description: Intended audience
          example: ["https://api.yuh.com", "https://api.postfinance.ch"]
        exp:
          type: integer
          description: Expiration time (Unix timestamp)
          example: 1640995200
        iat:
          type: integer
          description: Issued at time (Unix timestamp)
          example: 1640991600
        jti:
          type: string
          description: JWT ID
          format: uuid
          example: "jwt-abc123"
        scope:
          type: string
          description: OAuth 2.0 scopes
          example: "customer:read data:read consent:create"
        consent_claims:
          type: object
          description: Consent-specific claims
          properties:
            consent_id:
              type: string
              example: "consent-abc123"
            data_categories:
              type: array
              items:
                type: string
              example: ["identity", "address"]
            purposes:
              type: array
              items:
                type: string
              example: ["onboarding"]
```

### Monitoring and Observability

#### Health Check Endpoint

```yaml
/health:
  get:
    summary: API health check
    operationId: healthCheck
    security: []
    responses:
      '200':
        description: Service is healthy
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                  enum: [healthy, degraded, unhealthy]
                  example: "healthy"
                timestamp:
                  type: string
                  format: date-time
                  example: "2024-01-20T14:30:00Z"
                version:
                  type: string
                  example: "1.0.0"
                dependencies:
                  type: object
                  properties:
                    database:
                      type: string
                      enum: [up, down]
                      example: "up"
                    identity_service:
                      type: string
                      enum: [up, down]
                      example: "up"
                    cache:
                      type: string
                      enum: [up, down]
                      example: "up"
```

#### Metrics Endpoint

```yaml
/metrics:
  get:
    summary: API metrics
    operationId: getMetrics
    security:
      - OAuth2: [admin:read]
    responses:
      '200':
        description: API metrics
        content:
          application/json:
            schema:
              type: object
              properties:
                requestCount:
                  type: integer
                  example: 10567
                averageResponseTime:
                  type: number
                  format: double
                  example: 145.7
                errorRate:
                  type: number
                  format: double
                  example: 0.02
                uptime:
                  type: integer
                  description: Uptime in seconds
                  example: 86400
                activeConnections:
                  type: integer
                  example: 25
```

### API Versioning Strategy

#### Version Header Support

```yaml
components:
  parameters:
    ApiVersion:
      name: X-API-Version
      in: header
      description: API version to use
      required: false
      schema:
        type: string
        enum: ["1.0", "1.1", "2.0"]
        default: "1.0"
      example: "1.0"
```

#### Versioned Response Schema

```yaml
components:
  schemas:
    VersionedResponse:
      type: object
      properties:
        apiVersion:
          type: string
          example: "1.0"
        supportedVersions:
          type: array
          items:
            type: string
          example: ["1.0", "1.1"]
        deprecationNotice:
          type: object
          properties:
            version:
              type: string
              example: "1.0"
            deprecationDate:
              type: string
              format: date
              example: "2025-01-01"
            sunsetDate:
              type: string
              format: date
              example: "2025-06-01"
            migrationGuide:
              type: string
              format: uri
              example: "https://docs.api.com/migration/v1-to-v2"
```

## Fazit API-Design

Das API-Design der Open API Kundenbeziehung folgt modernen REST-Prinzipien und Industriestandards. Die klare Strukturierung in Haupt- und granulare Endpunkte ermöglicht flexible Integration verschiedener Use Cases bei gleichzeitiger Wahrung von Sicherheit und Performance.

### Zentrale Design-Merkmale

1. **OpenAPI 3.0 Compliance:** Vollständige Spezifikation und Dokumentation
2. **Security First:** FAPI 2.0 konforme Implementierung 
3. **Developer Experience:** Konsistente Naming und umfassende Schemas
4. **Skalierbarkeit:** Stateless Design und effiziente Datenstrukturen
5. **Monitoring:** Umfassende Observability und Health Checks

### Nächste Schritte

- Detaillierte Implementierung in separater API-Codebase
- Automatisierte Testing-Suite basierend auf OpenAPI-Spezifikation
- Interactive API Documentation und Developer Portal
- SDK-Generierung für verschiedene Programmiersprachen