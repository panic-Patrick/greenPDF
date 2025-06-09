# greenPDF

**Grüne Fraktion Kirchhundem - Medien-Dokumentenverwaltungssystem mit Supabase-Integration**

Ein modernes, responsives Medien-Betrachtungs- und Verwaltungssystem, speziell entwickelt für die Grüne Fraktion Kirchhundem. Diese Anwendung bietet eine intuitive Oberfläche zur Organisation, Betrachtung und Verwaltung politischer Dokumente und Bilder in verschiedenen Kategorien. Die gesamte Medienverwaltung läuft über Supabase als Backend-as-a-Service.


## ✨ Funktionen

### 📱 **Moderne Benutzeroberfläche**
- **Responsives Design**: Optimiert für Desktop, Tablet und mobile Geräte
- **Dunkelmodus-Unterstützung**: Wechsel zwischen hellem und dunklem Design mit Systemeinstellungserkennung
- **Professionelles Branding**: Individuelles grünes Farbschema passend zur politischen Identität
- **Sanfte Animationen**: Mikro-Interaktionen und Übergänge für eine verbesserte Benutzererfahrung

### �� **Medienverwaltung über Supabase**
- **Multi-Format-Unterstützung**: Anzeige von PDFs, PNG, JPG und JPEG-Dateien
- **Hierarchische Ordnerstruktur**: Vollständige Unterstützung für Unterordner und verschachtelte Strukturen
- **Organisierte Kategorien**: Dokumente sortiert in Hauptordnern mit beliebig tiefen Unterordnern:
  - **Anträge**: Offizielle Anträge und Vorschläge (z.B. 2024/Januar/, Vorlagen/)
  - **Presse**: Pressemitteilungen und Medienmaterialien (z.B. Pressemitteilungen/2024/, Medienkit/Logos/)
  - **Wahlkampf**: Kampagnenmaterialien und Wahldokumente
  - **Events**: Veranstaltungsdokumente und -materialien
- **Ausklappbare Navigation**: Intuitive Ordner-Navigation mit Ein-/Ausklapp-Funktionalität
- **Cloud-basierte Speicherung**: Alle Mediendateien werden in Supabase Storage Buckets verwaltet
- **Rekursive Dateierkennung**: Automatisches Scannen aller Ordnerebenen und Unterverzeichnisse
- **Intelligente Datei-Zähler**: Anzeige der Gesamtanzahl von Dateien pro Ordner (inkl. Unterordner)
- **Suchfunktion**: Echtzeit-Suche über alle Dokumente und Bilder in allen Ordnerebenen
- **Favoriten-System**: Markieren häufig verwendeter Dateien als Favoriten
- **Zuletzt geöffnete Dateien**: Schneller Zugriff auf kürzlich angesehene Dokumente
- **Dateityp-Indikatoren**: Visuelle Kennzeichnungen für PDF- oder Bilddateitypen mit Typ-spezifischen Zählern

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

### 💾 **Datenpersistenz & Cloud-Integration**
- **Lokaler Speicher**: Favoriten und kürzlich geöffnete Dateien bleiben über Sitzungen hinweg erhalten
- **Einstellungsspeicher**: Dunkelmodus- und Spracheinstellungen werden lokal gespeichert
- **Offline-Fähigkeit**: Kernfunktionalität funktioniert ohne Internetverbindung
- **Supabase-Integration**: Cloud-Speicher für alle Mediendateien mit sicherer Zugriffsverwaltung
- **Automatische Synchronisierung**: Dokumente werden aus Supabase Storage Buckets geladen und verwaltet

## 🚀 Erste Schritte

### Voraussetzungen

- **Node.js** (Version 16 oder höher)
- **npm** oder **yarn** Paketmanager
- Moderner Webbrowser mit aktiviertem JavaScript
- **Supabase-Konto** für Cloud-Speicher (optional, alternativ lokale Dateispeicherung)

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/panic-Patrick/greenPDF
   cd greenpdf
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren**
   - Erstellen Sie eine `.env`-Datei im Stammverzeichnis:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Mediendateien hinzufügen**
   - **Supabase (empfohlen)**: Laden Sie Dateien in die entsprechenden Supabase Storage Buckets hoch.
   - **Option 2: Lokale Dateien**: Platzieren Sie PDF- und Bilddateien in den entsprechenden Ordnern unter `public/media/`:
     - `public/media/antraege/` - für Anträge und Vorschläge
     - `public/media/presse/` - für Pressematerialien
     - `public/media/wahlkampf/` - für Wahlkampfdokumente

5. **Manifest generieren** (für lokale Dateien)
   ```bash
   npm run generate-manifest
   ```

6. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

7. **Im Browser öffnen**
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
│   │   ├── PDFViewer.jsx         # PDF-spezifische Anzeige-Komponente
│   │   ├── Footer.jsx            # Fußzeile mit rechtlichen Links
│   │   ├── ImpressumContent.jsx  # Impressum-Inhalte
│   │   ├── DatenschutzContent.jsx # Datenschutzerklärung 
│   │   └── SupabaseDebug.jsx     # Debug-Komponente für Supabase
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
│   │   ├── fileScanner.js        # Lokale Dateierkennungs-Dienstprogramme
│   │   └── supabaseStorage.js    # Supabase Storage-Integration
│   ├── lib/
│   │   └── supabaseClient.js     # Supabase Client-Konfiguration
│   ├── vite-env.d.ts             # TypeScript Umgebungsdeklarationen
│   ├── index.css                 # Globale CSS-Stile
│   └── main.tsx                  # Anwendungs-Einstiegspunkt
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

### **Zustandsverwaltung & Datenspeicherung**
- **React Hooks**: useState, useEffect, benutzerdefinierte Hooks
- **Local Storage**: Persistenter clientseitiger Speicher
- **Supabase**: Backend-as-a-Service für Datenspeicherung und -verwaltung
- **Supabase Storage**: Cloud-Speicher für Mediendateien

## 📋 Verfügbare Skripte

| Skript | Beschreibung |
|--------|-------------|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Für Produktion bauen (inkl. Manifest-Generierung) |
| `npm run generate-manifest` | Mediendatei-Manifest generieren |
| `npm run lint` | ESLint-Codeanalyse ausführen |
| `npm run preview` | Produktions-Build vorschauen |

## 🔧 Konfiguration

### **Supabase-Integration einrichten**

1. **Supabase-Projekt erstellen** auf [supabase.com](https://supabase.com)
2. **Storage-Buckets erstellen**:
   - Erstellen Sie vier öffentliche Buckets: `antraege`, `presse`, `wahlkampf` und `events`
   - Setzen Sie die entsprechenden Berechtigungen für diese Buckets
   - Erstellen Sie Unterordner nach Bedarf (z.B. `antraege/2024/januar/`, `presse/medienkit/logos/`)
3. **Umgebungsvariablen konfigurieren**:
   - Kopieren Sie Ihre Supabase URL und Anon Key in die `.env`-Datei

### **Neue Mediendateien hinzufügen**

#### Für Supabase-Speicher (empfohlene Methode):
1. **Dateien hochladen** in die entsprechenden Supabase Storage Buckets über die Supabase-Konsole
2. **Unterordner erstellen** für bessere Organisation (z.B. `2024/januar/`, `medienkit/logos/`)
3. **Anwendung neu laden**, die Dateien und Ordnerstruktur werden automatisch erkannt

#### Für lokale Dateien (Alternative):
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

### **Unterordner-Navigation verwenden**

Die neue hierarchische Ordnerstruktur ermöglicht eine bessere Organisation:

1. **Hauptordner ausklappen**: Klicken Sie auf einen Bucket-Namen (z.B. "Anträge")
2. **Unterordner navigieren**: Klicken Sie auf Unterordner-Namen, um sie auszuklappen
3. **Dateien anzeigen**: Dateien werden in jedem Ordner-Level angezeigt
4. **Visuelle Unterscheidung**:
   - **Hauptordner**: Grüne Ordner-Icons
   - **Unterordner**: Gelbe Ordner-Icons mit Einrückung
   - **Datei-Zähler**: Zeigen Gesamtanzahl und Typ-spezifische Zähler
5. **Ordner-Pfad**: Bei Dateien wird der Ordner-Pfad angezeigt

**Beispiel-Ordnerstruktur**:
```
antraege/
├── 2024/
│   ├── januar/
│   │   ├── antrag_solaranlagen.pdf
│   │   └── antrag_fahrradwege.pdf
│   └── februar/
│       └── antrag_umweltschutz.pdf
├── 2023/
│   └── archiv/
│       └── alte_antraege.pdf
└── vorlagen/
    └── antrag_vorlage.pdf
```

## 🌟 Wichtige Funktionen erklärt

### **Medienverwaltung über Supabase**

Die Anwendung verwendet primär Supabase für die Medienverwaltung:
- **Supabase Cloud-Speicher**: Alle Mediendateien werden in Supabase Storage Buckets gespeichert und über die Supabase API abgerufen
- **Strukturierte Buckets**: Separate Buckets für Anträge, Presse und Wahlkampfmaterialien
- **Sichere Zugriffsverwaltung**: Dateizugriff wird über Supabase-Berechtigungen gesteuert
- **Lokaler Fallback**: Bei Bedarf kann auf lokale Dateien zurückgegriffen werden

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

### **Umgebungsvariablen konfigurieren**

Bei der Bereitstellung auf Hosting-Plattformen müssen Sie die folgenden Umgebungsvariablen konfigurieren:
- `VITE_SUPABASE_URL`: Ihre Supabase-Projekt-URL
- `VITE_SUPABASE_ANON_KEY`: Ihr Supabase anonymer Schlüssel

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
2. **Lesen Sie die Unterordner-Dokumentation** in `SUBFOLDER_FEATURE.md` für detaillierte Informationen zur neuen Funktionalität
3. **Sehen Sie die Code-Kommentare durch** für Implementierungsdetails
4. **Kontaktieren Sie das Entwicklungsteam** für spezifische Probleme

## 🔮 Zukünftige Erweiterungen

### **Geplante Funktionen**
- **Ordner-Management**: Ordner-Erstellung, -Umbenennung und -Löschung über die UI
- **Drag & Drop**: Dateien zwischen Ordnern verschieben
- **Bulk-Operationen**: Mehrere Dateien gleichzeitig verwalten
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
- **Verbesserter Supabase-Support**: Vollständige Integration aller Supabase-Funktionen

---

**Mit ❤️ erstellt für die Grüne Fraktion Kirchhundem**

*Diese Anwendung repräsentiert unser Engagement für digitale Transparenz und effiziente Medienverwaltung in der Lokalpolitik.*