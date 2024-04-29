/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `GooglePaymentHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `GooglePaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GooglePaymentHistory" ADD COLUMN "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GooglePaymentHistory_orderId_key" ON "GooglePaymentHistory"("orderId");
