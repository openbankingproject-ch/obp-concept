# OBP Rechtliche Rahmenbedingungen Conclusion

## Inhalt

1. [Executive Summary](#executive-summary)
2. [Schweizer Finanzmarkt-Kontext und Regulatorische Ausgangslage](#schweizer-finanzmarkt-kontext-und-regulatorische-ausgangslage)
3. [Identifizierte rechtliche Kernfragestellungen und Expertenstellungnahmen](#identifizierte-rechtliche-kernfragestellungen-und-expertenstellungnahmen)
4. [Offene Fragestellungen](#offene-fragestellungen)
5. [Vorschlag Compliance-Framework für API-Design](#vorschlag-compliance-framework-für-api-design)
6. [Risikomanagement und Haftung](#risikomanagement-und-haftung)
7. [Fazit und Empfehlungen](#fazit-und-empfehlungen)

---
**Terminologie:** In dieser Dokumentation werden durchgängig die Begriffe "Datenproduzent" und "Datenintegrator" verwendet. Der "Datenproduzent" stellt die Kundendaten bereit, während der "Datenintegrator" diese Daten nutzt, um eine neue Kundenbeziehung (bzw. Bankbeziehung in unseren Beispielen) aufzubauen.

## Executive Summary

Die rechtlichen Rahmenbedingungen für die Open API Kundenbeziehung sind durch ein komplexes Zusammenspiel von Schweizer Finanzmarktregulierung, Datenschutzrecht und internationalem Recht geprägt. Die Analyse identifiziert kritische Rechtsgebiete und bietet praxisorientierte Compliance-Frameworks (regelkonforme Strukturen) für die API-Implementation.


**Zentrale Erkenntnisse:**
- Aus rechtlicher und regulatorischer Perspektive gibt es keine unüberwindbaren Hürden
- FINMA-Stellungnahme als kritischer Erfolgsfaktor für Marktakzeptanz
- Die Haftungsverteilung zwischen Datenproduzenten und Datenintegrator bedarf einer klaren vertraglichen Regelung
- In der Regel liegt die Haftung für die Datennutzung beim Datenintegrator – es sei denn, der Datenproduzent hat in besonders schwerwiegender Weise gegen seine Sorgfaltspflicht verstossen, was im Eintrittsfall nachzuweisen ist
- Die rechtskonforme Verarbeitung von Daten im Sinne des Kunden setzt robuste Consent-Mechanismen voraus



**Wichtiger Disclaimer:** *Die in diesem Dokument enthaltenen Informationen und Empfehlungen stellen keine Rechtsberatung dar. Wir sind keine Fachpersonen im rechtlichen Bereich. Für konkrete rechtliche Fragestellungen ist zwingend qualifizierte juristische Beratung einzuholen.*

---

## Schweizer Finanzmarkt-Kontext und Regulatorische Ausgangslage

### Rechtliche Rahmenbedingungen-Matrix

Die Open API Kundenbeziehung bewegt sich im Spannungsfeld verschiedener Rechtsgebiete:

| Rechtsbereich | Primäre Quelle | FINMA-Guidance | Anwendung auf APIs |
|---------------|----------------|----------------|-------------------|
| **Bankkundengeheimnis** | BankG Art. 47 | RS 2008/7 | Consent-basierte Datenfreigabe erforderlich |
| **Geldwäschereirecht** | GwG Art. 3, 4 | RS 2016/7 | Identifikationsstandards und KYC-Prozesse |
| **Datenschutz** | DSG, GDPR-Äquivalenz | FAQ DSG/GDPR | Consent Management, Datenminimierung |
| **Outsourcing** | BankV Art. 25 | RS 2008/7 | Drittanbieter-Service-Integration |
| **Operational Risk** | Basel III/IV | FINMA-Guidance | API-Zuverlässigkeit, Sicherheitsanforderungen |

### Compliance-Ausgangslage

**Regulatorische Komplexität:**
- Bestehende Gesetze müssen auf neue Technologien interpretiert werden
- Internationale Standards als Orientierungshilfe
- FINMA-Position noch nicht vollständig etabliert


**Rechtsunsicherheiten:**
- Haftungsverteilung bei API-basierten Datenübertragungen
- Mindestanforderungen für Datenvalidierung
- Cross-Border Data Sharing Compliance
- Mindestanforderungen für die branchenübergreifende Datennutzung

---

## Identifizierte rechtliche Kernfragestellungen 
Basierend auf den durchgeführten Workshops und dem Austausch mit Fachexperten wurden über 15 kritische rechtliche Fragestellungen identifiziert, die eine qualifizierte juristische Klärung erfordern. Die Abklärung dieser Fragen erfolgte im Rahmen des Workshop-Formates gemeinsam mit internen Legal-Experten der Projektteilnehmenden und wurde in Phase 1 initial beantwortet. Nachfolgend findet sich ein Auszug der diskutierten Fragestellungen sowie die Antworten auf vier konkrete Schlüsselfragen.

| Kategorie         | Thema                            | Fragestellung                                                                                                                                                                                                           |
| ----------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rechtlich**     | Dataset                          | Welche Mindestanforderungen gelten für die Datenprüfung sowie für die herausgegebenen Datensätze?                                                                                                                       |
| **Rechtlich**     | Föderatives System               | Wie soll das föderierte System gestaltet und operationalisiert werden?                                                                                                                                                  |
| **Rechtlich**     | Governance                       | Wie wird das sich entwickelnde Netzwerk rechtlich zwischen den Akteuren abgesichert?                                                                                                                  |
| **Rechtlich**     | Haftung (Delegation)             | Regelung der Delegation (Beispiel: HBL gibt ein Onboarding der Intrum an eine Drittbank weiter. Wem kommt welche Rolle und Haftbarkeit zu?)                                                                             |
| **Rechtlich**     | Haftung (Online Ident.)          | Haftung bei Online Ident. im Zusammenhang mit Ersteinzahlungen: Wer haftet wofür (da Identifikation aus Bestandteilen von Drittanbieter und Bank besteht)?                                                              |
| **Rechtlich**     | Identifikation & Outsourcing     | Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden? (FINMA)                                                                                              |
| **Regulatorisch** | Berechtigte Kundengruppen        | Festlegung von «out of Scope» Kundengruppen (z.B. Workout/Recovery Positionen, Kunden mit MROS Meldungen, etc.) vor Datenweitergabe, oder danach durch neue Bank?                                                       |
| **Regulatorisch** | Governance                       | Wie wird die laufende Weiterentwicklung regulatorischer Anforderungen im föderierten System sichergestellt?                                                                                                             |
| **Regulatorisch** | Identifikation (Vorrat)          | Wird das Prinzip einer „Identifikation auf Vorrat“ grundsätzlich erlaubt? (z.B. bei Ausweis gestohlen, Namensänderung bei Heirat etc.) Definition der Dauer, wie lange eine Identifikation wiederverwendet werden kann? |
| **Regulatorisch** | Identifikation (Arten)           | Welche Arten der Identifikation sollen weitergegeben werden können (z.B. nur Online / Video Ident.)?                                                                                                                    |
| **Regulatorisch** | Identifikation & Ausweisdokument | Umgang mit Ausländern / Ausländerausweis nötig?                                                                                                                                                                         |

**Wichtiger Disclaimer:** *Die Beantwortung der nachfolgenden Schlüsselfragen bezieht sich speziell auf die Eröffnung einer Kundenbeziehung im Banking.*


## Welche Mindestanforderungen gelten an die Herausgabe von Datensätzen in Bezug auf Aktualität, Qualität und den Umgang mit Risikoprofilen wie PEP, Sanktionslisten und Hochrisikokunden?​

Bestehende Marktlösungen und Initiativen im Schweizer Markt zeigen, dass Daten grundsätzlich übernommen werden, ausser die Abteilungen für Risiko und Compliance sehen Anlass für weitere Abklärungen.

Dies erscheint plausibel, da es sich um Daten handelt, die der Datenproduzent bei sich führt, nutzt und von deren Richtigkeit er ausgeht. Sollte sich die Aktualität der Daten ändern, wäre dies dem Datenproduzenten ebenfalls nicht unmittelbar bekannt. 

Der Datenintegrator erhält die Daten auf Basis einer Identifikation sowie weiterer Datenbearbeitungen, welche FINMA-konform erfolgen. Wesentlich bleibt zudem, dass der Kunde seine Daten nochmals bestätigen muss – wie dies auch bei einer regulären Kontoeröffnung der Fall wäre. 

Falls Banken Zweifel äussern, ob auf den erhaltenen Daten aufgebaut werden könne, stellt sich die Frage, worauf ansonsten abgestellt werden sollte, da auch beim herkömmlichen Onboarding die Angaben letztlich vom Kunden stammen. 

In dieser Konstellation besteht zusätzlich eine Vorerfassung durch die bisherige Bank, welches die Kundenbeziehung bereits über eine gewisse Zeit geführt hat. Der Datenintegrator könnte alternativ eine Identifikation durch einen externen Provider durchführen. Der Unterschied zur beschriebenen Konstellation bestünde dann im Wesentlichen nur darin, dass die Identifikation nicht vom Provider, sondern vom Datenproduzenten zu einem früheren Zeitpunkt vorgenommen wurde. 

Aus dem blossen Zeitablauf ergeben sich dabei keine Probleme hinsichtlich der Identität: Der Kunde bleibt derselbe Kunde.
Sicherzustellen bleibt, dass es sich bei Datenintegrator und Datenproduzent um dieselbe Person handelt, die auftritt. 

Dies wird durch den Prozess gewährleistet (Angaben des Kunden gegenüber dem Datenintegrator zur bestehenden Kundenbeziehung, Bestätigung beim Datenproduzenten, dass die betreffenden Daten an den Datenintegrator übergeben werden sollen).

Für den Umgang mit Spezialfällen (z. B. PEP, GwG-Thematik) bietet es sich an, dass die beteiligten Banken Kriterien festlegen, in welchen Fällen Daten nicht weitergegeben werden. Im konkreten Einzelfall kann der Datenproduzent dann mitteilen, dass ein solcher Fall vorliegt, ohne weitere Details offenlegen zu müssen.

## Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden (beispielsweise zwischen einer Bank A und einer Bank B), und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?

Die Verantwortung in Bezug auf die Verwendung von Daten liegt bei dem Datenintegrator (z.B. Bank), der sie nutzt. Dies gilt auch im Fall einer delegierten Kundenidentifikation.​

Die Lage ist grundsätzlich nicht anders, ob ein Provider für die Identifikation eingesetzt wird oder ob die Daten aus einer vorbestehenden Bankbeziehung genutzt werden. ​Dies gilt für die Verantwortung der Bank, welches die Daten nutzt, und kann auch in Bezug auf die Haftung Dritter (sei es ein Provider, sei es ein Datenproduzent) so gehandhabt werden.​ 

In Betracht fällt wohl einzig eine Haftung bei Pflichtverletzungen des Dritten, d.h. die Bank wird davon ausgehen können, dass der Dritte die ihm obliegenden Pflichten beachtet hat. ​Nachdem die Verantwortung bei der Bank liegt, welche die Daten nutzt, der Datenproduzent kaum bereit sein wird, substanzielle Haftungsrisiken einzugehen, und allfällige Pflichtverletzungen des Dritten für die Bank in aller Regel schwer zu eruieren und zu belegen sein werden, wird sich hier tendenziell eine Beschränkung auf Grobfahrlässigkeit und Vorsatz empfehlen oder allenfalls, soweit solche in einem Vertrag zielführend ausformuliert werden können, auf bestimmte, klar definierte Vertragsverletzungen.​

## ​Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden, und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?

Wenn der Datenintegrator die Daten des Datenproduzenten bezüglich der Identität nutzt, welche dieser im Rahmen seiner Kundenbeziehung angelegt hat, wird der Datenproduzent vom Datenintegrator nicht damit beauftragt, für ihn eine Identifizierung durchzuführen. Die Identifizierung hat der Datenproduzent vielmehr schon längst für seine Kundenbeziehung durchgeführt. ​Der Datenproduzent übergibt dem Datenintegrator nur gewisse Daten mit dem Effekt, dass eine eigentliche Identifikation gar nicht mehr durchgeführt werden muss, sondern stattdessen im definierten Prozess eine frühere Identifikation verwendet werden kann.​ Bei diesem Vorgang liegt kein Outsourcing vor, sondern eine reine Übergabe von Daten.

## Wie ist die Haftung bei delegiertem Onboarding geregelt, wenn beispielsweise eine Bank das Onboarding eines Dritten an eine andere Bank überträgt? Wer trägt welche Verantwortung?

Eine "Identifikation auf Vorrat" liegt bei genauer Betrachtung nicht vor: Die Identifikation ist beim Datenproduzenten zum Zweck der Führung der Bankbeziehung zwischen Kunden und Datenproduzenten gemacht worden. ​

Bei der Übermittlung der Daten an den Datenintegrator findet lediglich insoweit eine Änderung im Zweck der betreffenden Daten statt, als diese Daten beim Datenintegrator nicht der ursprünglichen, sondern der neuen Bankbeziehung dienen. Dies ist aber offenkundig unproblematisch, weil der Kunde genau das will und demzufolge mit dieser Zweckänderung einverstanden ist.​

Sinnvollerweise werden die verschiedenen Schritte auseinandergehalten: Die eigentliche Identifikation fand beim Datenproduzenten statt. Dessen Daten werden an den Datenintegrator übergeben. Sicherzustellen bleibt, dass es sich um dieselbe Person handelt, was 1. gewährleistet ist und 2. immer sicherzustellen ist, auch wenn die Identifikation erst vor kurzem erfolgt ist. Der Hinweis, dass Identifikation und Kontoeröffnung nie gleichzeitig erfolgen, ist insoweit schlüssig. Aus der zeitlichen Diskrepanz zwischen diesen Schritten ergibt sich nicht per se ein Problem.​

Damit erscheint es auch nicht als relevant, ob der bei der Identifikation beim Datenproduzenten verwendete Ausweis noch gültig ist oder ob gewisse Merkmale des Kunden geändert haben (z.B. der Name durch Heirat). Die Identität also solche steht dennoch fest, und dass es sich um die damals identifizierte Person handelt, ist wie gesagt durch den Ablauf sichergestellt.

## Fazit und Empfehlungen

### Rechtliche Handlungsempfehlungen

#### Kurzfristige Massnahmen (0-6 Monate)

1. **Qualifizierte Rechtsberatung engagieren:** Spezialisierte Anwaltskanzlei mit FinTech/Banking-Expertise für detaillierte rechtliche Analyse

2. **FINMA-Strategie entwickeln:** Entscheidung über Timing und Approach für FINMA-Engagement

3. **Legal Framework Design:** Entwicklung von Standardverträgen für API-Participants mit einem klar definierten Haftungsreglement
   
4. **Compliance-by-Design Implementation:** Integration von rechtlichen Anforderungen in die technische Architektur

#### Mittelfristige Massnahmen (6-18 Monate)

5. **Pilot Legal Testing:** Rechtliche Validierung der API-Implementation mit begrenztem Participant-Set

6. **Regulatory Engagement:** Proaktiver Dialog mit FINMA über Open API Framework

7. **Industry Coordination:** Koordination mit anderen Schweizer Financial Institutions für gemeinsame rechtliche Positionen

8. **Legal Precedent Building:** Dokumentation und Sharing von Legal Learnings für Industry Benefit

#### Langfristige Strategien (18+ Monate)

9. **Regulatory Advocacy:** Engagement in der Entwicklung von Swiss-specific Open API Regulation

10. **International Coordination:** Coordination mit EU/UK Regulatory Developments für Cross-border Compatibility

11. **Legal Innovation:** Entwicklung innovativer rechtlicher Lösungen für emerging API Use Cases

### Kritische Erfolgsfaktoren

**1. Early Legal Engagement:** Rechtsexperten von Projektbeginn an einbinden
**2. FINMA Relationship:** Proaktive und transparente Kommunikation mit der FINMA
**3. Industry Collaboration:** Gemeinsame rechtliche Positions mit anderen Market Participants
**4. Regulatory Monitoring:** Kontinuierliche Überwachung von regulatory Developments
**5. Adaptive Compliance:** Flexible Legal Architecture für schnelle Regulatory Adaptations

### Schlussbemerkung

Die rechtliche Komplexität der Open API Kundenbeziehung erfordert einen systematischen und proaktiven Approach. Die identifizierten Kernfragestellungen und Expertenstellungnahmen bieten eine solide Grundlage für die weitere rechtliche Ausgestaltung, können jedoch qualifizierte Rechtsberatung für spezifische Implementation-Entscheidungen nicht ersetzen.

Die enge Zusammenarbeit zwischen technischen und rechtlichen Experten sowie der proaktive Dialog mit der FINMA werden als kritische Erfolgsfaktoren für die rechtskonforme und marktfähige Umsetzung der Open API Kundenbeziehung identifiziert.

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Final Draft für Legal Review  
**Wichtiger Hinweis:** *Dieses Dokument enthält keine Rechtsberatung. Für verbindliche rechtliche Einschätzungen ist qualifizierte juristische Beratung erforderlich.*

---

[Quellen und Referenzen](./Quellen%20und%20Referenzen.md) 

