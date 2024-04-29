/*
  Warnings:

  - Added the required column `posUser` to the `RaceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RaceHistory" ADD COLUMN     "posUser" INTEGER NOT NULL;
