import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react';
import DatenschutzContent from './DatenschutzContent';
import ImpressumContent from './ImpressumContent';

const Footer = () => {
  const { t } = useTranslation();
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  const handleDatenschutzClick = () => {
    setShowDatenschutz(true);
  };

  const handleImpressumClick = () => {
    setShowImpressum(true);
  };

  const closeDatenschutz = () => {
    setShowDatenschutz(false);
  };

  const closeImpressum = () => {
    setShowImpressum(false);
  };

  return (
    <>
      <footer className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white border-t border-green-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 font-headline">
                {t('footer.contact')}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-green-200 flex-shrink-0" />
                  <a 
                    href="mailto:info@gruene-kirchhundem.de" 
                    className="text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 break-all"
                  >
                    info@gruene-kirchhundem.de
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-green-200 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-green-100">+49 (0) 2723 123456</span>
                </div>
                <div className="flex items-start justify-center md:justify-start space-x-2 sm:space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-200 flex-shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base text-green-100">
                    <div>Grüne Fraktion</div>
                    <div>Rathaus Kirchhundem</div>
                    <div>57399 Kirchhundem</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 font-headline">
                {t('footer.quickLinks')}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <a
                  href="https://www.gruene-kirchhundem.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 group touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
                >
                  <span>{t('footer.website')}</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="https://www.instagram.com/gruene_kirchhundem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 group touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
                >
                  <span>Instagram</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="text-center md:text-right">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 font-headline">
                {t('footer.legal')}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleDatenschutzClick}
                  className="flex items-center justify-center md:justify-end space-x-2 text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 group w-full touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
                >
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{t('footer.privacy')}</span>
                </button>
                <button
                  onClick={handleImpressumClick}
                  className="flex items-center justify-center md:justify-end space-x-2 text-sm sm:text-base text-green-100 hover:text-white transition-colors duration-200 group w-full touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{t('footer.imprint')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-green-500/30">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="text-xs sm:text-sm text-green-200 text-center sm:text-left">
                © 2024 Grüne Fraktion Kirchhundem. {t('footer.allRightsReserved')}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showDatenschutz && (
        <DatenschutzContent onClose={closeDatenschutz} />
      )}
      
      {showImpressum && (
        <ImpressumContent onClose={closeImpressum} />
      )}
    </>
  );
};

export default Footer;