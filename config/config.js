require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  DATABASE: {
    CONNECT_URL: process.env.DATABASE_URL,
    USERNAME: process.env.USERNAME,
    FIRST_NAME: process.env.FIRST_NAME,
    LAST_NAME: process.env.LAST_NAME,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  },
  JWT_AUTH_TOKEN: process.env.JWT_AUTH_TOKEN,
  SALT_ROUND: process.env.SALT_ROUND,
  AWS_KEYS: {
    ACCESS_KEY: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
  }
};

module.exports = config;
