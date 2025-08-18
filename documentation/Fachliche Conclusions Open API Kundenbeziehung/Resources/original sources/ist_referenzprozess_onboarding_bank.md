# 20250325 IST Referenzprozess Onboarding Bank - Vollständige Dokumentation

**IST Referenzprozess, Version 0.95: Digitale Kundeneröffnung Bank**

---

## Übersicht

Dieses Dokument beschreibt den detaillierten IST-Referenzprozess für die digitale Kundeneröffnung bei Banken. Der Prozess umfasst 11 Schritte vom ersten Kundenkontakt bis zur vollständigen Verarbeitung der Kontoeröffnung.

### Spaltenstruktur

| **Spalte** | **Beschreibung** |
|------------|------------------|
| **Scope** | Einordnung der Relevanz für das Projekt |
| **#** | Schrittnummer im Prozess |
| **Prozessschritte** | Bezeichnung des Prozessschritts |
| **Beschreibung** | Detaillierte Beschreibung des Schritts |
| **Owner** | Verantwortliche Partei |
| **Datenpunkte (relevante Quelle)** | Erfasste Datenfelder mit Ja/Nein-Markierung |
| **Zweck und Funktion** | Geschäftlicher Zweck des Schritts |
| **Level of Assurance (LoA)** | Sicherheitsniveau: 1) self-declared, 2) entity-assured-assurance (EAA), 3) qualified-entity-assured-assurance (QEAA) |
| **Rechtliche Anforderungen** | Gesetzliche Vorgaben |
| **Bank Policy** | Interne Bankrichtlinien |
| **Kommentar** | Zusätzliche Anmerkungen |

---

## Detaillierte Prozessschritte

### Schritt 1: Initialisierung

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 1 |
| **Prozessschritt** | Initialisierung |
| **Beschreibung** | Webpage oder App der Bank; Abgabe initialer Consent |
| **Owner** | Kunde |
| **Datenpunkte** | Cookies [Ja, Nein]<br/>Consent [Ja, Nein]<br/>Länderauswahl |
| **Zweck und Funktion** | Information des Kunden |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | x |
| **Bank Policy** | x |
| **Kommentar** | **KOMMENTAR:** Stefan Knaus: Consent am Anfang? |

### Schritt 2: Produktauswahl

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | **out of scope** |
| **#** | 2 |
| **Prozessschritt** | Produktauswahl |
| **Beschreibung** | Auswählen der gewünschten Produkte z.B. Konto, Karte |
| **Owner** | Kunde |
| **Datenpunkte** | Kontotyp [Privat, Sparen, Jugend, ...]<br/>Bankpaket [Student, Jugend, ...]<br/>… |
| **Zweck und Funktion** | Bedürfnisbefriedigung |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | - |
| **Bank Policy** | - |
| **Kommentar** | - |

### Schritt 3: Selbstdeklaration

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 3 |
| **Prozessschritt** | Selbstdeklaration |
| **Beschreibung** | Angaben zu wirtschaftlicher Berechtigung, Steuerdomizil, US Person |
| **Owner** | Kunde |
| **Datenpunkte** | wirtschaftliche Berechtigung [Ja, Nein]<br/>(abweichendes) Steuerdomizil [Schweiz, ...]<br/>US-Steuerpflicht [Ja, Nein]<br/>FATCA-Selbstdeklaration<br/>TIN (Schweiz: AHV-Nummer)<br/>Herkunft der Gelder<br/>Selbstdeklaration Steuerkonformität<br/>Nationalität(en) |
| **Zweck und Funktion** | Information bzgl. FATCA, MIFID |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | GwG Art. 4 Feststellung des wirtschaftlich berechtigten Person |
| **Bank Policy** | x |
| **Kommentar** | **KOMMENTAR:** Stefan Knaus: allenfalls in Schritt 4 und 5 integrieren |

### Schritt 4: Erhebung Basisdaten

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 4 |
| **Prozessschritt** | Erhebung Basisdaten |
| **Beschreibung** | Erfassung von Personalien, Wohnadresse und Kontaktdaten |
| **Owner** | Kunde |
| **Datenpunkte** | Name<br/>Vorname<br/>Anrede<br/>Gender<br/>Geburtsdatum<br/>Geburtsort<br/>Bürgerort<br/>Strasse<br/>Hausnummer<br/>Land<br/>Kanton/Region/Staat/Provinz<br/>Nationalität<br/>Telefonnummer<br/>Mobiltelefonnummer<br/>E-Mailadresse<br/>Abweichende Korrespondenzadresse<br/>ID (z.B. Google, Apple, Samsung) |
| **Zweck und Funktion** | Erfassung von Kontaktangaben |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | - |
| **Bank Policy** | - |
| **Kommentar** | - |

### Schritt 5: Erweiterte Daten

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | **out of scope** |
| **#** | 5 |
| **Prozessschritt** | erweiterte Daten |
| **Beschreibung** | Produktspezifische erweiterte Daten |
| **Owner** | Kunde |
| **Datenpunkte** | Gesamtvermögen<br/>Einkommen<br/>Ausbildung<br/>Beruf<br/>Arbeitgeber<br/>… |
| **Zweck und Funktion** | Risiko-/Potenzialermittlung des Kunden |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | x (je nach Produktauswahl) |
| **Bank Policy** | x |
| **Kommentar** | - |

### Schritt 6: Identifikation

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 6 |
| **Prozessschritt** | Identifikation |
| **Beschreibung** | Videoidentifikation (gleichgesetzt persönlicher Vorsprache) Onlineidentifikation ("AutoIdent" plus Adresscheck)<br/>QES (gleichgesetzt Korrespondenzeröffnung) |
| **Owner** | Provider |
| **Datenpunkte** | Liveness-Check (Score)<br/>Gesichtsverifikation (Score)<br/>Name<br/>Vorname<br/>Gender<br/>Lichtbild (Relevante Seite(n))<br/>Ausweisnummer<br/>Art des Dokuments [Pass, ID, Personalausweis]<br/>Ausstellungsdatum<br/>Ausstellungsort<br/>Gültigkeitsdatum<br/>MRZ<br/>NFC (biometrische Daten)<br/>Geburtsdatum<br/>Ausstellende Behörde<br/>Sicherheitsmerkmale (Anzahl geprüft und Score)<br/>Tonspur/Video [mp3, mp4] |
| **Zweck und Funktion** | Identifikation der Vertragspartei |
| **Level of Assurance** | **QEAA** |
| **Rechtliche Anforderungen** | GwG Art. 3 Identifizierung der Vertragspartei |
| **Bank Policy** | - |
| **Kommentar** | - |

### Schritt 7: Background Checks

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 7 |
| **Prozessschritt** | Background Checks |
| **Beschreibung** | immer: sanction, PEP, crime, adverse media checks<br/>fakultativ: produktspezifische Checks (Bonität, ZEK/IKO, Betreibungsauskunft etc.) und je nach gewählter Identifikation (Adressprüfung, Mobilnummercheck, E-Mailcheck, Wallet Check, Geräte-ID) |
| **Owner** | Provider |
| **Datenpunkte** | sanction list check [ok, nok]<br/>PEP check [ok, nok]<br/>crime [ok, nok]<br/>adverse media check [...]<br/>… |
| **Zweck und Funktion** | Know-Your-Customer (KYC) |
| **Level of Assurance** | **QEAA oder EAA** |
| **Rechtliche Anforderungen** | x |
| **Bank Policy** | x |
| **Kommentar** | - |

### Schritt 8: Vertragsabschluss

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 8 |
| **Prozessschritt** | Vertragsabschluss |
| **Beschreibung** | Akzeptieren der AGBs sowie produktspezifischen Bedingungen |
| **Owner** | Kunde |
| **Datenpunkte** | AGB [ok, nok]<br/>Data Sharing Agreement (DAS)<br/>(Basis-)Vertrag<br/>Produktvereinbarung(en)<br/>(alle mit Version und Zeitstempel)<br/>… |
| **Zweck und Funktion** | Akzeptieren der Geschäftsbedingungen |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | x |
| **Bank Policy** | x |
| **Kommentar** | 2FA, Wallet |

### Schritt 9: Signatur

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 9 |
| **Prozessschritt** | Signatur |
| **Beschreibung** | produktspezifische Ausprägung (Schritt 6 und 9 können zusammenfallen); z.B. Intrum + Swisscom/QuoVadis/SwissSign |
| **Owner** | Provider |
| **Datenpunkte** | Signatur [ok, nok] |
| **Zweck und Funktion** | Vertragsunterzeichnung |
| **Level of Assurance** | **QEAA** |
| **Rechtliche Anforderungen** | x |
| **Bank Policy** | x |
| **Kommentar** | Abhängig von Produktauswahl (z.B. Kreditkarte, Hypothek, Prozess mit QES) |

### Schritt 10: Metadaten

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | In Scope |
| **#** | 10 |
| **Prozessschritt** | Metadaten |
| **Beschreibung** | Zeitstempel bei der Aufnahme des Datensets/Bausteine |
| **Owner** | System |
| **Datenpunkte** | Zeitstempel<br/>Originator |
| **Zweck und Funktion** | Erfassung von Metadaten |
| **Level of Assurance** | self-declared |
| **Rechtliche Anforderungen** | - |
| **Bank Policy** | x |
| **Kommentar** | - |

### Schritt 11: Verteilung

| **Attribut** | **Wert** |
|--------------|----------|
| **Scope** | **out of scope** |
| **#** | 11 |
| **Prozessschritt** | Verteilung |
| **Beschreibung** | Verarbeitung der Eröffnung |
| **Owner** | Bank |
| **Datenpunkte** | - |
| **Zweck und Funktion** | Prüfung und Verarbeitung |
| **Level of Assurance** | - |
| **Rechtliche Anforderungen** | - |
| **Bank Policy** | - |
| **Kommentar** | - |

---

## Zusammenfassung der Scope-Einordnung

### In Scope (für Open API Kundenbeziehung relevant)

1. **Initialisierung** - Consent und Länderauswahl
2. **Selbstdeklaration** - FATCA/MIFID Angaben und wirtschaftliche Berechtigung
3. **Erhebung Basisdaten** - Personalien und Kontaktdaten
4. **Identifikation** - Videoident/Onlineident mit QEAA Level
5. **Background Checks** - KYC-Prüfungen (PEP, Sanction, etc.)
6. **Vertragsabschluss** - AGB und Data Sharing Agreement
7. **Signatur** - Qualifizierte elektronische Signatur
8. **Metadaten** - Zeitstempel und Originator-Informationen

### Out of Scope

1. **Produktauswahl** - Bankspezifische Produktentscheidung
2. **Erweiterte Daten** - Produktspezifische Zusatzinformationen
3. **Verteilung** - Interne Bankverarbeitung

---

## Level of Assurance (LoA) Übersicht

### Verteilung der Sicherheitsniveaus

| **LoA Level** | **Schritte** | **Beschreibung** |
|---------------|--------------|------------------|
| **self-declared** | 1, 3, 4, 8, 10 | Eigendeklaration durch Kunde |
| **QEAA** | 6, 9 | Qualifizierte Identifikation und Signatur |
| **QEAA oder EAA** | 7 | Je nach Background Check Anbieter |

---

## Rechtliche Anforderungen im Detail

### GwG (Geldwäschereigesetz) Anforderungen

- **Art. 3:** Identifizierung der Vertragspartei (Schritt 6: Identifikation)
- **Art. 4:** Feststellung des wirtschaftlich berechtigten Person (Schritt 3: Selbstdeklaration)

### Produktabhängige Anforderungen

- **Erweiterte Daten** (Schritt 5): Je nach Produktauswahl erforderlich
- **Signatur** (Schritt 9): Abhängig von Produkttyp (Kreditkarte, Hypothek, QES-Prozesse)

---

## Owner-Verteilung

| **Owner** | **Schritte** | **Verantwortlichkeit** |
|-----------|--------------|------------------------|
| **Kunde** | 1, 2, 3, 4, 5, 8 | Dateneingabe und Zustimmungen |
| **Provider** | 6, 7, 9 | Technische Verifikation und Checks |
| **System** | 10 | Automatische Metadaten-Erfassung |
| **Bank** | 11 | Finale Verarbeitung |

---

## Experten-Kommentare

### Stefan Knaus Feedback

1. **Initialisierung:** "Consent am Anfang?" - Diskussion über optimalen Zeitpunkt für Consent-Erteilung
2. **Selbstdeklaration:** "allenfalls in Schritt 4 und 5 integrieren" - Überlegung zur Prozessoptimierung durch Integration

---

## Technische Anmerkungen

### 2FA und Wallet Integration

- **Vertragsabschluss (Schritt 8):** 2FA, Wallet-basierte Authentifizierung
- **Signatur (Schritt 9):** Produktabhängige Ausprägung mit verschiedenen Signatur-Providern

### Provider-Integration

- **Identifikation:** Videoident/Onlineident Services
- **Background Checks:** Externe KYC-Service Provider
- **Signatur:** Intrum + Swisscom/QuoVadis/SwissSign

---

## Fazit

Der IST-Referenzprozess zeigt die Komplexität der digitalen Bankkundeneröffnung mit 11 Einzelschritten, wobei 8 Schritte für die Open API Kundenbeziehung relevant sind. Der Prozess balanciert zwischen regulatorischen Anforderungen (GwG), Sicherheitsstandards (verschiedene LoA-Level) und praktischer Umsetzbarkeit.

**Kernerkenntnisse:**
- Hohe Komplexität durch regulatorische Anforderungen
- Verschiedene LoA-Level je nach Prozessschritt erforderlich
- Multiple Provider-Integrationen notwendig
- Scope-Fokussierung auf 8 von 11 Schritten für Open API Projekt

Diese Dokumentation bildet die Grundlage für die Entwicklung der Open API Kundenbeziehung und die Standardisierung des Onboarding-Prozesses im Schweizer Bankensektor.