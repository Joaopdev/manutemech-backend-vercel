import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { maintenanceSchema } from '../@types/dto/maintenanceDTOSchema';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

class MaintenanceController {
  async getAllMaintenances(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId)
    try {
      const maintenances = await prisma.maintenance.findMany({
        where: { 
          userId: userId,
         },
      });

      return res.status(200).json(maintenances);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao buscar as manutenções', error: error.message });
    }
  }

  async getMaintenanceById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId);

    try {
      const maintenance = await prisma.maintenance.findUnique({
        where: { id: Number(id) },
      });

      if (!maintenance) {
        return res.status(404).json({ message: 'Manutenção não encontrada' });
      }

      if (maintenance.userId !== userId) {
        return res.status(401).json({ message: 'Vocë não tem permissão para acessar essa manutenção' });
      }

      return res.json(maintenance);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao buscar a manutenção', error: error.message });
    }
  }

  async createMaintenance(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const {
      entry_date,
      exits_date,
      km_vehicle,
      responsible_mechanic,
      maintenance_price,
      remarks,
      vehicleId,
      parts,
      services,
      workshopId,
    } = req.body;
    const userId = Number(req.userId);

    try {
      await maintenanceSchema.validate(req.body, { abortEarly: false });
      // Cria a instância de manutenção sem as relações
      const maintenance = await prisma.maintenance.create({
        data: {
          entry_date,
          exits_date,
          km_vehicle,
          responsible_mechanic,
          maintenance_price,
          remarks,
          vehicle: { connect: { id: vehicleId } },
          workshop: { connect: { id: workshopId } },
          user: { connect: { id: userId } },
        },
      });

      // Cria as partes relacionadas à manutenção
      const maintenanceParts = await Promise.all(
        parts.map(async (part: any) => {
          const maintenancePart = await prisma.maintenancePart.create({
            data: {
              maintenanceId: maintenance.id,
              partId: part?.partId,
              price: part?.price,
              supplierId: part?.supplierId,
            },
          });
          return maintenancePart;
        })
      );

      const maintenancePartIds = maintenanceParts.map((maintenancePart) => maintenancePart.id);

      // Cria as relações entre serviços e manutenção
      const serviceData = services.map((service: any) => ({
        maintenanceId: maintenance.id,
        serviceId: service,
      }));

      await prisma.maintenanceService.createMany({
        data: serviceData,
      });

      // Recupera a manutenção completa com todas as relações
      const completeMaintenance = await prisma.maintenance.findUnique({
        where: { id: maintenance.id },
        include: {
          vehicle: true,
          services: { include: { service: true } },
          workshop: true,
          parts: true,
        },
      });

      if (!completeMaintenance) {
        return res.status(404).json({ message: 'Manutenção não encontrada' });
      }

      if (completeMaintenance.services) {
        // Atualize a propriedade 'services' com o novo array mapeado
        completeMaintenance.services = completeMaintenance.services.map((maintenanceService) => ({
          ...maintenanceService,
          service: maintenanceService.service,
        }));
      }

      return res.status(201).json(completeMaintenance);
    } catch (error: any) {
      if (error.inner && error.inner.length > 0) {
        const validationErrors = error.inner.map((validationError: any) => ({
          message: validationError.message,
          path: validationError.path,
        }));

        return res.status(400).json({ errors: validationErrors });
      }

      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  }

  async getMaintenanceByVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { vehicleId } = req.params;
    const userId = Number(req.userId);
  
    try {
      const maintenances = await prisma.maintenance.findMany({
        where: { vehicleId: parseInt(vehicleId), AND: { userId: userId } 	 },
        include: {
          vehicle: true,
          services: { include: { service: true } },
          workshop: true,
          parts: { include: { part: true, supplier: true}},
        },
      });
  
      return res.json(maintenances);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao buscar as manutenções do veículo', error: error.message });
    }
  }
  

  async updateMaintenance(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId); 
    const {
      entry_date,
      exits_date,
      km_vehicle,
      responsible_mechanic,
      maintenance_price,
      remarks,
      vehicleId,
      parts,
      services,
      workshopId,
    } = req.body;
  
    try {
      await maintenanceSchema.validate(req.body, { abortEarly: false });
      const maintenance = await prisma.maintenance.findUnique({ where: { id: Number(id) } });
      console.log('chegou aqui a atualização');
  
      if (!maintenance) {
        return res.status(404).json({ message: 'Manutenção não encontrada' });
      }
  
      if (maintenance.userId !== userId) {
        return res.status(401).json({ message: 'Vocë não tem autorização para editar essa manutenção' });
      }
  
      await prisma.maintenancePart.deleteMany({ where: { maintenanceId: Number(id) } });
      await prisma.maintenanceService.deleteMany({ where: { maintenanceId: Number(id) } });
  
      const updatedMaintenance = await prisma.maintenance.update({
        where: { id: Number(id) },
        data: {
          entry_date,
          exits_date,
          km_vehicle,
          responsible_mechanic,
          maintenance_price,
          remarks,
          vehicle: { connect: { id: vehicleId } },
          workshop: { connect: { id: workshopId } },
        },
        include: {
          vehicle: true,
          services: { include: { service: true } },
          workshop: true,
        },
      });
  
      const maintenancePartsPromises = parts.map(async (part: any) => {
        const maintenancePart = await prisma.maintenancePart.create({
          data: {
            maintenanceId: updatedMaintenance.id,
            partId: part.partId,
            price: part.price,
            supplierId: part.supplierId,
          },
        });
        return maintenancePart;
      });
  
      await Promise.allSettled(maintenancePartsPromises);
  
      const maintenancePartsResults = await Promise.all(maintenancePartsPromises);
      const hasErrors = maintenancePartsResults.some((result) => result.status === 'rejected');
  
      if (hasErrors) {
        await prisma.maintenancePart.deleteMany({ where: { maintenanceId: Number(id) } });
        await prisma.maintenanceService.deleteMany({ where: { maintenanceId: Number(id) } });
  
        return res.status(500).json({ message: 'Erro ao criar partes de manutenção' });
      }
  
      const serviceData = services.map((service: any) => ({
        maintenanceId: updatedMaintenance.id,
        serviceId: service,
      }));
  
      await prisma.maintenanceService.createMany({
        data: serviceData,
      });
  
      const completeMaintenance = {
        ...updatedMaintenance,
        services: updatedMaintenance.services.map((maintenanceService) => ({
          ...maintenanceService,
          service: maintenanceService.service,
        })),
      };
  
      return res.json(completeMaintenance);
    } catch (error: any) {
      if (error.inner && error.inner.length > 0) {
        const validationErrors = error.inner.map((validationError: any) => ({
          message: validationError.message,
          path: validationError.path,
        }));
  
        return res.status(400).json({ errors: validationErrors });
      }
  
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  }
  

  async deleteMaintenance(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId);

    try {
      const maintenance = await prisma.maintenance.findUnique({ where: { id: Number(id) } });

      if (!maintenance) {
        return res.status(404).json({ message: 'Manutenção não encontrada' });
      }

      if (maintenance.userId !== userId) {
        return res.status(401).json({ message: 'Vocë não tem autorização para editar essa manutenção' });
      }

      await prisma.maintenancePart.deleteMany({ where: { maintenanceId: Number(id) } });
      await prisma.maintenanceService.deleteMany({ where: { maintenanceId: Number(id) } });
      await prisma.maintenance.delete({ where: { id: Number(id) } });

      return res.json({ message: 'Manutenção excluída com sucesso' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao excluir a manutenção', error: error.message });
    }
  }
}

export default MaintenanceController;
