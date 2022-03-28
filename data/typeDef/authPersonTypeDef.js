const { gql } = require("apollo-server-express");

module.exports = gql`
  type Token {
    token: String
    username: String
    status: Boolean
  }

  input AuthPersonInput {
    username: String! @constraint(minLength: 3, maxLength: 100)
    password: String! @constraint(minLength: 3, maxLength: 100)
  }

  extend type Mutation {
    authPerson(input: AuthPersonInput!): Token
  }
`;
