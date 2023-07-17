/*
  Warnings:

  - You are about to drop the column `userId` on the `maintenancepart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `maintenanceservice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `maintenancepart` DROP FOREIGN KEY `MaintenancePart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `maintenanceservice` DROP FOREIGN KEY `MaintenanceService_userId_fkey`;

-- AlterTable
ALTER TABLE `maintenancepart` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `maintenanceservice` DROP COLUMN `userId`;
