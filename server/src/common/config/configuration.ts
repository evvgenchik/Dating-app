export const config = () => ({
  PORT: parseInt(process.env.PORT) || 4000,
  CRYPT_SALT: parseInt(process.env.CRYPT_SALT, 10) || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 1010,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY || 1010,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME || 2400 ** 2400,
  TOKEN_REFRESH_EXPIRE_TIME:
    process.env.TOKEN_REFRESH_EXPIRE_TIME || 9999 ** 99999,
});
