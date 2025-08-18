# OBP Rechtliche Rahmenbedingungen Conclusion

## Inhalt

1. [Executive Summary](#executive-summary)
2. [Schweizer Finanzmarkt-Kontext und Regulatorische Ausgangslage](#schweizer-finanzmarkt-kontext-und-regulatorische-ausgangslage)
3. [Identifizierte rechtliche Kernfragestellungen und Expertenstellungnahmen](#identifizierte-rechtliche-kernfragestellungen-und-expertenstellungnahmen)
4. [Offene Fragestellungen](#offene-fragestellungen)
5. [Vorschlag Compliance-Framework fär API-Design](#vorschlag-compliance-framework-fär-api-design)
6. [Risikomanagement und Haftung](#risikomanagement-und-haftung)
7. [Fazit und Empfehlungen](#fazit-und-empfehlungen)

---

## Executive Summary

Die rechtlichen Rahmenbedingungen für die Open API Kundenbeziehung sind durch ein komplexes Zusammenspiel von Schweizer Finanzmarktregulierung, Datenschutzrecht und internationalem Recht geprägt. Die Analyse identifiziert kritische Rechtsgebiete und bietet praxisorientierte Compliance-Frameworks (regelkonforme Strukturen) für die API-Implementation.

**Zentrale Erkenntnisse:**
- FINMA-Stellungnahme als kritischer Erfolgsfaktor fär Marktakzeptanz
- Haftungsverteilung zwischen Datenproducer und -Consumer erfordert vertragliche Klarstellung
- GwG-Compliance und Outsourcing-Behandlung sind komplexe, fallspezifische Themen
- Bankkundengeheimnis und Datenschutz erfordern robuste Consent-Mechanismen

**Wichtiger Disclaimer:** *Die in diesem Dokument enthaltenen Informationen und Empfehlungen stellen keine Rechtsberatung dar. Wir sind keine Fachpersonen im rechtlichen Bereich. Fär konkrete rechtliche Fragestellungen ist zwingend qualifizierte juristische Beratung einzuholen.*

---

## Schweizer Finanzmarkt-Kontext und Regulatorische Ausgangslage

### Rechtliche Rahmenbedingungen-Matrix

Die Open API Kundenbeziehung bewegt sich im Spannungsfeld verschiedener Rechtsgebiete:

| Rechtsbereich | Primäre Quelle | FINMA-Guidance | Anwendung auf APIs |
|---------------|----------------|----------------|-------------------|
| **Bankkundengeheimnis** | BankG Art. 47 | RS 2008/7 | Consent-basierte Datenfreigabe erforderlich |
| **Geldwäschereirecht** | GwG Art. 3, 4 | RS 2016/7 | Identifikationsstandards und KYC-Prozesse |
| **Datenschutz** | DSG, GDPR-äquivalenz | FAQ DSG/GDPR | Consent Management, Datenminimierung |
| **Outsourcing** | BankV Art. 25 | RS 2008/7 | Drittanbieter-Service-Integration |
| **Operational Risk** | Basel III/IV | FINMA-Guidance | API-Zuverlässigkeit, Sicherheitsanforderungen |

### Compliance-Ausgangslage

**Regulatorische Komplexität:**
- Keine spezifischen Open API-Regelungen in der Schweiz
- Bestehende Gesetze mässen auf neue Technologien interpretiert werden
- Internationale Standards (PSD2, GDPR) als Orientierungshilfe
- FINMA-Position noch nicht vollständig etabliert

**Rechtsunsicherheiten:**
- Grenzen zwischen Datennutzung und Outsourcing
- Haftungsverteilung bei API-basierten Datenäbertragungen
- Mindestanforderungen fär Datenvalidierung
- Cross-Border Data Sharing Compliance

---

## Identifizierte rechtliche Kernfragestellungen und Expertenstellungnahmen

### Haftung und Verantwortlichkeit

#### Kernfragestellung: Datenqualität und Haftungsverteilung

**Konkrete Problemstellung:** Wer haftet fär die Aktualität und Richtigkeit der äber APIs äbertragenen Kundendaten?

#### Expertenstellungnahmen

**HBL Position:**
- Keine Haftung vom Produzenten fär Aktualität/Richtigkeit der Daten
- Integrator B bleibt verantwortlich fär GwG-/DSG-Konformität

**PostFinance Position:**
- Haftung fär die Daten bis zum Consent des Kunden  sobald die Daten beim Empfänger sind, liegt die Verantwortung bei ihm

**Intrum Position:**
- **Ausservertragliche Haftung (Art. 41 OR):** Jede Partei kann haften  abhängig von Verschulden und Kausalität
- **Empfehlung:** Zivilrechtliche Haftung besser vertraglich regeln (z.B. äber Teilnahmevereinbarung, SLA)

#### Zusätzliche Haftungsaspekte

Das bestehende Vertragswerk zwischen YUH, Swissquote und PostFinance ist als Basis fär die Klärung der Haftungsfrage zu eruieren.

Parallel dazu sind ergänzende Sicherheitsmaänahmen zu präfen  beispielsweise Mechanismen zur Identifikation und Verhinderung von Fake-Accounts.

### Outsourcing und Delegation

#### Kernfragestellung: FINMA-Outsourcing-Relevanz

**Konkrete Fragestellung:** Wie mässen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden?

#### Experteneinschätzung

**BEI Position:**
Mit Bankidentitätscase von PostFinance zu Kunden im Namen und auf Rechnung klären.

**HBL Position:**
- **Fall 1:** Bank B verlässt sich auf die von Bank A durchgefährte Identifikation. Bank B nutzt die Daten, äbernimmt aber selbst die Verantwortung. ä **Kein Outsourcing** (sondern reiner Datenempfang).
  - Bank B nutzt die Daten im Reliance-Modell". Bank A wird nicht im Auftrag von Bank B tätig. Vertraglich zwischen den beiden Banken regeln, aber ohne Delegation der Funktion.

- **Fall 2:** Bank B beauftragt Bank A explizit mit der Identifikation von Kunden im Namen der Bank B. ä **Outsourcing.** Bank A wird als Dienstleister tätig. Bank B delegiert eine bankrechtlich wesentliche Funktion.

- **Fall 3:** Bank B nutzt einen KYC-Dienstleister (z.B. IDnow, Intrum, Swisscom), der Kunden im Namen der Bank identifiziert. ä **Outsourcing** (gilt auch bei Drittanbietern).
  
  Wenn sich die Bank fär ein Outsourcing entscheidet:
  - Vertrag äber die Auslagerung abschlieäen (inkl. Weisungsrecht, Kontrollrechte etc.)
  - Risikobeurteilung und Outsourcing-Governance etablieren
  - Meldung an die FINMA (wenn die Funktion wesentlich ist)

**Intrum Position:**
Falls Outsourcing relevant, kann dies generisch umgesetzt werden? Oder ist kein Outsourcing mäglich? Somit nur Fall 1 mäglich.

#### Läsungsansatz

**Empfehlung:** Erforderlich fallspezifische Betrachtungsweise

**TBD (To Be Determined):**
Heikel ist hier das in Art. 28 GwV-FINMA angelegte Verbot einer Weiterdelegation. Dies betrifft nur aber immerhin den engen Anwendungsbereich der GwG-Prävention bei Finanzintermediären. Ein Läsungsansatz kännte sein, äber die oben beschriebene Datengovernanz die Gesamtheit der am Datenraum "Identifikation" teilnehmenden Finanzinstitute als "Finanzintermediär" i.S. Art. 28 GwV-FINMA zu interpretieren. Dann kännten die Identifikationen innerhalb der Gruppe der Teilnehmenden ausgetauscht werden. Wenn die vertraglichen Teilnahmebedingungen stringent genug formuliert sind, kännte dies ausreichen, um die FINMA zu äberzeugen. Weiter zu präfen ist die Vereinbarkeit mit Art. 19 VSB 20, welcher sich dem Wortlaut nach auf Einheiten eines Konzerns bezieht. Nach Sinn und Zweck mässte diese Bestimmung auch im besprochenen Fall greifen. Vielleicht gibt es Mäglichkeiten im Rahmen der Revision der VSB dieses Thema aufzugreifen.

### Datenschutz und Bankgeheimnis

#### Kernfragestellung: Einwilligung und Disclosure

**Konkrete Fragestellung:** Welche Mindestanforderungen gelten fär die Datenpräfung sowie fär die herausgegebenen Datensätze?

#### Experteneinschätzung

**HBL Position:**
Annahme: Die herausgegebenen Datensätze werden äas isä äbergeben. Allfällige weitere Präfungen erfolgen durch den Integrator.

Warum werden keine Effizienzgewinne erzielt? Die Identifikation wurde ja durchgefährt. Ergänzungen auf Grund Risikoapproach sind Zusatzaufwände des Integrators. Präfen mit Yuh Case.

**PostFinance Position:**
Herausgabe: Einverständnis des Kunden bezäglich Datenschutz und Bankkundengeheimnis nätig.

Datenpräfung: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA wäre wänschenswert, da der Integrator ansonsten das Risiko trägt oder bei nätiger Präfung der Datensätze keine Effizienzgewinne mehr erzielt.

**Intrum Position:**
Zur Beantwortung dieser Frage benätigt es mehr Angaben zu den Datensätzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Geschäftsgeheimnisse zu beachten und gebährend zu beräcksichtigen.

Fär die Struktur der Datensätze kännten die folgenden allgemeinen Grundsätze definiert werden:

"Datenprodukte bändeln Ressourcen (z.B. Datensätze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsfälle zu realisieren. Datenprodukte werden von Datenanbietenden oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement ermäglicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte" (Bundeskanzlei, Bausteine von Datenräumen  Datenäkosystem Schweiz, Ziffer 3.2.3)

Sie stellen sicher, dass die mehrfache Datennutzung vertrauenswärdig und sicher ist, und verhindern den Missbrauch von Daten. Vertragliche Vereinbarungen kännen auf verschiedenen Ebenen getroffen werden und unterscheiden sich darin, welche Akteure sie betreffen. Vereinbarungen auf Ebene Datenraum sind fär alle Datenraumteilnehmenden gleichermassen durch ihre Teilnahme verbindlich.

### Validierung und Identifikation

#### Kernfragestellung: Datenvalidierung

**Konkrete Fragestellung:** Validierung, Identifikation und rechtliche Rahmenbedingungen: Es muss gepräft werden, wie bzw. ob eine äberpräfung und finale Validierung der äbergebenen Daten erfolgen soll.

#### Experteneinschätzung

**Problematik:**
Sobald manuelle Präfschritte notwendig werden, verliert das gesamte API-Vorhaben deutlich an Attraktivität und Effizienz.

Dabei geht es nicht nur um die reine Identifikation, sondern auch um die Gesamtdatenlage.

Das Beispiel YUH zeigt jedoch, dass die Identifikation ohne weitere Präfung äbernommen wird. Risikobasiert wird bei YUH allenfalls zusätzlich eine äberpräfung vorgenommen, ist jedoch selten der Fall.

#### Läsungsansatz

**Empfehlung:**
Die FINMA wird voraussichtlich keine detaillierte Vorgabe zur Haftungsverteilung machen.

Eine unabhängige rechtliche Einschätzung wäre daher hilfreich, um diese Frage zu klären.

**Vorschlag:** Die Fragestellung an Vigi zur weiteren Präfung weiterleiten.

### FINMA-Positionierung

#### Kernfragestellung: Regulatorisches Engagement

**Konkrete Fragestellung:** Ist eine Einbindung der FINMA wänschenswert und erforderlich, und wenn ja, ab wann sollte sie erfolgen?

#### Strategische äberlegungen

**Zweigleisiger Läsungsansatz:**
Es wurde eine zweigleisige Vorgehensweise diskutiert:
1. **Orientierung an YUH:** Deren Läsungsansatz im Umgang mit der FINMA als Referenz
2. **Direkter FINMA-Austausch:** Präfung, ob ein direkter Austausch mit der FINMA sinnvoll und mäglich ist

---

## Offene Fragestellungen

Die folgenden rechtlichen Fragestellungen bedärfen weiterer Klärung durch qualifizierte Rechtsexperten und mäglicherweise FINMA-Guidance:

### Outsourcing und Delegation

1. **Generische Outsourcing-Behandlung:** Kann eine einheitliche Outsourcing-Beurteilung fär API-basierte Datennutzung entwickelt werden, oder ist jeder Fall individual zu beurteilen?

2. **Weiterdelegationsverbot (Art. 28 GwV-FINMA):** Wie kann das Weiterdelegationsverbot bei dezentralen API-Netzwerken praktisch umgesetzt werden?

3. **Konzernregelung (Art. 19 VSB 20):** Kann die Konzernregelung auf fäderierte API-Netzwerke analog angewendet werden?

### Haftung und Verantwortlichkeit

4. **Datenqualitätshaftung:** Welche Mindeststandards gelten fär die Datenqualität bei API-äbertragungen, und wer trägt die Haftung bei fehlerhaften Daten?

5. **Fake-Account-Prävention:** Welche technischen und rechtlichen Maänahmen sind erforderlich, um Missbrauch durch Fake-Accounts zu verhindern?

6. **Cross-Border-Haftung:** Wie ist die Haftungsverteilung bei grenzäberschreitenden API-Services zu regeln?

### Datenschutz und Consent Management

7. **Consent-Mindestanforderungen:** Welche spezifischen Anforderungen gelten fär das Consent Management bei API-basierter Datenäbertragung?

8. **Datenminimierung bei APIs:** Wie ist das Prinzip der Datenminimierung bei granularen API-Zugriffen praktisch umzusetzen?

9. **GDPR-äquivalenz:** Welche zusätzlichen Maänahmen sind fär die Gewährleistung der GDPR-äquivalenz erforderlich?

### FINMA-Engagement

10. **Timing fär FINMA-Kontakt:** Zu welchem Zeitpunkt sollte die FINMA erstmals äber die Open API Kundenbeziehung informiert werden?

11. **FINMA-Guidance-Bedarf:** Welche spezifischen Aspekte bedärfen einer FINMA-Stellungnahme oder -Guidance?

12. **Meldepflichten:** Bestehen Meldepflichten gegenäber der FINMA bei der Einfährung von API-basierten Services?

---

## Vorschlag Compliance-Framework fär API-Design

**Wichtiger Disclaimer:** *Die folgenden Vorschläge stellen keine Rechtsberatung dar und kännen die Konsultation qualifizierter Rechtsexperten nicht ersetzen.*

### Compliance-by-Design Prinzipien

#### 1. Consent-First Architecture
**Implementation:**
- Explizite Kundeneinwilligung vor jeder Datenäbertragung
- Granulare Consent-Optionen auf Datenkategorie-Ebene
- Einfache Consent-Widerrufsmechanismen
- Audit Trail fär alle Consent-Aktivitäten

**Rechtliche Grundlage:** Art. 47 BankG (Bankkundengeheimnis), DSG Art. 6

#### 2. Data Minimization Framework
**Implementation:**
- API-Responses enthalten nur fär den Zweck erforderliche Daten
- Purpose-based Access Control auf API-Ebene
- Automatische Datenanonymisierung wo mäglich
- Regelmääige Datenbereinigung nach Zweckwegfall

**Rechtliche Grundlage:** DSG Art. 4 (Datenbearbeitungsgrundsätze)

#### 3. Liability-by-Design
**Implementation:**
- Klare vertragliche Haftungsverteilung zwischen API-Participants
- SLA-basierte Service Level Agreements
- Comprehensive Error Handling und Logging
- Insurance Coverage fär API-spezifische Risiken

**Rechtliche Grundlage:** OR Art. 41 (Haftung aus unerlaubter Handlung)

#### 4. Audit-Ready Architecture
**Implementation:**
- Comprehensive Logging aller API-Transaktionen
- Immutable Audit Trails fär Compliance-Nachweise
- Real-time Compliance Monitoring und Alerting
- Regular Compliance Assessments und Reporting

**Rechtliche Grundlage:** FINMA-RS 2008/7 (Outsourcing), GwG Art. 7

### Rechtliche Checkliste fär API-Implementation

#### Pre-Launch Legal Review
- [ ] **Bankkundengeheimnis:** Consent-Mechanismen implementiert und getestet
- [ ] **GwG-Compliance:** Identifikationsprozesse rechtskonform ausgestaltet  
- [ ] **Datenschutz:** DSG/GDPR-konforme Datenverarbeitung sichergestellt
- [ ] **Outsourcing:** Outsourcing-Relevanz gepräft und entsprechende Verträge abgeschlossen
- [ ] **Haftung:** Liability-Framework vertraglich geregelt
- [ ] **Operational Risk:** Basel III/IV-konforme Risikomanagement-Prozesse implementiert

#### Ongoing Compliance Monitoring  
- [ ] **Consent Monitoring:** Regelmääige äberpräfung der Consent-Validität
- [ ] **Data Quality:** Monitoring der Datenqualität und -aktualität
- [ ] **Security Compliance:** Kontinuierliche Sicherheitsäberwachung
- [ ] **Regulatory Updates:** Monitoring von Regulatory Changes
- [ ] **Incident Response:** Dokumentiertes Incident Response fär Legal Issues

---

## Risikomanagement und Haftung

**Wichtiger Disclaimer:** *Die folgenden Risikobewertungen ersetzen keine professionelle Rechtsberatung und stellen lediglich allgemeine Orientierungshilfen dar.*

### Identifizierte Rechtsrisiken

#### High-Risk Areas

**1. Bankkundengeheimnis-Verletzung**
- **Risiko:** Unberechtigte Datenpreisgabe ohne ausreichenden Consent
- **Impact:** FINMA-Sanktionen, Reputationsschaden, Zivilrechtliche Haftung
- **Mitigation:** Robuste Consent-Management-Systeme, Legal Review vor Go-Live

**2. GwG-Non-Compliance**
- **Risiko:** Unzureichende Identifikationsprozesse bei API-basiertem Data Sharing
- **Impact:** Strafrechtliche Konsequenzen, Regulatory Enforcement
- **Mitigation:** Compliance-by-Design, Expert Legal Review, FINMA-Engagement

**3. Outsourcing-Misclassification**
- **Risiko:** Falsche rechtliche Einordnung von API-Services als Outsourcing
- **Impact:** FINMA-Meldepflichten, Additional Compliance Requirements
- **Mitigation:** Case-by-Case Legal Assessment, Proactive FINMA Consultation

#### Medium-Risk Areas

**4. Datenschutz-Verletzungen**
- **Risiko:** DSG/GDPR-non-konforme Datenverarbeitung
- **Impact:** Regulatory Fines, Customer Trust Loss
- **Mitigation:** Privacy-by-Design, Regular Compliance Audits

**5. Cross-Border Compliance**
- **Risiko:** Regulatory Conflicts bei internationalen API-Services
- **Impact:** Market Access Restrictions, Legal Disputes
- **Mitigation:** Jurisdiction-specific Legal Advice, Multi-jurisdiction Compliance Framework

### Haftungsverteilung Framework

#### Empfohlene Vertragsstrukturen

**1. API Provider (Data Producer) Responsibilities:**
- Datenqualität zum Zeitpunkt der äbertragung
- Consent-Validierung vor Datenpreisgabe  
- Security Standards Compliance
- Timely Notification bei Data Breaches

**2. API Consumer (Data Integrator) Responsibilities:**
- Purpose-based Data Usage Compliance
- Additional KYC/AML Checks falls erforderlich
- Customer Communication äber Data Usage
- Data Protection während Processing und Storage

**3. Shared Responsibilities:**
- Incident Response Coordination
- Regulatory Compliance Monitoring
- Customer Complaint Handling
- Audit Trail Maintenance

#### Insurance und Risk Transfer

**Professional Liability Insurance:**
- API-spezifische Coverage fär Technology Errors & Omissions
- Cyber Liability Coverage fär Data Breaches
- Regulatory Defense Cost Coverage

**Contractual Risk Transfer:**
- Indemnification Clauses fär Specific Risk Categories
- Limitation of Liability Provisions (wo rechtlich zulässig)
- Force Majeure Clauses fär Regulatory Changes

---

## Fazit und Empfehlungen

### Rechtliche Handlungsempfehlungen

#### Kurzfristige Maänahmen (0-6 Monate)

1. **Qualifizierte Rechtsberatung engagieren:** Spezialisierte Anwaltskanzlei mit FinTech/Banking-Expertise fär detaillierte rechtliche Analyse

2. **FINMA-Strategie entwickeln:** Entscheidung äber Timing und Approach fär FINMA-Engagement basierend auf YUH-Präzedenzfall

3. **Legal Framework Design:** Entwicklung von Standardverträgen fär API-Participants mit klarer Haftungsverteilung

4. **Compliance-by-Design Implementation:** Integration von rechtlichen Anforderungen in die technische Architektur

#### Mittelfristige Maänahmen (6-18 Monate)

5. **Pilot Legal Testing:** Rechtliche Validierung der API-Implementation mit begrenztem Participant-Set

6. **Regulatory Engagement:** Proaktiver Dialog mit FINMA äber Open API Framework

7. **Industry Coordination:** Koordination mit anderen Schweizer Financial Institutions fär gemeinsame rechtliche Positionen

8. **Legal Precedent Building:** Dokumentation und Sharing von Legal Learnings fär Industry Benefit

#### Langfristige Strategien (18+ Monate)

9. **Regulatory Advocacy:** Engagement in der Entwicklung von Swiss-specific Open API Regulation

10. **International Coordination:** Coordination mit EU/UK Regulatory Developments fär Cross-border Compatibility

11. **Legal Innovation:** Entwicklung innovativer rechtlicher Läsungen fär emerging API Use Cases

### Kritische Erfolgsfaktoren

**1. Early Legal Engagement:** Rechtsexperten von Projektbeginn an einbinden
**2. FINMA Relationship:** Proaktive und transparente Kommunikation mit der FINMA
**3. Industry Collaboration:** Gemeinsame rechtliche Positions mit anderen Market Participants
**4. Regulatory Monitoring:** Kontinuierliche äberwachung von regulatory Developments
**5. Adaptive Compliance:** Flexible Legal Architecture fär schnelle Regulatory Adaptations

### Schlussbemerkung

Die rechtliche Komplexität der Open API Kundenbeziehung erfordert einen systematischen und proaktiven Approach. Die identifizierten Kernfragestellungen und Expertenstellungnahmen bieten eine solide Grundlage fär die weitere rechtliche Ausgestaltung, kännen jedoch qualifizierte Rechtsberatung fär spezifische Implementation-Entscheidungen nicht ersetzen.

Die enge Zusammenarbeit zwischen technischen und rechtlichen Experten sowie der proaktive Dialog mit der FINMA werden als kritische Erfolgsfaktoren für die rechtskonforme und marktfähige Umsetzung der Open API Kundenbeziehung identifiziert.

TODO: TZE bitte verifizieren!!

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Final Draft für Legal Review  
**Wichtiger Hinweis:** *Dieses Dokument enthält keine Rechtsberatung. Für verbindliche rechtliche Einschätzungen ist qualifizierte juristische Beratung erforderlich.*

---

[Quellen und Referenzen](./Quellen%20und%20Referenzen.md)