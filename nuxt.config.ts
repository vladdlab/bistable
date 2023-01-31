// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    mongoKeyVaultDatabase: process.env.MONGO_KEY_VAULT_DATABASE,
    mongoKeyVaultCollection: process.env.MONGO_KEY_VAULT_COLLECTION,
    mongoDataKeyAltName: process.env.MONGO_DATA_KEY_ALT_NAME,
    provider: process.env.PROVIDER,
    providerAccessKeyId: process.env.PROVIDER_ACCESS_KEY_ID,
    providerSecretAccessKey: process.env.PROVIDER_SECRET_ACCESS_KEY,
    CmkKey: process.env.CMK_KEY,
    CmkRegion: process.env.CMK_REGION,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    dataKeyPr: process.env.DATA_KEY_PR,
    dataKeyPb: process.env.DATA_KEY_PB

  },
  nitro: {
    storage: {
      'redis': {
        driver: 'redis',
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        db: process.env.REDIS_DB,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
      }
    }
  },
})
