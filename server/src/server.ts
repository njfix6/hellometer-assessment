import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { root } from "./resolvers";
import schema from "./schema";

const server = express();

server.use("*", cors());

// setup graphql
server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default server;
