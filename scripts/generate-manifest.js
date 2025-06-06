#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MEDIA_BASE_DIR = path.join(__dirname, '..', 'public', 'media');
const MANIFEST_PATH = path.join(MEDIA_BASE_DIR, 'manifest.json');
const FOLDERS_TO_SCAN = ['antraege', 'presse', 'wahlkampf'];
const SUPPORTED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg'];

/**
 * Format file size in human readable format
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Generate unique ID for file
 */
function generateFileId(folderName, fileName) {
  const baseName = fileName.replace(/\.(pdf|png|jpg|jpeg)$/i, '').toLowerCase();
  const sanitized = baseName.replace(/[^a-z0-9]/g, '_');
  return `${folderName}_${sanitized}`;
}

/**
 * Get file type based on extension
 */
function getFileType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.pdf') return 'pdf';
  if (['.png', '.jpg', '.jpeg'].includes(ext)) return 'image';
  return 'unknown';
}

/**
 * Scan a folder for supported files
 */
function scanFolderForFiles(folderPath, folderName) {
  const files = [];
  
  try {
    if (!fs.existsSync(folderPath)) {
      console.log(`📁 Folder ${folderName} does not exist, creating...`);
      fs.mkdirSync(folderPath, { recursive: true });
      return files;
    }

    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          const filePath = path.join(folderPath, entry.name);
          const stats = fs.statSync(filePath);
          
          const fileInfo = {
            id: generateFileId(folderName, entry.name),
            name: entry.name,
            path: `/media/${folderName}/${entry.name}`,
            type: getFileType(entry.name),
            size: formatFileSize(stats.size),
            lastModified: stats.mtime.toISOString().split('T')[0]
          };
          
          files.push(fileInfo);
          console.log(`  ✅ Found: ${entry.name} (${fileInfo.size}) - ${fileInfo.type}`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error scanning folder ${folderName}:`, error.message);
  }
  
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Generate the complete manifest
 */
function generateManifest() {
  console.log('🔍 Scanning for media files...\n');
  
  const manifest = {};
  let totalFiles = 0;
  
  for (const folderName of FOLDERS_TO_SCAN) {
    const folderPath = path.join(MEDIA_BASE_DIR, folderName);
    console.log(`📂 Scanning folder: ${folderName}`);
    
    const files = scanFolderForFiles(folderPath, folderName);
    
    manifest[folderName] = {
      name: folderName,
      files: files
    };
    
    totalFiles += files.length;
    console.log(`   Found ${files.length} file(s)\n`);
  }
  
  return { manifest, totalFiles };
}

/**
 * Compare manifests to detect changes
 */
function compareManifests(oldManifest, newManifest) {
  const changes = {
    added: [],
    removed: [],
    modified: []
  };
  
  // Check each folder
  for (const folderName of FOLDERS_TO_SCAN) {
    const oldFiles = oldManifest[folderName]?.files || [];
    const newFiles = newManifest[folderName]?.files || [];
    
    // Create maps for easier comparison
    const oldFileMap = new Map(oldFiles.map(f => [f.name, f]));
    const newFileMap = new Map(newFiles.map(f => [f.name, f]));
    
    // Find added files
    for (const [fileName, fileInfo] of newFileMap) {
      if (!oldFileMap.has(fileName)) {
        changes.added.push({ folder: folderName, file: fileInfo });
      } else {
        // Check if file was modified
        const oldFile = oldFileMap.get(fileName);
        if (oldFile.size !== fileInfo.size || oldFile.lastModified !== fileInfo.lastModified) {
          changes.modified.push({ folder: folderName, file: fileInfo, oldFile });
        }
      }
    }
    
    // Find removed files
    for (const [fileName, fileInfo] of oldFileMap) {
      if (!newFileMap.has(fileName)) {
        changes.removed.push({ folder: folderName, file: fileInfo });
      }
    }
  }
  
  return changes;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Media Manifest Generator\n');
  console.log('=' .repeat(50));
  
  // Load existing manifest if it exists
  let oldManifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf8');
      oldManifest = JSON.parse(manifestContent);
      console.log('📋 Loaded existing manifest\n');
    } catch (error) {
      console.log('⚠️  Could not load existing manifest, creating new one\n');
    }
  } else {
    console.log('📋 No existing manifest found, creating new one\n');
  }
  
  // Generate new manifest
  const { manifest: newManifest, totalFiles } = generateManifest();
  
  // Compare manifests
  const changes = compareManifests(oldManifest, newManifest);
  
  // Report changes
  console.log('📊 Change Summary:');
  console.log('=' .repeat(30));
  
  if (changes.added.length > 0) {
    console.log(`✅ Added files (${changes.added.length}):`);
    changes.added.forEach(({ folder, file }) => {
      console.log(`   + ${folder}/${file.name} (${file.size}) - ${file.type}`);
    });
    console.log();
  }
  
  if (changes.removed.length > 0) {
    console.log(`❌ Removed files (${changes.removed.length}):`);
    changes.removed.forEach(({ folder, file }) => {
      console.log(`   - ${folder}/${file.name}`);
    });
    console.log();
  }
  
  if (changes.modified.length > 0) {
    console.log(`🔄 Modified files (${changes.modified.length}):`);
    changes.modified.forEach(({ folder, file, oldFile }) => {
      console.log(`   ~ ${folder}/${file.name} (${oldFile.size} → ${file.size})`);
    });
    console.log();
  }
  
  if (changes.added.length === 0 && changes.removed.length === 0 && changes.modified.length === 0) {
    console.log('✨ No changes detected\n');
  }
  
  // Write manifest
  try {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(newManifest, null, 2), 'utf8');
    console.log(`💾 Manifest saved to: ${MANIFEST_PATH}`);
    console.log(`📁 Total files: ${totalFiles}`);
    console.log('\n✅ Manifest generation completed successfully!');
  } catch (error) {
    console.error('❌ Error writing manifest:', error.message);
    process.exit(1);
  }
}

// Run the script
main();