/*
  Warnings:

  - You are about to drop the column `allergyId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_allergyId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "allergyId",
ADD COLUMN     "allergies" TEXT[];
