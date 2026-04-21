import { createI18n } from 'vue-i18n'

const messages = {
    fr: {
        home: 'Accueil',
        projects: 'Projets',
        welcome_message: 'Bienvenue sur mon portfolio !',
    },
    en: {
        home: 'Home',
        projects: 'Projects',
        welcome_message: 'Welcome to my portfolio !',
    }
}

const savedLocale = localStorage.getItem('user-locale')
    || navigator.language.split('-')[0]
    || 'fr';

const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    globalInjection: true,
    messages
})

export default i18n