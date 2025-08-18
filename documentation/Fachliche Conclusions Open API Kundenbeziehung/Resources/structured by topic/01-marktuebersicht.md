# 01 Marktübersicht - Open API Kundenbeziehung

## Analysierte Märkte und Initiativen: Detailanalyse 8 globaler Open Banking Standards

### Übersicht der analysierten globalen Open Banking und Open Finance Initiativen

Die Marktanalyse umfasst eine systematische Bewertung von acht führenden globalen Open Banking und Open Finance Standards:

1. **UK Open Banking Standard** - Open Banking Limited (OBL)
2. **Open Finance Brasil** - Brasilianische Zentralbank
3. **Consumer Data Standard (CDS)** - Commonwealth Scientific and Industrial Research Organisation (CSIRO), Australien
4. **Open API Framework for Hong Kong** - Hong Kong Monetary Authority
5. **NextGenPSD2** - The Berlin Group
6. **Open Wealth API** - Open Wealth Association
7. **SFTI Mortgage API** - Swiss Fintech Innovation
8. **Singapore Financial Data Exchange** - Monetary Authority of Singapore (MAS) und Smart Nation and Digital Government Group (SNDGG)

### Detaillierte Marktanalyse-Matrix

| Initiative | Governance-Modell | Scope | Security Model | Datenformat | Consent-Ansatz | Products Coverage |
|------------|-------------------|--------|----------------|-------------|----------------|-------------------|
| UK Open Banking | Regulator-mandated via OBIE | Open Banking | FAPI, OAuth, OIDC | JSON, RESTful | App-to-App Redirect | Current Accounts, Cards, Payments |
| Open Finance Brasil | Central Bank-regulated | Open Finance | FAPI, OAuth, OIDC | JSON, RESTful | Multiple Flows | Banking, Insurance, Investment |
| CDS Australia | Government-legislated Consumer Data Right | Open Data, Open Finance | OAuth, OIDC | JSON, XML, YAML | Browser Redirect | Banking, Energy, Telecom |
| Hong Kong API | Regulatory guidelines by HKMA | Open Banking | OAuth | JSON, RESTful | NA | Account Information |
| NextGenPSD2 | Collaborative industry-led | Open Banking | QWACS & QSEALS | JSON, RESTful, XML | Various | Payment Initiation, Account Information |
| Open Wealth API | Market Driven | Open Finance | BankID | JSON, RESTful | NA | Wealth Management |
| SFTI Mortgage | Market Driven | Open Finance | E-ID | JSON, RESTful | NA | Mortgage |
| Singapore FinDEx | Hybrid | Open Finance | OAuth, OIDC | JSON, RESTful | Decoupled | Banking, Insurance |

## 6 Key Takeaways aus der Marktanalyse

### 1. Technologische Standards sind nicht global vereinheitlicht

**JSON als Dateiformat und RESTful APIs** als Architekturstandard sind de facto etabliert. Die Nutzung von XML oder YAML ist hingegen stark verteilt. Einzig CDS (Australien) verwendet alle Formate konsistent.

### 2. Consent- und Sicherheitsmodelle variieren stark

Von App-to-App bis Decoupled Flows gibt es keinen eindeutigen globalen Consent-Standard. Auch bei Sicherheitsmodellen (z.B. FAPI, OAuth, OIDC) sind grosse Unterschiede erkennbar.

### 3. Unterschiedliche Governance-Modelle prägen die Umsetzung

Von regulatorisch vorgegebenen Modellen (UK, Brasilien, Australien) bis zu industriegetriebenen Standards (Open Wealth, SFTI): Die Steuerung variiert erheblich.

### 4. Open Finance ist im Kommen – aber uneinheitlich

Während einige Initiativen (z.B. OP Brasil, NextGenPSD2, SingFINDex) bereits umfangreiche Open Finance-Funktionen abdecken, fokussieren sich andere noch stark auf reines Open Banking.

### 5. Products & Services stark fragmentiert

Die Abdeckung von Finanzprodukten ist sehr unterschiedlich. Nur wenige Standards decken Lending, Investments und Versicherungen ab. Die meisten bleiben bei Kernprodukten wie Girokonten und Kreditkarten.

### 6. Payment Initiation unterschiedlich ausgereift

Während UK, Brasilien und NextGenPSD2 umfassende Zahlungsinitiationen inkl. Bulk, File & VRP unterstützen, bieten andere Standards (z.B. Open API Hongkong, CDS, SingFINDex) kaum oder keine Funktionen in diesem Bereich.

## Regulatorische Rahmenbedingungen Schweiz

### Governance-Ansätze im Vergleich

**Regulatorische Modelle:**
- **Regulator-mandated** (UK, Brasilien): Zentrale Vorgaben durch Finanzaufsicht
- **Government-legislated** (Australien): Gesetzliche Verankerung im Consumer Data Right
- **Industry-led** (NextGenPSD2): Kollaborative Branchenentwicklung

**Schweizer Kontext:**
- Aktuell **Market Driven** Ansatz (SFTI, Open Wealth)
- Regulatorische Ausgangslage: Fragmentiert, keine einheitlichen Vorgaben
- FINMA-Position: Noch keine spezifischen Richtlinien für Open Banking

### Technische Standards und Zertifizierung

**Empfohlene Standards für Schweizer Implementation:**
- **Security:** FAPI 2.0, OAuth2, OIDC
- **Datenformat:** JSON, RESTful APIs
- **Consent:** Hybrides Modell mit App-to-App und Browser Redirect
- **Zertifizierung:** Branchenbasierte Qualitätssicherung

## Detailanalyse existierender Technologien und Standards

### Security Standards Evaluation

#### FAPI (Financial-grade API) 2.0
- **Anwendung:** UK, Brasilien, NextGenPSD2
- **Vorteile:** Höchste Sicherheitsstandards für Finanzdienstleistungen
- **Implementierung:** Obligatory für sensitive Finanzdaten

#### OAuth 2.0 / OpenID Connect (OIDC)
- **Verbreitung:** Nahezu universell implementiert
- **Flexibilität:** Unterstützt verschiedene Consent-Flows
- **Integration:** Kompatibel mit bestehenden Identitätsmanagement-Systemen

#### Consent-Flow-Architekturen
1. **App-to-App Redirect:** Direkte Weiterleitung zwischen Apps
2. **Browser Redirect:** Web-basierte Autorisierung
3. **Decoupled Flow:** Getrennte Autorisierung und Datenübertragung
4. **Embedded:** Integration in bestehende Anwendungen

### Datenformat-Standards

#### JSON (JavaScript Object Notation)
- **Adoption:** 100% aller analysierten Standards
- **Vorteile:** Lightweight, entwicklerfreundlich, universell unterstützt
- **Standard:** RFC 7159

#### RESTful APIs
- **Architektur:** Resource-orientierte Schnittstellen
- **HTTP-Methoden:** GET, POST, PUT, DELETE
- **Stateless:** Zustandslose Kommunikation

## Empfohlener Technologie-Stack für Schweizer Implementation

### Core Technologies
```
Security Layer:
├── FAPI 2.0 Security Profile
├── OAuth 2.0 Authorization Framework
├── OpenID Connect 1.0
└── JWT (JSON Web Tokens) for Claims

API Layer:
├── RESTful API Design
├── JSON Data Format
├── OpenAPI 3.0 Specification
└── HTTP/2 Protocol

Infrastructure:
├── TLS 1.3 Encryption
├── MTLS (Mutual TLS) Authentication
├── Certificate-based Identity
└── Distributed Logging
```

### Integration Framework
- **API Gateway:** Zentralisierte Verwaltung und Monitoring
- **Identity Provider:** OIDC-kompatible Identitätsverifikation
- **Consent Management:** GDPR/DSG-konforme Einwilligungsverwaltung
- **Monitoring:** Real-time API Performance und Security Monitoring

## Technologische Entscheidungen - Final Update mit Experten-Meinung

### Verwendete Standards: FAPI 2.0 und OAuth2/OIDC

Basierend auf der Marktanalyse und Verifikation mit Experten wurde entschieden, **FAPI 2.0** in Kombination mit **OAuth2/OIDC** zu verwenden.

**Referenz-Implementation:** 
Orientierung an [Airlock IAM FAPI 2.0](https://docs.airlock.com/iam/latest/index/1639690251538.html)

**Begründung:**
1. **Bewährte Praxis:** Erfolgreich implementiert in UK und Brasilien
2. **Sicherheit:** Höchste Standards für Finanzdienstleistungen
3. **Interoperabilität:** Kompatibilität mit internationalen Standards
4. **Zukunftssicherheit:** Kontinuierliche Weiterentwicklung durch OpenID Foundation

### Architecture Decision Records (ADR)

#### ADR-001: Security Framework
- **Decision:** FAPI 2.0 Security Profile
- **Rationale:** Finanzdienstleistungs-spezifische Sicherheitsanforderungen
- **Consequences:** Erhöhte Implementierungskomplexität, aber maximale Sicherheit

#### ADR-002: Authorization Protocol
- **Decision:** OAuth 2.0 mit OIDC Extensions
- **Rationale:** Industriestandard mit breiter Tool-Unterstützung
- **Consequences:** Flexible Consent-Flow-Implementierung möglich

#### ADR-003: Data Format
- **Decision:** JSON mit OpenAPI 3.0 Specification
- **Rationale:** Developer-friendly, universell unterstützt
- **Consequences:** Vereinfachte Integration für Entwickler

## Zentrale Erkenntnisse und Implikationen für Schweizer Kontext

### Strategische Erkenntnisse

#### 1. Schweizer Ausgangslage
Die Schweiz befindet sich in einer **mittleren Position** bezüglich Open Finance-Reife:
- **Vorteil:** Keine regulatorischen Zwänge ermöglichen flexiblere Lösungen
- **Herausforderung:** Fehlende Standards erschweren Marktdurchdringung
- **Chance:** Learnings aus internationalen Implementierungen nutzen

#### 2. Marktpositionierung
**Bewertung der Schweizer Open Finance-Reife:** 2.69 (Skala 1-5, gering bis mittel)

**Vergleich international:**
- **Sehr hoch:** UK, Brasilien (flächendeckende Implementation)
- **Hoch:** Australien (strategische Relevanz erkannt)
- **Mittel:** Schweiz, Singapur (Pilotprojekte laufen)
- **Gering:** Hong Kong (fragmentierte Vorhaben)

#### 3. Erfolgsfaktoren für Schweizer Implementation

**Technische Erfolgsfaktoren:**
1. **Standardisierung:** Einheitliche API-Spezifikationen
2. **Sicherheit:** FAPI 2.0 Compliance von Beginn an
3. **Interoperabilität:** Kompatibilität zu internationalen Standards
4. **Developer Experience:** Umfassende Dokumentation und Testing-Tools

**Organisatorische Erfolgsfaktoren:**
1. **Industry Collaboration:** Aktive Teilnahme führender Finanzinstitute
2. **Governance:** Klare Rollen und Verantwortlichkeiten
3. **Roadmap:** Phasenweise Umsetzung mit klaren Meilensteinen
4. **Community:** Offene Entwickler- und Fintech-Community

### Implikationen für Schweizer Kontext

#### Regulatorische Strategie
- **Bottom-up Approach:** Industry-led Standards vor regulatorischen Vorgaben
- **FINMA Engagement:** Frühe Einbindung für regulatorische Klarheit
- **International Alignment:** Kompatibilität zu EU/UK Standards

#### Technische Roadmap
1. **Phase 1:** MVP mit Basisdaten und Identifikation
2. **Phase 2:** Erweiterte Use Cases und Payment Initiation
3. **Phase 3:** Full Open Finance mit Insurance und Investment

#### Marktentwicklung
- **Pilot Programs:** Beginn mit 3-4 führenden Banken
- **Ecosystem Building:** Einbindung von Fintechs und Service Providern
- **Scale-up:** Ausweitung auf gesamten Finanzmarkt

### Fazit

Die Marktanalyse zeigt, dass **hybride Governance-Modelle** mit **industry-led Standards** und **regulatorischer Unterstützung** die erfolgversprechendste Strategie für die Schweiz darstellen. 

Die technologische Grundlage mit **FAPI 2.0, OAuth2/OIDC und JSON/RESTful APIs** ist bewährt und bietet die beste Balance zwischen Sicherheit, Interoperabilität und Developer Experience.

**Next Steps:**
1. Finalisierung der API-Spezifikation basierend auf internationalen Best Practices
2. Aufbau einer Pilot-Community mit 3-4 Partnerbanken
3. Entwicklung einer Schweizer Open Banking Governance-Struktur
4. Engagement mit FINMA für regulatorische Klarstellung