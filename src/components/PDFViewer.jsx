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
  FileText
} from 'lucide-react';
import { usePDFViewer } from '../hooks/usePDFViewer';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ selectedFile }) => {
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
      window.open(selectedFile.path, '_blank');
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-green">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-headline">
            {t('viewer.noDocument')}
          </h3>
          <p className="text-gray-600">
            {t('header.subtitle')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900 truncate max-w-xs font-headline">
              {selectedFile.name}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">{selectedFile.size}</span>
              <span>•</span>
              <span>{selectedFile.lastModified}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadFile}
              className="p-2 rounded-lg hover:bg-green-100 transition-all duration-200 group"
              title={t('viewer.download')}
            >
              <Download className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
            </button>
            <button
              onClick={printFile}
              className="p-2 rounded-lg hover:bg-green-100 transition-all duration-200 group"
              title={t('viewer.print')}
            >
              <Printer className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-green-100 transition-all duration-200 group"
              title={t('viewer.fullscreen')}
            >
              <Maximize className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Controls */}
      {selectedFile && (
        <div className="bg-white border-b border-gray-200 px-4 py-2 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={pageNumber <= 1}
                  className="p-1 rounded hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                  title={t('viewer.prevPage')}
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
                </button>
                
                <form onSubmit={handlePageInputSubmit} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={pageInput || pageNumber}
                    onChange={handlePageInputChange}
                    onBlur={() => setPageInput('')}
                    className="w-12 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                  <span className="text-sm text-gray-600">
                    {t('viewer.of')} {numPages || '–'}
                  </span>
                </form>
                
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  className="p-1 rounded hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                  title={t('viewer.nextPage')}
                >
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                className="p-1 rounded hover:bg-green-100 transition-all duration-200 group"
                title={t('viewer.zoomOut')}
              >
                <ZoomOut className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
              </button>
              
              <span className="text-sm text-gray-600 px-2 bg-green-50 rounded-md py-1 font-medium">
                {Math.round(scale * 100)}%
              </span>
              
              <button
                onClick={zoomIn}
                className="p-1 rounded hover:bg-green-100 transition-all duration-200 group"
                title={t('viewer.zoomIn')}
              >
                <ZoomIn className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
              </button>
              
              <button
                onClick={fitToWidth}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                title={t('viewer.fitToWidth')}
              >
                {t('viewer.fitToWidth')}
              </button>
              
              <button
                onClick={resetZoom}
                className="p-1 rounded hover:bg-green-100 transition-all duration-200 group"
                title={t('viewer.actualSize')}
              >
                <RotateCcw className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Document */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div className="bg-white shadow-green rounded-xl overflow-hidden">
            {loading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('viewer.loading')}</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <p className="text-red-600">{t('viewer.error')}</p>
                </div>
              </div>
            )}
            
            {selectedFile && !loading && !error && (
              <Document
                file={selectedFile.path}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center h-96">
                    <p className="text-red-600">{t('viewer.error')}</p>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-green"
                />
              </Document>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;