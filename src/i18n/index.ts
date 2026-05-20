import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const normalizeLanguage = (lang?: string): string => {
  if (!lang) return 'en';

  const code = lang.toLowerCase().split('-')[0]; // "en-US" → "en"
  return ['en', 'ar'].includes(code) ? code : 'en';
};

const deviceLanguage = normalizeLanguage(
  RNLocalize.getLocales()?.[0]?.languageCode,
);

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
