> [!IMPORTANT]
> # Project Status: Not Maintained
> This project is not maintained and serves solely as a showcase of my skills.
> Please note that this project is deliberately incomplete and is intended to give recruiters a first glimpse of my capabilities. It includes various aspects of my learning journey, demonstrating my understanding and application of different technologies.
> 
> Feel free to explore, but be aware that there might be security issues and deprecated features, as the project is no longer actively maintained. If you have any questions or need further information about my skills and experience, don't hesitate to reach out.

## Dependencies
- NodeJS v16.0.0
- Prisma v4.16.2
- TypeScript v5.2.2
- GraphQL v15.8.0

# Architectury explanation
## Explanation
The architecture contains three mains folders. The src folder, interfaces, and the prisma folder.

### api folder
Contains the apollo server program. Started by the index.ts, the apollo server can be used to communicate with another project using the Graphql query language. This part allows graphql schemas and resolvers to be linked together. This part is also intended to be able to contain other services, such as a connection to other backends, a websocket, etc.

### data folder
The data folder contains all the data processing and business logic for the project. This folder contains the resolvers, enabling the various tasks required to run the project, communication with the database, etc. The resolvers are linked (and must be linked) in the ResolverLinker file. This file is used to simply link the resolvers together, so it is necessary to include them in this file each time they are added. Data folder also contain GraphQL codegen code, and external services like stripe, keycloak etc.

### prisma folder
This folder contains all migration and database schema. This last is mandatory if
you want update them.

### libs folder
The libs folder contains the various code components needed for the project to function properly. It contains 4 sub-folders. Interface contains the class interfacing, misc contains various fragments of code that are more or less useful to the developer, providers contains fragments of code that are useful for accessing external services, and Utils, which is aptly named because it contains bits of 'tool' code for our project.

## App Store Server API

### Subscription status
- Active = 1,
- Expired = 2,
- InBillingRetry = 3,
- InBillingGracePeriod = 4,
- Revoked = 5

# How to commit?
## Commits convention
```
<type>(<scope>): <subject>
```
### Possible types
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

# Instructions for Prisma use
## What is Prisma?
Prisma is an open source ORM that makes it easy to communicate with any database, including MySQL, PostgreSQL and SQLite. Prisma can also be connected to NoSQL databases (Firebase, MongoDB, etc).
Prisma's power lies in its schemas, making it easy to design a data schema.
Prisma also has a large community, and is updated regularly.

## Init tables

- Create your schema (example below)
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Users {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(255)
  email     String   @unique @db.VarChar(255)
  password  String   @db.VarChar(255)
  createdAt DateTime @db.Timestamptz(6)
  updatedAt DateTime @db.Timestamptz(6)
}
```
- Migrate your schema -> `npx prisma migrate dev --name init`

### How migrate if i already have rows in my DB?
https://www.prisma.io/docs/orm/prisma-migrate/workflows/customizing-migrations#example-rename-a-field

## Clear NPM cache

- `npm cache verify`
- `npm cache clean --force`
- `npm cache verify`

## Use more than one schema.prisma
You need to specify the path when you create your new prisma client.
--schema is mandatory for works.
`prisma generate --schema ./database/myschema.prisma`

Example of use multiple schema

```
import * from './path-to-car-schema.prisma';
import * from './path-to-race-schema.prisma';
const { PrismaClient: CarPrismaClient } = require('./path-to-car/generated');
const { PrismaClient: RacePrismaClient } = require('./path-to-race/generated');
const carPrisma = new CarPrismaClient();
const racePrisma = new RacePrismaClient();
```

## Usefull commands

- `npx tsc` Compile TS in JS
- `npm run serve` Run apollo, database and compile in JS
- `npm run generate` Run graphql codegen

## Important

1. This project need `interfaces` repository and also `.env` file who's contain
all necessary credentials. .env and interfaces are all local, NEVER in a repository.
2. If you want to add a new resolver, keep in mind data must only be processed as input in a resolver. Output processing is basically useless, and can also cause errors. Keep it simple stupid.
3. You can use `libs` folder for adding miscellaneous feature in the project
