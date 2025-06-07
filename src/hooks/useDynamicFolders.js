import { useState, useEffect } from 'react';
import { FileScanner } from '../api/fileScanner';

export const useDynamicFolders = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFolders = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to load from manifest
        let structure = await FileScanner.loadFromManifest();
        
        // If no manifest, scan dynamically
        if (!structure) {
          structure = await FileScanner.getAllPDFs();
        }

        setFolderStructure(structure);
      } catch (err) {
        console.error('Error loading folder structure:', err);
        setError(err.message);
        
        // Fallback to empty structure
        setFolderStructure({
          antraege: { name: 'antraege', files: [] },
          presse: { name: 'presse', files: [] },
          wahlkampf: { name: 'wahlkampf', files: [] }
        });
      } finally {
        setLoading(false);
      }
    };

    loadFolders();
  }, []);

  const refreshFolders = async () => {
    setLoading(true);
    try {
      const structure = await FileScanner.getAllPDFs();
      setFolderStructure(structure);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllFiles = () => {
    return Object.values(folderStructure).flatMap(folder => folder.files || []);
  };

  const searchFiles = (query) => {
    if (!query.trim()) return [];
    
    const allFiles = getAllFiles();
    return allFiles.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    folderStructure,
    loading,
    error,
    refreshFolders,
    getAllFiles,
    searchFiles
  };
};