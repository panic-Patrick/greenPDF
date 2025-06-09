import { useState, useEffect } from 'react';

export const useUrlNavigation = () => {
  const [urlParams, setUrlParams] = useState({
    bucket: null,
    folder: null
  });

  useEffect(() => {
    // Parse URL parameters on component mount
    const parseUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const bucket = params.get('bucket');
      const folder = params.get('folder');
      
      setUrlParams({
        bucket: bucket || null,
        folder: folder ? decodeURIComponent(folder) : null
      });
    };

    parseUrlParams();

    // Listen for URL changes (back/forward navigation)
    const handlePopState = () => {
      parseUrlParams();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Function to navigate to a specific bucket/folder
  const navigateToPath = (bucket, folder = null) => {
    const params = new URLSearchParams();
    
    if (bucket) {
      params.set('bucket', bucket);
    }
    
    if (folder) {
      params.set('folder', encodeURIComponent(folder));
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    
    setUrlParams({
      bucket: bucket || null,
      folder: folder || null
    });
  };

  // Function to clear URL parameters
  const clearNavigation = () => {
    window.history.pushState({}, '', window.location.pathname);
    setUrlParams({
      bucket: null,
      folder: null
    });
  };

  // Function to check if current path matches URL parameters
  const isCurrentPath = (bucket, folder = null) => {
    return urlParams.bucket === bucket && urlParams.folder === folder;
  };

  // Function to get the full folder path for nested folders
  const getFullFolderPath = (bucketName, folderPath) => {
    if (!folderPath) return bucketName;
    return `${bucketName}/${folderPath}`;
  };

  // Function to check if we should show folder overview based on URL
  const shouldShowFolderOverview = () => {
    return urlParams.bucket !== null;
  };

  return {
    urlParams,
    navigateToPath,
    clearNavigation,
    isCurrentPath,
    getFullFolderPath,
    hasUrlNavigation: urlParams.bucket !== null,
    shouldShowFolderOverview
  };
}; 