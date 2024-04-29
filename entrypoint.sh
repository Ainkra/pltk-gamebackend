#!/bin/bash
# This is the entrypoint.sh script

# Perform any necessary setup or environment variable checks here

# Execute Prisma migration command when the container starts

sleep 10

# Create database
# .env is mandatory to use this command, and
# your db url must be defined with dbname, otherwise it won't work
npx prisma db push

# Generate a migration, necessary to update db schema (table values, format, etc.)
npx prisma generate

# Execute migration
echo "y" | npx prisma migrate dev --name init

# Start Node.js application
node /app/index.js