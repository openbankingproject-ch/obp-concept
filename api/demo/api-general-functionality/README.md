# Open API Kundenbeziehung - Context Demo

## Überblick

Diese interaktive HTML-Demo visualisiert die Kernfunktionalität der **Open API Kundenbeziehung Alpha Version 1.0** für Finanzindustrie-Profis.

## Demo-Struktur

### Hauptfunktionen

1. **10-Stufen Referenzprozess** - Interaktive Navigation durch den vollständigen Customer Onboarding Prozess
2. **Generischer Consent Flow** - 4-Phasen Einverständnismanagement mit progressiver Visualisierung  
3. **Data Onboarding Process** - Kategorisierte Datenfelder die schrittweise erscheinen
4. **API Console Output** - Simulierte API-Aufrufe und Systemantworten

### Ausführung

```bash
# In der Demo-Root starten
cd api/demo/api-general-functionality
# Demo starten (im Browser öffnen über lokalen Server)
python3 -m http.server 8000
# Dann http://localhost:8000/context-demo.html aufrufen
```

### Interaktion

- **Click Navigation**: Durch die 10 Referenzprozess-Schritte klicken
- **Hover Details**: Zusätzliche Informationen bei Mouseover
- **Keyboard Support**: Tab-Navigation und Enter/Space für Aktivierung
- **Auto-Demo**: `startAutoDemo()` in Browser-Konsole für automatischen Durchlauf

### Technische Details

- **Framework**: Pure HTML5/CSS3/Vanilla JavaScript (keine Dependencies)
- **Responsive**: Desktop/Tablet/Mobile optimiert
- **Accessibility**: WCAG-konform mit Keyboard-Navigation und Screen Reader Support
- **Browser Support**: Alle modernen Browser

### Design-Spezifikationen

- **Farbschema**: Open Banking Project Corporate Colors
- **Grafiken**: Offizielle OBP Piktogramme und Hintergründe  
- **Sprache**: Professionelles Deutsch (Schweizer Kontext)
- **Layout**: 85%/15% Spalten-Layout mit Full-Width Header und Console

## Zielgruppe

Finanzindustrie-Profis mit theoretischem Hintergrund aber ohne tiefe API/Entwicklungs-Kenntnisse.

---

*Erstellt für das Open Banking Project Team - Business Engineering Institute, Universität St. Gallen*