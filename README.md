# greenPDF

**Grüne Fraktion Kirchhundem - Medien-Dokumentenverwaltungssystem**

Ein modernes, responsives Medien-Betrachtungs- und Verwaltungssystem, speziell entwickelt für die Grüne Fraktion Kirchhundem. Diese Anwendung bietet eine intuitive Oberfläche zur Organisation, Betrachtung und Verwaltung politischer Dokumente und Bilder in verschiedenen Kategorien.

![greenPDF Screenshot](https://via.placeholder.com/800x400/22c55e/ffffff?text=greenPDF+Interface)

## ✨ Funktionen

### 📱 **Moderne Benutzeroberfläche**
- **Responsives Design**: Optimiert für Desktop, Tablet und mobile Geräte
- **Dunkelmodus-Unterstützung**: Wechsel zwischen hellem und dunklem Design mit Systemeinstellungserkennung
- **Professionelles Branding**: Individuelles grünes Farbschema passend zur politischen Identität
- **Sanfte Animationen**: Mikro-Interaktionen und Übergänge für eine verbesserte Benutzererfahrung

### 📁 **Medienverwaltung**
- **Multi-Format-Unterstützung**: Anzeige von PDFs, PNG, JPG und JPEG-Dateien
- **Organisierte Kategorien**: Dokumente sortiert in drei Hauptordnern:
  - **Anträge**: Offizielle Anträge und Vorschläge
  - **Presse**: Pressemitteilungen und Medienmaterialien
  - **Wahlkampf**: Kampagnenmaterialien und Wahldokumente
- **Dynamische Dateierkennung**: Automatisches Scannen und Manifest-Generierung für Mediendateien
- **Suchfunktion**: Echtzeit-Suche über alle Dokumente und Bilder
- **Favoriten-System**: Markieren häufig verwendeter Dateien als Favoriten
- **Zuletzt geöffnete Dateien**: Schneller Zugriff auf kürzlich angesehene Dokumente
- **Dateityp-Indikatoren**: Visuelle Kennzeichnungen für PDF- oder Bilddateitypen

### 🔍 **Erweiterter Medienbetrachter**
- **PDF-Rendering**: Hochwertige PDF-Anzeige mit PDF.js
- **Bildbetrachter**: Optimierte Bildanzeige mit Zoom-Steuerung
- **Zoom-Funktionen**: Vergrößern/Verkleinern, an Breite anpassen und Originalgröße
- **Seitennavigation**: Einfache PDF-Seitennavigation mit Eingabesteuerung
- **Vollbildmodus**: Ablenkungsfreie Dokument- und Bildbetrachtung
- **Download & Druck**: Direkte Download- und Druckfunktionalität für alle Dateitypen
- **Ladezustände**: Sanfte Ladeanzeigen und Fehlerbehandlung

### 🌐 **Internationalisierung**
- **Zweisprachige Unterstützung**: Deutsch (primär) und Englisch
- **Dynamischer Sprachwechsel**: Sofortiger Wechsel zwischen Sprachen
- **Lokalisierte Inhalte**: Alle Oberflächenelemente korrekt übersetzt
- **Browser-Spracherkennung**: Automatische Spracherkennung basierend auf Browser-Einstellungen

### 💾 **Datenpersistenz**
- **Lokaler Speicher**: Favoriten und kürzlich geöffnete Dateien bleiben über Sitzungen hinweg erhalten
- **Einstellungsspeicher**: Dunkelmodus- und Spracheinstellungen werden lokal gespeichert
- **Offline-Fähigkeit**: Kernfunktionalität funktioniert ohne Internetverbindung

## 🚀 Erste Schritte

### Voraussetzungen

- **Node.js** (Version 16 oder höher)
- **npm** oder **yarn** Paketmanager
- Moderner Webbrowser mit aktiviertem JavaScript

### Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd greenpdf
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Mediendateien hinzufügen**
   - Platzieren Sie PDF- und Bilddateien in den entsprechenden Ordnern unter `public/media/`:
     - `public/media/antraege/` - für Anträge und Vorschläge
     - `public/media/presse/` - für Pressematerialien
     - `public/media/wahlkampf/` - für Wahlkampfdokumente

4. **Manifest generieren** (optional)
   ```bash
   npm run generate-manifest
   ```

5. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

6. **Im Browser öffnen**
   Navigieren Sie zu `http://localhost:5173`

### Für Produktion bauen

```bash
npm run build
```

Die gebauten Dateien werden im Verzeichnis `dist/` verfügbar sein.

## 📂 Projektstruktur

```
greenpdf/
├── public/
│   ├── assets/
│   │   └── logo.png              # Organisations-Logo
│   └── media/
│       ├── antraege/             # Antragsdokumente & Bilder
│       ├── presse/               # Pressematerialien & Bilder
│       ├── wahlkampf/            # Wahlkampfdokumente & Bilder
│       └── manifest.json         # Automatisch generierter Dateiindex
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Hauptheader mit Branding
│   │   ├── Sidebar.jsx           # Dokumentennavigations-Seitenleiste
│   │   ├── MediaViewer.jsx       # PDF- & Bildanzeige-Komponente
│   │   └── Footer.jsx            # Fußzeile mit rechtlichen Links
│   ├── hooks/
│   │   ├── useDarkMode.js        # Dunkelmodus-Zustandsverwaltung
│   │   ├── useDynamicFolders.js  # Dynamische Dateierkennung
│   │   ├── useLocalStorage.js    # Lokale Speicher-Dienstprogramme
│   │   └── usePDFViewer.js       # PDF-Viewer-Zustandsverwaltung
│   ├── i18n/
│   │   ├── i18n.js               # Internationalisierungs-Setup
│   │   └── locales/
│   │       ├── de.json           # Deutsche Übersetzungen
│   │       └── en.json           # Englische Übersetzungen
│   ├── api/
│   │   └── fileScanner.js        # Dateierkennungs-Dienstprogramme
│   └── App.jsx                   # Haupt-Anwendungskomponente
├── scripts/
│   └── generate-manifest.js      # Manifest-Generierungsskript
└── package.json
```

## 🛠️ Technischer Stack

### **Frontend-Framework**
- **React 18**: Modernes React mit Hooks und funktionalen Komponenten
- **Vite**: Schnelles Build-Tool und Entwicklungsserver
- **TypeScript**: Typsicherheit und verbesserte Entwicklungserfahrung

### **Styling & UI**
- **Tailwind CSS**: Utility-First CSS-Framework
- **Lucide React**: Schöne, anpassbare Icons
- **Benutzerdefiniertes Design-System**: Grün-thematische Farbpalette und Komponenten

### **Medienverarbeitung**
- **react-pdf**: React-Wrapper für PDF.js zur PDF-Darstellung
- **PDF.js**: Mozilla's PDF-Rendering-Bibliothek
- **Native Bildunterstützung**: Optimierte Bildanzeige für PNG, JPG, JPEG

### **Internationalisierung**
- **react-i18next**: React-Integration für i18next
- **i18next**: Internationalisierungs-Framework
- **Browser-Spracherkennung**: Automatische Spracherkennung

### **Zustandsverwaltung**
- **React Hooks**: useState, useEffect, benutzerdefinierte Hooks
- **Local Storage**: Persistenter clientseitiger Speicher
- **Kontextfreie Architektur**: Prop-Drilling für einfache Zustandsverwaltung

## 📋 Verfügbare Skripte

| Skript | Beschreibung |
|--------|-------------|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Für Produktion bauen |
| `npm run generate-manifest` | Mediendatei-Manifest generieren |
| `npm run lint` | ESLint-Codeanalyse ausführen |
| `npm run preview` | Produktions-Build vorschauen |

## 🔧 Konfiguration

### **Neue Mediendateien hinzufügen**

1. **Dateien platzieren** im entsprechenden Ordner unter `public/media/`
   - Unterstützte Formate: PDF, PNG, JPG, JPEG
2. **Manifest-Generierung ausführen**:
   ```bash
   npm run generate-manifest
   ```
3. **Entwicklungsserver neu starten**, falls dieser läuft

### **Unterstützte Dateitypen**

- **PDFs**: `.pdf` - Dargestellt mit PDF.js mit vollständigen Navigationssteuerungen
- **Bilder**: `.png`, `.jpg`, `.jpeg` - Nativer Bildbetrachter mit Zoom-Steuerung

### **Übersetzungen anpassen**

Bearbeiten Sie die Übersetzungsdateien in `src/i18n/locales/`:
- `de.json` - Deutsche Übersetzungen
- `en.json` - Englische Übersetzungen

### **Farbschema ändern**

Das Farbschema ist in `tailwind.config.js` definiert. Ändern Sie die Abschnitte `colors.green` und `colors.emerald`, um das Design anzupassen.

### **Logo ersetzen**

Ersetzen Sie `public/assets/logo.png` durch das Logo Ihrer Organisation. Die Komponente wird automatisch das neue Logo verwenden.

## 🌟 Wichtige Funktionen erklärt

### **Multi-Format-Unterstützung**

Die Anwendung erkennt und verarbeitet automatisch verschiedene Dateitypen:
- **PDFs**: Vollwertiger Betrachter mit Seitennavigation, Zoom-Steuerung und Textdarstellung
- **Bilder**: Optimierter Bildbetrachter mit Zoom-Funktionen und Vollbildmodus

### **Dynamische Dateierkennung**

Die Anwendung entdeckt automatisch Mediendateien in den festgelegten Ordnern und generiert ein Manifest für effizientes Laden. Das Skript `generate-manifest.js` scannt die Ordnerstruktur und erstellt Metadaten für jede Datei, einschließlich Dateityperkennung.

### **Responsives Design**

Die Oberfläche passt sich an verschiedene Bildschirmgrößen an:
- **Desktop**: Vollständiges Seitenleisten- und Betrachter-Layout
- **Tablet**: Einklappbare Seitenleiste mit Overlay
- **Mobil**: Ausgeblendete Seitenleiste mit Umschalttaste

### **Dateityp-Indikatoren**

Visuelle Indikatoren helfen Benutzern, Dateitypen schnell zu identifizieren:
- **PDF-Dateien**: Rotes Abzeichen mit "PDF"-Beschriftung und Dokumentsymbol
- **Bilddateien**: Blaues Abzeichen mit "IMG"-Beschriftung und Bildsymbol

### **Erweiterte Suche**

Echtzeit-Suche über alle Mediendateien:
- Durchsucht Dateinamen und Metadaten
- Sofortige Ergebnisse während der Eingabe
- Hervorhebung passender Dokumente und Bilder
- Ordnerübergreifende Suchfunktion

## 🚀 Bereitstellung

### **Statisches Hosting**

Die Anwendung kann auf jedem statischen Hosting-Dienst bereitgestellt werden:

1. **Projekt bauen**:
   ```bash
   npm run build
   ```

2. **Den `dist/`-Ordner** auf Ihrem Hosting-Dienst bereitstellen

### **Empfohlene Hosting-Plattformen**
- **Netlify**: Automatische Bereitstellungen aus Git
- **Vercel**: Optimiert für React-Anwendungen
- **GitHub Pages**: Kostenloses Hosting für öffentliche Repositories
- **AWS S3**: Skalierbarer Cloud-Speicher mit CloudFront CDN

## 🤝 Mitwirken

### **Entwicklungs-Workflow**

1. **Repository forken**
2. **Feature-Branch erstellen**:
   ```bash
   git checkout -b feature/ihr-feature-name
   ```
3. **Änderungen vornehmen**
4. **Gründlich testen** mit PDFs und Bildern
5. **Pull-Request einreichen**

### **Code-Stil**

- Bestehende Code-Muster befolgen
- Aussagekräftige Variablen- und Funktionsnamen verwenden
- Kommentare für komplexe Logik hinzufügen
- Responsive Design-Prinzipien sicherstellen
- In hellen und dunklen Modi testen
- Mit verschiedenen Dateitypen testen

## 📄 Lizenz

Dieses Projekt wurde für die Grüne Fraktion Kirchhundem entwickelt. Bitte kontaktieren Sie die Organisation für Lizenzinformationen.

## 🆘 Unterstützung

Für technische Unterstützung oder Fragen zur Anwendung:

1. **Überprüfen Sie die Dokumentation** in dieser README
2. **Sehen Sie die Code-Kommentare durch** für Implementierungsdetails
3. **Kontaktieren Sie das Entwicklungsteam** für spezifische Probleme

## 🔮 Zukünftige Erweiterungen

### **Geplante Funktionen**
- **Dokumenten-Anmerkungen**: Notizen und Hervorhebungen zu PDFs hinzufügen
- **Erweiterte Suche**: Volltextsuche innerhalb von PDF-Inhalten
- **Bild-Metadaten**: EXIF-Datenanzeige für Bilder
- **Diashow-Modus**: Automatische Bilddiashowfunktion
- **Dokumenten-Versionierung**: Dokumentenänderungen im Laufe der Zeit verfolgen
- **Benutzerverwaltung**: Rollenbasierte Zugriffskontrolle
- **Export-Optionen**: Funktionen für Massendownload und Teilen
- **Analytik**: Dokumentnutzungsstatistiken und Erkenntnisse

### **Technische Verbesserungen**
- **Progressive Web App**: Offline-Funktionalität und App-ähnliche Erfahrung
- **Leistungsoptimierung**: Lazy-Loading- und Caching-Strategien
- **Barrierefreiheit**: Verbesserte Screenreader-Unterstützung und Tastaturnavigation
- **Tests**: Umfassende Einheits- und Integrationstests
- **Zusätzliche Formate**: Unterstützung für weitere Dateitypen (WEBP, SVG, usw.)

---

**Mit ❤️ erstellt für die Grüne Fraktion Kirchhundem**

*Diese Anwendung repräsentiert unser Engagement für digitale Transparenz und effiziente Medienverwaltung in der Lokalpolitik.*