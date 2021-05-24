module.exports = {
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
}