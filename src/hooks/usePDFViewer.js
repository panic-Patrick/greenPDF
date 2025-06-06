import { useState, useCallback } from 'react';

export const usePDFViewer = () => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    setError(error);
    setLoading(false);
  }, []);

  const loadDocument = useCallback((documentPath) => {
    setLoading(true);
    setError(null);
    setCurrentDocument(documentPath);
  }, []);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  }, [numPages]);

  const nextPage = useCallback(() => {
    goToPage(pageNumber + 1);
  }, [pageNumber, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(pageNumber - 1);
  }, [pageNumber, goToPage]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1.0);
  }, []);

  const fitToWidth = useCallback(() => {
    setScale(1.5);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  return {
    currentDocument,
    numPages,
    pageNumber,
    scale,
    isFullscreen,
    loading,
    error,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    loadDocument,
    goToPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToWidth,
    toggleFullscreen,
  };
};