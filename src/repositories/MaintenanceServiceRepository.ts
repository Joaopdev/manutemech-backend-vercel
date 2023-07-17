import { PrismaClient, MaintenanceService, Prisma } from '@prisma/client';
import { CreateMaintenanceServiceInput } from '../entities/MaintenanceServiceEntity';
import { Request, Response } from 'express';


const prisma = new PrismaClient();

export class MaintenanceServiceRepository {
  async createMaintenanceService(req: Request, res: Response): Promise<Response> {
    const { maintenanceId, serviceId  } = req.body;

    try {
      const maintenanceService = await prisma.maintenanceService.create({
        data: {
          maintenanceId,
          serviceId
        },
      })
      return res.status(201).json(maintenanceService);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
  


  async findMaintenanceServiceById(maintenanceId: number, serviceId: number): Promise<MaintenanceService | null> {
    return prisma.maintenanceService.findUnique({
      where: {
        maintenanceId_serviceId: {
          maintenanceId,
          serviceId,
        },
      },
    });
  }

  async updateMaintenanceService(maintenanceId: number, serviceId: number, data: Partial<CreateMaintenanceServiceInput>): Promise<MaintenanceService | null> {
    return prisma.maintenanceService.update({
      where: {
        maintenanceId_serviceId: {
          maintenanceId,
          serviceId,
        },
      },
      data,
    });
  }

  async deleteMaintenanceService(maintenanceId: number, serviceId: number): Promise<boolean> {
    const deletedMaintenanceService = await prisma.maintenanceService.delete({
      where: {
        maintenanceId_serviceId: {
          maintenanceId,
          serviceId,
        },
      },
    });

    return deletedMaintenanceService !== null;
  }
}
