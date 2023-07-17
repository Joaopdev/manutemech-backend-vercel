/*
  Warnings:

  - You are about to drop the column `UserId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `maintenancepart` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `maintenanceservice` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `part` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `workshop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `maintenance` DROP FOREIGN KEY `Maintenance_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `maintenancepart` DROP FOREIGN KEY `MaintenancePart_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `maintenanceservice` DROP FOREIGN KEY `MaintenanceService_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `part` DROP FOREIGN KEY `Part_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `Vehicle_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `workshop` DROP FOREIGN KEY `Workshop_UserId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `maintenance` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `maintenancepart` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `maintenanceservice` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `part` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `workshop` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintenance` ADD CONSTRAINT `Maintenance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workshop` ADD CONSTRAINT `Workshop_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenanceService` ADD CONSTRAINT `MaintenanceService_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenancePart` ADD CONSTRAINT `MaintenancePart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
