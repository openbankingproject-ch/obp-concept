# OBP Referenzprozess relevante slides - Vollständige Dokumentation

**coordinated by openbankingproject.ch**

## Inhaltsverzeichnis

### Referenzprozess
- Übersicht Referenzprozess
- "Blöckli" – Teilschritte des Referenzprozesses  
- Daten: Basiskit, Onboarding und Datenpflege
- Consent und Security (Vertrauensnetzwerke)
- API Design und Datenpunkte

---

## 1. Der branchenunabhängige Referenzprozess zur Serviceerschliessung

### Referenzprozess - Übersicht

Der branchenunabhängige Referenzprozess zur Serviceerschliessung offenbart Potenziale für die Wiederverwendung von Datenbausteinen:

**Referenzprozess Ablauf:**
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

### Use Case Details
Detaillierte Informationen siehe Excel "20250325 IST Referenzprozess Onboarding Bank"

---

## 2. Referenzprozess exemplarisch am Beispiel Bank Onboarding (1/2)

### Prozessschritte im Detail

| **Referenzprozess** | **Initialisierung** | **Produktauswahl** | **Selbstdeklaration** | **Erhebung Basisdaten** | **Erweiterte Daten** | **Identifikation** | **Background Checks** | **Vertragsabschluss** | **Signatur** | **Metadaten** | **Verteilung** |
|---------------------|---------------------|--------------------|-----------------------|------------------------|----------------------|-------------------|----------------------|----------------------|--------------|---------------|----------------|

### Beschreibung pro Schritt

| **Schritt** | **Beschreibung** | **Owner** | **Datenpunkte** |
|-------------|------------------|-----------|-----------------|
| **Initialisierung** | Webpage oder App der Bank; Abgabe initialer Consent | Kunde | Cookies [Ja, Nein], Consent [Ja, Nein], Länderauswahl |
| **Produktauswahl** | Auswählen der gewünschten Produkte z.B. Konto, Karte | Kunde | Kontotyp [Privat, Sparen, Jugend, ...], Bankpaket [Student, Jugend, ...] |
| **Selbstdeklaration** | Angaben zu wirtschaftlicher Berechtigung, Steuerdomizil, US Person | Kunde | wirtschaftliche Berechtigung [Ja, Nein], (abweichendes) Steuerdomizil [Schweiz, ...], US-Steuerpflicht [Ja, Nein], FATCA-Selbstdeklaration, TIN (Schweiz: AHV-Nummer), Herkunft der Gelder, Selbstdeklaration Steuerkonformität, Nationalität(en) |
| **Erhebung Basisdaten** | Erfassung von Personalien, Wohnadresse und Kontaktdaten | Kunde | Name, Vorname, Anrede, Gender, Geburtsdatum, Geburtsort, Bürgerort, Strasse, Hausnummer, Land, Kanton/Region/Staat/Provinz, Nationalität, Telefonnummer, Mobiltelefonnummer, E-Mailadresse, Abweichende Korrespondenzadresse, ID (z.B. Google, Apple, Samsung) |
| **Erweiterte Daten** | Produktspezifische erweiterte Daten | Kunde | Gesamtvermögen, Einkommen, Ausbildung, Beruf, Arbeitgeber |
| **Identifikation** | Videoidentifikation (gleichgesetzt persönlicher Vorsprache), Onlineidentifikation ("AutoIdent" plus Adresscheck), QES (gleichgesetzt Korrespondenzeröffnung) | Provider | Liveness-Check (Score), Gesichtsverifikation (Score), Name, Vorname, Gender, Lichtbild (Relevante Seite(n)), Ausweisnummer, Art des Dokuments [Pass, ID, Personalausweis], Ausstellungsdatum, Ausstellungsort, Gültigkeitsdatum, MRZ, NFC (biometrische Daten), Geburtsdatum, Ausstellende Behörde, Sicherheitsmerkmale (Anzahl geprüft und Score), Tonspur/Video [mp3, mp4] |
| **Background Checks** | immer: sanction, PEP, crime, adverse media checks; fakultativ: produktspezifische Checks (Bonität, ZEK/IKO, Betreibungsauskunft etc.) | Provider | sanction list check [ok, nok], PEP check [ok, nok], crime [ok, nok], adverse media check [...] |
| **Vertragsabschluss** | Akzeptieren der AGBs sowie produktspezifischen Bedingungen | Kunde | AGB [ok, nok], Data Sharing Agreement (DAS), (Basis-)Vertrag, Produktvereinbarung(en) (alle mit Version und Zeitstempel) |
| **Signatur** | Produktspezifische Ausprägung (Schritt 6 und 9 können zusammenfallen); z.B. Intrum + Swisscom/QuoVadis/SwissSign | Provider | Signatur [ok, nok] |
| **Metadaten** | Zeitstempel bei der Aufnahme des Datensets/Bausteine | System | Zeitstempel, Originator |
| **Verteilung** | Verarbeitung der Eröffnung | Bank | - |

**Fussnote:** ¹ und je nach gewählter Identifikation (Adressprüfung, Mobilnummercheck, E-Mailcheck, Wallet Check, Geräte-ID)

### Wichtige Fragen zum IST-Prozess

**Rechtliche Basis und Datenaktualität:**
- Rechtliche Basis (FINMA, VSB, Legal) für viele Details nötig
- Aktualität der Daten kann nicht garantiert werden:
  1. Darf man diese dann verwenden, oder nur mit Bestätigung Korrektheit durch Kunde?
  2. Möchte man diese als neue Bank überhaupt für ein neues Onboarding verwenden? (insbesondere Use Case Bank zu Bank)

**Möglichkeit:** Automatisches Ausfüllen aber Daten müssen vom Kunden noch bestätigt werden

**Haftung und Verantwortung:**
- Haftung, wenn nicht durch den Kunden direkt bestätigt? (für Korrektheit, Aktualität, Falscherfassungen, etc.)

**Out of Scope Kunden zu definieren (Beispiele):**
- Workout/Recovery Positionen
- MROS Meldungen  
- Einschränkung Dauer seit Onboarding oder Dauer seit letzter Datenüberprüfung
- Einschränkung Kundenbeziehungen älter als xx.xx.xx
- Differenzierung Pflichtfelder und optionale Felder

**Zentrale Fragestellung:** Eine zentrale Fragestellung am Bankenplatz betrifft die mögliche Vereinheitlichung von KYC-Prozessen. Angesichts der bestehenden Vielfalt an bankindividuellen Standards und regulatorischen Auslegungen stellt sich die Frage, wie sich dies auf die Konzeption der Open API Kundenbeziehung auswirkt.

**Sinnvollerweise sollte ein Minimalstandard definiert werden, welcher individuell erweitert werden kann.**

---

## 3. Soll-Prozess Use Case 1 – Kontoeröffnung / Bankwechsel

### Prozessablauf SOLL-Zustand

| **Schritt** | **Beschreibung** | **Details** |
|-------------|------------------|-------------|
| **Initialisierung** | Bei neuer Bank über Webpage oder App, am Point of Sales, etc. | |
| **Produktauswahl** | Auswählen der gewünschten Produkte z.B. Konto, Karte | |
| **Consent-Mechanismus** | Consent und Security Flow vor Datensharing | |
| **Austausch Baustein Selbstdeklaration** | Austausch standardisierter Datenpunkte | |
| **Austausch Baustein Basisdaten** | Austausch standardisierter Datenpunkte | |
| **Austausch Baustein Identifikation** | Austausch standardisierter Datenpunkte | |
| **Bankindividuelle erweiterte Daten** | Ev. weitere Datenpunkte gem. neuer Bank müssen von Kunde abgefüllt werden | |
| **Backgroundcheck** | (z.B. PEP Check) Individuell durch neue Bank | |
| **Vertragsabschluss** | AGB und weitere Bedingungen gem. neuer Bank | |
| **Signatur** | | |
| **Metadaten** | | |
| **Verteilung** | Verarbeitung durch neue Bank | |

### Rechtliche und regulatorische Fragestellungen

**Machbarkeit und Compliance:**
- Machbarkeit des Austauschs von Selbstdeklarationen ist aus rechtlicher Perspektive derzeit noch unklar
- Regulatorische Herausforderungen wie einmaliger vs. temporärer Consent, Haftungsfragen bei fehlerhafter Identifikation sowie Rücknahmeprozesse bei falschen Identitäten sind zu klären
- Seriosität der Verifikation muss systemisch garantiert werden

**Haftung und Originator:**
- Haftungsfrage bei Datendossiers: Wer gilt als "Originator" und ist somit primär haftbar? Abhängigkeit von Fahrlässigkeitsgraden (fahrlässig, grob fahrlässig etc.)
- Wie wird der Umgang mit Out-of-Scope-Fälle, z.B. bei veralteter Identifikation umgegangen

**Praxisbeispiel:**
- Datenmanagement bei Swissquote und PostFinance: Aus rechtlicher Perspektive handelt es sich um einen äußerst spannenden Case hinsichtlich Datenmanagement und regulatorischer Umsetzung – insbesondere im Kontext der Identifikation und Datenweitergabe

### Standardisierung, Prozesse und Bausteine

**Kritische Erfolgsfaktoren:**
- Standardisierung ist ein kritisches Thema über alle Bausteine hinweg
- Bankwechsel und Kontoeröffnung teilen sich weitgehend identische Prozessbausteine
- Selbstdeklaration als "Baustein" aktuell schwer umzusetzen, vor dem Hintergrund erscheint eine Fokussierung auf das Basiskits plus Verifikation sinnvoll – als ersten initialen Schritt

**Historische Herausforderungen:**
- Im Bankenmarkt bestehen historisch gewachsene Unterschiede in den Onboarding-Standards, insbesondere hinsichtlich der erhobenen Datenpunkte und Prozessausgestaltung
- Diese Heterogenität ist auch auf sich wandelnde regulatorische Anforderungen zurückzuführen – so galten beispielsweise im Jahr 2015 andere KYC-Vorgaben als heute im Jahr 2024

---

## 4. Detaillierte Baustein-Analyse für Soll-Prozess

### Baustein: Selbstdeklaration

| **Datenbaustein** | **Beschreibung** | **Datenpunkte** | **Bemerkungen / Überlegungen** |
|-------------------|------------------|-----------------|--------------------------------|
| **Selbstdeklaration** | Angaben zu wirtschaftlicher Berechtigung, Steuerdomizil, US Person | - wirtschaftliche Berechtigung [Ja, Nein] (in bankindividuellem Teil, da produktabhängig)<br>- (abweichendes) Steuerdomizil [Schweiz, ...]<br>- US-Steuerpflicht [Ja, Nein]<br>- FATCA-Selbstdeklaration<br>- TIN (Schweiz: AHV-Nummer)<br>- Herkunft der Gelder (in bankindividuellem Teil)<br>- Selbstdeklaration Steuerkonformität | - Steuerdaten erst ab 30.06.14 (FATCA Einführung)<br>- Steuerdaten: einheitliche Fragestellungen realistisch? Altbestand? Haftbarkeit, wenn Bestätigung nicht direkt durch Kunde?<br>- Datum der Daten wichtig, für periodische Überprüfungen, Akzeptierung etc. |

### Baustein: Basisdaten

| **Datenbaustein** | **Beschreibung** | **Datenpunkte** | **Bemerkungen / Überlegungen** |
|-------------------|------------------|-----------------|--------------------------------|
| **Basisdaten** | Personalien, Wohnadresse und Kontaktdaten | - Name<br>- Vorname, Mittelname<br>- (Anrede)<br>- Gender<br>- Geburtsdatum<br>- Zivilstand<br>- (Geburtsort)<br>- (Bürgerort)<br>- Strasse<br>- Hausnummer<br>- Land<br>- (Kanton/Region/Staat/Provinz)<br>- Nationalitäten<br>- (Telefonnummer)<br>- Mobiltelefonnummer<br>- E-Mailadresse<br>- (Abweichende Korrespondenzadresse)<br>- (ID (z.B. Google, Apple, Samsung)) | - Datum der Daten wichtig, für periodische Überprüfungen<br>- Umgang mit Zweitnamen / mehreren Nachnamen<br>- Kürzung der Inhalte bei zu vielen Zeichen<br>- Ev. Bevollmächtigte einfliessen lassen (z.B. Auswahl wird angezeigt und ist durch Kunde anwählbar) |

### Baustein: Identifikation

| **Datenbaustein** | **Beschreibung** | **Datenpunkte** | **Bemerkungen / Überlegungen** |
|-------------------|------------------|-----------------|--------------------------------|
| **Identifikation** | Videoidentifikation (gleichgesetzt persönlicher Vorsprache), Onlineidentifikation ("AutoIdent" plus Adresscheck), QES (gleichgesetzt Korrespondenzeröffnung) | - Name<br>- Vorname<br>- Geburtsdatum<br>- Gender<br>- Lichtbild (Relevante Seite(n))<br>- Tonspur/Video [mp3, mp4]<br>- Ausweisnummer<br>- Art des Dokuments [Pass, ID, Personalausweis]<br>- Ausstellungsort (Land)<br>- Ausstellungsdatum<br>- Gültigkeitsdatum<br>- Ausstellende Behörde<br>- MRZ<br>- NFC (biometrische Daten)<br>- Sicherheitsmerkmale (Anzahl geprüft und Score) | - Datum u. Uhrzeit der Identifikation<br>- Welche Inhalte sind aus regulatorischer Sicht nötig (Tonspur, Video, Details zur Ersteinzahlung, etc.)<br>- Ersteinzahlung enthalten, oder weiterhin nötig?<br>- Wird ein aktueller Ausweis benötigt? (z.B. neu geheiratet, ID noch von vor Hochzeit → ID noch mit altem Name)<br>- Beschränken auf Basis Gültigkeitsdatum der ID? |

**Zentrale Herausforderungen Identifikation:**
- Rechtliche Basis (FINMA, VSB, Legal) für viele Details nötig
- Aktualität der Daten kann nicht garantiert werden
- Haftung, wenn nicht durch den Kunden direkt bestätigt? (für Korrektheit, Aktualität, Falscherfassungen, etc.)

---

## 5. Identifikation offener regulatorischer, rechtlicher und sonstiger Fragestellungen

### Kategorisierung der Fragestellungen

#### Regulatorische Fragestellungen

**Prinzipielle Regelungen:**
- Wird das Prinzip einer "Identifikation auf Vorrat" grundsätzlich erlaubt? (das bedeutet, ein neues Onboarding mit allenfalls nicht mehr gültigen Dokumenten wäre erlaubt - z.B. bei Ausweis gestohlen, Namensänderung bei Heirat etc.)

**Arten der Identifikation:**
- Welche Arten der Identifikation sollen weitergegeben werden können (z.B. nur Online / Video Ident?)

**Zeitliche Beschränkungen:**
- Definition Dauer, wie lange eine Identifikation wiederverwendet werden kann

**Ausweisdokumentation:**
- Details zu Ausweisen:
  - Gültigkeit für Wiederverwendung relevant?
  - Zugelassene Ausweisarten
  - Umgang mit Ausländern / Ausländerausweis nötig?

**Scope-Definitionen:**
- Festlegung von "out of Scope" Kundengruppen (z.B. Workout/Recovery Positionen, Kunden mit MROS Meldungen, etc.) vor Datenweitergabe, oder danach durch neue Bank?

#### Rechtliche Fragestellungen

**Delegation und Haftung:**
- Regelung der Delegation (Beispiel: HBL gibt ein Onboarding der Intrum an eine Drittbank weiter. Wem kommt welche Rolle und Haftbarkeit zu?)
- Haftung bei Online Ident. im Zusammenhang mit Ersteinzahlungen: Wer haftet wofür (da Identifikation aus Bestandteilen von Drittanbieter und Bank besteht)

**Wiederverwendung und Outsourcing:**
- Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden?

**Legal Einschätzung:**
- Ersteinschätzung Legal: Weitergabe nur mit Disclaimer/ohne Haftbarkeit

#### Sonstige Fragestellungen (HBL)

**Risikoexponierung:**
- Risikoexponierung: Interesse der Bank an einer Identifikation ohne Sicherheit der Aktualität / Qualität überhaupt gegeben? (Falls kein grösseres Risiko in Kauf genommen werden möchte, bedeutet dies eine enge Überprüfung der Fälle, was wiederum die Vorteile einer Wiederverwendung zunichte machen würde)

**Aufwand und Kosten:**
- Lohnt sich der Aufwand und die Kosten für die Einführung und Unterhalt eines weiteren Identifikationskanals für eine Bank?

### Vollversion des Fragenkatalogs

**Verfügbar unter:** Fragenkatalog Open API Kundenbeziehung_konsolidiert.xlsx

---

## 6. Daten: Basiskit, Onboarding und Datenpflege

### Phase I: Entwicklung eines "Basiskits" als Zielbild

**Zielsetzung:** Die Entwicklung eines "Basiskits" als Zielbild für die Weitergabe von Basis, KYC-, und Identitätsdaten bei der Eröffnung bzw. Schliessung einer Kundenbeziehung

### Harmonisierung relevanter Datensets

| **#** | **Vorschlag Bank I** | **Vorschlag Bank II** | **SFTI Mortgage API** | **SFTI Customer Mgmt. API** |
|-------|---------------------|----------------------|----------------------|----------------------------|
| 1 | Name | Name | name | lastName, fullName |
| 2 | Vorname(n) | Name | surName | givenName, middleName, title |
| 3 | Geburtsdatum | Vorname | birthDate | birthDate |
| 4 | Nationalität | Geburtsdatum | nationality | nationality |
| 5 | Domizil | Nationalität | | countryOfDomicile |
| 6 | Ausweisart | | | |
| 7 | Ausweisnr. | TIN | | |
| 8 | Lichtbild | Lichtbild | | |
| 9 | Adresse | Adresse | address | ContactInformation |
| 10 | | | maritalStatus | |
| 11 | | | applicantLanguage | language |

### Ermittlung und Rebundling von Bausteinen

#### Exemplarische Bausteine und Bestandteile

| **Baustein** | **Bestandteile** | **Funktionalität** |
|--------------|------------------|-------------------|
| **Basisdaten** | • Name, Vorname, Wohnadresse | • Bereitstellung von Basisinformationen |
| **ID (e-ID)** | • Lichtbild, Pass/ID Nummer | • Elektr. Signieren, Elektr. Siegeln, Bereitstellung von (SSI-konformen) Identitätsdaten |
| **Sign** | | • Unterzeichner, Signaturersteller |
| **PEP** | • Datenbank Abfrage und Prüfung | • Negative oder positive Abfrage |
| **CIAM** | • Datenschutz- und Einwilligungsmgmt. | • Consent Content, User Consent Selection |

### Fachliche Einordnung

#### Zielgruppen
| **Privatkunden** | **Firmenkunden** | **Institutionell** | **eVV** |
|------------------|------------------|-------------------|---------|
| Initial Fokus | Anschliessend | | |

#### Domizil
| **CH** | **EU** | **US** | **Weitere** |
|--------|--------|--------|-------------|

#### Nationalität
| **CH** | **EU** | **US** | **Weitere** |
|--------|--------|--------|-------------|

#### Prozess
| **Onboarding** | **Pflege** | **Saldierung** |
|----------------|-------------|---------------|

#### Fachbereiche
| **Übergreifend** | **Zahlen** | **Anlegen** | **Finanzieren** |
|------------------|-------------|-------------|-----------------|

### Anwendungsfälle - Scope Definition

#### In Scope (Konzeption)
- Identifikation
- Erhebung Basisdaten
- Erhebung erweiterte Daten
- Einreichung Unterlagen
- Aktualisierung Basisdaten
- Aktualisierung erweiterte Daten
- Aktualisierung Evidenzen
- Aktualisierung Unterlagen
- Authentifizierung Kunde
- Einreichung Saldierungsinstruktion
- Übergabe Daten an Nachfolgebank
- Abwicklung Erbschaft

#### Weitere Ausbaustufen
(Für künftige Entwicklungsphasen vorgesehen)

---

## 7. Consent und Security (Vertrauensnetzwerke)

### Branchenübergreifender Standard für standardisierten Datenaustausch

**High-level Ziel:** Aufbau und Etablierung einer branchenübergreifenden und selbstbestimmten digitalen Kundenbeziehung

### Systemarchitektur Föderiertes System

#### Standards
| **Data Standard** | **API Standard** | **Security Standard** |
|-------------------|------------------|----------------------|
| Stand. Datenbausteine | API Spezifikation | Consent-Flow |
| Stand. Datenaustausch | | Security Flow |
| | | Autorisierung |

#### Governance Model
**Verwaltung und Pflege** | **Sicherheit und Betrieb** | **Finanzierungsmodell**

### Bausteine Open API

#### Referenzprozess Integration
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

## 8. API Design und Datenpunkte

### Datenpunkte – Basic Dataset (Version 1.0)

**Grundlegende Datenfelder:**

- **customerId (String):** Interne Referenznummer der Bank
- **firstName (String):** Vorname des Kunden
- **lastName (String):** Nachname des Kunden
- **dateOfBirth (Date):** Geburtsdatum im Format YYYY-MM-DD
- **identificationDate (Date):** Datum der durchgeführten Identifikation
- **identificationMethod (String):** Methode der Identifikation (z.B. VideoIdent)
- **vsbStatus (Object):** VSB-Status (Version, erfüllt/ausstehend)
- **customerConsent (Boolean):** Zustimmung zur Weitergabe
- **consentValidUntil (Date):** Gültigkeit der Zustimmung

### Datenpunkte – Full Dataset (Version 1.0)

**Erweiterte Datenfelder:**

**Alle Felder aus dem Basic Dataset plus:**

- **address (String):** Kundenadresse
- **nationality (String):** Nationalität (CH, DE, ...)
- **identificationDocument (Object):**
  - **documentType (String):** Typ des Dokuments (Pass, ID)
  - **documentNumber (String):** Nummer des Dokuments
  - **issuingCountry (String):** Ausstellungsland
  - **validUntil (Date):** Gültigkeit des Dokuments
- **documentDownloadUrl (String):** Download-Link zum PDF-Dokument
- **videoReference (String/null):** Link zur Videoidentifikation
- **performedBy (String):** Wer hat die Identifikation durchgeführt
- **createdAt (Timestamp):** Zeitpunkt der Erstellung
- **hashSignature (String):** Prüfsumme zur Gewährleistung der Datenintegrität

### API-Endpoint-Übersicht (Version 2.0)

#### Vollständige Datenabfrage

| **Endpoint** | **HTTP** | **Zweck** | **Request (Hin)** | **Response (Her)** |
|--------------|----------|-----------|-------------------|-------------------|
| `/customer/identification` | POST | Nur Identifikationsdaten | `{ sharedCustomerHash }` | `{ identArt, referenznummer, ausstellungsdatum, gueltigBis, ausgestelltIn, pdfUrlPassportScan }` |

#### Granulare Daten-Endpunkte (nur Teilmengen)

| **Endpoint** | **HTTP** | **Zweck** | **Request (Hin)** | **Response (Her)** |
|--------------|----------|-----------|-------------------|-------------------|
| `/customer/basic` | POST | Nur Stammdaten (Name, Vorname, Geburtsdatum, Nationalität) | `{ sharedCustomerHash }` | `{ name, vorname, geburtsdatum, nationalitaet }` |
| `/customer/address` | POST | Nur Adressdaten (Haupt- & Korrespondenzadresse) | `{ sharedCustomerHash }` | `{ adresse: { strasse, hausnummer, plz, ort, landcode }, korrespondenz?: { … } }` |
| `/customer/contact` | POST | Nur Kontaktdaten (Telefon, E-Mail) | `{ sharedCustomerHash }` | `{ telefonNum, email }` |
| `/customer/kyc` | POST | Nur KYC-Attribute ohne Ausweis | `{ sharedCustomerHash }` | `{ amlRisikoklasse, pepTyp, wirtschaftlich_berechtigt, fatcaStatus, tin }` |

---

## 9. Use Case 1b: Kontoeröffnung resp. Bankwechsel mit Bezug zu Zielbild 2

### Ausgangslage

**Aktuelle Herausforderungen:**
- Kunden müssen bei der Kontoeröffnung ihre persönlichen Daten und Identitätsnachweise erneut bereitstellen, selbst wenn sie bereits bei anderen Banken und Unternehmen verifiziert wurden
- Unterschiedliche Onboarding-Prozesse innerhalb von Banken führen zu Ineffizienzen und Medienbrüchen
- Die Nutzung von standardisierten Datenbausteinen innerhalb eines Netzwerks (z.B. PostFinance & YUH) kann den Prozess der Kontoeröffnung und des Bankwechsels erheblich erleichtern

### Aktuelle Pain Points

#### Sicht Kunde
- Hoher administrativer Aufwand und Zeitverlust durch mehrfach notwendige Dateneingabe

#### Sicht Bank I
- Hohe Kosten und Komplexität bei der Harmonisierung verschiedener Onboarding-Strecken
- Nichtgehobene Effizienzen im Kontoeröffnungsprozesse
- Geringe "Vernetzung" ins Finanznetzwerk

#### Sicht Kontributor: Bank II
- Es gibt weder Anreize noch eine Möglichkeit für den ursprünglichen Herausgeber (z.B. eine Bank), eine Identität weiterzugeben
- Zusätzlich ergeben sich hohe Produktionskosten für die Identitätsprüfung

#### (Optionale) Sicht Provider
- Fragmentierte IT-Infrastruktur erfordert individuelle Schnittstellen für jede Bank
- Hohes Sicherheitsbedürfnis erfordert aufwändige Mehrfachprüfungen (z.B. 2FA, KYC-Prozesse)

### Umsetzung im Kontext "Open API Kundenbeziehung"

**Lösungsansätze:**
- Durch die Open API können Kundendaten nach gegebenen Consent zwischen Banken ausgetauscht werden und für die neue Kontoeröffnungen oder Bankwechsel genutzt werden
- Harmonisierung von Onboarding-Strecken innerhalb der Bank durch standardisierte Datenbausteine
- Wiederverwendung von Kundendaten zur Reduktion von Medienbrüchen und Hebung von Effizienzen im Kontoeröffnungsprozess
- Nahtlose Integration zwischen verschiedenen Banken zur Vereinfachung des Kontoeröffnungsprozesses respektiv des Bankwechsels

### Rollen im Netzwerk

- **Bankkunden**
- **Bank**
- **Bank**
- **(opt.) Provider**

### Mehrwerte

- Reduktion von redundanten Dateneingaben durch automatisierte Wiederverwendung von bereits verifizierten Informationen
- Nahtlose Integration, hohe Sicherheitsstandards und Usability für den Kunden
- Schnellere und einfachere Kontoeröffnung und Bankwechselprozesse
- Hebung von Effizienzen im Kontoeröffnungsprozess für Banken
- Kosteneinsparpotenzial durch potenziell schlankere Prozesse und Verringerung von Mehrarbeiten bspw. im Verifikationsprozess

### Kriterien zur Bewertung des Potentials (Quantitativ/Qualitativ)

#### Marktsicht
- **Kundennutzen:** ████████████████ (Sehr hoch)
- **Mehrwert Bank:** ████████████████ (Sehr hoch)  
- **Mehrwert Kontributor:** ████████████ (Hoch)
- **Mehrwert Provider:** ████████ (Mittel)
- **Marktvolumen:** ████████████████ (Sehr hoch)

#### Umsetzbarkeit
- **Level of Assurance:** ████████████ (Hoch)
- **API Abdeckungsgrad:** ████████████ (Hoch)
- **Komplexität & Risiken*:** ████████████ (Hoch)
- **Integrationsaufwand:** ████████████████ (Sehr hoch)
- **Finanzielle Tragbarkeit:** ████████████████ (Sehr hoch)

***inkl. Regulatorische Konformität, Strukturelle Governance, Reputationsrisiken**

**Welcher Anwendungsfall ist relevanter: die Kontoeröffnung oder der Bankwechsel?**

---

## 10. Use Case Ranking und Priorisierung

### Use Case geordnet nach Punkteranking

| **#** | **Use Case** | **Beschreibung** | **Klebepunkte** |
|-------|--------------|------------------|-----------------|
| 1 | **Bankwechsel/Kontoeröffnung** | Wiederverwendung von sämtlichen, für eine Kundeneröffnung bei einer Bank relevanten Datenpunkte | **13 Punkte** |
| 2 | **Re-Identifikation** | Wiederverwendung von relevanten "Identifikationsdaten" | **7 Punkte** |
| 3 | **Altersverifikation** | Wiederverwendung des Datenpunkts "Geburtsdatum" oder Teilen (z.B. "18+", "16+") zum Beispiel für den Kauf von Alkohol im E-Commerce | **4 Punkte** |
| 4 | **EVV Use Case** | Wiederverwendung von relevanten Datenpunkten aus der externen Vermögensverwaltung | **4 Punkte** |
| 5 | **Mietvertrag** | Wiederverwendung von relevanten Datenpunkten für den Abschluss eines Mietvertrages | **2 Punkte** |
| 6 | **Leasing, Privatkredit** | Wiederverwendung von relevanten Datenpunkten zum Abschluss eines Leasings oder Konsumkredits | **2 Punkte** |
| 7 | **Arzt, Spital** | Wiederverwendung von relevanten Datenpunkten zur Weitergabe bei Arzt oder im Spital | **1 Punkt** |
| 8 | **Re-Identifikation** | Wiederverwendung von sämtlichen, für eine Kundeneröffnung bei einer Bank relevanten Datenpunkte | **1 Punkt** |
| 9 | **Hypothekenablösung** | | **1 Punkt** |

### Bewertungshinweise und Abgrenzungen

**Bankenwechsel und Kontoeröffnung** sind als ein Use Case zu verstehen.

**Re-Identifikation:** Re-Identifikation ein eigener Use Case und darf nicht mit der Kontoeröffnung vermischt werden. Im Kontext der Re-Identifikation sind die Regelungen des GWGs zu berücksichtigen. Spannend für die Weitergabe der Identifikation ist zusätzlich, nach welchem zugrunde liegenden Regelset die letzte Identifikation stattgefunden hat. Da sich diese Regeln über die Jahre ändern können, muss dies bei der Weitergabe berücksichtigt werden und das entsprechende "Regelset" vermerkt werden.

**Generelles To Do:** Laufende Fortführung der regulatorischen Anforderungen

**Abgestimmtes Vorgehen bei der Use-Case-Evaluation:** Die Use Cases werden initial vom BEI ausgearbeitet und anschliessend zeitnah rotiert, um alle Meinungen und Perspektiven zu den einzelnen Use Cases einzuholen.

---

## 11. Aufbau eines föderierten Systems

### Mehrwerte für die Bank und Ihre Kunden

#### Stufen der Systemeinführung

| **Stufe 1** | **Stufe 2** | **Stufe 3** | **Stufe 4** |
|-------------|-------------|-------------|-------------|
| Beschleunigung des Customer Onboarding innerhalb der Bank | Weiterverwendung von Identitäts- und Basisdaten zwischen Banken | Austausch von weiteren Daten zwischen Banken | Branchenübergreifender Austausch von relevanten Kundendaten (z.B. Altersverifikation) |

### Datenarten nach Ausbaustufen

#### Basisdaten (Stufe 1-2)
- Name
- Adresse  
- Geburtsdatum
- Nationalität

#### Erweiterte Daten (Stufe 3)
- Kenntnisse + Erfahrungen
- Gesamtvermögen
- Arbeitgeber
- Beruf
- Anlagehorizont

#### Transaktionsdaten (Stufe 3)
- Daueraufträge
- LSV
- Transaktionsdaten
- E-Bill

#### Zusatzdaten (Stufe 4)
- PEP-Check
- Versicherungsdaten
- Pensionsplanung
- Pensionskassenausweis
- Grundbuchauszug
- Steuererklärung
- EVV-Daten

### Zentrale Vorteile

**Das Kundenerlebnis** wird einfacher, sicherer und schneller, während die Onboarding-Kosten pro Neukunde sinken

**Die regulatorische Konformität** im Kontext des revidierten Datenschutzgesetzes (Datenportabilität) wird hergestellt

**Ein nationaler Standard** zur Weitergabe von digitalen Kundendaten kann mitgestaltet werden

**Erschliessung von neuen Ertragsmöglichkeiten** im Kontext der Datennutzung im Netzwerk

**Steigerung der Integrations- und Abwicklungseffizienz** zwischen den involvierten Parteien (z.B. Partner) dank den gemeinsam akzeptierten und gelebten Standards

**Banken können ihre Kompetenzen branchenübergreifend platzieren** und sich als Vertrauensanker gegenüber ihren Kunden positionieren (Differenzierungsvorteil)

**Wesentliche Trends** im Kontext dezentraler Geschäftsmodelle (E-ID, SSI) werden adaptiert

### Unser Ziel

Aufbau eines föderierten Systems zur unternehmensübergreifenden Zusammenarbeit entlang des Lebenszyklus von Bankkunden und zum selbstbestimmten Umgang der Kunden mit ihren Daten.

---

## 12. Lieferergebnisse und Erwartungshaltung Phase 1

### Lieferergebnisse in Phase 1

**Föderiertes System:**
- Grundzüge eines föderierten Systems mit den Rollen, den grundsätzlichen Verantwortlichkeiten und einer ersten Version der daraus abgeleiteten Netzwerkgovernance

**Open API Kundenbeziehung:**
- Zielbild & Konzeption Open API Kundenbeziehung
- Umfang und Abgrenzung Basiskit
- Semantische Definition aller Elemente im Basiskit mit Marktinput abgestimmt
- Konzeption Zugang in die Ecosysteme (Anschlussfähigkeit)
- Interaktionsmodell (Consent und Security Flow)

**Vorgaben für die Realisierung und Use Case:**
- Anforderung und Vorgehen an die Vernehmlassung API
- Anschlussfähigkeit und Einbettung in Gesamtkonzept Kundenbeziehung gewährleistet
- Onboarding, Pflege, Saldierung der Beziehung
- Kompatibilität zur E-ID und international Anschlussfähig
- Domizile und Kundenarten (Privat- und Firmenkunden)
- Vorgehen Verifikation im Markt und Verankerung (bis z.B. ISO) angedacht

### Erwartung in diesem Projekt Phase Konzeption

**Rechtliche Rahmenbedingungen** im Hinblick auf den Einsatz der Open API Kundenbeziehung (z.B. Einhaltung DSGVO & nDSG, Stellvertretung, ...)

**Vorgehen Top-Down und Bottom-up kombiniert:**
- Vorgehen Detailspezifikation und Umsetzung als künftiger Standard
- Kombiniert mit einem oder mehreren Use Cases als MVP in Phase 2
- Umzusetzende Use Cases dokumentiert
- Publikation und Verifikation definiert

---

## 13. Zusammenfassung und Ausblick

Die vorliegende Dokumentation des Referenzprozesses zeigt die umfassende Konzeption der Open API Kundenbeziehung von der technischen Umsetzung über rechtliche Fragestellungen bis hin zur praktischen Anwendung in konkreten Use Cases.

### Zentrale Erkenntnisse

**Referenzprozess:** Der 10-stufige Referenzprozess bildet das Fundament für standardisierte Datenaustausche und bietet klare Strukturen für die Wiederverwendung von Datenbausteinen.

**API-Design:** Die definierten Basic und Full Datasets mit granularen Endpunkten ermöglichen flexible und bedarfsgerechte Datenabfragen.

**Rechtliche Herausforderungen:** Offene regulatorische und rechtliche Fragestellungen erfordern weitere Klärungen, insbesondere zu Haftung, Consent-Management und FINMA-Konformität.

**Use Case Priorisierung:** Kontoeröffnung/Bankwechsel zeigt mit 13 Punkten die höchste Priorität und das größte Potenzial für erste Umsetzungsschritte.

### Nächste Schritte

**Phase 2 Vorbereitung:** Konkretisierung der technischen Spezifikationen und rechtlichen Rahmenbedingungen

**MVP Entwicklung:** Fokus auf Baustein "Identifikation" als ersten umsetzbaren Schritt

**Föderiertes System:** Aufbau der Governance-Strukturen und Etablierung branchenübergreifender Standards

**Regulatorische Klärung:** Intensive Zusammenarbeit mit FINMA und anderen Aufsichtsbehörden zur Klärung offener Rechtsfragen

Die Dokumentation bildet die Grundlage für die weitere Entwicklung und Umsetzung des nationalen Standards für Open Banking in der Schweiz, mit besonderem Fokus auf Kundenbeziehungen und Identifikationsprozesse.
| `/customer/check` | POST | Existenz + Ident-Gültigkeit prüfen | `{ sharedCustomerHash, name, vorname, geburtsdatum }` | `{ match:boolean, idDate:date }` |
| `/customer/fullRequest` | POST | Full Customer Dataset | Header JWT (Consent-Claim), Body `{ sharedCustomerHash, purpose:"accountOpening" }` | Vollständiges Dataset (≈ 65 Felder inkl. pdfUrlPassportScan) |

#### Spezifische Datenabfrage

| **Endpoint** | **HTTP** | **Zweck** | **Request (Hin)** | **Response (Her)** |
|--------------|----------|-----------|-------------------|-------------------|