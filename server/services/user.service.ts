import { ObjectId } from "mongodb";
import { mongoDb } from "~~/server/utils/mongoDb";
import { signJwt } from '~~/server/utils/jwt'
import { User } from '~~/server/schemas/user.schema'
const config = useRuntimeConfig();


export const findUserById = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const user = await (mongoDb.client.db("bistable").collection<User>('users').findOne(query));
  return user
}

export const findUser = async (query: { name?: string, email?: string }) => {
  return await mongoDb.client.db("bistable").collection<User>('users').findOne(query);
};

export const findAllUsers = async () => {
  return (await mongoDb.client.db("bistable").collection<User>('users').find({}).toArray());
}

export const createUser = async (user: User) => {
  user.password = (await mongoDb.encryption.encrypt(user.password, { keyAltName: config.mongoDataKeyAltName, algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic' })).toString()
  const result = await mongoDb.client.db("bistable").collection<User>('users').insertOne(user);
  user._id = result.insertedId;
  return user;
}

export const signToken = async (user: User) => {
  const access_token = await signJwt(
    { sub: user._id },
    {
      expiresIn: `${config.accessTokenExpiresIn}m`,
    }
  );

  await useStorage().setItem((user._id).toString(), user, {
    EX: 60 * 60 * 60,
  });

  return access_token;
};
