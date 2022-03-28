const { constraintDirectiveTypeDefs } = require("graphql-constraint-directive");
const DefaultTypeDef = require("./default");
const PersonTypeDef = require("./personTypeDef");
const AuthPersonTypeDef = require("./authPersonTypeDef");
const ReceiptTypeDef = require("./receiptTypeDef");

module.exports = [
  constraintDirectiveTypeDefs,
  DefaultTypeDef,
  PersonTypeDef,
  AuthPersonTypeDef,
  ReceiptTypeDef,
];
