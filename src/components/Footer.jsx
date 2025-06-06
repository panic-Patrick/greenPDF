import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Shield, FileText } from 'lucide-react';
import DatenschutzContent from './DatenschutzContent';
import ImpressumContent from './ImpressumContent';

const Modal = ({ isOpen, onClose, title, children, icon: Icon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-headline">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-2">
            {children}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  return (
    <>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 Grüne Fraktion Kirchhundem
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowDatenschutz(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <Shield className="h-3 w-3" />
                <span>Datenschutz</span>
              </button>
              
              <button
                onClick={() => setShowImpressum(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <FileText className="h-3 w-3" />
                <span>Impressum</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Datenschutz Modal */}
      <Modal
        isOpen={showDatenschutz}
        onClose={() => setShowDatenschutz(false)}
        title="Datenschutzerklärung"
        icon={Shield}
      >
        <DatenschutzContent />
      </Modal>

      {/* Impressum Modal */}
      <Modal
        isOpen={showImpressum}
        onClose={() => setShowImpressum(false)}
        title="Impressum"
        icon={FileText}
      >
        <ImpressumContent />
      </Modal>
    </>
  );
};

export default Footer;