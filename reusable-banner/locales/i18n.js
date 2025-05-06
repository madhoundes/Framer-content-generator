import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslations from './en.json';
import arTranslations from './ar.json';

// Only initialize if i18n hasn't been initialized yet
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: enTranslations,
        ar: arTranslations
      },
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false // React already escapes values
      },
      react: {
        useSuspense: false
      }
    });
}

export default i18n; 