import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MediaViewer from './components/MediaViewer';
import Footer from './components/Footer';
import DirectLinkIndicator from './components/DirectLinkIndicator';
import FolderOverview from './components/FolderOverview';
import { useUrlNavigation } from './hooks/useUrlNavigation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDynamicFolders } from './hooks/useDynamicFolders';
import './i18n/i18n';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [folderOverview, setFolderOverview] = useState(null);
  const [favoriteFiles, setFavoriteFiles] = useLocalStorage('favoriteFiles', []);
  const { ready } = useTranslation();
  const { urlParams, hasUrlNavigation, shouldShowFolderOverview, clearNavigation } = useUrlNavigation();
  const { folderStructure, loading } = useDynamicFolders();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show notification for direct link access
  useEffect(() => {
    if (hasUrlNavigation) {
      // Auto-open sidebar on mobile when accessing via direct link
      if (window.innerWidth < 768) {
        setSidebarOpen(true);
      }
    }
  }, [hasUrlNavigation]);

  // Handle URL navigation to folder overview
  useEffect(() => {
    // Only trigger if we have URL navigation, data is loaded, and we're not already showing a selected file
    if (shouldShowFolderOverview() && !loading && folderStructure && urlParams.bucket && !selectedFile) {
      const bucketData = folderStructure[urlParams.bucket];
      
      if (bucketData) {
        let targetFolderData = bucketData;
        let folderPath = '';
        
        // Navigate to specific subfolder if specified in URL
        if (urlParams.folder) {
          const pathParts = urlParams.folder.split('/');
          let currentFolder = bucketData;
          
          for (const part of pathParts) {
            if (currentFolder.subfolders && currentFolder.subfolders[part]) {
              currentFolder = currentFolder.subfolders[part];
              folderPath = folderPath ? `${folderPath}/${part}` : part;
            } else {
              // Folder not found, fallback to bucket root
              console.warn(`Subfolder "${part}" not found in path "${urlParams.folder}"`);
              break;
            }
          }
          
          targetFolderData = currentFolder;
        }
        
        // Only set folder overview if we're not already showing one or if it's different
        if (!folderOverview || 
            folderOverview.bucketName !== urlParams.bucket || 
            folderOverview.folderPath !== folderPath) {
          setFolderOverview({
            folderData: targetFolderData,
            folderPath: folderPath,
            bucketName: urlParams.bucket
          });
        }
      }
    }
  }, [shouldShowFolderOverview, loading, folderStructure, urlParams, selectedFile, folderOverview]);

  // Handle folder click from sidebar
  const handleFolderClick = (folderData, folderPath, bucketName) => {
    setFolderOverview({
      folderData,
      folderPath,
      bucketName
    });
    setSelectedFile(null);
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Handle back from folder overview
  const handleBackFromFolder = () => {
    setFolderOverview(null);
    // Clear URL parameters when going back
    clearNavigation();
  };

  // Handle file selection - clear URL parameters to allow normal file viewing
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFolderOverview(null);
    
    // Only clear URL parameters if we're currently in URL navigation mode
    if (hasUrlNavigation) {
      clearNavigation();
    }
  };

  // Handle favorite toggle
  const toggleFavorite = (file, event) => {
    event.stopPropagation();
    const isFavorite = favoriteFiles.some(f => f.id === file.id);
    if (isFavorite) {
      setFavoriteFiles(favoriteFiles.filter(f => f.id !== file.id));
    } else {
      setFavoriteFiles([file, ...favoriteFiles]);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Lade Anwendung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:relative md:translate-x-0 z-50 md:z-0
          w-80 md:w-96 h-full
          transition-transform duration-300 ease-in-out
          md:transition-none
        `}>
          <Sidebar 
            onFileSelect={(file) => {
              handleFileSelect(file);
              if (window.innerWidth < 768) {
                setSidebarOpen(false);
              }
            }}
            selectedFile={selectedFile}
            onFolderClick={handleFolderClick}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-soft transition-colors duration-300">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-sm font-medium">Ordner</span>
            </button>
          </div>
          
          {folderOverview ? (
            <FolderOverview
              folderData={folderOverview.folderData}
              folderPath={folderOverview.folderPath}
              bucketName={folderOverview.bucketName}
              onFileSelect={handleFileSelect}
              onFolderClick={handleFolderClick}
              onBack={handleBackFromFolder}
              favoriteFiles={favoriteFiles}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <MediaViewer selectedFile={selectedFile} />
          )}
        </div>
      </div>
      
      <Footer />
      <DirectLinkIndicator />
    </div>
  );
}

export default App;