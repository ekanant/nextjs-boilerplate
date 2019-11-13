const NextI18Next = require('next-i18next').default

module.exports = new NextI18Next({
    localeSubpaths: {
        'th-th': 'th-th',
        'en-th': 'en-th',
    },
    defaultLanguage: 'th-th',
    otherLanguages: ['en-th'],
    lowerCaseLng: true,
    localePath: './public/static/locales'
})