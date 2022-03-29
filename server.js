const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./data/typeDef");
const resolvers = require("./data/resolvers");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const port = 8080; // default port to listen

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      try {
        if (req.body.operationName !== "AuthPerson") {
          const token = req.headers.authorization;
          if (
            token &&
            req.headers.authorization !== undefined &&
            token !== null
          ) {
            const personNow = jwt.verify(token, process.env.JWT_KEY_SECRET);
            if (personNow) {
              req.personNow = personNow;
              return { personNow };
            } else {
              throw new Error("invalid token");
            }
          }
        }
      } catch {
        throw new AuthenticationError("Error");
      }
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  // start the Express server
  httpServer.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
}

startServer();
