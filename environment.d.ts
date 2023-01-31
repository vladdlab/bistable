export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      MONGO_KEY_VAULT_DATABASE: string;
      MONGO_KEY_VAULT_COLLECTION: string;
      MONGO_DATA_DATABASE: string;
      ACCESS_TOKEN_EXPIRES_IN: string;

      REDIS_USER: string;
      REDIS_USER: string;

      PROVIDER: 'aws' | 'azure' | 'gcp' | 'local';
      PROVIDER_ACCESS_KEY_ID: string;
      PROVIDER_SECRET_ACCESS_KEY: string;
      CMK_KEY: string;
      CMK_REGION: string;
    }
  }
}
