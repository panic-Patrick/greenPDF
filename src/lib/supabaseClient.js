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

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

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