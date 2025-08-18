# OBP Vertrauensnetzwerke relevante slides - Vollständige Dokumentation

**coordinated by openbankingproject.ch**

## Inhaltsverzeichnis

### Vertrauensnetzwerke
- Übersicht Modelle
- Kontext API Design
- Tbd: detailliertere Ausarbeitung – aber nur konzeptionell bis Open Banking Summit!

---

## 1. Prioritäre Ziele und Systemarchitektur

### Kernfokus Phase 1

**Prioritär gilt es das Open API Kundenbeziehung zu formulieren, den MVP vorzubereiten und die Eckpunkte für das Föderierte System zu erarbeiten**

### Systemkomponenten

#### API
- **Datenfluss**
- **Consentfluss**

**Prinzipdarstellung für die Anwendung der Open API Kundenbeziehung in den Zielbildern 1-4**

Die Formulierung der Open API Top-Down soll als künftiger Standard sämtliche Konstellationen der digitalen Kundeninteraktion abdecken.

#### Governance
Das föderierte System (ehem. Vertrauensnetzwerk) beschreibt die Form der Zusammenarbeit im Kontext der Nutzung der Open API Kundenbeziehung.

In der Phase 1 werden die Eckpunkte beschrieben.

#### Föderiertes System
- **Fachlicher Trust**
- **Technischer Trust**

### Systematische Herangehensweise

#### Top Down
Die Use Cases und der selektierte MVP bilden Anwendungskonstellationen ab. MVPs nutzen das Open API Kundenbeziehung.

#### Bottom up
Beispielhafte Rollen (besprochen):
- **Orchestrator**
- **Nutzer Kunde** 
- **Stellvertreter**
- **QS DL**
- **Datenhalter API Provider**
- **Bund (E-ID)**

---

## 2. Branchenübergreifender Standard für Standardisierten Datenaustausch

### High-level Ziel: Open API Kundenbeziehung

**Aufbau und Etablierung einer branchenübergreifenden und selbstbestimmten digitalen Kundenbeziehung**

### Systemarchitektur

#### Standards Framework
| **Data Standard** | **API Standard** | **Security Standard** |
|-------------------|------------------|----------------------|
| Stand. Datenbausteine | API Spezifikation | Consent-Flow |
| Stand. Datenaustausch | | Security Flow |
| | | Autorisierung |

#### Governance Model
| **Verwaltung und Pflege** | **Sicherheit und Betrieb** | **Finanzierungsmodell** |
|---------------------------|----------------------------|-------------------------|

### Referenzprozess Integration

**Bausteine Open API:**
1. **Initialisierung**
2. **Produktauswahl**
3. **Selbstdeklaration**
4. **Basisdaten**
5. **Erweiterte Daten**
6. **Identifikation**
7. **Background Checks**
8. **Vertragsabschluss**
9. **Signatur**
10. **Metadaten**
11. **Verteilung**

### Föderiertes System - Branchenübergreifend

#### Sektoren
- **Finance** (Finanzwesen)
- **Insurance** (Versicherungen)  
- **Mobility** (Mobilität)
- **Retail** (Einzelhandel)
- **Education** (Bildung)
- **Health** (Gesundheit)

### Systemziele

**Aufbau eines föderierten Systems** mit klaren Verantwortlichkeiten und einheitlichen Regeln zur Sicherstellung von Interoperabilität und Datenhoheit.

**Nutzung standardisierter Datenbausteine** und Interaktionen zur modularen und effizienten Gestaltung des Datenaustausches einer Kundenbeziehung.

**Etablierung eines branchenübergreifenden Basissets** und Standards, der sektorübergreifend einsetzbar ist (z.B. Finanz-, Wohn- oder Konsumbereich) und breite Marktdurchdringung ermöglicht.

**Zielgruppe:** Privatkunden (Firmenkunden)

---

## 3. Übersicht Modelle - Systemarchitekturen

### Modell 1 – API Calls zur zentralen Registry

#### API-Schnittstellen – Modell 1: Zentrale Metadaten-Registry

**1. Anfrage an zentrale Registry:**
```json
POST /registry/check
{
    "firstName": "Max",
    "lastName": "Muster", 
    "dateOfBirth": "1980-05-12"
}
```

**2. Antwort:**
```json
{
    "identificationFound": true,
    "holdingBankId": "BANKA001"
}
```

**3. Abruf der Identifikationsdaten von Bank A:**
```json
POST /identification/request
{
    "customerId": "KUND123456",
    "requestingBankId": "BANKB001",
    "customerConsent": true
}
```

**4. Antwort:**
```json
{
    "identificationData": { "... Full Dataset ..." }
}
```

### Modell 2 – Dezentrale Peer-to-Peer Suche (Broadcast)

#### Variante 2: Verteilter Broadcast (dezentrale Suche)

**Funktionsweise:**
Bank B fragt nacheinander oder parallel bei allen angeschlossenen Banken an.

- Es existiert kein zentraler Index
- Bank B muss bei allen bekannten Teilnehmerbanken (Bank A, C, D, …) eine identische Anfrage stellen
- Jede Bank prüft lokal, ob sie den Kunden kennt, und antwortet: "Ja/Nein"

#### Vorteile:
- Vollständig dezentral → keine zentrale Stelle nötig
- Einfacher regulatorisch (keine zusätzliche Instanz)

#### Nachteile:
- Unnötiger Netzwerkverkehr, wenn viele Banken beteiligt sind
- Längere Antwortzeit
- Mehr technische Komplexität im Umgang mit parallelen Antworten

### Modell 2 – API Calls im dezentralen Modell

#### API-Schnittstellen – Modell 2: Peer-to-Peer Broadcast

**1. Anfrage an alle teilnehmenden Banken:**
```json
POST /identification/check
{
    "firstName": "Max",
    "lastName": "Muster",
    "dateOfBirth": "1980-05-12"
}
```

**2. Beispiel-Antwort von Bank A:**
```json
{
    "identificationFound": true,
    "customerId": "KUND123456"
}
```

**3. Abruf der Daten von Bank A (wie bei Modell 1):**
```json
POST /identification/request
{
    "customerId": "KUND123456",
    "requestingBankId": "BANKB001",
    "customerConsent": true
}
```

**4. Antwort:**
```json
{
    "identificationData": { "... Full Dataset ..." }
}
```

---

## 4. Umgang mit Sonderfällen und Prozesskomplexität

### Problematische Einzelfälle ("KillerFälle")

**Diskussionspunkt:** Wie geht man mit sogenannten "KillerFällen" um (problematische Einzelfälle mit hohem Risiko)?

- Es geht um Einzelfälle, die zwar selten, aber mit hohen Risiken und möglichen Strafen verbunden sind
- Mehrstufiges System denkbar – Start z.B. beim einfachen Zahlungskonto, dann sukzessiver Ausbau
- KYC-Prozesse sind besonders bei Kreditfragen schwierig, da Banken unterschiedliche Standards anwenden

### Implementierungsstrategie

**Abschlussprozesse** (z.B. Kontoeröffnung) sind grundsätzlich unabhängig vom Daten- oder Informationsaustausch.

**Konsens:** dass mit dem dezentralen Ansatz gestartet werden soll, allenfalls mit gezielt dezentral und ein Ausbauschritt auf zentral bei genügend Einsatz möglich wäre.

---

## 5. Der erste Validierungscall am 03.06.2025

### Zielsetzung des Validierungscalls

**1. Validierungscall**

**Ziele:**
- Inhaltliche Vorstellung der Open API und Einbettung in den Gesamtrahmen des Open Banking-Projects
- Präsentation des initialen API-Design der Open API Kundenbeziehung
- Sounding und Einholung von Feedback aus der Community

### Wertvolles Feedback zur Weiterentwicklung des API-Design

#### Berücksichtigtes Feedback

**Ergänzung relevanter Datenfelder** zur Verbesserung der Datenvollständigkeit (z.B. Ausstellungsort des Ausweisdokuments oder gültiges VSB-Reglement während der Identifikation)

**Kritische Überprüfung und Anpassung des Consent-Flows,** da der Kundenconsent im initialen Entwurf "zu spät" eingeholt wurde.

**Potenzielle Einschränkung der Datenweitergabe** auf Kund:innen mit aktiver IBAN, speziell für die Eröffnung einer Bankkundenbeziehung (in Prüfung).

### Detailliertes Feedback aus der Community

#### Feedback 1
**Kunde an API:** verständlich  
Anschließend verläuft der Flow da von Bank A an Bank B die Initialisierung des Kundenannahme-Prozesses.

**Unklar:** Wie soll dieser Finch konzipiert werden, wenn der eine Bank ein technisches Problem hat, was technisch problematisch erscheint.

**Unklarheit:** Wie soll dieser Finch konzipiert werden, wenn der eine Bank ein technisches Problem hat?

#### Feedback 2  
Bei der Consent-Flow, bei der Bank A zwar bereits die Consent-Bestätigung von Kunde vorlegt, liegt noch ein de-consent vor.

**Anmerkung:** Technisch ist klar, wie Bank A diese Modalität schaltet, dass es sich um eine identifikation handelt, obwohl der eigentliche Consent-Prozess (z-Backend) de-/Consent-Check erst nach einer Initialisierung wird.

#### Feedback 3
Werden die Identifikation-Dossiers dann erhärtet bei Bank A gespeichert oder verbleiben sie ausschließlich bei Bank A?

Wie erfolgt die Übergabe der Daten über Bank A?

#### Weiteres Feedback

**Vorschlag 1:** Implementierung eines Korrektur-Mechanismus, falls sich im Nachhinein herausstellt, dass eine Identifikation fehlerhaft war (z.B. durch menschliche Fehler oder technische Probleme)

**Vorschlag 2:** Nutzung von OAuth 2.0 als Autorisierungs-Standard

**Vorschlag 3:** Das bislang vorgesehene Triplet (Vorname, Nachname, Geburtsdatum) ist in der Schweiz nicht eindeutig. Daher Nutzung mit Bürgerort und/oder Geburtsort.

**Vorschlag 4:** Ergänzende Datenfelder zur Identifikation: Das Dokument-Erstellungsdatum der Identifikation soll angezeigt werden.

**Vorschlag 5:** Nutzung von API Management-Plattformen soll geprüft werden, eine saldierte Kunde soll vorgesehen werden für die Übergabe und Rückgabe der eingereichten Daten.

---

## 6. Zielbilder der digitalen Kundennähe

### Unsere Zielbilder bilden die Basis für unternehmensübergreifende Kollaborationen

**Open API Kundenbeziehung Proof of Value "Nutzung Schweizer E-ID"**

#### Zielbild 1: Direkt (Klassisch)
**Mögliche Use Cases:**
- Eröffnung Bankkonto
- Abschluss Versicherung

**Struktur:** Kunde ↔ Individualist

#### Zielbild 2: Indirekt  
**Mögliche Use Cases:**
- Embedding von Finanzprodukten
- AIS und PIS (PSD2)

**Struktur:** Kunde ↔ Integrator ↔ Produzent

#### Zielbild 3: Intermediär
**Mögliche Use Cases:**
- Embedding von Finanzprodukten
- Multi Banking (SIX bLink)

**Struktur:** Kunde ↔ Integrator ↔ Produzent ↔ Intermediär

#### Zielbild 4: Plattform
**Mögliche Use Cases:**
- Embedding von Finanzprodukten  
- Marktplatz für Handel von VC & PE-Investments

**Struktur:** Kunde ↔ Produzent ↔ Produzent ↔ Plattform

#### Zielbild 5: Dezentral
**Mögliche Use Cases:**
- Eröffnung Bankkonto mit Schweizer E-ID (ab 2026)

**Struktur:** Kunde ↔ Integrator ↔ Produzent ↔ Trust Network

**Legende:**
- **Leistungsfluss:** →
- **Datenfluss:** →  
- **Consentfluss:** → (optional)

### Aktuelle Marktperspektiven

**Der aktuelle Markt** fokussiert sich verstärkt auf Zielbild 3, insbesondere in Verbindung mit bLink als technischer Plattform.

**Internationale Technologiekonzerne** und ähnliche Akteure verfolgen eher Zielbild 5, das stärker auf dezentrale Identitätslösungen und übergreifende Logiken abzielt.

**Zielbild 1 und 2** sind aus heutiger Sicht kurzfristig am realistischsten umsetzbar, insbesondere innerhalb unseres Projektkontexts.

### Fokussierung im aktuellen Projektsetting für die nächsten 3 Monate

**Konzentration auf Zielbilder 1 und 2,** da sie eine schnelle Umsetzbarkeit ermöglichen.

**Gleichzeitig soll geprüft werden,** ob und wie eine Erweiterung in Richtung Zielbild 3 oder 4 sinnvoll und machbar ist.

**Zielbilder 3 und 4** bieten zusätzliche Perspektiven, vor allem im Hinblick auf Weiterentwicklungen bestehender Prozesse und Strukturen.

### Unterschiedliche Modelle: E-ID vs. Open API Kundenbeziehung

**Die Konzepte E-ID und Open API Kundenbeziehung** basieren auf zwei grundlegend unterschiedlichen Modellen.

**Rein theoretisch betrachtet** fällt Zielbild 5 nicht in den Scope einer Open API Kundenbeziehung, da dort eher identitätszentrierte (Datenhaltungs)Ansätze verfolgt werden.

### Fazit & Ausblick

**Kurzfristiger Fokus** auf Zielbilder 1 und 2 – pragmatisch umsetzbar und auf bestehende Prozesse aufsetzbar.

**Mittelfristig strategische Perspektive** auf Zielbilder 3 und 4, insbesondere bei technologischen oder regulatorischen Weiterentwicklungen.

**Zielbild 5** bleibt ausserhalb des aktiven Projekt-Scopes, jedoch grundlegend ein Zielbild, welches aus strategischer Perspektive bedacht werden sollte.

---

## 7. Zusatzanmerkungen zu Zielbildern und E-ID

### Zielbilder

Die **Zielbilder 1 bis 4** verfolgen eine treuhänderische Datenweitergabe durch den Produzenten (z.B. Bank) im Auftrag und mit dem Consent des Kunden. 

Im **Zielbild 5** läuft der gesamte Datenaustausch über den Endkunden (Holder), der Produzent (Issuer) kann dabei nicht nachvollziehen, wo und wie häufig die ausgestellten Datenpunkte genutzt werden.

**Zusätzlich steht die Frage im Raum,** wie sich das Verhältnis zwischen den Banken und ihren Kunden in den Zielbildern 1-4 vs. Zielbild 5 verändert? In diese Frage wird im Rahmen des Community Workshops am 19.03.2025 aufgenommen.

### Weitere besprochene Themen

#### Zusammenspiel zwischen E-ID und Open API

Die Frage wurde gestellt, wie die E-ID mit der Open API zusammenwirken soll. In der Diskussion wurde klargestellt, dass die Daten zwar bei der Bank liegen, die **Datenhoheit jedoch zukünftig beim Kunden** liegen wird.

Dies betrifft insbesondere auch den **"Consent-Prozess"**, da der Kunde künftig selbst über die Weitergabe seiner Daten entscheiden kann. Besonders im 5. Zielbild spielt diese Datenhoheit und die Zustimmung eine zentrale Rolle.

#### Herausforderungen bei der Einführung der E-ID

Es wurde diskutiert, welche Herausforderungen mit der Einführung der E-ID verbunden sind. Dabei wurden folgende Punkte thematisiert:

- Falls der **biometrische Ausweis** als Voraussetzung für die E-ID erforderlich ist, könnte dies die Einführung erschweren
- Es müssen **überzeugende Anwendungsfälle ("Killer Use Cases")** entwickelt werden, um die Akzeptanz zu erhöhen. Ein Beispiel könnte das digitale Wahlrecht sein
- Es besteht **Unklarheit darüber, welche regulatorischen Anforderungen** von der FINMA festgelegt werden oder künftig relevant sein könnten
- **Fragen zur Haftung** und zur Anzahl der erforderlichen Sicherheitsfaktoren sind noch offen
- Zudem wurde das sogenannte **Stellvertreterproblem** thematisiert, das ebenfalls eine Herausforderung für die Implementierung der E-ID darstellt

#### Notwendigkeit einer zweiten Lösung neben E-ID

Es wurde die Frage gestellt, ob es sinnvoll sei, eine **zweite Lösung parallel zur E-ID** aufzubauen. Es wurde argumentiert, dass es derzeit wenig sinnvoll erscheint, wenn jedes Unternehmen für jede Person eigene Identifikation selbstständig vornimmt.

Zudem wurde festgehalten, dass die **Einführung der E-ID noch lange dauern wird**, jedoch bereits heute darauf geachtet werden muss, dass die zukünftigen Lösungen mit der E-ID kompatibel sind.

**Fazit:** Vor diesem Hintergrund war dem Tenor zu entnehmen, dass eine **"hybride Lösung"** speziell vor dem ökonomischen Hintergrund zahlreichen "unnötigen Verifikationen" sinnvoll ist und eine Lösung in Form der Open API Kundenbeziehung eine relevante Lösung darstellt.

---

## 8. Use Case 3: Altersverifikation

### Ausgangslage

**Aktuelle Herausforderungen:**
- Viele Dienstleistungen und Produkte erfordern eine Altersverifikation (z.B. Bankprodukte, E-Commerce, Gaming, Streaming)
- Kunden müssen ihr Alter oft mehrfach und bei verschiedenen Anbietern nachweisen
- Momentan gibt es keine vertrauenswürdige und standardisierte Altersverifikation, die aus Kundenperspektive medienbruchfrei und sicher ist
- Durch die Wiederverwendung der Information "Geburtsdatum" oder der einfachen Angabe "18+", "16+" kann der Zugang zu altersbeschränkten Services im Netzwerk effizienter gestaltet werden

### Umsetzung im Kontext "Open API Kundenbeziehung"

**Lösungsansätze:**
- Standardisierte Altersverifikation über ein Netzwerk, sodass Kunden ihr Alter nur einmal verifizieren müssen
- Wiederverwendung von Altersinformationen aus bestehenden KYC-Prozessen (z.B. Bankkonto, Behördenregistrierung)
- API-basierter Zugriff für Drittanbieter, um schnell und sicher Altersnachweise zu erhalten
- Datenschutzkonforme Lösung, bei der nur das relevante Attribut ("16+", "18+") geteilt wird, ohne das genaue Geburtsdatum offenzulegen

### Rollen im Netzwerk

- **Bankkunden**
- **Bank**
- **Kontributor**
- **Provider**

### Mehrwerte

**Reduzierter Aufwand für Kunden,** da Altersnachweise nicht mehrfach erbracht werden müssen.

**Schnellere und effizientere Verifikationsprozesse** für Banken und andere Unternehmen.

**Höhere Sicherheit und Datenschutz,** da nur notwendige Altersinformationen geteilt werden.

**Standardisierte, regulatorisch konforme Lösung,** die sich einfach in bestehende Systeme integrieren lässt.

### Kriterien zur Bewertung des Potentials (Quantitativ/Qualitativ)

#### Marktsicht
- **Kundennutzen:** ████████ (Hoch)
- **Mehrwert Bank:** ████████ (Hoch)
- **Mehrwert Kontributor:** ████████ (Hoch)
- **Mehrwert Provider:** ████████ (Hoch)
- **Marktvolumen:** ████████ (Hoch)

#### Umsetzbarkeit
- **Level of Assurance:** ████████████ (Sehr hoch)
- **API Abdeckungsgrad:** ████████████ (Sehr hoch)
- **Komplexität & Risiken*:** ████████ (Hoch)
- **Integrationsaufwand:** ████████ (Hoch)
- **Finanzielle Tragbarkeit:** ████████████ (Sehr hoch)

***inkl. Regulatorische Konformität, Strukturelle Governance, Reputationsrisiken**

### Aktuelle Pain Points

#### Sicht Kunde
**Kunden müssen ihre Identitäts- und Altersnachweise immer wieder neu erbringen,** was sowohl zeitaufwendig ist als auch zu einer vergröberten Customer Experience führt.

#### Sicht Bank/Unternehmen
**Unternehmen und Banken tragen hohe Kosten und eine hohe Komplexität** durch individuelle Altersprüfungen (Identitätsprüfungen).

#### Sicht Kontributor
**Anbieter von Altersverifikationsdiensten müssen sich in viele unterschiedliche Systeme integrieren,** was zu Ineffizienzen führt.

#### (Sicht Provider)
**Notwendigkeit zur Integration mit verschiedenen Banksystemen;** Sicherstellung der Einhaltung gesetzlicher Anforderungen bei der Datenverarbeitung.

---

## 9. Branchenübergreifende Netzwerk-Vision

### Die Open-API-Kundenbeziehung ermöglicht den standardisierten Austausch von Basis-, KYC- und Identitätsdaten zur Erschliessung des Netzwerkes

Das System verbindet verschiedene Branchen über einen standardisierten **Referenzprozess** mit 10 Teilschritten:

1. **Initialisierung**
2. **Produktauswahl** 
3. **Selbstdeklaration**
4. **Basisdaten**
5. **Erweiterte Daten**
6. **Identifikation**
7. **Checks**
8. **Abschluss**
9. **Signatur**
10. **Verteilung**

### Projektpartner "Open API Kundenbeziehung"

#### Aktuelle Partner
- **Hypothekarbank Lenzburg**
- **PostFinance**
- **Intrum**

### Branchenübergreifende Anwendung

Das Netzwerk erstreckt sich über verschiedene Sektoren:
- **Education** (Bildung)
- **Health** (Gesundheit)  
- **Retail** (Einzelhandel)
- **Weitere** Branchen

Jeder Sektor kann die standardisierten Datenbausteine und API-Schnittstellen nutzen, um effiziente Kundenbeziehungen aufzubauen und zu verwalten.

---

## 10. Zusammenfassung und Ausblick

Die vorliegende Dokumentation der Vertrauensnetzwerke zeigt die konzeptionelle Grundlage für die Implementierung föderierter Systeme im Rahmen der Open API Kundenbeziehung.

### Zentrale Erkenntnisse

**Modellauswahl:** Zwei Hauptarchitekturen stehen zur Verfügung - zentrale Registry vs. dezentrale Peer-to-Peer-Ansätze, wobei der dezentrale Ansatz aufgrund regulatorischer Einfachheit bevorzugt wird.

**Zielbilder 1-5:** Fokus auf Zielbilder 1 und 2 für kurzfristige Umsetzbarkeit, strategische Perspektive auf Zielbilder 3 und 4 für mittelfristige Entwicklung.

**E-ID Integration:** Hybride Lösung als pragmatischer Ansatz, da E-ID-Einführung noch Zeit benötigt, aber Kompatibilität sichergestellt werden muss.

**Community Feedback:** Validierungscall zeigt wichtige Verbesserungen bei Datenfeldern, Consent-Flow und technischen Implementierungsdetails.

### Nächste Schritte

**Konzeptionelle Ausarbeitung:** Detailliertere Ausarbeitung bis zum Open Banking Summit

**API-Design Finalisierung:** Integration des Community-Feedbacks in die technischen Spezifikationen

**Föderiertes System:** Entwicklung der Governance-Strukturen und Rollen-Definition

**Branchenübergreifende Expansion:** Vorbereitung für Erweiterung über Finanzsektor hinaus

Die Dokumentation bildet die konzeptionelle Grundlage für die Entwicklung vertrauensvoller, dezentraler Systeme im Schweizer Open Banking Ökosystem.