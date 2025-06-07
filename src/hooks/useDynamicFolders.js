import { useState, useEffect } from 'react';
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

      // Check bucket health first
      console.log('Checking Supabase buckets health...');
      const health = await SupabaseStorageService.checkBucketsHealth();
      setBucketsHealth(health);

      // Check if any buckets are inaccessible
      const inaccessibleBuckets = Object.entries(health)
        .filter(([_, status]) => !status.accessible)
        .map(([name, _]) => name);

      if (inaccessibleBuckets.length > 0) {
        console.warn('Some buckets are inaccessible:', inaccessibleBuckets);
      }

      // Load files from Supabase Storage
      console.log('Loading files from Supabase Storage...');
      const structure = await SupabaseStorageService.loadAllFiles();
      
      setFolderStructure(structure);
      
      // Log summary
      const totalFiles = Object.values(structure).reduce((sum, folder) => sum + (folder.files?.length || 0), 0);
      console.log(`Successfully loaded ${totalFiles} files from Supabase Storage`);
      
    } catch (err) {
      console.error('Error loading folder structure from Supabase:', err);
      setError(`Fehler beim Laden der Supabase Storage: ${err.message}`);
      
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

  const refreshFolders = async () => {
    await loadFolders();
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
    bucketsHealth,
    refreshFolders,
    getAllFiles,
    searchFiles
  };
};