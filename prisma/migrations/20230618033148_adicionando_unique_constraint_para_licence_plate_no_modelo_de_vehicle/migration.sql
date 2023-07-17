/*
  Warnings:

  - A unique constraint covering the columns `[licence_plate]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_licence_plate_key` ON `Vehicle`(`licence_plate`);
