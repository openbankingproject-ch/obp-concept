# Grafische Darstellung des Prozesses der Open-API-Kundenbeziehung

**Version:** 2.0  
**Koordiniert von:** Business Engineering Institute St.Gallen

## Prozessübersicht

**Use Case:** Kunde von Bank B eröffnet online ein neues Konto bei Bank A

### Beteiligte Akteure

**Kunde von Bank B:** Natürliche Person mit bestehender Bankbeziehung  
**Integrator (Bank A):** Zielbank für neue Kundenbeziehung  
**Produzent (Bank B):** Bestehende Bank mit Kundendaten

**Vertragliche Beziehung:** Zwischen Integrator und Produzent

## Detaillierter Prozessablauf

### 1. Kontoeröffnung Initiierung
**Aktion:** Kunde von Bank B eröffnet online ein neues Konto bei Bank A  
**Akteur:** Kunde von Bank B  
**Ziel:** Integrator (Bank A)

### 2. Kundenstatus-Abfrage
**Frage:** Aktiver Kunde bei schweizer Bank?  
**Antwort:** Ja – Bank B  
**System:** Automatische Erkennung oder Kundenangabe

### 3. Identifikationsprüfung
**Aktion:** Prüfung bei Bank B - Vorhandene gültige Identifikation  
**API-Call:** `GET /identifications/check`  
**Akteur:** Integrator (Bank A) → Produzent (Bank B)

### 4. Identifikationsantwort
**Aktion:** Response auf Identifikationsprüfung  
**API-Call:** `GET /identification/check (response)`  
**Akteur:** Produzent (Bank B) → Integrator (Bank A)

### 5. Identifikationsprozess Initialisierung
**Aktion:** Initialisiert Identifikationsprozess bei Bank B  
**API-Call:** `POST /bankident/initiate`  
**Akteur:** Integrator (Bank A) → Produzent (Bank B)

### 6. App Switch
**Aktion:** Öffnet Internetbanking App zur Authentifikation (Deep Link)  
**Technologie:** App-to-App Redirect  
**Akteur:** System → Kunde

### 7. Kundenlogin und Consent
**Aktion:** Kunde loggt sich ein - bestätigt damit die Datenfreigabe  
**API-Call:** `GET /identifications/check`  
**Akteur:** Kunde → Produzent (Bank B)

### 8. Datenübermittlung
**Aktion:** Übermittelt Kunden- und Identifikationsdaten an Bank A  
**API-Call:** `POST /identification/request`  
**Akteur:** Produzent (Bank B) → Integrator (Bank A)

### 9. Datenbestätigung
**Aktion:** Kunde bestätigt die Daten der Bank A Online  
**Interface:** Web/Mobile Interface  
**Akteur:** Kunde → Integrator (Bank A)

### 10. Kontoeröffnung Abschluss
**Aktion:** Kontoeröffnung wird abgeschlossen und bestätigt  
**Ergebnis:** Neue Kundenbeziehung etabliert  
**Akteur:** Integrator (Bank A)

## API-Endpunkte Details

### GET /identifications/check
**Zweck:** Prüfung auf vorhandene gültige Identifikation  
**Request Parameter:**
- Kundennummer oder E-Mail
- Zeitstempel der letzten Identifikation
- Gewünschter Identifikationstyp

**Response:**
- Status: verfügbar/nicht verfügbar
- Gültigkeitsdatum
- Identifikationstyp
- Consent-Anforderungen

### POST /bankident/initiate
**Zweck:** Startet den Identifikationsprozess  
**Request Body:**
- Integrator-Identifikation
- Use Case Spezifikation
- Gewünschte Datenkategorien
- Redirect URLs

**Response:**
- Session Token
- Deep Link für App Switch
- Expiration Time

### POST /identification/request
**Zweck:** Übermittlung der Identifikationsdaten  
**Request Body:**
- Vollständige Identifikationsdaten
- Consent-Bestätigung
- Integrator Session Token

**Response:**
- Datenübertragung bestätigt
- Validierungsstatus
- Weitere erforderliche Schritte

## Datenfluss-Kategorien

### Nachgelagertes Vorgehen
- Vollständige Prüfung der Geschäftsbeziehung

### Customized ID-Gültigkeit
- Spezifische Validierung basierend auf Bank-Policy

### Customized Zusätzliche Daten
- Erweiterte Datenanforderungen je nach Use Case

## Technische Integration

### App Switch Mechanismus
**Deep Link Struktur:**
```
bankapp://auth?session=<token>&return_url=<integrator_app>
```

**Fallback für Web:**
```
https://bank-b.ch/auth?session=<token>&return_url=<integrator_url>
```

### Security Measures
- **mTLS:** Mutual TLS für alle API-Aufrufe
- **JWT:** Signierte Token für Session Management
- **PKCE:** Proof Key for Code Exchange für App-to-App Flows
- **State Parameter:** CSRF-Schutz

### Error Handling
- **Timeout:** 15 Minuten für gesamten Prozess
- **Retry Logic:** Automatische Wiederholung bei Netzwerkfehlern
- **Fallback:** Manuelle Identifikation bei API-Ausfall

## Compliance und Regulierung

### Datenschutz
- **Explicit Consent:** Klare Einwilligung für jede Datenkategorie
- **Data Minimization:** Nur notwendige Daten übertragen
- **Purpose Limitation:** Zweckgebundene Datenverwendung

### Bankregulierung
- **KYC:** Know Your Customer Anforderungen erfüllt
- **AML:** Anti-Money Laundering Compliance
- **Sorgfaltspflichten:** Gemäss GwG und FINMA-Bestimmungen

---

**Quelle:** Diverse OBP Dokumente (Gesamtunterlage Phase 1, OBP Umsetzung, Vertrauensnetzwerke, Referenzprozess)  
**Version:** 2.0