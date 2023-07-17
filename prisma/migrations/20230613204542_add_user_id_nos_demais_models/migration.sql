-- AlterTable
ALTER TABLE `category` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `maintenance` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `maintenancepart` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `maintenanceservice` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `part` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `vehicle` ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `workshop` ADD COLUMN `UserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintenance` ADD CONSTRAINT `Maintenance_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workshop` ADD CONSTRAINT `Workshop_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenanceService` ADD CONSTRAINT `MaintenanceService_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenancePart` ADD CONSTRAINT `MaintenancePart_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
