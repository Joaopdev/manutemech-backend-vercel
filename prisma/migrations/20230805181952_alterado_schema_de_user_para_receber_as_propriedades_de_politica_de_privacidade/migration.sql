/*
  Warnings:

  - Added the required column `acceptedPrivacy` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acceptedTerms` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "acceptedPrivacy" BOOLEAN NOT NULL,
ADD COLUMN     "acceptedTerms" BOOLEAN NOT NULL;
