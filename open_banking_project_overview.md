# Open Banking Project CH - GitHub Overview & Roadmap

## Vision & Mission

Das Open Banking Project Schweiz entwickelt eine branchenübergreifende API-Spezifikation für Kundenbeziehungen, die den effizienten und sicheren Austausch von Kundendaten zwischen Finanzdienstleistern ermöglicht. Das Ziel ist die Schaffung eines föderierten Ökosystems durch Standardisierung und Interoperabilität.

### Business Case
- 10 Mrd. CHF Gesamtpotenzial "Open Financial Data Ökosystem Schweiz"
- 37.5 Mio. CHF Einsparpotenzial bei Kundeneröffnungsprozessen
- 2 Mio. CHF Einsparpotenzial bei Identifikations-Weitergabe

---

## Projektarchitektur

tbd

## Projektübersicht: 7 Themenbereiche

### 01 Marktübersicht
Umfassende Analyse von 8 globalen Open Banking/Finance Standards:
- UK Open Banking Standard, Open Finance Brasil, Australian CDR
- Singapore Financial Data Exchange, NextGenPSD2, Open Wealth API
- SFTI Mortgage API, Hong Kong Open API Framework

**Zentrale Erkenntnisse:**
1. JSON + RESTful APIs als De-facto-Standard etabliert
2. Consent- und Sicherheitsmodelle variieren stark zwischen Märkten
3. Hybrid-Governance-Modelle zeigen beste Erfolgsraten
4. Produktabdeckung stark fragmentiert (wenig Lending, Insurance, Investments)
5. Open Finance Evolution uneinheitlich
6. Payment Initiation regional unterschiedlich ausgereift

### 02 Anforderungen
**5 Definierte Zielbilder für digitale Kundennähe:**
1. **Direkt:** Kunde ↔ Individualist
2. **Indirekt:** Kunde ↔ Integrator ↔ Produzent (Projektfokus)
3. **Intermediär:** Multi-Banking-Szenarien
4. **Plattform:** Marktplatz-Modelle
5. **Dezentral:** E-ID-basierte Ansätze (ab 2026)

**Priorisierte Use Cases:**
1. **Bankwechsel/Kontoeröffnung** (13 Punkte) - Vollständige Datenwiederverwendung
2. **Re-Identifikation** (7 Punkte) - GwG-konforme KYC-Aktualisierung  
3. **Altersverifikation** (4 Punkte) - E-Commerce Integration
4. **EVV Use Case** (4 Punkte) - Customer Lifecycle Management

### 03 Referenzprozess
**10-Stufen Branchenübergreifender Prozess:**
1. Initialisierung → 2. Produktauswahl → 3. Selbstdeklaration → 4. Basisdaten → 5. Erweiterte Daten → 6. Identifikation → 7. Background Checks → 8. Vertragsabschluss → 9. Signatur → 10. Verteilung

**Modulare "Blöckli"-Architektur:**
- Wiederverwendbare Datenbausteine für verschiedene Ecosystems
- PSD2 und Open Finance Brasil Integration
- E-ID-Kompatibilität für Zukunftssicherheit

### 04 Vertrauensnetzwerk
**Föderiertes System mit Hybrid-Governance:**
- Dezentrale Datenhoheit + Zentrale Standards
- MVP-Ansatz: Start mit bilateralen Agreements
- Skalierung: Übergang zu hybridem Ansatz

### 05 Consent & Security Flow 
**Generisches Security-Framework:**
- Unabhängig vom Vertrauensnetzwerk-Modell
- JWT-Token-Architektur für Consent-Management
- FAPI, OAuth2, OIDC Standards-Evaluation
- Integration von Finanzsektor-Security-Experten

### 06 Regulatory & Compliance: Rechtliche Rahmenbedingungen
tbd

### 07 Testing & Verifikation (Fertigstellung: 08.08.2025)
tbd

---

## Roadmap & Meilensteine

### Phase I - Abgeschlossen (März - Juni 2025)
- Konzeptioneller Lösungsansatz fixiert
- Referenzprozesse definiert (Customer Journey, UML-Modell)
- Basiskit spezifiziert (Datenset, Funktionalitäten)
- MVP Use Cases definiert
- Rechtliche Rahmenbedingungen evaluiert
- API Version 2.0 spezifiziert

### Aktuelle Deliverables (Juli-August 2025)
- **11.07.2025:** GitHub Repository-Struktur & Dokumentationskonzept
- **15.08.2025:** Theoretische Aufbereitung der Konlusionen unserer bisherigen Research
- **18.08.2025:** Vollständige API-Spezifikation & Testing-Framework
- **20.08.2025:** 3 Live-Demos + Open Banking Summit Präsentation
- **21.08.2025:** Open Banking Summit - Public Launch

### Phase II - Umsetzung (ab September 2025)
tbd - noch nicht finalisiert

---

## Projektpartner & Community

bitte kontrollieren!

### Core Partners
- **PostFinance** (Lead Implementation Partner)
- **Hypothekarbank Lenzburg** (Banking Standards)
- **Intrum** (Credit & Collections Use Cases)

### Technology Partners
- **Ergon Informatik** (Technical Implementation)
- **Finnova** (Banking Software Integration)
- **Finstar** (FinTech Innovation Hub)
- **Netcetera** (Security & Mobile Solutions)

### Koordination
**Business Engineering Institute St. Gallen (BEI)**
- Thomas Bühlmann (Projektleitung)
- Friedrich-Philipp Wazinski (Technical Lead)
- Stefan Knaus
- Jil Zerndt

---

## Documentation & Resources

### API Documentation
- **OpenAPI Alpha 1.0 Specification:** [api/docs/api-spec](./docs/api-spec)
- **Implementation Guide:** [api/docs/implementation](./docs/implementation)
- **Security Guidelines:** [api/docs/security](./docs/security)

### Live Demos (Available from 18.08.2025)
1. **Referenzprozess-Demo:** Interactive 10-Step Process Visualization
2. **Verifikationsprozess:** Live Verification Scenarios
3. **MVP**

### Research & Analysis
Konklusionen aus fachlicher und technischer Sicht:

- **Markt Analyse**
- **Anforderungen**
- **Referenzprozess**
- **Vertrauensnetzwerke** Föderiertes System
- **Consent und Security Flow**
- **Rechtliche Rahmenbedingungen**
- **Verifikation und Testing**

---

## Contact & Support

### General Inquiries
- **Email:** info@openbankingproject.ch
- **Website:** https://openbankingproject.ch

### Technical Support
- **GitHub Issues:** [Create New Issue](https://github.com/openbankingproject-ch/api-specs/issues)
- **Technical Lead:** friedrich.wazinski@bei-sg.ch

### Partnership & Business Development
- **Project Lead:** thomas.buehlmann@bei-sg.ch
- **Business Engineering Institute:** https://bei-sg.ch

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Special thanks to all workshop participants, international Open Banking communities, and the Swiss financial services ecosystem for their valuable contributions to this standardization effort.

The project builds upon extensive research of global Open Banking standards including UK Open Banking, Open Finance Brasil, Australian Consumer Data Rights, and other leading international initiatives. Workshop results from Phase I (March-June 2025) formed the foundation for the current API specification and implementation roadmap.
