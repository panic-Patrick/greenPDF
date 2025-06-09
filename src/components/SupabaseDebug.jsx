import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CheckCircle, XCircle, AlertTriangle, Database, Loader } from 'lucide-react';

const SupabaseDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    connection: null,
    buckets: {},
    files: {},
    loading: true
  });

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setDebugInfo(prev => ({ ...prev, loading: true }));
    
    const results = {
      connection: null,
      buckets: {},
      files: {},
      loading: false
    };

    // Test 1: Basic connection
    try {
      const { data, error } = await supabase.auth.getSession();
      results.connection = {
        success: !error,
        error: error?.message,
        url: import.meta.env.VITE_SUPABASE_URL,
        hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      };
    } catch (error) {
      results.connection = {
        success: false,
        error: error.message,
        url: import.meta.env.VITE_SUPABASE_URL,
        hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      };
    }

    // Test 2: Check buckets
    const buckets = ['antraege', 'presse', 'wahlkampf', 'events'];
    for (const bucket of buckets) {
      try {
        const { data, error } = await supabase.storage.getBucket(bucket);
        results.buckets[bucket] = {
          exists: !error,
          error: error?.message,
          public: data?.public || false
        };

        // Test 3: List files in bucket
        if (!error) {
          try {
            const { data: files, error: listError } = await supabase.storage
              .from(bucket)
              .list('', { limit: 5 });
            
            results.files[bucket] = {
              accessible: !listError,
              count: files?.length || 0,
              error: listError?.message,
              files: files?.slice(0, 3).map(f => f.name) || []
            };
          } catch (listError) {
            results.files[bucket] = {
              accessible: false,
              count: 0,
              error: listError.message,
              files: []
            };
          }
        }
      } catch (error) {
        results.buckets[bucket] = {
          exists: false,
          error: error.message,
          public: false
        };
      }
    }

    setDebugInfo(results);
  };

  const StatusIcon = ({ success }) => {
    if (success) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  if (debugInfo.loading) {
    return (
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-2">
          <Loader className="h-4 w-4 animate-spin text-blue-600" />
          <span className="text-sm text-blue-800 dark:text-blue-200">Supabase-Verbindung wird getestet...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Supabase Diagnose</h3>
        <button
          onClick={runDiagnostics}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          Erneut testen
        </button>
      </div>

      {/* Connection Status */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Verbindung</h4>
        <div className="flex items-center space-x-2 text-sm">
          <StatusIcon success={debugInfo.connection?.success} />
          <span className={debugInfo.connection?.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
            {debugInfo.connection?.success ? 'Verbunden' : 'Verbindungsfehler'}
          </span>
        </div>
        {debugInfo.connection?.error && (
          <p className="text-xs text-red-600 dark:text-red-400 ml-6">{debugInfo.connection.error}</p>
        )}
        <div className="text-xs text-gray-600 dark:text-gray-400 ml-6">
          <p>URL: {debugInfo.connection?.url || 'Nicht gesetzt'}</p>
          <p>API Key: {debugInfo.connection?.hasKey ? 'Gesetzt' : 'Nicht gesetzt'}</p>
        </div>
      </div>

      {/* Buckets Status */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Storage Buckets</h4>
        {Object.entries(debugInfo.buckets).map(([bucket, status]) => (
          <div key={bucket} className="ml-2">
            <div className="flex items-center space-x-2 text-sm">
              <StatusIcon success={status.exists} />
              <span className="font-medium">{bucket}</span>
              {status.public && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-1 py-0.5 rounded">
                  öffentlich
                </span>
              )}
            </div>
            {status.error && (
              <p className="text-xs text-red-600 dark:text-red-400 ml-6">{status.error}</p>
            )}
            
            {/* Files in bucket */}
            {debugInfo.files[bucket] && (
              <div className="ml-6 mt-1">
                <div className="flex items-center space-x-2 text-xs">
                  <StatusIcon success={debugInfo.files[bucket].accessible} />
                  <span className="text-gray-600 dark:text-gray-400">
                    {debugInfo.files[bucket].count} Dateien
                  </span>
                </div>
                {debugInfo.files[bucket].files.length > 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                    Beispiele: {debugInfo.files[bucket].files.join(', ')}
                  </div>
                )}
                {debugInfo.files[bucket].error && (
                  <p className="text-xs text-red-600 dark:text-red-400 ml-4">{debugInfo.files[bucket].error}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {(!debugInfo.connection?.success || Object.values(debugInfo.buckets).some(b => !b.exists)) && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">Empfohlene Lösungen:</p>
              <ul className="mt-1 text-yellow-700 dark:text-yellow-300 space-y-1">
                {!debugInfo.connection?.hasKey && (
                  <li>• Überprüfen Sie VITE_SUPABASE_ANON_KEY in der .env Datei</li>
                )}
                {!debugInfo.connection?.url && (
                  <li>• Überprüfen Sie VITE_SUPABASE_URL in der .env Datei</li>
                )}
                {Object.entries(debugInfo.buckets).filter(([_, status]) => !status.exists).map(([bucket, _]) => (
                  <li key={bucket}>• Erstellen Sie den Bucket "{bucket}" in Supabase Storage</li>
                ))}
                <li>• Stellen Sie sicher, dass die Buckets öffentlich zugänglich sind</li>
                <li>• Überprüfen Sie die RLS-Richtlinien für Storage</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseDebug;