import i18n from '../i18n';

export const nameRegex = /^[A-Za-z ]{2,30}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[0-9]{10}$/;
export const passwordRegex = /^.{6,}$/;

export const getValidationError = (field: string, value: string) => {
  switch (field) {
    case 'name':
      if (!value) return i18n.t('validation.nameRequired');
      if (!nameRegex.test(value)) return i18n.t('validation.nameInvalid');
      return '';

    case 'email':
      if (!value) return i18n.t('validation.emailRequired');
      if (!emailRegex.test(value)) return i18n.t('validation.emailInvalid');
      return '';

    case 'phone':
      if (!value) return i18n.t('validation.phoneRequired');
      if (!phoneRegex.test(value)) return i18n.t('validation.phoneInvalid');
      return '';

    case 'password':
      if (!value) return i18n.t('validation.passwordRequired');
      if (!passwordRegex.test(value)) return i18n.t('validation.passwordMin');
      return '';

    default:
      return '';
  }
};
