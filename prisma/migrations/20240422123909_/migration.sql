/*
  Warnings:

  - Added the required column `isDone` to the `StripePaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StripePaymentHistory" ADD COLUMN     "isDone" BOOLEAN NOT NULL;
