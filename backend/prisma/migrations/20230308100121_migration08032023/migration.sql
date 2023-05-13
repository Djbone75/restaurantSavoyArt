-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "allergies" TEXT[];
UPDATE "user" SET ROLE = ADMIN WHERE "email" = 'admin@admin.com'