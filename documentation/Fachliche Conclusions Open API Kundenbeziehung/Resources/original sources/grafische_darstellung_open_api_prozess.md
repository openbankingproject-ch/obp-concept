# Grafische Darstellung des Prozesses der Open-API-Kundenbeziehung

**Version**: 2.0  
**Quelle**: Grafische Darstellung Open API Prozess.docx  
**Kontext**: Open Banking Project CH - Referenzprozess Implementation  
**Koordiniert von**: Business Engineering Institute St. Gallen

---

## Überblick

Die grafische Darstellung zeigt den vollständigen Prozessablauf der Open-API-Kundenbeziehung zwischen drei Hauptakteuren: Kunde, Integrator (Bank A) und Produzent (Bank B). Der Prozess demonstriert, wie ein Kunde von Bank B online ein neues Konto bei Bank A eröffnen kann, unter Nutzung bereits vorhandener Identifikationsdaten.

## Akteure und Rollen

### Kunde von Bank B
- **Rolle**: Bestehender Kunde einer Schweizer Bank
- **Funktion**: Initiiert Kontoeröffnung bei einer anderen Bank
- **Identität**: Bereits authentifizierter und identifizierter Bankkunde

### Integrator Bank A
- **Rolle**: Empfangende Bank (neue Bankverbindung)
- **Funktion**: Möchte Kontoeröffnungsprozess durch Wiederverwendung bestehender Identifikation optimieren
- **Beziehung**: Vertragliche Beziehung zum Produzent Bank B

### Produzent Bank B
- **Rolle**: Datenliefernde Bank (bestehende Bankverbindung)
- **Funktion**: Stellt Kundenidentifikationsdaten zur Verfügung
- **Verantwortung**: Sichere Authentifikation und Datenübertragung

---

## Detaillierter Prozessablauf

### Phase 1: Initiierung und Identitätsprüfung

#### Schritt 1: Kontoeröffnung starten
**Aktion**: Kunde von Bank B eröffnet online ein neues Konto bei Bank A

**Beschreibung**: Der Kunde beginnt den Onboarding-Prozess bei der Integrator Bank A über deren Online-Plattform.

#### Schritt 2: Identitätsstatus abfragen
**Aktion**: Aktiver Kunde bei schweizer Bank?  
**Antwort**: Ja – Bank B

**Beschreibung**: Das System der Bank A fragt ab, ob der Kunde bereits bei einer anderen Schweizer Bank identifiziert ist. Der Kunde bestätigt seine bestehende Beziehung zu Bank B.

#### Schritt 3: Identifikationsprüfung
**Aktion**: Prüfung bei Bank B - Vorhandene gültige Identifikation

**Beschreibung**: Bank A initiiert eine Prüfung bei Bank B, ob für den Kunden eine gültige und aktuelle Identifikation vorliegt.

### Phase 2: API-basierte Kommunikation

#### Schritt 4: Identifikationsstatus abfragen
**API-Call**: `GET /identification/check`  
**Response**: Bestätigung der vorhandenen Identifikation

**Technische Details**:
- Endpunkt prüft Verfügbarkeit und Gültigkeit der Kundenidentifikation
- Rückgabe von Metadaten zur Identifikation (Datum, Gültigkeit, etc.)
- Sichere Übertragung über mTLS

#### Schritt 5: Identifikationsprozess initialisieren
**API-Call**: `POST /bankident/initiate`

**Funktion**: Initialisiert Identifikationsprozess bei Bank B

**Technische Details**:
- Startet den formellen Identifikationsfreigabeprozess
- Generiert Session-Token für den nachfolgenden Authentifikationsprozess
- Erstellt Deep Link für App-Switch

### Phase 3: Kundeninteraktion und Authentifikation

#### Schritt 6: App-Switch Authentifikation
**Aktion**: App Switch - Öffnet Internetbanking App zur Authentifikation (Deep Link)

**Beschreibung**: 
- Kunde wird automatisch zur Banking-App von Bank B weitergeleitet
- Deep Link ermöglicht nahtlosen Übergang zwischen Systemen
- Mobile-First Approach für optimale User Experience

#### Schritt 7: Identifikationsstatus bestätigen
**API-Call**: `GET /identifications/check`

**Funktion**: Kontinuierliche Überwachung des Authentifikationsstatus

#### Schritt 8: Authentifikation und Consent
**Aktion**: Kunde loggt sich ein - bestätigt damit die Datenfreigabe

**Beschreibung**:
- Kunde authentifiziert sich in der Bank B App
- Explizite Einverständniserklärung für Datenfreigabe
- Consent-Management nach DSGVO/nDSG-Standards

### Phase 4: Datenübertragung und Abschluss

#### Schritt 9: Datenübertragung
**API-Call**: `POST /identification/request`  
**Funktion**: Übermittelt Kunden- und Identifikationsdaten an Bank A

**Übertragene Daten**:
- Vollständige Identifikationsdaten
- Ausweisdokumente (PDF-Scans)
- Metadaten zur Identifikation
- Consent-Nachweise

**Technische Spezifikationen**:
- End-to-End Verschlüsselung
- Einmalige, signierte Links für Dokumente (10 Min. gültig)
- Revisionssichere Protokollierung

#### Schritt 10: Datenbestätigung
**Aktion**: Kunde bestätigt die Daten der Bank A Online

**Beschreibung**: 
- Kunde überprüft die übertragenen Daten bei Bank A
- Möglichkeit zur Korrektur oder Ergänzung fehlender Informationen
- Finale Bestätigung der Datenrichtigkeit

#### Schritt 11: Prozessabschluss
**Aktion**: Kontoeröffnung wird abgeschlossen und bestätigt

**Ergebnis**: Erfolgreiche Kontoeröffnung unter Nutzung bestehender Identifikationsdaten

---

## API-Endpunkte Spezifikation

### GET /identification/check
**Zweck**: Überprüfung der Verfügbarkeit einer gültigen Identifikation

**Request Parameter**:
```json
{
  "sharedCustomerHash": "string",
  "name": "string", 
  "vorname": "string",
  "geburtsdatum": "date"
}
```

**Response**:
```json
{
  "match": "boolean",
  "idDate": "datetime", 
  "validUntil": "datetime",
  "identificationMethod": "string"
}
```

### POST /bankident/initiate
**Zweck**: Initialisierung des Identifikationsprozesses

**Request Parameter**:
```json
{
  "customerReference": "string",
  "requestingBank": "string",
  "purpose": "string"
}
```

**Response**:
```json
{
  "sessionToken": "string",
  "deepLink": "string",
  "expiresAt": "datetime"
}
```

### GET /identifications/check
**Zweck**: Status-Monitoring des Authentifikationsprozesses

**Response**:
```json
{
  "status": "pending|authenticated|failed",
  "consentGranted": "boolean",
  "timestamp": "datetime"
}
```

### POST /identification/request
**Zweck**: Vollständige Datenübertragung nach erfolgter Authentifikation

**Request Header**:
```
Authorization: Bearer <JWT>
Content-Type: application/json
```

**Request Body**:
```json
{
  "sharedCustomerHash": "string",
  "purpose": "accountOpening",
  "consentToken": "string"
}
```

**Response**:
```json
{
  "customerData": {
    "personalData": {...},
    "identificationData": {...},
    "documentUrls": [...]
  },
  "metadata": {
    "origin": "string",
    "identificationDate": "datetime",
    "method": "string"
  }
}
```

---

## Datenflüsse und Integration

### Primärer Datenfluss
1. **Initiierung**: Bank A → Bank B (Identifikationsanfrage)
2. **Authentifikation**: Kunde ↔ Bank B (Consent-Prozess)
3. **Übertragung**: Bank B → Bank A (Vollständige Kundendaten)
4. **Bestätigung**: Kunde ↔ Bank A (Datenvalidierung)

### Consent-Flow
- **Explizite Einverständniserklärung** durch Kunden
- **Granulare Datenfreigabe** (spezifische Datenkategorien)
- **Zeitlich begrenzte Gültigkeit** der Einverständnisse
- **Revisionssichere Dokumentation** aller Consent-Ereignisse

### Sicherheitsmaßnahmen
- **mTLS 1.3** für alle API-Kommunikation
- **JWT-basierte Autorisierung** mit Consent-Claims
- **End-to-End Verschlüsselung** für sensible Daten
- **Einmalige, signierte URLs** für Dokumentenzugriff

---

## Technische Infrastruktur

### Systemkomponenten

#### Bank A (Integrator) Systeme
- **API Gateway**: Eingangsschnittstelle für externe Requests
- **Onboarding-System**: Verarbeitung neuer Kundenbeziehungen
- **Consent-Management**: Verwaltung von Einverständniserklärungen
- **Core Banking System**: Finale Kontoeröffnung

#### Bank B (Produzent) Systeme
- **API Provider**: Bereitstellung der Identifikationsdaten
- **Authentication Service**: Kundenverifizierung
- **Mobile Banking App**: Benutzeroberfläche für Consent
- **Document Management**: Sichere Dokumentenbereitstellung

#### Gemeinsame Infrastruktur
- **mTLS Zertifikate**: Gegenseitige Authentifizierung
- **Shared Customer Hash**: Anonymisierte Kundenreferenz
- **Audit Logging**: Compliance-konforme Protokollierung

### Datenmodell

#### Basisdatenset
- **Persönliche Daten**: Name, Vorname, Geburtsdatum
- **Adressdaten**: Wohnadresse, Korrespondenzadresse
- **Kontaktdaten**: Telefon, E-Mail
- **Identifikationsdokument**: Typ, Nummer, Gültigkeit

#### Erweiterte Daten
- **Ausweisdokumente**: PDF-Scans der Identifikationsdokumente
- **Identifikationsmetadata**: Datum, Methode, verantwortliche Person
- **Compliance-Daten**: GwG-relevante Informationen
- **Audit-Trail**: Vollständige Prozessdokumentation

---

## Compliance und Regulatorik

### Rechtliche Grundlagen
- **Schweizer Datenschutzgesetz (nDSG)**: Einverständnis und Transparenz
- **Bankkundengeheimnis**: Schutz von Bankkundendaten
- **Geldwäschereigesetz (GwG)**: Identifikationspflichten
- **FINMA Rundschreiben**: Video- und Online-Identifizierung

### Compliance-Anforderungen
- **Explizite Kundeneinverständnis**: Für jeden Datentransfer erforderlich
- **Zweckbindung**: Datenverwendung nur für angegebenen Zweck
- **Datenminimierung**: Übertragung nur notwendiger Daten
- **Löschkonzepte**: Definierte Aufbewahrungsfristen

### Audit und Nachvollziehbarkeit
- **Vollständige Protokollierung** aller Systeminteraktionen
- **Revisionssichere Speicherung** von Consent-Erklärungen
- **Nachvollziehbare Dokumentation** des gesamten Prozesses
- **Compliance-Reports** für regulatorische Überprüfungen

---

## Use Case Integration

### Zielbild Implementation
Der dargestellte Prozess implementiert **Zielbild 2: INDIREKT** aus dem Open Banking Project CH Framework:

- **Direkter Kundenkontakt**: Kunde interagiert mit beiden Banken
- **API-vermittelte Kommunikation**: Strukturierter Datenaustausch
- **Consent-zentriert**: Explizite Kundeneinverständnisse
- **Peer-to-Peer**: Direkte Verbindung zwischen Banken

### MVP-Komponenten
- **Identifikationsdaten-Transfer**: Kernfunktionalität des MVP
- **Basic Consent-Management**: Minimale Einverständnisverwaltung
- **Standard API-Endpunkte**: Grundlegende Schnittstellen
- **Mobile-First UX**: Optimierte Benutzerführung

### Erweiterungsmöglichkeiten
- **Multi-Bank Support**: Unterstützung mehrerer Produzent-Banken
- **Enhanced Consent**: Granularere Berechtigungsverwaltung
- **Document Verification**: Automatisierte Dokumentenprüfung
- **Real-time Monitoring**: Live-Status-Updates

---

## Performance und Skalierung

### Response Time Anforderungen
- **GET /identification/check**: < 2 Sekunden
- **POST /bankident/initiate**: < 3 Sekunden
- **Authentifikation**: < 30 Sekunden (inklusive User Interaction)
- **POST /identification/request**: < 5 Sekunden

### Verfügbarkeitsanforderungen
- **API Uptime**: 99.9% (Banking Hours)
- **Mobile App Integration**: 99.5% Verfügbarkeit
- **Disaster Recovery**: RTO < 4 Stunden, RPO < 1 Stunde

### Skalierungsparameter
- **Concurrent Users**: Bis zu 1000 gleichzeitige Prozesse
- **Daily Transactions**: Bis zu 10,000 Identifikationstransfers
- **Peak Load**: 10x normale Last während Geschäftszeiten

---

## Monitoring und Alerting

### Key Performance Indicators (KPIs)
- **Erfolgsrate**: Anteil erfolgreich abgeschlossener Prozesse
- **Abbruchrate**: Prozesse mit Kundenabbruch
- **Fehlerrate**: Technische Fehler und Timeouts
- **User Experience**: Zeit bis zum Prozessabschluss

### Alerting-Schwellwerte
- **Kritische Alerts**: > 5% Fehlerrate, > 10 Sekunden Response Time
- **Warning Alerts**: > 2% Fehlerrate, > 5 Sekunden Response Time
- **Capacity Alerts**: > 80% Systemauslastung

### Compliance Monitoring
- **Consent Audit**: Vollständigkeit aller Einverständniserklärungen
- **Data Retention**: Einhaltung von Löschfristen
- **Access Control**: Autorisierte Zugriffe auf Kundendaten

---

## Fazit und Ausblick

### Projektmeilensteine
Die grafische Darstellung des Open-API-Prozesses bildet die Grundlage für die technische Implementation des Open Banking Project CH. Der definierte Prozess ermöglicht eine sichere, effiziente und compliance-konforme Wiederverwendung von Kundenidentifikationsdaten zwischen Schweizer Banken.

### Erfolgsfaktoren
1. **Standardisierte API-Schnittstellen**: Einheitliche Integration für alle Teilnehmer
2. **Robustes Consent-Management**: Vollständige Kontrolle für Kunden
3. **Hohe Sicherheitsstandards**: Schutz sensibler Finanzdaten
4. **Optimierte User Experience**: Nahtloser, mobiler Authentifikationsprozess

### Nächste Entwicklungsschritte
1. **Technische Detailspezifikation**: API-Schema-Definition
2. **Security Architecture**: Detaillierte Sicherheitskonzepte
3. **MVP Implementation**: Entwicklung der Kernfunktionalitäten
4. **Pilot Testing**: Erste Implementierung mit ausgewählten Banken

---

**Dokumentstand**: Version 2.0 - Vollständige Erfassung der grafischen Darstellung  
**Koordination**: Business Engineering Institute St. Gallen  
**Referenzen**: Open Banking Project CH - Gesamtdokumentation Phase 1