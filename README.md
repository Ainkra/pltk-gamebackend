# Game backend - Vrombr 🏎️

This project is the backend side of the game Vrombr who's permit
to gamify the game. This project work under dependencies below.

## Dependencies
- NodeJS v16.0.0
- Prisma v4.16.2
- TypeScript v5.2.2
- GraphQL v15.8.0

# Architectury explanation
## Introduction
The architecture of vrombr's GameBackend project is inspired by Solid principles, but also by the original architecture that a NestJS project might have. The architecture is simple and modular.

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

>
# If you want to take over the project 
## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.polyptik.com/vrombr/race/backend/game-backend.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.polyptik.com/vrombr/race/backend/game-backend/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
