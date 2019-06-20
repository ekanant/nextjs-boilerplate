const NextI18Next = require('next-i18next/dist/commonjs')

const NextI18NextInstance = new NextI18Next({
  localeSubpaths: 'foreign',
  defaultLanguage: 'th-th',
  otherLanguages: ['en-th'],
  lowerCaseLng: true
})

module.exports = NextI18NextInstance