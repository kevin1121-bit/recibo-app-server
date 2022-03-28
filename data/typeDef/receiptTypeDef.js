const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Receipt {
    idPublic: String
    consecutive: Int
    title: String
    peso: Int
    createDate: Date
    price: Int
    unitPrice: Int
    person: Person
    address: String
    isModifiedReceipt: Boolean
    personModified: Person
    dateModified: Date
  }

  input CreateReceiptInput {
    username: String! @constraint(minLength: 3, maxLength: 100)
    title: String! @constraint(minLength: 3, maxLength: 100)
    peso: Int
    price: Int!
    unitPrice: Int
    address: String
  }

  input ModifiedReceiptInput {
    idPublic: String! @constraint(minLength: 3, maxLength: 200)
    username: String! @constraint(minLength: 3, maxLength: 100)
    title: String! @constraint(minLength: 3, maxLength: 100)
    peso: Int
    price: Int!
    unitPrice: Int
    address: String
  }
  input RemoveReceiptInput {
    idPublic: String! @constraint(minLength: 3, maxLength: 200)
  }

  extend type Query {
    getReceipt: [Receipt]
  }

  extend type Mutation {
    createReceipt(input: CreateReceiptInput!): Response
    modifiedReceipt(input: ModifiedReceiptInput!): Response
    removeReceipt(input: RemoveReceiptInput!): Response
  }
`;
