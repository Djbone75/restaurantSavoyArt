/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `totalFreeSeats` on the `Reservations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Reservations_day_userId_key";

-- AlterTable
ALTER TABLE "Reservations" DROP COLUMN "createdAt",
DROP COLUMN "day",
DROP COLUMN "hour",
DROP COLUMN "totalFreeSeats";
