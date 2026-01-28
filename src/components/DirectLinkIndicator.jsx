import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, X } from 'lucide-react';
import { useUrlNavigation } from '../hooks/useUrlNavigation';

const DirectLinkIndicator = () => {
  const { t } = useTranslation();
  const { urlParams, hasUrlNavigation, clearNavigation } = useUrlNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasUrlNavigation) {
      setIsVisible(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasUrlNavigation]);

  if (!isVisible || !hasUrlNavigation) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClearNavigation = () => {
    clearNavigation();
    setIsVisible(false);
  };

  return (
    <div className="fixed top-4 right-4 z-40 max-w-sm">
      <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <Link className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
              {t('linkGenerator.directLink')}
            </h4>
            <p className="text-xs text-green-700 dark:text-green-300 mb-2">
              Sie haben einen direkten Link zur Ordner-Übersicht von <strong>{urlParams.bucket}</strong>
              {urlParams.folder && (
                <>
                  {' / '}
                  <strong>{urlParams.folder}</strong>
                </>
              )} verwendet.
            </p>
            <button
              onClick={handleClearNavigation}
              className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline"
            >
              Navigation zurücksetzen
            </button>
          </div>
          <button
            onClick={handleClose}
            className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-200 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectLinkIndicator; 