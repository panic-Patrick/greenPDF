# Anpassungen für andere Grüne Ortsverbände

Diese Anleitung beschreibt alle notwendigen Änderungen, um das greenPDF-System für einen anderen Grünen Ortsverband oder eine andere Grüne Fraktion anzupassen.

## 🎨 Visuelle Anpassungen

### 1. Logo und Branding

#### Hauptlogo ersetzen
- **Dateien:** `public/assets/logo.png` und `public/assets/logo_black.png`
- **Empfohlene Größe:** Mindestens 200x200 Pixel, transparenter Hintergrund
- **Format:** PNG mit Transparenz
- **Verwendung:** Header, QR-Codes, Branding-Elemente

#### Favicon anpassen
- **Ordner:** `public/favicon/`
- **Dateien zu ersetzen:**
  - `favicon.svg` - Haupt-Favicon (SVG-Format)
  - `apple-touch-icon.png` - iOS-Icon (180x180px)
  - `favicon-32x32.png` - Standard-Favicon (32x32px)
  - `favicon-16x16.png` - Kleines Favicon (16x16px)

### 2. Farbschema ändern

#### Tailwind-Konfiguration anpassen (optional)
**Datei:** `tailwind.config.js`

Das grüne Farbschema kann beibehalten werden, da es zur Grünen Corporate Identity gehört. Falls Sie dennoch Anpassungen wünschen:

```javascript
// Beispiel für verschiedene Grün-Nuancen:
colors: {
  green: {
    // Helleres Grün für jüngere Zielgruppen:
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Hauptfarbe
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Oder dunkleres, traditionelleres Grün:
  green: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',  // Hauptfarbe
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  }
}
```

**Empfehlung:** Das bestehende Grün beibehalten für einheitliche Grüne Corporate Identity.

### 3. Titel und Untertitel

#### Header-Komponente
**Datei:** `src/components/Header.jsx`

```jsx
// Zeile 28-32 ändern:
<h1 className="text-lg sm:text-2xl font-bold text-white font-headline drop-shadow-sm truncate">
  greenPDF  {/* Name kann beibehalten werden */}
</h1>
<p className="text-xs sm:text-sm text-green-100 truncate">
  Grüne Fraktion [Ihr Ortsname]  {/* z.B. "Grüne Fraktion Köln" */}
</p>
```

#### HTML-Titel
**Datei:** `index.html`

```html
<!-- Zeile 10 ändern: -->
<title>greenPDF - Grüne Fraktion [Ihr Ortsname]</title>
```

## 📝 Rechtliche Anpassungen

### 1. Impressum komplett ersetzen

**Datei:** `src/components/ImpressumContent.jsx`

Alle Inhalte ab Zeile 32 ersetzen:

```jsx
<section>
  <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Angaben gemäß § 5 TMG</h4>
  <p className="text-gray-900 dark:text-gray-100">Bündnis 90/Die Grünen [Ihr Ortsname]</p>
  <p className="text-gray-900 dark:text-gray-100">Ihre Adresse</p>
  <p className="text-gray-900 dark:text-gray-100">PLZ Ort</p>
</section>

<section>
  <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Vertreten durch</h4>
  <p className="text-gray-900 dark:text-gray-100">Ihr Name (Fraktionsvorsitzende/r)</p>
</section>

<section>
  <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Kontakt</h4>
  <div className="text-gray-900 dark:text-gray-100">
    <span aria-label="E-Mail-Adresse:">Email: </span>
    <a 
      href="mailto:info@gruene-[ortsname].de" 
      className="text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-400"
    >
      info@gruene-[ortsname].de
    </a>
  </div>
</section>

<section>
  <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Redaktionell verantwortlich</h4>
  <p className="text-gray-900 dark:text-gray-100">Ihr Name</p>
  <div className="text-gray-900 dark:text-gray-100">
    <span aria-label="E-Mail-Adresse:">Email: </span>
    <a 
      href="mailto:redaktion@gruene-[ortsname].de" 
      className="text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-400"
    >
      redaktion@gruene-[ortsname].de
    </a>
  </div>
  <p className="text-gray-900 dark:text-gray-100">PLZ Ort</p>
</section>

<section>
  <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Hinweis zur Partei</h4>
  <p>
    Diese Website wird betrieben von der Fraktion Bündnis 90/Die Grünen im [Gemeinderat/Stadtrat/Kreistag] [Ortsname].
    Die Inhalte stellen die Positionen und Aktivitäten der Grünen Fraktion in [Ortsname] dar.
  </p>
</section>
```

### 2. Datenschutzerklärung anpassen

**Datei:** `src/components/DatenschutzContent.jsx`

**Wichtige Änderungen:**
- Alle Kontaktdaten ersetzen (E-Mail, Adresse)
- Verantwortliche Person ändern
- Bei Bedarf rechtliche Beratung einholen für vollständige DSGVO-Konformität

### 3. Footer-Informationen

**Datei:** `src/components/Footer.jsx`

```jsx
// Kontaktinformationen (Zeile 40-55):
<a 
  href="mailto:info@gruene-[ortsname].de" 
  className="text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 break-all"
>
  info@gruene-[ortsname].de
</a>

<div className="text-sm sm:text-base text-green-100">
  <div>Grüne Fraktion [Ihr Ortsname]</div>
  <div>PLZ Ort</div>
</div>

// Website-Links (Zeile 65-75):
<a
  href="https://www.gruene-[ortsname].de"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-start space-x-2 text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 group touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
>
  <span>{t('footer.website')}</span>
  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
</a>

// Social Media Links anpassen
<a
  href="https://www.instagram.com/gruene_[ortsname]"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-start space-x-2 text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 group touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
>
  <span>Instagram</span>
  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
</a>

// Copyright-Zeile (Zeile 110):
<div className="text-xs sm:text-sm text-green-200 text-center sm:text-left">
  Mit grünem Gewissen betrieben 🌱 – © 2025 Grüne Fraktion [Ihr Ortsname] | {t('footer.allRightsReserved')}
</div>
```

## 🌐 Übersetzungen anpassen

### Deutsche Übersetzungen
**Datei:** `src/i18n/locales/de.json`

```json
{
  "header": {
    "title": "greenPDF",
    "subtitle": "Grüne Fraktion [Ihr Ortsname]"
  },
  "folders": {
    "antraege": "Anträge",
    "presse": "Presse", 
    "wahlkampf": "Wahlkampf",
    "events": "Veranstaltungen",
    "documents": "Dokumente",
    // Weitere Ordner nach Bedarf hinzufügen
    "beschluesse": "Beschlüsse",
    "protokolle": "Protokolle",
    "stellungnahmen": "Stellungnahmen"
  }
}
```

### Englische Übersetzungen
**Datei:** `src/i18n/locales/en.json`

```json
{
  "header": {
    "title": "greenPDF",
    "subtitle": "Green Faction [Your Location]"
  },
  "folders": {
    "antraege": "Motions",
    "presse": "Press",
    "wahlkampf": "Campaign",
    "events": "Events", 
    "documents": "Documents"
  }
}
```

## 🗂️ Ordnerstruktur anpassen

### Supabase Storage Buckets
Erstellen Sie in Supabase Storage neue Buckets entsprechend Ihrer Bedürfnisse:

**Typische Grüne Fraktions-Ordner:**
- `antraege` - Anträge und Vorlagen
- `beschluesse` - Beschlüsse und Abstimmungen
- `protokolle` - Sitzungsprotokolle
- `presse` - Pressemitteilungen und Medienkit
- `stellungnahmen` - Stellungnahmen zu aktuellen Themen
- `wahlkampf` - Wahlkampfmaterialien
- `events` - Veranstaltungsunterlagen
- `klimaschutz` - Klimaschutz-Initiativen
- `verkehrswende` - Verkehrspolitische Dokumente
- `intern` - Interne Dokumente (mit Zugriffsbeschränkung)

### Manifest-Datei anpassen
**Datei:** `public/media/manifest.json`

```json
{
  "antraege": {
    "name": "antraege",
    "files": []
  },
  "beschluesse": {
    "name": "beschluesse", 
    "files": []
  },
  "protokolle": {
    "name": "protokolle",
    "files": []
  },
  "presse": {
    "name": "presse",
    "files": []
  },
  "stellungnahmen": {
    "name": "stellungnahmen",
    "files": []
  }
}
```

## ⚙️ Technische Konfiguration

### 1. Umgebungsvariablen
**Datei:** `.env` (erstellen falls nicht vorhanden)

```env
VITE_SUPABASE_URL=https://ihr-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=ihr-anon-key
```

### 2. Package.json anpassen
**Datei:** `package.json`

```json
{
  "name": "greenpdf-[ortsname]",
  "description": "Dokumentenverwaltung für Grüne Fraktion [Ortsname]",
  "author": "Grüne Fraktion [Ortsname]",
  "homepage": "https://www.gruene-[ortsname].de"
}
```

### 3. README.md anpassen
Passen Sie die README.md-Datei an Ihren Grünen Ortsverband an:
- Ortsname ersetzen (von "Kirchhundem" zu Ihrem Ort)
- Kontaktinformationen aktualisieren
- Spezifische Funktionen Ihrer Installation beschreiben
- Grüne Corporate Identity beibehalten

## 🚀 Deployment-Anpassungen

### Netlify/Vercel Konfiguration
Bei der Bereitstellung auf Hosting-Plattformen:

1. **Umgebungsvariablen setzen:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. **Build-Einstellungen:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

3. **Domain konfigurieren:**
   - Custom Domain auf Ihren Grünen Ortsverband anpassen (z.B. pdf.gruene-[ortsname].de)
   - SSL-Zertifikat aktivieren

## 📋 Checkliste für die Anpassung

### Vor der Anpassung
- [ ] Supabase-Projekt erstellen
- [ ] Storage Buckets anlegen
- [ ] Grünes Logo für Ihren Ortsverband vorbereiten
- [ ] Rechtliche Texte (Impressum, Datenschutz) für Ihren Ortsverband erstellen lassen
- [ ] Grünes Farbschema beibehalten oder leicht anpassen

### Dateien anpassen
- [ ] `public/assets/logo.png` und `logo_black.png` ersetzen
- [ ] `public/favicon/` alle Favicon-Dateien ersetzen
- [ ] `tailwind.config.js` Farbschema anpassen
- [ ] `src/components/Header.jsx` Titel und Untertitel ändern
- [ ] `src/components/Footer.jsx` Kontaktdaten und Links anpassen
- [ ] `src/components/ImpressumContent.jsx` komplett ersetzen
- [ ] `src/components/DatenschutzContent.jsx` anpassen
- [ ] `src/i18n/locales/de.json` Übersetzungen anpassen
- [ ] `src/i18n/locales/en.json` Übersetzungen anpassen
- [ ] `index.html` Titel anpassen
- [ ] `package.json` Projektinformationen aktualisieren
- [ ] `README.md` anpassen

### Nach der Anpassung
- [ ] Lokale Tests durchführen
- [ ] Alle Links und E-Mail-Adressen testen
- [ ] Responsive Design auf verschiedenen Geräten testen
- [ ] Rechtschreibung und Grammatik prüfen
- [ ] Deployment konfigurieren
- [ ] Live-Tests nach Deployment

## 🔧 Erweiterte Anpassungen

### Zusätzliche Funktionen
Je nach Bedarf können Sie weitere Anpassungen vornehmen:

1. **Benutzerauthentifizierung:** Für interne Dokumente
2. **Kategorien erweitern:** Weitere Ordnertypen hinzufügen
3. **Suchfunktion:** Erweiterte Suchfilter implementieren
4. **Benachrichtigungen:** E-Mail-Benachrichtigungen bei neuen Dokumenten
5. **Kommentarfunktion:** Für interne Diskussionen zu Dokumenten

### Design-Anpassungen
- **Schriftarten:** Corporate Design Fonts einbinden
- **Layout:** Anpassung der Seitenstruktur
- **Icons:** Partei-spezifische Icons verwenden
- **Animationen:** Anpassung der Übergangseffekte

## 📞 Support und Wartung

### Regelmäßige Wartung
- Supabase-Speicher überwachen
- Sicherheitsupdates einspielen
- Backup-Strategie implementieren
- Performance-Monitoring

### Dokumentation
- Benutzerhandbuch für Redakteure erstellen
- Technische Dokumentation pflegen
- Änderungsprotokoll führen

---

**Wichtiger Hinweis:** Diese Anleitung deckt die wichtigsten Anpassungen ab. Je nach spezifischen Anforderungen Ihres Grünen Ortsverbands können weitere Änderungen notwendig sein. Bei rechtlichen Fragen (Impressum, Datenschutz) sollten Sie sich von einem Anwalt beraten lassen.

**Grüne Corporate Identity:** Das System wurde speziell für Grüne Ortsverbände entwickelt. Das grüne Farbschema und die Bezeichnung "greenPDF" können in der Regel beibehalten werden, da sie zur einheitlichen Grünen Markenidentität beitragen. 