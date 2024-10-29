import i18n from '../../i18n';

export const toggleLanguage = async () => {
  const newLang = i18n.language === 'en' ? 'ms' : 'en';
  i18n.changeLanguage(newLang);
};
