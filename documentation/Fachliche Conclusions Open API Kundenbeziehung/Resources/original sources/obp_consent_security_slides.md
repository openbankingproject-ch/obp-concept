# Open Banking Project CH - Consent und Security Flow

**Koordiniert von**: Business Engineering Institute St. Gallen  
**Partner**: ergon, finnova, FINSTAR, Universität St.Gallen

---

## Überblick Themenbereiche

### Consent und Security Flow

Das Consent und Security Flow Modul umfasst folgende zentrale Themenbereiche:

- **Grundlagen und Scope Definition**
- **Security Flow: Security Standards Evaluation**
- **Consent Flow: Consent Architekturen**
- **JWT Token Architektur**
- **Generische Implementation: Authentifizierung, Authorisierung, Audit und Compliance**
- **Compliance and Regulatory Alignment**

---

## 1. Grundlagen und Scope Definition

### Unabhängigkeit vom Vertrauensnetzwerk

Das Framework wird als generisches Security-Framework konzipiert, das unabhängig vom spezifischen Vertrauensnetzwerk funktioniert. Dabei wird Bezug auf die definierten Rollen im Vertrauensnetzwerk genommen.

### Rollen

Die technischen Rollen werden generisch definiert und sind für jedes Architektur-Modell anwendbar. Diese Rollen bilden die Grundlage für die Onboarding-Prozesse und die Governance-Infrastruktur.

### Fachexpertise Integration

Die Ausarbeitung bis zum Open Banking Summit erfolgt konzeptionell. Die detaillierte technische Implementation wird in späteren Phasen unter Einbezug von Fachexperten aus der Industrie entwickelt.

---

## 2. Security Flow: Security Standards Evaluation

### Marktanalyse als Basis

Die bereits in der Marktanalyse identifizierten Standards werden im Detail analysiert und in Bezug auf Consent Flow und Security bewertet. Diese Standards bilden die Grundlage für die Sicherheitsarchitektur des Open Banking Project CH.

### Zentrale Key Takeaways aus der Marktanalyse

#### Governance

Unterschiedliche Governance-Modelle prägen die Umsetzung:
- Von regulatorisch vorgegebenen Modellen (UK, Brasilien, Australien)  
- Bis zu industriegetriebenen Standards (Open Wealth, SFTI)
- Die Steuerung variiert erheblich

#### Technologische Standards sind nicht global vereinheitlicht

- JSON als Dateiformat und RESTful APIs als Architekturstandard sind de facto etabliert
- Die Nutzung von XML oder YAML ist hingegen stark verteilt
- Einzig CDS (Australien) verwendet alle Formate konsistent

#### Consent- und Sicherheitsmodelle variieren stark

Von App-to-App bis Decoupled Flows gibt es keinen eindeutigen globalen Consent-Standard. Auch bei Sicherheitsmodellen (z.B. FAPI, OAuth, OIDC) sind große Unterschiede erkennbar.

#### Produkte & Services stark fragmentiert

Die Abdeckung von Finanzprodukten ist sehr unterschiedlich:
- Nur wenige Standards decken Lending, Investments und Versicherungen ab
- Die meisten bleiben bei Kernprodukten wie Girokonten und Kreditkarten

#### Open Finance ist im Kommen – aber uneinheitlich

- Während einige Initiativen (z.B. OP Brasil, NextGenPSD2, SingFINDex) bereits umfangreiche Open Finance-Funktionen abdecken
- Fokussieren sich andere noch stark auf reines Open Banking

#### Payment Initiation unterschiedlich ausgereift

- Während UK, Brasilien und NextGenPSD2 umfassende Zahlungsinitiationen inkl. Bulk, File & VRP unterstützen
- Bieten andere Standards (z.B. Open API Hongkong, CDS, SingFINDex) kaum oder keine Funktionen in diesem Bereich

---

## 3. Consent Flow: Consent Architekturen

### Übersicht verschiedener Consent-Modelle

#### Consent Approaches

**App To App Redirect**
- Direkter Übergang zwischen Anwendungen
- Nahtlose Benutzererfahrung
- Sichere Übertragung von Consent-Informationen

**Browser Redirect**  
- Standard-Web-basierte Umleitung
- Kompatibel mit bestehenden Web-Infrastrukturen
- Bewährte Sicherheitsmechanismen

**Decoupled**
- Entkoppelte Verarbeitung von Consent-Anfragen
- Asynchrone Verarbeitung möglich
- Erhöhte Flexibilität in der Implementation

**Embedded**
- Eingebettete Consent-Mechanismen
- Integration in bestehende User Interfaces
- Reduzierte Kontextwechsel für Benutzer

### Deep Dive: Inter-App Consent Flows

Inter-App Consent Flows basieren auf standard OAuth 2.0 Consent Flows und bieten eine bewährte Grundlage für sichere Autorisierungsprozesse.

---

## 4. JWT Token Architektur

### OAuth 2.0 vs. SSI Architekturmodelle

#### OAuth 2.0 Architektur

**Komponenten:**
- **User (resource owner)**: Der Ressourcenbesitzer
- **Client**: Die anfragende Anwendung  
- **Resource**: Die geschützte Ressource
- **IdP (identity provider)**: Der Identitätsanbieter

**Funktionsweise:**
- User autorisiert Client über Authentication-Prozess
- Bearer Token ermöglicht Zugriff auf Ressourcen
- IdP stellt Identitätsdienste bereit

#### SSI Architektur

**Komponenten:**
- **Holder**: Der Datenbesitzer
- **Issuer**: Der Aussteller von Credentials
- **Verifier**: Der Verifizierer von Daten

**Funktionsweise:**
- Holder teilt Daten kontrolliert
- Datenhoheit bleibt beim Besitzer
- Privatsphäre wird geschützt

#### Zielsetzungen Vergleich

**OAuth 2.0:**
- Autorisierung von Zugriffen auf die Ressourcen eines Users mittels Bearer Token
- Autorisiert ist, wer ein gültiges Token vorweisen kann
- Authentisierung ohne Credentials des Users offen zu legen

**SSI:**
- Datenhoheit bleibt beim Besitzer der Daten
- Die Privatsphäre des Holders wird geschützt
- Daten sind durch den Holder beweisbar
- Daten werden nur mit Consent des Holders geteilt

---

## 5. Generische Implementation: Authentifizierung, Authorisierung, Audit und Compliance

### Begründete Auswahl von Standards

Basierend auf der Marktanalyse und Verifikation mit Experten werden folgende Standards für die Implementation verwendet:

- **FAPI 2.0** (Financial-grade API)
- **OAuth 2.0** (Autorisierungsframework)
- **OIDC** (OpenID Connect)

### Consent und Security Flow Implementation

#### Beispiel-Implementation: Bank Onboarding Prozess

**Prozessablauf (Schalter, Peer-to-Peer ohne Registry):**

| # | Akteur | Schritt | System/Schnittstelle | Felder (Hin/Her) | Bemerkung |
|---|--------|---------|---------------------|------------------|-----------|
| 0 | Herr Müller | Betritt Filiale, will Konto eröffnen | – | – | – |
| 1 | Berater/in | Frage: "Wurden Sie in den letzten 24 Monaten bereits bei einer CH-Bank vollständig identifiziert?" | Finstar Maske | frageAntwort (Ja/Nein/Weiss nicht) | Pflichtfeld |
| 2 | Herr Müller | Antwortet "Ja, bei Bank A" | – | – | – |
| 3 | Berater Müller | Einwilligung unterschreiben (Papier/Pad) | PDF | consentPDF (intern) | Jede Bank archiviert das unterschriebene PDF im eigenen System. Zusätzlich enthält das spätere JWT-Access-Token einen Claim "consent": true (JWT-Consent) als digitalen Nachweis der Kundeneinwilligung. |
| 4 | Schalter-App | Check-Request – POST /customer/check an Bank A | mTLS API | Basic Dataset: sharedCustomerHash, name, vorname, geburtsdatum | Aufruf über mTLS 1.3 (beidseitige Zertifikatsprüfung, Cipher TLS_AES_256_GCM_SHA384) – schützt Integrität & Vertraulichkeit (FINMA-RS 08/21) |
| 5 | Bank A-API | Check-Response – Prüfergebnis | – | match, idDate | Treffer bestätigt, Ident noch gültig (< 24 Monate) |
| 6 | Schalter-App | Full-Request – POST /customer/fullRequest (JWT) | mTLS API | Header: Authorization: Bearer <JWT> (signiertes JSON Web Token mit Client-ID, Scope ident.fullRequest, Ablauf exp, Claim "consent": true). Body: { sharedCustomerHash, purpose:"accountOpening" } | JWT-Consent-Claim dient als digitaler Nachweis der Kundeneinwilligung |
| 7 | Bank A-API | Liefert Full Customer Dataset | TLS E2E | Full Dataset → Stammdaten, Adressen, Kontakt, Steuer, KYC plus Ident-Objekt: identArt, referenznummer, ausstellungsdatum, gueltigBis, ausgestelltIn, pdfUrlPassportScan | Dokument-URLs = einmalige, signierte Links (10 min gültig) |
| 8 | Schalter-App | Abgleich-Dialog, fehlende Daten ergänzen | Finstar Import | – | – |
| 9 | Finstar (B) | Speichert vollständigen Datensatz inkl. Ausweis-PDF (Download) | Finstar-DB | origin="Bank A-API" | – |
| 10 | Berater/in | Konto eröffnen | Core-System | – | – |

### Sicherheitsmodelle

**FAPI (Financial-grade API)**
- Hochsichere Autorisierung für Finanzdienstleistungen
- Erweiterte Sicherheitsanforderungen über OAuth 2.0 hinaus
- Schutz vor erweiterten Bedrohungsszenarien

**OAuth 2.0**
- Standardisiertes Autorisierungsprotokoll
- Bearer Token-basierte Zugriffskontrolle
- Weite Verbreitung und Unterstützung

**OIDC (OpenID Connect)**
- Identitätsschicht über OAuth 2.0
- Standardisierte Authentifizierungsmechanismen
- ID Token für Identitätsinformationen

### Integration Patterns

Die Implementation folgt etablierten Integration Patterns, die eine nahtlose Einbindung in bestehende Systemlandschaften ermöglichen.

---

## 6. Compliance and Regulatory Alignment

### Rechtliche Anforderungen

#### Schweizer Finanzmarkt-Kontext

**Regulatorische Ausgangslage:**
- Compliance mit schweizerischen Finanzmarktgesetzen
- Datenschutzbestimmungen nach DSG
- Geldwäschereigesetz (GwG) Anforderungen

**Spezifische Compliance-Anforderungen:**

| Rechtliche Anforderung | Artikel | Anwendungsbereich |
|----------------------|---------|-------------------|
| GwG Art. 3 Identifizierung der Vertragspartei | ✓ | Identifikationsprozess |
| GwG Art. 4 Feststellung des wirtschaftlich berechtigten Person | ✓ (je nach Produktauswahl) | KYC-Prozess |

### Level of Assurance

**QEAA (Qualified Electronic Authentication Assurance)**
- Höchste Sicherheitsstufe für kritische Prozesse
- Rechtlich verbindliche elektronische Identifizierung

**EAA (Electronic Authentication Assurance)**
- Standard-Sicherheitsstufe für reguläre Prozesse
- Elektronische Authentifizierung mit mittlerem Vertrauensniveau

**Self-declared**
- Selbstdeklarierte Angaben
- Niedrigste Sicherheitsstufe für unkritische Daten

### Authentication Methods

**2FA (Two-Factor Authentication)**
- Mehrstufige Authentifizierung
- Erhöhte Sicherheit durch multiple Faktoren

**Wallet**
- Digitale Wallet-Integration
- Sichere Speicherung von Credentials

**QES (Qualified Electronic Signature)**
- Qualifizierte elektronische Signatur
- Höchste rechtliche Verbindlichkeit

### Global Verifiable Credentials Ecosystem

**Internationale Entwicklungen:**
- W3C Verifiable Credentials Standard wird zum weltweiten Standard für vertrauenswürdige portable Daten
- Europäische Union führt bereits erfolgreiche große Pilotprojekte für Verifiable Credentials durch
- NOBID Consortium gestaltet die EU-Wallet für Zahlungen

**Schweizer Investitionen:**
- Schweizer Investitionen in das Verifiable Credentials Ecosystem mit der SWIYU Wallet
- Trust Registry für Entitäten schafft natürliche Schienen für vertrauenswürdige Datennutzung

### Detailliertes Zielbild: Dezentral

**Use Case**: Eröffnung eines Bankkontos. Für die Identifikation wird eine Schweizer E-ID verwendet, welche im staatlichen Wallet aufbewahrt wird.

**Customer Journey:**

1. Produzent und Integrator publizieren ihre Public Keys auf der Verifiable Data Registry und registrieren ihre Identitäten bei der Trust Registry

2. Produzent (Fedpol) stellt dem Kunden die E-ID als Verifiable Credential in sein Wallet aus

3. Kunde verifiziert die Identität des ausstellenden Produzenten bei der Trust Registry

4. Kunde informiert sich über Produktangebot (Website, App) des Integratoren und startet den Registrationsprozess

5. Integrator (Bank) fordert den Kunden auf seine Daten (E-ID) als verifiable Presentation zu teilen

6. Kunde gibt Consent für das Teilen gewisser Attribute aus seiner E-ID zur Verifikation seiner Identität

7. Verifiable Presentation wird an Integrator übermittelt

8. Integrator verifiziert die Integrität des Credential und die Identität des ausstellenden Produzenten bei der Trust Registry

**Systemkomponenten:**
- **Produzent**: System mit API-Layer
- **Kunde**: Mobiles Wallet
- **Dezentrales Vertrauensnetzwerk**: Registry-System
- **Integrator**: Kernbankensystem mit Umsysteme

**Datenflüsse:**
- Leistungsfluss (schwarz)
- Datenfluss (blau) 
- Consentfluss (orange)

---

## Fazit und Roadmap

### Zentrale Erkenntnisse

**Prioritär gilt es:**
1. Das Open API Kundenbeziehung zu formulieren
2. Den MVP vorzubereiten
3. Die Eckpunkte für das Föderierte System zu erarbeiten

**Prinzipdarstellung für die Anwendung:**
- Die Open API Kundenbeziehung soll in den Zielbildern 1-4 angewendet werden
- Top-Down Formulierung als künftiger Standard
- Abdeckung sämtlicher Konstellationen der digitalen Kundeninteraktion

**Governance-Aspekte:**
- Das föderierte System beschreibt die Form der Zusammenarbeit
- In Phase 1 werden die Eckpunkte beschrieben
- Unterscheidung zwischen fachlichem und technischem Trust

**Beispielhafte Rollen:**
- Orchestrator
- Nutzer/Kunde
- Stellvertreter
- QS DL (Qualified Service Delivery)
- Datenhalter/API Provider
- Bund (E-ID)

### Nächste Schritte

1. **Detaillierung der technischen Spezifikationen** basierend auf den gewählten Standards
2. **Entwicklung von Sequence Diagrammen** für bessere Verständlichkeit
3. **Integration Pattern Definition** für verschiedene Anwendungsszenarien
4. **Compliance Framework Entwicklung** mit entsprechenden Disclaimern
5. **Community-basierte Verifikation** und externe Validierung

---

## Quellen und Referenzen

- OpenAPI 3.0 Standard: https://spec.openapis.org/oas/v3.0.3.html
- FAPI 2.0 Spezifikation
- OAuth 2.0 Framework
- OpenID Connect Spezifikation
- W3C Verifiable Credentials Standard
- Schweizer Geldwäschereigesetz (GwG)
- FINMA-Rundschreiben 08/21

**Kontakt für Rückfragen:**
- Eurospider Information Technology AG
- Winterthurer Strasse 92, CH-8006 Zürich
- Peter Schäuble
- Telefon: +41 43 255 25 25
- E-Mail: support@kyc.ch
- Website: www.kyc.ch