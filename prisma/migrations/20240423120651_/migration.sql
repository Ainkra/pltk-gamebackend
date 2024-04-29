/*
  Warnings:

  - You are about to drop the column `country` on the `RaceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `playerName` on the `RaceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `posUser` on the `RaceHistory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RaceHistory_playerName_key";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'FR';

-- AlterTable
ALTER TABLE "RaceHistory" DROP COLUMN "country",
DROP COLUMN "playerName",
DROP COLUMN "posUser";
