import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class PartController {
  async getAllParts(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId)
    try {
      const parts = await prisma.part.findMany({
        where: { userId: userId }, 
      });
      return res.status(200).json(parts);
    } catch (error: any) {
      return res.status(501).json({ error: error.message });
    }
  }

  async createPart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { name, categoryId, description, estimated_price, warranty_duration_months, model_specification } = req.body;
    const userId = Number(req.userId)

    try {
      const part = await prisma.part.create({
        data: {
          name,
          description,
          estimated_price,
          warranty_duration_months,
          model_specification,
          category: { 
            connect: { id: categoryId }
          },
          user: { 
            connect: { id: userId }
          },
        },
        include: { category: true },
      });
      return res.status(201).json(part);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getPartById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const part = await prisma.part.findUnique({
        where: { id: Number(id) },
        include: { category: true },
      });
      if (!part) {
        return res.status(404).json({ error: 'Part not found' });
      }

      if (part.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      return res.json(part);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch part' });
    }
  }

  async updatePart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, categoryId, description, estimated_price, warranty_duration_months, model_specification } = req.body;
    const userId = Number(req.userId)

    try {
      const part = await prisma.part.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          estimated_price,
          warranty_duration_months,
          model_specification,
          category: { connect: { id: categoryId } },
        },
        include: { category: true },
      });
      if (!part) {
        return res.status(404).json({ error: 'Part not found' });
      }
      if (part.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      return res.json(part);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update part' });
    }
  }

  async deletePart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const part = await prisma.part.delete({
        where: { id: Number(id) },
      });
      if (!part) {
        return res.status(404).json({ error: 'Part not found' });
      }

      if (part.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete part' });
    }
  }
}
