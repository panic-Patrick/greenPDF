import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Download, 
  Printer,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Minimize
} from 'lucide-react';
import { usePDFViewer } from '../hooks/usePDFViewer';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ImageViewer = ({ file, scale, onZoomIn, onZoomOut, onResetZoom, isFullscreen, onToggleFullscreen }) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-green rounded-xl overflow-hidden transition-colors duration-300">
        {imageError ? (
          <div className="flex items-center justify-center h-64 sm:h-96 w-full max-w-sm sm:max-w-md md:w-96">
            <div className="text-center">
              <ImageIcon className="h-16 w-16 text-red-400 dark:text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400">{t('viewer.error')}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-400"></div>
              </div>
            )}
            <img
              src={file.path}
              alt={file.name}
              style={{ 
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                maxWidth: isFullscreen ? '90vw' : '100%',
                maxHeight: isFullscreen ? '80vh' : '70vh',
                width: 'auto',
                height: 'auto'
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className="block transition-transform duration-200 w-full h-auto object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const PDFViewerComponent = ({ file, ...pdfProps }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-green rounded-xl overflow-hidden transition-colors duration-300 w-full max-w-4xl">
        <Document
          file={file.path}
          onLoadSuccess={pdfProps.onDocumentLoadSuccess}
          onLoadError={pdfProps.onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center h-64 sm:h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-400"></div>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-64 sm:h-96">
              <p className="text-red-600 dark:text-red-400">{t('viewer.error')}</p>
            </div>
          }
        >
          <Page
            pageNumber={pdfProps.pageNumber}
            scale={pdfProps.scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-green w-full"
            width={window.innerWidth < 768 ? Math.min(window.innerWidth - 32, 600) : undefined}
          />
        </Document>
      </div>
    </div>
  );
};

const MediaViewer = ({ selectedFile }) => {
  const { t } = useTranslation();
  const {
    numPages,
    pageNumber,
    scale,
    isFullscreen,
    loading,
    error,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    goToPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToWidth,
    toggleFullscreen,
  } = usePDFViewer();

  const [pageInput, setPageInput] = useState('');

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (page && page >= 1 && page <= numPages) {
      goToPage(page);
    }
    setPageInput('');
  };

  const downloadFile = () => {
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = selectedFile.path;
      link.download = selectedFile.name;
      link.click();
    }
  };

  const printFile = () => {
    if (selectedFile) {
      if (selectedFile.type === 'image') {
        // For images, open in new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head><title>Print ${selectedFile.name}</title></head>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;">
              <img src="${selectedFile.path}" style="max-width:100%;max-height:100%;object-fit:contain;" />
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      } else {
        window.open(selectedFile.path, '_blank');
      }
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-green">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 font-headline">
            {t('viewer.noDocument')}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t('header.subtitle')}
          </p>
        </div>
      </div>
    );
  }

  const isPDF = selectedFile.type === 'pdf';
  const isImage = selectedFile.type === 'image';

  return (
    <div className={`flex-1 flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3 shadow-soft transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {isPDF ? (
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              ) : (
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              )}
              <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate font-headline">
                {selectedFile.name}
              </h2>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isPDF 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {selectedFile.type.toUpperCase()}
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                {selectedFile.size}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={downloadFile}
              className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 transition-all duration-200 group touch-manipulation"
              title={t('viewer.download')}
            >
              <Download className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
            </button>
            <button
              onClick={printFile}
              className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 transition-all duration-200 group touch-manipulation"
              title={t('viewer.print')}
            >
              <Printer className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 transition-all duration-200 group touch-manipulation"
              title={isFullscreen ? t('viewer.exitFullscreen') : t('viewer.fullscreen')}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              ) : (
                <Maximize className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile file info */}
        <div className="sm:hidden mt-2 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span className={`px-2 py-1 rounded-full font-medium ${
            isPDF 
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
          }`}>
            {selectedFile.type.toUpperCase()}
          </span>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
            {selectedFile.size}
          </span>
        </div>
      </div>

      {/* Controls */}
      {selectedFile && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 shadow-soft transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* PDF-specific page controls */}
              {isPDF && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group touch-manipulation"
                    title={t('viewer.prevPage')}
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
                  </button>
                  
                  <form onSubmit={handlePageInputSubmit} className="flex items-center space-x-1 sm:space-x-2">
                    <input
                      type="text"
                      value={pageInput || pageNumber}
                      onChange={handlePageInputChange}
                      onBlur={() => setPageInput('')}
                      className="w-10 sm:w-12 px-1 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded text-center focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {t('viewer.of')} {numPages || '–'}
                    </span>
                  </form>
                  
                  <button
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group touch-manipulation"
                    title={t('viewer.nextPage')}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Zoom controls for both PDFs and images */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={zoomOut}
                className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 transition-all duration-200 group touch-manipulation"
                title={t('viewer.zoomOut')}
              >
                <ZoomOut className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              </button>
              
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2 bg-green-50 dark:bg-green-900/30 rounded-md py-1 font-medium">
                {Math.round(scale * 100)}%
              </span>
              
              <button
                onClick={zoomIn}
                className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 transition-all duration-200 group touch-manipulation"
                title={t('viewer.zoomIn')}
              >
                <ZoomIn className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              </button>
              
              {isPDF && (
                <button
                  onClick={fitToWidth}
                  className="hidden sm:block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-500 transition-all duration-200 text-gray-700 dark:text-gray-200 touch-manipulation"
                  title={t('viewer.fitToWidth')}
                >
                  {t('viewer.fitToWidth')}
                </button>
              )}
              
              <button
                onClick={resetZoom}
                className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/30 active:bg-green-200 dark:active:bg-green-900/50 transition-all duration-200 group touch-manipulation"
                title={t('viewer.actualSize')}
              >
                <RotateCcw className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Content */}
      <div className="flex-1 overflow-auto p-2 sm:p-4">
        {loading && (
          <div className="flex items-center justify-center h-64 sm:h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">{t('viewer.loading')}</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-64 sm:h-96">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-2">{t('viewer.error')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && selectedFile && (
          <>
            {isPDF ? (
              <PDFViewerComponent
                file={selectedFile}
                pageNumber={pageNumber}
                scale={scale}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
                onDocumentLoadError={onDocumentLoadError}
              />
            ) : (
              <ImageViewer
                file={selectedFile}
                scale={scale}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onResetZoom={resetZoom}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MediaViewer;