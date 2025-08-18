# OBP Umsetzung und Implementation

**Koordiniert von:** Business Engineering Institute St.Gallen

## Umsetzung und Implementation Überblick

### Hauptkomponenten
- **Planung und MVP**
- **Umsetzung**

## Next Steps für die Use Case Entwicklung

### Strategische Ausrichtung

**Use Cases als Option zur Umsetzung:**
- Use Cases als Validierung der Anwendung im Zielbild der OPEN API Kundenbeziehung
- Use Case idealerweise Kandidat für erste Umsetzung
- Gedanken als Diskussionsgrundlage

### Umsetzungsperspektive und Fokus: Use Case & Bausteine

#### Welcher Use Case wird konzeptionell umgesetzt?

**Entscheidung:** Zukünftig wird ein spezieller Fokus auf die Konzeptionalisierung des **Use Case 1** gelegt. Innerhalb dieses Cases wird anvisiert mit dem Baustein **"Identifikation"** als Teil des Use Cases zu starten (MVP).

**Vorteil:** Die Wiederverwendbarkeit dieses Bausteins in weiteren Szenarien macht ihn besonders attraktiv für eine modulare Umsetzung. Insgesamt lässt sich Baustein «Verifikation» potenziell gut im anvisierten zeitlichen Rahmen realisieren.

#### Ausgeschlossene Bausteine

**Der Baustein "Selbstdeklaration"** hingegen ist für eine kurzfristige Umsetzung zu komplex, insbesondere aufgrund:
- der hohen Varianz bei den Datenanforderungen je Bank
- der fehlenden Standardisierung der Fragen
- sowie der Integrationskomplexität in bestehende Bankprozesse

**Fazit:** Die Umsetzung der Bausteine wäre zusätzlich eher ein «internes Thema» für spätere Phasen.

**Grundlegende Einschätzung:** Grundlegend besteht jedoch Skepsis, dass sämtliche Bausteine parallel oder vollständig umgesetzt werden können.

**Daher:** Fokus auf ausgewählte, realistisch umsetzbare Bausteine im Rahmen eines Basissetups.

### Business- und Technikperspektive

#### Erfolgsfaktoren für Umsetzung

**Für eine erfolgreiche Umsetzung braucht es sowohl:**
- einen technischen Umsetzungsplan
- als auch einen Business Case

#### Herausforderung Business Case

**Herausforderung:** Open-Finance-Initiativen tun sich wirtschaftlich oft schwer, einen tragfähigen Business Case zu formulieren. Die Motivation kommt grundlegend stärker aus der Kundensicht (Wünschbarkeit) oder aus dem regulatorischen Druck heraus.

**Wichtiger Punkt:** Die Frage nach einer Monetarisierung sollte frühzeitig adressiert werden – neben klassischen Nutzenargumenten wie:
- Kundenmehrwert (Pain-Point-Lösung)
- Leuchtturmcharakter / Innovationsvorsprung
- Datenbereitstellung
- Imagegewinn im Open-Banking-Umfeld

## Business Case Kalkulation

### Zahlen Business Case - HBL und PostFinance

| Kennzahl | HBL | PostFinance | Bemerkungen |
|----------|-----|-------------|-------------|
| **Anzahl Kunden (Privatkunden)** | 300'000 | 2'100'000 | |
| **Anzahl Kundeneröffnungen pro Jahr** | 60'000 | 110'000 | |
| **Anzahl (Re)-Identifikationen** | - | - | Keine Reidentifikationen |
| **Anzahl Mehrfachkunden** | 3'000 | - | Annahme HBL: 5% der jährlichen Eröffnungen |

### Kostenstruktur

| Kostenposition | HBL | PostFinance | Bemerkungen |
|----------------|-----|-------------|-------------|
| **Kosten Kundeneröffnung** | CHF 120.00 | CHF 130.00 | pro Kunde, Onboarding-Prozess |
| **Kosten Identifikation** | CHF 20.00 | CHF 20.00 | pro Kunde, reine digitale Identifikation |
| **Implementierungskosten OPEN API** | CHF 200'000 | CHF 200'000 | API für Identifikation umsetzen, mit Backend-Integration |

### Kosteneinsparungen Stufe 1 (Interne Optimierung)

| Einsparung | HBL | PostFinance | Bemerkungen |
|------------|-----|-------------|-------------|
| **Kosteneinsparungen Identifikation** | CHF 60'000 | - | Bei Mehrfachkunden HBL |
| **Stufe 1 inkl. Umsetzung API Jahr 1** | CHF -140'000 | - | |
| **Durchschnitt über 5 Jahre pro Jahr** | CHF 20'000 | - | |

**Anmerkung:** Der Kostenvorteil liegt zu 80% bei den Fintechs und zu 20% bei HBL aufgrund des Verrechnungsmodells der HBL.

### Kosteneinsparungen Stufe 2 (Bilateraler Austausch)

| Position | HBL | PostFinance | Bemerkungen |
|----------|-----|-------------|-------------|
| **Kosteneinsparungen Identifikation** | CHF 180'000 | CHF 220'000 | HBL: 15% durch PostFinance; PostFinance: 10% durch HBL |
| **Ertrag für PostFinance** | CHF -90'000 | CHF 90'000 | Annahme CHF 10.-/Weitergabe |
| **Ertrag für HBL** | CHF 27'500 | CHF -27'500 | Annahme CHF 10.-/Weitergabe |
| **Total Ersparnis pro Bank** | CHF 117'500 | CHF 282'500 | |
| **Kosten Umsetzung einmalig** | CHF 200'000 | CHF 200'000 | |
| **Total Einsparungen Stufe 2** | CHF -82'500 | CHF 82'500 | |
| **Durchschnitt über 5 Jahre pro Jahr** | CHF 77'500 | CHF 242'500 | |

**Total Benefit im Durchschnitt über 5 Jahre pro Jahr Stufe 2:** CHF 320'000

### Kosteneinsparungen Stufe 3 (Gesamtmarkt)

| Position | Wert | Bemerkungen |
|----------|------|-------------|
| **Anzahl Eröffnungen pro Jahr (Schweiz)** | 2'000'000 | Basierend auf Markthochrechnung |
| **Kosten Identifikationen** | CHF 20.00 | pro Identifikation |
| **Kosteneinsparungen total** | CHF 6'000'000 | Annahme: Kosten ca. 15% von heute |
| **Kosten Umsetzung der Banken** | CHF 4'000'000 | Annahme: 20 grösste Banken |
| **Kosteneinsparungen alle Banken/Jahr** | CHF 2'000'000 | Netto-Einsparung |

### Schlüsselfaktoren Business Case

**Kritische Erfolgsfaktoren:**
1. **Adoption Rate:** Mindestens 15% Cross-Bank Usage erforderlich
2. **Skalierung:** Ab 10+ teilnehmende Banken wirtschaftlich
3. **Standardisierung:** Einheitliche Implementation reduziert Kosten
4. **Regulatorische Unterstützung:** FINMA-Akzeptanz beschleunigt Adoption

**Risikofaktoren:**
- Langsame Marktadoption
- Technische Integrationsprobleme
- Regulatorische Unsicherheiten
- Konkurrenz durch E-ID

## Proof of Value - Schweizer E-ID

### Projektteilnehmende

**Phase 2: Umsetzung von POCs auf Public Beta**  
**Zeitraum:** Mai bis November 2025

Die Phase 2 fokussiert auf die praktische Umsetzung von Proof of Concepts (POCs) auf der Public Beta-Plattform der Schweizer E-ID, um die Kompatibilität und Integration der Open API Kundenbeziehung mit der staatlichen Identitätsinfrastruktur zu validieren.

**Teilnehmende Organisationen:**
- PostFinance
- Hypothekarbank Lenzburg
- Weitere Finanzdienstleister
- Technologie-Partner

## Implementation Roadmap

### Phase I: Strukturierung & Konstituierung (März - Juni 2025)

**Lieferergebnisse:**
- Föderiertes System Konzept
- Open API Kundenbeziehung Spezifikation
- Vorgaben für die Realisierung und Use Case

**Erwartungen:**
- Grundzüge eines föderierten Systems mit Rollen und Verantwortlichkeiten
- Rechtliche Rahmenbedingungen (DSGVO & nDSG, Stellvertretung)
- Zielbild & Konzeption Open API Kundenbeziehung
- MVP Definition und Use Case Dokumentation

### Phase II: Entwicklung & Bereitstellung (In Planung)

**Aktivitäten:**
- Entwicklung der Open API auf Basis des Basiskits
- Veröffentlichung und Dokumentation
- Repository-Bereitstellung
- Multilaterale MVP-Realisierung

**Deliverables:**
- Gemeinsam bereitgestellte API auf Github
- Open API Spezifikation
- eCH-Verifikation und I14Y-Veröffentlichung
- ISO-Zertifizierungsweg definiert

**Zieldatum:** 21.08.2025 - Open Banking Summit

---

**Quelle:** OBP Umsetzung.pdf, OBP Anforderungen relevante Slides.pdf