import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Folder, 
  FolderOpen, 
  FileText, 
  Clock, 
  Heart,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Image as ImageIcon,
  Loader,
  Link as LinkIcon,
  X
} from 'lucide-react';
import { useDynamicFolders } from '../hooks/useDynamicFolders';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useUrlNavigation } from '../hooks/useUrlNavigation';
import LinkGenerator from './LinkGenerator';

const Sidebar = ({ onFileSelect, selectedFile, onFolderClick, onClose }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [expandedSubfolders, setExpandedSubfolders] = useState(new Set());
  const [activeTab, setActiveTab] = useState('folders');
  const [recentFiles, setRecentFiles] = useLocalStorage('recentFiles', []);
  const [favoriteFiles, setFavoriteFiles] = useLocalStorage('favoriteFiles', []);
  const [linkGenerator, setLinkGenerator] = useState({ show: false, bucket: null, folder: null });
  const { 
    folderStructure, 
    loading, 
    error, 
    searchFiles 
  } = useDynamicFolders();

  const { 
    urlParams, 
    navigateToPath, 
    clearNavigation, 
    isCurrentPath, 
    hasUrlNavigation 
  } = useUrlNavigation();

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchFiles(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, folderStructure, searchFiles]);

  // Handle URL navigation on load
  useEffect(() => {
    if (hasUrlNavigation && urlParams.bucket && Object.keys(folderStructure).length > 0) {
      // Auto-expand the bucket from URL
      setExpandedFolders(prev => {
        if (prev.has(urlParams.bucket)) return prev;
        return new Set([...prev, urlParams.bucket]);
      });
      
      // Auto-expand the folder path if specified
      if (urlParams.folder) {
        const folderPath = `${urlParams.bucket}/${urlParams.folder}`;
        setExpandedSubfolders(prev => {
          if (prev.has(folderPath)) return prev;
          return new Set([...prev, folderPath]);
        });
      }
    }
  }, [hasUrlNavigation, urlParams.bucket, urlParams.folder, folderStructure]);

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const toggleSubfolder = (subfolderPath) => {
    const newExpanded = new Set(expandedSubfolders);
    if (newExpanded.has(subfolderPath)) {
      newExpanded.delete(subfolderPath);
    } else {
      newExpanded.add(subfolderPath);
    }
    setExpandedSubfolders(newExpanded);
  };

  const handleFileSelect = (file) => {
    onFileSelect(file);
    
    // Add to recent files
    const updatedRecent = [file, ...recentFiles.filter(f => f.id !== file.id)].slice(0, 10);
    setRecentFiles(updatedRecent);
  };

  const toggleFavorite = (file, event) => {
    event.stopPropagation();
    const isFavorite = favoriteFiles.some(f => f.id === file.id);
    if (isFavorite) {
      setFavoriteFiles(favoriteFiles.filter(f => f.id !== file.id));
    } else {
      setFavoriteFiles([file, ...favoriteFiles]);
    }
  };

  const isFavorite = (fileId) => favoriteFiles.some(f => f.id === fileId);

  const showLinkGenerator = (bucket, folder = null) => {
    setLinkGenerator({ show: true, bucket, folder });
  };

  const hideLinkGenerator = () => {
    setLinkGenerator({ show: false, bucket: null, folder: null });
  };

  const getFileIcon = (file) => {
    if (file.type === 'pdf') {
      return <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />;
    } else if (file.type === 'image') {
      return <ImageIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
    return <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
  };

  const getFileTypeColor = (file) => {
    if (file.type === 'pdf') {
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    } else if (file.type === 'image') {
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
    return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
  };

  const renderFile = (file) => (
    <div
      key={file.id}
      onClick={() => handleFileSelect(file)}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer group transition-all duration-200 ${
        selectedFile?.id === file.id 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 shadow-soft border border-green-200 dark:border-green-700' 
          : 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:shadow-soft'
      }`}
    >
      {getFileIcon(file)}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{file.name}</p>
          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getFileTypeColor(file)}`}>
            {file.type?.toUpperCase() || 'FILE'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
          {file.folder && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              {file.folder}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={(e) => toggleFavorite(file, e)}
        className={`w-6 h-6 rounded-full transition-all duration-200 touch-manipulation bg-white dark:bg-gray-800 shadow-soft hover:shadow-md flex items-center justify-center ${
          isFavorite(file.id) ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
        }`}
      >
        <Heart 
          className={`h-3 w-3 ${isFavorite(file.id) ? 'fill-current' : ''}`} 
        />
      </button>
    </div>
  );

  // Helper function to count files in subfolder recursively
  const countFilesInSubfolder = (subfolder) => {
    let count = (subfolder.files || []).length;
    if (subfolder.subfolders) {
      Object.values(subfolder.subfolders).forEach(sf => {
        count += countFilesInSubfolder(sf);
      });
    }
    return count;
  };

  // Recursive function to render subfolders
  const renderSubfolder = (subfolder, parentPath = '', level = 0) => {
    const subfolderPath = `${parentPath}/${subfolder.name}`;
    const isExpanded = expandedSubfolders.has(subfolderPath);
    const files = subfolder.files || [];
    const subfolders = Object.values(subfolder.subfolders || {});
    const pdfCount = files.filter(f => f.type === 'pdf').length;
    const imageCount = files.filter(f => f.type === 'image').length;
    const totalSubfolderFiles = subfolders.reduce((count, sf) => count + countFilesInSubfolder(sf), 0);
    const totalFiles = pdfCount + imageCount + totalSubfolderFiles;

    return (
      <div key={subfolderPath} className="space-y-1">
        <div className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group ${
          level > 0 ? 'ml-4' : ''
        }`}>
          <div className="flex items-center space-x-2 flex-1">
            <button
              onClick={() => toggleSubfolder(subfolderPath)}
              className="flex items-center space-x-1 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              )}
            </button>
            <button
              onClick={() => {
                const bucketName = subfolderPath.split('/')[0];
                const folderPath = subfolderPath.split('/').slice(1).join('/');
                onFolderClick && onFolderClick(subfolder, folderPath, bucketName);
              }}
              className="flex items-center space-x-2 flex-1 text-left p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 text-yellow-600 dark:text-yellow-400 folder-icon-transition" />
              ) : (
                <Folder className="h-4 w-4 text-yellow-600 dark:text-yellow-400 folder-icon-transition" />
              )}
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-800 dark:group-hover:text-green-200 transition-colors duration-200">
                {subfolder.name}
              </span>
              <div className="flex items-center space-x-1">
                {totalFiles > 0 && (
                  <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full font-medium">
                    {totalFiles}
                  </span>
                )}
                {pdfCount > 0 && (
                  <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded-full font-medium">
                    {pdfCount} PDF
                  </span>
                )}
                {imageCount > 0 && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full font-medium">
                    {imageCount} IMG
                  </span>
                )}
              </div>
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const bucketName = subfolderPath.split('/')[0];
              const folderPath = subfolderPath.split('/').slice(1).join('/');
              showLinkGenerator(bucketName, folderPath);
            }}
            className="w-6 h-6 rounded-full transition-all duration-200 touch-manipulation bg-white dark:bg-gray-800 shadow-soft hover:shadow-md flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400"
            title={t('linkGenerator.shareFolder')}
          >
            <LinkIcon className="h-3 w-3" />
          </button>
        </div>
        
        {isExpanded && (
          <div className="ml-6 space-y-1 animate-slide-in">
            {/* Render files in subfolder */}
            {files.length > 0 && (
              <div className="space-y-1">
                {files.map(renderFile)}
              </div>
            )}
            
            {/* Render nested subfolders */}
            {subfolders.length > 0 && (
              <div className="space-y-1">
                {subfolders.map(nestedSubfolder => renderSubfolder(nestedSubfolder, subfolderPath, level + 1))}
              </div>
            )}
            
            {files.length === 0 && subfolders.length === 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">
                {t('sidebar.noFiles')}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFolderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center space-y-3">
            <Loader className="h-8 w-8 animate-spin text-green-600 dark:text-green-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {t('sidebar.loading')}
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center space-y-3 text-center px-4">
            <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                {t('sidebar.error')}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                Überprüfen Sie Ihre Supabase-Konfiguration
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (searchQuery) {
      return (
        <div className="space-y-1">
          {searchResults.length > 0 ? (
            searchResults.map(renderFile)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 px-3 py-4 text-center">
              {t('sidebar.noResults')}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {Object.entries(folderStructure).map(([folderId, folder]) => {
          const isExpanded = expandedFolders.has(folderId);
          const files = folder.files || [];
          const subfolders = Object.values(folder.subfolders || {});
          const pdfCount = files.filter(f => f.type === 'pdf').length;
          const imageCount = files.filter(f => f.type === 'image').length;
          const totalSubfolderFiles = subfolders.reduce((count, sf) => count + countFilesInSubfolder(sf), 0);
          const totalFiles = pdfCount + imageCount + totalSubfolderFiles;
          
          return (
            <div key={folderId} className="space-y-1">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group">
                <div className="flex items-center space-x-2 flex-1">
                  <button
                    onClick={() => toggleFolder(folderId)}
                    className="flex items-center space-x-1 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
                    )}
                  </button>
                  <button
                    onClick={() => onFolderClick && onFolderClick(folderStructure[folderId], '', folderId)}
                    className="flex items-center space-x-2 flex-1 text-left p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isExpanded ? (
                      <FolderOpen className="h-4 w-4 text-green-600 dark:text-green-400 folder-icon-transition" />
                    ) : (
                      <Folder className="h-4 w-4 text-green-600 dark:text-green-400 folder-icon-transition" />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-800 dark:group-hover:text-green-200 transition-colors duration-200">
                      {t(`folders.${folderId}`)}
                    </span>
                    <div className="flex items-center space-x-1">
                      {totalFiles > 0 && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full font-medium">
                          {totalFiles}
                        </span>
                      )}
                      {pdfCount > 0 && (
                        <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded-full font-medium">
                          {pdfCount} PDF
                        </span>
                      )}
                      {imageCount > 0 && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full font-medium">
                          {imageCount} IMG
                        </span>
                      )}
                    </div>
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showLinkGenerator(folderId);
                  }}
                  className="w-6 h-6 rounded-full transition-all duration-200 touch-manipulation bg-white dark:bg-gray-800 shadow-soft hover:shadow-md flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400"
                  title={t('linkGenerator.shareFolder')}
                >
                  <LinkIcon className="h-3 w-3" />
                </button>
              </div>
              
              {isExpanded && (
                <div className="ml-6 space-y-1 animate-slide-in">
                  {/* Render files in root of bucket */}
                  {files.length > 0 && (
                    <div className="space-y-1">
                      {files.map(renderFile)}
                    </div>
                  )}
                  
                  {/* Render subfolders */}
                  {subfolders.length > 0 && (
                    <div className="space-y-1">
                      {subfolders.map(subfolder => renderSubfolder(subfolder, folderId))}
                    </div>
                  )}
                  
                  {files.length === 0 && subfolders.length === 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">
                      {t('sidebar.noFiles')}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
      {/* Mobile Close Button */}
      {onClose && (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t('sidebar.title', 'Ordner & Dateien')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group touch-manipulation"
            aria-label={t('sidebar.close', 'Schließen')}
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
          </button>
        </div>
      )}
      
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder={t('sidebar.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'folders', icon: Folder, label: t('sidebar.folders') },
          { id: 'recent', icon: Clock, label: t('sidebar.recent') },
          { id: 'favorites', icon: Heart, label: t('sidebar.favorites') }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sidebar-scroll">
        {activeTab === 'folders' && renderFolderContent()}
        
        {activeTab === 'recent' && (
          <div className="space-y-1">
            {recentFiles.length > 0 ? (
              recentFiles.map(renderFile)
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                {t('sidebar.noResults')}
              </p>
            )}
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div className="space-y-1">
            {favoriteFiles.length > 0 ? (
              favoriteFiles.map(renderFile)
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                {t('sidebar.noResults')}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Link Generator Modal */}
      {linkGenerator.show && (
        <LinkGenerator
          bucketName={linkGenerator.bucket}
          folderPath={linkGenerator.folder}
          onClose={hideLinkGenerator}
        />
      )}
    </div>
  );
};

export default Sidebar;