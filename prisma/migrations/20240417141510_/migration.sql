-- CreateEnum
CREATE TYPE "carType" AS ENUM ('GT', 'FORMULAV', 'TRUCKSTER', 'SPEEDER');

-- CreateEnum
CREATE TYPE "CapacityType" AS ENUM ('TOP_SPEED', 'ACCELERATION', 'SHIELDING', 'NITRO', 'RAM', 'INVINCIBLE');

-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('AERODYNAMICS', 'CHASSIS', 'SUSPENSION');

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "playerId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'unknow',
    "inventory_id" INTEGER NOT NULL,
    "userStatsId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePaymentHistory" (
    "paymentHistory_id" SERIAL NOT NULL,
    "playerUuid" UUID NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "item" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripePaymentHistory_pkey" PRIMARY KEY ("paymentHistory_id")
);

-- CreateTable
CREATE TABLE "GooglePaymentHistory" (
    "paymentHistory_id" SERIAL NOT NULL,
    "playerUuid" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GooglePaymentHistory_pkey" PRIMARY KEY ("paymentHistory_id")
);

-- CreateTable
CREATE TABLE "ApplePaymentHistory" (
    "paymentHistory_id" SERIAL NOT NULL,
    "playerUuid" UUID NOT NULL,
    "receipt" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplePaymentHistory_pkey" PRIMARY KEY ("paymentHistory_id")
);

-- CreateTable
CREATE TABLE "RaceHistory" (
    "raceHistory_id" SERIAL NOT NULL,
    "playerUuid" UUID NOT NULL,
    "playerName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RaceHistory_pkey" PRIMARY KEY ("raceHistory_id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "soft_currency" INTEGER NOT NULL DEFAULT 0,
    "hard_currency" INTEGER NOT NULL DEFAULT 0,
    "energy" INTEGER NOT NULL DEFAULT 0,
    "upgrade_kit" INTEGER NOT NULL DEFAULT 0,
    "meca_kit" INTEGER NOT NULL DEFAULT 0,
    "repair_kit" INTEGER NOT NULL DEFAULT 0,
    "reputation_level" INTEGER NOT NULL DEFAULT 0,
    "damage_pack" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatistics" (
    "stat_id" SERIAL NOT NULL,
    "arenaModeCount" INTEGER NOT NULL DEFAULT 0,
    "softCurrencyUsed" INTEGER NOT NULL DEFAULT 0,
    "hardCurrencyUsed" INTEGER NOT NULL DEFAULT 0,
    "energyUsed" INTEGER NOT NULL DEFAULT 0,
    "timeSpentInRace" TIMESTAMP(3) NOT NULL,
    "paymentRevenue" INTEGER NOT NULL DEFAULT 0,
    "freeCreditCount" INTEGER NOT NULL DEFAULT 0,
    "usedCarType" "carType" NOT NULL,

    CONSTRAINT "UserStatistics_pkey" PRIMARY KEY ("stat_id")
);

-- CreateTable
CREATE TABLE "CarSettings" (
    "id" SERIAL NOT NULL,
    "carType" "carType" NOT NULL,
    "playerUuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "carSettingId" INTEGER NOT NULL,
    "settingName" TEXT NOT NULL,
    "upgradeLevel" INTEGER NOT NULL DEFAULT 0,
    "preference" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarCapacities" (
    "id" SERIAL NOT NULL,
    "carType" "carType" NOT NULL,
    "fullyUpgraded" BOOLEAN NOT NULL,
    "playerUuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarCapacities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacity" (
    "id" SERIAL NOT NULL,
    "carCapacityId" INTEGER NOT NULL,
    "capacityName" TEXT NOT NULL,
    "upgradeLevel" INTEGER NOT NULL,
    "levelMax" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Capacity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "Player"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Player_inventory_id_key" ON "Player"("inventory_id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userStatsId_key" ON "Player"("userStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentHistory_playerUuid_key" ON "StripePaymentHistory"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentHistory_paymentIntentId_key" ON "StripePaymentHistory"("paymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentHistory_status_key" ON "StripePaymentHistory"("status");

-- CreateIndex
CREATE UNIQUE INDEX "GooglePaymentHistory_playerUuid_key" ON "GooglePaymentHistory"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "GooglePaymentHistory_token_key" ON "GooglePaymentHistory"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ApplePaymentHistory_playerUuid_key" ON "ApplePaymentHistory"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "ApplePaymentHistory_receipt_key" ON "ApplePaymentHistory"("receipt");

-- CreateIndex
CREATE UNIQUE INDEX "RaceHistory_playerUuid_key" ON "RaceHistory"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "RaceHistory_playerName_key" ON "RaceHistory"("playerName");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStatistics"("stat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePaymentHistory" ADD CONSTRAINT "StripePaymentHistory_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GooglePaymentHistory" ADD CONSTRAINT "GooglePaymentHistory_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplePaymentHistory" ADD CONSTRAINT "ApplePaymentHistory_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceHistory" ADD CONSTRAINT "RaceHistory_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarSettings" ADD CONSTRAINT "CarSettings_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_carSettingId_fkey" FOREIGN KEY ("carSettingId") REFERENCES "CarSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarCapacities" ADD CONSTRAINT "CarCapacities_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacity" ADD CONSTRAINT "Capacity_carCapacityId_fkey" FOREIGN KEY ("carCapacityId") REFERENCES "CarCapacities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
