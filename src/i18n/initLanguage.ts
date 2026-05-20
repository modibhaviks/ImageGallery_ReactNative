import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18n from './index';
import { AppLanguage } from './types';

const normalizeLanguage = (lang?: string): AppLanguage => {
  if (!lang) return 'en';

  const code = lang.toLowerCase().split('-')[0];

  return code === 'ar' ? 'ar' : 'en';
};

export const initLanguage = async (): Promise<AppLanguage> => {
  try {
    const savedLang = await AsyncStorage.getItem('appLanguage');

    const language: AppLanguage =
      (savedLang as AppLanguage) ||
      normalizeLanguage(RNLocalize.getLocales()?.[0]?.languageCode);

    await i18n.changeLanguage(language);

    return language;
  } catch (error) {
    console.error('initLanguage error:', error);

    await i18n.changeLanguage('en');
    return 'en';
  }
};
