import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, FileText } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-lg shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('header.title')}
              </h1>
              <p className="text-sm text-gray-600">
                {t('header.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              title={`Switch to ${i18n.language === 'en' ? 'Deutsch' : 'English'}`}
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium uppercase">
                {i18n.language === 'en' ? 'DE' : 'EN'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;