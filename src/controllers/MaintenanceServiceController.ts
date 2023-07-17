import { Request, Response } from 'express';
import { Prisma, PrismaClient, MaintenanceService as PrismaMaintenanceService } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class MaintenanceServiceController {
  async createMaintenanceService(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { maintenanceId, serviceId } = req.body;

    try {
      const maintenanceService: PrismaMaintenanceService = await prisma.maintenanceService.create({
        data: {
          maintenanceId,
          serviceId,
        },
      });

      return res.status(201).json(maintenanceService);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getMaintenanceServicesByMaintenanceId(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { maintenanceId } = req.params;

    try {
      const maintenanceServices: PrismaMaintenanceService[] = await prisma.maintenanceService.findMany({
        where: {
          maintenanceId: Number(maintenanceId),
        },
      });

      return res.status(200).json(maintenanceServices);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateMaintenanceService(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { maintenanceId, serviceId } = req.body;
  
    try {
      const updatedMaintenanceService: PrismaMaintenanceService | null = await prisma.maintenanceService.update({
        where: { id: parseInt(id) } as Prisma.MaintenanceServiceWhereUniqueInput,

        data: {
          maintenanceId,
          serviceId,
        },
      });
  
      if (!updatedMaintenanceService) {
        return res.status(404).json({ error: 'Maintenance service not found' });
      }
  
      return res.status(200).json(updatedMaintenanceService);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  

  async deleteMaintenanceService(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await prisma.maintenanceService.delete({
        where: { id: parseInt(id) } as Prisma.MaintenanceServiceWhereUniqueInput,
      });

      return res.sendStatus(204);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
