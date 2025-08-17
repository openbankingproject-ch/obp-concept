# 02 Anforderungen - Inhaltsverzeichnis

## **Executive Summary**
- 5 Zielbilder der digitalen Kundennähe definiert
- 4 prioritäre Use Cases identifiziert und bewertet
- MVP-Anforderungen für modulare API-Architektur

---

## **1. Zielbild-Framework**

### **1.1 Methodologie**
- **Workshop-basierter Ansatz:** Stakeholder-Input und Konsensbildung
- **Bewertungskriterien:** Machbarkeit, Marktpotenzial, strategischer Wert
- **Zeithorizont-Differenzierung:** Kurz-, mittel- und langfristige Ziele

### **1.2 Zielbild-Definitionen**

#### **Zielbild 1: Direkt (Klassisch)**
- **Architektur:** Kunde ↔ Individualist (direkte Beziehung)
- **Charakteristik:** Traditionelle Bankbeziehung mit API-Enhancement
- **Zeithorizon:** Sofort umsetzbar (MVP-Basis)
- **Use Cases:** Account Opening, Re-Identification

#### **Zielbild 2: Indirekt**
- **Architektur:** Kunde ↔ Integrator ↔ Produzent
- **Charakteristik:** Vermittlungsbasierte Datenübertragung
- **Zeithorizon:** Kurzfristig (6-12 Monate)
- **Use Cases:** Bankwechsel, Mortgage Applications

#### **Zielbild 3: Intermediär**
- **Architektur:** Multi-Player-Konstellation mit Intermediären
- **Charakteristik:** Spezialisierte Dienstleister als Vermittler
- **Zeithorizon:** Mittelfristig (12-24 Monate)
- **Use Cases:** Complex Financial Products, Insurance Integration

#### **Zielbild 4: Plattform**
- **Architektur:** Hub-basierte zentrale Plattform
- **Charakteristik:** Ecosystem-Integration mit Netzwerkeffekten
- **Zeithorizon:** Langfristig (24+ Monate)
- **Use Cases:** Cross-Sector Services, Government Integration

#### **Zielbild 5: Dezentral**
- **Architektur:** Trust Network mit E-ID Integration
- **Charakteristik:** Blockchain/DLT-basierte Vertrauensinfrastruktur
- **Zeithorizon:** Strategisch (E-ID abhängig, 2026+)
- **Use Cases:** Identity as a Service, Cross-Border Services

### **1.3 Zielbild-Priorisierung**
- **MVP-Fokus:** Zielbilder 1 & 2 für schnelle Markteinführung
- **Strategische Entwicklung:** Evolution zu Zielbildern 3 & 4
- **Future-Proofing:** E-ID-Kompatibilität für Zielbild 5

---

## **2. Use Case-Analyse**

### **2.1 Bewertungsmethodologie**
- **Stakeholder-Workshops:** Punkteranking-Verfahren (16 Use Cases)
- **Bewertungskriterien:** Business Value, Technical Feasibility, Market Demand
- **Priorisierungs-Matrix:** Impact vs. Effort Assessment

### **2.2 Top 4 Prioritäre Use Cases**

#### **UC1: Bankwechsel/Kontoeröffnung (13 Punkte)**
- **Business Case:** Vollständige Datenweitergabe für nahtloses Onboarding
- **Scope:** ~65 Datenfelder inkl. KYC, AML, Risk Profiling
- **Complexity:** Hoch (Regulatory Compliance, Data Integrity)
- **MVP-Relevance:** Kern-Use Case für Zielbild 1 & 2

#### **UC2: Re-Identifikation (7 Punkte)**
- **Business Case:** GwG-konforme Identitätsdatenübernahme
- **Scope:** Identity Core Data + Verification Metadata
- **Complexity:** Medium (Legal Framework, Audit Trail)
- **MVP-Relevance:** Quick Win für Compliance-Effizienz

#### **UC3: Altersverifikation (4 Punkte)**
- **Business Case:** Attribut-basierte Verifikation ohne Geburtsdatum
- **Scope:** Boolean Verification (18+, 16+, etc.)
- **Complexity:** Niedrig (Privacy-by-Design, Minimal Data)
- **MVP-Relevance:** Cross-Sector Expansion Potential

#### **UC4: EVV Use Case (4 Punkte)**
- **Business Case:** Customer Lifecycle Management über Banken hinweg
- **Scope:** Portfolio Transfer, Risk Data, Investment Preferences
- **Complexity:** Hoch (Multi-Bank Coordination, Regulatory)
- **MVP-Relevance:** Premium Banking Segment

### **2.3 Zusätzliche Use Cases mit Potenzial**
- **Mietprozess/Mietkautionskonto:** 700.000 Umzüge/Jahr CH
- **Insurance Onboarding:** Cross-Selling Opportunities
- **Government Services:** Digital-by-Default Integration
- **Mobility Services:** Leasing, Financing, Insurance Bundle

---

## **3. Ecosystem-spezifische Anforderungsanalyse**

### **3.1 Financial Services Ecosystem**

#### **Banking-spezifische Anforderungen**
- **Core Banking Integration:** API-Kompatibilität mit bestehenden Systemen
- **Real-time Processing:** Sub-second Response für Account Queries
- **Regulatory Compliance:** FINMA-konforme Datenübertragung
- **Risk Management:** Fraud Detection, AML Screening Integration

#### **Insurance-spezifische Anforderungen**
- **Underwriting Data:** Risk Assessment Information
- **Claims Processing:** Identity Verification für Schadensfälle
- **Product Customization:** Tailored Insurance Products
- **Regulatory Compliance:** FINMA/VAG-konforme Prozesse

#### **Investment-spezifische Anforderungen**
- **Suitability Assessment:** MiFID II/FinSA-konforme Beratung
- **Portfolio Migration:** Asset Transfer zwischen Instituten
- **ESG Preferences:** Sustainable Investment Screening
- **Tax Optimization:** Cross-border Tax Planning

### **3.2 Cross-Sector Integration**

#### **Mobility Ecosystem**
- **Leasing Applications:** Streamlined Vehicle Financing
- **Insurance Integration:** Bundled Mobility Services
- **Usage-based Services:** Pay-per-Mile, Car Sharing

#### **Retail/E-Commerce Ecosystem**
- **Age Verification:** Seamless Checkout für restricted Products
- **Payment Services:** Enhanced Checkout Experience
- **Loyalty Programs:** Cross-Platform Point Systems

#### **Government Services**
- **Digital Identity:** E-ID Integration Vorbereitung
- **Citizen Services:** Streamlined Government Processes
- **Tax Services:** Automated Declaration Support

---

## **4. Datenmodell-Anforderungen**

### **4.1 Kern-Datenbausteine**

#### **Identity Core (Immer erforderlich)**
- **Personal Data:** Name, Vorname, Geburtsdatum, Nationalität
- **Identification Metadata:** Verification Method, Date, VSB-Status
- **Consent Management:** Purpose, Scope, Validity, Revocation

#### **Contact Information (Conditional)**
- **Primary Address:** Hauptwohnsitz mit Gültigkeitsdatum
- **Correspondence Address:** Abweichende Korrespondenzadresse
- **Contact Details:** Phone, Email, Preferred Communication Channel

#### **Extended KYC/AML (Use Case specific)**
- **Risk Classification:** Low, Medium, High Risk Customer
- **PEP Status:** Politically Exposed Person Screening
- **Sanctions Screening:** International Sanctions Lists
- **Source of Funds:** Income Sources, Wealth Declaration

### **4.2 Granularitäts-Level Definition**
- **Basic Dataset:** 15-20 Pflichtfelder für einfache Use Cases
- **Standard Dataset:** 35-45 Felder für komplexes Onboarding  
- **Full Dataset:** ~65 Felder für vollständige Kundenübernahme
- **Custom Datasets:** Use Case-spezifische Feldkombinationen

### **4.3 sharedCustomerHash-Konzept**
- **Universal Identifier:** Eindeutige Kundenreferenz über Systeme hinweg
- **Privacy Protection:** Hash-basierte Pseudonymisierung
- **Cross-System Linking:** Ermöglicht Datenverknüpfung ohne PII
- **Audit Trail:** Vollständige Nachverfolgbarkeit aller Zugriffe

---

## **5. Technische Anforderungen**

### **5.1 Modulare API-Architektur**

#### **Design-Prinzipien**
- **RESTful Design:** Resource-oriented API Structure
- **JSON-First:** Consistent Data Format (7/8 internationale Standards)
- **OpenAPI 3.0:** Self-documenting API Specifications
- **Versionierung:** Semantic Versioning mit Backward Compatibility

#### **Föderative System-Anforderungen**
- **Interoperabilität:** Cross-Platform Compatibility
- **Dezentrale Datenhoheit:** Data Sovereignty bei Produzenten
- **Zentrale Standards:** Einheitliche API Contracts
- **Skalierbarkeit:** Network Effects bis 100+ Teilnehmer

### **5.2 Performance-Anforderungen**
- **Response Time:** P95 < 500ms für kritische Endpoints
- **Availability:** 99.9% Uptime während Geschäftszeiten
- **Throughput:** 1000+ concurrent requests/second
- **Scalability:** Horizontal scaling für Peak Loads

### **5.3 Security-Anforderungen**
- **FAPI 2.0 Compliance:** Financial-grade API Security
- **End-to-End Encryption:** AES-256 für alle Datenübertragungen
- **Zero Trust Architecture:** Explicit verification für alle Requests
- **Audit Logging:** Immutable logs für alle API Interactions

---

## **6. Strategische Herangehensweise**

### **6.1 "Vom Kleinen ins Grosse" Ansatz**

#### **Quick Wins (Phase 1: 0-6 Monate)**
- **UC3 Altersverifikation:** Einfache Implementation, sofortiger Nutzen
- **Basic Identity Verification:** Fundament für komplexere Use Cases
- **Single Bank Pilot:** Proof of Concept mit ausgewähltem Partner

#### **Core Implementation (Phase 2: 6-18 Monate)**
- **UC1 Bankwechsel:** Vollständiges Onboarding-Szenario
- **UC2 Re-Identifikation:** Compliance-Effizienz für Banken
- **Multi-Bank Network:** 3-5 Partner für Netzwerkeffekte

#### **Ecosystem Expansion (Phase 3: 18+ Monate)**
- **UC4 EVV Integration:** Premium Banking Services
- **Cross-Sector Services:** Insurance, Mobility, Government
- **International Expansion:** EU/PSD2 Compatibility

### **6.2 MVP-Definition**
- **Minimum Viable Product:** UC3 + Basic UC1 Implementation
- **Success Metrics:** 2 Banks, 100 successful transactions/month
- **Learning Objectives:** Technical feasibility, regulatory compliance
- **Pivot Readiness:** Flexible Architecture für Requirement Changes

---

## **7. Stakeholder-Integration**

### **7.1 Bank-Stakeholder**
- **Large Banks:** UBS, CS, ZKB - Strategic Partnership
- **Regional Banks:** Cantonal Banks - Local Market Access
- **Private Banks:** Premium Service Integration
- **Digital Banks:** neon, ZAK - Innovation Partnership

### **7.2 FinTech-Integration**
- **Payment Providers:** Integration in Payment Flows
- **InsurTech:** Cross-sector Service Bundling
- **WealthTech:** Investment Service Enhancement
- **RegTech:** Compliance Automation Partners

### **7.3 Regulatory Stakeholder**
- **FINMA:** Compliance Framework Alignment
- **SNB:** Systemic Risk Assessment
- **Data Protection Authority:** Privacy Compliance
- **Consumer Protection:** Transparency und Fairness

---

## **8. Success Metrics und KPIs**

### **8.1 Technical KPIs**
- **API Response Time:** <500ms P95
- **System Availability:** >99.9%
- **Error Rate:** <0.1% for production APIs
- **Security Incidents:** Zero tolerance for data breaches

### **8.2 Business KPIs**  
- **Transaction Volume:** Monthly API calls/successful transfers
- **Customer Adoption:** Number of customers using service
- **Partner Growth:** Number of integrated institutions
- **Process Efficiency:** Time reduction for onboarding processes

### **8.3 Strategic KPIs**
- **Market Penetration:** Share of relevant customer segment
- **Ecosystem Health:** Network effects and participant satisfaction
- **Innovation Rate:** New use cases and service launches
- **Regulatory Alignment:** Compliance score and audit results

---

## **Cross-References**
- **Chapter 01:** Market Analysis → Technical Stack Validation
- **Chapter 03:** Reference Process → Use Case Implementation
- **Chapter 04:** API Specifications → Technical Requirements Detail
- **Chapter 05:** Trust Network → Stakeholder Integration
- **Chapter 07:** Legal Framework → Compliance Requirements