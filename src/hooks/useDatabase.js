import { useState, useEffect } from 'react';
import { 
  initializeDatabase, 
  documentService, 
  userInteractionService, 
  analyticsService 
} from '../lib/database';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        setIsInitialized(true);
      } catch (err) {
        console.error('Database initialization failed:', err);
        setError(err.message);
      }
    };

    init();
  }, []);

  return {
    isInitialized,
    error,
    documentService,
    userInteractionService,
    analyticsService
  };
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favs = await userInteractionService.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (fileId) => {
    try {
      await userInteractionService.addToFavorites(fileId);
      await loadFavorites();
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (fileId) => {
    try {
      await userInteractionService.removeFromFavorites(fileId);
      await loadFavorites();
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const isFavorite = async (fileId) => {
    try {
      return await userInteractionService.isFavorite(fileId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites: loadFavorites
  };
};

export const useRecentFiles = () => {
  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecentFiles = async () => {
    try {
      setLoading(true);
      const recent = await userInteractionService.getRecent();
      setRecentFiles(recent);
    } catch (error) {
      console.error('Error loading recent files:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToRecent = async (fileId) => {
    try {
      await userInteractionService.addToRecent(fileId);
      await loadRecentFiles();
    } catch (error) {
      console.error('Error adding to recent:', error);
    }
  };

  useEffect(() => {
    loadRecentFiles();
  }, []);

  return {
    recentFiles,
    loading,
    addToRecent,
    refreshRecentFiles: loadRecentFiles
  };
};

export const useDocumentAnalytics = () => {
  const trackView = async (fileId) => {
    try {
      await analyticsService.trackView(fileId);
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getPopularDocuments = async (limit = 10) => {
    try {
      return await analyticsService.getPopularDocuments(limit);
    } catch (error) {
      console.error('Error fetching popular documents:', error);
      return [];
    }
  };

  return {
    trackView,
    getPopularDocuments
  };
};