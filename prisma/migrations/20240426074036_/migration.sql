/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `GooglePaymentHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GooglePaymentHistory_orderId_key" ON "GooglePaymentHistory"("orderId");
