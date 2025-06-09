import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  Image as ImageIcon, 
  ArrowLeft,
  Grid,
  List,
  Search,
  Download,
  Heart,
  Link as LinkIcon
} from 'lucide-react';
import LinkGenerator from './LinkGenerator';

const FolderOverview = ({ 
  folderData, 
  folderPath, 
  bucketName, 
  onFileSelect, 
  onFolderClick, 
  onBack, 
  onShowLinkGenerator,
  favoriteFiles = [],
  onToggleFavorite 
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc', 'name-desc', 'type-asc', etc.
  const [linkGenerator, setLinkGenerator] = useState({ show: false, bucket: null, folder: null });

  // Get all files and subfolders
  const files = folderData?.files || [];
  const subfolders = Object.values(folderData?.subfolders || {});

  // Filter and sort files
  const filteredFiles = useMemo(() => {
    let filtered = files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Parse sort option
    const [sortField, sortDirection] = sortBy.split('-');

    // Sort files
    filtered.sort((a, b) => {
      let result = 0;
      
      switch (sortField) {
        case 'name':
          result = a.name.localeCompare(b.name, 'de', { numeric: true, sensitivity: 'base' });
          break;
        
        case 'type':
          const typeA = a.type || '';
          const typeB = b.type || '';
          result = typeA.localeCompare(typeB);
          break;
        
        case 'size':
          // Parse size strings like "1.2 MB", "500 KB", etc.
          const parseSize = (sizeStr) => {
            if (!sizeStr || typeof sizeStr !== 'string') return 0;
            
            const match = sizeStr.match(/^([\d.]+)\s*(bytes?|kb|mb|gb)$/i);
            if (!match) return 0;
            
            const value = parseFloat(match[1]);
            const unit = match[2].toLowerCase();
            
            switch (unit) {
              case 'gb': return value * 1024 * 1024 * 1024;
              case 'mb': return value * 1024 * 1024;
              case 'kb': return value * 1024;
              case 'bytes':
              case 'byte':
              default: return value;
            }
          };
          
          const sizeA = parseSize(a.size);
          const sizeB = parseSize(b.size);
          result = sizeA - sizeB;
          break;
        
        case 'date':
          // Handle different date formats
          const parseDate = (dateStr) => {
            if (!dateStr) return new Date(0);
            
            // Try parsing as ISO string first
            let date = new Date(dateStr);
            if (isNaN(date.getTime())) {
              // Try parsing as YYYY-MM-DD format
              const parts = dateStr.split('-');
              if (parts.length === 3) {
                date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
              }
            }
            
            return isNaN(date.getTime()) ? new Date(0) : date;
          };
          
          const dateA = parseDate(a.lastModified);
          const dateB = parseDate(b.lastModified);
          result = dateB.getTime() - dateA.getTime(); // Default: newest first for date
          break;
        
        default:
          result = 0;
      }
      
      // Apply sort direction
      return sortDirection === 'desc' ? -result : result;
    });

    return filtered;
  }, [files, searchQuery, sortBy]);

  // Filter subfolders
  const filteredSubfolders = useMemo(() => {
    let filtered = subfolders.filter(folder => 
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort subfolders by name (always by name for folders)
    filtered.sort((a, b) => {
      return a.name.localeCompare(b.name, 'de', { numeric: true, sensitivity: 'base' });
    });

    return filtered;
  }, [subfolders, searchQuery]);

  const getFileIcon = (file) => {
    if (file.type === 'pdf') {
      return <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />;
    } else if (file.type === 'image') {
      return <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />;
    }
    return <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />;
  };

  const getFileTypeColor = (file) => {
    if (file.type === 'pdf') {
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    } else if (file.type === 'image') {
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
    return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
  };

  const isFavorite = (fileId) => favoriteFiles.some(f => f.id === fileId);

  const handleFileClick = (file) => {
    onFileSelect(file);
  };

  const handleFolderClick = (folder) => {
    const newPath = folderPath ? `${folderPath}/${folder.name}` : folder.name;
    onFolderClick(folder, newPath);
  };

  const showLinkGenerator = (bucket, folder = null) => {
    setLinkGenerator({ show: true, bucket, folder });
  };

  const hideLinkGenerator = () => {
    setLinkGenerator({ show: false, bucket: null, folder: null });
  };

  const totalFiles = files.length;
  const totalSubfolders = subfolders.length;
  const pdfCount = files.filter(f => f.type === 'pdf').length;
  const imageCount = files.filter(f => f.type === 'image').length;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-colors touch-manipulation flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                {folderPath ? folderPath.split('/').pop() : t(`folders.${bucketName}`)}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {bucketName}
                {folderPath && ` / ${folderPath}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => showLinkGenerator(bucketName, folderPath)}
              className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 active:bg-green-300 dark:active:bg-green-900/70 rounded-lg transition-all duration-200 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 touch-manipulation shadow-sm hover:shadow-md"
              title={t('linkGenerator.shareFolder')}
            >
              <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-sm font-medium">Teilen</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {totalSubfolders > 0 && (
            <span className="flex items-center space-x-1">
              <Folder className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{totalSubfolders} {t('folderOverview.folders')}</span>
            </span>
          )}
          {totalFiles > 0 && (
            <span className="flex items-center space-x-1">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{totalFiles} {t('folderOverview.files')}</span>
            </span>
          )}
          {pdfCount > 0 && (
            <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs">
              {pdfCount} PDF
            </span>
          )}
          {imageCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
              {imageCount} IMG
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t('folderOverview.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="type-asc">Typ (A-Z)</option>
              <option value="type-desc">Typ (Z-A)</option>
              <option value="size-asc">Größe (Klein-Groß)</option>
              <option value="size-desc">Größe (Groß-Klein)</option>
              <option value="date-desc">Datum (Neueste zuerst)</option>
              <option value="date-asc">Datum (Älteste zuerst)</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg h-10">
              <button
                onClick={() => setViewMode('grid')}
                className={`h-full px-3 rounded-l-lg transition-all duration-200 touch-manipulation flex items-center justify-center ${
                  viewMode === 'grid'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title={t('folderOverview.gridView')}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`h-full px-3 rounded-r-lg transition-all duration-200 touch-manipulation flex items-center justify-center ${
                  viewMode === 'list'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title={t('folderOverview.listView')}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {filteredSubfolders.length === 0 && filteredFiles.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Folder className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? t('folderOverview.noResults') : t('folderOverview.emptyFolder')}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Subfolders */}
            {filteredSubfolders.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('folderOverview.folders')} ({filteredSubfolders.length})
                </h3>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4' 
                  : 'space-y-2'
                }>
                  {filteredSubfolders.map((folder) => (
                    <div
                      key={folder.name}
                      className={`cursor-pointer group transition-all duration-200 touch-manipulation relative ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-gray-700 rounded-xl p-3 sm:p-4 shadow-soft hover:shadow-green border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                          : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleFolderClick(folder)}
                    >
                      {viewMode === 'grid' ? (
                        <div className="text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200">
                            <Folder className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {folder.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {(folder.files?.length || 0) + Object.keys(folder.subfolders || {}).length} {t('folderOverview.items')}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Folder className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {folder.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(folder.files?.length || 0) + Object.keys(folder.subfolders || {}).length} {t('folderOverview.items')}
                            </p>
                          </div>
                        </>
                      )}
                      
                      {/* Share folder button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newPath = folderPath ? `${folderPath}/${folder.name}` : folder.name;
                          showLinkGenerator(bucketName, newPath);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 touch-manipulation bg-white dark:bg-gray-800 shadow-soft hover:shadow-md text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 flex items-center justify-center"
                        title={t('linkGenerator.shareFolder')}
                      >
                        <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Files */}
            {filteredFiles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('folderOverview.files')} ({filteredFiles.length})
                </h3>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4' 
                  : 'space-y-2'
                }>
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => handleFileClick(file)}
                      className={`cursor-pointer group transition-all duration-200 relative touch-manipulation ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-gray-700 rounded-xl p-3 sm:p-4 shadow-soft hover:shadow-green border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                          : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {viewMode === 'grid' ? (
                        <div className="text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-soft group-hover:scale-105 transition-transform duration-200">
                            {getFileIcon(file)}
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1">
                            {file.name}
                          </p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file)}`}>
                              {file.type?.toUpperCase() || 'FILE'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {file.size}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center shadow-soft flex-shrink-0">
                            {getFileIcon(file)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {file.name}
                              </p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file)}`}>
                                {file.type?.toUpperCase() || 'FILE'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {file.size}
                            </p>
                          </div>
                        </>
                      )}
                      
                      {/* Favorite button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(file, e);
                        }}
                        className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 touch-manipulation bg-white dark:bg-gray-800 shadow-soft hover:shadow-md flex items-center justify-center ${
                          isFavorite(file.id) 
                            ? 'text-red-500 dark:text-red-400' 
                            : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
                        }`}
                      >
                        <Heart 
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite(file.id) ? 'fill-current' : ''}`} 
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Link Generator Modal */}
      {linkGenerator.show && (
        <LinkGenerator
          bucket={linkGenerator.bucket}
          folder={linkGenerator.folder}
          onClose={hideLinkGenerator}
        />
      )}
    </div>
  );
};

export default FolderOverview; 