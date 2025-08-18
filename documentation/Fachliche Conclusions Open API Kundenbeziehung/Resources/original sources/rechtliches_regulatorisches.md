# Open Banking Project CH - Rechtliches und Regulatorisches

**Quelle**: Rechtliches und Regulatorisches.pdf  
**Koordiniert von**: Business Engineering Institute St. Gallen  
**Externes Gutachten**: Viktor Györffy  
**Workshop**: WS 2025/4 "Validierung Open API & nächste Phase" (11.06.2025)

---

## Überblick

Die rechtlichen und regulatorischen Aspekte der Open API Kundenbeziehung wurden umfassend analysiert und durch ein externes Gutachten validiert. Das zentrale Ergebnis: **Für die Open API bestehen aus juristischer Sicht keine grundlegenden Hürden**. Die Dokumentation strukturiert sich in drei Hauptkategorien von Fragestellungen: Regulatorisch, Rechtlich und Sonstige.

---

## Workshop-Agenda WS 2025/4 "Validierung Open API & nächste Phase"

**Datum**: 11. Juni 2025, 14:00-17:00 Uhr

### Erreichte Ziele
- ✓ Der Entwurf für die Open API Version 2.0 wurde vorgestellt und diskutiert
- ✓ Die rechtlichen und regulatorischen Aspekte und Lösungen sind diskutiert und Lösungsoptionen sind aufgezeigt
- ✓ Die Whitepaper-Version 2.0 zum Business Case wurde vorgestellt und weiteres Feedback dazu eingeholt
- ✓ Mögliche Finanzierungs- und Monetarisierungsmodelle wurden aufgezeigt
- ✓ Feedback zu Phase 1 wurde eingeholt, die Strukturierung und Planung der Phase 2 wurde vorgestellt und die nächsten Schritte sind definiert

### Detaillierte Agenda

| Nr. | Agendapunkt | Dauer | Referent |
|-----|-------------|-------|----------|
| 1 | Begrüssung, Erwartungshaltung und Feedback zum Validierungscall | 14:00 – 14:15 | BEI |
| 2 | **Regulatorische Fragestellungen aus externer Sicht** | 14:15 – 15:00 | **BEI/Viktor Györffy** |
| 3 | Vorstellung des Open API-Entwurfs (Version 2.0) und Diskussion des Feedbacks aus dem Validierungscall | 15:00 – 15:30 | BEI/Richard |
| 4 | Pause | 15:30– 15:50 | Alle |
| 5 | Business Case | 15:50 – 16:10 | BEI |
| 6 | Finanzierungsmodelle | 16:10 – 16:40 | BEI |
| 7 | Zusammenfassung Phase 1, Struktur und Planung für nächste Phase 2, Feedback & nächste Schritte | 16:40 – 17:00 | BEI |

---

## Identifikation offener regulatorischer, rechtlicher und sonstiger Fragestellungen

### Regulatorische Fragestellungen

#### 1. Identifikation auf Vorrat
**Fragestellung**: Wird das Prinzip einer "Identifikation auf Vorrat" grundsätzlich erlaubt? (das bedeutet, ein neues Onboarding mit allenfalls nicht mehr gültigen Dokumenten wäre erlaubt - z.B. bei Ausweis gestohlen, Namensänderung bei Heirat etc.)

**Zusätzliche Aspekte**:
- Welche Arten der Identifikation sollen weitergegeben werden können (z.B. nur Online/Video Ident.)?
- Definition Dauer, wie lange eine Identifikation wiederverwendet werden kann

#### 2. Details zu Ausweisen
**Kritische Punkte**:
- **Gültigkeit für Wiederverwendung relevant?**
- **Zugelassene Ausweisarten**
- **Umgang mit Ausländern/Ausländerausweis nötig?**

#### 3. Out of Scope Kundengruppen
**Fragestellung**: Festlegung von «out of Scope» Kundengruppen (z.B. Workout/Recovery Positionen, Kunden mit MROS Meldungen, etc.) vor Datenweitergabe, oder danach durch neue Bank?

**Spezifische Kundengruppen**:
- Workout/Recovery Positionen
- Kunden mit MROS Meldungen
- Sanktionierte Kunden
- Generell als unerwünscht eingestufte Kunden

### Rechtliche Fragestellungen

#### 1. Dataset - Mindestanforderungen
**Konkrete Fragestellung**: Welche Mindestanforderungen gelten an die Herausgabe von Datensätzen in Bezug auf Aktualität, Qualität und den Umgang mit Risikoprofilen wie PEP, Sanktionslisten und Hochrisikokunden?

#### 2. Haftung bei fehlerhaften Datensätzen
**Konkrete Fragestellung**: Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden, und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?

#### 3. Haftung bei Outsourcing
**Konkrete Fragestellung**: Wie ist die Haftung bei delegiertem Onboarding geregelt, wenn beispielsweise eine Bank das Onboarding eines Dritten an eine andere Bank überträgt? Wer trägt welche Verantwortung?

#### 4. Haftung bei Online Identifikation
**Konkrete Fragestellung**: Haftung bei Online Ident. im Zusammenhang mit Ersteinzahlungen: Wer haftet wofür (da Identifikation aus Bestandteilen von Drittanbieter und Bank besteht)

#### 5. Outsourcing-Behandlung wiederverwendeter Identifikationen
**Konkrete Fragestellung**: Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden?

**Ersteinschätzung Legal**: Weitergabe nur mit Disclaimer/ohne Haftbarkeit

### Sonstige Fragestellungen

#### 1. Risikoexponierung
**Fragestellung**: Interesse der Bank an einer Identifikation ohne Sicherheit der Aktualität/Qualität überhaupt gegeben?

**Risikoabwägung**: Falls kein grösseres Risiko in Kauf genommen werden möchte, bedeutet dies eine enge Überprüfung der Fälle, was wiederum die Vorteile einer Wiederverwendung zunichte machen würde.

#### 2. Wirtschaftlichkeit
**Fragestellung**: Lohnt sich der Aufwand und die Kosten für die Einführung und Unterhalt eines weiteren Identifikationskanals für eine Bank?

---

## Stellungnahmen der Stakeholder

### Business Engineering Institute (BEI)

#### Mindestanforderungen für Datensätze
**Position**: Annahme: Die herausgegebenen Datensätze werden «as is» übergeben. Allfällige weitere Prüfungen erfolgen durch den Integrator.

**Begründung**: Warum werden keine Effizientgewinne erzielt? Die Identifikation wurde ja durchgeführt. Ergänzungen aufgrund Risikoapproach sind Zusatzaufwände des Integrators. Prüfen mit YUH Case.

**FINMA-Einbindung**: Ist eine Einbindung der FINMA wünschenswert und erforderlich, und wenn ja, ab wann sollte sie erfolgen?

#### Out of Scope Kundengruppen
**Position**: Anmerkung: Kundenselektion sollte nicht beim Produzent liegen.

**Begründung**: Der Produzent filtert nicht und darf auch nicht darüber informieren, welcher Status oder Zustand der Kunde hat. Der Integrator muss die Prüfung durchführen aufgrund seiner Kriterien (individueller Risikoapproach).

### Hypothekarbank Lenzburg (HBL)

#### Mindestanforderungen für Datensätze
**Position**: Herausgabe: Einverständnis des Kunden bezüglich Datenschutz und Bankkundengeheimnis nötig.

**Datenprüfung**: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

#### Out of Scope Kundengruppen
**Position**: Grundsätzlich out of Scope Definition beim Integrator. Ausser im Zusammenhang mit allfälligen Mindestanforderungen zur Wiederverwendung der Identifikation.

**Beispiel**: Identifikation nur wiederverwendbar, wenn Ausweis noch nicht abgelaufen ist würde bedeuten, dass dies ein Kriterium sein sollte, damit das Datenset überhaupt zur Verfügung steht.

**Kritische Kundengruppen**:
- Sanktionierte Kunden
- MROS-Meldungen
- Generell als unerwünscht eingestufte Kunden

**Rechtliche Frage**: Darf die Bank überhaupt einer Drittbank mitteilen, dass gewisse Kunden als unerwünscht eingestuft wurden?

### PostFinance (PF)
**Status**: Stellungnahmen TBD (To Be Determined)

### Intrum

#### Mindestanforderungen für Datensätze
**Position**: Zur Beantwortung dieser Frage benötige ich mehr Angaben zu den Datensätzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Geschäftsgeheimnisse zu beachten und gebührend zu berücksichtigen.

#### Datenprodukte-Grundsätze
**Referenz**: Bundeskanzlei, Bausteine von Datenräumen – Datenökosystem Schweiz, Ziffer 3.2.3

**Definition**: "Datenprodukte bündeln Ressourcen (z.B. Datensätze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsfälle zu realisieren. Datenprodukte werden von Datenanbietenden oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement ermöglicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte."

#### Out of Scope Kundengruppen
**Status**: TBD

---

## Externes Gutachten - Zentrale Erkenntnisse

### Externe rechtliche Bewertung durch Viktor Györffy

**Hauptergebnis**: Externes rechtliches Gutachten bestätigt: **Für die Open API bestehen aus juristischer Sicht keine grundlegenden Hürden**.

### Validierung und Identifikation - Rechtliche Rahmenbedingungen

#### Kernproblem
Es muss geprüft werden, wie bzw. ob eine Überprüfung und finale Validierung der übergebenen Daten erfolgen soll.

**Effizienz-Dilemma**: Sobald manuelle Prüfschritte notwendig werden, verliert das gesamte API-Vorhaben deutlich an Attraktivität und Effizienz.

**Umfang**: Dabei geht es nicht nur um die reine Identifikation, sondern auch um die Gesamtdatenlage.

#### Praxis-Beispiel: YUH
**Bewährte Praxis**: Das Beispiel YUH zeigt jedoch, dass die Identifikation ohne weitere Prüfung übernommen wird. Risikobasiert wird bei YUH allenfalls zusätzlich eine Überprüfung vorgenommen, ist jedoch selten der Fall.

#### Lösungsansatz
**FINMA-Position**: Die FINMA wird voraussichtlich keine detaillierte Vorgabe zur Haftungsverteilung machen.

**Empfehlung**: Eine unabhängige rechtliche Einschätzung wäre daher hilfreich, um diese Frage zu klären.

**Vorschlag**: Die Fragestellung an Vigi zur weiteren Prüfung weiterleiten.

---

## Compliance und Regulatorische Erfüllung

### Zusammenfassung: Einhaltung regulatorischen Vorgaben erfüllt

#### Durchgeführte Compliance-Maßnahmen

**KYC Check**: Einen KYC Check vom Zahlungspflichtigen gemacht

**FINMA Aufsichtsmitteilung 02/2019**: Die Transaktion nach den Vorgaben der FINMA Aufsichtsmitteilung 02/2019 durchgeführt

#### Spezifische Compliance-Maßnahmen

**Travel Rule**: Die Travel Rule wurde eingehalten, der Dritte (in unserem Fall der Sender der VA) wurde wie ein eigener Kunde identifiziert

**WB-Feststellung**: WB-Feststellung durch QES der Angaben wie bei einem Neukunden-Onboarding

**Verfügungsmacht**: Verfügungsmacht des Dritten wurde mit geeigneten technischen Mitteln festgestellt durch seinen Zugriff auf Private Key und Kenntnis des Splitgeheimnisses

**Transaktions-Timing**: Die Transaktion erst nach Einhaltung der ersten drei Punkte ausgeführt wurde

**CCC Check**: Auch wurde CCC Check vor der Überweisung durchgeführt, um Indizien auf kriminelle Aktivität in der Transaktionskette zu prüfen

---

## Vertragliche Vereinbarungen und Datenraumgouvernanz

### Referenz: Bundeskanzlei Datenökosystem Schweiz

**Grundprinzip**: Vertragliche Vereinbarungen stellen sicher, dass die mehrfache Datennutzung vertrauenswürdig und sicher ist, und verhindern den Missbrauch von Daten.

### Ebenen vertraglicher Vereinbarungen

#### Auf Ebene Datenraum
- **Allgemeine Teilnahmebedingungen**: Für alle Datenraumteilnehmenden gleichermassen durch ihre Teilnahme verbindlich
- **Service Level Agreements (SLA)**: Operative Vereinbarungen

#### Auf Ebene Anwendungsfall
- **Teilnahmevereinbarung für spezifische Anwendungsfälle**: Fallspezifische Regelungen

#### Auf Ebene Datentransaktion
- **Datentransaktionsvereinbarung**: Einzeltransaktions-Regelungen
- **Datennutzungsvertrag**: Umfassende Nutzungsvereinbarungen

---

## Rechtliche Rahmenbedingungen im Schweizer Kontext

### Schweizer Finanzmarkt-Regulatorik

#### Datenschutzgesetz (nDSG)
- **Kundenidentifizierende Daten** gelten als Personendaten
- **Austausch zulässig** wenn:
  - Gesetzliche Grundlage vorhanden (hier nicht gegeben)
  - Überwiegendes privates Interesse (hier nicht gegeben)
  - **Einwilligung** gegeben ist

#### Bankkundengeheimnis
- **Bankkundendaten** unterliegen dem Bankgeheimnis
- **Weitergabe** nur mit ausdrücklicher Einwilligung des Kunden erlaubt

#### FINMA Rundschreiben 2016/7: Video- und Online-Identifizierung
- **Art 28 und 29 GwV-FINMA**: Finanzintermediäre dürfen andere Unternehmungen mit der Durchführung der Identifizierung beauftragen
- **Praktische Relevanz**: Dies entspricht der aktuellen Praxis (z.B. Intrum für Banken)
- **Vertragsgrundlage**: Könnte als Basis für Verträge zwischen Banken dienen

#### Geldwäschereigesetz (GwG)
- **Art. 3**: Identifizierung der Vertragspartei
- **Art. 4**: Feststellung der wirtschaftlich berechtigten Person

---

## Risikomanagement und Haftungsverteilung

### Haftungsmodelle

#### Grundsatz der Haftungsverteilung
**Herausgebende Partei**: Wird keine oder begrenzte Haftung bzgl. Aktualität und Richtigkeit der Daten eingehen

**Empfangende Bank**: Bleibt vollumfänglich verantwortlich für:
- Einhaltung ihrer Sorgfaltspflichten nach GwG
- Richtigkeit und Zulässigkeit der Datenverarbeitung gemäss DSG

#### Vertragliche Absicherung zwischen Banken

**Haftungsklausel**:
- Wer haftet bei fehlerhaften oder unvollständigen Daten?
- Wer trägt die Verantwortung bei Missbrauch, Betrug oder Compliance-Verstösse?
- Gibt es Rückgriffsmöglichkeiten?

**Sorgfaltspflichten**:
- Herausgebende Bank muss zusichern, dass die Identifikation vollständig, aktuell und konform erstellt ist
- Dokumente müssen revisionssicher gespeichert und vollständig zur Verfügung gestellt werden

### Outsourcing-Szenarien

#### Fall 1: Reliance-Modell
**Bank B** verlässt sich auf die von **Bank A** durchgeführte Identifikation. Bank B nutzt die Daten, übernimmt aber selbst die Verantwortung.
- **Rechtliche Einordnung**: Kein Outsourcing (sondern reiner Datenempfang)
- **Verantwortung**: Bank A wird nicht im Auftrag von Bank B tätig
- **Vertragsgestaltung**: Vertraglich zwischen den beiden Banken regeln, aber ohne Delegation der Funktion

#### Fall 2: Expliziter Auftrag
**Bank B** beauftragt **Bank A** explizit mit der Identifikation von Kunden im Namen und auf Rechnung der Bank B.
- **Rechtliche Einordnung**: Outsourcing
- **Verantwortung**: Bank A wird als Dienstleister tätig, Bank B delegiert eine bankrechtlich wesentliche Funktion

#### Fall 3: KYC-Dienstleister
**Bank B** nutzt einen KYC-Dienstleister (z. B. IDnow, Intrum, Swisscom), der Kunden im Namen der Bank identifiziert.
- **Rechtliche Einordnung**: Outsourcing (gilt auch bei Drittanbietern)

### Outsourcing-Anforderungen bei Entscheidung für Fall 2 oder 3

**Vertragsabschluss**: Vertrag über die Auslagerung abschliessen (inkl. Weisungsrecht, Kontrollrechte etc.)

**Governance**: Risikobeurteilung und Outsourcing-Governance etablieren

**FINMA-Meldung**: Meldung an die FINMA (wenn die Funktion wesentlich ist)

**DSG-Konformität**: DSG-konforme Vereinbarung zur Auftragsbearbeitung abschliessen

**Eignung**: Sicherstellen, dass der Dienstleister technisch und organisatorisch geeignet ist

---

## Compliance-Framework für API-Design

**Disclaimer**: Die folgenden Empfehlungen stellen keine Rechtsberatung dar, da das BEI und die Projektpartner keine Fachpersonen im rechtlichen Bereich sind.

### Grundprinzipien

#### 1. Consent-First Approach
- **Explizite Einverständniserklärung** für jeden Datentransfer
- **Granulare Berechtigungen** pro Datenkategorie
- **Nachvollziehbare Dokumentation** aller Consent-Ereignisse

#### 2. Datenschutz by Design
- **Datenminimierung**: Nur notwendige Daten übertragen
- **Zweckbindung**: Datenverwendung nur für angegebenen Zweck
- **Löschkonzepte**: Definierte Aufbewahrungsfristen

#### 3. Sicherheit by Design
- **End-to-End Verschlüsselung** für alle Datenübertragungen
- **mTLS 1.3** für API-Kommunikation
- **Revisionssichere Protokollierung** aller Transaktionen

#### 4. Transparenz und Nachvollziehbarkeit
- **Vollständige Audit-Trails** für alle Systeminteraktionen
- **Compliance-Reports** für regulatorische Überprüfungen
- **Dokumentation** aller Prozesse und Entscheidungen

---

## Offene Fragestellungen und nächste Schritte

### Priorisierte rechtliche Klärungen

#### 1. FINMA-Stellungnahme
**Bedarf**: Stellungnahme seitens FINMA zur Haftungsverteilung und Mindestanforderungen

**Zeitrahmen**: Vor Phase 2 Implementation

**Verantwortlichkeit**: BEI in Koordination mit allen Partnern

#### 2. Vigi-Analyse
**Auftrag**: Detaillierte rechtliche Prüfung durch unabhängige Experten

**Fokus**: Haftungsverteilung und vertragliche Gestaltung

**Zeitrahmen**: Q2 2025

#### 3. Vertragswerk zwischen Banken
**Entwicklung**: Musterverträge für verschiedene Kooperationsmodelle

**Inhalte**:
- Haftungsklauseln
- Sorgfaltspflichten
- Consent-Management
- Audit-Rechte

### Regulatorische Roadmap

#### Kurzfristig (Q2 2025)
- Externe rechtliche Validierung abschliessen
- Mustervertragswerk entwickeln
- FINMA-Dialog initiieren

#### Mittelfristig (Q3-Q4 2025)
- Pilotbetrieb mit rechtlicher Begleitung
- Compliance-Testing
- Regulatorische Feedback-Integration

#### Langfristig (2026+)
- Etablierung als Branchenstandard
- Mögliche Kodifizierung in Selbstregulierung
- Internationale Anschlussfähigkeit

---

## Fazit und Empfehlungen

### Zentrale Erkenntnisse

**Rechtliche Machbarkeit**: Das externe Gutachten bestätigt, dass für die Open API Kundenbeziehung aus juristischer Sicht keine grundlegenden Hürden bestehen.

**Haftungsmodell**: Ein "Reliance-Modell" (Fall 1) ohne Outsourcing-Charakter ist rechtlich der sicherste Weg für die MVP-Phase.

**Compliance-Konformität**: Bei ordnungsgemässer Umsetzung können alle relevanten regulatorischen Anforderungen erfüllt werden.

### Strategische Empfehlungen

#### 1. MVP-Phase: Risikoarme Implementation
- **Start mit Fall 1** (Reliance-Modell)
- **Fokus auf explizite Kundeneinverständnisse**
- **Umfassende Dokumentation** aller Prozesse

#### 2. Rechtliche Begleitung
- **Kontinuierliche rechtliche Beratung** während der Implementation
- **Regelmässige Compliance-Reviews**
- **Proaktiver Dialog** mit regulatorischen Behörden

#### 3. Vertragsgestaltung
- **Klare Haftungsabgrenzung** zwischen den Partnern
- **Umfassende Disclaimer** für datenliefernde Banken
- **Detaillierte SLAs** für technische und operative Aspekte

#### 4. Skalierungsstrategie
- **Schrittweise Erweiterung** nach erfolgreichem MVP
- **Integration zusätzlicher Partner** unter bewährtem rechtlichen Rahmen
- **Entwicklung zum Branchenstandard** mit regulatorischer Begleitung

---

**Dokumentstand**: Vollständige Erfassung aller rechtlichen und regulatorischen Aspekte  
**Externe Validierung**: Viktor Györffy Gutachten  
**Status**: Rechtliche Machbarkeit bestätigt - keine grundlegenden Hürden  
**Nächste Schritte**: Vertragswerk-Entwicklung und FINMA-Dialog  
**Vollversion des Fragenkatalogs**: Fragenkatalog Open API Kundenbeziehung_konsolidiert.xlsx