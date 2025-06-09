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
  const [sortBy, setSortBy] = useState('name'); // 'name', 'type', 'size', 'date'
  const [linkGenerator, setLinkGenerator] = useState({ show: false, bucket: null, folder: null });

  // Get all files and subfolders
  const files = folderData?.files || [];
  const subfolders = Object.values(folderData?.subfolders || {});

  // Filter and sort files
  const filteredFiles = useMemo(() => {
    let filtered = files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort files
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'size':
          return (a.metadata?.size || 0) - (b.metadata?.size || 0);
        case 'date':
          return new Date(b.lastModified) - new Date(a.lastModified);
        default:
          return 0;
      }
    });

    return filtered;
  }, [files, searchQuery, sortBy]);

  // Filter subfolders
  const filteredSubfolders = useMemo(() => {
    return subfolders.filter(folder => 
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subfolders, searchQuery]);

  const getFileIcon = (file) => {
    if (file.type === 'pdf') {
      return <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />;
    } else if (file.type === 'image') {
      return <ImageIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />;
    }
    return <FileText className="h-8 w-8 text-gray-500 dark:text-gray-400" />;
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
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {folderPath ? folderPath.split('/').pop() : t(`folders.${bucketName}`)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {bucketName}
                {folderPath && ` / ${folderPath}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => showLinkGenerator(bucketName, folderPath)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              title={t('linkGenerator.shareFolder')}
            >
              <LinkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          {totalSubfolders > 0 && (
            <span className="flex items-center space-x-1">
              <Folder className="h-4 w-4" />
              <span>{totalSubfolders} {t('folderOverview.folders')}</span>
            </span>
          )}
          {totalFiles > 0 && (
            <span className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
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
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t('folderOverview.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="name">{t('folderOverview.sortByName')}</option>
            <option value="type">{t('folderOverview.sortByType')}</option>
            <option value="size">{t('folderOverview.sortBySize')}</option>
            <option value="date">{t('folderOverview.sortByDate')}</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Subfolders */}
        {filteredSubfolders.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('folderOverview.subfolders')}
            </h3>
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}>
              {filteredSubfolders.map((folder) => (
                <div
                  key={folder.name}
                  onClick={() => handleFolderClick(folder)}
                  className={`cursor-pointer group transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md'
                      : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Folder className="h-8 w-8 text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors" />
                  <div className={viewMode === 'grid' ? 'mt-2' : 'flex-1'}>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {folder.name}
                    </p>
                    {viewMode === 'list' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('folderOverview.folder')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files */}
        {filteredFiles.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('folderOverview.files')}
            </h3>
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}>
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  className={`cursor-pointer group transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md'
                      : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="relative">
                    {getFileIcon(file)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(file, e);
                      }}
                      className={`absolute -top-1 -right-1 p-1 rounded-full transition-all duration-200 ${
                        isFavorite(file.id) 
                          ? 'text-red-500 dark:text-red-400 opacity-100' 
                          : 'text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-500 dark:hover:text-red-400'
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${isFavorite(file.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className={viewMode === 'grid' ? 'mt-2 w-full' : 'flex-1 min-w-0'}>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {file.name}
                    </p>
                    <div className={`flex items-center ${viewMode === 'grid' ? 'justify-between' : 'space-x-2'} mt-1`}>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getFileTypeColor(file)}`}>
                        {file.type?.toUpperCase() || 'FILE'}
                      </span>
                      {viewMode === 'list' && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {file.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredFiles.length === 0 && filteredSubfolders.length === 0 && (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {searchQuery ? t('folderOverview.noSearchResults') : t('folderOverview.emptyFolder')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? t('folderOverview.tryDifferentSearch')
                : t('folderOverview.noFilesInFolder')
              }
            </p>
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

export default FolderOverview; 