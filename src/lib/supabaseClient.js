import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get public URL for a file in storage
export const getPublicUrl = (bucket, filePath) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

// Helper function to list files in a bucket
export const listFilesInBucket = async (bucketName) => {
  try {
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

    return data || [];
  } catch (error) {
    console.error(`Error accessing bucket ${bucketName}:`, error);
    return [];
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