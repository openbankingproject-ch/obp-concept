# Fragenkatalog Open API Kundenbeziehung - Konsolidierte Dokumentation

**Quelle**: Fragenkatalog Open API Kundenbeziehung_konsolidiert.xlsx  
**Koordiniert von**: Business Engineering Institute St. Gallen  
**Beteiligte Institutionen**: HBL, PostFinance, Intrum, BEI

---

## Überblick

Dieser konsolidierte Fragenkatalog umfasst 19 zentrale Fragestellungen zur Open API Kundenbeziehung, die in verschiedene Kategorien unterteilt sind:

- **Rechtliche Fragestellungen** (8 Fragen)
- **Regulatorische Fragestellungen** (6 Fragen)  
- **Technische Fragestellungen** (2 Fragen)
- **Sonstige Fragestellungen** (3 Fragen)

**Prioritätsverteilung**:
- Hoch: 8 Fragestellungen
- Mittel: 4 Fragestellungen
- Niedrig: 4 Fragestellungen

**Status-Übersicht**:
- Nicht gestartet: 13 Fragestellungen
- In Bearbeitung: 3 Fragestellungen
- Abgeschlossen: 3 Fragestellungen

---

## Rechtliche Fragestellungen

### 1. Dataset - Mindestanforderungen für Datenprüfung

**Fragestellung**: Welche Mindestanforderungen gelten für die Datenprüfung sowie für die herausgegebenen Datensätze?

**Priorität**: Hoch  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Steffi, Gianin

**Lösungsansatz BEI**:
Annahme: Die herausgegebenen Datensätze werden as is übergeben. Allfällige weitere Prüfungen erfolgen durch den Integrator. Warum werden keine Effizienzgewinne erzielt? Die Identifikation wurde ja durchgeführt. Ergänzungen aufgrund Risikoapproach sind Zusatzaufwände des Integrators.

**HBL Stellungnahme**:
Herausgabe: Einverständnis des Kunden bezüglich Datenschutz und Bankkundengeheimnis nötig. Datenprüfung: Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

**Intrum Stellungnahme**:
Zur Beantwortung dieser Frage benötige ich mehr Angaben zu den Datensätzen und ihrer Anwendung. Sicher sind Themen wie Datenschutz und Berufsgeheimnisse, allenfalls auch Geschäftsgeheimnisse zu beachten und gebührend zu berücksichtigen. Für die Struktur der Datensätze könnten die folgenden allgemeinen Grundsätze definiert werden: "Datenprodukte bündeln Ressourcen (z.B. Datensätze, Datensammlungen oder Datendienste) und bringen diese in eine nutzbare Form. Sie beinhalten neben der Datenressource selbst weitere relevante Informationen wie Nutzungsrichtlinien, Vertragsbedingungen, Preise, etc. Sie sind einfach zu nutzende Einheiten, die einzeln oder mit anderen Datenprodukten verwendet und kombiniert werden, um Anwendungsfälle zu realisieren. Datenprodukte werden von Datenanbietenden oder Datenvermittelnden bereitgestellt. Ein gutes Datenproduktmanagement ermöglicht die Wiederverwendung von einzelnen Datenprodukten und kreiert Netzwerkeffekte" (Bundeskanzlei, Bausteine von Datenräumen – Datenökosystem Schweiz, Ziffer 3.2.3)

**Referenzen**: https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/datenoekosystem_schweiz/grundlagen-fuer-datenraeume.html

---

### 2. Föderatives System - Gestaltung und Operationalisierung

**Fragestellung**: Wie soll das föderierte System gestaltet und operationalisiert werden?

**Priorität**: Niedrig  
**Status**: Nicht gestartet  
**Deadline**: 11. Juni 2025  
**Verantwortlichkeit**: Martin, Gianin

**Lösungsansatz BEI**:
Föderiertes System OPEN API Kundenbeziehung zu definieren

**Intrum Stellungnahme**:
Hierzu gibt es Ansätze in Unterlagen der Bundesverwaltung zur Gestaltung und Verwaltung von Datenräumen (Datenökonomie). Diese Ansätze fokussieren zwar auf die öffentliche Verwaltung, können aber sicher zur Inspiration herangezogen werden. Dieser Baustein umfasst die Festlegung der Organisationsform, die Schaffung eines Rahmens für die Verwaltung des Datenraums (Datenraumgouvernanz) und die Einrichtung eines verwaltenden Gremiums (Datenraumträgerschaft). Die Organisationsform bezieht sich beispielsweise auf die Rechtsform, welche der Datenraum annimmt. Die Datenraumgouvernanz beinhaltet die für den Datenraum gültigen Regeln und Richtlinien. Die Datenraumgouvernanz von Datenräumen im Datenökosystem Schweiz baut auf dem Verhaltenskodex für den Betrieb von vertrauenswürdigen Datenräumen auf. Der Verhaltenskodex definiert vier Grundprinzipien für die vertrauenswürdige Ausgestaltung von Datenräumen: Transparenz, Kontrolle, Fairness und Effektivität. Diese Grundprinzipien konkretisiert der Verhaltenskodex in Form von Empfehlungen. Welche Empfehlungen für welche Akteure eines bestimmten Datenraums sinnvoll sind, ist im Rahmen des geltenden Rechts und anhand der Gegebenheiten des Datenraums und der legitimen Interessen aller Beteiligten zu prüfen und im Rahmen der Datenraumgouvernanz festzuhalten. Die Datenraumträgerschaft ist verantwortlich für die Entwicklung und den effektiven Betrieb des Datenraums sowie für die Durchsetzung der Datenraumgouvernanz. (Bundeskanzlei, Bausteine von Datenräumen – Datenökosystem Schweiz, Ziffer 3.5.2)

---

### 3. Governance - Rechtliche Absicherung des Vertrauensnetzwerks

**Fragestellung**: Wie wird das bestehende 'kleine Vertrauensnetzwerk' rechtlich zwischen den Kernakteuren abgesichert?

**Priorität**: Hoch  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Vertrag zwischen den Parteien? Ab Golive?

**HBL Stellungnahme**:
- **Datenschutzgesetz**: Kundenidentifizierende Daten gelten als Personendaten. Der Austausch zulässig wenn eine gesetzliche Grundlage (hier nicht gegeben), überwiegendes privates Interesse (hier nicht gegeben) bzw. Einwilligung gegeben ist (sprich Kunden müssen zur Datenübergabe entweder durch den Basisvertrag oder einmalig für den entsprechenden Transfer ihre Einwilligung geben - entweder schriftlich oder elektronisch nachvollziehbar, z. B. per Checkbox). Transparenz geben - z. B. über Art der Daten, Zweck, Empfängerbank und Dauer der Speicherung.

- **Bankkundengeheimnis**: Bankkundendaten unterliegen dem Bankgeheimnis, was eine Weitergabe nur mit ausdrücklicher Einwilligung des Kunden erlaubt

- **Rundschreiben 2016/7 Video- und Online-Identifizierung**: Unter Berücksichtigung von Art 28 und 29 GwV-FINMA dürfen Finanzintermediäre andere Unternehmungen mit der Durchführung der Identifizierung der Vertragsparteien (Video- bzw. Online-Identifizierung) beauftragen -- sprich ist das was Intrum für die Banken macht. Eigentlich könnte in dem Fall der Vertrag, welche die Banken mit Intrum haben die Grundlage für einen Vertrag unter den Banken bilden. Vertraglich sollten die Anforderungen an Dokumentation, Nachvollziehbarkeit und Verantwortung zu regeln.

**Erforderliche Regelungen im Vertrag (z. B. Kooperationsvertrag) zwischen den Banken**:
- Zweck des Datenaustausches (z. B. Verhindern redundanter Identifikationsprozesse)
- Rechtsgrundlage (Einwilligung des Kunden)
- Verantwortlichkeit der Datenbearbeitung (z. B. wer ist verantwortlich im Sinne des DSG?)
- Sicherstellen der Datensicherheit und Einhaltung des DSG
- Technische und Organisatorische Massnahmen (TOMs) zur sicheren Übermittlung
- Löschkonzepte und Datenaufbewahrung
- Haftungsklauseln
- klare Vereinbarung, dass die empfangende Bank die von der anderen Bank durchgeführte Identifikation anerkennt - und dass diese Anforderungen der FINMA und GwG genügen
- vielleicht regeln, dass Identifikationsdaten nicht älter als xyz sein dürfen

**Intrum Stellungnahme**:
Hierzu gibt es Ansätze in Unterlagen der Bundesverwaltung zur Gestaltung und Verwaltung von Datenräumen (Datenökonomie). Diese Ansätze fokussieren zwar auf die öffentliche Verwaltung, können aber sicher zur Inspiration herangezogen werden.

---

### 4. Haftung - Delegation von Onboarding-Prozessen

**Fragestellung**: Regelung der Delegation (Beispiel: HBL gibt ein Onboarding der Intrum an eine Drittbank weiter. Wem kommt welche Rolle und Haftbarkeit zuteil?)

**Priorität**: Hoch  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Bitte beachten: Siehe Bankidentcase. Die empfangende Bank haftet und muss bei unvollständigen Daten ergänzen (individueller Risikoapproach)

**HBL Stellungnahme**:

**Annahme Grundsatz**:
- die Herausgebende Partei wird keine oder begrenzte Haftung bzgl. Aktualität und Richtigkeit der Daten eingehen
- die Bank, welche die Informationen erhält bleibt vollumfänglich verantwortlich für die Einhaltung ihrer Sorgfaltspflichten nach GwG und die Richtigkeit und Zulässigkeit der Datenverarbeitung gemäss DSG

**Vertragliche Absicherung zwischen den Banken** (Bank A überträgt kundenidentifizierende Daten der Bank B):

**Haftungsklausel**:
- Wer haftet bei fehlerhaften oder unvollständigen Daten?
- Wer trägt die Verantwortung bei Missbrauch, Betrug oder Compliance-Verstösse?
- Gibt es Rückgriffsmöglichkeiten?
- z. B. Bank A kann versuchen, die Haftung auf grobe Fahrlässigkeit oder Vorsatz zu beschränken; Bank B akzeptiert, dass sie die endgültige Prüfungspflicht trägt

**Sorgfaltspflichten**:
- Bank A muss zusichern, dass die Identifikation vollständig, aktuell und konform erstellt ist
- Dokumente müssen revisionssicher gespeichert und der Bank B vollständig zur Verfügung gestellt werden

**PostFinance Stellungnahme**:
Wir müssten besser verstehen, was die Rolle von INTRUM ist, so könnten wir dann auch den Punkt zur «Haftbarkeit» ableiten und definieren. Wir müssen hier verstehen, was INTRUM mit den Daten der Bank genau macht, somit kommt es dann wiederum auf den Vertrag – in diesem Fall - zwischen INTRUM und der HBL drauf an. Falls ein Datenempfänger von PF direkt die UBS ist, dann könnte es auch sein, dass die Haftungsfrage auf den Empfänger (UBS) spezifisch beurteilt werden muss. Heute gilt bei Bankident ganz «generell»: Wir haften für die Daten bis zum Consent des Kunden – sobald die Daten beim Empfänger sind, liegt die Verantwortung bei ihm.

**Intrum Stellungnahme**:
Ausservertraglich (Art. 41 OR) könnte jede beteiligte Partei haften, je nach ihrem Verschulden und kausalen Beitrag zum verursachten Schaden. Die zivilrechtliche Haftung ist am besten vertraglich zu regeln (Teilnahmevereinbarung zwischen den beteiligten Parteien, SLA, etc.).

"Der vertragliche Rahmen sorgt dafür, dass sämtliche Vereinbarungen, die im Datenraum getroffen werden, die beteiligten Akteure rechtlich binden. Sie stellen sicher, dass die mehrfache Datennutzung vertrauenswürdig und sicher ist, und verhindern den Missbrauch von Daten. Vertragliche Vereinbarungen können auf verschiedenen Ebenen getroffen werden und unterscheiden sich darin, welche Akteure sie betreffen. Vereinbarungen auf Ebene Datenraum sind für alle Datenraumteilnehmenden gleichermassen durch ihre Teilnahme verbindlich. Vereinbarungen auf Ebene Anwendungsfall oder Datentransaktionsvereinbarungen betreffen diejenigen Akteure, die an einem spezifischen Anwendungsfall oder an der Mehrfachnutzung eines spezifischen Datenprodukts beteiligt sind."

**Typische vertragliche Vereinbarungen in Datenräumen**:
- **Auf Ebene Datenraum**: Allgemeine Teilnahmebedingungen, Service Level Agreements (SLA)
- **Auf Ebene Anwendungsfall**: Teilnahmevereinbarung für spezifische Anwendungsfälle
- **Auf Ebene Datentransaktion**: Datentransaktionsvereinbarung, Datennutzungsvertrag

(Bundeskanzlei, Bausteine von Datenräumen – Datenökosystem Schweiz, Ziffer 3.2.8)

---

### 5. Haftung - Online Identifikation bei Ersteinzahlungen

**Fragestellung**: Haftung bei Online Ident. im Zusammenhang mit Ersteinzahlungen: Wer haftet wofür (da Identifikation aus Bestandteilen von Drittanbieter und Bank besteht)

**Priorität**: Niedrig  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Annahme Haftung erfolgt durch Integrator, da Produzent nicht für aktuelle Daten haftbar gemacht werden kann.

**HBL Stellungnahme**:
Siehe Zeile 5

**Intrum Stellungnahme**:
Ausservertraglich (Art. 41 OR) könnte jede beteiligte Partei haften, je nach ihrem Verschulden und kausalen Beitrag zum verursachten Schaden. Die zivilrechtliche Haftung ist am besten vertraglich zu regeln (Teilnahmevereinbarung zwischen den beteiligten Parteien, SLA, etc.).

---

### 6. Identifikation & Outsourcing - FINMA Anforderungen

**Fragestellung**: Wie müssen wiederverwendete Identifikationen im Zusammenhang mit der Beurteilung von Outsourcing behandelt werden? (FINMA)

**Priorität**: Hoch  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Mit Bankidentcase von PostFinance zu klären. Falls Outsourcing relevant, kann dies generisch umgesetzt werden? Oder ist kein Outsourcing möglich? Somit nur Fall 1 möglich.

**HBL Stellungnahme**:

**Fall 1**: Bank B verlässt sich auf die von Bank A durchgeführte Identifikation. Bank B nutzt die Daten, übernimmt aber selbst die Verantwortung. → **Kein Outsourcing** (sondern reiner Datenempfang). Bank B nutzt die Daten „im Reliance-Modell". Bank A wird nicht im Auftrag von Bank B tätig. Vertraglich zwischen den beiden Banken regeln, aber ohne Delegation der Funktion.

**Fall 2**: Bank B beauftragt Bank A explizit mit der Identifikation von Kunden im Namen und auf Rechnung der Bank B. → **Outsourcing**. Bank A wird als Dienstleister tätig, Bank B delegiert eine bankrechtlich wesentliche Funktion.

**Fall 3**: Bank B nutzt einen KYC-Dienstleister (z. B. IDnow, Intrum, Swisscom), der Kunden im Namen der Bank identifiziert. → **Outsourcing**. (gilt auch bei Drittanbietern)

**Wenn sich die Bank für ein Outsourcing entscheidet**:
- Vertrag über die Auslagerung abschliessen (inkl. Weisungsrecht, Kontrollrechte etc.)
- Risikobeurteilung und Outsourcing-Governance etablieren
- Meldung an die FINMA (wenn die Funktion wesentlich ist)
- DSG-konforme Vereinbarung zur Auftragsbearbeitung abschliessen
- Sicherstellen, dass der Dienstleister technisch und organisatorisch geeignet ist

**Intrum Stellungnahme**:
TBD. Heikel ist hier das in Art. 28 GwV-FINMA angelegte Verbot einer Weiterdelegation. Dies betrifft nur aber immerhin den engen Anwendungsbereich der GwG-Prävention bei Finanzintermediären.

Ein Lösungsansatz könnte sein, über die oben beschriebene Datengouvernanz die Gesamtheit der am Datenraum "Identifikation" teilnehmenden Finanzinstitute als "Finanzintermediär" i.S.v. Art. 28 GwV-FINMA zu interpretieren. Dann könnten die Identifikationen innerhalb der Gruppe der Teilnehmenden ausgetauscht werden. Wenn die vertraglichen Teilnahmebedingungen stringent genug formuliert sind, könnte dies ausreichen, um die FINMA zu überzeugen. Weiter zu prüfen ist die Vereinbarkeit mit Art. 19 VSB 20, welcher sich dem Wortlaut nach auf Einheiten eines Konzerns bezieht. Nach Sinn und Zweck müsste diese Bestimmung auch im besprochenen Fall greifen. Vielleicht gibt es Möglichkeiten im Rahmen der Revision der VSB dieses Thema aufzugreifen.

---

## Regulatorische Fragestellungen

### 7. Berechtigte Kundengruppen - Out of Scope Definition

**Fragestellung**: Festlegung von «out of Scope» Kundengruppen (z.B. Workout/Recovery Positionen, Kunden mit MROS Meldungen, etc.) vor Datenweitergabe, oder danach durch neue Bank?

**Priorität**: Mittel  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Anmerkung: Kundenselektion sollte nicht beim Produzent liegen. Der Produzent filtert nicht und darf auch nicht darüber informieren, welcher Status oder Zustand der Kunde hat. Der Integrator muss die Prüfung durchführen aufgrund seiner Kriterien (individueller Risikoapproach)

**HBL Stellungnahme**:
Grundsätzlich out of Scope Definition beim Integrator. Ausser im Zusammenhang mit allfälligen Mindestanforderungen zur Wiederverwendung der Identifikation (z.B. Identifikation nur wiederverwendbar, wenn Ausweis noch nicht abgelaufen ist würde bedeuten, dass dies ein Kriterium sein sollte, damit das Datenset überhaupt zur Verfügung steht).

Gewisse Kunden sollten gar nicht übernommen werden (ist das rechtlich erlaubt?) - z. B.:
- sanktionierte Kunden
- MROS 
- generell Kunden, welche die Bank als unerwünscht eingestuft haben (darf das die Bank überhaupt einer Drittbank mitteilen?)

**Intrum Stellungnahme**:
TBD

---

### 8. Governance - Weiterentwicklung regulatorischer Anforderungen

**Fragestellung**: Wie wird die laufende Weiterentwicklung regulatorischer Anforderungen im föderierten System sichergestellt?

**Priorität**: Niedrig  
**Status**: Nicht gestartet  
**Deadline**: 11. Juni 2025  
**Verantwortlichkeit**: Martin, Steffi

**Lösungsansatz BEI**:
Nach Klärung Governance kleines Vertrauensnetzwerk

**Intrum Stellungnahme**:
Siehe oben zur Governance im Allgemeinen. Es ist zu bedenken, die hier diskutierten Konzepte in anstehenden Revisionsprojekten (Gesetzgebung, Selbstregulierung) einzubringen. Da das Thema Datenökonomie und Datenräume auf Stufe Bund seit einiger Zeit intensiv behandelt wird, sollte die Finanzdienstleistungsbranche eine Chance haben, hier entsprechende Weiterentwicklungen einzubringen.

---

### 9. Identifikation - "Identifikation auf Vorrat"

**Fragestellung**: Wird das Prinzip einer "Identifikation auf Vorrat" grundsätzlich erlaubt? (das bedeutet, ein neues Onboarding mit allenfalls nicht mehr gültigen Dokumenten wäre erlaubt - z.B. bei Ausweis gestohlen, Namensänderung bei Heirat etc.) Definition Dauer, wie lange eine Identifikation wiederverwendet werden kann?

**Priorität**: Hoch  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Mit Bankidentcase von PostFinance zu klären. Keine Interaktion mit dem Produzent da Interaktion mit Integrator, die Aktualisierung muss beim Integrator erfolgen. Somit ist auch Customizing Risikoapproach möglich.

**HBL Stellungnahme**:
Aktuell rechtlich wohl nicht konkret definiert. Eine Stellungnahme seitens FINMA wäre wünschenswert, da der Integrator ansonsten das Risiko trägt oder bei nötiger Prüfung der Datensätze keine Effizienzgewinne mehr erzielt.

**Annahmen**:
- **Änderung von Adresse, Namen etc.**: Änderungen müssen nachvollzogen und dokumentiert werden. Details wie das ablaufen würde, sind noch festzulegen - z. B.:
  - Der Kunde meldet beim neuen Onboarding, dass die Daten nicht mehr aktuell sind und muss auf dieser Basis neue Belege einreichen
  - Oder bereits vorgelagert bei der bisherigen Bank, das stelle ich mir eher schwierig vor (Ich bezweifle, dass diese Information dort standardisiert zur Verfügung steht und dass in gewissen Fällen individuelle Belege über den autom. Austausch mitgeliefert werden könnten).

- **Abgelaufene Dokumente**: nicht zulässig - es muss ein gültiges Identifikationsdokument vorliegen

**Möglicher Risikoapproach für Alter der Wiederverwendbarkeit**:
1. **bis 1 Jahr**: unproblematisch, wenn keine Hinweise auf Änderungen
2. **2-5 Jahre**: nur zulässig wenn Bestätigung der Aktualität erfolgt
3. **5+ Jahre**: Re-Identifikation empfohlen

**Intrum Stellungnahme**:
TBD. Sinnvollerweise müsste die Dauer der Gültigkeit einer Identifikation von der Gültigkeit der Ausweise abhängig gemacht werden. Im Übrigen gilt das in Zeile 13 Gesagte.

---

### 10. Identifikation - Arten der Identifikation

**Fragestellung**: Welche Arten der Identifikation sollen weitergegeben werden können (z.B. nur Online / Video Ident.)?

**Priorität**: Mittel  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Möglichst alle, Standards zu definieren

**HBL Stellungnahme**:
Beide Arten da die Arten grundsätzlich gleichwertig sind. Die Frage von Steffi bezog sich eher auf die Identifikation am Schalter/KuBe. Soll es Einschränkungen geben, dass z.B. nur Video und Online zugelassen sind, oder alle Identifikationen zugelassen werden? Sollen z.B. MRZ beim Datenaustausch mitgeliefert werden, so wäre dies wohl bei persönlicher Vorsprache in der Bank nicht möglich.

---

### 11. Identifikation & Ausweisdokument - Ausländerausweis

**Fragestellung**: Umgang mit Ausländern / Ausländerausweis nötig?

**Priorität**: Mittel  
**Status**: Nicht gestartet  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Dario, Martin, Adrian

**Lösungsansatz BEI**:
Pass/ID zur Identifikation sollen als Basis dienen.

**HBL Stellungnahme**:
Aktuell verlangen wir den Ausländerausweis. Diesen nicht zu verlangen würde somit entgegen unserer aktuellen Handhabung laufen und müsste erst bankseitig akzeptiert werden.

---

## Technische Fragestellungen

### 12. Consent-Flow - Konkrete Ausgestaltung

**Fragestellung**: Wie ist der Consent-Flow konkret ausgestaltet und wie funktioniert er?

**Priorität**: Hoch  
**Status**: In Bearbeitung  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Richard, Steffi

**HBL Stellungnahme**:
1. Bank A identifiziert Kunde
2. Kunde interessiert sich für Offering einer neuen Bank. Am Point of Sale kann Identifikation über bestehende Bankidentifikation gewählt werden.
3. Kunde wählt seine Hausbank aus
4. Kunde wird zur Hausbank weitergeleitet und authentifiziert sich dort
5. Hausbank zeigt dem Kunden an, welche Daten weitergegeben werden sollen
6. Kunde bestätigt die Weitergabe
7. Daten werden an die neue Bank übermittelt
8. Kunde wird zur neuen Bank zurückgeleitet und kann dort das Onboarding abschliessen

---

### 13. Dataset - Umfang und Detailgrad des Basisdatenkits

**Fragestellung**: Welchen Umfang und Detailgrad soll das Basisdatenkit aufweisen?

**Priorität**: Hoch  
**Status**: In Bearbeitung  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Richard

**HBL Stellungnahme**:

**Mögliche Datenpunkte**:
- Name
- Vorname
- weitere Vornamen
- Geburtsdatum
- Gender
- Zivilstand
- Lichtbild (Relevante Seite(n))
- Ausweisnummer
- Art des Dokuments [Pass, ID, Personalausweis]
- Ausstellendes Land
- Ausstellungsdatum
- Ablaufdatum
- Nationality
- Adresse (gemäss Ausweis)
- aktuelle Adresse (Korrespondenzadresse)
- Telefon
- E-Mail
- Beruf
- Arbeitgeber
- ggf. weitere Angaben für US-Personen (Steuerliche Ansässigkeit, etc.)
- MRZ (Machine Readable Zone)
- Identifikationsmethode [Video, Online, Schalter]
- Identifikationsdatum
- PDF Scan der Ausweisseiten

**Zusätzliche Überlegungen**:
- Welche Daten sind Pflicht, welche optional?
- Strukturierung nach Kategorien (Basisdaten, erweiterte Daten, Metadaten)
- Standardisierung der Datenformate
- Versionierung des Datenschemas

---

## Sonstige Fragestellungen

### 14. KYC - Standardisierung von Prozessen

**Fragestellung**: Wie kann eine Standardisierung von Prozessen – etwa im KYC-Bereich – erfolgen?

**Priorität**: Mittel  
**Status**: Abgeschlossen  
**Deadline**: NA  
**Verantwortlichkeit**: NA

**Lösungsansatz BEI**:
Mittels API-Struktur und Design Auswahl

---

### 15. Branding - Namensgebung

**Fragestellung**: Ist die Bezeichnung 'Open API Kundenbeziehung' passend oder bedarf es eines klareren, griffigeren Namens?

**Priorität**: Niedrig  
**Status**: Abgeschlossen  
**Deadline**: NA  
**Verantwortlichkeit**: NA

**Lösungsansatz BEI**:
Aktueller Name bleibt vorerst bestehen.

---

### 16. Business Case - Use Case Definition

**Fragestellung**: Welcher konkrete Anwendungsfall (Use Case) soll konzeptionell umgesetzt werden?

**Priorität**: Hoch  
**Status**: Abgeschlossen  
**Deadline**: WS 02  
**Verantwortlichkeit**: NA

**Lösungsansatz BEI**:
Zukünftig wird ein spezieller Fokus auf die Konzeptionalisierung des Use Case 1 gelegt. Innerhalb dieses Cases wird anvisiert mit dem Baustein „Identifikation" als Teil des Use Cases zu starten. (MVP) Vorteil: Die Wiederverwendbarkeit dieses Bausteins in weiteren Szenarien macht ihn besonders attraktiv für eine modulare Umsetzung. Insgesamt lässt sich Baustein «Verifikation» potenziell gut im anvisierten zeitlichen Rahmen realisieren.

---

### 17. Business Case - Monetarisierungsstrategie

**Fragestellung**: Wie kann eine Monetarisierungsstrategie für die Open API Kundenbeziehung effektiv umgesetzt werden?

**Priorität**: Niedrig  
**Status**: Nicht gestartet  
**Deadline**: Phase II  
**Verantwortlichkeit**: TBD

**HBL Stellungnahme**:
Bank, welche die Identifikationsdaten zur Verfügung stellt erhält einen Kickback von der Empfängerbank. Der Kickback sollte aber einiges günstiger sein (z. B. 50%) wie eine neue Dokumentation sein (u. a. deshalb weil die Empfängerbank mehr Risiken eingeht).

---

### 18. Business Case - MVP und Ausbauschritte

**Fragestellung**: Was soll in einem ersten Schritt umgesetzt werden (z. B. Pilot oder MVP) und wie sehen mögliche Ausbauschritte aus?

**Priorität**: Hoch  
**Status**: In Bearbeitung  
**Deadline**: 6. Mai 2025  
**Verantwortlichkeit**: Thomas B. und Dario

**Lösungsansatz BEI**:
**Strategische Herangehensweise: Vom Kleinen ins Grosse**
Gestartet wird mit einem klar abgegrenzten, realistisch umsetzbaren Baustein – z. B. der Verifikation von Identifikationsdaten. Schrittweise kann das System dann um weitere Funktionen erweitert werden.

**HBL Stellungnahme**:
Vorgehen wie am letzten Workshop besprochen weiterverfolgen:
- grundsätzlich war die Vision etwas zu bauen um die ganzen Onboardinginformationen (Stammdaten; Identifikationsdaten; KYC-Informationen etc.) zwischen den Banken austauschen zu können
- als ersten Schritt wurde aber definiert, dass nur der Teil «Identifikationsdaten» umgesetzt werden soll
- die Identifikationsdaten sollen aber vollumfänglich übertragen werden (nicht nur ein «Ja, der Kunde wurde identifiziert», sondern die ganzen Identifikationsdaten inkl. Belege)

---

### 19. E-ID - Zusammenwirken mit Open API Kundenbeziehung

**Fragestellung**: Wie gestaltet sich das Zusammenwirken von der Open API Kundenbeziehung und der E-ID?

**Priorität**: Niedrig  
**Status**: Nicht gestartet  
**Deadline**: 11. Juni 2025  
**Verantwortlichkeit**: BEI und Intrum

---

## Zusammenfassung und nächste Schritte

### Kritische Pfad-Fragestellungen (Hohe Priorität - Deadline 6. Mai 2025)

1. **Dataset - Mindestanforderungen für Datenprüfung**
2. **Governance - Rechtliche Absicherung des Vertrauensnetzwerks**
3. **Haftung - Delegation von Onboarding-Prozessen**
4. **Identifikation & Outsourcing - FINMA Anforderungen**
5. **Identifikation - "Identifikation auf Vorrat"**
6. **Consent-Flow - Konkrete Ausgestaltung**
7. **Dataset - Umfang und Detailgrad des Basisdatenkits**
8. **Business Case - MVP und Ausbauschritte**

### Empfohlenes Vorgehen

1. **Phase 1 (bis Mai 2025)**: Klärung aller kritischen rechtlichen und regulatorischen Fragestellungen
2. **Phase 2 (bis Juni 2025)**: Technische Detailspezifikation und Governance-Framework
3. **Phase 3 (ab Juni 2025)**: Implementation und Testing des MVP

### Stakeholder-Koordination

**Hauptverantwortliche Personen**:
- Dario, Martin, Adrian: Rechtliche und regulatorische Klärungen
- Richard, Steffi: Technische Implementation
- Thomas B.: Business Case und MVP-Definition

**Institutionelle Expertise**:
- **HBL**: Praktische Banking-Erfahrung und regulatorische Compliance
- **PostFinance**: Skalierung und operative Umsetzung
- **Intrum**: Rechtliche Expertise und Datenraum-Governance
- **BEI**: Projektkoordination und strategische Ausrichtung

---

**Dokumentstand**: Vollständige Erfassung aller 19 Fragestellungen aus der Quelldatei  
**Letzte Aktualisierung**: Basierend auf Excel-Version vom Fragenkatalog Open API Kundenbeziehung_konsolidiert.xlsx