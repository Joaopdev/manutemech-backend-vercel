/*
  Warnings:

  - You are about to drop the column `description` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `part` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `workshop` table. All the data in the column will be lost.
  - You are about to drop the `_servicetoworkshop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entry_date` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exits_date` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `km_vehicle` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenance_price` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remarks` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_mechanic` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workshopId` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_price` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warranty_duration_months` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `km_maintenance_estimate` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `km_review_estimate` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenance_estimate_months` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_estimate_months` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chassis_number` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licence_plate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manfacturer` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renavam` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Workshop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_person` to the `Workshop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workshop_type` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_servicetoworkshop` DROP FOREIGN KEY `_ServiceToWorkshop_A_fkey`;

-- DropForeignKey
ALTER TABLE `_servicetoworkshop` DROP FOREIGN KEY `_ServiceToWorkshop_B_fkey`;

-- AlterTable
ALTER TABLE `maintenance` DROP COLUMN `description`,
    DROP COLUMN `totalCost`,
    ADD COLUMN `entry_date` DATETIME(3) NOT NULL,
    ADD COLUMN `exits_date` DATETIME(3) NOT NULL,
    ADD COLUMN `km_vehicle` INTEGER NOT NULL,
    ADD COLUMN `maintenance_price` DOUBLE NOT NULL,
    ADD COLUMN `remarks` VARCHAR(191) NOT NULL,
    ADD COLUMN `responsible_mechanic` VARCHAR(191) NOT NULL,
    ADD COLUMN `workshopId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `part` DROP COLUMN `quantity`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `estimated_price` DOUBLE NOT NULL,
    ADD COLUMN `model_specification` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `warranty_duration_months` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `km_maintenance_estimate` INTEGER NOT NULL,
    ADD COLUMN `km_review_estimate` INTEGER NOT NULL,
    ADD COLUMN `maintenance_estimate_months` INTEGER NOT NULL,
    ADD COLUMN `review_estimate_months` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `description`,
    ADD COLUMN `remarks` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `brand`,
    ADD COLUMN `chassis_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `licence_plate` VARCHAR(191) NOT NULL,
    ADD COLUMN `manfacturer` VARCHAR(191) NOT NULL,
    ADD COLUMN `renavam` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `workshop` DROP COLUMN `zipCode`,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `responsible_person` VARCHAR(191) NOT NULL,
    ADD COLUMN `workshop_type` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_servicetoworkshop`;

-- CreateTable
CREATE TABLE `MaintenanceService` (
    `maintenanceId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`maintenanceId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maintenance` ADD CONSTRAINT `Maintenance_workshopId_fkey` FOREIGN KEY (`workshopId`) REFERENCES `Workshop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenanceService` ADD CONSTRAINT `MaintenanceService_maintenanceId_fkey` FOREIGN KEY (`maintenanceId`) REFERENCES `Maintenance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenanceService` ADD CONSTRAINT `MaintenanceService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
