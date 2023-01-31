import { KMSClient, DecryptCommand, GenerateDataKeyPairWithoutPlaintextCommand } from "@aws-sdk/client-kms";
import { writeFileSync, readFileSync, existsSync, mkdirSync  } from 'fs'
import path from 'path';
const config = useRuntimeConfig();

// AWS client
const credentials = {
  accessKeyId: config.providerAccessKeyId,
  secretAccessKey: config.providerSecretAccessKey,
}
const client = new KMSClient({ region: config.CmkRegion, credentials });

// Keys directory
const keysDirectory = path.join(process.cwd(), 'server/', config.dataKeysDir || 'keys');
if (!existsSync(keysDirectory)) {
  mkdirSync(keysDirectory, { recursive: true });
}

export async function makeDataKey() {
  const command = new GenerateDataKeyPairWithoutPlaintextCommand({
    KeyId: config.CmkKey,
    KeyPairSpec: 'RSA_2048'
  });

  const response = await client.send(command);
  try {
    writeFileSync(path.join(keysDirectory, 'data_public_key.bin'), Buffer.from(response.PublicKey as Buffer));
    writeFileSync(path.join(keysDirectory, 'data_private_key.bin'), Buffer.from(response.PrivateKeyCiphertextBlob as Buffer));
  } catch(error) {
    console.error(error)
    throw error
  }
}


export async function getEncryptedPrivateKey() {
  let uint8ArrayBuffer: Uint8Array;
  const filePath = path.join(keysDirectory, 'data_private_key.bin');
  try {
    uint8ArrayBuffer = readFileSync(filePath);
  } catch {
    await makeDataKey()
    uint8ArrayBuffer = readFileSync(filePath);
  }
  return new Uint8Array(uint8ArrayBuffer);
}

export async function getPublicKey() {
  let uint8ArrayBuffer: Uint8Array;
  const filePath = path.join(keysDirectory, 'data_public_key.bin');
  try {
    uint8ArrayBuffer = readFileSync(filePath);
  } catch {
    await makeDataKey()
    uint8ArrayBuffer = readFileSync(filePath);
  }

   return `-----BEGIN PUBLIC KEY-----\n${Buffer.from(uint8ArrayBuffer as Uint8Array).toString('base64')}\n-----END PUBLIC KEY-----`;
}

export async function decryptPrivateKey(encryptedPrivateKey: Uint8Array) {
  const command = new DecryptCommand({
    KeyId: config.CmkKey,
    CiphertextBlob: encryptedPrivateKey
  });
  const response = await client.send(command);
  return `-----BEGIN PRIVATE KEY-----\n${Buffer.from(response.Plaintext as Uint8Array).toString('base64')}\n-----END PRIVATE KEY-----`;
}
