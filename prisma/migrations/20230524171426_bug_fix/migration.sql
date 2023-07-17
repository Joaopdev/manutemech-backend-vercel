/*
  Warnings:

  - Added the required column `address` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `address` VARCHAR(191) NOT NULL;
