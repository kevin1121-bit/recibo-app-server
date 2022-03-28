const { gql } = require("apollo-server-express");

module.exports = gql`
  type Person {
    id: ID
    username: String
    password: String
  }

  type Response {
    status: Boolean
    message: String
  }

  input SavePersonInput {
    username: String! @constraint(minLength: 3, maxLength: 100)
    password: String! @constraint(minLength: 3, maxLength: 100)
  }

  extend type Query {
    getPerson: [Person]
  }

  extend type Mutation {
    createPerson(input: SavePersonInput!): Response
  }
`;
