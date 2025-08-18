# Open Banking Project API Gesamtunterlage Phase 1

**Coordinated by OpenBankingProject.ch**

## Projektteilnehmer

- **Hypothekarbank Lenzburg** 
- **PostFinance**
- **intrum**
- **Coordinated by BEI** - Business Engineering Institute St. Gallen

---

## I. Einstieg & Lesehinweise zur Gesamtworkshopunterlage

Diese Unterlage dient der konsolidierten Darstellung aller Ergebnisse, die im Rahmen mehrerer Workshops (WS) erarbeitet wurden. Um eine bestmögliche Nachvollziehbarkeit und Übersicht zu gewährleisten, wurden die Inhalte jeweils einem thematisch passenden Workshop zugeordnet - auch wenn zahlreiche Themen über mehrere Workshops hinweg bearbeitet wurden.

### Zentrale Leselogik

- **Thematische Zuordnung**: Alle relevanten Erkenntnisse wurden zentral im jeweiligen Kapitel zusammengeführt, um Redundanzen zu vermeiden und einen themenorientierten Zugriff zu ermöglichen. Aus den Protokollversionen wurden lediglich die wichtigsten Anmerkungen übernommen (vgl. gelbe Sticker).

- **Zentralisierung der Ergebnisse**: Alle relevanten Erkenntnisse wurden zentral im jeweiligen Kapitel zusammengeführt, um Redundanzen zu vermeiden und einen themenorientierten Zugriff zu ermöglichen.

- **Dynamische Entwicklung**: Da sich gewisse Inhalte im Laufe der Workshops weiterentwickelt haben, sind allfällige Abweichungen zur ursprünglichen Workshopplanung möglich.

- **Aktualität der Informationen**: Es wurden jeweils nur die aktuellsten und finalen Erkenntnisse je Thema dokumentiert. Frühere Zwischenstände oder überholte Aussagen sind nicht Bestandteil dieser Version.

**Hinweis**: Die Unterlage stellt den konsolidierten Stand zum Zeitpunkt der Dokumentation dar. Für vertiefende Rückfragen zu spezifischen Inhalten stehen die jeweiligen Workshopverantwortlichen, Thomas Bühlmann und Friedrich-Philipp Wazinski (Kontaktdaten auf Slide 4) zur Verfügung. Alle Einzeldokumente, einschliesslich Protokollfassungen und ergänzender Materialien, sind unter folgendem Link verfügbar: 03 Workshops & Meetings

---

## II. Ansprechpartner und Kontakt

### Persönliche Ansprechpartner der BEI – für Austausch, Klärungen und weiterführende Gespräche zur Unterlage

**Thomas Bühlmann**
- Projektmanager
- Business Engineering Institute St. Gallen
- thomas.buehlmann@bei-sg.ch
- +41 76 345 38 44
- Extern

**Friedrich Wazinski**
- Consultant
- Business Engineering Institute St. Gallen  
- friedrich.wazinski@bei-sg.ch
- +41 78 265 82 87

**Stefan Knaus**
- Consultant
- Business Engineering Institute St. Gallen
- stefan.knaus@bei-sg.ch
- +41 79 438 83 05

**Thomas Zerndt**
- Supervisor
- Business Engineering Institute St. Gallen
- thomas.zerndt@bei-sg.ch
- +41 79 233 58 83

**Website**: www.openbankingproject.ch

---

## III. Inhaltsverzeichnis

| Nr. | Kapitelstruktur und Themen | Slide |
|-----|---------------------------|-------|
| I | Einstieg & Lesehinweise zur Gesamtworkshopunterlage | 2 |
| II | Ansprechpartner und Kontakt | 4 |
| III | Workshopplanung Phase 1 | 6 |
| 0. | **WS0 - Kick-Off-Workshop** | 6 |
| | • Erwartungshaltung der Teilnehmenden | 7 |
| | • Projektumfang | 8-12 |
| | • Übersicht Open API Kundenbeziehung | 13-14 |
| | • Übersicht Referenzprozess | 15-18 |
| 1. | **WS1 - Referenzprozess verifizieren** | 19 |
| | • Marktanalyse | 20-25 |
| | • Use Case-Sammlung, Konkretisierung und Auswahl | 26-33 |
| 2. | **WS2 - Datensets und -punkte spezifizieren** | 34 |
| | • Auswahl und Beschreibung der Zielbilder | 35-48 |
| | • Initiale Sammlung offener Fragestellungen | 49 |
| 3. | **WS3 - Zielbild und Bausteine** | 50 |
| | • Business Case / Whitepaper | 51–57 |
| | • Grundkonzept zum Aufbau des föderativen Systems | 58-59 |
| 4. | **WS4 - Validierung Open API & nächste Phase** | 60 |
| | • Regulatorische Fragestellungen aus externer Sicht | 61–66 |
| | • API-Design und Datenpunkte | 67–76 |
| | • Planungsentwurf Phase 2 | 77-78 |
| 5. | **Feedback Phase 1** | 79 |

---

## Phase I: Initiale Planung & Strukturierung der Workshopreihe

### Workshop-Übersicht

| Workshop | Termin | Ziele | Ergebnisse |
|----------|--------|-------|------------|
| **WS0 – Kick-Off-Workshop** | Mi 12.03.2025 (13:00-16:00 Uhr) Physisch (Finstar, Lenzburg) | • Aktualisierung Erwartungshaltung<br>• Verifikation zum Umfang der Open API Kundenbeziehung<br>• Diskussion der branchenübergreifenden Bausteine<br>• Diskussion zum Umfang der Analyse des Marktscreening<br>• Aufnahme neuer relevanter Use Case aus dem Partnernetzwerk<br>• Initiale Selektion von Use Cases und eines Anwendungsfalles<br>• Abstimmung zum Projektsetup | • Konkretisierter Projektumfang<br>• Projektorganisation inkl. Ressourcen und Termine<br>• Zu fokussierende Use Cases |
| **WS1 – Referenzprozess verifizieren** | Mi 26.03.2025 (09:00 bis 13:00 Uhr) Physisch (PostFinance, Zürich) | • Vorstellung der Analyse & Marktscreening „Datenset und -punkte"<br>• Verifikation Referenzprozess «Digitale Kundeneröffnung & -pflege Bank»<br>• Konkretisierung, Bewertung und Priorisierung relevanter Use Cases<br>• Initial Diskussion zum Umsetzungsszenario als Teil des Zielbildes | • Verifizierter Referenzprozess für Datensätze und -punkte<br>• Erstes Umsetzungsszenario<br>• Bewertete Use Cases |
| **WS2 – Datensets und -punkte spezifizieren** | Do 10.04.2025 (09:00-12:00h) Physisch (Finstar, Lenzburg) | • Abschluss Marktscreening mit rel. Input „Datenset und -punkte"<br>• Konkretisierung des Umsetzungsszenarios zur Ableitung von Rollen und für die regulatorische Evaluation<br>• Skizzierung der gener. Customer Journey als Teil des Zielbildes<br>• Identifikation offener regulatorischer Punkte und Klärungsansatz | • Entwurf für die Open API<br>• Initiales Umsetzungsszenario<br>• Listung offener regulatorischer und rechtlicher Aspekte |
| **WS3 – Zielbild und Bausteine** | Di 06.05.2025 (14:00 bis 17:00 Uhr) Physisch (intrum, Schwerzenbach) | • Entwurf der Open API ist vorgestellt und offene Punkte sind adressiert<br>• Zielbild ist finalisiert<br>• Ergebnisse sind in den Gesamtkontext des Umsetzungsszenario eingeordnet<br>• Klärung rechtlicher Grundlagen auf Basis der Use Cases<br>• Evaluation der regulatorischen Konformität des Umsetzungsszenarios | • Entwurf für die Open API<br>• Argumentation für den Aufbau des föderierten Systems<br>• Erster Entwurf Business Case |
| **OpenBankingProject.ch \| 12. Mitgliederanlass** | Di 13.05.2025 (16:30-20:30 Uhr) Physisch (Swisscom Arena) | • Vorstellung des aktuellen Projektsetups und der laufenden Aktivitäten<br>• Informationen über Verifikationscall, welcher mit der Community virtuell am 03.06.2025 (15-17 Uhr) stattfindet<br>• OPEN API Kundenbeziehung Verifikation.pptx | |
| **WS4 – Validierung Open API & nächste Phase** | Mi 11.06.2025 (14:00-17:00 Uhr) (PostFinance, Zürich) | • Validierung in separatem Workshop<br>• Zweite Version Open API ist validiert<br>• Positionierungen im föderativen System, Finanzierungsmodelle & weitere Handlungsfelder sind aufgezeigt<br>• Struktur und Planung für nächste Phase ist definiert | • Zweite Version Open API<br>• Konzeptioneller Umsetzungsansatz<br>• Abgeleitete Positionierungsmöglichkeiten<br>• Planung nächste Phase |
| **Community-Workshop 2025/02** | Di 24.06.2025 (14:00-18:00 Uhr) Physisch (Ergon, Zürich) | • Update zur Open API Kundenbeziehung<br>• Aufzeigen weiteres Vorgehen für die Weiterentwicklung und Verifizierung der Open API Kundenbeziehung | • Status und weiteres Vorgehen aufgezeigt |

---

## 0. WS0 - Kick-Off-Workshop

**Lenzburg, 12. März 2025**

### Erwartungshaltung der Teilnehmenden

### Projektumfang

#### Rahmenbedingungen und Projektsetup

**Rahmenbedingungen des Vorhabens:**

- **Planung, Ausgestaltung & Umsetzung** orientiert sich an den Phasen:
  1. Strukturierung & Konstituierung Open API
  2. Entwicklung & Bereitstellung für MVP sowie Nutzbarmachung der Open API

- **Entscheidungen im STA** werden im Konsens gefällt und die Koordination erfolgt durch die BEI

- **Die aktuelle Projektplanung** geht von 6-8 Partnern aus. Der Start kann mit 4 Projektpartnern erfolgen. → Wir sind bisher drei Partner

- **Die Kosten** für die Teilnahme belaufen sich auf CHF 18'500.– pro Teilnehmender und pro Projektphase (somit total CHF 37'000.–)

- **Die Partner** sind unabhängig von ihrer Rolle und Geschäftstätigkeit gleichgestellt und partizipieren finanziell wie auch durch die Mitwirkung paritätisch.

**Projektsetup:**

- Fachliche und technische Vertreter je Unternehmung
- Teilnahme an den Workshops
- Je Unternehmung Auslastung von ca. 20%
- Dauer der konzeptionellen Phase 1 bis Juni 2025
- Fallweiser Beizug von Experten
  - aus den Unternehmen
  - wenn nötig extern
- Fachliche Verifikation im Rahmen vom OpenBankingProject.ch (Community Workshops)
- PL und Koordination durch die BEI

**Projektteilnehmende:**
- Hypothekarbank Lenzburg
- PostFinance
- intrum
- Coordinated by BEI - Business Engineering Institute St. Gallen

#### Ansatz, Ergebnisse und Erwartungshaltung für die erste Phase

**Lieferergebnisse in Phase 1:**
- Föderiertes System
- Open API Kundenbeziehung
- Vorgaben für die Realisierung und Use Case

**Erwartung in diesem Projekt Phase Konzeption:**

- **Grundzüge eines föderierten Systems** mit den Rollen, den grundsätzlichen Verantwortlichkeiten und einer ersten Version der daraus abgeleiteten Netzwerkgovernance

- **Rechtliche Rahmenbedingungen** im Hinblick auf den Einsatz der Open API Kundenbeziehung (z.B. Einhaltung DSGVO & nDSG, Stellvertretung, …)

- **Zielbild & Konzeption Open API Kundenbeziehung:**
  - Umfang und Abgrenzung Basiskit
  - Semantische Definition aller Elemente im Basiskit mit Marktinput abgestimmt
  - Konzeption Zugang in die Ecosysteme (Anschlussfähigkeit)
  - Interaktionsmodell (Consent und Security Flow)
  - Anforderung und Vorgehen an die Vernehmlassung API
  - Anschlussfähigkeit und Einbettung in Gesamtkonzept Kundenbeziehung gewährleistet
  - Onboarding, Pflege, Saldierung der Beziehung
  - Kompatibilität zur E-ID und international Anschlussfähig
  - Domizile und Kundenarten (Privat- und Firmenkunden)
  - Vorgehen Verifikation im Markt und Verankerung (bis z.B. ISO) angedacht

- **Vorgehen Top-Down und Bottom-up kombiniert:**
  - Vorgehen Detailspezifikation und Umsetzung als künftiger Standard
  - Kombiniert mit einem oder mehreren Use Cases als MVP in Phase 2
  - Umzusetzende Use Cases dokumentiert
  - Publikation und Verifikation definiert

#### Phasenorientierte Herangehensweise

**Phase I: Strukturierung & Konstituierung Open API** (März - Juni)

Gemeinsam erarbeitete Ergebnisse:
- Konzeptioneller Lösungsansatz ist fixiert (fachliche Anforderungen und rechtliche Rahmenbedingungen)
- Optimierungspotentiale, Positionierung im föderierten System, Interaktionsmodelle und weitere Handlungsfelder sind definiert
- Referenzprozesse (Customer Journey, UML-Modell)
- Definiertes Basiskit (z.B. abgestimmtes Datenset, Funktionalitäten)
- Definition von MVP Use Case(s)

**Phase II: Entwicklung & Bereitstellung Open API** (In Planung)

- Entwicklung der Open API und/oder Erweiterung bestehender Schnittstellen auf der Grundlage des Basiskits
- Veröffentlichung und Dokumentation
- Bereitstellung der Ressourcen im Repository
- Ausgestaltung des gemeinsamen Vorhabens (MVP) in einem multilateralen Projektkontext (die Realisierung soll möglichst parallel erfolgen)

Ergebnisse:
- Entwurf Zielbild der Open API (inkl. Governance des föderierten Systems)
- Markt- und Anforderungsanalyse sowie Klärung rechtliche Grundlagen
- Konzeption der Open API und/oder Erweiterung bestehender Schnittstellen (Unbundling/Rebundling)
- Ableitung von Mehrwerten und Positionierungsmöglichkeiten (Use Case)
- Gemeinsam bereitgestellte und veröffentliche API auf Github (Endpoints, Request Methods, API Keys etc.)
- Dokumentation als Open API Spezifikation
- Zusätzliche Verifikation durch eCH und Veröffentlichung auf I14Y
- Vorgehen weitere Validierung und Einsatzbereiche der API bis ZB ISO-Zertifizierung

**21.08.2025 Open Banking Summit**

### Übersicht Open API Kundenbeziehung

#### Warum eine Open API Kundenbeziehung?

**Aufbau und Etablierung einer branchenübergreifenden und selbstbestimmten digitalen Kundenbeziehung**

Die Open API Kundenbeziehung ermöglicht:

- **Standardisierte Bausteine**: Basisdaten, ID (e-ID), Sign, Consent, Check, und weitere Module
- **Branchenübergreifender Standard**: Einsatz in Finance, Health, Education, Retail, Mobility, Insurance und weiteren Sektoren
- **Gestaltung von Use Cases**: Modulare Anwendung je nach Branchenbedarf
- **Aufbau föderiertes System**: Klare Governance und Verantwortlichkeiten
- **Gemeinsame Umsetzungsprojekte**: MVP-orientierte Entwicklung

**Initialer Fokus**: Privatkunden; anschliessend Firmenkunden
**Erste Umsetzung**: im Banking-Bereich

#### Die Open-API-Kundenbeziehung ermöglicht standardisierten Austausch

**Referenzprozess für branchenübergreifende Serviceerschliessung:**

| Prozessschritt | Beschreibung |
|---------------|--------------|
| **Initialisierung** | Startet den Onboarding-Prozess |
| **Produktauswahl** | Auswahl des gewünschten Services/Produkts |
| **Selbstdeklaration** | Kundenangaben und Präferenzen |
| **Basisdaten** | Grundlegende Kundenstammdaten |
| **Erweiterte Daten** | Zusätzliche branchenspezifische Informationen |
| **Identifikation** | Eindeutige Kundenidentifizierung |
| **Checks** | Validierungen und Prüfungen |
| **Abschluss** | Vertragsabschluss |
| **Signatur** | Digitale Unterzeichnung |
| **Verteilung** | Dokumentenverteilung |

#### Prioritäre Fokussierung

Prioritär gilt es das Open API Kundenbeziehung zu formulieren, den MVP vorzubereiten und die Eckpunkte für das Föderierte System zu erarbeiten:

**API-Komponenten:**
- **Datenfluss**: Standardisierte Datenübertragung
- **Consentfluss**: Einverständnismanagement
- **Governance**: Regelwerk für föderiertes System

**Föderiertes System:**
- **Fachlicher Trust**: Vertrauen auf fachlicher Ebene
- **Technischer Trust**: Technische Sicherheitsstandards

**Entwicklungsansatz:**
- **Top Down**: Standarddefinition als künftiger Standard
- **Bottom up**: Use Cases und MVP für praktische Umsetzung

**Beispielhafte Rollen:**
- Orchestrator
- Nutzer
- Kunde
- Stellvertreter
- QS DL (Quality Service Data Layer)
- Datenhalter
- API Provider
- Bund (E-ID)

### Übersicht Referenzprozess

#### Das initiale Basiskit als Grundlage

Das initiale Basiskit dient als Grundlage für die branchenunabhängige Serviceerschliessung in Ecosystemen und integriert vorhandene Spezifikationen.

**Open API Kundenbeziehung Bausteine:**
- Consent
- Basisdaten
- Identifikation
- Checks
- Sign
- … (weitere Module)

**Integration bestehender Standards:**
- Customer Management API
- SFTI Mortgage API
- Mortgage+
- Wealth+
- … (weitere APIs)

**Kommentar zur Integration:**

Ausgehend von branchenübergreifenden Prozessanforderungen für die digitale Kundenbeziehung werden Datenbausteine definiert und die einzelnen Datenpunkte spezifiziert.

Die Open API Kundenbeziehung integriert vorhandene Datenattribute, Definitionen und Schemas von bestehenden nationalen und internationalen Initiativen (siehe SFTI und Open Wealth).

Die erweiterte Funktionalität der Open API Kundenbeziehung ermöglicht neben statischen Daten auch dynamische Daten und die API kann so Onboarding, Pflege und Saldierung abdecken.

Einzelne Banken, wie beispielsweise Finnova-Banken, starten aktuell individuelle Initiativen im Bereich KYC – auch hier würde das Open API Kundenbeziehung einen Mehrwert bringen.

#### Branchenübergreifender Standard

**High-level: Open API Kundenbeziehung**

| Standard-Kategorie | Komponenten |
|-------------------|-------------|
| **Data Standard** | Metadaten, Basisdaten, Erweiterte Daten |
| **API Standard** | Stand. Datenbausteine, Stand. Datenaustausch, API Spezifikation |
| **Security Standard** | Consent-Flow, Security Flow, Autorisierung |
| **Governance Model** | Verwaltung und Pflege, Sicherheit und Betrieb, Finanzierungsmodell |

**Föderiertes System:**
Aufbau eines föderierten Systems mit klaren Verantwortlichkeiten und einheitlichen Regeln zur Sicherstellung von Interoperabilität und Datenhoheit.

**Standardisierter Datenaustausch:**
Nutzung standardisierter Datenbausteine und Interaktionen zur modularen und effizienten Gestaltung des Datenaustausches einer Kundenbeziehung.

**Branchenübergreifender Standard:**
Etablierung eines branchenübergreifenden Basissets und Standards, der sektorübergreifend einsetzbar ist (z.B. Finanz-, Wohn- oder Konsumbereich) und breite Marktdurchdringung ermöglicht.

**Governance:**
- Privatkunden
- (Firmenkunden)

**Branchen:**
- Mobility
- Insurance
- Finance
- Retail
- Education
- Health

---

## 1. WS1 - Referenzprozess verifizieren

**Zürich, 26. März 2025**

### Schlüsselergebnisse aus Workshop 01

**Von der Marktanalyse zum priorisierten Umsetzungspfad:**

- **Berücksichtigung der Marktanalyse** für Ausprägungsoptionen des föderierten Systems sowie der Nutzung internationaler De-facto-Standards (z.B. JSON als Datenformat, RESTful API als Architekturstil)
- **16 Use Cases identifiziert und bewertet**
- **4 priorisierte Use Cases** vertieft analysiert hinsichtlich Marktsicht und Umsetzbarkeit
- **Priorisierter Use Case**: (Bank-) Kundenbeziehungseröffnung
- **MVP "Identifikation"** als fokussierter Startpunkt zur Umsetzung

### Marktanalyse

#### Kurzvorstellung der Marktanalyse: Globale Open Banking und Open Finance Initiativen

**Analysierte Standards:**

| Initiative | Region/Land | Herausgeber |
|------------|-------------|-------------|
| **UK Open Banking Standard** | Vereinigtes Königreich | Open Banking Limited (OBL) |
| **Open Finance Brasil** | Brasilien | Brasilianische Zentralbank |
| **NextGenPSD2** | Europa | The Berlin Group |
| **Consumer Data Standard** | Australien | The Commonwealth Scientific and Industrial Research Organisation (CSIRO) |
| **Singapore Financial Data Exchange** | Singapur | The Monetary Authority of Singapore (MAS) and the Smart Nation and Digital Government Group (SNDGG) |
| **Open API Framework for Hong Kong** | Hong Kong | Hong Kong Monetary Authority |
| **Open Wealth API** | International | Open Wealth Association |
| **SFTI Mortgage API** | Schweiz | Swiss Fintech Innovation |

#### Sechs zentrale Key Takeaways aus der Marktanalyse

| Key Takeaway | Beschreibung |
|--------------|--------------|
| **1. Technologische Standards sind nicht global vereinheitlicht** | JSON als Dateiformat und RESTful APIs als Architekturstandard sind de facto etabliert. Die Nutzung von XML oder YAML ist hingegen stark verteilt. Einzig CDS (Australien) verwendet alle Formate konsistent. |
| **2. Produkte & Services stark fragmentiert** | Die Abdeckung von Finanzprodukten ist sehr unterschiedlich. Nur wenige Standards decken Lending, Investments und Versicherungen ab. Die meisten bleiben bei Kernprodukten wie Girokonten und Kreditkarten. |
| **3. Consent- und Sicherheitsmodelle variieren stark** | Von App-to-App bis Decoupled Flows – es gibt keinen eindeutigen globalen Consent-Standard. Auch bei Sicherheitsmodellen (z.B. FAPI, OAuth, OIDC) sind grosse Unterschiede erkennbar. |
| **4. Unterschiedliche Governance-Modelle prägen die Umsetzung** | Von regulatorisch vorgegebenen Modellen (UK, Brasilien, Australien) bis zu industriegetriebenen Standards (Open Wealth, SFTI): Die Steuerung variiert erheblich. |
| **5. Open Finance ist im Kommen – aber uneinheitlich** | Während einige Initiativen (z.B. OP Brasil, NextGenPSD2, SingFINDex) bereits umfangreiche Open Finance-Funktionen abdecken, fokussieren sich andere noch stark auf reines Open Banking. |
| **6. Payment Initiation unterschiedlich ausgereift** | Während UK, Brasilien und NextGenPSD2 umfassende Zahlungsinitiationen inkl. Bulk, File & VRP unterstützen, bieten andere Standards (z.B. Open API Hongkong, CDS, SingFINDex) kaum oder keine Funktionen in diesem Bereich. |

#### Vertiefung: Analyse globaler Open Banking und Open Finance Initiativen

**Detailanalyse nach KYC Data Sharing:**

| Initiative | KYC Data Sharing | Anmerkungen |
|------------|------------------|-------------|
| **UK Open Banking Standard** | Out of scope | |
| **Open Finance Brasil** | Möglichkeit sollte bestehen | |
| **NextGenPSD2** | Out of scope | |
| **Open Wealth API** | Über Customer Management API | Nicht direkt, aber eingeschränkt möglich |
| **SFTI Mortgage API** | KYC-nahe Daten: Kundendaten wie Name, Adresse, Geburtsdatum, Einkommens- und Vermögensnachweise | Nicht enthalten: Dokumente zur Identitätsverifikation (z.B. Pass, Ausweis), Politisch exponierte Person (PEP)-Status, Sanktionslistenabgleich, Identitätszertifikate |
| **Consumer Data Standards (CDS) Australia** | Nicht vorgesehen | |
| **Singapore Financial Data Exchange** | Nicht vorgesehen | |
| **Open API Framework for Hong Kong** | Möglichkeit sollte bestehen | Ab 2019/2020 als KYC-Authentication-as-a-Service vorgesehen - verliert jedoch an Dynamik. Nicht weiter verifizierbar. |

**Anmerkungen (Type of KYC Data):**
- **UK Open Banking Standard**: Not applicable
- **Open Finance Brasil**: Nicht verifizierbar
- **NextGenPSD2**: Not applicable
- **Open Wealth API**: Siehe PowerPoint
- **SFTI Mortgage API**: Not applicable
- **Consumer Data Standards**: Not applicable
- **Singapore Financial Data Exchange**: Not applicable
- **Open API Framework for Hong Kong**: Not applicable

### Use Case-Sammlung, Konkretisierung und Auswahl

#### Use Case geordnet nach Punkteranking

| # | Use Case | Beschreibung | Klebepunkte |
|---|----------|--------------|-------------|
| **1** | **Bankwechsel/Kontoeröffnung** | Wiederverwendung von sämtlichen, für eine Kundeneröffnung bei einer Bank relevanten Datenpunkte | **13 Punkte** |
| **2** | **Re-Identifikation** | Wiederverwendung von relevanten "Identifikationsdaten" | **7 Punkte** |
| **3** | **Altersverifikation** | Wiederverwendung des Datenpunkts "Geburtsdatum" oder Teilen (z.B. "18+", "16+") zum Beispiel für den Kauf von Alkohol im E-Commerce | **4 Punkte** |
| **4** | **EVV Use Case** | Wiederverwendung von relevanten Datenpunkten aus der externen Vermögensverwaltung | **4 Punkte** |
| **5** | **Mietvertrag** | Wiederverwendung von relevanten Datenpunkten für den Abschluss eines Mietvertrages | **2 Punkte** |
| **6** | **Leasing, Privatkredit** | Wiederverwendung von relevanten Datenpunkten zum Abschluss eines Leasings oder Konsumkredits | **2 Punkte** |
| **7** | **Arzt, Spital** | Wiederverwendung von relevanten Datenpunkten zur Weitergabe bei Arzt oder im Spital | **1 Punkt** |
| **8** | **Re-Identifikation** | Wiederverwendung von sämtlichen, für eine Kundeneröffnung bei einer Bank relevanten Datenpunkte | **1 Punkt** |
| **9** | **Hypothekenablösung** | | **1 Punkt** |

#### Detailanalyse der Top Use Cases

##### Use Case 1a: Kontoeröffnung mit Bezug zu Zielbild 1

**Ausgangslage:**
- Eröffnung einer Bankbeziehung eines Kunden (auch über einen EVV) direkt bei einer Bank. Die Datenpunkte basieren auf einem Standard. Je nach Kunde und Produkt können Ausprägungen unterschiedlich sein.
- Trotz potenzieller vorheriger Verifizierung bei der eigenen Bank oder anderen Instituten sind Kunden bei der Kontoeröffnung verpflichtet, ihre persönlichen Daten und Identitätsnachweise erneut vorzulegen.
- Unterschiedliche Onboarding-Prozesse innerhalb von Banken führen zu Ineffizienzen und Medienbrüchen.
- Die Nutzung von standardisierten Datenbausteinen innerhalb eines Netzwerks (z.B. PostFinance & YUH) kann den Prozess der Kontoeröffnung und des Bankwechsels erheblich erleichtern.

**Aktuelle Pain Points:**

*Sicht Kunde:*
- Hoher administrativer Aufwand durch wiederholte Dateneingabe und Identifikationsprozesse
- Verlängerte Wartezeiten bis zur Kontoaktivierung

*Sicht Bank I:*
- Hohe Kosten und Komplexität durch uneinheitliche Onboarding-Prozesse
- Geringe Wiederverwendbarkeit von Kundendaten führt zu doppelten Prüfprozessen

*(Optionale) Sicht Provider:*
- Fragmentierte IT-Landschaft und hohe Aufwände für Sicherheits- und Identitätsprüfungen (z.B. KYC)

**Umsetzung im Kontext "Open API Kundenbeziehung":**
- Harmonisierung von Onboarding-Strecken innerhalb der Bank durch standardisierte Datenbausteine
- Wiederverwendung von Kundendaten zur Reduktion von Medienbrüchen und Hebung von Effizienzen im Kontoeröffnungsprozess
- Nahtlose Integration zwischen verschiedenen Banken zur Vereinfachung des Kontoeröffnungsprozesses respektive des Bankwechsels

**Rollen im Netzwerk:**
- Bankkunden
- Bank
- (opt.) Provider

**Mehrwerte:**
- Reduktion von redundanten Dateneingaben durch automatisierte Wiederverwendung von bereits verifizierten Informationen
- Nahtlose Integration, hohe Sicherheitsstandards und Usability für den Kunden
- Schnellere und einfachere Kontoeröffnung und Bankwechselprozesse
- Hebung von Effizienzen im Kontoeröffnungsprozess für Banken
- Kosteneinsparungspotenzial durch potenziell schlankere Prozesse und Verringerung von Mehrarbeiten bspw. im Verifikationsprozess

**Kriterien zur Bewertung des Potenzials (Quantitativ/Qualitativ):**

| Kriterium | Marktsicht | Umsetzbarkeit |
|-----------|------------|---------------|
| **Kundennutzen** | ████████ | ████████ |
| **Mehrwert Bank** | ████████ | ████████ |
| **Mehrwert Kontributor** | ████████ | ████████ |
| **Mehrwert Provider** | ██████ | ██████ |
| **Marktvolumen** | ████████ | ████████ |
| **Level of Assurance** | | ████████ |
| **API Abdeckungsgrad** | | ████████ |
| **Komplexität & Risiken*** | | ████████ |
| **Integrationsaufwand** | | ████████ |
| **Finanzielle Tragbarkeit** | | ████████ |

*inkl. Regulatorische Konformität, Strukturelle Governance, Reputationsrisiken

##### Use Case 3: Altersverifikation

**Ausgangslage:**
- Viele Dienstleistungen und Produkte erfordern eine Altersverifikation (z.B. Bankprodukte, E-Commerce, Gaming, Streaming)
- Kunden müssen ihr Alter oft mehrfach und bei verschiedenen Anbietern nachweisen
- Momentan gibt es keine vertrauenswürdige und standardisierte Altersverifikation, die aus Kundenperspektive medienbruchfrei und sicher ist
- Durch die Wiederverwendung der Information "Geburtsdatum" oder der einfachen Angabe "18+", "16+" kann der Zugang zu altersbeschränkten Services im Netzwerk effizienter gestaltet werden

**Aktuelle Pain Points:**

*Sicht Kunde:*
- Kunden müssen ihre Identitäts- und Altersnachweise immer wieder neu erbringen, was sowohl zeitaufwendig ist als auch zu einer vergröβerten Customer Experience führt

*Sicht Bank/Unternehmen:*
- Unternehmen und Banken tragen hohe Kosten und eine hohe Komplexität durch individuelle Altersprüfungen (Identitätsprüfungen)

*Sicht Kontributor:*
- Anbieter von Altersverifikationsdiensten müssen sich in viele unterschiedliche Systeme integrieren, was zu Ineffizienzen führt

*(Sicht Provider):*
- Notwendigkeit zur Integration mit verschiedenen Banksystemen; Sicherstellung der Einhaltung gesetzlicher Anforderungen bei der Datenverarbeitung

**Umsetzung im Kontext "Open API Kundenbeziehung":**
- Standardisierte Altersverifikation über ein Netzwerk, sodass Kunden ihr Alter nur einmal verifizieren müssen
- Wiederverwendung von Altersinformationen aus bestehenden KYC-Prozessen (z.B. Bankkonto, Behördenregistrierung)
- API-basierter Zugriff für Drittanbieter, um schnell und sicher Altersnachweise zu erhalten
- Datenschutzkonforme Lösung, bei der nur das relevante Attribut ("16+", "18+") geteilt wird, ohne das genaue Geburtsdatum offenzulegen

**Rollen im Netzwerk:**
- Bankkunden
- Bank
- Kontributor
- Provider

**Mehrwerte:**
- Reduzierter Aufwand für Kunden, da Altersnachweise nicht mehrfach erbracht werden müssen
- Schnellere und effizientere Verifikationsprozesse für Banken und andere Unternehmen
- Höhere Sicherheit und Datenschutz, da nur notwendige Altersinformationen geteilt werden
- Standardisierte, regulatorisch konforme Lösung, die sich einfach in bestehende Systeme integrieren lässt

**Kriterien zur Bewertung des Potenzials (Quantitativ/Qualitativ):**

| Kriterium | Marktsicht | Umsetzbarkeit |
|-----------|------------|---------------|
| **Kundennutzen** | ████████ | ████████ |
| **Mehrwert Bank** | ██████ | ██████ |
| **Mehrwert Kontributor** | ██████ | ██████ |
| **Mehrwert Provider** | ██████ | ██████ |
| **Marktvolumen** | ██████ | ██████ |
| **Level of Assurance** | | ████████ |
| **API Abdeckungsgrad** | | ████████ |
| **Komplexität & Risiken*** | | ████████ |
| **Integrationsaufwand** | | ████████ |
| **Finanzielle Tragbarkeit** | | ████████ |

*inkl. Regulatorische Konformität, Strukturelle Governance, Reputationsrisiken

#### Next Steps für die Use Case Entwicklung

**Use Cases als Option zur Umsetzung:**
- Use Cases als Validierung der Anwendung im Zielbild der OPEN API Kundenbeziehung
- Use Case idealerweise Kandidat für erste Umsetzung

**Umsetzungsperspektive und Fokus: Use Case & Bausteine**

**Welcher Use Case wird konzeptionell umgesetzt?**

Zukünftig wird ein spezieller Fokus auf die Konzeptionalisierung des Use Case 1 gelegt. Innerhalb dieses Cases wird anvisiert mit dem Baustein "Identifikation" als Teil des Use Cases zu starten (MVP).

**Vorteil:** Die Wiederverwendbarkeit dieses Bausteins in weiteren Szenarien macht ihn besonders attraktiv für eine modulare Umsetzung. Insgesamt lässt sich Baustein "Verifikation" potenziell gut im anvisierten zeitlichen Rahmen realisieren.

Der Baustein "Selbstdeklaration" hingegen ist für eine kurzfristige Umsetzung zu komplex, insbesondere aufgrund:
- der hohen Varianz bei den Datenanforderungen je Bank
- der fehlenden Standardisierung der Fragen
- sowie der Integrationskomplexität in bestehende Bankprozesse

→ Die Umsetzung der Bausteine wäre zusätzlich eher ein "internes Thema" für spätere Phasen.

Grundlegend besteht jedoch Skepsis, dass sämtliche Bausteine parallel oder vollständig umgesetzt werden können. Daher: Fokus auf ausgewählte, realistisch umsetzbare Bausteine im Rahmen eines Basissetups.

**Business- und Technikperspektive**

Für eine erfolgreiche Umsetzung braucht es sowohl:
- einen technischen Umsetzungsplan
- als auch einen Business Case

**Herausforderung:** Open-Finance-Initiativen tun sich wirtschaftlich oft schwer, einen tragfähigen Business Case zu formulieren. Die Motivation kommt grundlegend stärker aus der Kundensicht (Wünschbarkeit) oder aus dem regulatorischen Druck heraus.

**Wichtiger Punkt:** Die Frage nach einer Monetarisierung sollte frühzeitig adressiert werden – neben klassischen Nutzenargumenten wie:
- Kundenmehrwert (Pain-Point-Lösung)
- Leuchtturmcharakter / Innovationsvorsprung
- Datenbereitstellung
- Imagegewinn im Open-Banking-Umfeld

**Generelles To Do:**
- Laufende Fortführung der regulatorischen Anforderungen
- Abgestimmtes Vorgehen bei der Use-Case-Evaluation: Die Use Cases werden initial vom BEI ausgearbeitet und anschliessend zeitnah rotiert, um alle Meinungen und Perspektiven zu den einzelnen Use Cases einzuholen

**Wichtige Anmerkungen:**

*Bankenwechsel und die Kontoeröffnung* sind als ein Use Case zu verstehen.

*Re-Identifikation* ist ein eigener Use Case und darf nicht mit der Kontoeröffnung vermischt werden. Im Kontext der Re-Identifikation sind die Regelungen des GWGs zu berücksichtigen. Spannend für die Weitergabe der Identifikation ist zusätzlich, nach welchem zugrunde liegenden Regelset die letzte Identifikation stattgefunden hat. Da sich diese Regeln über die Jahre ändern können, muss dies bei der Weitergabe berücksichtigt werden und das entsprechende "Regelset" vermerkt werden.

---

## 2. WS2 - Datensets und -punkte spezifizieren

**Lenzburg, 10. April 2025**

### Auswahl und Beschreibung der Zielbilder

#### Unsere Zielbilder der digitalen Kundennähe

Die Zielbilder der digitalen Kundennähe bilden die Basis für die Umsetzung von Use Cases im Kontext der Open API Kundenbeziehung.

**Übersicht der 5 Zielbilder:**

| Zielbild | Bezeichnung | Mögliche Use Cases | Akteure |
|----------|-------------|-------------------|----------|
| **1** | **Direkt (Klassisch)** | • Eröffnung Bankkonto<br>• Abschluss Versicherung | Kunde ↔ Individualist |
| **2** | **Indirekt** | • Embedding von Finanzprodukten<br>• AIS und PIS (PSD2) | Kunde ↔ Integrator ↔ Produzent |
| **3** | **Intermediär** | • Embedding von Finanzprodukten<br>• Multi Banking (SIX bLink) | Kunde ↔ Integrator ↔ Produzent ↔ Intermediär |
| **4** | **Plattform** | • Embedding von Finanzprodukten<br>• Marktplatz für Handel von VC & PE-Investments | Kunde ↔ Produzent ↔ Produzent ↔ Plattform |
| **5** | **Dezentral** | • Eröffnung Bankkonto mit Schweizer E-ID (ab 2026) | Kunde ↔ Integrator ↔ Produzent ↔ Trust Network |

**Legende:**
- **Leistungsfluss**: Direkter Service-/Produktfluss
- **Datenfluss**: Datenaustausch zwischen Akteuren
- **Consentfluss**: Einverständnismanagement (optional in manchen Zielbildern)

#### Detailliertes Zielbild 1) DIREKT

**Use Case**: Digitale Eröffnung eines Bankkontos bei einer Schweizer Kantonalbank

**Customer Journey:**
1. Kunde wählt auf Website oder App gewünschte Produkte aus
2. Kunde teilt Individualist relevante Kundendaten mit
3. Kunde durchläuft eine Identifikation bei einem IDP
4. Kunde gibt Consent für die Eröffnung der Vertragsbeziehung
5. Konto, Karten etc. stehen dem Kunden zur Verfügung

**Komponenten:**
- Direkte Serviceerschliessung
- Bilaterale Beziehung

**Business (Fachliche Sicht):**
- Individualist kontrolliert das gesamte Geschäftsmodell
- Sämtliche Prozesse werden durch Individualisten bereitgestellt
- Individualist definiert Daten, Produkte und Services
- Individualist gewährleistet regulatorische Konformität sowie Datenschutz und Datensicherheit

**IT (System, Infrastruktur, Technologie):**
- Individualist stellt Technologie (z.B. App, Website) zur Verfügung und definiert Datenattribute, Definitionen und Schemas
- Individualist ist (zusammen mit Providern) für die Einhaltung von allfälligen Standards und Protokollen verantwortlich
- Individualist verantwortet (zusammen mit Providern) die Entwicklung und den Betrieb von Lösungen

**Governance (Regelung der Zusammenarbeit):**
- Individualist orchestriert kompletten Leistungs-, Daten- und Consentfluss (zusammen mit Providern)

**Chancen:**
- Vollständige Kontrolle Kundenerlebnis durch Individualisten
- Direkte, bilaterale Beziehung mit dem Kunden
- Konsistentes, friktionsloses Kundenerlebnis

**Gefahren:**
- Ineffiziente und komplexe Serviceerschliessung
- Aufspaltung des Kundenbedürfnisses
- Medienbrüche und Doppelspurigkeiten

**Use Cases:**
- Eröffnung eines Bankkontos
- Abschluss eines Mietvertrages
- Eröffnung eines Mieterkautionssparkontos
- Abschluss einer Hausratsversicherung
- Kauf von Lebensmitteln
- ...

#### Aktuelle Marktperspektiven und Fokussierung

**Aktuelle Marktperspektiven:**
- Der aktuelle Markt fokussiert sich verstärkt auf Zielbild 3, insbesondere in Verbindung mit bLink als technischer Plattform
- Internationale Technologiekonzerne und ähnliche Akteure verfolgen eher Zielbild 5, das stärker auf dezentrale Identitätslösungen und übergreifende Logiken abzielt
- Zielbild 1 und 2 sind aus heutiger Sicht kurzfristig am realistischsten umsetzbar, insbesondere innerhalb unseres Projektkontexts

**Fokussierung im aktuellen Projektsetting für die nächsten 3 Monate:**
- Konzentration auf Zielbilder 1 und 2, da sie eine schnelle Umsetzbarkeit ermöglichen
- Gleichzeitig soll geprüft werden, ob und wie eine Erweiterung in Richtung Zielbild 3 oder 4 sinnvoll und machbar ist
- Zielbilder 3 und 4 bieten zusätzliche Perspektiven, vor allem im Hinblick auf Weiterentwicklungen bestehender Prozesse und Strukturen

**Unterschiedliche Modelle: E-ID vs. Open API Kundenbeziehung**
- Die Konzepte E-ID und Open API Kundenbeziehung basieren auf zwei grundlegend unterschiedlichen Modellen
- Rein theoretisch betrachtet fällt Zielbild 5 nicht in den Scope einer Open API Kundenbeziehung, da dort eher identitätszentrierte (Datenhaltungs)Ansätze verfolgt werden

**Fazit & Ausblick:**
- Kurzfristiger Fokus auf Zielbilder 1 und 2 – pragmatisch umsetzbar und auf bestehende Prozesse aufsetzbar
- Mittelfristig strategische Perspektive auf Zielbilder 3 und 4, insbesondere bei technologischen oder regulatorischen Weiterentwicklungen
- Zielbild 5 bleibt ausserhalb des aktiven Projekt-Scopes, jedoch grundlegend ein Zielbild, welches aus strategischer Perspektive bedacht werden sollte

#### Zusatzanmerkungen zu den Zielbildern

**Zielbilder 1-4 vs. Zielbild 5:**
Die Zielbilder 1 bis 4 verfolgen eine treuhänderische Datenweitergabe durch den Produzenten (z.B. Bank) im Auftrag und mit dem Consent des Kunden. Im Zielbild 5 läuft der gesamte Datenaustausch über den Endkunden (Holder), der Produzent (Issuer) kann dabei nicht nachvollziehen, wo und wie häufig die ausgestellten Datenpunkte genutzt werden.

**Weitere besprochene Themen:**

*Zusammenspiel zwischen E-ID und Open API:*
Die Frage wurde gestellt, wie die E-ID mit der Open API zusammenwirken soll. In der Diskussion wurde klargestellt, dass die Daten zwar bei der Bank liegen, die Datenhoheit jedoch zukünftig beim Kunden liegen wird. Dies betrifft insbesondere auch den "Consent-Prozess", da der Kunde künftig selbst über die Weitergabe seiner Daten entscheiden kann. Besonders im 5. Zielbild spielt diese Datenhoheit und die Zustimmung eine zentrale Rolle.

*Herausforderungen bei der Einführung der E-ID:*
Es wurde diskutiert, welche Herausforderungen mit der Einführung der E-ID verbunden sind:
- Falls der biometrische Ausweis als Voraussetzung für die E-ID erforderlich ist, könnte dies die Einführung erschweren
- Es müssen überzeugende Anwendungsfälle ("Killer Use Cases") entwickelt werden, um die Akzeptanz zu erhöhen. Ein Beispiel könnte das digitale Wahlrecht sein
- Es besteht Unklarheit darüber, welche regulatorischen Anforderungen von der FINMA festgelegt werden oder künftig relevant sein könnten
- Fragen zur Haftung und zur Anzahl der erforderlichen Sicherheitsfaktoren sind noch offen
- Zudem wurde das sogenannte Stellvertreterproblem thematisiert, das ebenfalls eine Herausforderung für die Implementierung der E-ID darstellt

*Notwendigkeit einer zweiten Lösung neben E-ID:*
Es wurde die Frage gestellt, ob es sinnvoll sei, eine zweite Lösung parallel zur E-ID aufzubauen. Es wurde argumentiert, dass es derzeit wenig sinnvoll erscheint, wenn jedes Unternehmen für jede Person eigene Identifikation selbstständig vornimmt. Zudem wurde festgehalten, dass die Einführung der E-ID noch lange dauern wird, jedoch bereits heute darauf geachtet werden muss, dass die zukünftigen Lösungen mit der E-ID kompatibel sind. 

**Fazit:** Vor diesem Hintergrund war dem Tenor zu entnehmen, dass eine "hybride Lösung" speziell vor dem ökonomischen Hintergrund zahlreichen "unnötigen Verifikationen" sinnvoll ist und eine Lösung in Form der Open API Kundenbeziehung eine relevante Lösung darstellt.

### Fokus und Konkretisierung OPEN API Kundenbindung

**Strategische Herangehensweise: Vom Kleinen ins Grosse**

Gestartet wird mit einem klar abgegrenzten, realistisch umsetzbaren Baustein – z.B. der Verifikation von Identifikationsdaten.

Schrittweise kann darauf aufgebaut und der Scope kontinuierlich erweitert werden – bis hin zu umfassenderen Prozessen wie etwa der Kontoeröffnung.

**Diese modulare Vorgehensweise erlaubt:**
- Schnelle erste Umsetzungserfolge ("Quick Wins")
- Wiederverwendbarkeit von Komponenten (z.B. Identifikation, Datenfreigabe)
- Lernkurve mit geringem Risiko
- Skalierbarkeit hin zu komplexeren Use Cases

**Konkretisierung Open API Design:**

| Fokusbereich | Beschreibung |
|--------------|--------------|
| **Umsetzung** | Was soll umgesetzt werden Pilot/MVP? Ausbauschritte? |
| **Fokus** | Wo soll der Fokus gelegt werden (Zielbild)? |
| **Datenpunkte** | Ausprägungen Datenpunkte (definiert, gestuft, undefiniert) |
| **Modulgranularität** | Konkretisierung des Basismodul und konzeptueller Erweiterungen |
| **Zielbild** | Flexible Einsetzbarkeit in verschiedenen Zielbildern und -szenarien |
| **Föderatives System** | Berücksichtigung föderativer Anforderungen: Auswirkungen auf Architektur und API-Design |

**Fokussierung:** Zielbild 1 und Zielbild 2

**Diskussion und Erwartungshaltung zum weiteren Vorgehen** wird in den nachfolgenden Workshops konkretisiert.

## 3. WS3 - Zielbild und Bausteine

**Schwerzenbach, 06. Mai 2025**

### Schlüsselergebnisse aus Workshop 03

**Das initiale API-Design ist definiert und der Business Case im Kontext des MVP "Identifikation" ist als tragfähig und positiv validiert:**

- **Initiales API-Design inklusive Datenfelder sind definiert**
- **Business Case** wurde entlang von Machbarkeit, Wirtschaftlichkeit, Kundennutzen und Risiken differenziert ausgearbeitet
- **Tragfähiger Business Case** basierend auf Cash-Back-Potenzial für den Produzenten und reduzierten Prozesskosten sowie Umsatzsteigerung durch höhere Conversion beim Integrator
- **Einwilligung des Kunden** zum Zweck und Umfang der Datenweitergabe ist zentral

### Business Case / Whitepaper

*[Detaillierter Business Case-Inhalt wird basierend auf verfügbaren Dokumenten ergänzt]*

### Grundkonzept zum Aufbau des föderativen Systems

#### Grundkonzept und Argumentarium des föderierten Systems - Aufbau und Struktur

Das föderierte System kann in drei verschiedenen Modellen umgesetzt werden:

| Modell | Dezentralisiert (Peer-to-Peer) | Hybrides Modell | Zentralisiert (zentraler Hub/Plattform) |
|--------|--------------------------------|-----------------|----------------------------------------|
| **Beschreibung** | Das Modell eignet sich für eine schlanke Initialisierung des MVP mit relativ minimalem organisatorischen Overhead. Der Austausch erfolgt bilateral zwischen dem Produzenten und dem Integrator, ohne zentrale Koordination oder Plattform. | In der hybriden Ausbaustufe pflegen alle Produzenten ihre eigenen Integratoren sowie ein Verzeichnis aller teilnehmenden Produzenten. Der Datenfluss bleibt dezentral, jedoch gibt es zentrale Governance (z.B. API-Katalog, Authentifizierungsregeln, Consent-Standards). | Ein zentraler Hub übernimmt die Anfrageannahme, leitet sie an den richtigen Produzenten weiter und koordiniert Governance, Logging und Sicherheit. Diese Plattform kann auch als "Trusted Central Authority (TCA)" agieren. |
| **Merkmale** | • Jeder Produzent verwaltet eigenes Verzeichnis (Integratoren & APIs)<br>• API-Zugriff erfolgt direkt zwischen Teilnehmern<br>• Keine zentrale Governance-Struktur vorhanden | • Governance-Prozesse werden zentral verwaltet<br>• Direkte Datenflüsse, jeder Produzent kennt Integrator<br>• Zentrale Infrastrukturkomponenten wie Auth-Server oder Zertifikatsdienst | • Anfragen und Zugriffskontrollen über zentrales Hub<br>• Zentrale Instanz agiert als Trusted Central Authority<br>• Plattform verwaltet Consent, Logging, Rollen, Monitoring<br>• Datenrouting erfolgt systemgeführt |
| **Vorteile** | • Schneller Go-Live: kein Aufbau zentraler Infrastruktur<br>• Volle Autonomie der Teilnehmer über Daten<br>• Keine zentrale Abhängigkeit – resilient gegen Plattformausfälle | • Einheitliche Regeln durch zentrale Governance<br>• Datenfluss bleibt dezentral zwischen den Partnern<br>• Gute Transparenz über Teilnehmer und Zuständigkeiten | • Hohe Standardisierung und regulat. Durchsetzbarkeit<br>• Effizientes Teilnehmer-Onboarding und zentrale Überwachung<br>• Skalierbarkeit für grosse Netzwerke |
| **Nachteile** | • Skalierung schwierig bei wachsender Teilnehmerzahl<br>• Hohe techn. Komplexität und Netzwerkverkehr<br>• Begrenzte zentrale Kontrolle über Sicherheit und Compliance | • Allenfalls Lösung für mittelgrosse Netzwerke<br>• Skalierung schwierig bei wachsender Teilnehmerzahl<br>• Inkonsistenzen bei Kundenzuordnungen möglich | • Setzt breit akzeptierte und vertrauenswürdige Instanz voraus<br>• Single Point of Failure<br>• Höhere Kosten für Aufbau und Betrieb |

#### Föderiertes System - Prinzipdarstellung

**Priorität: Formulierung der Open API Kundenbeziehung, MVP-Vorbereitung und Eckpunkte für das Föderierte System**

**Komponenten:**

| Komponente | Beschreibung |
|------------|--------------|
| **API** | Prinzipdarstellung für die Anwendung der Open API Kundenbeziehung in den Zielbildern 1-4 |
| **Datenfluss** | Standardisierter Datenaustausch zwischen Akteuren |
| **Consentfluss** | Einverständnismanagement für Datenweitergabe |
| **Governance** | Das föderierte System (ehem. Vertrauensnetzwerk) beschreibt die Form der Zusammenarbeit im Kontext der Nutzung der Open API Kundenbeziehung |

**Entwicklungsansatz:**
- **Top Down**: Die Formulierung der Open API TopDown soll als künftiger Standard sämtliche Konstellationen der digitalen Kundeninteraktion abdecken
- **Bottom up**: Die Use Cases und der selektierte MVP bilden Anwendungskonstellationen ab. MVPs nutzen das Open API Kundenbeziehung

**Föderiertes System Charakteristika:**
- **Fachlicher Trust**: Vertrauen auf fachlicher Ebene
- **Technischer Trust**: Technische Sicherheitsstandards

**Beispielhafte Rollen:**
- Orchestrator
- Nutzer
- Kunde
- Stellvertreter
- QS DL (Quality Service Data Layer)
- Datenhalter
- API Provider
- Bund (E-ID)

---

## 4. WS4 - Validierung Open API & nächste Phase

**Zürich, 11. Juni 2025**

### Ziele und Agenda WS 2025/4

**Erreichte Ziele:**
- ✓ Der Entwurf für die Open API Version 2.0 wurde vorgestellt und diskutiert
- ✓ Die rechtlichen und regulatorischen Aspekte und Lösungen sind diskutiert und Lösungsoptionen sind aufgezeigt
- ✓ Die Whitepaper-Version 2.0 zum Business Case wurde vorgestellt und weiteres Feedback dazu eingeholt
- ✓ Mögliche Finanzierungs- und Monetarisierungsmodelle wurden aufgezeigt
- ✓ Feedback zu Phase 1 wurde eingeholt, die Strukturierung und Planung der Phase 2 wurde vorgestellt und die nächsten Schritte sind definiert

**Detaillierte Agenda:**

| Nr. | Agendapunkt | Dauer | Referent |
|-----|------------|-------|----------|
| 1 | Begrüssung, Erwartungshaltung und Feedback zum Validierungscall | 14:00 – 14:15 | BEI |
| 2 | Regulatorische Fragestellungen aus externer Sicht | 14:15 – 15:00 | BEI/ Viktor Györffy |
| 3 | Vorstellung des Open API-Entwurfs (Version 2.0) und Diskussion des Feedbacks aus dem Validierungscall | 15:00 – 15:30 | BEI/ Richard |
| 4 | Pause | 15:30– 15:50 | Alle |
| 5 | Business Case | 15:50 – 16:10 | BEI |
| 6 | Finanzierungsmodelle | 16:10 – 16:40 | BEI |
| 7 | Zusammenfassung Phase 1, Struktur und Planung für nächste Phase 2, Feedback & nächste Schritte | 16:40 – 17:00 | BEI |

### Schlüsselergebnisse aus Workshop 04

**Das Grundkonzept für das föderierte System, externe rechtliche Lösungsoptionen und die Grobplanung für Phase 2 wurden konkretisiert:**

- **Grundkonzept für das föderierte System ist erarbeitet** – inklusive Finanzierungs- und Monetarisierungsansätzen für die Varianten dezentral, zentral und hybrid
- **Externes rechtliches Gutachten bestätigt**: Für die Open API bestehen aus juristischer Sicht keine grundlegenden Hürden
- **Die Grobplanung für Phase 2** sowie die entsprechenden Mindestanforderungen wurden definiert

### Regulatorische Fragestellungen aus externer Sicht

*[Detaillierte regulatorische Inhalte basierend auf dem Gutachten von Viktor Györffy werden hier ergänzt]*

### API-Design und Datenpunkte

#### API-Endpoint-Übersicht Version 2.0

**Hauptendpunkte:**

| Endpoint | HTTP | Zweck | Request (Hin) | Response (Her) |
|----------|------|-------|---------------|----------------|
| `/customer/check` | POST | Existenz + Ident-Gültigkeit prüfen | `{ sharedCustomerHash, name, vorname, geburtsdatum }` | `{ match:boolean, idDate:date }` |
| `/customer/fullRequest` | POST | Full Customer Dataset | Header JWT (Consent-Claim), Body `{ sharedCustomerHash, purpose:"accountOpening" }` | Vollständiges Dataset (≈ 65 Felder inkl. pdfUrlPassportScan) |
| `/customer/identification` | POST | Nur Identifikationsdaten | `{ sharedCustomerHash }` | `{ identArt, referenznummer, ausstellungsdatum, gueltigBis, ausgestelltIn, pdfUrlPassportScan }` |

**Granulare Daten-Endpunkte (nur Teilmengen):**

| Endpoint | HTTP | Zweck | Request (Hin) | Response (Her) |
|----------|------|-------|---------------|----------------|
| `/customer/basic` | POST | Nur Stammdaten (Name, Vorname, Geburtsdatum, Nationalität) | `{ sharedCustomerHash }` | `{ name, vorname, geburtsdatum, nationalitaet }` |
| `/customer/address` | POST | Nur Adressdaten (Haupt- & Korrespondenzadresse) | `{ sharedCustomerHash }` | `{ adresse: { strasse, hausnummer, plz, ort, landcode }, korrespondenz?: { … } }` |
| `/customer/contact` | POST | Nur Kontaktdaten (Telefon, E-Mail) | `{ sharedCustomerHash }` | `{ telefonNum, email }` |
| `/customer/kyc` | POST | Nur KYC-Attribute ohne Ausweis | `{ sharedCustomerHash }` | `{ amlRisikoklasse, pepTyp, wirtschaftlich_berechtigt, fatcaStatus, tin }` |

**Technische Spezifikationen:**
- **Version**: 2.0
- **Standard**: Folgt dem OpenAPI 3.0 Standard für Dokumentation
- **Architektur**: RESTful API
- **Datenformat**: JSON
- **Sicherheit**: JWT-Token mit Consent-Claims
- **Authentifizierung**: Header-basierte JWT-Übertragung

**Repository und Veröffentlichung:**
Die Version 3.0 sowie ergänzende Dokumentationen werden auf GitHub zur Verfügung gestellt. Für den Zugriff auf den derzeit noch privaten GitHub-Workspace kann direkt Kontakt mit Friedrich Wazinski (friedrich.wazinski@bei-sg.ch) aufgenommen werden. Die Veröffentlichung des Repository ist geplant; ein konkreter Zeitplan wird noch bekannt gegeben.

### Planungsentwurf Phase 2

#### Phase II: Grobe Workshopplanung

**Umsetzungsbedingungen:**
- Drei Partner für Phase 2
- MVP mindestens 2 Partner
- Die initiale Planung passt und wird bei Bedarf weiter konkretisiert

**Zieltermin:** 21.08.2025 Open Banking Summit

| Workshop | Ziele | Ergebnisse |
|----------|-------|------------|
| **WS0 – Kick-Off-Workshop PII** | • Aktualisierung Erwartungshaltung<br>• Verifikation zum Umfang der Open API Kundenbeziehung Phase 2<br>• Abstimmung zum Projektsetup<br>• Setup Begleitung MVP Umsetzung | • Konkretisierter Projektumfang<br>• Projektorganisation inkl. Ressourcen und Termine<br>• Setup MVP Begleitung |
| **WS1 – Onboarding- und Pflegeschnittstelle** | • Erweiterung Onboarding Schnittstelle auf Grundlage des Basiskits<br>• Update und Löschung (Pflege) von Kundendaten<br>• Regulatorische Fragestellungen<br>• Fragestellungen aus MVP | • Entwurf vollständige Onboardingschnittstellen Spezifikation<br>• Offene regulatorische Fragestellungen |
| **WS2 – Veröffentlichung** | • Design, Implementierung, Testing, Veröffentlichung und Dokumentation<br>• Föderiertes System Ausbaustufe (Rollendefinition, Entscheid Modell)<br>• Fragestellungen aus MVP | • Dokumentation für die Open API<br>• Rollen Föderiertes System |
| **WS3 – Repository, Sandbox** | • Bereitstellung der Ressourcen in Repository und gemeinsamer Sandbox<br>• Fragestellungen aus MVP | • Repository<br>• Sandbox |
| **WS4 – Ausbau** | • Releasemanagement, Update Spezifikation, Governance<br>• Status<br>• Use Cases<br>• Evaluation potenter Use Cases<br>• Evaluation Industrieexpansion<br>• Businesscase Föderiertes System<br>• Weiteres Vorgehen OPEN API Kundenbeziehung<br>• Sicherstellung der Kompatibilität im Firmenkundenkontext<br>• Validierung der Open API Kundenbeziehung<br>• Industriepotenzial<br>• Einbindung Stellen wie eCH, BfS, SIF<br>• Anforderungen von ISO | • Releasemanagement<br>• Regulatorischer Setup<br>• Potenzielle Use Cases<br>• Nächste Industrie<br>• Rollen föderiertes System, Positionierung<br>• Planung nächste Phase<br>• Input Verifikation aus der Community |

### Zentrale Herausforderungen aus WS2

**Konsolidierter Fragenkatalog zu über 20 rechtlichen, regulatorischen und technischen Fragestellungen:**

**Regulatorische Fragestellungen:**
- Wird das Prinzip einer Datenwiederverwendung grundsätzlich erlaubt (das bedeutet, eine bestehende Identifikation in allen anderen Fällen nicht mehr neue Dokumente erfordern würde bei Weitergabe auch)?
- Welche Art der Delegation soll weitergegeben werden (zusätzlich Video-Ident)?
- Definition Dauer, wie lange eine Delegation wiederverwendet werden kann

**Rechtliche Fragestellungen:**
- Details zu Ausweisen: Ist ein abgelaufener und relevant gelassener Ausweisausweis als Identität bei einer Weitergabe noch akzeptabel?
- Umgang mit Ausstellungsort des Ausstellerausweises
- Bestehende Vomitio, compliancerelevante Kunden (zB. Terrorist/Exposierte Personen, dem Fall Meldung, etc.) vor Datenweitergabe, oder danach durch Regel eines anderen Agents?
- Fragen der Delegation (Beispiel: Gibt ein Onboarding der Kraft bei einer Drittbank bei einer Kraft welche Rolle darf sie dabei übernehmen welche?)
- Haftungsfragen bei hinterlegten Informationen: Wer haftet? Kontrollinstanz (da Delegation als Testament erteilt von Drittanbietern und auch besteht)?

**Technische Fragestellungen:**
- Wie müssen wiederverwendete Delegationsdienste Informationen der neuen Zeitschrift von Umsystemen behandelt werden?
- Krisensicherheit gegen externe Weigerung bei Datenweitergabe: mit Disclaimern ohne Haftbarkeit?
- Risikoeconomy: Interesse der Bank an einer Delegation ohne Sicherheit der Analyse Qualität berühmt ablehnen leben (falls ein grosser Risiko in einer Situation werden könnte, bedeutet dies eine neue Überprüfung der alle, was wieder die Vorteile einer Wiederverwendung zunichte machen würde)
- Lohnt sich der Aufwand und die Kosten für die Einführung Unterhalten eines weiteren Delegationseinwands noch als für eine Bank?

**Entwicklung erster Antworten auf kritische Fragestellungen:**
- Haftung grundsätzlich beim Integrator, ausser bei grober Fahrlässigkeit des Produzenten
- Keine Weitergabe von PEP-Kundendaten
- YUH demonstriert: Rechtlich und regulatorisch konforme Datenübertragung zwischen Banken ist möglich und bereits erfolgreich umgesetzt

---

## 5. Feedback Phase 1

### Vielen Dank für den Austausch!

#### Projektfeedback zur Phase 01

**Positive Rückmeldungen:**

- **Spannende und inhaltlich überzeugende Ergebnisse**: Die Zielsetzungen der Phase 1 wurden erreicht. Es gab viel und qualitativ hochwertigen Input/Output.

- **Exzellente Organisation**: Die Organisation wurde als sehr gut wahrgenommen, der MVP hinterliess einen positiven Eindruck. Das Format wurde als hilfreich und lehrreich empfunden.

- **Hochwertige Aufbereitung**: Die Aufbereitung des Materials und der Inhalte wurde als gut bewertet. Besonders der Yuh-Case wurde als extrem spannend hervorgehoben – es wurde als wichtig erachtet, solche konkreten Anwendungsfälle zu behandeln.

- **Wertvoller Austausch**: Der Austausch im Rahmen des Projekts war wertvoll, mit vielen Learnings und Aha-Effekten.

- **Lösungsfindung**: Im Vergleich zum Projektstart wurden zahlreiche Lösungsoptionen für diverse Problemstellungen gefunden. Gleichzeitig wurden auch bestehende Herausforderungen sichtbar, die weiterer Klärung in einer potenziellen Phase 2 bedürfen.

**Verbesserungspotential:**

- **Stärkere Platzierung**: Zusätzlich besteht der Wunsch nach einer stärkeren Platzierung und besserem "Verkauf" des Projekts und des Projektteams.

#### Feedback und Zielerreichung

**Was hat euch an dem Workshop gefallen?**
*[Bereich für spezifisches Workshop-Feedback]*

**Was können wir noch verbessern?**
*[Bereich für Verbesserungsvorschläge]*

---

## Zusammenfassung und Ausblick

### Erreichte Meilensteine Phase 1

**Projektumfang und Grundlagen:**
- Erfolgreiche Konstituierung des Projektkonsortiums mit drei Partnern (Hypothekarbank Lenzburg, PostFinance, intrum)
- Etablierung einer strukturierten Workshop-Reihe mit klaren Zielen und Ergebnissen
- Koordination durch BEI als neutrale Instanz

**Marktanalyse und Standardisierung:**
- Umfassende Analyse globaler Open Banking und Open Finance Initiativen
- Identifikation von De-facto-Standards (JSON, RESTful APIs)
- Berücksichtigung internationaler Best Practices für das Schweizer Modell

**Use Case Entwicklung:**
- 16 Use Cases identifiziert und systematisch bewertet
- Priorisierung auf Bankwechsel/Kontoeröffnung als Hauptanwendungsfall
- Fokussierung auf MVP "Identifikation" als ersten umsetzbaren Baustein

**Zielbild-Definition:**
- Entwicklung von 5 verschiedenen Zielbildern für digitale Kundennähe
- Strategische Fokussierung auf Zielbilder 1 und 2 für Phase 1
- Modularer Aufbauansatz für schrittweise Erweiterung

**API-Design:**
- Definition einer Open API Kundenbeziehung Version 2.0
- Spezifikation von Haupt- und granularen Daten-Endpunkten
- Technische Grundlagen für föderative Systemarchitektur

**Business Case:**
- Tragfähiger Business Case basierend auf Cash-Back-Potenzial und Kosteneinsparungen
- Quantifizierung von Mehrwerten für alle Stakeholder
- Berücksichtigung von Machbarkeit, Wirtschaftlichkeit und Risiken

**Föderiertes System:**
- Konzeptionelle Ausarbeitung von drei Architektur-Modellen
- Bevorzugung des hybriden Modells für optimale Balance
- Definition von Rollen und Governance-Strukturen

**Rechtliche Grundlagen:**
- Externes rechtliches Gutachten bestätigt Machbarkeit
- Klärung kritischer Haftungs- und Compliance-Fragen
- Regulatorische Konformität als zentrale Anforderung

### Vorbereitung Phase 2

**Umsetzungsbedingungen erfüllt:**
- Mindestens drei Partner für Phase 2 gesichert
- MVP-Bereitschaft bei mindestens zwei Partnern
- Technische und organisatorische Grundlagen geschaffen

**Nächste Schritte definiert:**
- Detaillierte Workshopplanung für Phase 2 erstellt
- Roadmap bis zum Open Banking Summit (21.08.2025) festgelegt
- GitHub Repository und Sandbox-Umgebung in Vorbereitung

**Kritische Erfolgsfaktoren:**
- Kontinuierliche Community-Einbindung und Verifikation
- Agile Entwicklung mit regelmässigen Feedback-Schleifen
- Kompatibilität mit entstehender E-ID-Infrastruktur

### Strategischer Ausblick

Das Open Banking Project Schweiz hat mit Phase 1 eine solide Grundlage für einen nationalen Standard geschaffen. Die systematische Herangehensweise, die internationale Marktanalyse und die pragmatische Fokussierung auf umsetzbare Bausteine schaffen beste Voraussetzungen für eine erfolgreiche Phase 2.

Die enge Zusammenarbeit zwischen Industrie, Wissenschaft und Praxis sowie die neutrale Koordination durch die BEI gewährleisten eine ausgewogene und marktrelevante Entwicklung. Mit dem bevorstehenden Open Banking Summit wird das Projekt einer breiteren Öffentlichkeit vorgestellt und für weitere Partner geöffnet.

**Kontakt für Phase 2:**
Für den Einstieg in Phase 2 oder weiterführende Informationen stehen die Projektverantwortlichen Thomas Bühlmann und Friedrich-Philipp Wazinski zur Verfügung.

---

**Quelle:** Open Banking Project API Gesamtunterlage Phase 1, coordinated by OpenBankingProject.ch  
**Stand:** Juli 2025  
**Version:** Konsolidierte Fassung aller Workshop-Ergebnisse