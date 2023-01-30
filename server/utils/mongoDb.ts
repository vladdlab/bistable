import { MongoClient, MongoClientOptions  } from "mongodb";
import { ClientEncryption, ClientEncryptionOptions } from 'mongodb-client-encryption'
import { checkMongoDataKey } from "./checkMongoDataKey";

class MongoDb {
  private _client: MongoClient | undefined;
  private _encryption: ClientEncryption | undefined;

  get client(): MongoClient | never  {
    if (!this._client) {
      throw new Error("MongoClient has not been connected yet. Run connectToMongo() first.");
    }
    return this._client;
  }
  set client(input: MongoClient) {
    this._client = input;
  }

  get encryption(): ClientEncryption | never  {
    if (!this._encryption) {
      throw new Error("MongoClient has not been connected yet. Run connectToMongo() first.");
    }
    return this._encryption;
  }
  set encryption(input: ClientEncryption ) {
    this._encryption = input;
  }

  async connect(url: string, options: MongoClientOptions, encryptionOptions?: ClientEncryptionOptions ) {
    try {
      this._client = new MongoClient(url, options);

      await this._client.connect();

      if (encryptionOptions) {
        this._encryption = new ClientEncryption(this._client, encryptionOptions)
        await checkMongoDataKey(this._encryption)
      }
      console.log(`Successfully connected to database`);
    } catch (error) {
      console.error("DB connection failed.", error)
      throw error;
    }
  }
}

export const mongoDb = new MongoDb()
