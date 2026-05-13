import { createI18n } from 'vue-i18n'

const messages = {
    fr: {
        resume_dl: 'Télécharger mon CV',
        home: 'Accueil',
        presentation: 'Présentation',
        pres_sentence: "De mes premiers scripts au collège à la conception d'applications web modernes :\n un parcours guidé par la passion du code sous toutes ses formes.",
        projects: 'Projets',
        welcome_message: 'Bienvenue sur mon portfolio !',
    },
    en: {
        resume_dl: 'Download my resume',
        home: 'Home',
        presentation: 'Presentation',
        pres_sentence: 'From my first scripts in middle school to designing modern web applications:\n a journey driven by a passion for code in all its forms.',
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