# Stage 1: Build
FROM node:16-slim AS build

COPY . /app
WORKDIR /app

RUN npm install
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run generate
RUN npx prisma migrate deploy
RUN npx tsc

# Stage 2: Production
FROM node:16-slim

RUN apt-get update -y \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY --from=build --chown=1000:1000 /app/build /app
COPY --from=build --chown=1000:1000 /app/package.json /app/
COPY --from=build --chown=1000:1000 /app/package-lock.json /app/
COPY --from=build --chown=1000:1000 /app/interfaces /interfaces
COPY --from=build --chown=1000:1000 /app/prisma /app/prisma
COPY --from=build --chown=1000:1000 /app/entrypoint.sh /app/

WORKDIR /app
USER 1000:1000

# Ensure dependencies are installed
RUN npm install
RUN npx prisma generate 

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
