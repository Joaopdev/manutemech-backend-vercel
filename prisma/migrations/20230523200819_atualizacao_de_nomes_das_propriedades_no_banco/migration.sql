/*
  Warnings:

  - You are about to drop the column `manfacturer` on the `vehicle` table. All the data in the column will be lost.
  - Added the required column `manufacturer` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `manfacturer`,
    ADD COLUMN `manufacturer` VARCHAR(191) NOT NULL;
