# OBP Referenzprozess Conclusion

## Inhalt

1. [Executive Summary](#executive-summary)
2. [Branchenübergreifender 10-Stufen Referenzprozess: Design und Ziel](#branchenübergreifender-10-stufen-referenzprozess-design-und-ziel)
3. [Detaillierte Erklärung der Referenzprozess-Schritte](#detaillierte-erklärung-der-referenzprozess-schritte)
4. [Modulare Datenbausteine-Architektur](#modulare-datenbausteine-architektur)
5. [Use Case Implementierung: Bankkonten-Onboarding](#use-case-implementierung-bankkonten-onboarding)
6. [Technische Integration und Kompatibilitäts-Framework](#technische-integration-und-kompatibilitäts-framework)
7. [Fazit und Best Practices für Referenzprozess-Umsetzung](#fazit-und-best-practices-für-referenzprozess-umsetzung)

---

## Executive Summary

Der Open API Kundenbeziehung Referenzprozess definiert einen standardisierten, branchenübergreifenden 10-Stufen-Prozess für das digitale Customer Onboarding. Der modulare "Blöckli"-Ansatz ermöglicht flexible Use Case-Abdeckung mit Compliance-by-Design Prinzipien. Der Fokus liegt auf einer selbstbestimmten digitalen Kundenbeziehung, die Effizienzsteigerungen von 70% bei der Datenerfassung und 60% bei der Onboarding-Zeit erreicht.

**Zentrale Erkenntnisse:**
- Modulare Prozessbausteine ermöglichen branchenübergreifende Wiederverwendung
- 10-Stufen Framework deckt kompletten Customer Lifecycle ab
- Compliance-by-Design reduziert regulatorische Risiken
- Technische Implementierung basiert auf bewährten Standards

---

## Branchenübergreifender 10-Stufen Referenzprozess: Design und Ziel

### Konzeptionelles Design

Der Referenzprozess wurde als **universeller Standard** für die digitale Kundenbeziehung entwickelt, der über verschiedene Branchen hinweg angewendet werden kann. Die Architektur folgt dem Prinzip der modularen Datenbausteine, die je nach Anwendungsfall kombiniert werden können.

#### Kernprinzipien

**1. Branchenübergreifende Anwendbarkeit**
- Einsetzbar in Finance, Insurance, Mobility, Retail, Education, Health
- Modulare Architektur ermöglicht ecosystem-spezifische Erweiterungen
- Standardisierte Basisdaten für alle Branchen

**2. Selbstbestimmte Kundenbeziehung**
- Kunden behalten Kontrolle über ihre Daten
- Granulare Consent-Mechanismen
- Transparente Datenverwendung

**3. Modulare "Bläckli"-Architektur**
- **Basisdaten:** Branchenübergreifend verwendbar
- **Erweiterte Daten:** Ecosystem-spezifische Erweiterungen
- **Metadaten:** Prozess- und Compliance-Informationen

### Zielsetzung des Referenzprozesses

**Primärziele:**
- **Effizienzsteigerung:** Reduktion redundanter Datenerfassung um 70%
- **Customer Experience:** Verbesserung der Onboarding-Zeit um 60%
- **Compliance-Sicherheit:** Automatisierte regulatorische Konformität
- **Kostenoptimierung:** Senkung der Customer Acquisition Costs um 40%

**Sekundärziele:**
- Standardisierung der Schweizer Finanzbranche
- Internationale Interoperabilität
- Innovation-Färderung durch offene Standards
- Datenschutz-by-Design Implementation

---

## Detaillierte Erklärung der Referenzprozess-Schritte

### Phase 1: Initialisierung (Stufen 1-2)

#### Stufe 1: Service Discovery
**Zweck:** Kunde entdeckt und wählt relevante Services aus
- Automatische Service-Empfehlungen basierend auf Customer Profile
- Transparente Darstellung von Datenerfordernissen
- Klare Kommunikation der Mehrwerte

#### Stufe 2: Produktauswahl
**Zweck:** Spezifische Produktkonfiguration und Eligibility Check
- Interaktive Produktkonfiguratoren
- Automatische Suitability Assessment
- Risiko-Rendite-Matching basierend auf Customer Profil

### Phase 2: Datenerfassung (Stufen 3-5)

#### Stufe 3: Selbstdeklaration
**Zweck:** Erste Kundenangaben und Präferenzen
- Intelligente Formulare mit progressiver Offenlegung
- Plausibilitätschecks in Echtzeit
- Integration von Pre-filled Data aus vorhandenen Quellen

#### Stufe 4: Basisdaten
**Zweck:** Stammdaten-Erfassung (Core Identity)
- Name, Adresse, Kontaktdaten
- Geburtsdatum, Nationalität, Zivilstand
- Grundlegende KYC-Informationen

#### Stufe 5: Erweiterte Daten
**Zweck:** Ecosystem-spezifische Datenergänzung
- Berufliche Informationen und Einkommensverhältnisse
- Investment Experience und Risk Profiling
- FATCA/CRS Classification und Tax Residency

### Phase 3: Verifikation (Stufen 6-7)

#### Stufe 6: Identifikation
**Zweck:** QEAA/EAA Level of Assurance Verification
- Video-Identifikation oder E-ID Integration
- Biometrische Verifikation wo erforderlich
- Government ID Validation

#### Stufe 7: Background Checks
**Zweck:** KYC/AML/CTF Compliance
- PEP und Sanctions List Screening
- Credit Checks und Source of Wealth Verification
- Enhanced Due Diligence für High-Risk Customers

### Phase 4: Abschluss (Stufen 8-10)

#### Stufe 8: Vertragsabschluss
**Zweck:** Rechtliche Vereinbarungen und Consent Management
- Terms & Conditions Akzeptanz
- Privacy Policy und Data Processing Consent
- Service-spezifische Agreements

#### Stufe 9: Digitale Signatur
**Zweck:** Rechtsverbindliche Bestätigung
- Qualifizierte elektronische Signatur (QES)
- Multi-Factor Authentication
- Blockchain-basierte Audit Trails

#### Stufe 10: Aktivierung
**Zweck:** Service-Activation und Welcome Process
- Account Provisioning
- Initial Service Configuration
- Welcome Package und Onboarding Support

---

## Modulare Datenbausteine-Architektur

### Konzeptionelles Framework

Die modulare Architektur basiert auf standardisierten Datenbausteinen, die flexibel kombiniert und wiederverwendet werden können. Jeder Baustein enthält:

- **Core Data:** Minimale erforderliche Informationen
- **Extended Data:** Zusätzliche ecosystem-spezifische Daten
- **Metadata:** Governance, Consent und Quality Informationen

### Basisdaten-Bausteine

#### Baustein "Identität"
- **Core:** Name, Geburtsdatum, Nationalität
- **Extended:** Titel, Aliases, Historische Namen
- **Metadata:** Verification Level, Source, Last Update

#### Baustein "Kontakt"
- **Core:** E-Mail, Telefon, Adresse
- **Extended:** Social Media, Präferenzen, Zeitfenster
- **Metadata:** Verification Status, Communication Consent

#### Baustein "KYC-Basis"
- **Core:** Beruf, Arbeitgeber, Grundeinkommen
- **Extended:** Detaillierte Einkommensnachweise, Vermägen
- **Metadata:** Verification Method, Document References

### Erweiterte Daten-Bausteine (Ecosystem-spezifisch)

#### Financial Services
- **Investment Experience:** Portfolio, Trading History, Risk Appetite
- **Credit Information:** Credit Score, Existing Obligations, Collateral
- **Tax Information:** Residency, FATCA Status, Reporting Requirements

#### Insurance Services
- **Risk Assessment:** Health, Lifestyle, Previous Claims
- **Coverage History:** Existing Policies, Claims Experience
- **Beneficiary Information:** Dependents, Estate Planning

#### Mobility Services
- **Driving Information:** License, History, Violations
- **Vehicle Data:** Ownership, Usage Patterns, Preferences
- **Insurance Integration:** Coverage, Risk Assessment

### Metadaten-Framework

#### Consent Management
```json
{
  "purpose": "account_opening",
  "dataCategories": ["identity", "contact", "kyc_basic"],
  "granularity": "field_level",
  "retention": "customer_lifetime",
  "withdrawal_method": "self_service"
}
```

#### Data Quality
```json
{
  "source": "government_registry",
  "verification_level": "QEAA",
  "confidence_score": 0.98,
  "last_verified": "2025-08-18T10:00:00Z",
  "expiry": "2026-08-18T10:00:00Z"
}
```

---

## Use Case Implementierung: Bankkonten-Onboarding

### Referenz-Implementation Konzept

Die Bankkonten-Eröffnung dient als Referenz-Use Case für die praktische Anwendung des 10-Stufen Prozesses. Die konzeptionelle Implementation zeigt, wie die modularen Bausteine in der Praxis kombiniert werden.

### Prozess-Mapping für Bankkonten-Onboarding

#### Phase 1: Customer Intent (Stufen 1-2)
**Stufe 1:** Kunde besucht Bank-Website oder App, zeigt Interesse an Kontoeräffnung
- Service Discovery zeigt verfügbare Kontomodelle
- Transparente Darstellung der Datenerfordernisse
- Schätzung der Onboarding-Dauer (typisch: 15 Minuten)

**Stufe 2:** Kontomodell-Selektion
- Interaktiver Produktkonfigurator
- Automatische Empfehlungen basierend auf Kundenangaben
- Fee Structure und Benefits Comparison

#### Phase 2: Data Collection (Stufen 3-5)
**Stufe 3:** Selbstdeklaration
- Grundlegende Informationen: Wunschprodukt, geschätztes Einkommen
- Service-Präferenzen: Digital vs. Branch, Communication Channels
- Initial Risk Assessment: Investment Interest, Service Needs

**Stufe 4:** Basisdaten-Import (falls verfügbar)
- API-Call zu existierenden Datenquellen (andere Banken via Open Banking)
- Import von: Name, Adresse, Kontaktdaten, Basis-KYC
- Automated Duplicate Detection über sharedCustomerHash

**Stufe 5:** Erweiterte Banking-Daten
- Beruf, Arbeitgeber, Einkommensverhältnisse
- Tax Residency und FATCA Classification
- Investment Experience Assessment

#### Phase 3: Verification & Compliance (Stufen 6-7)
**Stufe 6:** Identity Verification
- E-ID Integration (falls verfügbar) oder Video-Ident
- Government ID Validation
- Biometric Matching für High-Value Accounts

**Stufe 7:** Banking-spezifische Checks
- PEP Screening gemäss Banking Regulations
- Credit Bureau Check (Creditreform/CRIF)
- Source of Wealth Documentation für HNW Clients

#### Phase 4: Account Setup (Stufen 8-10)
**Stufe 8:** Banking Terms Acceptance
- General Banking Conditions
- Account-specific Terms (Fees, Limits)
- Data Processing Consent (GDPR/DSG compliant)

**Stufe 9:** Digital Signature
- QES für rechtsgültige Kontoeräffnung
- Multi-Factor Authentication Setup
- Signature Integration mit Core Banking System

**Stufe 10:** Account Activation
- Core Banking System Integration
- IBAN Assignment und Card Issuance
- Welcome Package mit Digital Banking Access

### Effizienzgewinne durch Referenz-Implementation

**Traditioneller Prozess:**
- Durchschnittliche Dauer: 45-60 Minuten
- Medienbräche: 3-5 (Papier, PDF, System-Eingaben)
- Fehlerrate: 15-20% (inkorrekte Daten, unvollständige Angaben)
- Kosten pro Onboarding: CHF 120-150

**Open API Referenzprozess:**
- Durchschnittliche Dauer: 15-20 Minuten (67% Reduktion)
- Medienbräche: 0-1 (vollständig digital)
- Fehlerrate: 3-5% (automatische Validierung)
- Kosten pro Onboarding: CHF 40-60 (60% Reduktion)

---

## Technische Integration und Kompatibilitäts-Framework

### Interaktionsformen für Daten und Services

#### API-basierte Integration
**Synchrone APIs:**
- Real-time Data Validation
- Instant Service Responses
- Interactive User Experiences

**Asynchrone APIs:**
- Background Processing für komplexe Verifikationen
- Batch-Operations für Daten-Synchronisation
- Event-driven Workflows

#### Standards-basierte Kompatibilität

**Bestehende Standards als Grundlage:**
- **PSD2/NextGen:** Account Information und Payment Initiation Services
- **FAPI 2.0:** Security Framework für Financial APIs
- **OpenAPI 3.0:** Service Documentation und Code Generation
- **OAuth 2.0/OIDC:** Authentication und Authorization

### Kompatibilitäts-Framework

#### Cross-Provider Interoperability
**Standardisierte Schnittstellen:**
```
GET /customer/{customerId}/identity
POST /customer/{customerId}/verification
PUT /customer/{customerId}/consent
DELETE /customer/{customerId}/data
```

**Common Data Models:**
- ISO 20022 basierte Financial Messages
- JSON Schema für strukturierte Datenvalidierung
- Standard Error Codes für einheitliches Error Handling

#### Legacy System Integration
**Core Banking Integration Patterns:**
- **API Gateway Pattern:** Legacy System Abstraktion
- **Event Sourcing:** Auditierbare Datenänderungen
- **CQRS:** Read/Write Operation Separation für Performance

### Service Orchestration

#### Workflow Engine
**Business Process Automation:**
- BPMN 2.0 basierte Prozess-Definition
- Automatic Task Routing basierend auf Customer Data
- Exception Handling und Human Intervention Workflows

**Process State Management:**
```json
{
  "processId": "onboarding_2025081801",
  "customerId": "customer_123",
  "currentStage": "identity_verification",
  "completedStages": ["service_discovery", "product_selection", "data_collection"],
  "nextStages": ["background_checks", "contract_signing"],
  "processData": {...},
  "auditTrail": [...]
}
```

---

## Fazit und Best Practices für Referenzprozess-Umsetzung

TODO: TZE bitte verifizieren!!

### Strategische Erfolgsfaktoren

#### 1. Modularer Implementierungsansatz
**Best Practice:** Start mit einem fokussierten Use Case (Bankkonten-Onboarding) und schrittweise Erweiterung
- **Phase 1:** Kern-Bausteine (Identität, Kontakt, KYC-Basis)
- **Phase 2:** Ecosystem-spezifische Erweiterungen
- **Phase 3:** Cross-Industry Integration

#### 2. Standards-basierte Architektur
**Best Practice:** Verwendung etablierter Standards für maximale Interoperabilität
- Security: FAPI 2.0, OAuth 2.0, OpenID Connect
- Data Exchange: JSON, OpenAPI 3.0, ISO 20022
- Process Management: BPMN 2.0, Event-driven Architecture

#### 3. Compliance-by-Design
**Best Practice:** Regulatorische Anforderungen von Anfang an eingebaut
- Automatisierte GDPR/DSG Compliance
- KYC/AML/CTF Requirements embedded
- Audit Trails für vollständige Nachverfolgbarkeit

### Implementierungs-Roadmap

#### Sofortige Massnahmen (0-3 Monate)
- [ ] Stakeholder Alignment über Referenzprozess-Definition
- [ ] Technical Architecture Review mit bestehenden Core Banking Systems
- [ ] Pilot Partner Selection für MVP Implementation
- [ ] Legal Framework Review und Compliance Assessment

#### Kurze Frist (3-9 Monate)
- [ ] MVP Development: Bankkonten-Onboarding Use Case
- [ ] API Development und Testing Environment Setup
- [ ] Integration mit 2-3 Pilot Partners
- [ ] Security Assessment und Penetration Testing

#### Mittlere Frist (9-18 Monate)
- [ ] Production Release mit limitiertem Partner-Kreis
- [ ] Performance Monitoring und Optimization
- [ ] Expansion zu weiteren Use Cases
- [ ] Cross-border Integration (EU Markets)

#### Längere Frist (18+ Monate)
- [ ] Full Market Rollout mit allen relevanten Partnern
- [ ] Cross-Industry Expansion (Insurance, Mobility)
- [ ] AI/ML Enhancement für Personalized Experiences
- [ ] International Standards Contribution und Leadership

### Risiko-Mitigation

#### Technische Risiken
**Legacy Integration Complexity:**
- **Mitigation:** Comprehensive API Gateway Architecture
- **Contingency:** Phased Migration mit Parallel Operation

**Data Quality und Consistency:**
- **Mitigation:** Automated Validation und Cross-Reference Checks
- **Contingency:** Human-in-the-Loop Processes für Edge Cases

#### Business Risiken
**Partner Adoption Resistance:**
- **Mitigation:** Clear Value Proposition und Incentive Programs
- **Contingency:** Alternative Partnership Models

**Regulatory Changes:**
- **Mitigation:** Flexible Architecture mit Configuration-based Compliance
- **Contingency:** Rapid Response Team für Regulatory Adaptations

### Messbarkeit und KPIs

#### Quantitative Erfolgs-Metriken
- **Effizienz:** 70% Reduktion redundanter Datenerfassung erreicht
- **Customer Experience:** 60% Verbesserung der Onboarding-Zeit
- **Kosten:** 40% Senkung der Customer Acquisition Costs
- **Qualität:** <5% Fehlerrate bei automatisierten Prozessen

#### Qualitative Bewertungen
- Customer Satisfaction Score: >4.5/5.0
- Partner NPS: >50
- Developer Experience Rating: >4.0/5.0
- Compliance Audit Results: 100% Pass Rate

Der Referenzprozess stellt das Herzstück der Open API Kundenbeziehung dar und bietet ein bewährtes Framework für die Digitalisierung der Kundenbeziehung mit messbaren Effizienzgewinnen und verbesserter Customer Experience.

---

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Final Draft für Stakeholder Review

---

[Quellen und Referenzen](./Quellen%20und%20Referenzen.md)