# Sequence Diagram IAM - Identity and Access Management Flow

**Quelle**: Sequence Diagram IAM.docx  
**Kontext**: Open Banking Project CH - Consent und Security Flow  
**Koordiniert von**: Business Engineering Institute St. Gallen

---

## Überblick

Das folgende Sequenzdiagramm zeigt, wie Client und System Browser (User-Agent) auf der einen Seite mit Authorization Server und Authentication Flows auf der anderen Seite interagieren. Dieses Diagramm bildet die Grundlage für die sichere Authentifizierung und Autorisierung im Rahmen der Open API Kundenbeziehung.

## Sequenzdiagramm Beschreibung

**Referenz**: Ein Screenshot des Sequenzdiagramms ist im Originaldokument enthalten (media/image1.jpeg)

---

## Detaillierter Ablauf des IAM-Flows

### Phase 1: Initiale Anfrage und Autorisierungsstart

#### Schritt 1: Client Request
Der Client sendet eine **Anfrage** an die gewünschte Ressource.

#### Schritt 2: Gateway Interception
Das Gateway oder Microgateway fängt diese Anfrage ab und kann die Credentials nicht verifizieren. Das Gateway oder Microgateway antwortet mit **nicht autorisiert**.

#### Schritt 3: Authorization Request Initiation
Der Client erstellt eine **Autorisierungsanfrage** und startet den System Browser, um den **Authorization Code Flow** zu initiieren.

#### Schritt 4: Authorization Server Request
Der System Browser sendet die **Autorisierungsanfrage** an den **Authorization Server (AS)**.

### Phase 2: Authentication Flow Determination

#### Schritt 5: Flow Determination und Redirect
Der **Authorization Server** bestimmt, welche Zielanwendung und welcher **Authentication Flow gestartet** werden soll, um diese Autorisierungsanfrage zu bearbeiten. Er sendet dann einen **Redirect (302)** an den System Browser.

#### Schritt 6: Authentication Flow Start
Der System Browser startet den **Authentication Flow**.

### Phase 3: User Authentication

#### Schritt 7: User Credential Requirements
Der Flow muss einen **benutzeridentifizierenden Schritt** enthalten (z.B. Passwort-Schritt). Der Authentication Flow sendet eine Antwort, die anzeigt, dass **Benutzer-Credentials erforderlich** sind.

#### Schritt 8: Login Screen Presentation
Die Loginapp UI präsentiert dem Benutzer einen Login-Bildschirm und sendet die vom Benutzer bereitgestellten Credentials an die Flow-Engine.

### Phase 4: Consent Management

#### Schritt 9: Consent Requirements
Der Flow muss einen Consent-Schritt enthalten. Der Flow sendet eine Antwort, die anzeigt, welche **Einverständnisse erforderlich** sind.

#### Schritt 10: Consent Screen Presentation
Die Loginapp UI präsentiert dem Benutzer einen Consent-Bildschirm und sendet die vom Benutzer gewährte Einverständniserklärung an die Flow-Engine.

### Phase 5: Authorization Response Generation

#### Schritt 11: Authorization Response Request
Der Flow-Prozessor fordert eine **Authorization Response** vom Authorization Server an.

#### Schritt 12: Authorization Response Delivery
Der Authorization Server antwortet mit einer **Authorization Response**.

#### Schritt 13: Flow Termination
Der Flow wird beendet und sendet die **Authorization Response** an den System Browser.

#### Schritt 14: Response Forwarding
Der System Browser leitet die **Authorization Response** an den Client weiter.

### Phase 6: Token Exchange und Resource Access

#### Schritt 15: Token Exchange
Der Client verwendet den **Authorization Code** aus der Authorization Response und sendet ihn an den **Token Endpoint** des Authorization Servers (**Token Exchange**).

#### Schritt 16: Token Issuance
Basierend auf der **Identity Propagation Configuration** der Zielanwendung stellt der Authorization Server die angeforderten **Tokens** aus und sendet sie an den Client.

#### Schritt 17: Resource Access with Token
Der Client sendet eine Anfrage an die gewünschte Ressource mit einem **Access Token**.

---

## Technische Komponenten

### System Browser (User-Agent)
- Führt Redirects zwischen verschiedenen Endpunkten durch
- Präsentiert Login- und Consent-Bildschirme
- Vermittelt zwischen Client und Authorization Server

### Authorization Server (AS)
- Zentrale Komponente für Authentifizierung und Autorisierung
- Bestimmt den geeigneten Authentication Flow
- Stellt Authorization Codes und Access Tokens aus
- Verwaltet Identity Propagation Configuration

### Gateway/Microgateway
- Erste Sicherheitsschicht
- Überprüft eingehende Anfragen
- Leitet nicht autorisierte Anfragen ab

### Loginapp UI
- Benutzeroberfläche für Authentifizierung
- Sammelt Benutzer-Credentials
- Präsentiert Consent-Bildschirme
- Kommuniziert mit Flow-Engine

### Flow Engine/Processor
- Verwaltet den Authentication Flow
- Koordiniert zwischen UI und Authorization Server
- Behandelt Consent-Management

---

## Sicherheitsaspekte

### Authentication
- **Benutzeridentifizierung**: Obligatorischer Schritt mit Credentials
- **Multi-Faktor-Authentifizierung**: Kann in den Flow integriert werden
- **Sichere Credential-Übertragung**: Über verschlüsselte Verbindungen

### Authorization
- **Authorization Code Flow**: Standard OAuth 2.0 Verfahren
- **Scope-basierte Berechtigung**: Granulare Zugriffskontrolle
- **Token-basierter Zugriff**: Zeitlich begrenzte Access Tokens

### Consent Management
- **Explizite Einverständniserklärung**: Benutzer muss aktiv zustimmen
- **Granulare Consent-Kontrolle**: Spezifische Berechtigungen pro Ressource
- **Consent-Verwaltung**: Nachvollziehbare Dokumentation der Einverständnisse

---

## Integration in Open Banking Project CH

### Relevanz für Open API Kundenbeziehung
Dieses IAM-Sequenzdiagramm bildet die technische Grundlage für:

1. **Sichere Kundenidentifikation** im föderativen System
2. **Consent-Management** für Datenweitergabe zwischen Banken
3. **API-Zugriffskontrolle** für Open Banking Services
4. **Compliance-konforme Authentifizierung** nach Schweizer Standards

### Anwendung in Use Cases
- **Bank Onboarding**: Sichere Übertragung von Kundenidentifikationsdaten
- **Consent Flow**: Kundeneinverständnis für Datenweitergabe
- **API-Zugriff**: Autorisierter Zugang zu Bankdaten über Open APIs
- **Föderierte Identität**: Wiederverwendung von Identifikationen zwischen Institutionen

### Standards-Compliance
- **OAuth 2.0**: Standard Authorization Framework
- **OpenID Connect**: Identitätsschicht über OAuth 2.0
- **FAPI 2.0**: Financial-grade API Sicherheitsstandards
- **FINMA-Anforderungen**: Schweizer Regulatorische Compliance

---

## Technische Implementierungshinweise

### Token-Management
- **Access Tokens**: Zeitlich begrenzte Berechtigung für Ressourcenzugriff
- **Refresh Tokens**: Erneuerung von Access Tokens ohne erneute Authentifizierung
- **ID Tokens**: Identitätsinformationen des authentifizierten Benutzers

### Flow-Konfiguration
- **Target Application Configuration**: Anwendungsspezifische Einstellungen
- **Identity Propagation**: Weiterleitung von Identitätsinformationen
- **Consent Scope Definition**: Definition der erforderlichen Berechtigungen

### Error Handling
- **Authentication Failures**: Behandlung fehlgeschlagener Anmeldeversuche
- **Authorization Errors**: Umgang mit unzureichenden Berechtigungen
- **Token Expiration**: Automatische Token-Erneuerung oder Re-Authentication

---

## Best Practices

### Sicherheit
1. **HTTPS-only**: Alle Kommunikation über verschlüsselte Verbindungen
2. **Token Expiration**: Kurze Lebensdauer für Access Tokens
3. **Audit Logging**: Vollständige Protokollierung aller Authentication-Events
4. **Rate Limiting**: Schutz vor Brute-Force-Angriffen

### User Experience
1. **Single Sign-On**: Minimierung der Authentifizierungsanfragen
2. **Clear Consent**: Verständliche Darstellung der angeforderten Berechtigungen
3. **Error Messages**: Benutzerfreundliche Fehlermeldungen
4. **Session Management**: Sichere und effiziente Session-Verwaltung

### Performance
1. **Token Caching**: Intelligente Zwischenspeicherung von Tokens
2. **Connection Pooling**: Optimierte Verbindungen zu Authorization Servern
3. **Load Balancing**: Verteilung der Last auf mehrere Server
4. **Monitoring**: Kontinuierliche Überwachung der System-Performance

---

## Fazit

Das IAM-Sequenzdiagramm definiert einen robusten und sicheren Authentifizierungs- und Autorisierungsflow, der den Anforderungen des Open Banking Project CH entspricht. Die Implementation folgt etablierten Standards wie OAuth 2.0 und OpenID Connect und gewährleistet gleichzeitig die Einhaltung schweizerischer Regulatorik.

Der beschriebene Flow ermöglicht eine sichere und benutzerfreundliche Übertragung von Kundenidentifikationsdaten zwischen verschiedenen Finanzinstitutionen, während gleichzeitig höchste Sicherheitsstandards und explizite Kundeneinverständnisse gewährleistet werden.

**Nächste Schritte**:
1. Detaillierte technische Spezifikation der einzelnen Flow-Komponenten
2. Implementation der Consent-Management-Funktionalitäten
3. Integration mit bestehenden Bank-Systemen
4. Compliance-Tests mit FINMA-Anforderungen

---

**Dokumentstand**: Vollständige Erfassung des Originaldokuments  
**Referenzen**: Sequence Diagram IAM.docx, Open Banking Project CH Documentation