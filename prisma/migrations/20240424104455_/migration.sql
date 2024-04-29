/*
  Warnings:

  - A unique constraint covering the columns `[playerUuid]` on the table `ApplePaymentHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerUuid]` on the table `GooglePaymentHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerUuid]` on the table `StripePaymentHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApplePaymentHistory_playerUuid_key" ON "ApplePaymentHistory"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "GooglePaymentHistory_playerUuid_key" ON "GooglePaymentHistory"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentHistory_playerUuid_key" ON "StripePaymentHistory"("playerUuid");
