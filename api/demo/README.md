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

**🚀 Empfohlene Methode (mit optimiertem Server):**
```bash
cd api/demo/api-general-functionality
python3 serve_demo.py
# Öffnen Sie dann http://localhost:8000 im Browser
```

**📋 Alternative Methoden:**
```bash
# Standard Python HTTP Server (Backup)
cd api/demo/api-general-functionality
python3 -m http.server 8000

# Einfacher Server (falls der optimierte Server Probleme macht)
python3 simple_server.py

# Mit anderem Port
python3 serve_demo.py 8080

# Direkte Datei (nicht empfohlen - Bilder können fehlen)
# Öffnen Sie index.html direkt im Browser
```

**🔧 Server-Probleme beheben:**

**Port bereits belegt:**
```bash
# Server findet automatisch nächsten freien Port
python3 serve_demo.py

# Oder manuell anderen Port wählen
python3 serve_demo.py 8080

# Oder bestehenden Server stoppen
lsof -ti:8000 | xargs kill
```

**Server startet nicht:**
```bash
# Versuch 1: Einfacher Server
python3 simple_server.py

# Versuch 2: Standard Python Server
python3 -m http.server 8001

# Versuch 3: Andere Verzeichnisse prüfen
cd .. && python3 -m http.server 8002
# Dann http://localhost:8002/api-general-functionality/
```

**🎨 Bilder werden nicht angezeigt:**
1. ✅ **Ersten Schritt:** Image Test ausführen: http://localhost:8000/image-test.html
2. ✅ **Server prüfen:** Optimierten Server verwenden: `python3 serve_demo.py`
3. ✅ **Browser-Konsole:** F12 öffnen und Fehler prüfen
4. ✅ **Pfade verifizieren:** Sicherstellen, dass PNG-Dateien in `../graphics/pictograms/` existieren
5. ✅ **Fallback testen:** `python3 simple_server.py` verwenden

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

### 🔍 Diagnosehilfen

**Server-Test:**
```bash
# Teste ob Server läuft
curl http://localhost:8000/

# Teste Bildpfade
curl -I http://localhost:8000/graphics/pictograms/Initialisierung.png
```

**Verfügbare Test-Seiten:**
- 🎨 **Bild-Test**: http://localhost:8000/image-test.html
- 🌐 **Haupt-Demo**: http://localhost:8000/context-demo.html
- 🗺️ **Auto-Weiterleitung**: http://localhost:8000/

**Häufige Lösungen:**
- **Alle Bilder fehlen**: Server-MIME-Types Problem → `python3 serve_demo.py` verwenden
- **Einzelne Bilder fehlen**: Datei-Pfad Problem → Image-Test aufrufen
- **Server startet nicht**: Port belegt → anderen Port versuchen
- **Browser blockiert**: CORS Problem → HTTP-Server verwenden (nicht file://)

### Design-Spezifikationen

- **Farbschema**: Open Banking Project Corporate Colors
- **Grafiken**: PNG Piktogramme und Hintergründe (optimiert für maximale Kompatibilität)
- **Sprache**: Professionelles Deutsch (Schweizer Kontext)
- **Layout**: Responsive Design mit Phasen-Containern für Referenzprozess
- **Interaktion**: Sequence-Diagramm für Consent Flow mit animierten Nachrichten

### Technische Verbesserungen

- **Bildformat**: PNG für maximale Browser-Kompatibilität
- **Server-Konfiguration**: Optimierter HTTP-Server mit korrekten MIME-Types
- **Fallback-System**: Automatische Pfad-Alternativen bei Bildlade-Problemen
- **Fehlerbehandlung**: Umfassende Diagnose und Logging
- **Test-Suite**: Integrierte Bildlade-Tests verfügbar

## Zielgruppe

Finanzindustrie-Profis mit theoretischem Hintergrund aber ohne tiefe API/Entwicklungs-Kenntnisse.

---

*Erstellt für das Open Banking Project Team - Business Engineering Institute, Universität St. Gallen*

---

### 🆘 Schnelle Hilfe

Bei Problemen:
1. 🚑 **Sofort-Lösung**: `python3 simple_server.py` (Port 8001)
2. 🔍 **Diagnose**: http://localhost:8001/image-test.html aufrufen
3. 📞 **Support**: Browser-Konsole (F12) prüfen