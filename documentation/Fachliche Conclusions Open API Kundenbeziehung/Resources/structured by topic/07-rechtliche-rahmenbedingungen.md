#### Praktische Umsetzung durch Projektpartner

**HBL Position:**
- Keine Haftung vom Produzenten für Aktualität/Richtigkeit der Daten
- Integrator B bleibt verantwortlich für GwG-/DSG-Konformität

**PostFinance Position:**
- Haftung für die Daten bis zum Consent des Kunden – sobald die Daten beim Empfänger sind, liegt die Verantwortung bei ihm

**Intrum Position:**
- **Ausservertragliche Haftung (Art. 41 OR):** Jede Partei kann haften – abhängig von Verschulden und Kausalität
- **Empfehlung:** Zivilrechtliche Haftung besser vertraglich regeln (z.B. über Teilnahmevereinbarung, SLA)

#### Weitere Haftungsaspekte

**Das bestehende Vertragswerk zwischen YUH, Swissquote und PostFinance ist als Basis für die Klärung der Haftungsfrage zu eruieren.**

Parallel dazu sind ergänzende Sicherheitsmaßnahmen zu prüfen – beispielsweise Mechanismen zur Identifikation und Verhinderung von Fake-Accounts.

### Outsourcing und Delegation

#### Kernfragestellung: FINMA-Outsourcing-Relevanz

**Konkrete Fragestellung:**
"Wie müssen wiederverwendete Identifikationen oder Zusammenhang mit der Beurteilung von Outsourcing behandelt werden? (FINMA)"

#### Experteneinschätzung

**BEI Position:**
Mit Bankidentitcase von PostFinance zu Kunden im Namen und auf Rechnung klären.

**HBL Position:**
- **Fall 1:** Bank B verlässt sich auf die von Bank A durchgeführte Identifikation. Bank B nutzt die Daten, übernimmt aber selbst die Verantwortung. → Kein Outsourcing (sondern reiner Datenempfang).
- **Bank B nutzt die Daten „im Reliance-Modell". Bank A wird nicht im Auftrag von Bank B tätig. Vertraglich zwischen den beiden Banken regeln, aber ohne Delegation der Funktion.**
- **Fall 2:** Bank B beauftragt Bank A explizit mit der Identifikation von Kunden im Namen der Bank B. → Outsourcing. Bank A wird als Dienstleister tätig. Bank B delegiert eine bankrechlich wesentliche Funktion.
- **Fall 3:** Bank B nutzt einen KYC-Dienstleister (z.B. IDnow, Intrum, Swisscom), der Kunden im Namen der Bank identifiziert. → Outsourcing. (gilt auch bei Drittanbietern) Wenn sich die Bank für ein Outsourcing entscheidet:
  - Vertrag über die Auslagerung abschliessen (inkl. Weisungsrecht, Kontrollrechte etc.)
  - Risikobeurteilung und Outsourcing-Governance etabl.
  - Meldung an die FINMA (wenn die Funktion wesentlich ist)

**Intrum Position:**
Falls Outsourcing relevant, kann dies generisch umgesetzt werden? Oder ist kein Outsourcing möglich? Somit nur Fall 1 möglich.

#### Lösungsansatz

**Empfehlung:**
Erforderlich fallspezifische Betrachtungsweise

**TBD (To Be Determined):**
Heikel ist hier das in Art. 28 GwV-FINMA angelegte Verbot einer Weiterdelegation. Dies betrifft nur aber immerhin den engen Anwendungsbereich der GwG-Prävention bei Finanzintermediären. Ein Lösungsansatz könnte sein, über die oben beschriebene Datengovernanz die Gesamtheit der am Datenraum "Identifikation" teilnehmenden Finanzinstitute als "Finanzintermediär" i.S. Art. 28 GwV-FINMA zu interpretieren. Dann könnten die Identifikationen innerhalb der Gruppe der Teilnehmenden ausgetauscht werden. Wenn die vertraglichen Teilnahmebedingungen stringent genug formuliert sind, könnte dies ausreichen, um die FINMA zu überzeugen. Weiter zu prüfen ist die Vereinbarkeit mit Art. 19 VSB 20, welcher sich dem Wortlaut nach auf Einheiten eines Konzerns bezieht. Nach Sinn und Zweck müsste diese Bestimmung auch im besprochenen Fall greifen. Vielleicht gibt es Möglichkeiten im Rahmen der Revision der VSB dieses Thema aufzugreifen.

### Datenschutz und Bankgeheimnis

#### Kernfragestellung: Einwilligung und Disclosure

**Konkrete Fragestellung:**
"Welche Mindestanforderungen gelten für die Datenprüfung sowie für die herausgegebenen Datensätze?"

#### Experteneinschätzung

**HBL Position:**
Annahme: Die herausgegebenen Datensätze werden «as is» übergeben. Allfällige weitere Prüfungen erfolgen durch den Integrator.

Warum werden keine Effizienzgewinne erzielt? Die Identifikation wurde ja durchgeführt. Ergänzungen auf Grund Risikoapproach sind Zusatzaufwände des Integrators. Prüfen mit Yuh Case.

**PostFinance Position:**
Herausgabe: Einverständnis des Kunden bezüglich Datenschutz und Bankkundengeheimnis nötig.

Datenprüfung: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

**Intrum Position:**
Zur Beantwortung dieser Frage benötige ich mehr Angaben zu den Datensätzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Geschäftsgeheimnisse zu beachten und gebührend zu berücksichtigen.

Für die Struktur der Datensätze könnten die folgenden allgemeinen Grundsätze definiert werden:

"Datenprodukte bündeln Ressourcen (z.B. Datensätze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsfälle zu realisieren. Datenprodukte werden von Datenanbietenden oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement ermöglicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte" (Bundeskanzlei, Bausteine von Datenräumen – Datenökosystem Schweiz, Ziffer 3.2.3)

Sie stellen sicher, dass die mehrfache Datennutzung vertrauenswürdig und sicher ist, und verhindern den Missbrauch von Daten. Vertragliche Vereinbarungen können auf verschiedenen Ebenen getroffen werden und unterscheiden sich darin, welche Akteure sie betreffen. Vereinbarungen auf Ebene Datenraum sind für alle Datenraumteilnehmenden gleichermassen durch ihre Teilnahme verbindlich.

### Validierung und Identifikation

#### Kernfragestellung: Datenvalidierung

**Konkrete Fragestellung:**
"Validierung, Identifikation und rechtliche Rahmenbedingungen: Es muss geprüft werden, wie bzw. ob eine Überprüfung und finale Validierung der übergebenen Daten erfolgen soll."

#### Experteneinschätzung

**Problematik:**
Sobald manuelle Prüfschritte notwendig werden, verliert das gesamte API-Vorhaben deutlich an Attraktivität und Effizienz.

Dabei geht es nicht nur um die reine Identifikation, sondern auch um die Gesamtdatenlage.

Das Beispiel YUH zeigt jedoch, dass die Identifikation ohne weitere Prüfung übernommen wird. Risikobasiert wird bei YUH allenfalls zusätzlich eine Überprüfung vorgenommen, ist jedoch selten der Fall.

#### Lösungsansatz

**Empfehlung:**
Die FINMA wird voraussichtlich keine detaillierte Vorgabe zur Haftungsverteilung machen.

Eine unabhängige rechtliche Einschätzung wäre daher hilfreich, um diese Frage zu klären.

**Vorschlag:** Die Fragestellung an Vigi zur weiteren Prüfung weiterleiten.

### FINMA-Positionierung

#### Kernfragestellung: Regulatorisches Engagement

**Konkrete Fragestellung:**
"Ist eine Einbindung der FINMA wünschenswert und erforderlich, und wenn ja, ab wann sollte sie erfolgen?"

#### Strategische Überlegungen

**Zweigleisiger Lösungsansatz:**
Es wurde eine zweigleisige Vorgehensweise diskutiert:
1. **Orientierung an YUH:** Deren Lösungsansatz im Umgang mit der FINMA als Referenz
2. **Direkter FINMA-Austausch:** Prüfung, ob ein direkter Austausch mit der FINMA sinnvoll und möglich ist

**Offene Fragen zu Mindestanforderungen:**
- Welche Mindestanforderungen gelten im aktuellen Setup – und wie sehen diese bei anderen Banken aus?
- Welcher Zeitpunkt gilt formal für eine Neueröffnung im Kontext der Datenübernahme?

**Haftung und Datenweitergabe:**
Wie positioniert sich die FINMA zur Haftungsfrage bei der Datenweitergabe? Eine Abklärung ist wichtig, damit Banken sich rechtlich abgesichert fühlen können.

Es wäre zudem interessant, wie die FINMA in vergleichbaren Fällen bereits reagiert hat, um ein besseres Gefühl für ihre Haltung zu erhalten.

Ein **FINMA-Rundschreiben zu diesem Thema wäre sehr hilfreich** – ohne eine solche Aussage bleibt die Haftungsfrage aus regulatorischer Sicht mit einem Fragezeichen versehen.

## Offene Fragestellungen

*Die folgenden Fragestellungen sind noch ungeklärt und müssen zu einem späteren Zeitpunkt bearbeitet werden.*

### 1. Outsourcing-Abgrenzung

**Fragestellung:**
"Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden? (FINMA)"

**Status:** Zur Klärung mit FINMA

**Konkrete Unterfragen:**
- Falls Outsourcing relevant, kann dies generisch umgesetzt werden?
- Oder ist kein Outsourcing möglich? Somit nur Fall 1 möglich?
- Wie ist die FINMA-Position zu "Reliance-Modellen" vs. echter Delegation?

**Lösungsansatz:**
Erforderlich fallspezifische Betrachtungsweise

**TBD - Artikel 28 GwV-FINMA Problematik:**
Heikel ist hier das in Art. 28 GwV-FINMA angelegte Verbot einer Weiterdelegation. Dies betrifft nur aber immerhin den engen Anwendungsbereich der GwG-Prävention bei Finanzintermediären.

Ein Lösungsansatz könnte sein, über die oben beschriebene Datengovernanz die Gesamtheit der am Datenraum "Identifikation" teilnehmenden Finanzinstitute als "Finanzintermediär" i.S. Art. 28 GwV-FINMA zu interpretieren. Dann könnten die Identifikationen innerhalb der Gruppe der Teilnehmenden ausgetauscht werden. Wenn die vertraglichen Teilnahmebedingungen stringent genug formuliert sind, könnte dies ausreichen, um die FINMA zu überzeugen.

Weiter zu prüfen ist die Vereinbarkeit mit Art. 19 VSB 20, welcher sich dem Wortlaut nach auf Einheiten eines Konzerns bezieht. Nach Sinn und Zweck müsste diese Bestimmung auch im besprochenen Fall greifen. Vielleicht gibt es Möglichkeiten im Rahmen der Revision der VSB dieses Thema aufzugreifen.

### 2. Datenqualität und Validierung

**Fragestellung:**
"Welche Mindestanforderungen gelten für die Datenprüfung sowie für die herausgegebenen Datensätze?"

**Status:** Rechtlich nicht konkret definiert

**Konkrete Unterfragen:**
- Sind manuelle Datenvalidierungen erforderlich oder ausreichend automatisierte Checks?
- Wer trägt das Risiko bei fehlerhaften oder veralteten Daten?
- Wie können Effizienzgewinne bei gleichzeitiger Qualitätssicherung erreicht werden?

**FINMA-Stellungnahme erwünscht:**
Eine Stellungnahme seitens FINMA wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

### 3. Cross-Border Data Flows

**Fragestellung:**
"Wie sind grenzüberschreitende Datenübertragungen im Rahmen der Open API zu behandeln?"

**Status:** Noch nicht umfassend analysiert

**Konkrete Unterfragen:**
- Gelten besondere Anforderungen bei EU-Kunden von Schweizer Banken?
- Wie ist die Rechtslage bei Schweizer Kunden von EU-Banken?
- Welche Safeguards sind bei Drittstaaten-Übertragungen erforderlich?

### 4. Consent-Anforderungen

**Fragestellung:**
"Welche spezifischen Consent-Anforderungen gelten für verschiedene Datenarten und Use Cases?"

**Status:** Grundsätze klar, Details offen

**Konkrete Unterfragen:**
- Genügt eine einmalige Einwilligung für alle Use Cases oder sind separate Consents erforderlich?
- Wie lange sind Consents gültig?
- Welche Informationspflichten bestehen gegenüber Kunden?

### 5. Liability und Insurance

**Fragestellung:**
"Sollten Haftungsrisiken durch Versicherungslösungen abgedeckt werden?"

**Status:** Noch nicht diskutiert

**Konkrete Unterfragen:**
- Existieren spezialisierte Cyber-/Data-Liability Versicherungen für Open Banking?
- Können Haftungsrisiken auf Versicherungen übertragen werden?
- Welche Mindestversicherungssummen sind angemessen?

### 6. Dispute Resolution

**Fragestellung:**
"Wie sollen Streitigkeiten zwischen Teilnehmern des föderierten Systems gelöst werden?"

**Status:** Noch nicht definiert

**Konkrete Unterfragen:**
- Ist ein spezifisches Schiedsverfahren für API-bezogene Streitigkeiten erforderlich?
- Welche Rolle spielt die Governance-Organisation bei Disputes?
- Sind alternative Streitbeilegungsverfahren vorgesehen?

## Vorschlag Compliance-Framework für API-Design

**DISCLAIMER: Wir sind KEINE Fachpersonen im rechtlichen Bereich. Die folgenden Empfehlungen stellen keine Rechtsberatung dar und ersetzen nicht die Konsultation qualifizierter Rechtsexperten.**

### Compliance-by-Design Prinzipien

#### 1. Legal Framework Integration

```yaml
legal_integration_framework:
  regulatory_mapping:
    requirement: "Systematische Zuordnung aller API-Funktionen zu relevanten Gesetzen"
    implementation:
      - "Compliance-Matrix für jeden API-Endpoint"
      - "Automatische Rechtkonformitätsprüfung"
      - "Regulatorische Change-Impact-Analyse"
    
  legal_review_process:
    requirement: "Systematische rechtliche Prüfung aller API-Änderungen"
    implementation:
      - "Legal Review als Teil des Development Lifecycle"
      - "Rechtliche Freigabe vor Production Deployment"
      - "Continuous Legal Monitoring"
      
  documentation_standards:
    requirement: "Vollständige rechtliche Dokumentation aller Prozesse"
    implementation:
      - "API Legal Documentation"
      - "Compliance Audit Trails"
      - "Regulatory Reporting Automation"
```

#### 2. Data Protection by Design

```yaml
data_protection_framework:
  privacy_impact_assessment:
    trigger: "Jede neue API-Funktionalität mit Personendaten"
    process:
      - "Automated DPIA Questionnaire"
      - "Risk Assessment Matrix"
      - "Mitigation Measures Definition"
      - "Approval Workflow"
    
  data_minimization:
    principle: "Nur notwendige Daten für den spezifischen Zweck"
    implementation:
      - "Purpose-based Data Filtering"
      - "Dynamic Consent Scope Calculation"
      - "Automatic Data Expiry"
      
  consent_management:
    requirement: "Granulare und nachverfolgbare Einwilligungen"
    implementation:
      - "Consent Versioning System"
      - "Real-time Consent Validation"
      - "Withdrawal Propagation"
```

#### 3. Financial Regulation Compliance

```yaml
financial_regulation_framework:
  gwg_compliance:
    customer_identification:
      requirement: "GwG Art. 3 konforme Identifikation"
      validation: "Automated identity verification checks"
      documentation: "Comprehensive audit trail"
      
    beneficial_ownership:
      requirement: "GwG Art. 4 konforme Feststellung wirtschaftlich Berechtigter"
      process: "Enhanced due diligence workflows"
      monitoring: "Ongoing ownership change detection"
      
  finma_outsourcing:
    classification:
      process: "Automatic outsourcing classification"
      criteria: ["Function criticality", "Data sensitivity", "Control transfer"]
      approval: "Automated escalation for outsourcing arrangements"
      
    risk_management:
      requirement: "Continuous third-party risk monitoring"
      metrics: ["Performance KPIs", "Security metrics", "Compliance status"]
      reporting: "Automated regulatory reporting"
```

### Technical Implementation

#### 1. Compliance Automation Engine

```javascript
class ComplianceEngine {
  constructor(config) {
    this.regulations = config.regulations;
    this.rules = config.complianceRules;
    this.auditLogger = new AuditLogger();
  }
  
  async validateAPICall(request, context) {
    const complianceChecks = [
      this.validateConsent(request, context),
      this.validateDataMinimization(request, context),
      this.validatePurposeLimitation(request, context),
      this.validateRetentionPolicy(request, context),
      this.validateCrossBorderTransfer(request, context)
    ];
    
    const results = await Promise.all(complianceChecks);
    const violations = results.filter(r => !r.compliant);
    
    if (violations.length > 0) {
      await this.auditLogger.logViolation(violations, request, context);
      throw new ComplianceViolationError(violations);
    }
    
    await this.auditLogger.logCompliantAccess(request, context);
    return { compliant: true, checks: results };
  }
  
  async validateConsent(request, context) {
    const consentToken = request.headers.consent;
    const consent = await this.decodeConsent(consentToken);
    
    return {
      rule: 'consent_validation',
      compliant: consent.isValid && 
                 consent.coversDataCategories(request.dataCategories) &&
                 consent.coversPurpose(request.purpose),
      details: { consentId: consent.id, scope: consent.scope }
    };
  }
}
```

#### 2. Regulatory Change Management

```yaml
regulatory_change_management:
  monitoring:
    sources:
      - "FINMA Rundschreiben RSS Feed"
      - "EDÖB Newsletter Subscription"
      - "EU Regulatory Watch Services"
      - "Legal Database Updates"
      
  impact_assessment:
    process:
      - "Automated relevance filtering"
      - "AI-powered impact analysis"
      - "Expert review assignment"
      - "Implementation timeline planning"
      
  implementation_tracking:
    metrics:
      - "Regulatory compliance score"
      - "Implementation deadline adherence"
      - "Audit finding trends"
      - "Regulatory inquiry response time"
```

### Risk Management Framework

#### 1. Legal Risk Assessment

```yaml
legal_risk_matrix:
  probability_factors:
    regulatory_change: "High - Financial services actively regulated"
    enforcement_action: "Medium - FINMA active but proportionate"
    litigation_risk: "Low - Swiss legal system predictable"
    reputational_damage: "High - Banking sector reputation sensitive"
    
  impact_factors:
    financial_penalties: "Medium - FINMA fines typically proportionate"
    business_disruption: "High - Operational restrictions severe"
    competitive_disadvantage: "High - Regulatory approval delays costly"
    customer_loss: "Medium - Swiss customers value compliance"
    
  mitigation_strategies:
    proactive_engagement: "Regular FINMA consultation and updates"
    legal_expertise: "Dedicated legal team and external counsel"
    compliance_automation:
    technology_solutions: "Automated compliance monitoring and reporting"
    expert_support: "Dedicated legal and compliance expertise"
    continuous_monitoring: "Ongoing regulatory change management"
```

#### 3. International Coordination

```yaml
international_strategy:
  eu_alignment:
    psd2_compatibility: "Technical compatibility with EU Open Banking"
    gdpr_compliance: "Full data protection compliance for EU customers"
    market_access: "Seamless integration with EU financial services"
    
  global_standards:
    fapi_adoption: "Leadership in FAPI 2.0 implementation"
    openid_foundation: "Active contribution to international standards"
    regulatory_cooperation: "Bilateral regulatory cooperation agreements"
```

### Implementation Roadmap

#### Phase 1: Legal Foundation (0-6 Monate)

**Deliverables:**
- **Master Legal Framework:** Comprehensive participation agreement template
- **Compliance Automation:** Basic legal compliance checking and monitoring
- **FINMA Consultation:** Initial regulatory engagement and feedback
- **Privacy Framework:** GDPR/DSG compliant data processing framework

**Success Criteria:**
- ✅ Legal framework approved by all pilot participants
- ✅ FINMA no-objection letter or guidance statement
- ✅ Privacy impact assessment completed and approved
- ✅ Initial compliance automation deployed

#### Phase 2: Regulatory Scaling (6-18 Monate)

**Deliverables:**
- **Regulatory Guidance:** FINMA circular or guidance on Open Banking
- **Cross-Border Framework:** EU/UK interoperability legal framework
- **Industry Standards:** Swiss Open Banking legal standards published
- **Compliance Certification:** Third-party compliance audits and certifications

**Success Criteria:**
- ✅ Regulatory clarity on outsourcing and liability issues
- ✅ Cross-border data transfer framework operational
- ✅ Industry-wide adoption of legal standards
- ✅ Zero regulatory violations or sanctions

#### Phase 3: International Integration (18-36 Monate)

**Deliverables:**
- **International Recognition:** Swiss standards recognized internationally
- **Regulatory Export:** Swiss expertise exported to other jurisdictions
- **Legal Innovation:** Novel legal approaches for digital finance
- **Global Leadership:** Switzerland as Open Banking legal innovation hub

**Success Criteria:**
- ✅ International recognition of Swiss Open Banking standards
- ✅ Successful export of Swiss legal framework to other countries
- ✅ Publication of legal innovation case studies
- ✅ Establishment of Switzerland as global Open Banking legal center

### Kritische Erfolgsfaktoren

#### 1. Stakeholder Alignment

**Regulatory Stakeholders:**
- **FINMA:** Proaktive Einbindung und Konsultation
- **EDÖB:** Datenschutz-Compliance und Best Practices
- **SIF:** Internationale Koordination und Repräsentation
- **Bundesrat:** Policy-Level Unterstützung für Innovation

**Industry Stakeholders:**
- **SBVg (Schweizerische Bankiervereinigung):** Industry Standards und Best Practices
- **Swiss Fintech Innovations:** Innovation-Förderung und Startup-Integration
- **Versicherungsverband:** Cross-Industry Expansion
- **Consumer Organizations:** Kundenschutz und Transparenz

#### 2. Legal Excellence

**Technical Legal Expertise:**
- **Financial Services Law:** Spezialisierte Banking- und Fintech-Expertise
- **Data Protection Law:** GDPR/DSG und internationale Datenschutz-Expertise
- **Technology Law:** API-, Cloud- und Cybersecurity-Rechtsexpertise
- **International Law:** Cross-Border Regulatory und Compliance-Expertise

**Process Excellence:**
- **Agile Legal:** Schnelle rechtliche Entscheidungsfindung
- **Compliance Automation:** Technology-driven Legal Compliance
- **Risk Management:** Proaktives rechtliches Risikomanagement
- **Continuous Learning:** Ongoing Legal Education und Best Practice Sharing

#### 3. Innovation und Stabilität

**Legal Innovation:**
- **Regulatory Sandboxes:** Experimentelle rechtliche Rahmen
- **Smart Contracts:** Blockchain-basierte Compliance-Automation
- **AI-Powered Compliance:** Künstliche Intelligenz für Rechts-Compliance
- **Digital Identity:** Rechtliche Integration digitaler Identitätssysteme

**Stability und Predictability:**
- **Clear Rules:** Eindeutige und vorhersagbare Rechtsregeln
- **Consistent Application:** Gleichmäßige Rechtsanwendung
- **Gradual Evolution:** Schrittweise Evolution statt revolutionäre Änderungen
- **Stakeholder Consultation:** Umfassende Stakeholder-Konsultation bei Änderungen

### Fazit: Rechtliche Realisierbarkeit der Open API Kundenbeziehung

#### Positive Gesamtbewertung

Die rechtliche Analyse zeigt, dass die **Open API Kundenbeziehung grundsätzlich rechtlich realisierbar** ist unter Schweizer Recht:

**1. Solide rechtliche Grundlagen:**
- Bestehende Gesetze (BankG, DSG, GwG) bieten ausreichenden Rahmen
- Bewährte Rechtsprinzipien sind auf digitale Innovation anwendbar
- Schweizer Rechtstradition ist innovationsfreundlich bei gleichzeitiger Risikokontrolle

**2. Manageable rechtliche Risiken:**
- Identifizierte Risiken sind durch proaktive Maßnahmen beherrschbar
- Haftungsverteilung kann vertraglich geregelt werden
- Compliance-Automation reduziert operationelle Rechtsrisiken

**3. Positive Regulatory Environment:**
- FINMA zeigt grundsätzliche Offenheit für Fintech-Innovation
- Schweizer Regulatoren bevorzugen kooperative Ansätze
- Internationale Kompatibilität erleichtert grenzüberschreitende Expansion

#### Kritische Voraussetzungen

**1. Proaktive FINMA-Konsultation:**
Die erfolgreiche Umsetzung erfordert **frühzeitige und kontinuierliche FINMA-Konsultation** zur Klärung von Auslegungsfragen, insbesondere:
- Abgrenzung zwischen Datennutzung und Outsourcing
- Haftungsverteilung bei fehlerhaften Daten
- Compliance-Anforderungen für API-Providers

**2. Comprehensive Legal Framework:**
Ein **umfassendes rechtliches Rahmenwerk** muss entwickelt werden, das:
- Klare Rollen und Verantwortlichkeiten definiert
- Faire Haftungsverteilung etabliert
- Effiziente Streitbeilegungsmechanismen vorsieht
- Compliance-Automation ermöglicht

**3. Industry Coordination:**
**Branchenweite Koordination** ist essentiell für:
- Einheitliche rechtliche Standards
- Gemeinsame Regulatory Advocacy
- Kollektive Compliance-Lösungen
- Internationale Repräsentation

#### Strategischer Ausblick

Die Open API Kundenbeziehung kann **als Katalysator für die Modernisierung des Schweizer Finanzrechts** wirken und:

- **Regulatory Innovation:** Schweiz als Vorreiter für digitale Finanzregulierung positionieren
- **Legal Tech Leadership:** Swiss Legal Tech als Exportschlager entwickeln
- **International Standards:** Schweizer Standards international etablieren
- **Economic Growth:** Rechtssicherheit als Standortvorteil für Fintech-Innovation nutzen

**Empfehlung:**
Die rechtlichen Voraussetzungen für die Open API Kundenbeziehung sind **grundsätzlich erfüllt**. Eine erfolgreiche Umsetzung erfordert jedoch **proaktive rechtliche Gestaltung, intensive Stakeholder-Koordination und kontinuierliche Regulatory Engagement**.

Mit der richtigen rechtlichen Strategie kann die Open API Kundenbeziehung nicht nur erfolgreich implementiert werden, sondern auch als **Modell für digitale Finanzinnovation in Europa** dienen. "Technology-driven compliance monitoring"
    industry_collaboration: "Active participation in industry working groups"
```

#### 2. Operational Risk Controls

```yaml
operational_risk_controls:
  data_breach_prevention:
    technical_controls:
      - "End-to-end encryption"
      - "Zero-trust architecture"
      - "Regular penetration testing"
      - "Continuous vulnerability scanning"
      
    organizational_controls:
      - "Security awareness training"
      - "Incident response procedures"
      - "Regular security audits"
      - "Third-party security assessments"
      
  compliance_monitoring:
    automated_controls:
      - "Real-time compliance dashboards"
      - "Automated regulatory reporting"
      - "Consent validation workflows"
      - "Data retention automation"
      
    manual_controls:
      - "Quarterly compliance reviews"
      - "Annual legal assessments"
      - "Expert consultation processes"
      - "Regulatory liaison meetings"
```

## Risikomanagement und Haftung

**DISCLAIMER: Wir sind KEINE Fachpersonen im rechtlichen Bereich. Die folgenden Empfehlungen stellen keine Rechtsberatung dar und ersetzen nicht die Konsultation qualifizierter Rechtsexperten.**

### Haftungsmodell für das föderierte System

#### 1. Haftungsverteilung nach Rollen

```yaml
liability_allocation:
  data_producer:
    primary_liabilities:
      - "Data accuracy at time of transfer"
      - "Consent validity verification"
      - "Data security during processing"
      - "Compliance with source jurisdiction laws"
      
    liability_limitations:
      - "No liability for data use beyond agreed purpose"
      - "Limited liability for downstream data processing"
      - "Exclusion of consequential damages"
      - "Time limitation for liability claims"
      
  data_consumer:
    primary_liabilities:
      - "Appropriate data use within consent scope"
      - "Data security after receipt"
      - "Compliance with destination jurisdiction laws"
      - "Customer relationship management"
      
    liability_limitations:
      - "Reliance on producer data accuracy representations"
      - "Limited liability for pre-existing data errors"
      - "Force majeure exclusions"
      
  infrastructure_provider:
    primary_liabilities:
      - "Platform availability and performance"
      - "Data transmission security"
      - "Infrastructure compliance"
      - "Incident response and notification"
      
    liability_limitations:
      - "No liability for participant content"
      - "Limited liability for third-party service failures"
      - "Exclusion of business interruption damages"
```

#### 2. Insurance und Risk Transfer

```yaml
insurance_framework:
  mandatory_coverage:
    cyber_liability:
      minimum_coverage: "CHF 10 million per incident"
      scope: ["Data breach response", "Regulatory fines", "Business interruption"]
      
    professional_indemnity:
      minimum_coverage: "CHF 5 million per incident"
      scope: ["Errors and omissions", "Negligent acts", "Breach of duty"]
      
    general_liability:
      minimum_coverage: "CHF 2 million per incident"
      scope: ["Third-party claims", "Property damage", "Personal injury"]
      
  optional_coverage:
    directors_officers:
      recommended_coverage: "CHF 20 million"
      scope: ["Management liability", "Entity coverage", "Investigation costs"]
      
    technology_liability:
      recommended_coverage: "CHF 15 million"
      scope: ["Software failures", "System downtime", "Data corruption"]
```

#### 3. Contractual Risk Allocation

```yaml
contractual_framework:
  participation_agreement:
    liability_caps:
      general_liability: "Annual fees paid x 5"
      data_breach_liability: "CHF 1 million per incident"
      willful_misconduct: "Unlimited liability"
      
    indemnification:
      mutual_indemnification: "Third-party claims arising from participant's breach"
      carve_outs: ["IP infringement", "Data breach", "Regulatory violations"]
      
  service_level_agreements:
    performance_standards:
      availability: "99.5% uptime"
      response_time: "< 2 seconds average"
      incident_response: "< 4 hours to resolution"
      
    remedies:
      service_credits: "1% monthly fee per 0.1% availability shortfall"
      termination_rights: "Material breach with 30-day cure period"
      data_portability: "90-day transition assistance"
```

### Regulatory Risk Management

#### 1. FINMA Engagement Strategy

```yaml
finma_engagement:
  proactive_communication:
    regular_updates:
      frequency: "Quarterly progress reports"
      content: ["Project milestones", "Risk assessments", "Market developments"]
      format: "Written briefings with optional presentations"
      
    consultation_process:
      timing: "Before major architectural decisions"
      scope: ["Regulatory interpretation", "Compliance approaches", "Risk mitigation"]
      documentation: "Formal consultation records maintained"
      
  regulatory_monitoring:
    finma_publications:
      monitoring: "Automatic alerts for new circulars and guidance"
      analysis: "Impact assessment within 30 days"
      implementation: "Compliance updates within 90 days"
      
    industry_coordination:
      participation: "Active involvement in industry working groups"
      feedback: "Regular input on regulatory proposals"
      best_practices: "Sharing of compliance experiences"
```

#### 2. Cross-Border Compliance

```yaml
cross_border_framework:
  eu_coordination:
    gdpr_compliance:
      data_transfers: "Adequacy decision reliance for Swiss-EU transfers"
      safeguards: "Standard contractual clauses for non-adequate countries"
      assessments: "Regular transfer impact assessments"
      
    psd2_alignment:
      technical_standards: "RTS compliance for EU market access"
      authorization: "Passporting arrangements where applicable"
      
  international_standards:
    fatf_compliance:
      aml_standards: "FATF 40 Recommendations implementation"
    oecd_standards:
      tax_compliance: "CRS and FATCA implementation"
      data_governance: "OECD AI Ethics Guidelines adoption"
```

## Fazit und Empfehlungen

### Rechtliche Machbarkeit

#### Positive Rahmenbedingungen

**1. Rechtssicherheit:**
Die Schweizer Rechtsordnung bietet grundsätzlich **ausreichende Rechtssicherheit** für die Implementierung der Open API Kundenbeziehung:

- **Klare Gesetzesgrundlagen:** BankG, DSG, GwG bieten verlässlichen Rahmen
- **Etablierte Rechtsprechung:** Bewährte Prinzipien für Datenverarbeitung und Outsourcing
- **Regulatorische Stabilität:** FINMA als kompetente und berechenbare Aufsichtsbehörde

**2. Internationale Kompatibilität:**
- **EU-Äquivalenz:** Schweizer Standards weitgehend EU-kompatibel
- **Internationale Standards:** Alignment mit globalen Best Practices möglich
- **Bilaterale Abkommen:** Spezifische Regelungen für grenzüberschreitende Aktivitäten

#### Identifizierte Herausforderungen

**1. Regulatorische Klarstellungen erforderlich:**
- **FINMA-Guidance:** Spezifische Stellungnahme zu Open Banking wünschenswert
- **Outsourcing-Abgrenzung:** Klarstellung wann API-Nutzung als Outsourcing gilt
- **Haftungsverteilung:** Regulatorische Guidance zur Haftungsallokation

**2. Komplexität des Rechtsrahmens:**
- **Multi-Level Compliance:** Bundes-, Kantons- und Gemeinderecht
- **Sektorale Regulierung:** Banking, Insurance, Fintech unterschiedlich reguliert
- **Internationale Dimension:** Verschiedene Rechtssysteme bei Cross-Border Use Cases

### Strategische Empfehlungen

#### 1. Proaktive Regulatory Engagement

```yaml
regulatory_strategy:
  finma_engagement:
    timing: "Frühzeitige Konsultation vor Markteinführung"
    approach: "Konstruktive Zusammenarbeit statt reaktive Compliance"
    outcome: "FINMA-Guidance oder Rundschreiben zu Open Banking"
    
  industry_leadership:
    role: "Schweiz als Vorreiter für European Open Banking Standards"
    collaboration: "Aktive Teilnahme an EU/UK Standard-Entwicklung"
    innovation: "Swiss Innovation als Competitive Advantage"
```

#### 2. Legal Risk Mitigation

```yaml
risk_mitigation_strategy:
  legal_framework:
    participation_agreements: "Comprehensive legal framework for all participants"
    liability_allocation: "Clear and fair distribution of risks and responsibilities"
    dispute_resolution: "Efficient and specialized dispute resolution mechanisms"
    
  compliance_automation:# 07 Rechtliche Rahmenbedingungen - Open API Kundenbeziehung

## Schweizer Finanzmarkt-Kontext und Übersicht

### Regulatorische Ausgangslage

#### Schweizer Finanzmarktregulierung

**Primäre Regulierungsinstanzen:**
- **FINMA (Eidgenössische Finanzmarktaufsicht):** Aufsicht über Banken, Versicherungen und andere Finanzdienstleister
- **SNB (Schweizerische Nationalbank):** Währungs- und Stabilitätspolitik
- **SIF (Staatssekretariat für internationale Finanzfragen):** Internationale Finanzpolitik
- **EDÖB (Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragte):** Datenschutzaufsicht

**Grundlegende Gesetze und Verordnungen:**
```yaml
primary_legislation:
  banking_law:
    - "Bankengesetz (BankG)"
    - "Bankenverordnung (BankV)"
    - "FINMA-Rundschreiben zu Outsourcing"
    
  data_protection:
    - "Datenschutzgesetz (DSG) - revidiert 2023"
    - "Datenschutzverordnung (DSV)"
    - "EDÖB-Leitlinien zu Datenbearbeitung"
    
  financial_services:
    - "Finanzdienstleistungsgesetz (FIDLEG)"
    - "Finanzinstitutsgesetz (FINIG)"
    - "Geldwäschereigesetz (GwG)"
    
  civil_law:
    - "Obligationenrecht (OR)"
    - "Zivilgesetzbuch (ZGB)"
    - "Bundesgesetz über den Datenschutz"
```

#### Besonderheiten des Schweizer Kontexts

**1. Bankkundengeheimnis:**
- **Verfassungsrechtlicher Schutz:** Art. 13 BV (Privatsphäre)
- **Strafrechtlicher Schutz:** Art. 47 BankG
- **Durchbrechungsmöglichkeiten:** Nur unter strengen gesetzlichen Voraussetzungen
- **Internationale Dimension:** Amtshilfe und automatischer Informationsaustausch

**2. Subsidiaritätsprinzip:**
- **Selbstregulierung:** Bevorzugung brancheninterner Lösungen
- **Staatsintervention:** Nur bei Marktversagen oder systemischen Risiken
- **Industry Standards:** Starke Rolle von Branchenverbänden und -standards

**3. Internationale Verflechtung:**
- **EU-Kompatibilität:** Weitgehende Angleichung an EU-Standards ohne Übernahme
- **Bilaterale Abkommen:** Spezifische Vereinbarungen (z.B. Versicherungsabkommen)
- **Äquivalenzentscheidungen:** Anerkennung als gleichwertig durch EU

### Compliance-Anforderungen

#### FINMA-Rundschreiben Outsourcing (2018/3)

**Anwendungsbereich:**
- Auslagerung von Geschäftstätigkeiten an Dritte
- Cloud Computing und externe IT-Services
- **Relevanz für Open API:** Datenübertragung als potenzielle Auslagerung

**Kernpflichten:**
```yaml
outsourcing_requirements:
  risk_assessment:
    requirement: "Umfassende Risikobeurteilung vor Auslagerung"
    documentation: "Dokumentierte Risikoanalyse erforderlich"
    approval: "Geschäftsleitung muss Auslagerung genehmigen"
    
  contractual_safeguards:
    requirement: "Angemessene vertragliche Sicherungen"
    content: ["SLA-Definitionen", "Audit-Rechte", "Datenschutz", "Kündigungsrechte"]
    compliance: "FINMA-konforme Vertragsgestaltung erforderlich"
    
  ongoing_oversight:
    requirement: "Kontinuierliche Überwachung des Auslagerungspartners"
    monitoring: "Regelmäßige Leistungs- und Risikobewertung"
    reporting: "Berichterstattung an Geschäftsleitung und FINMA"
    
  business_continuity:
    requirement: "Sicherstellung der Geschäftskontinuität"
    contingency: "Exit-Strategien und alternative Lösungen"
    testing: "Regelmäßige Tests der Notfallpläne"
```

#### Geldwäschereigesetz (GwG) Compliance

**Sorgfaltspflichten nach GwG:**
```yaml
gwg_requirements:
  customer_identification:
    article: "GwG Art. 3 - Identifizierung der Vertragspartei"
    requirement: "Eindeutige Identifizierung aller Vertragsparteien"
    methods: ["Persönliche Vorsprache", "Videoidentifikation", "QES"]
    documentation: "Aufbewahrung der Identifikationsunterlagen"
    
  beneficial_ownership:
    article: "GwG Art. 4 - Feststellung der wirtschaftlich berechtigten Person"
    requirement: "Ermittlung der tatsächlichen Eigentümer und Kontrollinhaber"
    thresholds: "25% Beteiligung oder Kontrollmöglichkeit"
    verification: "Angemessene Überprüfung der Angaben"
    
  ongoing_monitoring:
    article: "GwG Art. 6 - Überwachung der Geschäftsbeziehung"
    requirement: "Kontinuierliche Überwachung der Geschäftstätigkeiten"
    updates: "Regelmäßige Aktualisierung der Kundendaten"
    reporting: "Meldung verdächtiger Transaktionen"
```

#### Datenschutzgesetz (DSG) 2023

**Wesentliche Neuerungen:**
```yaml
dsg_2023_changes:
  consent_requirements:
    explicit_consent: "Ausdrückliche Einwilligung für sensitive Daten erforderlich"
    withdrawal: "Einfache Widerrufsmöglichkeit zu gewährleisten"
    documentation: "Nachweis der Einwilligung erforderlich"
    
  data_subject_rights:
    right_of_access: "Auskunftsrecht innerhalb 30 Tagen"
    right_to_rectification: "Berichtigungsrecht bei fehlerhaften Daten"
    right_to_deletion: "Löschungsrecht unter bestimmten Voraussetzungen"
    right_to_portability: "Datenübertragbarkeit in strukturiertem Format"
    
  data_protection_impact_assessment:
    requirement: "DSFA bei hohem Risiko für Persönlichkeitsrechte"
    content: ["Risikobewertung", "Schutzmaßnahmen", "Interessenabwägung"]
    consultation: "EDÖB-Konsultation bei Restrisiken"
    
  international_transfers:
    adequacy_decisions: "Übertragung in Länder mit angemessenem Datenschutz"
    safeguards: "Geeignete Garantien bei Drittstaatenübertragung"
    documentation: "Dokumentation der Übertragungsgrundlage"
```

## Identifizierte rechtliche Kernfragestellungen und Stellungsnahme Experte

*Hinweis: Der folgende Inhalt wird möglichst 1:1 aus den Expertenstellungnahmen übernommen, mit nur grammatikalischen und strukturellen Verbesserungen.*

### Haftungsfragen bei Datenübertragung

#### Kernfragestellung: Haftungsverteilung

**Konkrete Fragestellung:**
"Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden, und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?"

#### Experteneinschätzung zur Haftung

**Grundsätzliche Haftungsverteilung:**

Die **Verantwortung in Bezug auf die Verwendung von Daten liegt bei der Bank, die sie nutzt**. Dies gilt auch im Fall einer delegierten Kundenidentifikation.

Die Lage ist grundsätzlich nicht anders, ob ein Provider für die Identifikation eingesetzt wird oder ob die Daten aus einer vorbestehenden Bankbeziehung genutzt werden.

Dies gilt für die Verantwortung der Bank, welche die Daten nutzt, und kann auch in Bezug auf die Haftung Dritter (sei es ein Provider, sei es ein Produzent) so gehandhabt werden.

**Haftung bei Pflichtverletzungen:**

In Betracht fällt wohl einzig eine **Haftung bei Pflichtverletzungen des Dritten**, d.h. die Bank wird davon ausgehen können, dass der Dritte die ihm obliegenden Pflichten beachtet hat.

Nachdem die Verantwortung bei der Bank liegt, die die Daten nutzt, der Produzent kaum bereit sein wird, substanzielle Haftungsrisiken einzugehen, und allfällige Pflichtverletzungen des Dritten für die Bank in aller Regel schwer zu eruieren und zu belegen sein werden, wird sich hier tendenziell eine **Beschränkung auf Grobfahrlässigkeit und Vorsatz empfehlen** oder allenfalls, soweit solche in einem Vertrag zielführend ausformuliert werden können, auf bestimmte, klar definierte Vertragsverletzungen.

#### Praktische Umsetzung durch