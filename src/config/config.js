import dotenv from 'dotenv';

dotenv.config();

export default {
  app: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
  },
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY,
    privateKey: process.env.JWT_PRIVATE_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshIn: process.env.JWT_REFRESH_IN,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  },
  aws: {
    s3: {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET_NAME,
    },
  },
};
