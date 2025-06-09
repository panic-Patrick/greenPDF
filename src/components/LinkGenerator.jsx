import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Copy, Check, Share2 } from 'lucide-react';

const LinkGenerator = ({ bucketName, folderPath = '', onClose }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Generate the direct link
  const generateLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    if (bucketName) {
      params.set('bucket', bucketName);
    }
    
    if (folderPath) {
      params.set('folder', encodeURIComponent(folderPath));
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  const directLink = generateLink();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(directLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = directLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GreenPDF - ${bucketName}${folderPath ? ` / ${folderPath}` : ''}`,
          text: `Direkter Link zu ${bucketName}${folderPath ? ` / ${folderPath}` : ''}`,
          url: directLink
        });
      } catch (err) {
        console.error('Error sharing:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('linkGenerator.title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('linkGenerator.description')}
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t('linkGenerator.bucket')}:
              </span>
              <span className="text-green-600 dark:text-green-400 font-mono">
                {bucketName}
              </span>
            </div>
            {folderPath && (
              <div className="flex items-center space-x-2 text-sm mt-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {t('linkGenerator.folder')}:
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-mono">
                  {folderPath}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('linkGenerator.generatedLink')}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={directLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm font-mono"
            />
            <button
              onClick={copyToClipboard}
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                copied
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="text-sm">{t('linkGenerator.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">{t('linkGenerator.copy')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={shareLink}
            className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>{t('linkGenerator.share')}</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {t('linkGenerator.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkGenerator; 