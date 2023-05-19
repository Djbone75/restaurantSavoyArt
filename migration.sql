-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" VARCHAR(50),
    "lastname" VARCHAR(50),
    "averageGuests" INTEGER,
    "allergies" TEXT[],
    "role" "Role" DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "totalGuests" INTEGER NOT NULL DEFAULT 1,
    "day" TIMESTAMP(3) NOT NULL,
    "hour" TIME NOT NULL,
    "userId" TEXT,
    "allergies" TEXT[],

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horaires" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dayStartAM" TIME NOT NULL DEFAULT '1970-01-01 11:00:00 +00:00',
    "dayEndAM" TIME NOT NULL DEFAULT '1970-01-01 14:00:00 +00:00',
    "dayStartPM" TIME NOT NULL DEFAULT '1970-01-01 18:00:00 +00:00',
    "dayEndPM" TIME NOT NULL DEFAULT '1970-01-01 22:00:00 +00:00',

    CONSTRAINT "Horaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "content" VARCHAR(100),
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "content" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Horaires_name_key" ON "Horaires"("name");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
