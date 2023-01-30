import { ClientEncryption } from 'mongodb-client-encryption'
const config = useRuntimeConfig()

export async function checkMongoDataKey(encryption: ClientEncryption) {
  const key = await encryption.getKeyByAltName(config.mongoDataKeyAltName)
  if (!key) {
    await encryption.createDataKey(config.provider as 'aws' | 'azure' | 'gcp' | 'local', {
      masterKey: {
        key: config.CmkKey,
        region: config.CmkRegion,
      },
      keyAltNames: [config.mongoDataKeyAltName],
    })
  }
}
