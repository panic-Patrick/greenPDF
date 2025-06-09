# Unterordner-Funktionalität in greenPDF

## Übersicht

Die greenPDF-Anwendung wurde erweitert, um Unterordner in Supabase Storage Buckets zu unterstützen. Diese Funktionalität ermöglicht es, eine hierarchische Ordnerstruktur zu erstellen und zu navigieren.

## Neue Funktionen

### 1. Rekursive Ordner-Auflistung

- **Datei**: `src/lib/supabaseClient.js`
- **Funktion**: `listFilesAndFoldersRecursively()`
- Lädt rekursiv alle Dateien und Ordner aus einem Supabase Storage Bucket

### 2. Hierarchische Datenstruktur

- **Datei**: `src/api/supabaseStorage.js`
- **Funktionen**: 
  - `createFolderStructure()` - Erstellt eine verschachtelte Ordnerstruktur
  - `processFilesRecursively()` - Verarbeitet Dateien rekursiv
  - `getAllFilesRecursively()` - Holt alle Dateien aus der Hierarchie
  - `countFilesRecursively()` - Zählt Dateien rekursiv

### 3. Erweiterte UI-Komponenten

- **Datei**: `src/components/Sidebar.jsx`
- **Funktionen**:
  - `renderSubfolder()` - Rendert Unterordner rekursiv
  - `toggleSubfolder()` - Klappt Unterordner aus/ein
  - `countFilesInSubfolder()` - Zählt Dateien in Unterordnern

## Verwendung

### Ordnerstruktur in Supabase Storage

Erstellen Sie Unterordner in Ihren Supabase Storage Buckets:

```
antraege/
├── 2024/
│   ├── januar/
│   │   ├── antrag1.pdf
│   │   └── antrag2.pdf
│   └── februar/
│       └── antrag3.pdf
├── 2023/
│   └── archiv/
│       └── alte_antraege.pdf
└── vorlagen/
    └── vorlage.pdf

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

### UI-Funktionen

1. **Hauptordner ausklappen**: Klicken Sie auf einen Bucket-Namen (z.B. "Anträge")
2. **Unterordner ausklappen**: Klicken Sie auf einen Unterordner-Namen
3. **Dateien anzeigen**: Dateien werden in jedem Ordner angezeigt
4. **Datei-Zähler**: Zeigt die Anzahl der Dateien in jedem Ordner an
5. **Typ-Badges**: PDF- und Bild-Dateien werden separat gezählt

### Visuelle Unterscheidung

- **Hauptordner**: Grüne Ordner-Icons
- **Unterordner**: Gelbe Ordner-Icons
- **Einrückung**: Unterordner sind visuell eingerückt
- **Animationen**: Sanfte Ausklapp-Animationen

## Technische Details

### Datenstruktur

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

### State Management

- `expandedFolders`: Set der ausgeklappten Hauptordner
- `expandedSubfolders`: Set der ausgeklappten Unterordner (mit vollständigem Pfad)

### Performance-Optimierungen

- Lazy Loading: Unterordner werden nur geladen, wenn sie ausgeklappt werden
- Caching: Geladene Strukturen werden im State gecacht
- Rekursive Zählung: Effiziente Berechnung der Datei-Anzahl

## CSS-Animationen

Neue CSS-Klassen in `src/index.css`:

- `.animate-slide-in`: Sanfte Einblend-Animation
- `.folder-icon-transition`: Hover-Effekte für Ordner-Icons
- `.sidebar-scroll`: Benutzerdefinierte Scrollbar

## Kompatibilität

- Rückwärtskompatibel mit bestehenden flachen Strukturen
- Funktioniert mit allen unterstützten Dateitypen (PDF, PNG, JPG, JPEG)
- Unterstützt Dark Mode

## Zukünftige Erweiterungen

- Drag & Drop für Dateien zwischen Ordnern
- Ordner-Erstellung über die UI
- Ordner-Umbenennung
- Ordner-Löschung
- Bulk-Operationen auf Ordner-Ebene 