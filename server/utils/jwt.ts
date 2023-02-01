import jwt, { SignOptions } from 'jsonwebtoken';
import { getPrivateKey, getPublicKey } from './dataEncryptionKeys'

export const signJwt = async (payload: Object, options: SignOptions = {}) => {
  const privateKey = await getPrivateKey()

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
