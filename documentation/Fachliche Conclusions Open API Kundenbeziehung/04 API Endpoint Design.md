# OBP API Endpoint Design Conclusion

## Inhalt

1. [Executive Summary](#executive-summary)
2. [API-Architektur Übersicht](#api-architektur-übersicht)
3. [Hauptendpunkte](#hauptendpunkte)
4. [Granulare Daten-Endpunkte](#granulare-daten-endpunkte)
5. [Request/Response Strukturen](#requestresponse-strukturen)
6. [Implementierungsrichtlinien](#implementierungsrichtlinien)

---

## Executive Summary

Das API Endpoint Design fär die Open API Kundenbeziehung folgt den OpenAPI 3.0 Standards und etabliert eine klare, RESTful Architektur fär den sicheren Austausch von Kundendaten. Die API-Spezifikation konzentriert sich auf konzeptionelle Strukturen, während detaillierte technische Implementierungen in der separaten [API Codebase Dokumentation](/documentation/Umsetzung%20und%20Implementierung/) behandelt werden.

**Zentrale Designprinzipien:**
- OpenAPI 3.0 konforme Spezifikation fär automatische Code-Generierung
- RESTful Design mit resource-orientierten URL-Strukturen  
- FAPI 2.0 Security Integration für Finanzdienstleistungen → [Siehe Conclusion Consent und Security Flow](./06%20Consent%20und%20Security%20Flow.md)
- Modulare Endpunkt-Architektur fär flexible Use Case-Abdeckung

---

## API-Architektur äbersicht

### Technische Grundlagen

**API-Standard:** RESTful Design nach OpenAPI 3.0 Specification
- JSON als primäres Datenformat fär Interoperabilität
- HTTPS/TLS 1.3 mandatory fär Transport Security
- HTTP/2 Support fär Performance-Optimierung
- Semantic Versioning fär API Evolution

**Design-Prinzipien:**
- **Resource-orientierte URLs:** Logische Datenstruktur-Mapping
- **HTTP-Verben:** Standard CRUD Operations (GET, POST, PUT, DELETE)
- **Statelessness:** Session-unabhängige Request/Response Cycles
- **Idempotenz:** Sichere Wiederholbarkeit fär kritische Operations

### Sicherheitsarchitektur

**Authentication & Authorization:** → [Detaillierte Security-Implementierung siehe Conclusion Consent und Security Flow](./06%20Consent%20und%20Security%20Flow.md)
- FAPI 2.0 Security Profile für Financial APIs
- OAuth 2.0/OpenID Connect für standardisierte Authentifizierung
- JWT-basierte Access Tokens mit granularen Scopes
- Mutual TLS (mTLS) für kritische Partner-Integrationen

**API Gateway Integration:**
- Rate Limiting mit adaptiver Throttling-Logik
- Request Validation durch JSON Schema
- Response Caching mit ETags fär Effizienz
- Comprehensive Monitoring und Audit Trails

---

## Hauptendpunkte

### Customer Check API

#### `GET /customer/check`
**Purpose:** Schnelle Existenz- und Gältigkeitspräfung von Kundendaten
```json
{
  "endpoint": "/v1/customer/check",
  "method": "GET",
  "description": "Verifies customer existence and identity validity",
  "authentication": "FAPI 2.0 Bearer Token"
}
```

**Request Parameters:**
- `sharedCustomerHash` (required): Eindeutige anonyme Kundenidentifikation
- `purpose` (required): Intended use case fär Data Processing
- `requestingInstitution` (required): Institution Identifier fär Audit

**Response Structure:**
```json
{
  "customerExists": true,
  "identityValid": true,
  "lastVerified": "2025-08-18T10:00:00Z",
  "verificationLevel": "QEAA",
  "dataAvailable": ["identity", "contact", "kyc_basic"]
}
```

### Customer Data Request API

#### `POST /customer/data-request`
**Purpose:** Granulare Anfrage spezifischer Kundendaten-Kategorien
```json
{
  "endpoint": "/v1/customer/data-request",
  "method": "POST",
  "description": "Request specific customer data categories with consent",
  "authentication": "FAPI 2.0 Bearer Token with appropriate scope"
}
```

**Request Body:**
```json
{
  "customerHash": "sha256_hash_value",
  "requestedFields": ["identity.name", "contact.email", "kyc.income"],
  "purpose": "account_opening",
  "consentToken": "consent_jwt_token",
  "requesterInfo": {
    "institutionId": "bank_123",
    "useCase": "onboarding",
    "dataRetention": "customer_lifetime"
  }
}
```

### Customer Profile API

#### `GET /customer/{customerId}/profile`
**Purpose:** Vollständiges Kundenprofil fär authentifizierte Requests
```json
{
  "endpoint": "/v1/customer/{customerId}/profile",
  "method": "GET",
  "description": "Retrieve complete customer profile data",
  "authentication": "Customer-authorized Bearer Token"
}
```

**Response Structure:**
```json
{
  "customerId": "customer_123",
  "profile": {
    "identity": {
      "firstName": "Max",
      "lastName": "Mustermann",
      "dateOfBirth": "1990-01-01",
      "nationality": ["CH"]
    },
    "contact": {
      "email": "max@example.ch",
      "phone": "+41791234567"
    },
    "verification": {
      "level": "QEAA",
      "verifiedAt": "2025-08-18T10:00:00Z",
      "method": "video_ident"
    }
  }
}
```

---

## Granulare Daten-Endpunkte

### Modulare Datenbausteine

#### Identity Module
```
GET /v1/customer/{customerId}/identity
PUT /v1/customer/{customerId}/identity
```
**Data Scope:** Name, Geburtsdatum, Nationalität, Government IDs

#### Contact Module  
```
GET /v1/customer/{customerId}/contact
PUT /v1/customer/{customerId}/contact
```
**Data Scope:** E-Mail, Telefon, Adresse, Kommunikationspräferenzen

#### KYC Module
```
GET /v1/customer/{customerId}/kyc
PUT /v1/customer/{customerId}/kyc  
```
**Data Scope:** Beruf, Einkommen, PEP-Status, Source of Wealth

#### Financial Module
```
GET /v1/customer/{customerId}/financial
PUT /v1/customer/{customerId}/financial
```
**Data Scope:** Investment Experience, Risk Profile, Banking History

#### Compliance Module
```
GET /v1/customer/{customerId}/compliance
PUT /v1/customer/{customerId}/compliance
```
**Data Scope:** FATCA Status, Tax Residency, Regulatory Classifications

### Consent Management Endpoints

#### `POST /consent/request`
**Purpose:** Initiierung granularer Consent-Requests
```json
{
  "endpoint": "/v1/consent/request",
  "method": "POST",
  "description": "Request specific data access consent from customer"
}
```

#### `GET /consent/{consentId}/status`
**Purpose:** Consent Status und Gältigkeitspräfung
```json
{
  "endpoint": "/v1/consent/{consentId}/status",
  "method": "GET",
  "description": "Check current consent status and validity"
}
```

---

## Request/Response Strukturen

### Standard Request Headers
```http
Authorization: Bearer {jwt_access_token}
Content-Type: application/json
X-Request-ID: {unique_request_identifier}
X-Correlation-ID: {transaction_correlation_id}
Accept: application/json
```

### Standard Response Format
```json
{
  "status": "success",
  "timestamp": "2025-08-18T10:00:00Z",
  "requestId": "req_12345",
  "data": {
    // Response payload
  },
  "metadata": {
    "version": "1.0",
    "processingTime": "150ms",
    "dataSource": "primary_db"
  }
}
```

### Error Response Structure
```json
{
  "status": "error",
  "timestamp": "2025-08-18T10:00:00Z",
  "requestId": "req_12345",
  "error": {
    "code": "CUSTOMER_NOT_FOUND",
    "message": "Customer with provided hash not found",
    "details": "The sharedCustomerHash does not exist in our network",
    "retryable": false
  },
  "supportInfo": {
    "reference": "ERR_20250818_001",
    "documentation": "https://api-docs.obp.ch/errors/CUSTOMER_NOT_FOUND"
  }
}
```

### Pagination Structure
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "totalItems": 150,
    "totalPages": 3,
    "hasNext": true,
    "hasPrevious": false,
    "nextPage": "/v1/customers?page=2&pageSize=50",
    "previousPage": null
  }
}
```

---

## Implementierungsrichtlinien

### OpenAPI 3.0 Specification

**Dokumentationsstandards:**
- Vollständige API-Spezifikation in OpenAPI 3.0 YAML Format
- Automatische Code-Generierung fär Client SDKs
- Interactive API Documentation mit Swagger UI
- Schema Validation fär alle Request/Response Payloads

**Beispiel OpenAPI Definition:**
```yaml
openapi: 3.0.3
info:
  title: Open API Kundenbeziehung
  version: 1.0.0
  description: Standardized customer data exchange APIs
  contact:
    name: API Support Team
    url: https://support.obp.ch
    email: api-support@obp.ch

servers:
  - url: https://api.obp.ch/v1
    description: Production API Server
  - url: https://sandbox-api.obp.ch/v1
    description: Sandbox Environment

paths:
  /customer/check:
    get:
      summary: Check customer existence and validity
      operationId: checkCustomer
      security:
        - bearerAuth: []
      parameters:
        - name: sharedCustomerHash
          in: query
          required: true
          schema:
            type: string
            format: sha256
      responses:
        '200':
          description: Customer check successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerCheckResponse'
```

### Sicherheits-Implementation

**FAPI 2.0 Compliance Checklist:**
- [ ] JWT Access Tokens mit Proof-of-Possession
- [ ] Certificate-bound Tokens fär High-Value Transactions
- [ ] Request Object Encryption fär Sensitive Data
- [ ] MTLS Authentication fär Partner APIs
- [ ] PKCE fär Public Client Applications

### Performance Guidelines

**Response Time Targets:**
- Authentication Endpoints: < 500ms
- Data Retrieval Endpoints: < 2000ms
- Data Modification Endpoints: < 3000ms
- Bulk Operations: < 10000ms

**Caching Strategy:**
- Static Data: 24 hours TTL
- Customer Profile Data: 1 hour TTL  
- Verification Status: 15 minutes TTL
- Real-time Data: No caching

### Development Best Practices

**API Versioning Strategy:**
- Semantic Versioning fär API Evolution
- Backward Compatibility fär mindestens 2 Major Versions
- Deprecation Notice Period: 6 Monate minimum
- Feature Flags fär schrittweise Rollouts

**Testing Requirements:**
- Unit Tests fär alle API Endpoints (>90% Coverage)
- Integration Tests mit Mock External Systems
- Contract Testing zwischen Producer/Consumer
- Load Testing fär Performance Validation
- Security Testing mit OWASP API Security Guidelines → [Siehe Conclusion Testing und Verifikation](./08%20Testing%20und%20Verifikation.md)

Diese konzeptionelle API-Spezifikation bietet die Grundlage für die technische Implementation und wird kontinuierlich mit der separaten technischen Dokumentation synchronisiert, um eine konsistente und wartbare API-Architektur zu gewährleisten.

TODO: TZE bitte verifizieren!!

---

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Konzeptionelle Spezifikation für technische Implementation

---

[Quellen und Referenzen](./Quellen%20und%20Referenzen.md)