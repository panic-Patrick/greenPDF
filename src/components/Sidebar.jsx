import React, { useState, useMemo } from 'react';
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
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useDynamicFolders } from '../hooks/useDynamicFolders';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Sidebar = ({ onFileSelect, selectedFile }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['antraege', 'presse', 'wahlkampf']));
  const [activeTab, setActiveTab] = useState('folders');
  const [recentFiles, setRecentFiles] = useLocalStorage('recentFiles', []);
  const [favoriteFiles, setFavoriteFiles] = useLocalStorage('favoriteFiles', []);

  const { 
    folderStructure, 
    loading, 
    error, 
    refreshFolders, 
    searchFiles 
  } = useDynamicFolders();

  const searchResults = useMemo(() => {
    return searchFiles(searchQuery);
  }, [searchQuery, searchFiles]);

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
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
      <FileText className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${
        selectedFile?.id === file.id ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400'
      }`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{file.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
      </div>
      <button
        onClick={(e) => toggleFavorite(file, e)}
        className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 ${
          isFavorite(file.id) ? 'text-red-500 dark:text-red-400 opacity-100' : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
        }`}
      >
        <Heart 
          className={`h-3 w-3 ${isFavorite(file.id) ? 'fill-current' : ''}`} 
        />
      </button>
    </div>
  );

  const renderFolderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('sidebar.loading')}</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={refreshFolders}
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 mx-auto shadow-green"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{t('sidebar.retry')}</span>
            </button>
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
          
          return (
            <div key={folderId} className="space-y-1">
              <div
                onClick={() => toggleFolder(folderId)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
                )}
                {isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Folder className="h-4 w-4 text-green-600 dark:text-green-400" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-800 dark:group-hover:text-green-200 transition-colors duration-200">
                  {t(`folders.${folderId}`)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                  {files.length}
                </span>
              </div>
              
              {isExpanded && (
                <div className="ml-6 space-y-1 animate-slide-in">
                  {files.length > 0 ? (
                    files.map(renderFile)
                  ) : (
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
        
        {/* Refresh Button */}
        <button
          onClick={refreshFolders}
          disabled={loading}
          className="mt-2 w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <RefreshCw className={`h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 ${loading ? 'animate-spin' : ''}`} />
          <span className="text-gray-700 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">{t('sidebar.refresh')}</span>
        </button>
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
      <div className="flex-1 overflow-y-auto p-4">
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
    </div>
  );
};

export default Sidebar;