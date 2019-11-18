const NextI18Next = require('next-i18next').default
const localePath =  typeof window === "undefined" ? "public/static/locales" : "static/locales";

module.exports = new NextI18Next({
    fallbackLng: 'th-th',
    localeSubpaths: {
        'en-th': 'en-th',
    },
    defaultLanguage: 'th-th',
    otherLanguages: ['en-th'],
    lowerCaseLng: true,
    localePath,
    serverLanguageDetection: false,
})