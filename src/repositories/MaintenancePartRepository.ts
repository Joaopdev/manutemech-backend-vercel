import { PrismaClient, MaintenancePart, Prisma } from '@prisma/client';
import { CreateMaintenancePartInput } from '../entities/MaintenancePartEntity';

const prisma = new PrismaClient();

export class MaintenancePartRepository {
  async createMaintenancePart(data: CreateMaintenancePartInput): Promise<MaintenancePart> {
    return prisma.maintenancePart.create({ data });
  }

  async findMaintenancePartById(id: number): Promise<MaintenancePart | null> {
    return prisma.maintenancePart.findUnique({ where: { id } });
  }

  async updateMaintenancePart(id: number, data: CreateMaintenancePartInput): Promise<MaintenancePart | null> {
    return prisma.maintenancePart.update({ where: { id }, data });
  }

  async deleteMaintenancePart(id: number): Promise<boolean> {
    const deletedMaintenancePart = await prisma.maintenancePart.delete({ where: { id } });
    return deletedMaintenancePart !== null;
  }
}
