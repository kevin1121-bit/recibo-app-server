const { Person } = require("../db");
const resolvers = {
  Query: {
    getPerson: async (_) => {
      try {
        const findPerson = await Person.find(
          {},
          { username: 1, password: 1 }
        ).exec();
        if (findPerson) {
          return findPerson.map((re) => {
            return {
              ...re._doc,
            };
          });
        } else {
          throw new Error("Error, empty");
        }
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createPerson: async (_, { input }) => {
      try {
        let result = {
          message: "",
          status: false,
        };
        const findPersonEquals = await Person.findOne(
          { username: input.username },
          { username: 1 }
        ).exec();
        if (findPersonEquals) {
          result.status = false;
          result.message = "User already exists";
        } else {
          const personSchema = new Person({
            username: input.username,
            password: input.password,
          });
          const savePersonSchema = personSchema.save();
          if (savePersonSchema) {
            result.message = "successfully";
            result.status = true;
          } else {
            throw new Error("Imposilble update");
          }
        }
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = resolvers;
