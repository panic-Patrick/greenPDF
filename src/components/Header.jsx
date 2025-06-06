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
    <header className="bg-white shadow-soft border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-green">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-headline">
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
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
              title={`Switch to ${i18n.language === 'en' ? 'Deutsch' : 'English'}`}
            >
              <Languages className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
              <span className="text-sm font-medium uppercase text-gray-700 group-hover:text-green-700 transition-colors duration-200">
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