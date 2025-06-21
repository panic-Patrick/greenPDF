import React from 'react';
import { X, Shield } from 'lucide-react';

const DatenschutzContent = ({ onClose }) => {
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
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-headline">
                Datenschutzerklärung
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
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">1. Datenschutz auf einen Blick</h4>
                <h5 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Allgemeine Hinweise</h5>
                <p className="mb-4">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
                <h5 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Datenerfassung auf dieser Website</h5>
                <p className="font-medium mt-2 text-gray-900 dark:text-gray-100">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
                <p className="mb-2">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
                <p className="font-medium mt-2 text-gray-900 dark:text-gray-100">Wie erfassen wir Ihre Daten?</p>
                <p className="mb-2">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in das Kontaktformular eingeben.
                </p>
                <p className="mb-2">
                  Andere Daten werden automatisch durch unsere IT-Systeme erfasst, wenn Sie die Website besuchen. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>
                <p className="font-medium mt-2 text-gray-900 dark:text-gray-100">Wofür nutzen wir Ihre Daten?</p>
                <p className="mb-2">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
                <p className="font-medium mt-2 text-gray-900 dark:text-gray-100">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
                <p className="mb-2">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">2. Hosting</h4>
                <p>
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <h5 className="font-medium mt-2 mb-1 text-gray-900 dark:text-gray-100">Strato AG</h5>
                <p className="mb-2">
                  Diese Website wird bei der Strato AG gehostet. Anbieter ist die Strato AG, Pascalstraße 10, 10587 Berlin, Deutschland (nachfolgend "Strato").
                </p>
                <p className="mb-2">
                  Strato ist ein deutscher Hosting-Anbieter mit Sitz in Berlin. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern von Strato in Deutschland gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
                </p>
                <p className="mb-2">
                  Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Besuchern (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="mb-2">
                  Strato wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen. Alle Server befinden sich in Deutschland und unterliegen deutschem Datenschutzrecht.
                </p>
                <p className="mb-2">
                  Wir haben mit Strato einen Auftragsverarbeitungsvertrag (AVV) geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass Strato die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
                </p>
                <p className="mb-2">
                  Weitere Informationen zur Datenverarbeitung durch Strato finden Sie in der Datenschutzerklärung von Strato: <a href="https://www.strato.de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline">https://www.strato.de/datenschutz/</a>
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h4>
                <h5 className="font-medium mt-2 mb-1 text-gray-900 dark:text-gray-100">Datenschutz</h5>
                <p className="mb-2">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p className="mb-2">
                  Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">4. Datenerfassung auf dieser Website</h4>
                <h5 className="font-medium mt-2 mb-1 text-gray-900 dark:text-gray-100">Cookies und lokale Speicherung</h5>
                <p className="mb-2">
                  Unsere Internetseiten verwenden so genannte "Cookies" und lokale Speichertechnologien. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>
                <h5 className="font-medium mt-4 mb-1 text-gray-900 dark:text-gray-100">Technisch notwendige Cookies und lokale Speicherung</h5>
                <p className="mb-2">
                  Wir verwenden folgende technisch notwendige Speichertechnologien:
                </p>
                <ul className="list-disc pl-5 mt-1 mb-2">
                  <li>Spracheinstellung: Speichert Ihre gewählte Sprache (Deutsch/Englisch) im lokalen Speicher Ihres Browsers</li>
                  <li>Design-Modus: Speichert Ihre Präferenz für hellen oder dunklen Modus im lokalen Speicher</li>
                  <li>Session-Cookies: Technisch erforderliche Cookies für die Bereitstellung der Website</li>
                </ul>
                <p className="mb-2">
                  Diese Cookies und Speichertechnologien sind für die ordnungsgemäße Funktion der Website erforderlich und können nicht deaktiviert werden. Die Rechtsgrundlage für diese Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung der Website).
                </p>
                <p className="mb-2">
                  Die im lokalen Speicher gespeicherten Daten verbleiben auf Ihrem Gerät, bis Sie diese selbst löschen oder Ihren Browser-Cache leeren. Sie werden nicht an uns oder Dritte übertragen.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">5. Plugins und Tools</h4>
                <h5 className="font-medium mt-2 mb-1 text-gray-900 dark:text-gray-100">Lokale Schriftarten</h5>
                <p className="mb-2">
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten lokale Schriftarten, die auf unserem Server gespeichert sind. Es werden keine externen Schriftarten von Drittanbietern geladen, wodurch keine Daten an externe Server übertragen werden.
                </p>
                <p className="mb-2">
                  Die Verwendung lokaler Schriftarten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website unter Wahrung des Datenschutzes.
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

export default DatenschutzContent;