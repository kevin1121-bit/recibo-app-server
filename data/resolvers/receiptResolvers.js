const { Receipt, Person } = require("../db");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    getReceipt: async (_, __) => {
      try {
        const findReceipt = await Receipt.find()
          .populate("person")
          .populate("personModified")
          .exec();
        if (findReceipt) {
          return findReceipt.map((value) => {
            return { ...value._doc };
          });
        }
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createReceipt: async (_, { input }) => {
      try {
        let results = {
          message: "",
          status: false,
          error: "",
        };

        const findPerson = await Person.findOne(
          { username: input.username },
          { _id: 1 }
        ).exec();
        let consecutiveNum;

        const findReceiptConsecutive = await Receipt.find().exec();
        if (findReceiptConsecutive.length !== 0) {
          consecutiveNum =
            findReceiptConsecutive[findReceiptConsecutive.length - 1]
              .consecutive + 1;
        } else {
          consecutiveNum = 0;
        }

        if (findPerson && findReceiptConsecutive) {
          const createSchema = new Receipt({
            idPublic: uuidv4(),
            consecutive: consecutiveNum,
            title: input.title,
            peso: input.peso,
            price: input.price,
            unitPrice: input.unitPrice,
            person: findPerson.id,
            address: input.address,
          });

          const saveSchema = createSchema.save();
          if (saveSchema) {
            results.message = "successfully";
            results.status = true;
          } else {
            throw Error("Imposible update");
          }
        } else {
          throw Error("Person not found");
        }
        return results;
      } catch (err) {
        return err;
      }
    },
    modifiedReceipt: async (_, { input }) => {
      try {
        let results = { message: "", status: false, error: "" };
        const findPerson = await Person.findOne(
          { username: input.username },
          { _id: 1 }
        ).exec();

        if (findPerson) {
          const updateReceipt = await Receipt.updateOne(
            { idPublic: input.idPublic },
            {
              $set: {
                title: input.title,
                peso: input.peso,
                price: input.price,
                unitPrice: input.unitPrice,
                address: input.address,
                isModifiedReceipt: true,
                personModified: findPerson.id,
                dateModified: Date.now(),
              },
            }
          ).exec();

          if (updateReceipt) {
            results.message = "successfully";
            results.status = true;
          } else {
            throw Error("Imposible update");
          }
        } else {
          throw Error("Person not found");
        }
        return results;
      } catch (err) {
        return err;
      }
    },
    removeReceipt: async (_, { input }) => {
      try {
        let results = { message: "", status: false };
        const receiptRemove = await Receipt.deleteMany({
          idPublic: input.idPublic,
        }).exec();
        if (receiptRemove) {
          results.message = "Successfully";
          results.status = true;
        } else {
          throw Error("Remove imposible");
        }
        return results;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = resolvers;
