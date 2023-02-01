import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms";
const config = useRuntimeConfig();

// AWS client
const credentials = {
  accessKeyId: config.providerAccessKeyId,
  secretAccessKey: config.providerSecretAccessKey,
}
const client = new KMSClient({ region: config.CmkRegion, credentials });

export async function getPublicKey() {
   return `-----BEGIN PUBLIC KEY-----\n${config.dataKeyPb}\n-----END PUBLIC KEY-----`;
}

export async function getPrivateKey() {
  try {
    const encryptedPrivateKey = new Uint8Array(Buffer.from(config.dataKeyPr, 'base64'));
    const command = new DecryptCommand({
      KeyId: config.CmkKey,
      CiphertextBlob: encryptedPrivateKey
    });
    const response = await client.send(command);
    return `-----BEGIN PRIVATE KEY-----\n${Buffer.from(response.Plaintext as Uint8Array).toString('base64')}\n-----END PRIVATE KEY-----`;
  } catch (error) {
    console.error(error)
    throw error

  }
}
