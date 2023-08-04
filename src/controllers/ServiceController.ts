import { Request, Response } from 'express';
import { Category, PrismaClient } from '@prisma/client';
import { Service } from '../entities/ServiceEntity';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();


export class ServiceController {
  async getAllServices(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId)


    try {
      const services = await prisma.service.findMany({
        where: { userId: userId },
        include: {
          category: true,
        }
      });
      return res.status(201).json(services);

    } catch (error){
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }


  async createService(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { name, description, categoryId, review_estimate_months, maintenance_estimate_months, km_review_estimate, km_maintenance_estimate } = req.body;
    const userId = Number(req.userId)


    try {
      const service = await prisma.service.create({
        data: {
          name,
          description,
          category: {
            connect: { id: categoryId }
          },
          user: {connect: { id: userId }},
          review_estimate_months,
          maintenance_estimate_months,
          km_review_estimate,
          km_maintenance_estimate
        }
      });
      return res.status(201).json(service);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getServiceById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)


    try {
      const service = await prisma.service.findUnique({
        where: { id: parseInt(id) },
      });
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      if (service.userId !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.json(service);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch service' });
    }
  }

  async updateService(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, categoryId, price, review_estimate_months, maintenance_estimate_months, km_review_estimate, km_maintenance_estimate } = req.body;
    const userId = Number(req.userId)


    try {
      const service = await prisma.service.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          category: {
            connect: { id: categoryId }
          },
          user: {connect: { id: userId }},
          review_estimate_months,
          maintenance_estimate_months,
          km_review_estimate,
          km_maintenance_estimate
        }
      });
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      if (service.userId !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.json(service);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update service' });
    }
  }

  async deleteService(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)


    try {
      const service = await prisma.service.delete({
        where: { id: parseInt(id) }
      });
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      if (service.userId !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.sendStatus(204);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
