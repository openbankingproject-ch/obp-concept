# OBP Rechtliche Rahmenbedingungen Conclusion

## Inhalt

1. [Executive Summary](#executive-summary)
2. [Schweizer Finanzmarkt-Kontext und Regulatorische Ausgangslage](#schweizer-finanzmarkt-kontext-und-regulatorische-ausgangslage)
3. [Identifizierte rechtliche Kernfragestellungen und Expertenstellungnahmen](#identifizierte-rechtliche-kernfragestellungen-und-expertenstellungnahmen)
4. [Offene Fragestellungen](#offene-fragestellungen)
5. [Vorschlag Compliance-Framework f�r API-Design](#vorschlag-compliance-framework-f�r-api-design)
6. [Risikomanagement und Haftung](#risikomanagement-und-haftung)
7. [Fazit und Empfehlungen](#fazit-und-empfehlungen)

---

## Executive Summary

Die rechtlichen Rahmenbedingungen f�r die Open API Kundenbeziehung sind durch ein komplexes Zusammenspiel von Schweizer Finanzmarktregulierung, Datenschutzrecht und internationalem Recht gepr�gt. Die Analyse identifiziert kritische Rechtsgebiete und bietet praxisorientierte Compliance-Frameworks f�r die API-Implementation.

**Zentrale Erkenntnisse:**
- FINMA-Stellungnahme als kritischer Erfolgsfaktor f�r Marktakzeptanz
- Haftungsverteilung zwischen Datenproducer und -Consumer erfordert vertragliche Klarstellung
- GwG-Compliance und Outsourcing-Behandlung sind komplexe, fallspezifische Themen
- Bankkundengeheimnis und Datenschutz erfordern robuste Consent-Mechanismen

**Wichtiger Disclaimer:** *Die in diesem Dokument enthaltenen Informationen und Empfehlungen stellen keine Rechtsberatung dar. Wir sind keine Fachpersonen im rechtlichen Bereich. F�r konkrete rechtliche Fragestellungen ist zwingend qualifizierte juristische Beratung einzuholen.*

---

## Schweizer Finanzmarkt-Kontext und Regulatorische Ausgangslage

### Rechtliche Rahmenbedingungen-Matrix

Die Open API Kundenbeziehung bewegt sich im Spannungsfeld verschiedener Rechtsgebiete:

| Rechtsbereich | Prim�re Quelle | FINMA-Guidance | Anwendung auf APIs |
|---------------|----------------|----------------|-------------------|
| **Bankkundengeheimnis** | BankG Art. 47 | RS 2008/7 | Consent-basierte Datenfreigabe erforderlich |
| **Geldw�schereirecht** | GwG Art. 3, 4 | RS 2016/7 | Identifikationsstandards und KYC-Prozesse |
| **Datenschutz** | DSG, GDPR-�quivalenz | FAQ DSG/GDPR | Consent Management, Datenminimierung |
| **Outsourcing** | BankV Art. 25 | RS 2008/7 | Drittanbieter-Service-Integration |
| **Operational Risk** | Basel III/IV | FINMA-Guidance | API-Zuverl�ssigkeit, Sicherheitsanforderungen |

### Compliance-Ausgangslage

**Regulatorische Komplexit�t:**
- Keine spezifischen Open API-Regelungen in der Schweiz
- Bestehende Gesetze m�ssen auf neue Technologien interpretiert werden
- Internationale Standards (PSD2, GDPR) als Orientierungshilfe
- FINMA-Position noch nicht vollst�ndig etabliert

**Rechtsunsicherheiten:**
- Grenzen zwischen Datennutzung und Outsourcing
- Haftungsverteilung bei API-basierten Daten�bertragungen
- Mindestanforderungen f�r Datenvalidierung
- Cross-Border Data Sharing Compliance

---

## Identifizierte rechtliche Kernfragestellungen und Expertenstellungnahmen

### Haftung und Verantwortlichkeit

#### Kernfragestellung: Datenqualit�t und Haftungsverteilung

**Konkrete Problemstellung:** Wer haftet f�r die Aktualit�t und Richtigkeit der �ber APIs �bertragenen Kundendaten?

#### Expertenstellungnahmen

**HBL Position:**
- Keine Haftung vom Produzenten f�r Aktualit�t/Richtigkeit der Daten
- Integrator B bleibt verantwortlich f�r GwG-/DSG-Konformit�t

**PostFinance Position:**
- Haftung f�r die Daten bis zum Consent des Kunden  sobald die Daten beim Empf�nger sind, liegt die Verantwortung bei ihm

**Intrum Position:**
- **Ausservertragliche Haftung (Art. 41 OR):** Jede Partei kann haften  abh�ngig von Verschulden und Kausalit�t
- **Empfehlung:** Zivilrechtliche Haftung besser vertraglich regeln (z.B. �ber Teilnahmevereinbarung, SLA)

#### Zus�tzliche Haftungsaspekte

Das bestehende Vertragswerk zwischen YUH, Swissquote und PostFinance ist als Basis f�r die Kl�rung der Haftungsfrage zu eruieren.

Parallel dazu sind erg�nzende Sicherheitsma�nahmen zu pr�fen  beispielsweise Mechanismen zur Identifikation und Verhinderung von Fake-Accounts.

### Outsourcing und Delegation

#### Kernfragestellung: FINMA-Outsourcing-Relevanz

**Konkrete Fragestellung:** Wie m�ssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden?

#### Experteneinsch�tzung

**BEI Position:**
Mit Bankidentit�tscase von PostFinance zu Kunden im Namen und auf Rechnung kl�ren.

**HBL Position:**
- **Fall 1:** Bank B verl�sst sich auf die von Bank A durchgef�hrte Identifikation. Bank B nutzt die Daten, �bernimmt aber selbst die Verantwortung. � **Kein Outsourcing** (sondern reiner Datenempfang).
  - Bank B nutzt die Daten im Reliance-Modell". Bank A wird nicht im Auftrag von Bank B t�tig. Vertraglich zwischen den beiden Banken regeln, aber ohne Delegation der Funktion.

- **Fall 2:** Bank B beauftragt Bank A explizit mit der Identifikation von Kunden im Namen der Bank B. � **Outsourcing.** Bank A wird als Dienstleister t�tig. Bank B delegiert eine bankrechtlich wesentliche Funktion.

- **Fall 3:** Bank B nutzt einen KYC-Dienstleister (z.B. IDnow, Intrum, Swisscom), der Kunden im Namen der Bank identifiziert. � **Outsourcing** (gilt auch bei Drittanbietern).
  
  Wenn sich die Bank f�r ein Outsourcing entscheidet:
  - Vertrag �ber die Auslagerung abschlie�en (inkl. Weisungsrecht, Kontrollrechte etc.)
  - Risikobeurteilung und Outsourcing-Governance etablieren
  - Meldung an die FINMA (wenn die Funktion wesentlich ist)

**Intrum Position:**
Falls Outsourcing relevant, kann dies generisch umgesetzt werden? Oder ist kein Outsourcing m�glich? Somit nur Fall 1 m�glich.

#### L�sungsansatz

**Empfehlung:** Erforderlich fallspezifische Betrachtungsweise

**TBD (To Be Determined):**
Heikel ist hier das in Art. 28 GwV-FINMA angelegte Verbot einer Weiterdelegation. Dies betrifft nur aber immerhin den engen Anwendungsbereich der GwG-Pr�vention bei Finanzintermedi�ren. Ein L�sungsansatz k�nnte sein, �ber die oben beschriebene Datengovernanz die Gesamtheit der am Datenraum "Identifikation" teilnehmenden Finanzinstitute als "Finanzintermedi�r" i.S. Art. 28 GwV-FINMA zu interpretieren. Dann k�nnten die Identifikationen innerhalb der Gruppe der Teilnehmenden ausgetauscht werden. Wenn die vertraglichen Teilnahmebedingungen stringent genug formuliert sind, k�nnte dies ausreichen, um die FINMA zu �berzeugen. Weiter zu pr�fen ist die Vereinbarkeit mit Art. 19 VSB 20, welcher sich dem Wortlaut nach auf Einheiten eines Konzerns bezieht. Nach Sinn und Zweck m�sste diese Bestimmung auch im besprochenen Fall greifen. Vielleicht gibt es M�glichkeiten im Rahmen der Revision der VSB dieses Thema aufzugreifen.

### Datenschutz und Bankgeheimnis

#### Kernfragestellung: Einwilligung und Disclosure

**Konkrete Fragestellung:** Welche Mindestanforderungen gelten f�r die Datenpr�fung sowie f�r die herausgegebenen Datens�tze?

#### Experteneinsch�tzung

**HBL Position:**
Annahme: Die herausgegebenen Datens�tze werden �as is� �bergeben. Allf�llige weitere Pr�fungen erfolgen durch den Integrator.

Warum werden keine Effizienzgewinne erzielt? Die Identifikation wurde ja durchgef�hrt. Erg�nzungen auf Grund Risikoapproach sind Zusatzaufw�nde des Integrators. Pr�fen mit Yuh Case.

**PostFinance Position:**
Herausgabe: Einverst�ndnis des Kunden bez�glich Datenschutz und Bankkundengeheimnis n�tig.

Datenpr�fung: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA w�re w�nschenswert, da der Integrator ansonsten das Risiko tr�gt oder bei n�tiger Pr�fung der Datens�tze keine Effizienzgewinne mehr erzielt.

**Intrum Position:**
Zur Beantwortung dieser Frage ben�tigt es mehr Angaben zu den Datens�tzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Gesch�ftsgeheimnisse zu beachten und geb�hrend zu ber�cksichtigen.

F�r die Struktur der Datens�tze k�nnten die folgenden allgemeinen Grunds�tze definiert werden:

"Datenprodukte b�ndeln Ressourcen (z.B. Datens�tze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsf�lle zu realisieren. Datenprodukte werden von Datenanbietenden oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement erm�glicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte" (Bundeskanzlei, Bausteine von Datenr�umen  Daten�kosystem Schweiz, Ziffer 3.2.3)

Sie stellen sicher, dass die mehrfache Datennutzung vertrauensw�rdig und sicher ist, und verhindern den Missbrauch von Daten. Vertragliche Vereinbarungen k�nnen auf verschiedenen Ebenen getroffen werden und unterscheiden sich darin, welche Akteure sie betreffen. Vereinbarungen auf Ebene Datenraum sind f�r alle Datenraumteilnehmenden gleichermassen durch ihre Teilnahme verbindlich.

### Validierung und Identifikation

#### Kernfragestellung: Datenvalidierung

**Konkrete Fragestellung:** Validierung, Identifikation und rechtliche Rahmenbedingungen: Es muss gepr�ft werden, wie bzw. ob eine �berpr�fung und finale Validierung der �bergebenen Daten erfolgen soll.

#### Experteneinsch�tzung

**Problematik:**
Sobald manuelle Pr�fschritte notwendig werden, verliert das gesamte API-Vorhaben deutlich an Attraktivit�t und Effizienz.

Dabei geht es nicht nur um die reine Identifikation, sondern auch um die Gesamtdatenlage.

Das Beispiel YUH zeigt jedoch, dass die Identifikation ohne weitere Pr�fung �bernommen wird. Risikobasiert wird bei YUH allenfalls zus�tzlich eine �berpr�fung vorgenommen, ist jedoch selten der Fall.

#### L�sungsansatz

**Empfehlung:**
Die FINMA wird voraussichtlich keine detaillierte Vorgabe zur Haftungsverteilung machen.

Eine unabh�ngige rechtliche Einsch�tzung w�re daher hilfreich, um diese Frage zu kl�ren.

**Vorschlag:** Die Fragestellung an Vigi zur weiteren Pr�fung weiterleiten.

### FINMA-Positionierung

#### Kernfragestellung: Regulatorisches Engagement

**Konkrete Fragestellung:** Ist eine Einbindung der FINMA w�nschenswert und erforderlich, und wenn ja, ab wann sollte sie erfolgen?

#### Strategische �berlegungen

**Zweigleisiger L�sungsansatz:**
Es wurde eine zweigleisige Vorgehensweise diskutiert:
1. **Orientierung an YUH:** Deren L�sungsansatz im Umgang mit der FINMA als Referenz
2. **Direkter FINMA-Austausch:** Pr�fung, ob ein direkter Austausch mit der FINMA sinnvoll und m�glich ist

---

## Offene Fragestellungen

Die folgenden rechtlichen Fragestellungen bed�rfen weiterer Kl�rung durch qualifizierte Rechtsexperten und m�glicherweise FINMA-Guidance:

### Outsourcing und Delegation

1. **Generische Outsourcing-Behandlung:** Kann eine einheitliche Outsourcing-Beurteilung f�r API-basierte Datennutzung entwickelt werden, oder ist jeder Fall individual zu beurteilen?

2. **Weiterdelegationsverbot (Art. 28 GwV-FINMA):** Wie kann das Weiterdelegationsverbot bei dezentralen API-Netzwerken praktisch umgesetzt werden?

3. **Konzernregelung (Art. 19 VSB 20):** Kann die Konzernregelung auf f�derierte API-Netzwerke analog angewendet werden?

### Haftung und Verantwortlichkeit

4. **Datenqualit�tshaftung:** Welche Mindeststandards gelten f�r die Datenqualit�t bei API-�bertragungen, und wer tr�gt die Haftung bei fehlerhaften Daten?

5. **Fake-Account-Pr�vention:** Welche technischen und rechtlichen Ma�nahmen sind erforderlich, um Missbrauch durch Fake-Accounts zu verhindern?

6. **Cross-Border-Haftung:** Wie ist die Haftungsverteilung bei grenz�berschreitenden API-Services zu regeln?

### Datenschutz und Consent Management

7. **Consent-Mindestanforderungen:** Welche spezifischen Anforderungen gelten f�r das Consent Management bei API-basierter Daten�bertragung?

8. **Datenminimierung bei APIs:** Wie ist das Prinzip der Datenminimierung bei granularen API-Zugriffen praktisch umzusetzen?

9. **GDPR-�quivalenz:** Welche zus�tzlichen Ma�nahmen sind f�r die Gew�hrleistung der GDPR-�quivalenz erforderlich?

### FINMA-Engagement

10. **Timing f�r FINMA-Kontakt:** Zu welchem Zeitpunkt sollte die FINMA erstmals �ber die Open API Kundenbeziehung informiert werden?

11. **FINMA-Guidance-Bedarf:** Welche spezifischen Aspekte bed�rfen einer FINMA-Stellungnahme oder -Guidance?

12. **Meldepflichten:** Bestehen Meldepflichten gegen�ber der FINMA bei der Einf�hrung von API-basierten Services?

---

## Vorschlag Compliance-Framework f�r API-Design

**Wichtiger Disclaimer:** *Die folgenden Vorschl�ge stellen keine Rechtsberatung dar und k�nnen die Konsultation qualifizierter Rechtsexperten nicht ersetzen.*

### Compliance-by-Design Prinzipien

#### 1. Consent-First Architecture
**Implementation:**
- Explizite Kundeneinwilligung vor jeder Daten�bertragung
- Granulare Consent-Optionen auf Datenkategorie-Ebene
- Einfache Consent-Widerrufsmechanismen
- Audit Trail f�r alle Consent-Aktivit�ten

**Rechtliche Grundlage:** Art. 47 BankG (Bankkundengeheimnis), DSG Art. 6

#### 2. Data Minimization Framework
**Implementation:**
- API-Responses enthalten nur f�r den Zweck erforderliche Daten
- Purpose-based Access Control auf API-Ebene
- Automatische Datenanonymisierung wo m�glich
- Regelm��ige Datenbereinigung nach Zweckwegfall

**Rechtliche Grundlage:** DSG Art. 4 (Datenbearbeitungsgrunds�tze)

#### 3. Liability-by-Design
**Implementation:**
- Klare vertragliche Haftungsverteilung zwischen API-Participants
- SLA-basierte Service Level Agreements
- Comprehensive Error Handling und Logging
- Insurance Coverage f�r API-spezifische Risiken

**Rechtliche Grundlage:** OR Art. 41 (Haftung aus unerlaubter Handlung)

#### 4. Audit-Ready Architecture
**Implementation:**
- Comprehensive Logging aller API-Transaktionen
- Immutable Audit Trails f�r Compliance-Nachweise
- Real-time Compliance Monitoring und Alerting
- Regular Compliance Assessments und Reporting

**Rechtliche Grundlage:** FINMA-RS 2008/7 (Outsourcing), GwG Art. 7

### Rechtliche Checkliste f�r API-Implementation

#### Pre-Launch Legal Review
- [ ] **Bankkundengeheimnis:** Consent-Mechanismen implementiert und getestet
- [ ] **GwG-Compliance:** Identifikationsprozesse rechtskonform ausgestaltet  
- [ ] **Datenschutz:** DSG/GDPR-konforme Datenverarbeitung sichergestellt
- [ ] **Outsourcing:** Outsourcing-Relevanz gepr�ft und entsprechende Vertr�ge abgeschlossen
- [ ] **Haftung:** Liability-Framework vertraglich geregelt
- [ ] **Operational Risk:** Basel III/IV-konforme Risikomanagement-Prozesse implementiert

#### Ongoing Compliance Monitoring  
- [ ] **Consent Monitoring:** Regelm��ige �berpr�fung der Consent-Validit�t
- [ ] **Data Quality:** Monitoring der Datenqualit�t und -aktualit�t
- [ ] **Security Compliance:** Kontinuierliche Sicherheits�berwachung
- [ ] **Regulatory Updates:** Monitoring von Regulatory Changes
- [ ] **Incident Response:** Dokumentiertes Incident Response f�r Legal Issues

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
- Datenqualit�t zum Zeitpunkt der �bertragung
- Consent-Validierung vor Datenpreisgabe  
- Security Standards Compliance
- Timely Notification bei Data Breaches

**2. API Consumer (Data Integrator) Responsibilities:**
- Purpose-based Data Usage Compliance
- Additional KYC/AML Checks falls erforderlich
- Customer Communication �ber Data Usage
- Data Protection w�hrend Processing und Storage

**3. Shared Responsibilities:**
- Incident Response Coordination
- Regulatory Compliance Monitoring
- Customer Complaint Handling
- Audit Trail Maintenance

#### Insurance und Risk Transfer

**Professional Liability Insurance:**
- API-spezifische Coverage f�r Technology Errors & Omissions
- Cyber Liability Coverage f�r Data Breaches
- Regulatory Defense Cost Coverage

**Contractual Risk Transfer:**
- Indemnification Clauses f�r Specific Risk Categories
- Limitation of Liability Provisions (wo rechtlich zul�ssig)
- Force Majeure Clauses f�r Regulatory Changes

---

## Fazit und Empfehlungen

### Rechtliche Handlungsempfehlungen

#### Kurzfristige Ma�nahmen (0-6 Monate)

1. **Qualifizierte Rechtsberatung engagieren:** Spezialisierte Anwaltskanzlei mit FinTech/Banking-Expertise f�r detaillierte rechtliche Analyse

2. **FINMA-Strategie entwickeln:** Entscheidung �ber Timing und Approach f�r FINMA-Engagement basierend auf YUH-Pr�zedenzfall

3. **Legal Framework Design:** Entwicklung von Standardvertr�gen f�r API-Participants mit klarer Haftungsverteilung

4. **Compliance-by-Design Implementation:** Integration von rechtlichen Anforderungen in die technische Architektur

#### Mittelfristige Ma�nahmen (6-18 Monate)

5. **Pilot Legal Testing:** Rechtliche Validierung der API-Implementation mit begrenztem Participant-Set

6. **Regulatory Engagement:** Proaktiver Dialog mit FINMA �ber Open API Framework

7. **Industry Coordination:** Koordination mit anderen Schweizer Financial Institutions f�r gemeinsame rechtliche Positionen

8. **Legal Precedent Building:** Dokumentation und Sharing von Legal Learnings f�r Industry Benefit

#### Langfristige Strategien (18+ Monate)

9. **Regulatory Advocacy:** Engagement in der Entwicklung von Swiss-specific Open API Regulation

10. **International Coordination:** Coordination mit EU/UK Regulatory Developments f�r Cross-border Compatibility

11. **Legal Innovation:** Entwicklung innovativer rechtlicher L�sungen f�r emerging API Use Cases

### Kritische Erfolgsfaktoren

**1. Early Legal Engagement:** Rechtsexperten von Projektbeginn an einbinden
**2. FINMA Relationship:** Proaktive und transparente Kommunikation mit der FINMA
**3. Industry Collaboration:** Gemeinsame rechtliche Positions mit anderen Market Participants
**4. Regulatory Monitoring:** Kontinuierliche �berwachung von regulatory Developments
**5. Adaptive Compliance:** Flexible Legal Architecture f�r schnelle Regulatory Adaptations

### Schlussbemerkung

Die rechtliche Komplexit�t der Open API Kundenbeziehung erfordert einen systematischen und proaktiven Approach. Die identifizierten Kernfragestellungen und Expertenstellungnahmen bieten eine solide Grundlage f�r die weitere rechtliche Ausgestaltung, k�nnen jedoch qualifizierte Rechtsberatung f�r spezifische Implementation-Entscheidungen nicht ersetzen.

Die enge Zusammenarbeit zwischen technischen und rechtlichen Experten sowie der proaktive Dialog mit der FINMA werden als kritische Erfolgsfaktoren für die rechtskonforme und marktfähige Umsetzung der Open API Kundenbeziehung identifiziert.

TODO: TZE bitte verifizieren!!

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Final Draft für Legal Review  
**Wichtiger Hinweis:** *Dieses Dokument enthält keine Rechtsberatung. Für verbindliche rechtliche Einschätzungen ist qualifizierte juristische Beratung erforderlich.*

---

[Quellen und Referenzen](./Quellen%20und%20Referenzen.md)