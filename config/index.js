require("dotenv").config();

module.exports = {
  jwt: {
    secretJwt: process.env.JWT_KEY_SECRET,
  },
  db: {
    url: process.env.MONGO_URL_DEV,
  },
  origins: [`${process.env.ORIGIN}:${process.env.PORT_CLIENT}/`],
  port: process.env.PORT,
};
