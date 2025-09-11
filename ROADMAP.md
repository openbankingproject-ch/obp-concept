# Open API Kundenbeziehung - Master Implementierungs-Roadmap

## Executive Summary

Diese Master-Roadmap konsolidiert alle Implementierungs-Timelines des Open API Kundenbeziehung Projekts und bietet eine einheitliche Quelle für Projektphasen, Meilensteine und Deliverables. Die Umsetzung folgt einem dreiphasigen Ansatz über 36 Monate, von der Fundament-Phase bis zum Produktions-Rollout.

**Strategisches Ziel:** Die Schweiz als führenden Markt für Kundendatenportabilität und Finanzservice-Integration durch sichere, standardisierte APIs etablieren. Hierfür wird durch das Open Banking Project eine offene Schnittstelle für die Kundenbeziehung bereitgestellt. Diese umfasst das Onboarding, die Pflege der Kundendaten (z.B. periodische Verifikation der Richtigkeit), sowie die Möglichkeit der Saldierung einer Kundenbeziehung. Die Schnittstelle soll am Schluss sowohl für Bürger resp. Kunden, für Menschen in Unternehmen, wie auch für Firmenkunden eingesetzt werden können. 
Die Open API Kundenbeziehung definiert ein Basisset an Kundendaten, welches die Indentifikation und die Erlangung von Leistungen (z.B. Onboarding und Identifikation für die Eröffnung eines Bankkontos) im Netzwerk ermöglicht. Durch die digitale Übertragbarkeit der identifizierten Kundendaten wird die nahtlose und unterbruchsfreie Beanspruchung von Leistungen für alle Beteiligten einfacher, effizienter und auch sicherer. Um die Anschlussfähigkeit in jedes Ecosystem zu gewährleisten umfasst das Basis-Set und der zugehörige Referenzprozess folgende Bausteine: 
- Initialisierung: Serviceerschliessung vie entsprechendem Kanal
- Produktauswahl: Sicherstellung der Anschlussfähigkeit für den Bezug von Services in einem Ecosystem (z.B. Bankkonto, Hypothek, Versicherung, Fussballticket, Bleistift)
- Selbstdeklaration: Steuerrechtliche (z.B. Domizil, wirtschaftliche Berechtigung) und regulatorische Themen (z.B. FATCA)
- Basisdaten: Personalien und Adress- und Kontaktdaten (alle Daten für die E-ID sind hier auch enthalten; die relevante Teilmenge bei den Basisdaten ist kompatil und semantisch identisch zu den verwendeten Daten in der E-ID)
- Erweiterte Daten: Sicherstellung der Anschlussfähigkeit für die Serviceauswahl in einer anderen Branche (z.B. Einkommen, Hobbies)
- Ausweis: Vorweisung des Ausweisdokumentes
- Identifikation: Überprüfung der Identität mittels des vorgewiesenen Ausweisdokumentes in einen regulatorisch konformen Identifikationsverfahren
- Check: Durchführung von regulatorisch notwendigen Prüfungen (Alterscheck, PEP, Sanctionlist) für den bezug von Produkten/Services, die dies erfordern (z.B. Alkohol, Bankkonto)
- Consent: Zustimmung des Konsumenten (natürliche oder juristische Person) im Kontext von Datenschutz und Einwilligungsmanagement (z.B. AGBs, Produktinformationen, Data-sharing Agreement)
- Signatur: Bestätigung mittels regulatorisch geforderter Signaturstufe (z.B. QES)
- Backoffice: Sicherstellung der Verbindung in die Verarbeitung
Consent und Securityflow:
- Der Consentflow bildet die Zustimmung des Kunden ab. Der Securityflow ist unabhängig davon formuliert und stellt dadurch auch die Anschlussfähigkeit in jedes andere Ecosystem sicher.
Zur Sicherstellung der internationalen Kompatibilität werden die gängigsten Standards verwendet. Ebenso wird die Abstimmung mit und Kompatibilität mit anderen Initiativen sichergestellt. Dies sind beispielsweise SFTI (z.B. Kundendatenverwendung in der API des Zahlungsverkehrs), Open Wealth (z.B. Kundendatenverwendung in der API Customer Management für die Anbindung von EVVs), eCH (Verwendung von Kundendaten im behördlichen Kontext.
Diese offene Schnittstelle steht nach der Fertigstellung Allen offen zur Verfügung und wird z.B. auch auf der I14Y-Plattform vom Bundesamt für Statistik bereit stehen. Es besteht auch die Idee, diese Open API Kundenbeziehung bei ISO akreditieren zu lassen.

Roadmap:
Phase 1 (bis 06/26): 
- Sicherstellung der konzeptionellen Grundlagen (Marktanalyse, Anforderungen, Referenzprozesse und Daten, API Design, föderatives Netzwerk, Consent & Security Flow, rechtliche Rahmenbedingungen, Testkonzept)
- Bereitstellung einer Alpha Version mit der Funktionalität Onboarding und Pflege für Bürger der Schweiz und der EU mit dem Domizil in der Schweiz
- Weiterentwicklung und Verifikation dieses Funktionsumfanges in der Community vom OpenBankingProject
- Veröffentlichung dieser Version durch die Community und e.B. eCH getesteten und verifizierten Schnittstelle
- Konzeptionelle Grundlagen für die Verwendung im Netzwerk: z.B. Governance für föderative Sturkturen, regulatorische Abklärungen
- Umsetzung eines MVPs mit dem Fokus "Identifikation Privatkunden" und Weitergabe im Netzwerk
  
Phase 2 (ab 07/26)
- Konzeption der Weiterentwicklung (z.B. Governance im föderativen System)
- Erweiterung des ersten MVPs "Identifikation Privatkunden" und Weitergabe im Netzwerk mit 5-10 zusätzlichen Unternehmen
- Aufgleisen von weiteren MVPs 



![Aufbau Customer Onboarding: Ziel und 4 Stufen](documentation/Fachliche%20Conclusions%20Open%20API%20Kundenbeziehung/Resources/images/Anforderungen%20Grafiken/Aufbau%20Customer%20Onboarding%20Ziel%20und%204%20Stufen.png)

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Master Implementierungs-Guide  
**Last Updated:** Basierend auf Conclusions 01-08 Analyse

---

**Nächste Schritte:** Review individueller Conclusion Roadmaps und Update mit Referenz auf diese Master Roadmap um Redundanzen zu eliminieren während spezialisierte technische Details beibehalten werden.
