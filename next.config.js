const path = require('path')
require('dotenv').config()

module.exports = {
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'id',
  },
  future: {
    webpack5: true,
  },
  env: {
    API_PROTOCOL: process.env.API_PROTOCOL || 'http',
    API_HOST: process.env.API_HOST || 'localhost',
    API_PORT: process.env.API_PORT || '3000',
    API_VERSION: process.env.API_VERSION || '',

    API_IMAGE_PROTOCOL: process.env.API_IMAGE_PROTOCOL || 'http',
    API_IMAGE: process.env.API_IMAGE || 'localhost',
    API_IMAGE_PORT: process.env.API_IMAGE_PORT || '3000',
    API_IMAGE_VERSION: process.env.API_IMAGE_VERSION || '',
  },
  publicRuntimeConfig: {
    API_URL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/${process.env.API_VERSION}`,
    IMAGES_DOMAIN: `${process.env.API_IMAGE_PROTOCOL}://${process.env.API_IMAGE_HOST}:${process.env.API_IMAGE_PORT}/${process.env.API_IMAGE_VERSION}`
  },

  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [`${process.env.API_IMAGE_PROTOCOL}://${process.env.API_IMAGE_HOST}:${process.env.API_IMAGE_PORT}/${process.env.API_IMAGE_VERSION}`],
    path: '/_next/image',
    loader: 'default'
  },

  webpack: config => {
    config.resolve.alias['@/components'] = path.join(__dirname, 'components')
    config.resolve.alias['@/public'] = path.join(__dirname, 'public')
    config.resolve.alias['@/styles'] = path.join(__dirname, 'styles')
    config.resolve.alias['@/constants'] = path.join(__dirname, 'constants')
    config.resolve.alias['@/services'] = path.join(__dirname, 'services')
    config.resolve.extensions = ['.ts', '.tsx', '.js']
    return config
  }
}