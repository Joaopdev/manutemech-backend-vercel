import { Request, Response } from 'express';
import { PrismaClient, MaintenancePart } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class MaintenancePartController {
  async createMaintenancePart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { maintenanceId, partId, supplierId, price } = req.body;

    try {
      const maintenancePart = await prisma.maintenancePart.create({
        data: {
          maintenance: { connect: { id: maintenanceId } },
          part: { connect: { id: partId } },
          supplier: { connect: { id: supplierId } },
          price,
        },
        include: {
          maintenance: true,
          part: true,
          supplier: true,
        },
      });

      return res.status(201).json(maintenancePart);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create maintenance part' });
    }
  }

  async getMaintenancePartById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const maintenancePart = await prisma.maintenancePart.findUnique({
        where: { id: parseInt(id) },
        include: {
          maintenance: true,
          part: true,
          supplier: true,
        },
      });

      if (!maintenancePart) {
        return res.status(404).json({ error: 'Maintenance part not found' });
      }

      return res.json(maintenancePart);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch maintenance part' });
    }
  }

  async updateMaintenancePart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { maintenanceId, partId, supplierId, price } = req.body;

    try {
      const updatedMaintenancePart = await prisma.maintenancePart.update({
        where: { id: parseInt(id) },
        data: {
          maintenance: { connect: { id: maintenanceId } },
          part: { connect: { id: partId } },
          supplier: { connect: { id: supplierId } },
          price,
        },
        include: {
          maintenance: true,
          part: true,
          supplier: true,
        },
      });

      if (!updatedMaintenancePart) {
        return res.status(404).json({ error: 'Maintenance part not found' });
      }

      return res.json(updatedMaintenancePart);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update maintenance part' });
    }
  }

  async deleteMaintenancePart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const success = await prisma.maintenancePart.delete({
        where: { id: parseInt(id) },
      });

      if (!success) {
        return res.status(404).json({ error: 'Maintenance part not found' });
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete maintenance part' });
    }
  }
}
