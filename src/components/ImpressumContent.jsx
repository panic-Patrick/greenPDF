import React from 'react';

const ImpressumContent = () => {
  return (
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
  );
};

export default ImpressumContent;