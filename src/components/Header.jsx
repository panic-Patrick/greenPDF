import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 shadow-green border-b border-green-500/20">
      <div className="max-w-full mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-1 sm:p-2 flex-shrink-0">
              <img 
                src="/assets/logo.png" 
                alt="Grüne Fraktion Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-white font-headline drop-shadow-sm truncate">
                greenPDF
              </h1>
              <p className="text-xs sm:text-sm text-green-100 truncate">
                Grüne Fraktion Kirchhundem
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-200 group border border-white/30 touch-manipulation"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-yellow-200 transition-colors duration-200" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-blue-200 transition-colors duration-200" />
              )}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-200 group border border-white/30 touch-manipulation"
              title={`Switch to ${i18n.language === 'en' ? 'Deutsch' : 'English'}`}
            >
              <Languages className="h-3 w-3 sm:h-4 sm:w-4 text-white group-hover:text-green-200 transition-colors duration-200" />
              <span className="text-xs sm:text-sm font-medium uppercase text-white group-hover:text-green-200 transition-colors duration-200">
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