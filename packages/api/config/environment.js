const { config } = require("dotenv");

config();

exports.environment = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_SECRET_ID: process.env.LINKEDIN_SECRET_ID,
  CALLBACK_URL: process.env.CALLBACK_URL,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URI_PROD: process.env.DATABASE_URI_PROD,
  DATABASE_URI_TEST: process.env.DATABASE_URI_TEST,
  DATABASE_URI_DEVELOP: process.env.DATABASE_URI_DEVELOP,
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
  SERVER_ROOT_URI: process.env.SERVER_ROOT_URI,
  DATABASE_URI: process.env.DATABASE_URI,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  FB_CLIENT_ID: process.env.FB_CLIENT_ID,
  FB_CLIENT_SERECT: process.env.FB_CLIENT_SERECT,
  FB_CALLBACK_URL: process.env.FB_CALLBACK_URL,
  FILE_SIZE: process.env.FILE_SIZE,
  API_KEY: process.env.API_KEY,
  MODEL_KEY: process.env.MODEL_KEY,
};
