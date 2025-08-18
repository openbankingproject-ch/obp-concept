# 02 Anforderungen - Open API Kundenbeziehung

## Zielbilder der digitalen Kundennähe

Die Open API Kundenbeziehung definiert verschiedene Zielbilder für die digitale Kundennähe, die eine branchenübergreifende und selbstbestimmte digitale Kundenbeziehung ermöglichen.

### Zielbild-Übersicht

**Scope:** Privatkunden (initialer Fokus), anschließend Erweiterung auf Firmenkunden

#### Zielbild 1-4: In Scope für Open API Kundenbeziehung
1. **Beschleunigung des Customer Onboarding innerhalb der Bank**
2. **Weiterverwensung von Identitäts- und Basisdaten zwischen Banken**
3. **Austausch von weiteren Daten zwischen Banken**
4. **Branchenübergreifender Austausch von relevanten Kundendaten**

#### Zielbild 5: Out of Scope
5. **DEZENTRAL** - Dezentrales Vertrauensnetzwerk mit E-ID und Verifiable Credentials (für spätere Phasen vorgesehen)

### Detaillierte Zielbild-Beschreibungen

#### Stufe 1: Beschleunigung des Customer Onboarding innerhalb der Bank
**Mehrwerte für Bank und Kunden:**
- Das Kundenerlebnis wird einfacher, sicherer und schneller
- Onboarding-Kosten pro Neukunde sinken
- Regulatorische Konformität im Kontext des revidierten Datenschutzgesetzes wird hergestellt
- Ein nationaler Standard zur Weitergabe von digitalen Kundendaten wird etabliert

#### Stufe 2: Weiterverwensung von Identitäts- und Basisdaten zwischen Banken
**Datenumfang:**
- Name, Adresse, PEP-Check, Geburtsdatum, Nationalität
- Arbeitgeber, Beruf, Anlagehorizont, Kenntnisse + Erfahrungen
- Grundbuchauszug, Steuererklärung

#### Stufe 3: Austausch von weiteren Daten zwischen Banken
**Erweiterte Datensets:**
- EVV-Daten, Pensionsplanung, Pensionskassenausweis
- Transaktionsdaten, Dauderaufträge, LSV
- Versicherungsdaten

#### Stufe 4: Branchenübergreifender Austausch von relevanten Kundendaten
**Cross-Industry Integration:**
- Altersverifikation (z.B. Banken ↔ E-Commerce, Gaming, Streaming)
- Finance ↔ Insurance ↔ Mobility ↔ Retail ↔ Education ↔ Health

## Use Cases für jedes Ecosystem - Priorisierung auf 4 Use Cases

### Aktuell priorisierte Use Cases

#### Use Case 1: Kontoeröffnung resp. Bankwechsel
**Scope:**
- Harmonisierung von konzerninternen Onboardingstrecken
- Wiederverwendung resp. Nutzung von Datenbausteinen für das Onboarding im Netzwerk (z.B. PostFinance & YUH)
- Fokus auf finanznahe Produkte und Services (Banking, Insurance)

**Aktuelle Pain Points:**
- Kunden müssen ihre Identitäts- und Altersnachweis immer wieder neu erbringen
- Zeitaufwendig und führt zu vergergerten Customer Experience

**Implementierung:**
- Standardisierte Altersverifikation über ein Netzwerk
- Wiederverwendung von Altersinformationen aus bestehenden KYC-Prozessen
- API-basierter Zugriff für Drittanbieter
- Datenschutzkonforme Lösung mit minimaler Datenpreisgabe

#### Use Case 2: Re-Identifikation
**Scope:**
- Wiederverwendung resp. Nutzung von Datenbausteinen für die Re-Identifikation resp. Aktualisierung von KYC-Daten gemäss GwG

**Aktuelle Pain Points:**
- Periodische KYC-Updates erfordern vollständige Neudokumentation
- Hoher manueller Aufwand für Banken und Kunden
- Inkonsistente Datenqualität zwischen verschiedenen Systemen

**Implementierung:**
- Automated KYC-Update über vertrauenswürdige Datenquellen
- Risikobasierte Validierung nur bei signifikanten Änderungen
- Cross-Reference mit bestehenden Bankbeziehungen

#### Use Case 3: Altersverifikation
**Scope:**
- Wiederverwendung resp. Nutzung der Information «Geburtsdatum» oder «18+», «16+» für die Serviceerschliessung im Netzwerk

**Ausgangslage:**
- Viele Dienstleistungen und Produkte erfordern eine Altersverifikation (z.B. Bankprodukte, E-Commerce, Gaming, Streaming)
- Kunden müssen ihr Alter oft mehrfach und bei verschiedenen Anbietern nachweisen
- Momentan gibt es keine vertrauenswürdige und standardisierte Altersverifikation aus Kundenperspektive

**Umsetzung im Kontext «Open API Kundenbeziehung»:**
- Standardisierte Altersverifikation über ein Netzwerk
- Wiederverwendung von Altersinformationen aus bestehenden KYC-Prozessen (z.B. Bankkonto, Behördenregistrierung)
- API-basierter Zugriff für Drittanbieter
- Datenschutzkonforme Lösung bei der nur das relevante Attribut («16+», «18+») geteilt wird, ohne das genaue Geburtsdatum offenzulegen

**Rollen im Netzwerk:**
- **Bankkunden:** Endnutzer des Altersverifikationsservice
- **Bank:** Vertrauenswürdige Quelle für Altersinformationen
- **Kontributor:** Drittanbieter die Altersverifikation benötigen
- **Provider:** Technische Infrastruktur-Anbieter

**Mehrwerte:**
- Reduzierter Aufwand für Kunden (Altersnachweis nicht mehrfach erbracht werden muss)
- Schnellere und effizientere Verifikationsprozesse für Banken und andere Unternehmen
- Höhere Sicherheit und Datenschutz (nur notwendige Altersinformationen geteilt werden)
- Standardisierte, regulatorisch konforme Lösung

**Bewertung des Potentials:**
- **Kundennutzen:** ████ (Hoch)
- **Mehrwert Bank:** ███ (Mittel-Hoch)
- **Mehrwert Kontributor:** ███ (Mittel-Hoch)  
- **Mehrwert Provider:** ███ (Mittel-Hoch)
- **Marktvolumen:** ████ (Hoch)

#### Use Case 4: CLM von EVV-Endkunden
**Scope:**
- Wiederverwendung resp. Nutzung von Datenbausteinen für das Onboarding von Endkunden bei verschiedenen Depotbanken
- Effiziente Aktualisierung von KYC-Informationen

**Aktuelle Pain Points:**
- Komplexe Onboarding-Prozesse bei verschiedenen Depotbanken
- Redundante KYC-Prozesse für bereits verifizierte Kunden
- Mangelnde Standardisierung im EVV-Bereich

### Zusätzlicher Use Case: Mietprozess / Mietkautionskonto

**Relevanz:**
- Rund 700.000 Umzüge pro Jahr in der Schweiz
- Langfristiges Optimierungspotenzial für Mietprozesse
- Die Relevanz dieses Use Cases dürfte künftig zunehmen

**Besonderheiten:**
- Für ein reines Mietkautionskonto ist keine vollständige Identifikation notwendig
- Reduziert regulatorische Hürden und technische Komplexität
- Spannender Case der im Hinterkopf behalten wird

## Anforderungen je Ecosystem

### Finance Ecosystem
**Kernprodukte:**
- Bankkonten (Privat, Sparen, Jugend)
- Kreditkarten und Zahlungsverkehr
- Hypotheken und Kredite
- Anlageprodukte und Vermögensverwaltung

**Spezifische Anforderungen:**
- GwG-Konformität (Geldwäschereigesetz)
- FINMA-Regulierung
- Banking-spezifische Sicherheitsstandards
- Know Your Customer (KYC) Prozesse

### Insurance Ecosystem
**Kernprodukte:**
- Lebensversicherungen
- Pensionskassen (2. Säule)
- Private Vorsorge (3. Säule)
- Schadenversicherungen

**Spezifische Anforderungen:**
- Risikobewertung und Underwriting
- Policen-Management
- Claims Processing
- Regulatory Compliance (FINMA/ISA)

### Mobility Ecosystem
**Kernprodukte:**
- Fahrzeugfinanzierung
- Mobility Services
- Insurance (Fahrzeugversicherung)
- Fleet Management

**Spezifische Anforderungen:**
- Identitätsverifikation für Fahrzeugzulassung
- Altersverifikation für Führerschein-relevante Services
- Kreditwürdigkeitsprüfung

### Retail Ecosystem
**Kernprodukte:**
- E-Commerce Plattformen
- Point-of-Sale Finanzierung
- Loyalty Programs
- Digital Payments

**Spezifische Anforderungen:**
- Altersverifikation (z.B. Alkohol, Tabak)
- Fraud Prevention
- Customer Authentication
- Payment Processing

### Education Ecosystem
**Kernprodukte:**
- Student Loans
- Educational Institution Access
- Online Learning Platforms
- Professional Certification

**Spezifische Anforderungen:**
- Age Verification für Bildungsangebote
- Identity Verification für Zertifikate
- Academic Credential Verification

### Health Ecosystem
**Kernprodukte:**
- Krankenversicherung
- Health Records Management
- Telemedicine
- Pharmaceutical Services

**Spezifische Anforderungen:**
- Patient Identity Verification
- Insurance Coverage Verification
- Prescription Authorization
- Medical Data Privacy (Besonders strenge Datenschutzanforderungen)

## Anforderungen je Teilschritt Referenzprozess

### 1. Initialisierung
**Zweck:** Information des Kunden
**Datenerfordernis:**
- Cookies [Ja/Nein]
- Consent [Ja/Nein]
- Länderauswahl

**Level of Assurance:** Self-declared
**API-Anforderungen:**
- Consent Management Interface
- Cookie Policy API
- Geolocation Services

### 2. Produktauswahl (Out of Scope für MVP)
**Zweck:** Bedürfnisbefriedigung
**Datenerfordernis:**
- Kontotyp [Privat, Sparen, Jugend, ...]
- Bankpaket [Student, Jugend, ...]
- Produktspezifische Parameter

**Level of Assurance:** Self-declared

### 3. Selbstdeklaration
**Zweck:** Information bzgl. FATCA, MIFID
**Datenerfordernis:**
- Wirtschaftliche Berechtigung [Ja/Nein]
- (Abweichendes) Steuerdomizil [Schweiz, ...]
- US-Steuerpflicht [Ja/Nein]
- FATCA-Selbstdeklaration
- TIN (Schweiz: AHV-Nummer)
- Herkunft der Gelder
- Selbstdeklaration Steuerkonformität
- Nationalität(en)

**Level of Assurance:** Self-declared
**Rechtliche Anforderungen:** GwG Art. 4 Feststellung der wirtschaftlich berechtigten Person

### 4. Erhebung Basisdaten
**Zweck:** Erfassung von Kontaktangaben
**Datenerfordernis:**
- Name, Vorname, Anrede, Gender
- Geburtsdatum, Geburtsort, Bürgerort
- Strasse, Hausnummer, Land, Kanton/Region/Staat/Provinz
- Nationalität
- Telefonnummer, Mobiltelefonnummer, E-Mailadresse
- Abweichende Korrespondenzadresse
- ID (z.B. Google, Apple, Samsung)

**Level of Assurance:** Self-declared

### 5. Erweiterte Daten (Out of Scope für MVP)
**Zweck:** Risiko-/Potenzialermittlung des Kunden
**Datenerfordernis:**
- Gesamtvermögen, Einkommen
- Ausbildung, Beruf, Arbeitgeber
- Weitere produktspezifische Daten

**Level of Assurance:** Self-declared

### 6. Identifikation
**Zweck:** Identifikation der Vertragspartei
**Datenerfordernis:**
- Liveness-Check (Score)
- Gesichtsverifikation (Score)
- Lichtbild (Relevante Seite(n))
- Ausweisnummer, Art des Dokuments [Pass, ID, Personalausweis]
- Ausstellungsdatum, Ausstellungsort, Gültigkeitsdatum
- MRZ (Machine Readable Zone)
- NFC (biometrische Daten)
- Ausstellende Behörde
- Sicherheitsmerkmale (Anzahl geprüft und Score)
- Tonspur/Video [mp3, mp4]

**Level of Assurance:** QEAA (Qualified Entity-Assured-Assurance)
**Rechtliche Anforderungen:** GwG Art. 3 Identifizierung der Vertragspartei

### 7. Background Checks
**Zweck:** Know-Your-Customer (KYC)
**Datenerfordernis:**
- Sanction list check [ok, nok]
- PEP check [ok, nok]
- Crime [ok, nok]
- Adverse media check
- Produktspezifische Checks (Bonität, ZEK/IKO, Betreibungsauskunft)
- Adressprüfung, Mobilnummercheck, E-Mailcheck
- Wallet Check, Geräte-ID

**Level of Assurance:** QEAA oder EAA (Entity-Assured-Assurance)

### 8. Vertragsabschluss
**Zweck:** Akzeptanz Geschäftsbedingungen
**Datenerfordernis:**
- Vertragsbestätigung
- AGB-Akzeptanz
- Datenschutzerklärung

**Level of Assurance:** Self-declared

### 9. Signatur
**Zweck:** Vertragsunterzeichnung
**Datenerfordernis:**
- Digitale Signatur
- 2FA, Wallet
- Zeitstempel

**Level of Assurance:** QEAA
**Besonderheiten:** Abhängig von Produktauswahl (z.B. Kreditkarte, Hypothek, Prozess mit QES)

### 10. Metadaten
**Zweck:** Erfassung von Metadaten
**Datenerfordernis:**
- Prozess-Timestamps
- Audit-Trail
- Compliance-Dokumentation

**Level of Assurance:** Self-declared

### 11. Verteilung
**Zweck:** Prüfung und Verarbeitung
**Datenerfordernis:**
- Finale Datenvalidierung
- Systemintegration
- Benachrichtigungen

## Generelle Technische Anforderungen an Open API Kundenbeziehung

### Sicherheitsanforderungen

#### Authentifizierung und Autorisierung
- **FAPI 2.0 Compliance:** Implementierung der Financial-grade API Security Profile
- **OAuth 2.0 / OIDC:** Standard Authorization Framework
- **Mutual TLS (MTLS):** Certificate-based Authentication
- **JWT Tokens:** Signed und encrypted JSON Web Tokens

#### Datenschutz und Privacy
- **Data Minimization:** Nur notwendige Daten werden übertragen
- **Consent Management:** Granulare Einwilligungsverwaltung
- **Right to be Forgotten:** GDPR/DSG-konforme Datenlöschung
- **Encryption:** End-to-end Verschlüsselung aller sensitiven Daten

#### Network Security
- **TLS 1.3:** Neueste Transport Layer Security
- **Certificate Pinning:** Zusätzliche Certificate Validation
- **Rate Limiting:** DDoS und Abuse Protection
- **IP Whitelisting:** Controlled Access für kritische Endpoints

### Performance-Anforderungen

#### Response Times
- **Authentication:** < 2 seconds
- **Data Retrieval:** < 5 seconds
- **Bulk Operations:** < 30 seconds
- **Real-time Notifications:** < 1 second

#### Availability
- **Uptime:** 99.9% SLA (Service Level Agreement)
- **Disaster Recovery:** RTO < 4 hours, RPO < 1 hour
- **Monitoring:** 24/7 System Health Monitoring
- **Alerting:** Real-time Error und Performance Alerts

### Interoperabilität

#### Standards Compliance
- **OpenAPI 3.0:** API Specification und Documentation
- **JSON Schema:** Data Validation und Documentation
- **ISO 20022:** Financial Messaging Standards (wo anwendbar)
- **FHIR:** Health Information Exchange (für Health Ecosystem)

#### Integration Patterns
- **RESTful APIs:** Resource-oriented Architecture
- **Webhooks:** Event-driven Notifications
- **GraphQL:** Flexible Data Querying (optional)
- **Message Queues:** Asynchronous Processing

### Compliance und Regulatory

#### Swiss Regulatory Framework
- **GwG (Geldwäschereigesetz):** AML/KYC Compliance
- **DSG (Datenschutzgesetz):** Swiss Data Protection Act
- **FINMA Guidelines:** Financial Market Supervisory Authority
- **Banking Law:** Swiss Banking Act Compliance

#### International Standards
- **GDPR:** European General Data Protection Regulation
- **PCI DSS:** Payment Card Industry Data Security Standard
- **ISO 27001:** Information Security Management
- **SOC 2:** Service Organization Control

## Definition und Erklärung MVP

### MVP Scope Definition

Das **Minimum Viable Product (MVP)** der Open API Kundenbeziehung fokussiert auf die grundlegenden Funktionalitäten für den **Use Case 1: Kontoeröffnung resp. Bankwechsel**.

#### MVP Kernfunktionalitäten
1. **Basisdaten-Transfer:** Name, Adresse, Kontaktdaten
2. **Identitätsdaten-Übertragung:** Bereits verifizierte Identitätsinformationen
3. **Consent Management:** Kundeneinwilligung für Datenübertragung
4. **Basic Security:** FAPI 2.0 konforme Sicherheitsimplementierung

#### MVP Ausschlüsse
- **Erweiterte Daten:** Vermögen, Einkommen, Beruf (Zielbild 5)
- **Payment Initiation:** Zahlungsauslösung
- **Cross-Industry:** Andere Ecosystems außer Finance
- **Advanced Analytics:** KI-basierte Datenanalyse

### Spezifische Architektur-Anforderungen für MVP

#### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Produzent     │    │   API Gateway   │    │   Integrator    │
│   (Bank A)      │◄──►│   (Security)    │◄──►│   (Bank B)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Customer Data  │    │ Consent Service │    │ Integration API │
│     Storage     │    │   & Logging     │    │    & Mapping    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Core Components

**1. Identity Provider**
- **Function:** OIDC-based Authentication
- **Requirements:** Swiss e-ID integration ready
- **Standards:** OpenID Connect 1.0, FAPI 2.0

**2. Consent Management Service**
- **Function:** Customer consent tracking und enforcement
- **Requirements:** GDPR/DSG compliant logging
- **Standards:** OAuth 2.0 consent framework

**3. Data Transformation Layer**
- **Function:** Standardized data mapping between banks
- **Requirements:** Lossless bidirectional conversion
- **Standards:** JSON Schema validation

**4. Audit und Logging Service**
- **Function:** Comprehensive audit trail
- **Requirements:** Tamper-proof logging, 7-year retention
- **Standards:** Common Event Format (CEF)

#### Technology Stack für MVP

**Backend Services:**
- **Runtime:** Node.js 18+ oder Java 17+
- **Framework:** Express.js oder Spring Boot
- **Database:** PostgreSQL für transactional data, MongoDB für documents
- **Cache:** Redis für session management

**Security Layer:**
- **Auth Server:** Keycloak oder Auth0
- **Certificate Management:** HashiCorp Vault
- **API Gateway:** Kong oder AWS API Gateway
- **Monitoring:** Prometheus + Grafana

**Development Tools:**
- **API Documentation:** Swagger/OpenAPI Generator
- **Testing:** Jest/JUnit für unit tests, Postman für API tests
- **CI/CD:** GitLab CI oder GitHub Actions
- **Container:** Docker + Kubernetes

## Strategische Herangehensweise: "Vom Kleinen ins Grosse"

### Phase 1: Foundation (MVP) - 6 Monate
**Ziel:** Grundlegende Infrastruktur und erster Use Case

**Deliverables:**
- MVP API Spezifikation
- Pilot Implementation mit 2-3 Banken
- Security Framework (FAPI 2.0)
- Basic Consent Management

**Success Metrics:**
- Erfolgreiche Datenübertragung zwischen 2 Banken
- < 5 seconds response time für Basisdaten
- 0 security incidents
- 95% uptime

### Phase 2: Expansion (Extended API) - 12 Monate
**Ziel:** Erweiterung auf alle 4 priorisierten Use Cases

**Deliverables:**
- Re-Identifikation API
- Altersverifikation Service
- EVV Customer Lifecycle Management
- Enhanced Security (Advanced Threat Protection)

**Success Metrics:**
- 5-8 teilnehmende Banken
- 4 aktive Use Cases
- < 3 seconds response time
- 99% uptime

### Phase 3: Scale-up (Full Open Finance) - 24 Monate
**Ziel:** Branchenübergreifende Expansion

**Deliverables:**
- Cross-Industry APIs (Insurance, Mobility)
- Advanced Analytics und Reporting
- Mobile SDK für Fintech Integration
- Full Governance Framework

**Success Metrics:**
- 15+ teilnehmende Institutionen
- 3+ Industries integriert
- 100,000+ API calls/month
- 99.9% uptime

### Risikomanagement

#### Technical Risks
**Risk:** API Performance Degradation
**Mitigation:** Load testing, auto-scaling, performance monitoring

**Risk:** Security Vulnerabilities
**Mitigation:** Regular penetration testing, security audits, bug bounty program

**Risk:** Data Quality Issues
**Mitigation:** Schema validation, data quality monitoring, error handling

#### Business Risks
**Risk:** Low Adoption Rate
**Mitigation:** Strong business case, pilot programs, industry engagement

**Risk:** Regulatory Changes
**Mitigation:** Regular FINMA consultation, flexible architecture, compliance monitoring

**Risk:** Competitive Pressure
**Mitigation:** Open source approach, community building, continuous innovation

## Fazit und Roadmap

### Business Case Summary

#### Quantitativer Business Case
**Conversion Rate Improvements:**
- Videoidentifikation Success Rate: 80%
- MVP Identifikation Success Rate: 90%
- Gewinnsteigerung durch Open API: 10-15%

**Financial Impact (pro Bank/Jahr):**
- HBL: CHF 891,000 zusätzlicher Gewinn
- PostFinance: CHF 1,094,500 zusätzlicher Gewinn
- 20 größte Banken: CHF 9,900,000 Gesamtpotenzial

#### Qualitativer Business Case
- **Customer Experience:** Signifikante Verbesserung der Onboarding-Zeit
- **Operational Efficiency:** Reduktion manueller Prozesse um 60%
- **Regulatory Compliance:** Automatisierte GwG/KYC-Konformität
- **Market Position:** Schweiz als Open Finance Leader in DACH-Region

### 3-Jahres Roadmap

#### Jahr 1: Foundation & MVP
**Q1-Q2:** API Design und Security Framework
**Q3-Q4:** Pilot Implementation und Testing

#### Jahr 2: Expansion & Growth
**Q1-Q2:** Multi-Bank Rollout und Use Case Expansion
**Q3-Q4:** Cross-Industry Integration

#### Jahr 3: Maturity & Scale
**Q1-Q2:** Full Market Deployment
**Q3-Q4:** International Expansion und Standards Export

### Next Steps

1. **Immediate (Next 30 Days):**
   - Finalisierung MVP Requirements
   - Partner Bank Commitment (minimum 3 Banken)
   - Technical Architecture Review

2. **Short-term (Next 90 Days):**
   - API Specification Development
   - Security Framework Implementation
   - Pilot Program Launch

3. **Medium-term (Next 6 Months):**
   - MVP Development und Testing
   - Regulatory Alignment (FINMA)
   - Community Building und Standards Establishment

**Erfolgs-Kriterien:**
- Mindestens 3 Partner für Phase 2
- MVP mit mindestens 2 Partnern erfolgreich implementiert
- Positive FINMA-Stellungnahme zu Governance Framework
- Community-Akzeptanz und Industry-Support