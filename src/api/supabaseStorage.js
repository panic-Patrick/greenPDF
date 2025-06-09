import { supabase, getPublicUrl, listFilesInBucket, listFilesAndFoldersRecursively } from '../lib/supabaseClient';

export class SupabaseStorageService {
  // Bucket names that correspond to your folder structure
  static BUCKETS = {
    antraege: 'antraege',
    presse: 'presse', 
    wahlkampf: 'wahlkampf',
    events: 'events'
  };

  // Supported file extensions
  static SUPPORTED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg'];

  /**
   * Get file type based on extension
   */
  static getFileType(fileName) {
    const ext = fileName.toLowerCase().split('.').pop();
    if (ext === 'pdf') return 'pdf';
    if (['png', 'jpg', 'jpeg'].includes(ext)) return 'image';
    return 'unknown';
  }

  /**
   * Format file size in human readable format
   */
  static formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Generate unique ID for file
   */
  static generateFileId(bucketName, filePath) {
    const baseName = filePath.replace(/\.(pdf|png|jpg|jpeg)$/i, '').toLowerCase();
    const sanitized = baseName.replace(/[^a-z0-9]/g, '_');
    return `${bucketName}_${sanitized}`;
  }

  /**
   * Check if file extension is supported
   */
  static isSupportedFile(fileName) {
    const ext = '.' + fileName.toLowerCase().split('.').pop();
    return this.SUPPORTED_EXTENSIONS.includes(ext);
  }

  /**
   * Process files recursively from folder structure
   */
  static processFilesRecursively(bucketName, files, folders, basePath = '') {
    const processedFiles = [];
    
    // Process files in current level
    files
      .filter(file => file.name && this.isSupportedFile(file.name))
      .forEach(file => {
        processedFiles.push({
          id: this.generateFileId(bucketName, file.path),
          name: file.name,
          path: getPublicUrl(bucketName, file.path),
          fullPath: file.path,
          type: this.getFileType(file.name),
          size: this.formatFileSize(file.metadata?.size),
          lastModified: file.updated_at ? new Date(file.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          bucket: bucketName,
          folder: basePath
        });
      });

    return processedFiles;
  }

  /**
   * Create folder structure with nested files and subfolders
   */
  static createFolderStructure(bucketName, files, folders, basePath = '') {
    const structure = {
      files: this.processFilesRecursively(bucketName, files, folders, basePath),
      subfolders: {}
    };

    // Process subfolders recursively
    folders.forEach(folder => {
      const folderPath = basePath ? `${basePath}/${folder.name}` : folder.name;
      structure.subfolders[folder.name] = {
        name: folder.name,
        path: folder.path,
        ...this.createFolderStructure(bucketName, folder.files, folder.folders, folderPath)
      };
    });

    return structure;
  }

  /**
   * Load files from a specific bucket with folder structure
   */
  static async loadFilesFromBucketWithFolders(bucketName) {
    try {
      const { files, folders } = await listFilesAndFoldersRecursively(bucketName);
      return this.createFolderStructure(bucketName, files, folders);
    } catch (error) {
      console.error(`Error loading files from bucket ${bucketName}:`, error);
      return { files: [], subfolders: {} };
    }
  }

  /**
   * Load files from a specific bucket (legacy flat structure)
   */
  static async loadFilesFromBucket(bucketName) {
    try {
      const files = await listFilesInBucket(bucketName);
      
      const processedFiles = files
        .filter(file => file.name && this.isSupportedFile(file.name))
        .map(file => ({
          id: this.generateFileId(bucketName, file.name),
          name: file.name,
          path: getPublicUrl(bucketName, file.name),
          fullPath: file.name,
          type: this.getFileType(file.name),
          size: this.formatFileSize(file.metadata?.size),
          lastModified: file.updated_at ? new Date(file.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          bucket: bucketName,
          folder: ''
        }));

      return processedFiles;
    } catch (error) {
      console.error(`Error loading files from bucket ${bucketName}:`, error);
      return [];
    }
  }

  /**
   * Load all files from all buckets with folder structure
   */
  static async loadAllFiles() {
    const folderStructure = {};
    
    for (const [folderName, bucketName] of Object.entries(this.BUCKETS)) {
      try {
        console.log(`Loading files from bucket: ${bucketName}`);
        const bucketStructure = await this.loadFilesFromBucketWithFolders(bucketName);
        
        folderStructure[folderName] = {
          name: folderName,
          bucket: bucketName,
          files: bucketStructure.files,
          subfolders: bucketStructure.subfolders
        };
        
        const totalFiles = this.countFilesRecursively(bucketStructure);
        console.log(`Loaded ${totalFiles} files from ${bucketName}`);
      } catch (error) {
        console.error(`Error loading bucket ${bucketName}:`, error);
        folderStructure[folderName] = {
          name: folderName,
          bucket: bucketName,
          files: [],
          subfolders: {}
        };
      }
    }

    return folderStructure;
  }

  /**
   * Count files recursively in folder structure
   */
  static countFilesRecursively(structure) {
    let count = structure.files ? structure.files.length : 0;
    
    if (structure.subfolders) {
      Object.values(structure.subfolders).forEach(subfolder => {
        count += this.countFilesRecursively(subfolder);
      });
    }
    
    return count;
  }

  /**
   * Get all files recursively from folder structure
   */
  static getAllFilesRecursively(structure) {
    let allFiles = [...(structure.files || [])];
    
    if (structure.subfolders) {
      Object.values(structure.subfolders).forEach(subfolder => {
        allFiles = allFiles.concat(this.getAllFilesRecursively(subfolder));
      });
    }
    
    return allFiles;
  }

  /**
   * Search files across all buckets
   */
  static async searchFiles(query, folderStructure = null) {
    if (!query.trim()) return [];

    // If no folder structure provided, load it
    if (!folderStructure) {
      folderStructure = await this.loadAllFiles();
    }

    const allFiles = Object.values(folderStructure).flatMap(folder => 
      this.getAllFilesRecursively(folder)
    );
    
    return allFiles.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Get download URL for a file
   */
  static async getDownloadUrl(bucketName, filePath) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) {
        console.error('Error creating signed URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  }

  /**
   * Check if buckets exist and are accessible
   */
  static async checkBucketsHealth() {
    const health = {};
    
    for (const [folderName, bucketName] of Object.entries(this.BUCKETS)) {
      try {
        const { data, error } = await supabase.storage.getBucket(bucketName);
        health[folderName] = {
          accessible: !error,
          error: error?.message || null,
          bucket: data
        };
      } catch (error) {
        health[folderName] = {
          accessible: false,
          error: error.message,
          bucket: null
        };
      }
    }

    return health;
  }
}