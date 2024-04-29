/*
  Warnings:

  - Added the required column `capacity` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RaceHistory" ADD COLUMN     "capacity" BOOLEAN NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
