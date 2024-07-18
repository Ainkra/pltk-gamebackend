import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { resolverLinker } from '../data/ResolverLinker';
import { LoggingColor } from '../libs/misc/LoggingColor';
import { prisma } from '../libs/database/PrismaClient';
const express = require('express');
require('dotenv').config();
//
const app = express();
const port = process.env.SERVER_PORT || 4000;
let server: ApolloServer;

/**
 * TypeDefs definition
 */
const typeDefs = loadSchemaSync(
  path.join(__dirname, "../../interfaces/schema_game.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

/**
 * This function permit to try the connection at
 * database. if the connection fails, the backend 
 * still works, but without the database
 */
async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log(LoggingColor.valid, '✅ Database connection successful')
  } catch (error) {
    console.error(LoggingColor.error, '❌ Database connection failed.', error)
  }
}

/**
 * Update this const for add other typedefs.
 * typedefs must follow gameTypeDefs patterns.
 */
// const typeDefs: GraphQLSchema[] = [gameTypeDefs];
server = new ApolloServer({
  typeDefs,
  resolvers: resolverLinker,
});

/**---------------------------
 * Start ApolloServer
 -----------------------------*/
async function startGameBackend() {
  await server.start();
  server.applyMiddleware({ app });
}

/**-----------------------------
 * Start asynchronously (needed)
 ------------------------------*/
export default async function gameBackendService() {
  await testDatabaseConnection();
  await startGameBackend();
  if (server) {
    app.listen(port, () => {
      console.log(LoggingColor.valid, `🚀 http://localhost:${port}${server!.graphqlPath}`);
    });
  } else {
    console.error(LoggingColor.error, `❌ Gamebackend did not start.`);
  }
}

