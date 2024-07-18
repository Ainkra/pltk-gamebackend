import { PrismaClient } from "@prisma/client";

/**
 * Prisma instance, used for crud operation.
 * Don't instances prisma anything else than there.
 * 
 * Prisma team recommend to use only one prisma client, that's
 * why we instance them there
 */
export const prisma = new PrismaClient;