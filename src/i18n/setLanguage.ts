import i18n from './index';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { AppLanguage } from './types';

const RTL_LANGUAGES: AppLanguage[] = ['ar'];

export const setAppLanguage = async (lang: AppLanguage): Promise<void> => {
  try {
    const isRTL = RTL_LANGUAGES.includes(lang);

    await AsyncStorage.setItem('appLanguage', lang);

    await i18n.changeLanguage(lang);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);

      RNRestart.Restart();
    }
  } catch (error) {
    console.error('setAppLanguage error:', error);
  }
};
