# 04 API-Spezifikationen - Inhaltsverzeichnis

## **Executive Summary**
- Detaillierte technische API-Spezifikationen für alle Endpunkte
- OpenAPI 3.0 konforme Dokumentation und Code-Generierung
- Vollständige Request/Response-Strukturen und Datenmodelle

---

## **1. API-Architektur Übersicht**

### **1.1 Technische Grundlagen**
- **API-Standard:** RESTful Design nach OpenAPI 3.0 Specification
- **Datenformat:** JSON als primäres Format (YAML für Konfiguration)
- **Protokoll:** HTTPS/TLS 1.3 mandatory, HTTP/2 Support
- **Versionierung:** Semantic Versioning mit URI-basierter Version Control

### **1.2 API-Design-Prinzipien**
- **Resource-orientierte URLs:** `/customer/basic`, `/customer/kyc`
- **HTTP-Verben:** GET (read), POST (create), PUT (update), DELETE (remove)
- **Idempotenz:** Safe operations für alle GET und PUT requests
- **Statelessness:** Keine Session-basierte State-Verwaltung

### **1.3 API Gateway Integration**
- **Rate Limiting:** Adaptive throttling basierend auf SLA-Tiers
- **Request Validation:** JSON Schema validation vor Backend-Processing
- **Response Caching:** ETags und Last-Modified headers für Effizienz
- **Monitoring:** OpenTelemetry integration für distributed tracing

---

## **2. Kern-API-Endpunkte**

### **2.1 Customer Check API**

#### **GET /customer/check**
```
Purpose: Existenz + Identitätsgültigkeit Verification
Input: sharedCustomerHash, purpose, requestingInstitution
Output: exists (boolean), identityValid (boolean), lastVerified (timestamp)
```

**Request Structure:**
- **Headers:** Authorization (JWT), X-Request-ID, Content-Type
- **Query Parameters:** hash (required), purpose (required), institution (required)
- **Authentication:** FAPI 2.0 compliant token with appropriate scope

**Response Structure:**
- **Success (200):** Customer existence und validity status
- **Not Found (404):** Customer hash not found in network
- **Forbidden (403):** Insufficient permissions für requested purpose
- **Rate Limited (429):** Request rate exceeded for institution

### **2.2 Full Customer Request API**

#### **POST /customer/fullRequest**
```
Purpose: Vollständiges Dataset Request (≈65 Felder)
Input: customerHash, requestedFields, purpose, consentToken
Output: Complete customer profile mit allen verfügbaren Daten
```

**Request Structure:**
- **Headers:** Authorization (FAPI JWT), X-Request-ID, Content-Type
- **Body:** JSON payload mit field selection und purpose specification
- **Consent:** Valid JWT consent token für requested data scope

**Response Structure:**  
- **Success (200):** Complete customer data object
- **Partial Success (206):** Partial data mit availability metadata
- **Bad Request (400):** Invalid field selection oder missing consent
- **Gone (410):** Customer data no longer available

### **2.3 Identity Verification API**

#### **GET /customer/identification**
```
Purpose: Identifikationsdaten + Verification PDF
Input: customerHash, verificationLevel (QEAA/EAA)
Output: Identity core data + verification document download link
```

**Request Structure:**
- **Headers:** Authorization, Accept (application/json, application/pdf)
- **Query Parameters:** hash, level, includeDocument (boolean)
- **Authentication:** Enhanced authentication für identity data access

**Response Structure:**
- **Success (200):** Identity data + document metadata
- **Multiple Choices (300):** Multiple verification levels available
- **Unauthorized (401):** Insufficient authentication level
- **Not Acceptable (406):** Requested format not available

---

## **3. Granulare Daten-Endpunkte**

### **3.1 Basic Customer Data API**

#### **GET /customer/basic**
```
Purpose: Stammdaten-Subset (15-20 core fields)
Fields: firstName, lastName, dateOfBirth, nationality, customerSince
Use Cases: Quick verification, basic onboarding
```

**Field Definitions:**
- **firstName:** String, UTF-8, max 100 chars, required
- **lastName:** String, UTF-8, max 100 chars, required  
- **dateOfBirth:** ISO 8601 date format, required
- **nationality:** ISO 3166-1 alpha-3 country code
- **customerSince:** ISO 8601 timestamp, account opening date

**Data Validation Rules:**
- **Name validation:** Unicode character support, no special chars
- **Date validation:** Valid birth date, age constraints (>16 years)
- **Nationality:** Valid country codes, multiple citizenship support

### **3.2 Address Information API**

#### **GET /customer/address**
```
Purpose: Adressdaten (Haupt- & Korrespondenz)
Fields: primaryAddress, correspondenceAddress, addressHistory
Use Cases: Compliance verification, service delivery
```

**Address Object Structure:**
```json
{
  "addressType": "primary|correspondence|historical",
  "street": "Bahnhofstrasse 123",
  "city": "Zurich", 
  "postalCode": "8001",
  "country": "CHE",
  "validFrom": "2023-01-01T00:00:00Z",
  "validTo": "2024-12-31T23:59:59Z",
  "verificationStatus": "verified|unverified|disputed"
}
```

**Address Validation:**
- **Swiss Addresses:** Integration mit Swiss Post API für Validation
- **International:** Google/Loqate address verification services
- **Historical Tracking:** Address change history für compliance
- **Verification Status:** Real-time validation status tracking

### **3.3 Contact Information API**

#### **GET /customer/contact**
```
Purpose: Kontaktinformationen (Phone, Email, Preferences)
Fields: mobilePhone, email, preferredLanguage, communicationPreferences
Use Cases: Customer communication, service delivery
```

**Contact Object Structure:**
- **Phone Numbers:** E.164 format, primary/secondary distinction
- **Email Addresses:** RFC 5322 compliant, verification status
- **Communication Preferences:** Channel preferences, frequency settings
- **Language Settings:** ISO 639-1 language codes

**Privacy Controls:**
- **Consent-based Access:** Granular consent für each contact method
- **Update Notifications:** Real-time sync bei contact changes
- **Opt-out Mechanisms:** Customer-controlled communication preferences

### **3.4 KYC/AML Data API**

#### **GET /customer/kyc**
```
Purpose: KYC-Attribute ohne Ausweis-Dokumente
Fields: riskClassification, pepStatus, sanctionsScreening, sourceOfWealth
Use Cases: Regulatory compliance, risk assessment
```

**KYC Object Structure:**
```json
{
  "riskClassification": "low|medium|high",
  "pepStatus": "none|domestic|foreign|international",
  "sanctionsScreening": {
    "status": "clear|match|pending",
    "lastScreened": "2024-01-15T10:00:00Z",
    "screeningProvider": "Dow Jones|Thomson Reuters"
  },
  "sourceOfWealth": {
    "primary": "employment|business|inheritance|investments",
    "verified": true,
    "documentation": "employment_contract_2024.pdf"
  }
}
```

**Compliance Features:**
- **Real-time Screening:** Automated sanctions list checking
- **Risk Scoring:** ML-based risk assessment models
- **Audit Trail:** Complete history of all KYC/AML decisions
- **Regulatory Reporting:** Automated suspicious activity reporting

---

## **4. Request/Response Strukturen**

### **4.1 Standard Request Headers**
```http
Authorization: Bearer <FAPI-compliant-JWT>
X-Request-ID: uuid-v4-correlation-id
Content-Type: application/json
Accept: application/json, application/problem+json
X-Client-Version: 1.0.0
```

### **4.2 JWT Token Structure**
```json
{
  "iss": "https://api.openbanking.ch",
  "aud": "requesting-institution-id", 
  "sub": "customer-hash",
  "purpose": "account_opening",
  "scope": "basic address contact kyc",
  "consent_id": "consent-uuid",
  "exp": 1640995200,
  "iat": 1640991600,
  "jti": "token-uuid"
}
```

### **4.3 Standard Response Structure**
```json
{
  "data": { /* requested customer data */ },
  "metadata": {
    "requestId": "correlation-uuid",
    "timestamp": "2024-01-15T10:00:00Z",
    "dataFreshness": "2024-01-10T15:30:00Z",
    "source": "producer-bank-id",
    "version": "1.0"
  },
  "links": {
    "self": "/customer/basic?hash=xyz",
    "related": "/customer/address?hash=xyz"
  }
}
```

### **4.4 Error Response Structure (RFC 7807)**
```json
{
  "type": "https://api.openbanking.ch/errors/insufficient-consent",
  "title": "Insufficient Consent",
  "status": 403,
  "detail": "The provided consent token does not include access to KYC data",
  "instance": "/customer/kyc?hash=abc123",
  "requestId": "correlation-uuid",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

---

## **5. Authentication und Autorisierung**

### **5.1 FAPI 2.0 Implementation**
- **PAR (Pushed Authorization Requests):** 60-second expiration mandatory
- **DPoP (Demonstrating Proof-of-Possession):** Alternative zu mTLS
- **Enhanced Client Authentication:** Dual mTLS/private_key_jwt support
- **Algorithm Restrictions:** Nur PS256, ES256, EdDSA (keine HS256/RS256)

### **5.2 OAuth 2.1 Flow Integration**
- **Authorization Code Flow:** PKCE mandatory für alle clients
- **Client Credentials Flow:** Machine-to-Machine authentication
- **Refresh Token Handling:** Secure rotation und lifecycle management
- **Scope-based Access:** Granular permissions für API endpoints

### **5.3 Consent Management Integration**
- **Purpose-based Consent:** Use case specific authorization
- **Granular Permissions:** Field-level access control
- **Consent Lifecycle:** Creation, validation, renewal, revocation
- **Audit Requirements:** Complete consent decision audit trail

---

## **6. Datenmodelle und Schema**

### **6.1 sharedCustomerHash Specification**
```
Format: SHA-256 hash of (customerIdentifier + salt + timestamp)
Length: 64 characters hexadecimal
Uniqueness: Global across all participating institutions
Privacy: No reverse engineering to original customer data
```

**Hash Generation Algorithm:**
```javascript
const crypto = require('crypto');
const generateHash = (customerId, institutionSalt, timestamp) => {
  const data = `${customerId}:${institutionSalt}:${timestamp}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};
```

### **6.2 Customer Data Schema (JSON Schema)**

#### **Basic Customer Schema:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["firstName", "lastName", "dateOfBirth"],
  "properties": {
    "firstName": {
      "type": "string",
      "maxLength": 100,
      "pattern": "^[\\p{L}\\p{M}\\s.-]+$"
    },
    "lastName": {
      "type": "string", 
      "maxLength": 100,
      "pattern": "^[\\p{L}\\p{M}\\s.-]+$"
    },
    "dateOfBirth": {
      "type": "string",
      "format": "date"
    }
  }
}
```

#### **Extended Customer Schema:**
- **Address Schema:** Street, City, Postal Code, Country validation
- **Contact Schema:** Phone (E.164), Email (RFC 5322), Language (ISO 639)
- **KYC Schema:** Risk classification, PEP status, sanctions screening
- **Metadata Schema:** Data freshness, source attribution, audit trail

### **6.3 Reference Data Management**
- **Currency Codes:** ISO 4217 universal adoption
- **Country Codes:** ISO 3166-1 für nationality und address
- **Language Codes:** ISO 639-1 für communication preferences
- **Institution Identifiers:** BIC, LEI, Swiss BC-Numbers

---

## **7. API Security Specifications**

### **7.1 Transport Security**
- **TLS Requirements:** TLS 1.3 mandatory, TLS 1.2 minimum
- **Certificate Validation:** Extended validation certificates required
- **HSTS Headers:** HTTP Strict Transport Security mandatory
- **Certificate Pinning:** Mobile app certificate pinning recommended

### **7.2 Application Security**
- **CORS Configuration:** Restrictive cross-origin policies
- **CSP Headers:** Content Security Policy für XSS prevention
- **Input Validation:** JSON schema validation + sanitization
- **SQL Injection:** Parameterized queries mandatory

### **7.3 API-specific Security**
- **Rate Limiting:** Per-endpoint und per-client limits
- **Request Signing:** JWS signatures für sensitive operations
- **Replay Protection:** Nonce-based replay attack prevention
- **Audit Logging:** Comprehensive security event logging

---

## **8. Performance und Skalierung**

### **8.1 Performance Requirements**
- **Response Time:** P95 < 500ms für alle GET operations
- **Throughput:** 1000+ concurrent requests per second
- **Availability:** 99.9% uptime während business hours
- **Scalability:** Horizontal scaling bis 100+ institutions

### **8.2 Caching Strategy**
- **Client-side Caching:** ETags und Last-Modified headers
- **Gateway Caching:** Redis/Memcached für reference data
- **CDN Integration:** Geographic distribution für better latency
- **Cache Invalidation:** Event-driven invalidation strategies

### **8.3 Database Integration**
- **Read Replicas:** Separate read/write database instances
- **Connection Pooling:** Efficient database connection management
- **Query Optimization:** Indexed searches für customer lookups
- **Data Partitioning:** Sharding strategies für large datasets

---

## **9. API Development und Testing**

### **9.1 OpenAPI Specification**
- **Code Generation:** Automatic client SDK generation
- **Documentation:** Interactive API documentation (Swagger UI)
- **Validation:** Request/response validation gegen specification
- **Mock Services:** Automated mock generation für development

### **9.2 Testing Framework**
- **Contract Testing:** Consumer-driven contract validation
- **Integration Testing:** End-to-end API workflow testing
- **Performance Testing:** Load testing für scalability validation
- **Security Testing:** OWASP API security validation

### **9.3 Deployment Pipeline**
- **CI/CD Integration:** Automated testing und deployment
- **Versioning Strategy:** Backward compatible API evolution
- **Blue-Green Deployment:** Zero-downtime deployment strategy
- **Rollback Procedures:** Quick rollback für failed deployments

---

## **10. Monitoring und Observability**

### **10.1 API Analytics**
- **Usage Metrics:** Request volume, response times, error rates
- **Business Metrics:** Customer conversion, API adoption rates
- **Performance Monitoring:** Real-time performance dashboards
- **Alerting:** Proactive alerting für SLA violations

### **10.2 Logging Standards**
- **Structured Logging:** JSON-formatted logs für machine processing
- **Correlation IDs:** Request tracing across microservices
- **Security Events:** Comprehensive audit trail für compliance
- **Log Retention:** Configurable retention policies für different log types

### **10.3 Health Checks**
- **Liveness Probes:** Application health verification
- **Readiness Probes:** Service ready für traffic acceptance
- **Dependency Checks:** External service availability monitoring
- **Circuit Breakers:** Fault tolerance für downstream services

---

## **Cross-References**
- **Chapter 02:** Requirements → Technical Implementation Details
- **Chapter 03:** Reference Process → API Integration Points
- **Chapter 06:** Security Flow → Authentication/Authorization Implementation
- **Chapter 08:** Testing → API Validation and Quality Assurance