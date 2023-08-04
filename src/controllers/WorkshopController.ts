import { Request, Response } from 'express';
import { Prisma, PrismaClient, Workshop } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class WorkshopController {
  async getAllWorkshops(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId)
    try {
      const workshops = await prisma.workshop.findMany({ where: { userId: userId },});
      return res.status(200).json(workshops);
    } catch (error: any) {
      return res.status(500).json({error: error.message});
    }
  }

  async getWorkshopById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const workshop = await prisma.workshop.findUnique({
        where: { id: Number(id) },
        include: {
          maintenances: true,
        },
      });

      if (!workshop) {
        return res.status(404).json({ error: 'Workshop not found' });
      }

      if (workshop.userId !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.json(workshop);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch workshop' });
    }
  }

  async createWorkshop(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { name, workshop_type, address, responsible_person, phone_number }: Workshop = req.body;
    const userId = Number(req.userId)

    try {
      const workshop = await prisma.workshop.create({
        data: {
          name,
          workshop_type,
          address,
          responsible_person,
          phone_number,
          user: {connect: {id: userId}},
        },
      });

      return res.status(201).json(workshop);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateWorkshop(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, workshop_type, address, responsible_person, phone_number } = req.body;
    const userId = Number(req.userId)

    try {
      const updatedWorkshop = await prisma.workshop.update({
        where: { id: Number(id) },
        data: {
          name,
          workshop_type,
          address,
          responsible_person,
          phone_number,
          user: {connect: {id: userId}}, 
        },
      });

      if (!updatedWorkshop) {
        return res.status(404).json({ error: 'Workshop not found' });
      }

      if (updatedWorkshop.userId !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.json(updatedWorkshop);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update workshop' });
    }
  }

  async deleteWorkshop(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const workshop = await prisma.workshop.delete({
        where: { id: Number(id) },
      });

      if (!workshop) {
        return res.status(404).json({ error: 'Workshop not found' });
      }

      if (workshop.userId !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.sendStatus(204);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
