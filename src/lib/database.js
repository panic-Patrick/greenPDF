import { neon } from '@neondatabase/serverless';

// Initialize Neon connection
const sql = neon(import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL);

// Database schema initialization
export const initializeDatabase = async () => {
  try {
    // Create documents table
    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        file_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        path VARCHAR(500) NOT NULL,
        type VARCHAR(50) NOT NULL,
        size VARCHAR(50),
        folder VARCHAR(100) NOT NULL,
        last_modified DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create user_interactions table for favorites and recent files
    await sql`
      CREATE TABLE IF NOT EXISTS user_interactions (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL,
        file_id VARCHAR(255) NOT NULL,
        interaction_type VARCHAR(50) NOT NULL, -- 'favorite', 'recent', 'view'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(session_id, file_id, interaction_type)
      )
    `;

    // Create document_analytics table for tracking usage
    await sql`
      CREATE TABLE IF NOT EXISTS document_analytics (
        id SERIAL PRIMARY KEY,
        file_id VARCHAR(255) NOT NULL,
        view_count INTEGER DEFAULT 0,
        last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(file_id)
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Document operations
export const documentService = {
  // Sync documents from manifest to database
  async syncDocuments(folderStructure) {
    try {
      for (const [folderName, folder] of Object.entries(folderStructure)) {
        for (const file of folder.files || []) {
          await sql`
            INSERT INTO documents (file_id, name, path, type, size, folder, last_modified)
            VALUES (${file.id}, ${file.name}, ${file.path}, ${file.type}, ${file.size}, ${folderName}, ${file.lastModified})
            ON CONFLICT (file_id) 
            DO UPDATE SET 
              name = EXCLUDED.name,
              path = EXCLUDED.path,
              type = EXCLUDED.type,
              size = EXCLUDED.size,
              last_modified = EXCLUDED.last_modified,
              updated_at = CURRENT_TIMESTAMP
          `;
        }
      }
    } catch (error) {
      console.error('Error syncing documents:', error);
    }
  },

  // Get all documents
  async getAllDocuments() {
    try {
      const documents = await sql`
        SELECT * FROM documents 
        ORDER BY folder, name
      `;
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  },

  // Search documents
  async searchDocuments(query) {
    try {
      const documents = await sql`
        SELECT * FROM documents 
        WHERE name ILIKE ${'%' + query + '%'} 
        ORDER BY name
      `;
      return documents;
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  },

  // Get documents by folder
  async getDocumentsByFolder(folder) {
    try {
      const documents = await sql`
        SELECT * FROM documents 
        WHERE folder = ${folder}
        ORDER BY name
      `;
      return documents;
    } catch (error) {
      console.error('Error fetching documents by folder:', error);
      return [];
    }
  }
};

// User interaction operations
export const userInteractionService = {
  // Get session ID (create if doesn't exist)
  getSessionId() {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  },

  // Add to favorites
  async addToFavorites(fileId) {
    try {
      const sessionId = this.getSessionId();
      await sql`
        INSERT INTO user_interactions (session_id, file_id, interaction_type)
        VALUES (${sessionId}, ${fileId}, 'favorite')
        ON CONFLICT (session_id, file_id, interaction_type) DO NOTHING
      `;
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  },

  // Remove from favorites
  async removeFromFavorites(fileId) {
    try {
      const sessionId = this.getSessionId();
      await sql`
        DELETE FROM user_interactions 
        WHERE session_id = ${sessionId} 
        AND file_id = ${fileId} 
        AND interaction_type = 'favorite'
      `;
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },

  // Get favorites
  async getFavorites() {
    try {
      const sessionId = this.getSessionId();
      const favorites = await sql`
        SELECT d.* FROM documents d
        JOIN user_interactions ui ON d.file_id = ui.file_id
        WHERE ui.session_id = ${sessionId} 
        AND ui.interaction_type = 'favorite'
        ORDER BY ui.created_at DESC
      `;
      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  // Add to recent files
  async addToRecent(fileId) {
    try {
      const sessionId = this.getSessionId();
      
      // Remove existing recent entry for this file
      await sql`
        DELETE FROM user_interactions 
        WHERE session_id = ${sessionId} 
        AND file_id = ${fileId} 
        AND interaction_type = 'recent'
      `;
      
      // Add new recent entry
      await sql`
        INSERT INTO user_interactions (session_id, file_id, interaction_type)
        VALUES (${sessionId}, ${fileId}, 'recent')
      `;
      
      // Keep only last 10 recent files
      const recentFiles = await sql`
        SELECT id FROM user_interactions 
        WHERE session_id = ${sessionId} 
        AND interaction_type = 'recent'
        ORDER BY created_at DESC
        OFFSET 10
      `;
      
      if (recentFiles.length > 0) {
        const idsToDelete = recentFiles.map(f => f.id);
        await sql`
          DELETE FROM user_interactions 
          WHERE id = ANY(${idsToDelete})
        `;
      }
    } catch (error) {
      console.error('Error adding to recent:', error);
    }
  },

  // Get recent files
  async getRecent() {
    try {
      const sessionId = this.getSessionId();
      const recent = await sql`
        SELECT d.* FROM documents d
        JOIN user_interactions ui ON d.file_id = ui.file_id
        WHERE ui.session_id = ${sessionId} 
        AND ui.interaction_type = 'recent'
        ORDER BY ui.created_at DESC
        LIMIT 10
      `;
      return recent;
    } catch (error) {
      console.error('Error fetching recent files:', error);
      return [];
    }
  },

  // Check if file is favorite
  async isFavorite(fileId) {
    try {
      const sessionId = this.getSessionId();
      const result = await sql`
        SELECT 1 FROM user_interactions 
        WHERE session_id = ${sessionId} 
        AND file_id = ${fileId} 
        AND interaction_type = 'favorite'
        LIMIT 1
      `;
      return result.length > 0;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
};

// Analytics operations
export const analyticsService = {
  // Track document view
  async trackView(fileId) {
    try {
      await sql`
        INSERT INTO document_analytics (file_id, view_count, last_viewed)
        VALUES (${fileId}, 1, CURRENT_TIMESTAMP)
        ON CONFLICT (file_id) 
        DO UPDATE SET 
          view_count = document_analytics.view_count + 1,
          last_viewed = CURRENT_TIMESTAMP
      `;
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  },

  // Get popular documents
  async getPopularDocuments(limit = 10) {
    try {
      const popular = await sql`
        SELECT d.*, da.view_count, da.last_viewed
        FROM documents d
        JOIN document_analytics da ON d.file_id = da.file_id
        ORDER BY da.view_count DESC, da.last_viewed DESC
        LIMIT ${limit}
      `;
      return popular;
    } catch (error) {
      console.error('Error fetching popular documents:', error);
      return [];
    }
  },

  // Get analytics for a specific document
  async getDocumentAnalytics(fileId) {
    try {
      const analytics = await sql`
        SELECT * FROM document_analytics 
        WHERE file_id = ${fileId}
      `;
      return analytics[0] || null;
    } catch (error) {
      console.error('Error fetching document analytics:', error);
      return null;
    }
  }
};

export { sql };