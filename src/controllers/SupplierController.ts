import { Request, Response } from 'express';
import { PrismaClient, Supplier } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class SupplierController {
  async getAllSuppliers(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId);

  
    try {
      const suppliers = await prisma.supplier.findMany({
        where: {
          userId: userId
        }
      });
      return res.status(200).json(suppliers);
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  }
  

  async createSupplier(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { name, remarks, address } = req.body;
    const userId = Number(req.userId)

    try {
      const supplier = await prisma.supplier.create({
        data: {
          name,
          remarks,
          address,
          user: { connect: { id: userId } },
        },
      });
      return res.status(201).json(supplier);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getSupplierById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(id) },
      });
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }

      if (supplier.userId !== userId)
        return res.status(401).json({ error: 'Unauthorized' });
        
      return res.json(supplier);

    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch supplier' });
    }
  }

  async updateSupplier(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, remarks, address } = req.body;
    const userId = Number(req.userId)

    try {
      const supplier = await prisma.supplier.update({
        where: { id: parseInt(id) },
        data: {
          name,
          remarks,
          address,
          user: { connect: { id: userId }},
        },
      });
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }

      if (supplier.userId !== userId)
        return res.status(401).json({ error: 'Unauthorized' });
      return res.json(supplier);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update supplier' });
    }
  }

  async deleteSupplier(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const supplier = await prisma.supplier.delete({
        where: { id: parseInt(id) },
      });
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }

      if (supplier.userId !== userId)
        return res.status(401).json({ error: 'Unauthorized' });

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete supplier' });
    }
  }
}
