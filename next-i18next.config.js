const path = require('path')

module.exports = {
  i18n: {
    // localeDetection: true,
    defaultLocale: 'id',
    locales: ['en', 'id'],
    localePath: path.resolve('./public/static/locales')
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    //   {
    //     domain: 'example.id',
    //     defaultLocale: 'id',
    //   }
    // ],
  },
}