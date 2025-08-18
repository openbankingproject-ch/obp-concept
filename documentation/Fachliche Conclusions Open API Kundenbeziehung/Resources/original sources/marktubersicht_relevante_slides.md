# OBP Marktübersicht - Relevante Slides

**Koordiniert von:** Business Engineering Institute St.Gallen

## Marktübersicht Struktur

### Marktanalyse
- **Detaillierte Ergebnisse:** Marktanalyse (Excel «Marktanalyse»)
- **Rechtliche und Regulatorische Rahmenbedingungen**
- **Erste Use Case Sammlung**
- **Ecosystem Wheel**

### Von der Marktanalyse zum priorisierten Umsetzungspfad - Schlüsselergebnisse aus Workshop 01

#### WS1 – Referenzprozess verifizieren
**Vorstellung der Analyse & Marktscreening:**
- Konkretisierung, Bewertung und Priorisierung relevanter Use Cases
- Initial Diskussion zum Umsetzungsszenario als Teil des Zielbildes

#### Ausgewählte Ergebnisse
- **Berücksichtigung der Marktanalyse** für Ausprägungsoptionen des föderierten Systems sowie der Nutzung internationaler De-facto-Standards (z. B. JSON als Datenformat, RESTful API als Architekturstil)
- **16 Use Cases identifiziert und bewertet**
- **4 priorisierte Use Cases vertieft analysiert** hinsichtlich Marktsicht und Umsetzbarkeit
- **Priorisierter Use Case:** (Bank-) Kundenbeziehungseröffnung
- **MVP "Identifikation"** als fokussierter Startpunkt zur Umsetzung

### Use Case Priorisierung

| Rang | Use Case | Beschreibung | Punkte |
|------|----------|-------------|--------|
| 1 | Bankverhältnis/Kontoeröffnung | Wiederverwendung von sämtlichen, für eine Kundeneröffnung bei einer Bank relevanten Datenpunkte | 13 Punkte |
| 2 | Re-Identifikation | Wiederverwendung von relevanten Identifikationsdaten | 7 Punkte |
| 3 | Altersverifikation | Wiederverwendung des Datenpunkts «Geburtsdatum» oder Teilen (z.B. «18+», «16+») zum Beispiel für den Kauf von Alkohol im E-Commerce | 4 Punkte |
| 4 | EWV Use Case | Wiederverwendung von relevanten Datenpunkten aus der externen Vermögensverwaltung | 4 Punkte |
| 5 | Mietvertrag | Wiederverwendung von relevanten Datenpunkten für den Abschluss eines Mietvertrages | 2 Punkte |
| 6 | Leasing, Privatkredit | Wiederverwendung von relevanten Datenpunkten zum Abschluss eines Leasings oder Konsumkredits | 2 Punkte |
| 7 | Anti-Scam | Wiederverwendung von relevanten Datenpunkten zur Warnung bei Arzttüren im Spital | 1 Punkt |
| 8 | Re-Identifikation | Wiederverwendung von sämtlichen, für eine Kundeneröffnung bei einer Bank relevanten Datenpunkte | 1 Punkt |
| 9 | -- | -- | -- |

## Rechtliche und Regulatorische Rahmenbedingungen

**Status:** TBD – im Kontext der Marktanalyse so noch nicht ausgearbeitet!

## Tier-Struktur für Partnerschaften

### Erste Indikationen für mögliche Partnerschaften für die Use Cases im Ökosystem der Open API Kundenbeziehung

**Tier 1:** Kernpartner
**Tier 2:** Erweiterte Partner  
**Tier 3:** Weitere Teilnehmer  
**Tier 4:** Interessenten  
**Tier 5:** Community

### Ecosysteme
- **Banking**
- **Insurance**
- **Konsum**
- **Wohnen**
- **Mobilität**
- **Gesundheit**
- **Service Public**
- **Telekommunikation**

**Quelle:** PostFinance

## Zielbilder

Die Zielbilder 1 bis 4 verfolgen eine treuhänderische Datenweitergabe durch den Produzenten (z.B. Bank) im Auftrag und mit dem Consent des Kunden. Im Zielbild 5 läuft der gesamte Datenaustausch über den Endkunden (Holder), der Produzent (Issuer) kann dabei nicht nachvollziehen, wo und wie häufig die ausgestellten Datenpunkte genutzt werden. In den folgenden Slides 14 bis 21 erfolgt eine detaillierte Beschreibung der Zielbilder 1 bis 5. Zusätzlich steht die Frage im Raum, wie sich das Verhältnis zwischen den Banken und ihren Kunden in den Zielbildern 1-4 vs. Zielbild 5 verändert? In diese Frage wird im Rahmen des Community Workshops am 19.03.2025 aufgenommen.

### Weitere besprochene Themen

#### Zusammenspiel zwischen E-ID und Open API
Die Frage wurde gestellt, wie die E-ID mit der Open API zusammenwirken soll. In der Diskussion wurde klargestellt, dass die Daten zwar bei der Bank liegen, die Datenhoheit jedoch zukünftig beim Kunden liegen wird. Dies betrifft insbesondere auch den «Consent-Prozess», da der Kunde künftig selbst über die Weitergabe seiner Daten entscheiden kann. Besonders im 5. Zielbild spielt diese Datenhoheit und die Zustimmung eine zentrale Rolle.

#### Herausforderungen bei der Einführung der E-ID
Es wurde diskutiert, welche Herausforderungen mit der Einführung der E-ID verbunden sind. Dabei wurden folgende Punkte thematisiert:
- Falls der biometrische Ausweis als Voraussetzung für die E-ID erforderlich ist, könnte dies die Einführung erschweren
- Es müssen nutzererzeugende Anwendungsfälle ("Killer Use Cases") entwickelt werden, um die Akzeptanz zu erhöhen. Ein Beispiel könnte das digitale Wahlrecht sein
- Es besteht Unklarheit darüber, welche regulatorischen Anforderungen von der FINMA festgelegt werden oder künftig relevant sein könnten
- Fragen zur Haftung und zur Anzahl der erforderlichen Sicherheitsfaktoren sind noch offen
- Zudem wurde das sogenannte Stellvertreterproblem thematisiert, das ebenfalls eine Herausforderung für die Implementierung der E-ID darstellt

#### Notwendigkeit einer zweiten Lösung neben E-ID
Es wurde die Frage gestellt, ob es sinnvoll sei, eine zweite Lösung parallel zur E-ID aufzubauen. Es wurde argumentiert, dass es derzeit wenig sinnvoll erscheint, wenn jedes Unternehmen für jede Person eigene Identifikationen selbst vornimmt. Zudem wurde klargestellt, dass die Einführung der E-ID noch lange dauern wird, jedoch bereits heute darauf geachtet werden muss, dass die zukünftigen Lösungen mit der E-ID kompatibel sind. Fazit: Vor diesem Hintergrund war der Tenor zu entnehmen, dass eine "hybride Lösung" speziell vor dem ökonomischen Hintergrund zahlreichen "unnötigen Verifizierungen" sinnvoll ist und eine Lösung in Form der Open API Kundenbeziehung eine relevante Lösung darstellt.

---

**Quelle:** OBP Marktuebersicht relevante slides.pdf