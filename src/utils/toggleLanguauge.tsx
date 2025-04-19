import i18n from '../language/i18n';


export const ToggleLanguage = () => {
  const newLang = i18n.language === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLang);
};