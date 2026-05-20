import { I18nManager } from 'react-native';

export const rtl = {
  textAlign: I18nManager.isRTL ? 'left' : 'left',
  inputTextAlign: I18nManager.isRTL ? 'right' : 'left',
  //   flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
} as const;
