import i18n from 'i18next';
import app from './en/app.json';
import homePage from './en/homePage.json';
import login from './en/login.json';
import user from './en/user.json';
import resource from './en/resource.json';
import registration from './en/registration.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    app,
    homePage,
    login,
    registration,
    resource,
    user,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['app', 'homePage', 'login', 'registration', 'resource', 'user'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export default i18n;
