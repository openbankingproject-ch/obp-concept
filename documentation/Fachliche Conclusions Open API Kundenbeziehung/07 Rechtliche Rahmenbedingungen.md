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
TODO: START Restrukturierung
TODO: wichtig ist das "Wording" "Datenproduzent bzw. produzent" und "Datenintegrator" für die gesamte Dokumentation 

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
- Keine spezifischen Open API-Regelungen in der Schweiz
- Bestehende Gesetze müssen auf neue Technologien interpretiert werden
- Internationale Standards (PSD2, GDPR) als Orientierungshilfe
- FINMA-Position noch nicht vollständig etabliert


TODO: Stichpunkt 1 löschen und Stichpunkt 3 anpassen 
Stichpunkt 1 löschen 
- Mindestanforderungen für die branchenübergreifende Datennutzung
**Rechtsunsicherheiten:**
- Grenzen zwischen Datennutzung und Outsourcing
- Haftungsverteilung bei API-basierten Datenübertragungen
- Mindestanforderungen für Datenvalidierung
- Cross-Border Data Sharing Compliance

---

## Identifizierte rechtliche Kernfragestellungen 
**Basierend auf den durchgeführten Workshops und dem Austausch mit Fachexperten wurden über 15 kritische rechtliche Fragestellungen identifiziert, die eine qualifizierte juristische Klärung erfordern. Die Abklärung dieser Fragen erfolgte im Rahmen des Workshop-Formates gemeinsam mit internen Legal-Experten der Projektteilnehmenden und wurde in Phase 1 initial beantwortet. Nachfolgend findet sich ein Auszug der diskutierten Fragestellungen sowie die Antworten auf vier konkrete Schlüsselfragen.**

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

Disclaimer: Die Beantwortung der Fragen bezieht sich speziell auf die Eröffnung einer Kundenbeziehung im Banking.


## Welche Mindestanforderungen gelten an die Herausgabe von Datensätzen in Bezug auf Aktualität, Qualität und den Umgang mit Risikoprofilen wie PEP, Sanktionslisten und Hochrisikokunden?​

Andere Initiativen im Schweizer Markt zeigen, dass Daten grundsätzlich übernommen werden, ausser die Abteilungen für Risiko und Compliance sehen Anlass für weitere Abklärungen.
Dies erscheint plausibel, da es sich um Daten handelt, die der Produzent bei sich führt, nutzt und von deren Richtigkeit er ausgeht. Sollte sich die Aktualität der Daten ändern, wäre dies dem Produzenten ebenfalls nicht unmittelbar bekannt. Der Integrator erhält die Daten auf Basis einer Identifikation sowie weiterer Datenbearbeitungen, welche FINMA-konform erfolgen. Wesentlich bleibt zudem, dass der Kunde seine Daten nochmals bestätigen muss – wie dies auch bei einer regulären Kontoeröffnung der Fall wäre. Falls Banken Zweifel äussern, ob auf den erhaltenen Daten aufgebaut werden könne, stellt sich die Frage, worauf ansonsten abgestellt werden sollte, da auch beim herkömmlichen Onboarding die Angaben letztlich vom Kunden stammen. In dieser Konstellation besteht zusätzlich eine Vorerfassung durch die bisherige Bank, welche die Kundenbeziehung bereits über eine gewisse Zeit geführt hat. Der Integrator könnte alternativ eine Identifikation durch einen externen Provider durchführen. Der Unterschied zur beschriebenen Konstellation bestünde dann im Wesentlichen nur darin, dass die Identifikation nicht vom Provider, sondern vom Produzenten zu einem früheren Zeitpunkt vorgenommen wurde. 
Aus dem blossen Zeitablauf ergeben sich dabei keine Probleme hinsichtlich der Identität: Der Kunde bleibt derselbe Kunde.
Sicherzustellen bleibt, dass es sich bei Integrator und Produzent um dieselbe Person handelt, die auftritt. Dies wird durch den Prozess gewährleistet (Angaben des Kunden gegenüber dem Integrator zur bestehenden Kundenbeziehung, Bestätigung beim Produzenten, dass die betreffenden Daten an den Integrator übergeben werden sollen).
Für den Umgang mit Spezialfällen (z. B. PEP, GwG-Thematik) bietet es sich an, dass die beteiligten Banken Kriterien festlegen, in welchen Fällen Daten nicht weitergegeben werden. Im konkreten Einzelfall kann der Produzent dann mitteilen, dass ein solcher Fall vorliegt, ohne weitere Details offenlegen zu müssen.

## Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden (beispielsweise zwischen einer Bank A und einer Bank B), und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?

Die Verantwortung in Bezug auf die Verwendung von Daten liegt bei dem Datenintegrator (z.B. Bank), der sie nutzt. Dies gilt auch im Fall einer delegierten Kundenidentifikation. ​
Die Lage ist grundsätzlich nicht anders, ob ein Provider für die Identifikation eingesetzt wird oder ob die Daten aus einer vorbestehenden Bankbeziehung genutzt werden. ​Dies gilt für die Verantwortung der Bank, welche die Daten nutzt, und kann auch in Bezug auf die Haftung Dritter (sei es ein Provider, sei es ein Produzent) so gehandhabt werden.​ In Betracht fällt wohl einzig eine Haftung bei Pflichtverletzungen des Dritten, d.h. die Bank wird davon ausgehen können, dass der Dritte die ihm obliegenden Pflichten beachtet hat. ​Nachdem die Verantwortung bei der Bank liegt, die die Daten nutzt, der Produzent kaum bereit sein wird, substanzielle Haftungsrisiken einzugehen, und allfällige Pflichtverletzungen des Dritten für die Bank in aller Regel schwer zu eruieren und zu belegen sein werden, wird sich hier tendenziell eine Beschränkung auf Grobfahrlässigkeit und Vorsatz empfehlen oder allenfalls, soweit solche in einem Vertrag zielführend ausformuliert werden können, auf bestimmte, klar definierte Vertragsverletzungen.​

## ​Wie ist die Haftung geregelt, wenn fehlerhafte Datensätze übernommen und weiterverarbeitet werden, und besteht eine Pflicht zur inhaltlichen Überprüfung der übernommenen Daten?

Wenn der Integrator die Daten des Produzenten bezüglich der Identität nutzt, welche dieser im Rahmen seiner Kundenbeziehung angelegt hat, wird der Produzent vom Integrator nicht damit beauftragt, für ihn eine Identifizierung durchzuführen. Die Identifizierung hat der Produzent vielmehr schon längst für seine Kundenbeziehung durchgeführt. ​Der Produzent übergibt dem Integrator nur gewisse Daten mit dem Effekt, dass eine eigentliche Identifikation gar nicht mehr durchgeführt werden muss, sondern stattdessen im definierten Prozess eine frühere Identifikation verwendet werden kann.​ Bei diesem Vorgang liegt kein Outsourcing vor, sondern eine reine Übergabe von Daten.

## Wie ist die Haftung bei delegiertem Onboarding geregelt, wenn beispielsweise eine Bank das Onboarding eines Dritten an eine andere Bank überträgt? Wer trägt welche Verantwortung?

Eine “Identifikation auf Vorrat” liegt bei genauer Betrachtung nicht vor: Die Identifikation ist beim Produzenten zum Zweck der Führung der Bankbeziehung zwischen Kunden und Produzenten gemacht worden. ​
Bei der Übermittlung der Daten an den Integrator findet lediglich insoweit eine Änderung im Zweck der betreffenden Daten statt, als diese Daten beim Integrator nicht der ursprünglichen, sondern der neuen Bankbeziehung dienen. Dies ist aber offenkundig unproblematisch, weil der Kunde genau das will und demzufolge mit dieser Zweckänderung einverstanden ist.​
Sinnvollerweise werden die verschiedenen Schritte auseinandergehalten: Die eigentliche Identifikation fand beim Produzenten statt. Dessen Daten werden an den Integrator übergeben. Sicherzustellen bleibt, dass es sich um dieselbe Person handelt, was 1. gewährleistet ist und 2. immer sicherzustellen ist, auch wenn die Identifikation erst vor kurzem erfolgt ist. Der Hinweis, dass Identifikation und Kontoeröffnung nie gleichzeitig erfolgen, ist insoweit schlüssig. Aus der zeitlichen Diskrepanz zwischen diesen Schritten ergibt sich nicht per se ein Problem.​
Damit erscheint es auch nicht als relevant, ob der bei der Identifikation beim Produzenten verwendete Ausweis noch gültig ist oder ob gewisse Merkmale des Kunden geändert haben (z.B. der Name durch Heirat). Die Identität also solche steht dennoch fest, und dass es sich um die damals identifizierte Person handelt, ist wie gesagt durch den Ablauf sichergestellt.

## Fazit und Empfehlungen

### Rechtliche Handlungsempfehlungen

#### Kurzfristige Maßnahmen (0-6 Monate)

1. **Qualifizierte Rechtsberatung engagieren:** Spezialisierte Anwaltskanzlei mit FinTech/Banking-Expertise für detaillierte rechtliche Analyse

2. **FINMA-Strategie entwickeln:** Entscheidung über Timing und Approach für FINMA-Engagement

3. **Legal Framework Design:** Entwicklung von Standardverträgen für API-Participants mit einem klar definierten Haftungsreglement
   
4. **Compliance-by-Design Implementation:** Integration von rechtlichen Anforderungen in die technische Architektur

#### Mittelfristige Maßnahmen (6-18 Monate)

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

TODO: TZE bitte verifizieren!!

TODO: Ende neue Struktur - als davor bitte in das neue File integrieren - der Rest kann gelöscht werden 


### Haftung und Verantwortlichkeit

#### Kernfragestellung: Datenqualität und Haftungsverteilung

**Konkrete Problemstellung:** Wer haftet für die Aktualität und Richtigkeit der über APIs übertragenen Kundendaten?

#### Expertenstellungnahmen
TODO: ebenfalls Bank A und B sowie TPSP entfernen - lässt immer noch Rückschlüsse auf Projekteilnehmer zu 
- Keine Haftung vom Produzenten für Aktualität/Richtigkeit der Daten
- Integrator B bleibt verantwortlich für GwG-/DSG-Konformität
- Haftung für die Daten bis zum Consent des Kunden → sobald die Daten beim Empfänger sind, liegt die Verantwortung bei ihm
- **Ausservertragliche Haftung (Art. 41 OR):** Jede Partei kann haften → abhängig von Verschulden und Kausalität
- **Empfehlung:** Zivilrechtliche Haftung besser vertraglich regeln (z.B. über Teilnahmevereinbarung, SLA)

#### Zusätzliche Haftungsaspekte

Das bestehende Vertragswerk zwischen Digital Platform G, FinTech Provider C und Bank B ist als Basis für die Klärung der Haftungsfrage zu eruieren.

Parallel dazu sind ergänzende Sicherheitsmaßnahmen zu prüfen → beispielsweise Mechanismen zur Identifikation und Verhinderung von Fake-Accounts.

### Outsourcing und Delegation

#### Kernfragestellung: FINMA-Outsourcing-Relevanz

**Konkrete Fragestellung:** Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden?

#### Experteneinschätzung
TODO: löschen von **BEI Position:**/ **Bank A Position:**/ **Third-Party Service Provider F Position:**
**BEI Position:**
Mit Bankidentitätscase von Bank B zu Kunden im Namen und auf Rechnung klären.

**Bank A Position:**
- **Fall 1:** Bank B verlässt sich auf die von Bank A durchgeführte Identifikation. Bank B nutzt die Daten, übernimmt aber selbst die Verantwortung. → **Kein Outsourcing** (sondern reiner Datenempfang).
  - Bank B nutzt die Daten im "Reliance-Modell". Bank A wird nicht im Auftrag von Bank B tätig. Vertraglich zwischen den beiden Banken regeln, aber ohne Delegation der Funktion.

- **Fall 2:** Bank B beauftragt Bank A explizit mit der Identifikation von Kunden im Namen der Bank B. → **Outsourcing.** Bank A wird als Dienstleister tätig. Bank B delegiert eine bankrechtlich wesentliche Funktion.

- **Fall 3:** Bank B nutzt einen KYC-Dienstleister (z.B. Identity Service Provider E, Third-Party Service Provider F, Telecommunications Provider D), der Kunden im Namen der Bank identifiziert. → **Outsourcing** (gilt auch bei Drittanbietern).
  
  Wenn sich die Bank für ein Outsourcing entscheidet:
  - Vertrag über die Auslagerung abschließen (inkl. Weisungsrecht, Kontrollrechte etc.)
  - Risikobeurteilung und Outsourcing-Governance etablieren
  - Meldung an die FINMA (wenn die Funktion wesentlich ist)

**Third-Party Service Provider F Position:**
Falls Outsourcing relevant, kann dies generisch umgesetzt werden? Oder ist kein Outsourcing möglich? Somit nur Fall 1 möglich.

#### Lösungsansatz

**Empfehlung:** Erforderlich fallspezifische Betrachtungsweise

**TBD (To Be Determined):**
Heikel ist hier das in Art. 28 GwV-FINMA angelegte Verbot einer Weiterdelegation. Dies betrifft nur aber immerhin den engen Anwendungsbereich der GwG-Prävention bei Finanzintermediären. Ein Lösungsansatz könnte sein, über die oben beschriebene Datengovernanz die Gesamtheit der am Datenraum "Identifikation" teilnehmenden Finanzinstitute als "Finanzintermediär" i.S. Art. 28 GwV-FINMA zu interpretieren. Dann könnten die Identifikationen innerhalb der Gruppe der Teilnehmenden ausgetauscht werden. Wenn die vertraglichen Teilnahmebedingungen stringent genug formuliert sind, könnte dies ausreichen, um die FINMA zu überzeugen. Weiter zu prüfen ist die Vereinbarkeit mit Art. 19 VSB 20, welcher sich dem Wortlaut nach auf Einheiten eines Konzerns bezieht. Nach Sinn und Zweck müsste diese Bestimmung auch im besprochenen Fall greifen. Vielleicht gibt es Möglichkeiten im Rahmen der Revision der VSB dieses Thema aufzugreifen.

### Datenschutz und Bankgeheimnis

#### Kernfragestellung: Einwilligung und Disclosure

**Konkrete Fragestellung:** Welche Mindestanforderungen gelten für die Datenprüfung sowie für die herausgegebenen Datensätze?

#### Experteneinschätzung

**Bank A Position:**
Annahme: Die herausgegebenen Datensätze werden "as is" übergeben. Allfällige weitere Prüfungen erfolgen durch den Integrator.

Warum werden keine Effizienzgewinne erzielt? Die Identifikation wurde ja durchgeführt. Ergänzungen auf Grund Risikoapproach sind Zusatzaufwände des Integrators. Prüfen mit Yuh Case.

**Bank B Position:**
Herausgabe: Einverständnis des Kunden bezäglich Datenschutz und Bankkundengeheimnis nötig.

Datenprüfung: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA würde wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

**Third-Party Service Provider F Position:**
Zur Beantwortung dieser Frage benötigt es mehr Angaben zu den Datensätzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Geschäftsgeheimnisse zu beachten und gebührend zu berücksichtigen.

Für die Struktur der Datensätze könnten die folgenden allgemeinen Grundsätze definiert werden:

"Datenprodukte bündeln Ressourcen (z.B. Datensätze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsfälle zu realisieren. Datenprodukte werden von Datenanbietenden oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement ermöglicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte" (Bundeskanzlei, Bausteine von Datenräumen Datenäkosystem Schweiz, Ziffer 3.2.3)

Sie stellen sicher, dass die mehrfache Datennutzung vertrauenswärdig und sicher ist, und verhindern den Missbrauch von Daten. Vertragliche Vereinbarungen können auf verschiedenen Ebenen getroffen werden und unterscheiden sich darin, welche Akteure sie betreffen. Vereinbarungen auf Ebene Datenraum sind für alle Datenraumteilnehmenden gleichermassen durch ihre Teilnahme verbindlich.

### Validierung und Identifikation

#### Kernfragestellung: Datenvalidierung

**Konkrete Fragestellung:** Validierung, Identifikation und rechtliche Rahmenbedingungen: Es muss geprüft werden, wie bzw. ob eine überprüfung und finale Validierung der übergebenen Daten erfolgen soll.

#### Experteneinschätzung

**Problematik:**
Sobald manuelle Prüfschritte notwendig werden, verliert das gesamte API-Vorhaben deutlich an Attraktivität und Effizienz.

Dabei geht es nicht nur um die reine Identifikation, sondern auch um die Gesamtdatenlage.

TODO: vllt kann man statt digital Platform G eher etwas schreiben wie: 
Am Markt bestehende Beispiele zeigen jedoch, dass die Identifikation ohne weitere Prüfung übernommen wird. Risikobasiert wird bei entsprechenden Datenaustauschkonstellationen allenfalls zusätzlich eine Überprüfung vorgenommen – dies ist jedoch selten der Fall.
TODO: Abschnitt löschen 
#### Lösungsansatz

**Empfehlung:**
Die FINMA wird voraussichtlich keine detaillierte Vorgabe zur Haftungsverteilung machen.

Eine unabhängige rechtliche Einschätzung würde daher hilfreich, um diese Frage zu klären.
TODO: Stich löschen 
**Vorschlag:** Die Fragestellung an Vigi zur weiteren Prüfung weiterleiten.

### FINMA-Positionierung

#### Kernfragestellung: Regulatorisches Engagement

**Konkrete Fragestellung:** Ist eine Einbindung der FINMA wünschenswert und erforderlich, und wenn ja, ab wann sollte sie erfolgen?

#### Strategische überlegungen

**Zweigleisiger Lösungsansatz:**
Es wurde eine zweigleisige Vorgehensweise diskutiert:

1. **Orientierung an Digital Platform G:** Deren Lösungsansatz im Umgang mit der FINMA als Referenz
2. **Direkter FINMA-Austausch:** Prüfung, ob ein direkter Austausch mit der FINMA sinnvoll und möglich ist

TODO: Anpassung  Stichpunkt 1 - 
1. **Orientierung an bestehenden Marktinitiativen mit ähnlichen rechtlichen Rahmenbedingungen.**
---

TODO: Fragestellungen 
## Offene Fragestellungen

**Basierend auf der umfassenden Workshop-Analyse und Expertenstellungnahme wurden folgende 20+ kritische rechtliche Fragestellungen identifiziert, die qualifizierte juristische Klärung erfordern:**

### Grundsätzliche Regulatorische Fragen

**1. Prinzipielle Regelungen:**
- Wird das Prinzip einer "Identifikation auf Vorrat" grundsätzlich erlaubt? (Das bedeutet: ein neues Onboarding mit allenfalls nicht mehr gültigen Dokumenten wäre erlaubt - z.B. bei Ausweis gestohlen, Namensänderung bei Heirat etc.)

**2. Arten der Identifikation:**
- Welche Arten der Identifikation sollen weitergegeben werden können (z.B. nur Online/Video Ident?)
- Sind physische Identifikationsverfahren übertragbar oder nur digitale?

**3. Zeitliche Beschränkungen:**
- Definition der Dauer: Wie lange kann eine Identifikation wiederverwendet werden?
- Gibt es Verjährungsfristen für übertragene KYC-Daten?

**4. Ausweisdokumentation:**
- Details zu Ausweisen: Ist Gültigkeit für Wiederverwendung relevant?
- Zugelassene Ausweisarten: Welche Dokumente sind akzeptabel?
- Umgang mit Ausländern: Ist Ausländerausweis nötig?

**5. Scope-Definitionen:**
- Festlegung von "out of Scope" Kundengruppen (z.B. Workout/Recovery Positionen, Kunden mit MROS Meldungen, etc.)
- Soll Ausschluss vor Datenweitergabe erfolgen oder danach durch neue Bank?

### Delegation und Haftungsfragen

**6. Regelung der Delegation:**
- Beispiel: Bank A gibt ein Onboarding der Third-Party Service Provider F an eine Bank B weiter
- Wem kommt welche Rolle und Haftbarkeit zu in dieser Dreieckskonstellation?

**7. Haftung bei Online Ident:**
- Besonders im Zusammenhang mit Ersteinzahlungen: Wer haftet wofür?
- Da Identifikation aus Bestandteilen von Drittanbieter und Bank besteht

**8. Compliance und Aufsichtsfragen:**
- FINMA-Engagement Timeline: Zu welchem Zeitpunkt sollte FINMA über Open API Kundenbeziehung informiert werden?
- Meldepflichten: Bestehen Meldepflichten gegenüber FINMA bei Einführung von API-Services?

Die ursprünglich identifizierten Fragestellungen bleiben ebenfalls relevant:

### Outsourcing und Delegation

1. **Generische Outsourcing-Behandlung:** Kann eine einheitliche Outsourcing-Beurteilung für API-basierte Datennutzung entwickelt werden, oder ist jeder Fall individual zu beurteilen?

2. **Weiterdelegationsverbot (Art. 28 GwV-FINMA):** Wie kann das Weiterdelegationsverbot bei dezentralen API-Netzwerken praktisch umgesetzt werden?

3. **Konzernregelung (Art. 19 VSB 20):** Kann die Konzernregelung auf föderierte API-Netzwerke analog angewendet werden?

### Haftung und Verantwortlichkeit

4. **Datenqualitätshaftung:** Welche Mindeststandards gelten für die Datenqualität bei API-übertragungen, und wer trägt die Haftung bei fehlerhaften Daten?

5. **Fake-Account-Prävention:** Welche technischen und rechtlichen Maßnahmen sind erforderlich, um Missbrauch durch Fake-Accounts zu verhindern?

6. **Cross-Border-Haftung:** Wie ist die Haftungsverteilung bei grenzüberschreitenden API-Services zu regeln?

### Datenschutz und Consent Management

7. **Consent-Mindestanforderungen:** Welche spezifischen Anforderungen gelten für das Consent Management bei API-basierter Datenübertragung?

8. **Datenminimierung bei APIs:** Wie ist das Prinzip der Datenminimierung bei granularen API-Zugriffen praktisch umzusetzen?

9. **GDPR-Äquivalenz:** Welche zusätzlichen Maßnahmen sind für die Gewährleistung der GDPR-Äquivalenz erforderlich?

### FINMA-Engagement

10. **Timing für FINMA-Kontakt:** Zu welchem Zeitpunkt sollte die FINMA erstmals über die Open API Kundenbeziehung informiert werden?

11. **FINMA-Guidance-Bedarf:** Welche spezifischen Aspekte bedürfen einer FINMA-Stellungnahme oder -Guidance?

12. **Meldepflichten:** Bestehen Meldepflichten gegenüber der FINMA bei der Einführung von API-basierten Services?

---

## Vorschlag Compliance-Framework für API-Design

**Wichtiger Disclaimer:** *Die folgenden Vorschläge stellen keine Rechtsberatung dar und können die Konsultation qualifizierter Rechtsexperten nicht ersetzen.*

### Compliance-by-Design Prinzipien

#### 1. Consent-First Architecture
**Implementation:**
- Explizite Kundeneinwilligung vor jeder Datenübertragung
- Granulare Consent-Optionen auf Datenkategorie-Ebene
- Einfache Consent-Widerrufsmechanismen
- Audit Trail für alle Consent-Aktivitäten

**Rechtliche Grundlage:** Art. 47 BankG (Bankkundengeheimnis), DSG Art. 6

#### 2. Data Minimization Framework
**Implementation:**
- API-Responses enthalten nur für den Zweck erforderliche Daten
- Purpose-based Access Control auf API-Ebene
- Automatische Datenanonymisierung wo möglich
- Regelmäßige Datenbereinigung nach Zweckwegfall

**Rechtliche Grundlage:** DSG Art. 4 (Datenbearbeitungsgrundsätze)

#### 3. Liability-by-Design
**Implementation:**
- Klare vertragliche Haftungsverteilung zwischen API-Participants
- SLA-basierte Service Level Agreements
- Comprehensive Error Handling und Logging
- Insurance Coverage für API-spezifische Risiken

**Rechtliche Grundlage:** OR Art. 41 (Haftung aus unerlaubter Handlung)

#### 4. Audit-Ready Architecture
**Implementation:**
- Comprehensive Logging aller API-Transaktionen
- Immutable Audit Trails für Compliance-Nachweise
- Real-time Compliance Monitoring und Alerting
- Regular Compliance Assessments und Reporting

**Rechtliche Grundlage:** FINMA-RS 2008/7 (Outsourcing), GwG Art. 7

### Rechtliche Checkliste für API-Implementation

#### Pre-Launch Legal Review
- [ ] **Bankkundengeheimnis:** Consent-Mechanismen implementiert und getestet
- [ ] **GwG-Compliance:** Identifikationsprozesse rechtskonform ausgestaltet  
- [ ] **Datenschutz:** DSG/GDPR-konforme Datenverarbeitung sichergestellt
- [ ] **Outsourcing:** Outsourcing-Relevanz geprüft und entsprechende Verträge abgeschlossen
- [ ] **Haftung:** Liability-Framework vertraglich geregelt
- [ ] **Operational Risk:** Basel III/IV-konforme Risikomanagement-Prozesse implementiert

#### Ongoing Compliance Monitoring  
- [ ] **Consent Monitoring:** Regelmäßige Überprüfung der Consent-Validität
- [ ] **Data Quality:** Monitoring der Datenqualität und -aktualität
- [ ] **Security Compliance:** Kontinuierliche Sicherheitsüberwachung
- [ ] **Regulatory Updates:** Monitoring von Regulatory Changes
- [ ] **Incident Response:** Dokumentiertes Incident Response für Legal Issues

---

## Risikomanagement und Haftung

**Wichtiger Disclaimer:** *Die folgenden Risikobewertungen ersetzen keine professionelle Rechtsberatung und stellen lediglich allgemeine Orientierungshilfen dar.*

### Identifizierte Rechtsrisiken

#### High-Risk Areas

**1. Bankkundengeheimnis-Verletzung**
- **Risiko:** Unberechtigte Datenpreisgabe ohne ausreichenden Consent
- **Impact:** FINMA-Sanktionen, Reputationsschaden, Zivilrechtliche Haftung
- **Mitigation:** Robuste Consent-Management-Systeme, Legal Review vor Go-Live

**2. GwG-Non-Compliance**
- **Risiko:** Unzureichende Identifikationsprozesse bei API-basiertem Data Sharing
- **Impact:** Strafrechtliche Konsequenzen, Regulatory Enforcement
- **Mitigation:** Compliance-by-Design, Expert Legal Review, FINMA-Engagement

**3. Outsourcing-Misclassification**
- **Risiko:** Falsche rechtliche Einordnung von API-Services als Outsourcing
- **Impact:** FINMA-Meldepflichten, Additional Compliance Requirements
- **Mitigation:** Case-by-Case Legal Assessment, Proactive FINMA Consultation

#### Medium-Risk Areas

**4. Datenschutz-Verletzungen**
- **Risiko:** DSG/GDPR-non-konforme Datenverarbeitung
- **Impact:** Regulatory Fines, Customer Trust Loss
- **Mitigation:** Privacy-by-Design, Regular Compliance Audits

**5. Cross-Border Compliance**
- **Risiko:** Regulatory Conflicts bei internationalen API-Services
- **Impact:** Market Access Restrictions, Legal Disputes
- **Mitigation:** Jurisdiction-specific Legal Advice, Multi-jurisdiction Compliance Framework

### Haftungsverteilung Framework

#### Empfohlene Vertragsstrukturen

**1. API Provider (Data Producer) Responsibilities:**
- Datenqualität zum Zeitpunkt der Übertragung
- Consent-Validierung vor Datenpreisgabe  
- Security Standards Compliance
- Timely Notification bei Data Breaches

**2. API Consumer (Data Integrator) Responsibilities:**
- Purpose-based Data Usage Compliance
- Additional KYC/AML Checks falls erforderlich
- Customer Communication über Data Usage
- Data Protection während Processing und Storage

**3. Shared Responsibilities:**
- Incident Response Coordination
- Regulatory Compliance Monitoring
- Customer Complaint Handling
- Audit Trail Maintenance

#### Insurance und Risk Transfer

**Professional Liability Insurance:**
- API-spezifische Coverage für Technology Errors & Omissions
- Cyber Liability Coverage für Data Breaches
- Regulatory Defense Cost Coverage

**Contractual Risk Transfer:**
- Indemnification Clauses für Specific Risk Categories
- Limitation of Liability Provisions (wo rechtlich zulässig)
- Force Majeure Clauses für Regulatory Changes

---

## Fazit und Empfehlungen

### Rechtliche Handlungsempfehlungen

#### Kurzfristige Maßnahmen (0-6 Monate)

1. **Qualifizierte Rechtsberatung engagieren:** Spezialisierte Anwaltskanzlei mit FinTech/Banking-Expertise für detaillierte rechtliche Analyse

2. **FINMA-Strategie entwickeln:** Entscheidung über Timing und Approach für FINMA-Engagement basierend auf Digital Platform G-Präzedenzfall

3. **Legal Framework Design:** Entwicklung von Standardverträgen für API-Participants mit klarer Haftungsverteilung

4. **Compliance-by-Design Implementation:** Integration von rechtlichen Anforderungen in die technische Architektur

#### Mittelfristige Maßnahmen (6-18 Monate)

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

TODO: TZE bitte verifizieren!!

---

**Version:** 1.0  
**Datum:** August 2025  
**Status:** Final Draft für Legal Review  
**Wichtiger Hinweis:** *Dieses Dokument enthält keine Rechtsberatung. Für verbindliche rechtliche Einschätzungen ist qualifizierte juristische Beratung erforderlich.*

---

[Quellen und Referenzen](./Quellen%20und%20Referenzen.md)
