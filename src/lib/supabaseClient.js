import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING'
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    VITE_SUPABASE_URL: !!supabaseUrl,
    VITE_SUPABASE_ANON_KEY: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get public URL for a file in storage
export const getPublicUrl = (bucket, filePath) => {
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error(`Error getting public URL for ${bucket}/${filePath}:`, error);
    return null;
  }
};

// Helper function to list files in a bucket
export const listFilesInBucket = async (bucketName) => {
  try {
    console.log(`Listing files in bucket: ${bucketName}`);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error(`Error listing files in bucket ${bucketName}:`, error);
      return [];
    }

    console.log(`Found ${data?.length || 0} files in bucket ${bucketName}`);
    return data || [];
  } catch (error) {
    console.error(`Error accessing bucket ${bucketName}:`, error);
    return [];
  }
};

// Helper function to recursively list files and folders in a bucket
export const listFilesAndFoldersRecursively = async (bucketName, path = '') => {
  try {
    console.log(`Listing files and folders in bucket: ${bucketName}, path: ${path}`);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(path, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error(`Error listing files in bucket ${bucketName} at path ${path}:`, error);
      return { files: [], folders: [] };
    }

    const files = [];
    const folders = [];

    for (const item of data || []) {
      const fullPath = path ? `${path}/${item.name}` : item.name;
      
      if (item.id === null) {
        // This is a folder
        const subItems = await listFilesAndFoldersRecursively(bucketName, fullPath);
        folders.push({
          name: item.name,
          path: fullPath,
          files: subItems.files,
          folders: subItems.folders,
          metadata: item
        });
      } else {
        // This is a file
        files.push({
          ...item,
          path: fullPath
        });
      }
    }

    console.log(`Found ${files.length} files and ${folders.length} folders in ${bucketName}/${path}`);
    return { files, folders };
  } catch (error) {
    console.error(`Error accessing bucket ${bucketName} at path ${path}:`, error);
    return { files: [], folders: [] };
  }
};

// Helper function to get file metadata
export const getFileMetadata = async (bucketName, filePath) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', {
        search: filePath
      });

    if (error) {
      console.error(`Error getting metadata for ${filePath}:`, error);
      return null;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error(`Error getting metadata for ${filePath}:`, error);
    return null;
  }
};

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { success: !error, error: error?.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Helper function to check if bucket exists
export const checkBucketExists = async (bucketName) => {
  try {
    // Instead of getBucket (which requires admin permissions),
    // try to list files in the bucket to check accessibility
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 1 });
    
    if (error) {
      console.error(`Error checking bucket ${bucketName}:`, error);
      return false;
    }
    
    return true; // If we can list files, bucket exists and is accessible
  } catch (error) {
    console.error(`Error checking bucket ${bucketName}:`, error);
    return false;
  }
};