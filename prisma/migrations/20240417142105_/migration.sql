/*
  Warnings:

  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerName]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerName` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Player_name_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "name",
ADD COLUMN     "playerName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerName_key" ON "Player"("playerName");
