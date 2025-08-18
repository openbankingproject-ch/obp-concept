# Rechtliches und Regulatorisches

**Koordiniert von:** Business Engineering Institute St.Gallen

## Relevante Fragestellungen im Kontext der Open API Kundenbeziehung

### Externes Gutachten

Die rechtlichen Fragestellungen wurden in drei Hauptkategorien strukturiert und von externen Rechtsexperten bewertet.

## Identifikation offener regulatorischer, rechtlicher und sonstiger Fragestellungen

### Regulatorische Fragestellungen

#### 1. "Identifikation auf Vorrat"
**Fragestellung:** Wird das Prinzip einer "Identifikation auf Vorrat" grundsätzlich erlaubt? (das bedeutet, ein neues Onboarding mit allenfalls nicht mehr gültigen Dokumenten wäre erlaubt - z.B. bei Ausweis gestohlen, Namensänderung bei Heirat etc.)

**Kernpunkte:**
- Definition der Dauer, wie lange eine Identifikation wiederverwendet werden kann
- Details zu Ausweisen: Gültigkeit für Wiederverwendung relevant?
- Zugelassene Ausweisarten
- Umgang mit Ausländern / Ausländerausweis nötig?
- Festlegung von "out of Scope" Kundengruppen (z.B. Workout/Recovery Positionen, Kunden mit MROS Meldungen, etc.) vor Datenweitergabe, oder danach durch neue Bank?

#### 2. Arten der Identifikation
**Fragestellung:** Welche Arten der Identifikation sollen weitergegeben werden können (z.B. nur Online / Video Ident.)?

#### 3. Definition Dauer
**Fragestellung:** Definition Dauer, wie lange eine Identifikation wiederverwendet werden kann

### Rechtliche Fragestellungen

#### 1. Regelung der Delegation
**Fragestellung:** Regelung der Delegation (Beispiel: HBL gibt ein Onboarding der Intrum an eine Drittbank weiter. Wem kommt welche Rolle und Haftbarkeit zuteil?)

#### 2. Haftung bei Online Identifikation
**Fragestellung:** Haftung bei Online Ident. im Zusammenhang mit Ersteinzahlungen: Wer haftet wofür (da Identifikation aus Bestandteilen von Drittanbieter und Bank besteht)

#### 3. Wiederverwendete Identifikationen und Outsourcing
**Fragestellung:** Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden?

#### 4. Ersteinschätzung Legal
**Angabe:** Weitergabe nur mit Disclaimer/ohne Haftbarkeit

### Sonstige Fragestellungen (HBL-spezifisch)

#### 1. Risikoexponierung
**Fragestellung:** Interesse der Bank an einer Identifikation ohne Sicherheit der Aktualität / Qualität überhaupt gegeben? (Falls kein grösseres Risiko in Kauf genommen werden möchte, bedeutet dies eine enge Überprüfung der Fälle, was wiederum die Vorteile einer Wiederverwendung zunichte machen würde)

#### 2. Aufwand-Nutzen-Verhältnis
**Fragestellung:** Lohnt sich der Aufwand und die Kosten für die Einführung und Unterhalt eines weiteren Identifikationskanals für eine Bank?

## Offene Fragestellungen

### Stakeholder-Positionen zu "out of Scope" Kundengruppen

| Stakeholder | Position | Details |
|-------------|----------|---------|
| **BEI** | Kundenselektion nicht beim Produzent | Der Produzent filtert nicht und darf auch nicht darüber informieren, welcher Status oder Zustand der Kunde hat. Der Integrator muss die Prüfung durchführen aufgrund seiner Kriterien (individueller Risikoapproach) |
| **HBL** | Out of Scope Definition beim Integrator | Ausser im Zusammenhang mit allfälligen Mindestanforderungen zur Wiederverwendung der Identifikation. Gewisse Kunden sollten gar nicht übernommen werden: sanktionierte Kunden, MROS, generell unerwünschte Kunden |
| **PostFinance** | TBD | Zu klären |
| **Intrum** | TBD | Zu klären |

## Workshop-Agenda: Validierung Open API & nächste Phase

### Ziele WS 2025/4 «Validierung Open API & nächste Phase» (11.06.2025, 14-17 Uhr)

**Erreichte Ziele:**
- ✓ Der Entwurf für die Open API Version 2.0 wurde vorgestellt und diskutiert
- ✓ Die rechtlichen und regulatorischen Aspekte und Lösungen sind diskutiert und Lösungsoptionen sind aufgezeigt
- ✓ Die Whitepaper-Version 2.0 zum Business Case wurde vorgestellt und weiteres Feedback dazu eingeholt
- ✓ Mögliche Finanzierungs- und Monetarisierungsmodelle wurden aufgezeigt
- ✓ Feedback zu Phase 1 wurde eingeholt, die Strukturierung und Planung der Phase 2 wurde vorgestellt und die nächsten Schritte sind definiert

### Detaillierte Agenda

| Nr. | Agendapunkt | Dauer | Referent |
|-----|-------------|-------|----------|
| 1 | Begrüssung, Erwartungshaltung und Feedback zum Validierungscall | 14:00 – 14:15 | BEI |
| 2 | Regulatorische Fragestellungen aus externer Sicht | 14:15 – 15:00 | BEI / Viktor Györffy |
| 3 | Vorstellung des Open API-Entwurfs (Version 2.0) und Diskussion des Feedbacks aus dem Validierungscall | 15:00 – 15:30 | BEI / Richard |
| 4 | Pause | 15:30 – 15:50 | Alle |
| 5 | Business Case | 15:50 – 16:10 | BEI |
| 6 | Finanzierungsmodelle | 16:10 – 16:40 | BEI |
| 7 | Zusammenfassung Phase 1, Struktur und Planung für nächste Phase 2, Feedback & nächste Schritte | 16:40 – 17:00 | BEI |

## Wichtige rechtliche Kernfragestellungen

**HINWEIS:** Die nachfolgenden Inhalte basieren auf der Expertise externer Rechtsexperten und wurden möglichst 1:1 ohne Änderungen übernommen (ausser grammatikalischen und strukturellen Verbesserungen).

### 1. Mindestanforderungen für Datensätze

**Kategorie:** Rechtlich  
**Thema:** Dataset

**Konkrete Fragestellung:** Welche Mindestanforderungen gelten an die Herausgabe von Datensätzen in Bezug auf Aktualität, Qualität und den Umgang mit Risikoprofilen wie PEP, Sanktionslisten und Hochrisikokunden?

**Rechtliche Einschätzung:** Die herausgegebenen Datensätze werden "as is" übergeben. Allfällige weitere Prüfungen erfolgen durch den Integrator. Eine Stellungnahme seitens FINMA wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

### 2. Haftungsregelung bei fehlerhaften Datensätzen

**Kategorie:** Rechtlich  
**Thema:** Haftung

**Konkrete Fragestellung:** Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden, und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?

**Rechtliche Einschätzung:**
- Die herausgebende Partei wird keine oder begrenzte Haftung bzgl. Aktualität und Richtigkeit der Daten eingehen
- Die Bank, welche die Informationen erhält, bleibt vollumfänglich verantwortlich für die Einhaltung ihrer Sorgfaltspflichten nach GwG und die Richtigkeit und Zulässigkeit der Datenverarbeitung gemäss DSG

### 3. Haftung bei delegiertem Onboarding

**Kategorie:** Rechtlich  
**Thema:** Haftung bei Outsourcing

**Konkrete Fragestellung:** Wie ist die Haftung bei delegiertem Onboarding geregelt, wenn beispielsweise eine Bank das Onboarding eines Dritten an eine andere Bank überträgt? Wer trägt welche Verantwortung?

**Drei mögliche Szenarien:**
- **Fall 1:** Bank B verlässt sich auf die von Bank A durchgeführte Identifikation → Kein Outsourcing (reiner Datenempfang)
- **Fall 2:** Bank B beauftragt Bank A explizit mit der Identifikation → Outsourcing
- **Fall 3:** Bank B nutzt einen KYC-Dienstleister → Outsourcing

### 4. "Identifikation auf Vorrat"

**Kategorie:** Regulatorisch  
**Thema:** Identifikation auf Vorrat

**Konkrete Fragestellung:** Wird das Prinzip einer "Identifikation auf Vorrat" grundsätzlich erlaubt?

**Rechtliche Einschätzung:** Der "VSB-Status" soll auf der Kundenidentifikation abgebildet werden. Es ist zu klären, ob eine bereits durch den Produzenten erfolgte Identifikation übernommen werden kann und ob diese Übernahme als eigenständige Identifikation im Sinne der VSB anerkannt wird. Gegebenenfalls sollte eine Anfrage an die FINMA gestellt werden.

## Compliance-Framework für API-Design

**DISCLAIMER: Wir sind KEINE Fachpersonen im rechtlichen Bereich. Die folgenden Empfehlungen stellen keine Rechtsberatung dar und ersetzen nicht die Konsultation qualifizierter Rechtsexperten.**

### Rechtliche Mindestanforderungen

#### 1. Datenschutz (DSG/GDPR)
```yaml
data_protection_requirements:
  legal_basis:
    - "Einwilligung des Betroffenen (Art. 6 Abs. 1 lit. a DSG)"
    - "Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSG)"
    - "Vertragserfüllung (Art. 6 Abs. 1 lit. b DSG)"
    
  technical_measures:
    - "End-to-End Encryption"
    - "Data Minimization"
    - "Purpose Limitation"
    - "Storage Limitation"
    
  organizational_measures:
    - "Privacy by Design"
    - "Data Protection Impact Assessment (DPIA)"
    - "Data Subject Rights Implementation"
    - "Breach Notification Procedures"
```

#### 2. Bankregulierung (FINMA)
```yaml
banking_regulation_compliance:
  kyc_requirements:
    - "Customer Due Diligence (CDD)"
    - "Enhanced Due Diligence (EDD) für Hochrisikokunden"
    - "Ongoing Monitoring"
    - "Record Keeping"
    
  outsourcing_rules:
    - "FINMA-Rundschreiben 2018/3 Outsourcing"
    - "Wesentliche Funktionen-Definition"
    - "Auslagerungsvertrag-Anforderungen"
    - "Kontroll- und Weisungsrechte"
    
  operational_risk:
    - "Risikomanagement-System"
    - "Business Continuity Planning"
    - "Information Security"
    - "Incident Reporting"
```

#### 3. Vertragsrecht (OR)
```yaml
contract_law_framework:
  participation_agreement:
    - "Teilnahmebedingungen für föderiertes System"
    - "Service Level Agreements (SLA)"
    - "Haftungsbeschränkungen und -ausschlüsse"
    - "Streitbeilegungsmechanismen"
    
  data_sharing_agreement:
    - "Zweckbindung der Datenverwendung"
    - "Datenschutz-Folgenabschätzung"
    - "Löschfristen und -verfahren"
    - "Audit-Rechte und -Pflichten"
    
  liability_allocation:
    - "Verschuldensunabhängige Haftung ausgeschlossen"
    - "Haftungsobergrenzen definiert"
    - "Versicherungsdeckung vorgeschrieben"
    - "Rückgriffsmöglichkeiten geregelt"
```

### Empfohlene Governance-Struktur

#### 1. Legal Compliance Committee
```yaml
compliance_governance:
  composition:
    - "Chief Legal Officer (CLO)"
    - "Data Protection Officer (DPO)"
    - "Chief Risk Officer (CRO)"
    - "External Legal Counsel"
    
  responsibilities:
    - "Regulatory change monitoring"
    - "Compliance risk assessment"
    - "Policy development and updates"
    - "Training and awareness programs"
    
  meeting_frequency:
    - "Monthly compliance reviews"
    - "Quarterly risk assessments"
    - "Annual legal framework updates"
    - "Ad-hoc emergency sessions"
```

#### 2. Regulatory Engagement Strategy
```yaml
regulatory_engagement:
  finma_consultation:
    timing: "Frühzeitige Konsultation vor Markteinführung"
    approach: "Konstruktive Zusammenarbeit statt reaktive Compliance"
    outcome: "FINMA-Guidance oder Rundschreiben zu Open Banking"
    
  industry_collaboration:
    role: "Aktive Teilnahme an Branchenverbänden"
    standards: "Mitentwicklung von Industry Standards"
    lobbying: "Koordinierte Interessenvertretung"
    
  international_coordination:
    eu_alignment: "Beobachtung EU-Entwicklungen"
    bilateral_cooperation: "Zusammenarbeit mit anderen Jurisdiktionen"
    standard_setting: "Beteiligung an internationalen Standards"
```

### Offene rechtliche Fragestellungen

**Die folgenden Fragen müssen zu späterem Zeitpunkt noch geklärt werden:**

#### 1. Regulatorische Unsicherheiten
- Genaue Abgrenzung zwischen Datennutzung und Outsourcing bei wiederverwendeten Identifikationen
- FINMA-Position zu "Identifikation auf Vorrat" und deren regulatorischen Anforderungen
- Internationale Anerkennung schweizerischer Open Banking Standards

#### 2. Haftungsrechtliche Grauzonen
- Verteilung der Haftung bei fehlerhaften Identifikationsdaten zwischen Produzent und Integrator
- Haftung bei Datenschutzverletzungen in einem föderierten System
- Versicherungsrechtliche Abdeckung neuer Technologierisiken

#### 3. Technisch-rechtliche Schnittstellen
- Rechtsgültigkeit digitaler Consent-Mechanismen
- Beweiskraft von API-Logs vor Gericht
- Rechtliche Anforderungen an Verschlüsselung und Schlüsselmanagement

### Strategische Empfehlungen

#### 1. Proaktiver Regulatorischer Ansatz
**Empfehlung:** Frühzeitige und kontinuierliche Konsultation mit FINMA und anderen Regulatoren, um rechtliche Unsicherheiten zu minimieren und regulatorische Akzeptanz zu fördern.

#### 2. Comprehensive Legal Framework
**Empfehlung:** Entwicklung eines umfassenden rechtlichen Rahmenwerks, das alle Aspekte des föderierten Systems abdeckt und als Modell für andere Jurisdiktionen dienen kann.

#### 3. Industry Leadership
**Empfehlung:** Positionierung der Schweiz als Vorreiter für europäische Open Banking Standards durch aktive Beteiligung an internationalen Standardisierungsprozessen.

---

**Vollversion des Fragenkatalogs verfügbar unter:** Fragenkatalog Open API Kundenbeziehung_konsolidiert.xlsx

**Quelle:** Rechtliches und Regulatorisches.pdf