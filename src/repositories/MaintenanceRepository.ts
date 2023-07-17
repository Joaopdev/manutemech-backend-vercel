import { PrismaClient, Maintenance, Prisma } from '@prisma/client';
import { CreateMaintenanceInput } from '../entities/MaintenanceEntity';

const prisma = new PrismaClient();

export class MaintenanceRepository {
  async findAllMaintenances(): Promise<Maintenance[]> {
    return prisma.maintenance.findMany();
  }

  async findMaintenanceById(id: number): Promise<Maintenance | null> {
    return prisma.maintenance.findUnique({ where: { id } });
  }

  async createMaintenance(data: CreateMaintenanceInput): Promise<Maintenance> {
    return prisma.maintenance.create({ data });
  }

  async updateMaintenance(id: number, data: CreateMaintenanceInput): Promise<Maintenance | null> {
    return prisma.maintenance.update({ where: { id }, data });
  }

  async deleteMaintenance(id: number): Promise<boolean> {
    const deletedMaintenance = await prisma.maintenance.delete({ where: { id } });
    return deletedMaintenance === null;
  }
  
}
