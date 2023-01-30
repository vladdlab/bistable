import jwt, { SignOptions } from 'jsonwebtoken';
import { getEncryptedPrivateKey, decryptPrivateKey, getPublicKey } from './dataEncryptionKeys'

export const signJwt = async (payload: Object, options: SignOptions = {}) => {
  const encryptedPrivateKey = await getEncryptedPrivateKey();
  const privateKey = await decryptPrivateKey(encryptedPrivateKey)

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = async <T>(token: string): Promise<T | null> => {
  try {
    const publicKey = await getPublicKey();
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
