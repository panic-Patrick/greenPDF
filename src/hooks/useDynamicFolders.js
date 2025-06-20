import { useState, useEffect, useCallback } from 'react';
import { SupabaseStorageService } from '../api/supabaseStorage';

export const useDynamicFolders = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bucketsHealth, setBucketsHealth] = useState({});

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check bucket health first - nur für die Statusanzeige, nicht blockierend
      console.log('Checking Supabase buckets health...');
      const health = await SupabaseStorageService.checkBucketsHealth();
      setBucketsHealth(health);

      // Entferne die Warnung über unzugängliche Buckets, da wir trotzdem Dateien laden können
      // Die Bucket-Gesundheit wird nur für die UI-Anzeige verwendet

      // Load files from Supabase Storage
      console.log('Loading files from Supabase Storage...');
      const structure = await SupabaseStorageService.loadAllFiles();
      
      setFolderStructure(structure);
      
      // Log summary
      const totalFiles = Object.values(structure).reduce((sum, folder) => 
        sum + SupabaseStorageService.countFilesRecursively(folder), 0);
      console.log(`Successfully loaded ${totalFiles} files from Supabase Storage`);
      
    } catch (err) {
      console.error('Error loading folder structure from Supabase:', err);
      setError(`Fehler beim Laden der Supabase Storage: ${err.message}`);
      
      // Fallback to empty structure
      setFolderStructure({
        antraege: { name: 'antraege', bucket: 'antraege', files: [], subfolders: {} },
        presse: { name: 'presse', bucket: 'presse', files: [], subfolders: {} },
        wahlkampf: { name: 'wahlkampf', bucket: 'wahlkampf', files: [], subfolders: {} },
        events: { name: 'events', bucket: 'events', files: [], subfolders: {} }
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshFolders = async () => {
    await loadFolders();
  };

  const getAllFiles = useCallback(() => {
    return Object.values(folderStructure).flatMap(folder => 
      SupabaseStorageService.getAllFilesRecursively(folder)
    );
  }, [folderStructure]);

  const searchFiles = useCallback((query) => {
    if (!query.trim()) return [];
    
    const allFiles = getAllFiles();
    return allFiles.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [getAllFiles]);

  return {
    folderStructure,
    loading,
    error,
    bucketsHealth,
    refreshFolders,
    getAllFiles,
    searchFiles
  };
};