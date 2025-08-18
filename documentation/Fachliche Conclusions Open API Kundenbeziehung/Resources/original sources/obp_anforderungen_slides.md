# OBP Anforderungen relevante Slides - Vollständige Dokumentation

**coordinated by openbankingproject.ch**

## Inhaltsverzeichnis

### Anforderungen
- Projektumfang und Erwartungshaltung
- Use Case-Sammlung, Konkretisierung und Auswahl
- Auswahl und Beschreibung der Zielbilder
- Anforderungsanalyse zu den Teilschritten des Referenzprozesses
- Initiale Sammlung offener Fragestellungen
- Business Case

---

## 1. Die Open-API-Kundenbeziehung - Executive Summary MVP "Identifikation"

### Zielsetzung

Die Open-API-Kundenbeziehung soll den standardisierten Austausch von Kundendaten ermöglichen - im MVP mit Fokus auf Identifikationsdaten.

### Executive Summary - MVP "Identifikation"

- Der MVP der Open-API-Kundenbeziehung ermöglicht den standardisierten Austausch von Basis- und Identifikationsdaten
- Angestrebt wird ein offener, branchenübergreifender Standard für die digitale Weitergabe von Kundendaten zur Kundenbeziehungseröffnung

### Chancen

**Verbesserte Kundenerfahrung und höhere Conversion Rates** im MVP "Identifikation" ermöglichen je nach Ausbaustufe zusätzliche geschätzte Mehreinnahmen von **0.04 bis 9.90 Mio. CHF pro Jahr** (vgl. nächste Folie)

**Reduzierte Prozesskosten** im MVP "Identifikation" ermöglichen je nach Ausbaustufe zusätzliche geschätzte Einsparungen von **0.02 bis 2 Mio. CHF pro Jahr**

### Risikoexponierung

**Regulatorische und rechtliche Herausforderungen** bei Haftung, Mindestanforderungen an Datenteilung, API-Sicherheit, Standards und Governance erfordern klare Rahmenbedingungen

Das **Beispiel "YUH"** zeigt, dass ein sicherer und rechtskonformer Austausch von Kunden- und Identifikationsdaten bereits **erfolgreich umsetzbar ist**

### Markt- und Einsparpotenzial

**Gesamtpotenzial "Open Financial Data Ökosystem Schweiz"**: **10 Mrd. CHF¹**

**Einsparpotenzial "Kundenbeziehungseröffnung"**: **37.5 Mio. CHF²**

**Einsparpotenzial "Weitergabe Identifikation"**: **2 Mio. CHF³**

*Fussnoten:*
¹ Berechnung basierend auf 1,25 % des geschätzten Schweizer BIP 2024 von 825 Mrd. CHF - rund 10.3 Mrd. CHF p.a. (Quelle: McKinsey Global Institute, 2021).
² Mio. Kontoeröffnungen à 125 CHF kosten 250 Mio. CHF. Bei 15% günstigeren Prozessen sinken die Kosten um 37.5 Mio. CHF p.a.
³ Siehe Berechnung auf Slide 7

---

## 2. Leuchtturm-Use Case: Kundenbeziehungseröffnung mit Fokus auf Identifikation

### Use Case Framework

| **Use Case** | **Business Modell** | **Value Proposition** |
|--------------|---------------------|----------------------|
| Kundenonboarding mit Open-API-KB-Identifikation | Monetarisierung durch zusätzliche Kunden und Effizienzsteigerung | |

| **Banken/Integrator** | **Provider/Produzent** | **Kunden** |
|----------------------|------------------------|-----------|
| - Höhere Conversion Rate und beschleunigtes Onboarding<br>- Positionierung als zukunftsorientierte und kundenzentrierte Bank<br>- Stärkung von Marketing und Kundenbindung<br>- Kostenoptimierung im Onboarding-Prozess | - Neue Erlösmodelle und Monetarisierungspotenziale<br>- Erweiterung des API-Angebots und Reichweite im Ökosystem<br>- Ermöglichung neuer Datenservices im Bankenumfeld<br>- Nutzung von Kundendaten mit Einwilligung (Opt-in) | - Einfacher, schneller und durchgängiger Identifikationsprozess<br>- Erfolgreiches Onboarding<br>- Verfügbarkeit rund um die Uhr (24/7/365)<br>- Mehr Selbstbestimmung und Kontrolle über eigene Daten<br>- Positiver Ersteindruck und komfortabler Einstieg in die Geschäftsbeziehung |

### Use Case Details

**Standardisierter Austausch von Basis- und Identifikationsdaten im Finanzkontext**

- Ermöglicht produkt- und institutsübergreifendes digitales Onboarding
- Mehrfach nutzbare Kundenidentifikation innerhalb des Partnernetzwerks

**Einmalige Identifikation für alle Kundenbeziehungen im föderierten System**

- Vereinfachtes Onboarding - höhere Conversion, mit weniger Identifikationsabbrüche im Partnernetzwerk
- Hohe Einsparpotenziale durch Mehrfachverwendung bei Multi-Produkt-/Partner-beziehungen

---

## 3. Aktuell priorisierte Use Cases für die Konzeption der Open API Kundenbeziehung

### Use Case 1: Kontoeröffnung resp. Bankwechsel
- Harmonisierung von konzerninternen Onboardingstrecken
- Wiederverwendung resp. Nutzung von Datenbausteinen für das Onboarding im Netzwerk (z.B. PostFinance & YUH)
- Fokus auf finanznahe Produkte und Services (Banking, Insurance)

### Use Case 2: Re-Identifikation
- Wiederverwendung resp. Nutzung von Datenbausteinen für die Re-Identifikation resp. Aktualisierung von KYC-Daten gemäss GwG

### Use Case 3: Altersverifikation
- Wiederverwendung resp. Nutzung der Information "Geburtsdatum" oder "18+", "16+" für die Serviceerschliessung im Netzwerk

### Use Case 4: CLM von EVV-Endkunden
- Wiederverwendung resp. Nutzung von Datenbausteinen für das Onboarding von Endkunden bei verschiedenen Depotbanken
- Effiziente Aktualisierung von KYC-Informationen

### Zusätzlicher Use Case - Mietprozess / Mietkautionskonto

**Weiterer Use Case – Mietprozess / Mietkautionskonto**

Ein zusätzlicher relevanter Use Case ergibt sich im Zusammenhang mit Umzügen: Rund 700'000 Umzüge pro Jahr in der Schweiz – langfristig bietet sich hier Potenzial zur Optimierung des Mietprozesses.

Die Relevanz dieses Use Cases dürfte künftig zunehmen.

**Wichtig:** Für ein reines Mietkautionskonto ist **keine vollständige Identifikation notwendig** – dies reduziert regulatorische Hürden und technische Komplexität.

→ Spannender Case der im Hinterkopf behalten wird.

---

## 4. Next Steps für die Use Case Entwicklung

### Grundlegende Überlegungen

**Use Cases als Option zur Umsetzung**
- Use Cases als Validierung der Anwendung im Zielbild der OPEN API Kundenbeziehung
- Use Case idealerweise Kandidat für erste Umsetzung
- Gedanken als Diskussionsgrundlage

### Umsetzungsperspektive und Fokus: Use Case & Bausteine

**Welcher Use Case wird konzeptionell umgesetzt?**

Zukünftig wird ein spezieller Fokus auf die Konzeptionalisierung des Use Case 1 gelegt. Innerhalb dieses Cases wird anvisiert mit dem Baustein "Identifikation" als Teil des Use Cases zu starten (MVP).

**Vorteil:** Die Wiederverwendbarkeit dieses Bausteins in weiteren Szenarien macht ihn besonders attraktiv für eine modulare Umsetzung. Insgesamt lässt sich Baustein "Verifikation" potenziell gut im anvisierten zeitlichen Rahmen realisieren.

Der Baustein "Selbstdeklaration" hingegen ist für eine kurzfristige Umsetzung zu komplex, insbesondere aufgrund:
- der hohen Varianz bei den Datenanforderungen je Bank
- der fehlenden Standardisierung der Fragen
- sowie der Integrationskomplexität in bestehende Bankprozesse

→ Die Umsetzung der Bausteine wäre zusätzlich eher ein "internes Thema" für spätere Phasen.

Grundlegend besteht jedoch Skepsis, dass sämtliche Bausteine parallel oder vollständig umgesetzt werden können.

**Daher:** Fokus auf ausgewählte, realistisch umsetzbare Bausteine im Rahmen eines Basissetups.

### Business- und Technikperspektive

**Für eine erfolgreiche Umsetzung braucht es sowohl:**
- einen technischen Umsetzungsplan
- als auch einen Business Case

**Herausforderung:** Open-Finance-Initiativen tun sich wirtschaftlich oft schwer, einen tragfähigen Business Case zu formulieren. Die Motivation kommt grundlegend stärker aus der Kundensicht (Wünschbarkeit) oder aus dem regulatorischen Druck heraus.

**Wichtiger Punkt:** Die Frage nach einer Monetarisierung sollte frühzeitig adressiert werden – neben klassischen Nutzenargumenten wie:
- Kundenmehrwert (Pain-Point-Lösung)
- Leuchtturmcharakter / Innovationsvorsprung
- Datenbereitstellung
- Imagegewinn im Open-Banking-Umfeld

---

## 5. Umsetzungsbeispiel: Onboarding YUH via PostFinance

### YUH-App Onboarding via Bankident PF

**April 2025**
Adrian Wyss, PostFinance
Vertraulich

Für Rückfragen zum YUH-Case steht Adrian euch gerne persönlich zur Verfügung.

### Prozessablauf

Das Umsetzungsbeispiel zur Verwendung digitalisierter Kundendaten "Onboarding Yuh via Postfinance" zeigt den Datenfluss zwischen:

**Swissquote → PostFinance → Swissquote**

Der Prozess umfasst verschiedene Schritte der Registrierung und Identifikation, wobei PostFinance als Identifikationsdienstleister für die YUH-App von Swissquote fungiert.

---

## 6. Referenzprozess und Anforderungsanalyse

### Branchenunabhängiger Referenzprozess zur Serviceerschliessung

Der branchenunabhängige Referenzprozess zur Serviceerschliessung offenbart Potenziale für die Wiederverwendung von Datenbausteinen:

**Referenzprozess:**
1. Initialisierung
2. Produktauswahl
3. Selbstdeklaration
4. Basisdaten
5. Erweiterte Daten
6. Identifikation
7. Checks
8. Abschluss
9. Signatur
10. Verteilung

---

## 7. Fokus und Konkretisierung OPEN API Kundenbindung

### Zentrale Fragestellungen

**Umsetzung**
- Wo soll der Fokus gelegt werden (Zielbild)?
- Was soll umgesetzt werden Pilot/MVP? Ausbauschritte?
- Diskussion und Erwartungshaltung zum weiteren Vorgehen

**Fokus**
- Konkretisierung Open API Design

**Datenpunkte**
- Konkretisierung des Basismodul und konzeptueller Erweiterungen
- Ausprägungen Datenpunkte (definiert, gestuft, undefiniert)

**Modulgranularität**
- Flexible Einsetzbarkeit in verschiedenen Zielbildern und -szenarien

**Zielbild**
- Zielbild 1 und Zielbild 2

**Föderatives System**
- Berücksichtigung föderativer Anforderungen: Auswirkungen auf Architektur und API-Design

### Strategische Herangehensweise: Vom Kleinen ins Grosse

Gestartet wird mit einem klar abgegrenzten, realistisch umsetzbaren Baustein – z.B. der Verifikation von Identifikationsdaten.

Schrittweise kann darauf aufgebaut und der Scope kontinuierlich erweitert werden – bis hin zu umfassenderen Prozessen wie etwa der Kontoeröffnung.

**Diese modulare Vorgehensweise erlaubt:**
- Schnelle erste Umsetzungserfolge ("Quick Wins")
- Wiederverwendbarkeit von Komponenten (z.B. Identifikation, Datenfreigabe)
- Lernkurve mit geringem Risiko
- Skalierbarkeit hin zu komplexeren Use Cases

---

## 8. Identifikation von Zielbildern: Zielbild 1) DIREKT

### Komponenten
- Direkte Serviceerschliessung
- Bilaterale Beziehung

### Chancen
- Vollständige Kontrolle Kundenerlebnis durch Individualisten
- Direkte, bilaterale Beziehung mit dem Kunden
- Konsistentes, friktionsloses Kundenerlebnis

### Gefahren
- Ineffiziente und komplexe Serviceerschliessung
- Aufspaltung des Kundenbedürfnisses
- Medienbrüche und Doppelspurigkeiten

### Use Cases
- Eröffnung eines Bankkontos
- Abschluss eines Mietvertrages
- Eröffnung eines Mieterkautionssparkontos
- Abschluss einer Hausratsversicherung
- Kauf von Lebensmitteln

### Business (Fachliche Sicht)
- Individualist kontrolliert das gesamte Geschäftsmodell
- Sämtliche Prozesse werden durch Individualisten bereitgestellt
- Individualist definiert Daten, Produkte und Services
- Individualist gewährleistet regulatorische Konformität sowie Datenschutz und Datensicherheit

### IT (System, Infrastruktur, Technologie)
- Individualist stellt Technologie (z.B. App, Website) zur Verfügung und definiert Datenattribute, Definitionen und Schemas
- Individualist ist (zusammen mit Providern) für die Einhaltung von allfälligen Standards und Protokollen verantwortlich
- Individualist verantwortet (zusammen mit Providern) die Entwicklung und den Betrieb von Lösungen

### Governance (Regelung der Zusammenarbeit)
- Individualist orchestriert kompletten Leistungs-, Daten- und Consentfluss (zusammen mit Providern)

**Datenflüsse:**
- Leistungsfluss: Kunde ↔ Individualist
- Datenfluss: Kunde ↔ Individualist
- Consentfluss: Kunde ↔ Individualist (optional)

---

## 9. Offene Fragestellungen

### Übersichtstabelle Offene Fragestellungen

| **Fragestellung** | **BEI** | **HBL** | **PF** | **Intrum** |
|-------------------|---------|---------|--------|------------|
| Welche Mindestanforderungen gelten für die Datenprüfung sowie für die herausgegebenen Datensätze? | Annahme: Die herausgegebenen Datensätze werden so übernommen. Allfällige weitere Prüfungen erfolgen durch den Integrator.<br><br>Warum werden keine Effizienzgewinne erzielt? Die Identifikation wurde ja durchgeführt. Ergänzungen auf Grund des Risikoapproach sind Zusatzaufwände des Integrators. Prüfen mit Yuh Case.<br><br>Ist eine Einbindung der FINMA wünschenswert und erforderlich, und wenn ja, ab wann sollte sie erfolgen? | Herausgabe: Einverständis des Kunden bezüglich Datenschutz und Bankkundengeheimnis nötig.<br><br>Datenprüfung: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens Finma wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt. | | Zur Beantwortung dieser Frage benötige ich mehr Angaben zu den Datensätzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Geschäftsgeheimnisse zu beachten und gebührend zu berücksichtigen.<br><br>Für die Struktur der Datensätze könnten die folgenden allgemeinen Grundsätze definiert werden: "Datenprodukte bündeln Ressourcen (z.B. Datensätze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsfälle zu realisieren. Datenprodukte werden von Datenanbietern den oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement ermöglicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte" (Bundeskanzlei, Bausteine von Datenräumen – Datenökosystem Schweiz, Ziffer 3.2.3) |

### Spezifische Fragestellungen im Detail

**Sicht aus Aufwandsperspektive:**
Es besteht die Gefahr von **doppeltem Aufwand**, insbesondere wenn übermittelte Daten durch die empfangende Bank nochmals geprüft oder überarbeitet werden müssen.

Die Open API wäre besonders attraktiv, wenn **die übergebenen Daten ohne weiteren Bearbeitungsaufwand direkt genutzt werden könnten** – also im Idealfall ohne nachgelagerte Validierung oder manuelle Anpassungen.

**Offene Fragen zu Mindestanforderungen, Haftung und FINMA-Positionierung:**
- Welche Mindestanforderungen gelten im aktuellen Setup – und wie sehen diese bei anderen Banken aus?
- Welcher Zeitpunkt gilt formal für eine Neueröffnung im Kontext der Datenübernahme?

**Haftung und Datenweitergabe:**
Wie positioniert sich die FINMA zur Haftungsfrage bei der Datenweitergabe? → Eine Abklärung ist wichtig, damit Banken sich rechtlich abgesichert fühlen können.

Es ist zudem interessant, wie die FINMA in vergleichbaren Fällen bereits reagiert hat, um ein besseres Gefühl für ihre Haltung zu erhalten.

Ein FINMA-Rundschreiben zu diesem Thema wäre sehr hilfreich – ohne eine solche Aussage bleibt die Haftungsfrage aus regulatorischer Sicht mit einem Fragezeichen versehen.

### Zweigleisiger Lösungsansatz

Es wurde eine **zweigleisige Vorgehensweise** diskutiert: Einerseits orientiert man sich an **YUH und deren Lösungsansatz im Umgang mit der FINMA**, andererseits wird geprüft, ob ein **direkter Austausch mit der FINMA** sinnvoll und möglich ist.

---

## 10. Kalkulation Business Case

### Business Case Zahlen V2.xlsx

#### Grunddaten

| **Parameter** | **HBL** | **Postfinance** | **Bemerkungen** |
|---------------|---------|-----------------|-----------------|
| **Anzahl Kunden (Privatkunden)** | 300'000.00 | 2'100'000.00 | |
| **Anzahl Kundeneröffnungen pro Jahr** | 60'000.00 | 110'000.00 | |
| **Anzahl (Re)-Identifikationen** | - | - | Keine Reidentifikationen |
| **Anzahl Mehrfachkunden (mehrfach eröffnete Privatkunden)** | 3'000.00 | - | Annahme HBL: 5% der jährlichen Eröffnungen |

#### Kostenschätzungen

| **Kostenposition** | **HBL** | **Postfinance** | **Bemerkungen** |
|--------------------|---------|-----------------|-----------------|
| **Kosten Kundeneröffnung (Prozesskosten geschätzt)** | 120.00 | 130.00 | pro Kunde, Onboardingprozess |
| **Kosten Identifikation (Prozesskosten geschätzt)** | 20.00 | 20.00 | pro Kunde, reine digitale Identifikation |

#### Implementierungskosten

| **Kostenposition** | **Betrag** | **Bemerkungen** |
|--------------------|------------|-----------------|
| **Implementierungskosten OPEN API Kundenbeziehung Identifikation (Implementierung geschätzt)** | 200'000.00 | API für Identifikation umsetzen, mit Backendintegration |
| **Kosteneinsparungen Identifikation (Stufe 1)** | 60'000.00 | Bei Mehrfachkunden HBL |
| **Kosteneinsparungen Identifikation (Stufe 1) inkl Umsetzung API Jahr 1** | -140'000.00 | |

#### Mehrjährige Betrachtung

| **Betrachtungszeitraum** | **Betrag** |
|--------------------------|------------|
| **Kosteneinsparungen durchschnitt über 5 Jahre pro Jahr Stufe 1** | 20'000.00 |

**Wobei der Kostenvorteil zu 80% bei den Fintechs und zu 20% bei HBL liegt auf Grund des Verrechnungsmodells der HBL**

#### Stufe 2 Erweiterung

| **Parameter** | **HBL** | **Postfinance** | **Bemerkungen** |
|---------------|---------|-----------------|-----------------|
| **Kosteneinsparungen Identifikation (Stufe 2)** | 180'000.00 | 220'000.00 | Annahme: HBL 15% der Identifikationen durch Postfinance abgedeckt; Postfinance: 10% der Eröffnungen durch HBL abgedeckt |
| **Ertrag für Postfinance Kosten für HBL für Weitergabe von Postfinance an HBL** | -90'000.00 | 90'000.00 | Annahme 10.-/Weitergabe |
| **Ertrag für HBL, Kosten für Postfinance für Weitergabe von HBL an Postfinance** | 27'500.00 | -27'500.00 | Annahme 10.-/Weitergabe |
| **Total Ersparnis oder Ertrag pro Bank Stufe 2** | 117'500.00 | 282'500.00 | |
| **Kosten für Umsetzung pro Bank einmalig** | 200'000.00 | 200'000.00 | API für Identifikation umsetzen für beide Banken, mit Backendintegration |
| **Total Einsparungen pro Bank Stufe 2** | -82'500.00 | 82'500.00 | |
| **Kosteneinsparungen pro Bank pro Jahr pro Bank** | 77'500.00 | 242'500.00 | |
| **Total Benefit im Durchschnitt über 5 Jahre pro Jahr pro Bank** | **320'000.00** | | |

#### Gesamtbetrachtung alle Banken

| **Parameter** | **Betrag** | **Bemerkungen** |
|---------------|------------|-----------------|
| **Anzahl Eröffnungen pro Jahr** | 2'000'000.00 | Die Annahme basiert auf einer Kombination zweier Berechnungen: Zum einen auf einer ei |
| **Kosten Identifikationen** | 20.00 | |
| **Kosteneinsparungen** | 6'000'000.00 | Annahme Kosten ca. 15% von heute |
| **Kosten Umsetzung der Banken** | 4'000'000.00 | Annahme 20 grösste Banken Umsetzung und Betrieb gleich |
| **Kosteneinsparungen alle Banken/Jahr (Stufe 3)** | **2'000'000.00** | |

**Schlüsselfaktoren** (grün markiert in der ursprünglichen Tabelle)

---

## 11. Zusammenfassung und Ausblick

Die vorliegende Dokumentation umfasst alle wesentlichen Aspekte der OBP Anforderungen für die Open API Kundenbeziehung, von der strategischen Ausrichtung über konkrete Use Cases bis hin zu detaillierten Business Case Berechnungen.

**Zentrale Erkenntnisse:**
- Der MVP "Identifikation" bietet signifikantes Einsparpotenzial
- Use Case "Kundenbeziehungseröffnung" zeigt konkrete Anwendungsmöglichkeiten
- Regulatorische Fragestellungen erfordern weitere Klärung
- Der Business Case zeigt bei skalierter Umsetzung erhebliche Vorteile

**Nächste Schritte:**
- Klärung regulatorischer Rahmenbedingungen
- Technische Spezifikation der API
- Pilotierung mit ausgewählten Partnern
- Aufbau des föderierten Systems

Die Dokumentation bildet die Grundlage für die weitere Entwicklung des nationalen Standards für Open Banking in der Schweiz.