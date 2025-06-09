# greenPDF

**Grüne Fraktion Kirchhundem - Medien-Dokumentenverwaltungssystem mit Supabase-Integration**

Ein modernes, responsives Medien-Betrachtungs- und Verwaltungssystem, speziell entwickelt für die Grüne Fraktion Kirchhundem. Diese Anwendung bietet eine intuitive Oberfläche zur Organisation, Betrachtung und Verwaltung politischer Dokumente und Bilder in verschiedenen Kategorien. Die gesamte Medienverwaltung läuft über Supabase als Backend-as-a-Service mit vollständiger Unterordner-Unterstützung.

> 📋 **Für andere Grüne Ortsverbände:** Eine detaillierte Anleitung zur Anpassung des Systems für Ihren Ortsverband finden Sie in der [Anpassungsanleitung](ANPASSUNGEN_FUER_ANDERE_FRAKTION.md).


## ✨ Funktionen

### 📱 **Moderne Benutzeroberfläche**
- **Responsives Design**: Optimiert für Desktop, Tablet und mobile Geräte
- **Mobile-First Optimierung**: Umfassende Touch-Optimierung mit mindestens 44px Touch-Zielgrößen
- **Responsive Breakpoints**: Erweiterte Breakpoint-Unterstützung inkl. xs (475px) für sehr kleine Geräte
- **Touch-Performance**: Optimierte Touch-Interaktionen mit `touch-manipulation` CSS
- **Safe Area Support**: Vollständige Unterstützung für Geräte mit Notches und abgerundeten Ecken
- **Dunkelmodus-Unterstützung**: Wechsel zwischen hellem und dunklem Design mit Systemeinstellungserkennung
- **Professionelles Branding**: Individuelles grünes Farbschema passend zur politischen Identität
- **Sanfte Animationen**: Mikro-Interaktionen und Übergänge für eine verbesserte Benutzererfahrung
- **Erweiterte CSS-Animationen**: Slide-in-Animationen, Hover-Effekte und benutzerdefinierte Scrollbars

### 🗂️ **Erweiterte Hierarchische Ordnerstruktur**
- **Rekursive Ordner-Auflistung**: Vollständige Unterstützung für beliebig tiefe Unterordner-Strukturen
- **Intelligente Datenstruktur**: Verschachtelte Ordnerstruktur mit effizienter Speicherung und Navigation
- **Lazy Loading**: Unterordner werden nur bei Bedarf geladen für optimale Performance
- **Visuelle Unterscheidung**: 
  - **Hauptordner**: Grüne Ordner-Icons
  - **Unterordner**: Gelbe Ordner-Icons mit visueller Einrückung
  - **Animierte Ausklapp-Funktionen**: Sanfte Übergänge beim Öffnen/Schließen von Ordnern
- **Erweiterte State-Verwaltung**: Separate Tracking für Hauptordner und Unterordner-Zustände
- **Pfad-Anzeige**: Vollständige Pfad-Information für bessere Orientierung

### 📊 **Intelligente Datei-Zählung und -Analyse**
- **Rekursive Datei-Zählung**: Automatische Berechnung der Gesamtanzahl von Dateien pro Ordner (inkl. aller Unterordner)
- **Typ-spezifische Zähler**: Separate Anzeige für PDF- und Bild-Dateien mit visuellen Badges
- **Performance-optimierte Zählung**: Effiziente Algorithmen für große Ordnerstrukturen
- **Echtzeit-Updates**: Automatische Aktualisierung der Zähler bei Strukturänderungen

### 🗃️ **Medienverwaltung über Supabase**
- **Multi-Format-Unterstützung**: Anzeige von PDFs, PNG, JPG und JPEG-Dateien
- **Hierarchische Ordnerstruktur**: Vollständige Unterstützung für Unterordner und verschachtelte Strukturen mit beliebiger Tiefe
- **Organisierte Kategorien**: Dokumente sortiert in Hauptordnern mit beliebig tiefen Unterordnern:
  - **Anträge**: Offizielle Anträge und Vorschläge (z.B. `2024/januar/`, `vorlagen/`)
  - **Presse**: Pressemitteilungen und Medienmaterialien (z.B. `pressemitteilungen/2024/`, `medienkit/logos/`)
  - **Wahlkampf**: Kampagnenmaterialien und Wahldokumente
  - **Events**: Veranstaltungsdokumente und -materialien
- **Ausklappbare Navigation**: Intuitive Ordner-Navigation mit Ein-/Ausklapp-Funktionalität für alle Ebenen
- **Cloud-basierte Speicherung**: Alle Mediendateien werden in Supabase Storage Buckets verwaltet
- **Rekursive Dateierkennung**: Automatisches Scannen aller Ordnerebenen und Unterverzeichnisse
- **Caching-System**: Geladene Ordnerstrukturen werden im State gecacht für bessere Performance
- **Suchfunktion**: Echtzeit-Suche über alle Dokumente und Bilder in allen Ordnerebenen
- **Favoriten-System**: Markieren häufig verwendeter Dateien als Favoriten
- **Zuletzt geöffnete Dateien**: Schneller Zugriff auf kürzlich angesehene Dokumente
- **Dateityp-Indikatoren**: Visuelle Kennzeichnungen für PDF- oder Bilddateitypen mit Typ-spezifischen Zählern

### 🔗 **Link-Generator und QR-Code-Funktionalität**
- **Direkte Links erstellen**: Generierung von direkten Links zu spezifischen Ordnern oder Ordner-Übersichten
- **QR-Code-Generierung**: Automatische Erstellung hochauflösender QR-Codes mit integriertem Logo
- **Intelligente URL-Parameter**: Links enthalten Bucket- und Ordner-Informationen für direkten Zugriff
- **QR-Code-Download**: Download der generierten QR-Codes als PNG-Dateien in hoher Qualität
- **Native Sharing-API**: Unterstützung für das native Teilen auf mobilen Geräten
- **Clipboard-Integration**: Ein-Klick-Kopieren von Links in die Zwischenablage
- **Responsive QR-Codes**: QR-Codes mit Logo-Integration und anpassbarer Fehlerkorrektur
- **Fallback-Unterstützung**: Automatische Fallbacks für ältere Browser ohne moderne APIs

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
│   │   ├── Sidebar.jsx           # Dokumentennavigations-Seitenleiste mit Unterordner-Support
│   │   ├── MediaViewer.jsx       # PDF- & Bildanzeige-Komponente
│   │   ├── PDFViewer.jsx         # PDF-spezifische Anzeige-Komponente
│   │   ├── LinkGenerator.jsx     # Link- und QR-Code-Generator-Komponente
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
│   │   └── supabaseStorage.js    # Supabase Storage-Integration mit Unterordner-Support
│   ├── lib/
│   │   └── supabaseClient.js     # Supabase Client-Konfiguration mit rekursiven Funktionen
│   ├── vite-env.d.ts             # TypeScript Umgebungsdeklarationen
│   ├── index.css                 # Globale CSS-Stile mit Unterordner-Animationen
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
- **Tailwind CSS**: Utility-First CSS-Framework mit erweiterten Mobile-Breakpoints
- **Mobile-First Design**: Responsive Design-Ansatz mit Touch-Optimierung
- **Touch-optimierte Utilities**: Spezielle CSS-Klassen für Touch-Interaktionen und Safe Areas
- **Lucide React**: Schöne, anpassbare Icons mit responsiven Größen
- **Benutzerdefiniertes Design-System**: Grün-thematische Farbpalette und Komponenten
- **Erweiterte CSS-Animationen**: Slide-in-Animationen, Folder-Icon-Transitions und benutzerdefinierte Scrollbars
- **iOS/Android Optimierungen**: Spezielle CSS für iOS Zoom-Prevention und Android Touch-Performance

### **Medienverarbeitung**
- **react-pdf**: React-Wrapper für PDF.js zur PDF-Darstellung
- **PDF.js**: Mozilla's PDF-Rendering-Bibliothek
- **Native Bildunterstützung**: Optimierte Bildanzeige für PNG, JPG, JPEG

### **Link-Generierung und QR-Codes**
- **qrcode**: QR-Code-Generierung mit hoher Auflösung und Fehlerkorrektur
- **Clipboard API**: Moderne Browser-API für Zwischenablage-Funktionen
- **Web Share API**: Native Sharing-Funktionalität für mobile Geräte

### **Internationalisierung**
- **react-i18next**: React-Integration für i18next
- **i18next**: Internationalisierungs-Framework
- **Browser-Spracherkennung**: Automatische Spracherkennung

### **Zustandsverwaltung & Datenspeicherung**
- **React Hooks**: useState, useEffect, benutzerdefinierte Hooks
- **Local Storage**: Persistenter clientseitiger Speicher
- **Supabase**: Backend-as-a-Service für Datenspeicherung und -verwaltung
- **Supabase Storage**: Cloud-Speicher für Mediendateien mit hierarchischer Struktur
- **Erweiterte State-Verwaltung**: Separate Tracking für `expandedFolders` und `expandedSubfolders`

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

Die erweiterte hierarchische Ordnerstruktur ermöglicht eine professionelle Organisation:

#### **Beispiel-Ordnerstruktur in Supabase Storage**

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

presse/
├── pressemitteilungen/
│   ├── 2024/
│   │   └── pm_januar.pdf
│   └── 2023/
│       └── pm_dezember.pdf
└── medienkit/
    ├── logos/
    │   └── logo.png
    └── fotos/
        └── team.jpg
```

#### **Navigation und Bedienung**

1. **Hauptordner ausklappen**: Klicken Sie auf einen Bucket-Namen (z.B. "Anträge")
2. **Unterordner ausklappen**: Klicken Sie auf einen Unterordner-Namen
3. **Dateien anzeigen**: Dateien werden in jedem Ordner-Level angezeigt
4. **Datei-Zähler**: Zeigt die Anzahl der Dateien in jedem Ordner an (rekursiv)
5. **Typ-Badges**: PDF- und Bild-Dateien werden separat gezählt und angezeigt
6. **Visuelle Unterscheidung**:
   - **Hauptordner**: Grüne Ordner-Icons
   - **Unterordner**: Gelbe Ordner-Icons mit visueller Einrückung
   - **Animationen**: Sanfte Ausklapp-Animationen mit CSS-Transitions
7. **Ordner-Pfad**: Bei Dateien wird der vollständige Ordner-Pfad angezeigt

#### **Link-Generator und QR-Code-Funktionen**

**Zugriff auf den Link-Generator:**
- **Share-Button**: Klicken Sie auf das Link-Symbol neben jedem Ordner
- **Direkte Links**: Erstellen Sie Links zu spezifischen Ordnern oder der Ordner-Übersicht
- **QR-Code-Generierung**: Automatische Erstellung mit integriertem Logo

**Funktionen des Link-Generators:**
1. **Link erstellen**: Automatische Generierung direkter URLs mit Bucket- und Ordner-Parametern
2. **Link kopieren**: Ein-Klick-Kopieren in die Zwischenablage mit visueller Bestätigung
3. **QR-Code generieren**: Hochauflösende QR-Codes (800x800px) mit Logo-Integration
4. **QR-Code herunterladen**: Download als PNG-Datei mit aussagekräftigem Dateinamen
5. **Native Sharing**: Verwendung der Web Share API auf unterstützten Geräten
6. **Fallback-Unterstützung**: Automatische Fallbacks für ältere Browser

**QR-Code-Features:**
- **Hohe Auflösung**: 800x800 Pixel für scharfe Druckergebnisse
- **Logo-Integration**: Automatische Einbettung des Organisations-Logos
- **Fehlerkorrektur**: Höchste Stufe (Level H) für bessere Lesbarkeit trotz Logo
- **Anpassbares Design**: Grünes Farbschema passend zum Corporate Design
- **Weißer Hintergrund**: Professioneller weißer Kreis um das Logo

#### **CSS-Animationen für Unterordner**

Neue CSS-Klassen in `src/index.css`:

- `.animate-slide-in`: Sanfte Einblend-Animation für Unterordner
- `.folder-icon-transition`: Hover-Effekte für Ordner-Icons
- `.sidebar-scroll`: Benutzerdefinierte Scrollbar für die Seitenleiste

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

### **📱 Mobile Optimierungen**

Die Anwendung wurde umfassend für mobile Geräte optimiert:

#### **Header-Optimierungen**
- **Responsive Logo-Größe**: Automatische Anpassung der Logo-Größe (w-12 h-12 auf mobil, w-16 h-16 auf größeren Bildschirmen)
- **Touch-optimierte Buttons**: Alle Buttons haben mindestens 44px Touch-Zielgröße
- **Responsive Typografie**: Text-Größen passen sich automatisch an (text-lg auf mobil, text-2xl auf Desktop)
- **Verbesserte Touch-Interaktion**: `touch-manipulation` CSS für bessere Touch-Performance

#### **Sidebar-Optimierungen**
- **Mobile-First Navigation**: Vollbreite Sidebar auf mobilen Geräten (w-full max-w-sm)
- **Verbesserte Overlay-Interaktion**: Touch-freundliche Overlay-Bedienung
- **Optimierte Ordner-Navigation**: Touch-optimierte Ausklapp-Funktionen für Unterordner
- **Sichtbare Icons**: Favoriten- und Share-Icons sind immer sichtbar (nicht nur bei Hover)
- **Responsive Ordner-Struktur**: Angepasste Einrückungen und Abstände für mobile Bildschirme

#### **MediaViewer Mobile-Optimierungen**
- **Responsive PDF-Anzeige**: Automatische Breitenanpassung für mobile Bildschirme
- **Touch-optimierte Toolbar**: Größere Buttons und bessere Abstände
- **Mobile Zoom-Steuerung**: Touch-freundliche Zoom-Buttons und Gesten-Unterstützung
- **Responsive Seitennavigation**: Angepasste Seitenzahl-Eingabe für mobile Tastaturen
- **Mobile Datei-Info**: Zusätzliche mobile Datei-Info-Sektion unterhalb der Hauptinformationen
- **Optimierte Vollbild-Ansicht**: Verbesserte Vollbild-Erfahrung auf mobilen Geräten

#### **FolderOverview Mobile-Optimierungen**
- **Responsive Grid-Layout**: 2 Spalten auf mobil, mehr auf größeren Bildschirmen
- **Touch-freundliche Karten**: Optimierte Datei- und Ordner-Karten für Touch-Bedienung
- **Mobile Such- und Filter-Controls**: Angepasste Layout für Such- und Filterfunktionen
- **Responsive Icon-Größen**: Automatische Anpassung der Icon-Größen je nach Bildschirmgröße
- **Verbesserte Share-Funktionalität**: Sichtbare Share-Buttons mit grünem Hintergrund und Text

#### **Footer Mobile-Optimierungen**
- **Responsive 3-Spalten-Layout**: Stapelt sich auf mobilen Geräten zu einer Spalte
- **Touch-optimierte Links**: Alle Footer-Links haben ausreichende Touch-Zielgrößen
- **Mobile Kontakt-Informationen**: Optimierte Darstellung von Kontaktdaten
- **Responsive Modal-Integration**: Touch-freundliche Impressum- und Datenschutz-Modals

#### **Tailwind CSS Mobile-Konfiguration**
- **Erweiterte Breakpoints**: Zusätzlicher `xs` Breakpoint (475px) für sehr kleine Geräte
- **Touch Media Queries**: Spezielle Styles für Touch-Geräte
- **Safe Area Support**: Unterstützung für Geräte mit Notches und abgerundeten Ecken
- **Touch-optimierte Utilities**: Spezielle CSS-Klassen für Touch-Interaktionen

#### **CSS Mobile-Optimierungen**
- **iOS Zoom-Prevention**: Verhindert ungewolltes Zoomen bei Input-Focus auf iOS
- **Verbesserte Touch-Scrolling**: Optimierte Scroll-Performance mit `-webkit-overflow-scrolling`
- **Safe Area Insets**: Unterstützung für `env(safe-area-inset-*)` für moderne Smartphones
- **Touch-Feedback**: Verbesserte visuelle Rückmeldung bei Touch-Interaktionen
- **Minimum Touch-Targets**: Alle interaktiven Elemente haben mindestens 44px Touch-Zielgröße

#### **Modal Mobile-Optimierungen**
- **Vollbild-Modals auf mobil**: Impressum und Datenschutz-Modals nutzen den gesamten Bildschirm
- **Touch-freundliche Schließ-Buttons**: Große X-Buttons in der oberen rechten Ecke
- **Mobile Scroll-Optimierung**: Optimiertes Scrolling innerhalb der Modals
- **Responsive Modal-Inhalte**: Angepasste Typografie und Abstände für mobile Bildschirme

#### **Performance-Optimierungen für Mobile**
- **Lazy Loading**: Optimiertes Laden von Inhalten für langsamere mobile Verbindungen
- **Touch-optimierte Animationen**: Reduzierte Animationen für bessere Performance
- **Mobile-First CSS**: CSS wurde mobile-first geschrieben für bessere Performance
- **Optimierte Bundle-Größe**: Minimierte JavaScript- und CSS-Bundles für schnellere Ladezeiten

#### **Accessibility Mobile-Verbesserungen**
- **Touch-Accessibility**: Alle interaktiven Elemente sind mit Touch-Geräten zugänglich
- **Mobile Screen Reader**: Optimierte Unterstützung für mobile Screen Reader
- **Keyboard Navigation**: Verbesserte Tastatur-Navigation auf mobilen Geräten mit externer Tastatur
- **High Contrast Support**: Unterstützung für High-Contrast-Modi auf mobilen Geräten

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

### **Link-Generator und QR-Code-System**

Die Anwendung bietet ein vollständiges System zur Erstellung und Verwaltung direkter Links:

#### **Link-Generierung**
- **Intelligente URL-Struktur**: Links enthalten Bucket- und Ordner-Parameter für direkten Zugriff
- **Automatische Kodierung**: Ordnerpfade werden korrekt URL-kodiert für Sonderzeichen
- **Basis-URL-Erkennung**: Automatische Erkennung der aktuellen Domain und des Pfads

#### **QR-Code-Technologie**
- **Hochauflösende Generierung**: 800x800 Pixel QR-Codes für professionelle Verwendung
- **Logo-Integration**: Automatische Einbettung des Organisations-Logos mit weißem Hintergrund
- **Fehlerkorrektur Level H**: Höchste Fehlerkorrektur für bessere Lesbarkeit trotz Logo-Overlay
- **Canvas-basierte Verarbeitung**: Verwendung der HTML5 Canvas API für präzise Bildbearbeitung

#### **Sharing-Funktionalität**
- **Web Share API**: Native Sharing-Unterstützung auf mobilen Geräten und modernen Browsern
- **Clipboard API**: Moderne Zwischenablage-Integration mit Fallback für ältere Browser
- **Download-Funktionen**: Direkte Download-Links für QR-Codes mit aussagekräftigen Dateinamen

#### **Benutzerfreundlichkeit**
- **Visuelle Bestätigung**: Sofortiges Feedback bei erfolgreichem Kopieren oder Teilen
- **Responsive Design**: Optimierte Darstellung auf allen Geräten
- **Mehrsprachige Unterstützung**: Vollständige Lokalisierung in Deutsch und Englisch
- **Barrierefreiheit**: Tastaturnavigation und Screenreader-Unterstützung

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
- **Mobile Testing**: Testen auf verschiedenen mobilen Geräten und Bildschirmgrößen
- **Touch-Interaktion Testing**: Sicherstellen, dass alle Touch-Ziele mindestens 44px groß sind
- **Performance Testing**: Mobile Performance mit langsameren Verbindungen testen

## 📄 Lizenz

Dieses Projekt wurde für die Grüne Fraktion Kirchhundem entwickelt. Bitte kontaktieren Sie die Organisation für Lizenzinformationen.

## 🗂️ Hierarchische Ordnerstruktur - Technische Details

### **Datenstruktur**

Die Anwendung verwendet eine verschachtelte Datenstruktur für die Ordnerverwaltung:

```javascript
folderStructure = {
  antraege: {
    name: 'antraege',
    bucket: 'antraege',
    files: [/* Dateien im Root */],
    subfolders: {
      '2024': {
        name: '2024',
        path: '2024',
        files: [/* Dateien in 2024/ */],
        subfolders: {
          'januar': {
            name: 'januar',
            path: '2024/januar',
            files: [/* Dateien in 2024/januar/ */],
            subfolders: {}
          }
        }
      }
    }
  }
}
```

### **Kern-Funktionen**

#### **Rekursive Ordner-Auflistung**
- **Datei**: `src/lib/supabaseClient.js`
- **Funktion**: `listFilesAndFoldersRecursively()`
- Lädt rekursiv alle Dateien und Ordner aus einem Supabase Storage Bucket

#### **Hierarchische Datenverarbeitung**
- **Datei**: `src/api/supabaseStorage.js`
- **Funktionen**: 
  - `createFolderStructure()` - Erstellt eine verschachtelte Ordnerstruktur
  - `processFilesRecursively()` - Verarbeitet Dateien rekursiv
  - `getAllFilesRecursively()` - Holt alle Dateien aus der Hierarchie
  - `countFilesRecursively()` - Zählt Dateien rekursiv

#### **Erweiterte UI-Komponenten**
- **Datei**: `src/components/Sidebar.jsx`
- **Funktionen**:
  - `renderSubfolder()` - Rendert Unterordner rekursiv
  - `toggleSubfolder()` - Klappt Unterordner aus/ein
  - `countFilesInSubfolder()` - Zählt Dateien in Unterordnern

### **State Management für Unterordner**

- `expandedFolders`: Set der ausgeklappten Hauptordner
- `expandedSubfolders`: Set der ausgeklappten Unterordner (mit vollständigem Pfad)

### **Performance-Optimierungen**

- **Lazy Loading**: Unterordner werden nur geladen, wenn sie ausgeklappt werden
- **Caching**: Geladene Strukturen werden im State gecacht
- **Rekursive Zählung**: Effiziente Berechnung der Datei-Anzahl
- **Optimierte Rendering**: Nur sichtbare Ordner werden gerendert

## 🔮 Zukünftige Erweiterungen

### **Geplante Funktionen**
- **Erweiterte Link- und QR-Code-Features**:
  - **Batch-QR-Code-Generierung**: QR-Codes für mehrere Ordner gleichzeitig erstellen
  - **Anpassbare QR-Code-Designs**: Verschiedene Farbschemata und Logo-Optionen
  - **Link-Analytik**: Tracking von Link-Aufrufen und QR-Code-Scans
  - **Zeitbasierte Links**: Links mit Ablaufdatum für temporären Zugriff
  - **Passwort-geschützte Links**: Sichere Links mit Zugangskontrolle
- **Dokumenten-Anmerkungen**: Notizen und Hervorhebungen zu PDFs hinzufügen
- **Erweiterte Suche**: Volltextsuche innerhalb von PDF-Inhalten
- **Bild-Metadaten**: EXIF-Datenanzeige für Bilder
- **Diashow-Modus**: Automatische Bilddiashowfunktion
- **Dokumenten-Versionierung**: Dokumentenänderungen im Laufe der Zeit verfolgen
- **Benutzerverwaltung**: Rollenbasierte Zugriffskontrolle
- **Export-Optionen**: Funktionen für Massendownload und erweiterte Sharing-Optionen
- **Analytik**: Dokumentnutzungsstatistiken und Link-/QR-Code-Erkenntnisse

### **Technische Verbesserungen**
- **Progressive Web App**: Offline-Funktionalität und App-ähnliche Erfahrung
- **Erweiterte Performance-Optimierung**: 
  - Virtualisierung für große Ordnerstrukturen
  - Intelligentes Caching für Unterordner
  - Optimierte Rekursions-Algorithmen
- **Barrierefreiheit**: Verbesserte Screenreader-Unterstützung und Tastaturnavigation für Ordnerstrukturen
- **Tests**: Umfassende Einheits- und Integrationstests für Unterordner-Funktionalität
- **Zusätzliche Formate**: Unterstützung für weitere Dateitypen (WEBP, SVG, usw.)
- **Verbesserter Supabase-Support**: Vollständige Integration aller Supabase-Funktionen

## 🆘 Unterstützung

Für technische Unterstützung oder Fragen zur Anwendung:

1. **Überprüfen Sie die Dokumentation** in dieser README
2. **Konsultieren Sie die Unterordner-Dokumentation** - Die detaillierten Informationen zur hierarchischen Ordnerstruktur sind jetzt vollständig in diese README integriert
3. **Sehen Sie die Code-Kommentare durch** für Implementierungsdetails
4. **Kontaktieren Sie das Entwicklungsteam** für spezifische Probleme

### **Kompatibilität der Unterordner-Funktionalität**

- **Rückwärtskompatibel** mit bestehenden flachen Strukturen
- **Funktioniert mit allen unterstützten Dateitypen** (PDF, PNG, JPG, JPEG)
- **Vollständige Dark Mode-Unterstützung** für alle Unterordner-Elemente
- **Responsive Design** für Unterordner-Navigation auf allen Geräten

---

**Mit ❤️ erstellt für die Grüne Fraktion Kirchhundem**

*Diese Anwendung repräsentiert unser Engagement für digitale Transparenz und effiziente Medienverwaltung in der Lokalpolitik. Die erweiterte Unterordner-Funktionalität ermöglicht eine noch bessere Organisation und Navigation durch politische Dokumente und Materialien.*