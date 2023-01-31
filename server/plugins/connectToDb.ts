import { mongoDb } from '~~/server/utils/mongoDb'
const config = useRuntimeConfig();

const keyVaultNamespace = `${config.mongoKeyVaultDatabase}.${config.mongoKeyVaultCollection}`;
const kmsProviders = {
  [config.provider]: {
    accessKeyId: config.providerAccessKeyId,
    secretAccessKey: config.providerSecretAccessKey,
  },
};
const encryptionOptions = {
  keyVaultNamespace,
  kmsProviders,
}

export default defineNitroPlugin(async () => {
  try {
    await mongoDb.connect(config.mongoUrl, {
      serverSelectionTimeoutMS: 10000,
      minPoolSize: 2,
      autoEncryption: {
        keyVaultNamespace,
        kmsProviders,
        bypassAutoEncryption: true,

      },
    }, encryptionOptions);
  } catch (error) {
    console.error("DB connection failed.", error)
  }
})
