/*
  Warnings:

  - Added the required column `bestLap` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bestTime` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceMode` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `track` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RaceHistory" ADD COLUMN     "bestLap" INTEGER NOT NULL,
ADD COLUMN     "bestTime" INTEGER NOT NULL,
ADD COLUMN     "raceMode" TEXT NOT NULL,
ADD COLUMN     "track" TEXT NOT NULL;
