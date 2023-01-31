import { MongoClient } from "mongodb";
import { ClientEncryption } from 'mongodb-client-encryption'
import { checkMongoDataKey } from "./checkMongoDataKey";
const config = useRuntimeConfig();

const keyVaultNamespace = `${config.mongoKeyVaultDatabase}.${config.mongoKeyVaultCollection}`;
const kmsProviders = {
  [config.provider]: {
    accessKeyId: config.providerAccessKeyId,
    secretAccessKey: config.providerSecretAccessKey,
  },
};

export const client = new MongoClient(config.mongoUrl, {
  minPoolSize: 2,
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    bypassAutoEncryption: true,
  },
})

export const encryption = new ClientEncryption(client, {
  keyVaultNamespace,
  kmsProviders,
})

checkMongoDataKey(encryption);
