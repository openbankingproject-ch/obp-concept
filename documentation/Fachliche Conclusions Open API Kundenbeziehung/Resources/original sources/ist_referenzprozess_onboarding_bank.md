# IST Referenzprozess Onboarding Bank

**Datei:** 20250325 IST Referenzprozess Onboarding Bank.xlsx  
**Version:** 0.95  
**Titel:** Digitale Kundeneröffnung Bank  
**Datum:** 25. März 2025

## Prozessübersicht

Der Referenzprozess für die digitale Kundeneröffnung bei Banken umfasst 10 Hauptschritte, die von der Initialisierung bis zur Verteilung reichen.

## Detaillierte Prozessschritte

### 1. Initialisierung
**Owner:** Kunde  
**Beschreibung:** Webpage oder App der Bank; Abgabe initialer Consent

**Datenpunkte (relevante Quelle):**
- Cookies [Ja, Nein]
- Consent [Ja, Nein]
- Länderauswahl

**Zweck und Funktion:** Information des Kunden  
**Level of Assurance (LoA):** self-declared  
**Rechtliche Anforderungen:** x  
**Bank Policy:** x

### 2. Produktauswahl (out of scope)
**Owner:** Kunde  
**Beschreibung:** Auswählen der gewünschten Produkte z.B. Konto, Karte

**Datenpunkte (relevante Quelle):**
- Kontotyp [Privat, Sparen, Jugend, ...]
- Bankpaket [Student, Jugend, ...]
- ...

**Zweck und Funktion:** Bedürfnisbefriedigung  
**Level of Assurance (LoA):** self-declared

### 3. Selbstdeklaration
**Owner:** Kunde  
**Beschreibung:** Angaben zu wirtschaftlicher Berechtigung, Steuerdomizil, US Person

**Datenpunkte (relevante Quelle):**
- wirtschaftliche Berechtigung [Ja, Nein]
- (abweichendes) Steuerdomizil [Schweiz, ...]
- US-Steuerpflicht [Ja, Nein]
- FATCA-Selbstdeklaration
- TIN (Schweiz: AHV-Nummer)
- Herkunft der Gelder
- Selbstdeklaration Steuerkonformität
- Nationalität(en)

**Zweck und Funktion:** Information bzgl. FATCA, MIFID  
**Level of Assurance (LoA):** self-declared  
**Rechtliche Anforderungen:** GwG Art. 4 Feststellung der wirtschaftlich berechtigten Person  
**Bank Policy:** x

### 4. Erhebung Basisdaten
**Owner:** Kunde  
**Beschreibung:** Erfassung von Personalien, Wohnadresse und Kontaktdaten

**Datenpunkte (relevante Quelle):**
- Name
- Vorname
- Anrede
- Gender
- Geburtsdatum
- Geburtsort
- Bürgerort
- Strasse
- Hausnummer
- Land
- Kanton/Region/Staat/Provinz
- Nationalität
- Telefonnummer
- Mobiltelefonnummer
- E-Mailadresse
- Abweichende Korrespondenzadresse
- ID (z.B. Google, Apple, Samsung)

**Zweck und Funktion:** Erfassung von Kontaktangaben  
**Level of Assurance (LoA):** self-declared

### 5. Erweiterte Daten (out of scope)
**Owner:** Kunde  
**Beschreibung:** Produktspezifische erweiterte Daten

**Datenpunkte (relevante Quelle):**
- Gesamtvermögen
- Einkommen
- Ausbildung
- Beruf
- Arbeitgeber
- ...

**Zweck und Funktion:** Risiko-/Potenzialermittlung des Kunden  
**Level of Assurance (LoA):** self-declared  
**Rechtliche Anforderungen:** x (je nach Produktauswahl)  
**Bank Policy:** x

### 6. Identifikation
**Owner:** Provider  
**Beschreibung:** 
- Videoidentifikation (gleichgesetzt persönlicher Vorsprache)
- Onlineidentifikation ("AutoIdent" plus Adresscheck)
- QES (gleichgesetzt Korrespondenzeröffnung)

**Datenpunkte (relevante Quelle):**
- Liveness-Check (Score)
- Gesichtsverifikation (Score)
- Name
- Vorname
- Gender
- Lichtbild (Relevante Seite(n))
- Ausweisnummer
- Art des Dokuments [Pass, ID, Personalausweis]
- Ausstellungsdatum
- Ausstellungsort
- Gültigkeitsdatum
- MRZ
- NFC (biometrische Daten)
- Geburtsdatum
- Ausstellende Behörde
- Sicherheitsmerkmale (Anzahl geprüft und Score)
- Tonspur/Video [mp3, mp4]

**Zweck und Funktion:** Identifikation der Vertragspartei  
**Level of Assurance (LoA):** QEAA  
**Rechtliche Anforderungen:** GwG Art. 3 Identifizierung der Vertragspartei

### 7. Background Checks
**Owner:** Provider  
**Beschreibung:** 
- immer: sanction, PEP, crime, adverse media checks
- fakultativ: produktspezifische Checks (Bonität, ZEK/IKO, Betreibungsauskunft etc.) und je nach gewählter Identifikation (Adressprüfung, Mobilnummercheck, E-Mailcheck, Wallet Check, Geräte-ID)

**Datenpunkte (relevante Quelle):**
- sanction list check [ok, nok]
- PEP check [ok, nok]
- crime [ok, nok]
- adverse media check [...]
- ...

**Zweck und Funktion:** Know-Your-Customer (KYC)  
**Level of Assurance (LoA):** QEAA oder EAA  
**Rechtliche Anforderungen:** x  
**Bank Policy:** x

### Level of Assurance (LoA) Definitionen

**1) self-declared:** Selbstdeklarierte Daten durch den Kunden  
**2) entity-assured-assurance (EAA):** Von einer Entität bestätigte Sicherheit  
**3) qualified-entity-assured-assurance (QEAA):** Von einer qualifizierten Entität bestätigte Sicherheit

## Scope-Abgrenzung

**Out of Scope Schritte:**
- Schritt 2: Produktauswahl
- Schritt 5: Erweiterte Daten

**In Scope Schritte:**
- Alle anderen Schritte (1, 3, 4, 6, 7) sind relevant für die Open API Kundenbeziehung

---

**Quelle:** 20250325 IST Referenzprozess Onboarding Bank.xlsx