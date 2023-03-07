/*
  Warnings:

  - You are about to drop the `Reservations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_userId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Reservations";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
