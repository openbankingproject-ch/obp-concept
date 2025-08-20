# Open API Kundenbeziehung - Master Implementierungs-Roadmap

## Executive Summary

Diese Master-Roadmap konsolidiert alle Implementierungs-Timelines des Open API Kundenbeziehung Projekts und bietet eine einheitliche Quelle für Projektphasen, Meilensteine und Deliverables. Die Umsetzung folgt einem dreiphasigen Ansatz über 36 Monate, von der Fundament-Phase bis zum Produktions-Rollout.

**Strategisches Ziel:** Die Schweiz als führenden Markt für Kundendatenportabilität und Finanzservice-Integration durch sichere, standardisierte APIs etablieren. Hierfür wird durch das Open Banking Project eine offene Schnittstelle für die Kundenbeziehung bereitgestellt. Diese umfasst das Onboarding, die Pflege der Kundendaten (z.B. periodische Verifikation der Richtigkeit), sowie die Möglichkeit der Saldierung einer Kundenbeziehung. Die Schnittstelle soll am Schluss sowohl für Bürger resp. Kunden, für Menschen in Unternehmen, wie auch für Firmenkunden eingesetzt werden können. 
Die Open API Kundenbeziehung definiert ein Basisset an Kundendaten, welches die Indentifikation und die Erlangung von Leistungen (z.B. Onboarding und Identifikation für die Eröffnung eines Bankkontos) im Netzwerk ermöglicht. Durch die digitale Übertragbarkeit der identifizierten Kundendaten wird die nahtlose und unterbruchsfreie Beanspruchung von Leistungen für alle Beteiligten einfacher, effizienter und auch sicherer. Um die Anschlussfähigkeit in jedes Ecosystem zu gewährleisten umfasst das Basis-Set und der zugehörige Referenzprozess folgende Bausteine: 
- Initialisierung: Serviceerschliessung vie entsprechendem Kanal
- Produktauswahl: Sicherstellung der Anschlussfähigkeit für den Bezug von Services in einem Ecosystem (z.B. Bankkonto, Hypothek, Versicherung, Fussballticket, Bleistift)
- Selbstdeklaration: Steuerrechtliche (z.B. Domizil, wirtschaftliche Berechtigung) und regulatorische Themen (z.B. FATCA)
- Basisdaten: Personalien und Adress- und Kontaktdaten (alle Daten für die E-ID sind hier auch enthalten; die relevante Teilmenge bei den Basisdaten ist kompatil und semantisch identisch zu den verwendeten Daten in der E-ID)
- Erweiterte Daten: Sicherstellung der Anschlussfähigkeit für die Serviceauswahl in einer anderen Branche (z.B. Einkommen, Hobbies)
- Ausweis: Vorweisung des Ausweisdokumentes
- Identifikation: Überprüfung der Identität mittels des vorgewiesenen Ausweisdokumentes in einen regulatorisch konformen Identifikationsverfahren
- Check: Durchführung von regulatorisch notwendigen Prüfungen (Alterscheck, PEP, Sanctionlist) für den bezug von Produkten/Services, die dies erfordern (z.B. Alkohol, Bankkonto)
- Consent: Zustimmung des Konsumenten (natürliche oder juristische Person) im Kontext von Datenschutz und Einwilligungsmanagement (z.B. AGBs, Produktinformationen, Data-sharing Agreement)
- Signatur: Bestätigung mittels regulatorisch geforderter Signaturstufe (z.B. QES)
- Backoffice: Sicherstellung der Verbindung in die Verarbeitung
Consent und Securityflow:
- Der Consentflow bildet die Zustimmung des Kunden ab. Der Securityflow ist unabhängig davon formuliert und stellt dadurch auch die Anschlussfähigkeit in jedes andere Ecosystem sicher.
Zur Sicherstellung der internationalen Kompatibilität werden die gängigsten Standards verwendet. Ebenso wird die Abstimmung mit und Kompatibilität mit anderen Initiativen sichergestellt. Dies sind beispielsweise SFTI (z.B. Kundendatenverwendung in der API des Zahlungsverkehrs), Open Wealth (z.B. Kundendatenverwendung in der API Customer Management für die Anbindung von EVVs), eCH (Verwendung von Kundendaten im behördlichen Kontext.
Diese offene Schnittstelle steht nach der Fertigstellung Allen offen zur Verfügung und wird z.B. auch auf der I14Y-Plattform vom Bundesamt für Statistik bereit stehen. Es besteht auch die Idee, diese Open API Kundenbeziehung bei ISO akreditieren zu lassen.

Roadmap:
Phase 1 (bis 06/26): 
- Sicherstellung der konzeptionellen Grundlagen (Marktanalyse, Anforderungen, Referenzprozesse und Daten, API Design, föderatives Netzwerk, Consent & Security Flow, rechtliche Rahmenbedingungen, Testkonzept)
- Bereitstellung einer Alpha Version mit der Funktionalität Onboarding und Pflege für Bürger der Schweiz und der EU mit dem Domizil in der Schweiz
- Weiterentwicklung und Verifikation dieses Funktionsumfanges in der Community vom OpenBankingProject
- Veröffentlichung dieser Version durch die Community und e.B. eCH getesteten und verifizierten Schnittstelle
- Konzeptionelle Grundlagen für die Verwendung im Netzwerk: z.B. Governance für föderative Sturkturen, regulatorische Abklärungen
- Umsetzung eines MVPs mit dem Fokus "Identifikation Privatkunden" und Weitergabe im Netzwerk
Phase 2 (ab 07/26)
- Konzeption der Weiterentwicklung (z.B. Governance im föderativen System)
- Erweiterung des ersten MVPs "Identifikation Privatkunden" und Weitergabe im Netzwerk mit 5-10 zusätzlichen Unternehmen
- Aufgleisen von weiteren MVPs 



---

## Master Implementierungs-Timeline

### Phase 1: Foundation (Monate 1-6) --> finde ich gut; wichtig ist die Unabhängigkeit der Bereitstellung der API und des MVPs; die Zeit geht bis 06/26 - also eher 12 Monate

**Ziel:** Kerninfrastruktur, Standards und Pilot-Community etablieren

#### Core Infrastructure Development
- [ ] **Technische Architektur Finalisierung** → [Details in Conclusion 02 Anforderungen](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/02%20Anforderungen.md)
- [ ] **FAPI 2.0 Authorization Server Implementation** → [Details in Conclusion 06 Consent und Security](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/06%20Consent%20und%20Security%20Flow.md)
- [ ] **API Gateway Security Policy Konfiguration**
- [ ] **PKI Infrastructure für Mutual TLS**
- [ ] **Consent Management Engine Entwicklung**

#### Standards & Governance
- [ ] **Standards Development Organisation etablieren** → [Details in Conclusion 05 Vertrauensnetzwerk](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/05%20Vertrauensnetzwerk.md)
- [ ] **Core Standards finalisieren**
- [ ] **Master Legal Framework** → [Rechtliche Details in Conclusion 07](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/07%20Rechtliche%20Rahmenbedingungen.md)
- [ ] **Privacy Framework (GDPR/DSG konform)**

#### Pilot Community
- [ ] **Partner Agreement Templates entwickeln**
- [ ] **3-5 Pilot Banks/Producers onboarding**
- [ ] **Sandbox Environment Setup**
- [ ] **MVP API Development mit Identifikationsdaten**

#### Regulatorische Foundation
- [ ] **Qualifizierte Rechtsberatung engagieren:** Spezialisierte Anwaltskanzlei mit FinTech/Banking-Expertise für detaillierte rechtliche Analyse
- [ ] **FINMA-Strategie entwickeln:** Entscheidung über Timing und Approach für FINMA-Engagement
- [ ] **FINMA Consultation und Initial Engagement**
- [ ] **Compliance-by-Design Implementation:** Integration von rechtlichen Anforderungen in die technische Architektur
- [ ] **Regulatory Compliance Validation**
- [ ] **Privacy Impact Assessment abgeschlossen**

#### Testing Infrastructure
- [ ] **Automated Testing Pipeline (CI/CD)** → [Details in Conclusion 08 Testing](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/08%20Testing%20und%20Verifikation.md)
- [ ] **Security Testing Framework**
- [ ] **FAPI 2.0 Conformance Testing**
- [ ] **Performance Benchmarking Baseline**

---

### Phase 2: Integration & Skalierung (Monate 6-18) --> das hier ist die Sicht des MVPs - es geht um die funktionalte Weiterentwicklung mit drei Aspekten: Funktionale Erweiterung mit der Saldierung, Erweiterung der Anschlussfähigkeiten, Erweiterung für Mitarbeiter in einer Firma, dann für Firmen
--> die weitere Nutzung obliegt über MVP's dem Neztwerk, wie das föderative System dazu gebaut wird, ist noch offen

**Ziel:** Partner Ecosystem skalieren und Use Case Abdeckung erweitern

#### Partner Ecosystem Expansion
- [ ] **10-15 aktive Partner onboarding**
- [ ] **Legacy System Integration Patterns validiert**
- [ ] **Cross-border Integration Testing**
- [ ] **Extended Partner Program Launch**

#### Use Case Expansion
- [ ] **Complete Use Case Testing (alle 4 priorisierten)** → [Use Cases detailliert in Conclusion 02](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/02%20Anforderungen.md)
- [ ] **Integration mit E-ID-Infrastruktur**
- [ ] **Mobile App Integration Patterns**
- [ ] **Multi-Provider Scenarios getestet**

#### Community & Standards
- [ ] **Expert Advisory Board Establishment**
- [ ] **Industry Expert Reviews (quarterly)**
- [ ] **Academic Collaboration Partnerschaften**
- [ ] **Public Demo Environment Launch**

#### Produktions-Vorbereitung
- [ ] **Load Testing (Production-Level)**
- [ ] **Customer-facing Consent UX optimiert**
- [ ] **24/7 Security Monitoring Setup**
- [ ] **Comprehensive Analytics und Reporting**

#### Regulatory Scaling
- [ ] **Pilot Legal Testing:** Rechtliche Validierung der API-Implementation mit begrenztem Participant-Set
- [ ] **Regulatory Engagement:** Proaktiver Dialog mit FINMA über Open API Framework
- [ ] **Regulatory Guidance von FINMA**
- [ ] **Industry Coordination:** Koordination mit anderen Schweizer Financial Institutions für gemeinsame rechtliche Positionen
- [ ] **Legal Precedent Building:** Dokumentation und Sharing von Legal Learnings für Industry Benefit
- [ ] **Cross-Border Framework (EU/UK)**
- [ ] **Industry Standards publiziert**
- [ ] **Compliance Certification Prozesse**

---

### Phase 3: Produktion & Evolution (Monate 18-36) --> das würde ich noch nicht formulieren

**Ziel:** Vollständiger Market Rollout und internationale Expansion

#### Market Launch
- [ ] **Production Environment mit sehr hoher Verfügbarkeit**
- [ ] **Customer Self-Service Consent Management**
- [ ] **Full Customer-facing Services Launch**
- [ ] **Marketing und Communication Strategy**

#### Scale & Performance
- [ ] **15+ Teilnehmer in Produktion**
- [ ] **Performance Optimization für High-Volume**
- [ ] **Security Controls Optimization**
- [ ] **Continuous Monitoring und Optimization**

#### Expansion & Evolution
- [ ] **Full Open Finance-Funktionalität (Insurance, Investment)**
- [ ] **Payment Initiation als separate Ausbaustufe**
- [ ] **Cross-industry Integration**
- [ ] **Internationale Market Expansion**

#### Legal Innovation & Advocacy
- [ ] **Regulatory Advocacy:** Engagement in der Entwicklung von Swiss-specific Open API Regulation
- [ ] **International Coordination:** Coordination mit EU/UK Regulatory Developments für Cross-border Compatibility
- [ ] **Legal Innovation:** Entwicklung innovativer rechtlicher Lösungen für emerging API Use Cases

#### Excellence & Recognition
- [ ] **Community Recognition und Industry Awards**
- [ ] **International Standards Contribution**
- [ ] **Academic Research Publications**
- [ ] **Conference Presentations und Validation**

---

## Cross-Reference Matrix

| **Funktionsbereich** | **Primäre Conclusion** | **Unterstützende Conclusions** | **Phasen-Fokus** |
|---|---|---|---|
| **Marktstrategie** | [01 Marktanalyse](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/01%20Marktanalyse.md) | 02 Anforderungen | Alle Phasen |
| **Business Requirements** | [02 Anforderungen](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/02%20Anforderungen.md) | 01 Marktanalyse | Phase 1-2 |
| **Prozess-Architektur** | [03 Referenzprozess](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/03%20Referenzprozess.md) | 04 API Design | Phase 1-2 |
| **Technische Umsetzung** | [04 API Endpoint Design](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/04%20API%20Endpoint%20Design.md) | 03 Referenzprozess, 06 Security | Phase 1-2 |
| **Vertrauensnetzwerk & Governance** | [05 Vertrauensnetzwerk](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/05%20Vertrauensnetzwerk.md) | 07 Rechtliche | Phase 1-3 |
| **Security & Consent** | [06 Consent und Security Flow](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/06%20Consent%20und%20Security%20Flow.md) | 04 API Design, 08 Testing | Phase 1-2 |
| **Rechtlicher Rahmen** | [07 Rechtliche Rahmenbedingungen](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/07%20Rechtliche%20Rahmenbedingungen.md) | 05 Vertrauensnetzwerk | Alle Phasen |
| **Qualitätssicherung** | [08 Testing und Verifikation](./Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/08%20Testing%20und%20Verifikation.md) | 06 Security, 04 API Design | Alle Phasen |

---

## Kritische Erfolgsfaktoren

### Technische Exzellenz --> sehr gut
- **Security-First Ansatz:** FAPI 2.0 Compliance von Tag eins
- **Performance Standards:** Optimierte Antwortzeiten für alle API Endpoints
- **Skalierbarkeit:** Architektur unterstützt Wachstum auf 15+ Teilnehmer
- **Interoperabilität:** Internationale Standards Kompatibilität

### Partnerschaft & Community --> da gilt es eine Unterscheidung in Open API und MVP zu definieren
- **Starke Pilot Community:** Committed 3-5 initiale Partner
- **Progressive Skalierung:** Strukturiertes Wachstum auf 10-15 Partner
- **Expert Validation:** Industry und Academic Endorsement
- **Regulatory Support:** FINMA Guidance und Compliance

### Rechtliche Erfolgsfaktoren
- **Early Legal Engagement:** Rechtsexperten von Projektbeginn an einbinden
- **BUND Relationship:** Proaktive und transparente Kommunikation mit der Stellen des Bundes (SIF, Bundeskanzlei, BFS, eCH)
- **Industry Collaboration:** Gemeinsame rechtliche Positions mit anderen Market Participants
- **Regulatory Monitoring:** Kontinuierliche Überwachung von regulatory Developments
- **Adaptive Compliance:** Flexible Legal Architecture für schnelle Regulatory Adaptations --> was heisst das?

### Marktbereitschaft
- **Use Case Validation:** Bewiesener Wert in 4 priorisierten Use Cases
- **Customer Trust:** Transparenter Consent und Datenschutz
- **Governance und Busienss Model:** Klare Value Proposition für alle Teilnehmer im föderirten Netzwerk
- **Competitive Timing:** Market Entry vor competitive Bedrohungen

---

## Risk Mitigation

### Technische Risiken
- **Mitigation:** Comprehensive Testing Strategy mit automated Pipelines --> verstehe ich nicht
- **Fallback:** Legacy System Integration Patterns für smooth Migration --> ist nicht unsere Sache
- **Monitoring:** 24/7 Security und Performance Monitoring --> ist die Sache vom MVP - nicht unsere

### Regulatory Risks --> Sicherstellung der internationalen Kompatibilität
- **Mitigation:** Proaktives Einbinden relevanter Bundesstellen und Compliance-by-Design
- **Vorbereitung:** Legal Framework Templates und Privacy Impact Assessments
- **Anpassung:** Flexible Architektur für regulatorische Änderungen
- **Legal Expert Engagement:** Qualifizierte Rechtsberatung von Projektbeginn
- **Industry Coordination:** Gemeinsame rechtliche Positionen zur Risikominimierung

### Market Risks
- **Mitigation:** Starke OpenBankingProject Community mit Market Validation
- **Diversifizierung:** Multiple MVPs reduzieren Single-Point-of-Failure
- **Internationale Vorbereitung:** Standards Alignment für Cross-Border Expansion

---

## Key Performance Indicators --> nur Phase 1

### Phase 1 KPIs
- 3-5 Pilot Partner erfolgreich onboarded
- FAPI 2.0 Conformance Tests bestanden
- Regulatory Framework von FINMA approved
- MVP Use Case (Bank Onboarding) validiert

### Phase 2 KPIs  
- 10-15 aktive Produktions-Teilnehmer
- Alle 4 priorisierten Use Cases operational
- Performance Targets erreicht (optimierte Antwortzeiten)
- Community Engagement Metriken (Expert Reviews, Demos)

### Phase 3 KPIs
- 15+ Teilnehmer in voller Produktion
- Internationale Interoperabilität demonstrated
- Cross-Industry Integration erreicht
- Market Leadership Position etabliert

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Master Implementierungs-Guide  
**Last Updated:** Basierend auf Conclusions 01-08 Analyse

---

**Nächste Schritte:** Review individueller Conclusion Roadmaps und Update mit Referenz auf diese Master Roadmap um Redundanzen zu eliminieren während spezialisierte technische Details beibehalten werden.
