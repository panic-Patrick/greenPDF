// File scanner utility to dynamically discover PDF files
export class FileScanner {
  static async scanFolder(folderPath) {
    try {
      // In a real environment, this would use Node.js fs module
      // For the browser environment, we'll use a different approach
      const response = await fetch(`/api/scan-folder?path=${encodeURIComponent(folderPath)}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to scan folder');
    } catch (error) {
      console.warn(`Could not scan folder ${folderPath}:`, error);
      return [];
    }
  }

  static async getAllPDFs() {
    const folders = ['antraege', 'presse', 'wahlkampf'];
    const folderStructure = {};

    for (const folder of folders) {
      try {
        const files = await this.scanPDFsInFolder(folder);
        folderStructure[folder] = {
          name: folder,
          files: files
        };
      } catch (error) {
        console.warn(`Error scanning folder ${folder}:`, error);
        folderStructure[folder] = {
          name: folder,
          files: []
        };
      }
    }

    return folderStructure;
  }

  static async scanPDFsInFolder(folderName) {
    // For browser environment, we'll try to fetch a directory listing
    // This is a fallback approach since we can't directly access the file system
    const knownFiles = await this.tryFetchKnownFiles(folderName);
    return knownFiles;
  }

  static async tryFetchKnownFiles(folderName) {
    // Try to fetch files by attempting to load them
    const commonPDFNames = [
      'antrag-solaranlagen.pdf',
      'antrag-fahrradwege.pdf',
      'umweltbericht-2023.pdf',
      'projekt-waldschutz.pdf',
      'kommunalwahl-2023.pdf',
      'wahlprogramm-2024.pdf',
      'bauantrag.pdf',
      'foerderantrag.pdf',
      'urlaubsantrag.pdf',
      'pressemitteilung.pdf',
      'medienkit.pdf',
      'interview.pdf',
      'wahlprogramm.pdf',
      'kampagne.pdf',
      'flyer.pdf'
    ];

    const files = [];
    
    for (const fileName of commonPDFNames) {
      try {
        const response = await fetch(`/pdfs/${folderName}/${fileName}`, { method: 'HEAD' });
        if (response.ok) {
          const fileSize = response.headers.get('content-length');
          const lastModified = response.headers.get('last-modified');
          
          files.push({
            id: `${folderName}_${fileName.replace('.pdf', '')}`,
            name: fileName,
            path: `/pdfs/${folderName}/${fileName}`,
            size: fileSize ? this.formatFileSize(parseInt(fileSize)) : 'Unknown',
            lastModified: lastModified ? new Date(lastModified).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
          });
        }
      } catch (error) {
        // File doesn't exist, continue
      }
    }

    return files;
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Alternative approach: Use a manifest file
  static async loadFromManifest() {
    try {
      const response = await fetch('/pdfs/manifest.json');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('No manifest file found, using fallback method');
    }
    return null;
  }
}