import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
require("dotenv").config();

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  .catch((err) => console.log(err));
