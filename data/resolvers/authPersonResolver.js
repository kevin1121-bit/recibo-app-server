const { Person } = require("../db");
const { createToken } = require("../../utils/tokenCreate");
const config = require("../../config");

const resolvers = {
  Query: {},
  Mutation: {
    authPerson: async (_, { input }) => {
      try {
        let result = {
          token: "",
          username: "",
          status: false,
        };
        const findPerson = await Person.findOne(
          {
            $and: [{ username: input.username }, { password: input.password }],
          },
          { username: 1, password: 1 }
        ).exec();
        if (findPerson) {
          const valueToken = { username: findPerson.username };
          result.token = createToken(valueToken, config.jwt.secretJwt);
          result.username = findPerson.username;
          result.status = true;
        } else {
          result.message = "Username or password incorrrect";
          result.status = false;
        }
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = resolvers;
