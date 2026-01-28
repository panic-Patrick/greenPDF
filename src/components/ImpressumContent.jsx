import React from 'react';
import { X, FileText } from 'lucide-react';

const ImpressumContent = ({ onClose }) => {
  if (!onClose) return null;

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
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-headline">
                Impressum
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group touch-manipulation"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-2 touch-scroll">
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Angaben gemäß § 5 TMG</h4>
                <p className="text-gray-900 dark:text-gray-100">Bündnis 90/Die Grünen Kirchhundem</p>
                <p className="text-gray-900 dark:text-gray-100">57399 Kirchhundem</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Vertreten durch</h4>
                <p className="text-gray-900 dark:text-gray-100">Mike Warnecke (Fraktionsvorsitzender)</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Kontakt</h4>
                <div className="text-gray-900 dark:text-gray-100">
                  <span aria-label="E-Mail-Adresse:">Email: </span>
                  <a 
                    href="mailto:info@gruene-kirchhundem.de" 
                    className="text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    info@gruene-kirchhundem.de
                  </a>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Redaktionell verantwortlich</h4>
                <p className="text-gray-900 dark:text-gray-100">Patrick Kämpf</p>
                <div className="text-gray-900 dark:text-gray-100">
                  <span aria-label="E-Mail-Adresse:">Email: </span>
                  <a 
                    href="mailto:patrick@kaempf.nrw" 
                    className="text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    patrick@kaempf.nrw
                  </a>
                </div>
                <p className="text-gray-900 dark:text-gray-100">57399 Kirchhundem</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Hinweis zur Partei</h4>
                <p>
                  Diese Website wird betrieben von der Fraktion Bündnis 90/Die Grünen im Gemeinderat Kirchhundem.
                  Die Inhalte stellen die Positionen und Aktivitäten der Fraktion in Kirchhundem dar.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Hosting und technische Dienstleister</h4>
                <p className="mb-2">
                  Diese Website wird gehostet bei:
                </p>
                <p className="mb-2">
                  Strato AG<br/>
                  Pascalstraße 10, 10587 Berlin, Deutschland
                </p>
                <p className="mb-2">
                  Strato ist ein deutscher Hosting-Anbieter, der unsere Website bereitstellt. Weitere Informationen zu Strato finden Sie unter: <a href="https://www.strato.de" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">https://www.strato.de</a>
                </p>
                <p className="mb-2">
                  Für das Kontaktformular nutzen wir den Dienst "Formspree" der Formspree Inc. Dabei werden die über das Formular übermittelten Daten sicher verarbeitet und an uns weitergeleitet.
                </p>
                <p className="mb-2">
                  Zum Schutz vor Spam verwenden wir hCaptcha, einen Dienst der Intuition Machines, Inc. hCaptcha ist ein datenschutzfreundlicher Captcha-Dienst, der in Deutschland betrieben wird.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Streitschlichtung</h4>
                <p className="mb-2">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="mb-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-medium touch-manipulation"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumContent;