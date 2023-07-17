"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenancePartRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MaintenancePartRepository {
    async createMaintenancePart(data) {
        return prisma.maintenancePart.create({ data });
    }
    async findMaintenancePartById(id) {
        return prisma.maintenancePart.findUnique({ where: { id } });
    }
    async updateMaintenancePart(id, data) {
        return prisma.maintenancePart.update({ where: { id }, data });
    }
    async deleteMaintenancePart(id) {
        const deletedMaintenancePart = await prisma.maintenancePart.delete({ where: { id } });
        return deletedMaintenancePart !== null;
    }
}
exports.MaintenancePartRepository = MaintenancePartRepository;
