# greenPDF

**Grüne Fraktion Kirchhundem - Media Document Management System**

A modern, responsive media viewer and management system built specifically for the Green Faction of Kirchhundem. This application provides an intuitive interface for organizing, viewing, and managing political documents and images across different categories.

![greenPDF Screenshot](https://via.placeholder.com/800x400/22c55e/ffffff?text=greenPDF+Interface)

## ✨ Features

### 📱 **Modern User Interface**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes with system preference detection
- **Professional Branding**: Custom green color scheme matching political identity
- **Smooth Animations**: Micro-interactions and transitions for enhanced user experience

### 📁 **Media Management**
- **Multi-Format Support**: View PDFs, PNG, JPG, and JPEG files
- **Organized Categories**: Documents sorted into three main folders:
  - **Anträge** (Applications): Official applications and proposals
  - **Presse** (Press): Press releases and media materials
  - **Wahlkampf** (Campaign): Campaign materials and election documents
- **Dynamic File Discovery**: Automatic scanning and manifest generation for media files
- **Search Functionality**: Real-time search across all documents and images
- **Favorites System**: Mark frequently used files as favorites
- **Recent Files**: Quick access to recently viewed documents
- **File Type Indicators**: Visual badges showing PDF or image file types

### 🔍 **Advanced Media Viewer**
- **PDF Rendering**: High-quality PDF display powered by PDF.js
- **Image Viewer**: Optimized image viewing with zoom controls
- **Zoom Controls**: Zoom in/out, fit to width, and actual size options
- **Page Navigation**: Easy PDF page navigation with input controls
- **Fullscreen Mode**: Distraction-free document and image viewing
- **Download & Print**: Direct download and print functionality for all file types
- **Loading States**: Smooth loading indicators and error handling

### 🌐 **Internationalization**
- **Bilingual Support**: German (primary) and English languages
- **Dynamic Language Switching**: Toggle between languages instantly
- **Localized Content**: All interface elements properly translated
- **Browser Language Detection**: Automatic language detection based on browser settings

### 💾 **Data Persistence**
- **Local Storage**: Favorites and recent files persist across sessions
- **Settings Memory**: Dark mode and language preferences saved locally
- **Offline Capability**: Core functionality works without internet connection

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greenpdf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add media files**
   - Place PDF and image files in the appropriate folders under `public/media/`:
     - `public/media/antraege/` - for applications and proposals
     - `public/media/presse/` - for press materials
     - `public/media/wahlkampf/` - for campaign documents

4. **Generate manifest** (optional)
   ```bash
   npm run generate-manifest
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist/` directory.

## 📂 Project Structure

```
greenpdf/
├── public/
│   ├── assets/
│   │   └── logo.png              # Organization logo
│   └── media/
│       ├── antraege/             # Application documents & images
│       ├── presse/               # Press materials & images
│       ├── wahlkampf/            # Campaign documents & images
│       └── manifest.json         # Auto-generated file index
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Main header with branding
│   │   ├── Sidebar.jsx           # Document navigation sidebar
│   │   ├── MediaViewer.jsx       # PDF & image display component
│   │   └── Footer.jsx            # Footer with legal links
│   ├── hooks/
│   │   ├── useDarkMode.js        # Dark mode state management
│   │   ├── useDynamicFolders.js  # Dynamic file discovery
│   │   ├── useLocalStorage.js    # Local storage utilities
│   │   └── usePDFViewer.js       # PDF viewer state management
│   ├── i18n/
│   │   ├── i18n.js               # Internationalization setup
│   │   └── locales/
│   │       ├── de.json           # German translations
│   │       └── en.json           # English translations
│   ├── api/
│   │   └── fileScanner.js        # File discovery utilities
│   └── App.jsx                   # Main application component
├── scripts/
│   └── generate-manifest.js      # Manifest generation script
└── package.json
```

## 🛠️ Technical Stack

### **Frontend Framework**
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced development experience

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Custom Design System**: Green-themed color palette and components

### **Media Handling**
- **react-pdf**: React wrapper for PDF.js for PDF rendering
- **PDF.js**: Mozilla's PDF rendering library
- **Native Image Support**: Optimized image viewing for PNG, JPG, JPEG

### **Internationalization**
- **react-i18next**: React integration for i18next
- **i18next**: Internationalization framework
- **Browser Language Detection**: Automatic language detection

### **State Management**
- **React Hooks**: useState, useEffect, custom hooks
- **Local Storage**: Persistent client-side storage
- **Context-free Architecture**: Prop drilling for simple state management

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run generate-manifest` | Generate media file manifest |
| `npm run lint` | Run ESLint code analysis |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### **Adding New Media Files**

1. **Place files** in the appropriate folder under `public/media/`
   - Supported formats: PDF, PNG, JPG, JPEG
2. **Run manifest generation**:
   ```bash
   npm run generate-manifest
   ```
3. **Restart development server** if running

### **Supported File Types**

- **PDFs**: `.pdf` - Rendered using PDF.js with full navigation controls
- **Images**: `.png`, `.jpg`, `.jpeg` - Native image viewer with zoom controls

### **Customizing Translations**

Edit the translation files in `src/i18n/locales/`:
- `de.json` - German translations
- `en.json` - English translations

### **Modifying Color Scheme**

The color scheme is defined in `tailwind.config.js`. Modify the `colors.green` and `colors.emerald` sections to change the theme.

### **Logo Replacement**

Replace `public/assets/logo.png` with your organization's logo. The component will automatically use the new logo.

## 🌟 Key Features Explained

### **Multi-Format Support**

The application automatically detects and handles different file types:
- **PDFs**: Full-featured viewer with page navigation, zoom controls, and text rendering
- **Images**: Optimized image viewer with zoom capabilities and fullscreen mode

### **Dynamic File Discovery**

The application automatically discovers media files in the designated folders and generates a manifest for efficient loading. The `generate-manifest.js` script scans the folder structure and creates metadata for each file, including file type detection.

### **Responsive Design**

The interface adapts to different screen sizes:
- **Desktop**: Full sidebar and viewer layout
- **Tablet**: Collapsible sidebar with overlay
- **Mobile**: Hidden sidebar with toggle button

### **File Type Indicators**

Visual indicators help users quickly identify file types:
- **PDF files**: Red badge with "PDF" label and document icon
- **Image files**: Blue badge with "IMG" label and image icon

### **Enhanced Search**

Real-time search across all media files:
- Searches file names and metadata
- Instant results as you type
- Highlights matching documents and images
- Cross-folder search capability

## 🚀 Deployment

### **Static Hosting**

The application can be deployed to any static hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service

### **Recommended Hosting Platforms**
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud storage with CloudFront CDN

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly** with both PDFs and images
5. **Submit a pull request**

### **Code Style**

- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design principles
- Test in both light and dark modes
- Test with different file types

## 📄 License

This project is developed for the Grüne Fraktion Kirchhundem. Please contact the organization for licensing information.

## 🆘 Support

For technical support or questions about the application:

1. **Check the documentation** in this README
2. **Review the code comments** for implementation details
3. **Contact the development team** for specific issues

## 🔮 Future Enhancements

### **Planned Features**
- **Document Annotations**: Add notes and highlights to PDFs
- **Advanced Search**: Full-text search within PDF content
- **Image Metadata**: EXIF data display for images
- **Slideshow Mode**: Automatic image slideshow functionality
- **Document Versioning**: Track document changes over time
- **User Management**: Role-based access control
- **Export Options**: Bulk download and sharing features
- **Analytics**: Document usage statistics and insights

### **Technical Improvements**
- **Progressive Web App**: Offline functionality and app-like experience
- **Performance Optimization**: Lazy loading and caching strategies
- **Accessibility**: Enhanced screen reader support and keyboard navigation
- **Testing**: Comprehensive unit and integration tests
- **Additional Formats**: Support for more file types (WEBP, SVG, etc.)

---

**Built with ❤️ for the Grüne Fraktion Kirchhundem**

*This application represents our commitment to digital transparency and efficient media management in local politics.*