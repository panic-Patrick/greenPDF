import { useState, useEffect } from 'react';
import { FileScanner } from '../api/fileScanner';
import { useDatabase } from './useDatabase';

export const useDynamicFolders = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isInitialized, documentService } = useDatabase();

  useEffect(() => {
    const loadFolders = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to load from manifest
        let structure = await FileScanner.loadFromManifest();
        
        // If no manifest, scan dynamically
        if (!structure) {
          structure = await FileScanner.getAllFiles();
        }

        setFolderStructure(structure);

        // Sync with database if initialized
        if (isInitialized && structure) {
          await documentService.syncDocuments(structure);
        }
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
  }, [isInitialized]);

  const refreshFolders = async () => {
    setLoading(true);
    try {
      const structure = await FileScanner.getAllFiles();
      setFolderStructure(structure);
      
      if (isInitialized) {
        await documentService.syncDocuments(structure);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllFiles = () => {
    return Object.values(folderStructure).flatMap(folder => folder.files || []);
  };

  const searchFiles = async (query) => {
    if (!query.trim()) return [];
    
    // Try database search first if available
    if (isInitialized) {
      try {
        const dbResults = await documentService.searchDocuments(query);
        if (dbResults.length > 0) {
          return dbResults.map(doc => ({
            id: doc.file_id,
            name: doc.name,
            path: doc.path,
            type: doc.type,
            size: doc.size,
            lastModified: doc.last_modified
          }));
        }
      } catch (error) {
        console.error('Database search failed, falling back to local search:', error);
      }
    }
    
    // Fallback to local search
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