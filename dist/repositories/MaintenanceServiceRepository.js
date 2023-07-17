"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceServiceRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MaintenanceServiceRepository {
    async createMaintenanceService(req, res) {
        const { maintenanceId, serviceId } = req.body;
        try {
            const maintenanceService = await prisma.maintenanceService.create({
                data: {
                    maintenanceId,
                    serviceId
                },
            });
            return res.status(201).json(maintenanceService);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findMaintenanceServiceById(maintenanceId, serviceId) {
        return prisma.maintenanceService.findUnique({
            where: {
                maintenanceId_serviceId: {
                    maintenanceId,
                    serviceId,
                },
            },
        });
    }
    async updateMaintenanceService(maintenanceId, serviceId, data) {
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
    async deleteMaintenanceService(maintenanceId, serviceId) {
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
exports.MaintenanceServiceRepository = MaintenanceServiceRepository;
