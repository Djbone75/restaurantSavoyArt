/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Horaires` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Horaires_name_key" ON "Horaires"("name");
