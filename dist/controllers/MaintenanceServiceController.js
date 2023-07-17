"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceServiceController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MaintenanceServiceController {
    async createMaintenanceService(req, res) {
        const { maintenanceId, serviceId } = req.body;
        try {
            const maintenanceService = await prisma.maintenanceService.create({
                data: {
                    maintenanceId,
                    serviceId,
                },
            });
            return res.status(201).json(maintenanceService);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getMaintenanceServicesByMaintenanceId(req, res) {
        const { maintenanceId } = req.params;
        try {
            const maintenanceServices = await prisma.maintenanceService.findMany({
                where: {
                    maintenanceId: Number(maintenanceId),
                },
            });
            return res.status(200).json(maintenanceServices);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateMaintenanceService(req, res) {
        const { id } = req.params;
        const { maintenanceId, serviceId } = req.body;
        try {
            const updatedMaintenanceService = await prisma.maintenanceService.update({
                where: { id: parseInt(id) },
                data: {
                    maintenanceId,
                    serviceId,
                },
            });
            if (!updatedMaintenanceService) {
                return res.status(404).json({ error: 'Maintenance service not found' });
            }
            return res.status(200).json(updatedMaintenanceService);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async deleteMaintenanceService(req, res) {
        const { id } = req.params;
        try {
            await prisma.maintenanceService.delete({
                where: { id: parseInt(id) },
            });
            return res.sendStatus(204);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.MaintenanceServiceController = MaintenanceServiceController;
