# <span style="color: #253165">Open API Kundenbeziehung - Master Implementierungs-Roadmap</span>

## Executive Summary

Diese Master-Roadmap konsolidiert alle Implementierungs-Timelines des Open API Kundenbeziehung Projekts und bietet eine einheitliche Quelle für Projektphasen, Meilensteine und Deliverables. Die Umsetzung folgt einem dreiphasigen Ansatz über 36 Monate, von der Fundament-Phase bis zum Produktions-Rollout.

**<span style="color: #F85F3D">Strategisches Ziel:</span>** Die Schweiz als führenden Markt für Kundendatenportabilität und Finanzservice-Integration durch sichere, standardisierte APIs etablieren. Das Open Banking Project stellt eine offene Schnittstelle für die Kundenbeziehung bereit, welche das Onboarding, die Pflege der Kundendaten sowie die Saldierung einer Kundenbeziehung umfasst. Die Schnittstelle ist für Privatkunden, Unternehmen und Firmenkunden konzipiert.

Die Open API Kundenbeziehung definiert ein Basisset an Kundendaten, welches die Identifikation und die Erlangung von Leistungen im Netzwerk ermöglicht. Durch die digitale Übertragbarkeit der identifizierten Kundendaten wird die nahtlose und unterbruchsfreie Beanspruchung von Leistungen für alle Beteiligten einfacher, effizienter und sicherer. 

**Referenzprozess-Bausteine für Ecosystem-Anschlussfähigkeit:** 
- **Initialisierung:** Serviceerschliessung via entsprechendem Kanal
- **Produktauswahl:** Sicherstellung der Anschlussfähigkeit für den Bezug von Services in einem Ecosystem
- **Selbstdeklaration:** Steuerrechtliche und regulatorische Aspekte
- **Basisdaten:** Personalien und Adress-/Kontaktdaten (E-ID-kompatibel)
- **Erweiterte Daten:** Sicherstellung der branchenübergreifenden Serviceauswahl
- **Ausweis:** Vorweisung des Ausweisdokumentes
- **Identifikation:** Überprüfung der Identität mittels regulatorisch konformer Verfahren
- **Check:** Durchführung regulatorisch notwendiger Prüfungen (Alterscheck, PEP, Sanktionslisten)
- **Consent:** Zustimmung des Konsumenten im Kontext von Datenschutz und Einwilligungsmanagement
- **Signatur:** Bestätigung mittels regulatorisch geforderter Signaturstufe
- **Backoffice:** Sicherstellung der Verbindung in die Verarbeitung
**Consent und Security Flow:**
Der Consent-Flow bildet die Zustimmung des Kunden ab, während der Security-Flow unabhängig formuliert ist und dadurch die Anschlussfähigkeit in jedes Ecosystem sicherstellt.

**Standards und Kompatibilität:**
Zur Sicherstellung der internationalen Kompatibilität werden etablierte Standards verwendet. Die Abstimmung und Kompatibilität mit anderen Initiativen wird gewährleistet:
- SFTI: Kundendatenverwendung in der API des Zahlungsverkehrs
- Open Wealth: Kundendatenverwendung in der API Customer Management für EVV-Anbindung
- eCH: Verwendung von Kundendaten im behördlichen Kontext

**Verfügbarkeit:**
Die offene Schnittstelle wird nach Fertigstellung öffentlich verfügbar sein, einschliesslich der I14Y-Plattform des Bundesamts für Statistik. Eine ISO-Akkreditierung der Open API Kundenbeziehung wird angestrebt.

## <span style="color: #0070C0">Implementierungs-Roadmap</span>

### <span style="color: #4cb867ff">Phase 1: Fundament (bis 06/26)</span>
**Konzeptionelle Grundlagen:**
- Marktanalyse, Anforderungen, Referenzprozesse und Daten
- API Design, föderatives Netzwerk, Consent & Security Flow
- Rechtliche Rahmenbedingungen, Testkonzept

**Alpha Version Bereitstellung:**
- Funktionalität Onboarding und Pflege für Schweizer und EU-Bürger mit Schweizer Domizil
- Community-basierte Weiterentwicklung und Verifikation
- Veröffentlichung der getesteten und verifizierten Schnittstelle

**Netzwerk-Grundlagen:**
- Governance für föderative Strukturen
- Regulatorische Abklärungen
- MVP-Umsetzung "Identifikation Privatkunden" mit Netzwerk-Weitergabe

### <span style="color: #FFC000">Phase 2: Expansion (ab 07/26)</span>
**Weiterentwicklung:**
- Konzeption der föderativen System-Governance
- Erweiterung des MVP "Identifikation Privatkunden" mit 5-10 zusätzlichen Unternehmen
- Aufgleisen weiterer MVPs 



![Aufbau Customer Onboarding: Ziel und 4 Stufen](documentation/Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/Resources/images/Anforderungen%20Grafiken/Aufbau%20Customer%20Onboarding%20Ziel%20und%204%20Stufen.png)

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Master Implementierungs-Guide  
**Last Updated:** Basierend auf Conclusions 01-08 Analyse

---

