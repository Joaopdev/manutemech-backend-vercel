"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MaintenanceRepository {
    async findAllMaintenances() {
        return prisma.maintenance.findMany();
    }
    async findMaintenanceById(id) {
        return prisma.maintenance.findUnique({ where: { id } });
    }
    async createMaintenance(data) {
        return prisma.maintenance.create({ data });
    }
    async updateMaintenance(id, data) {
        return prisma.maintenance.update({ where: { id }, data });
    }
    async deleteMaintenance(id) {
        const deletedMaintenance = await prisma.maintenance.delete({ where: { id } });
        return deletedMaintenance === null;
    }
}
exports.MaintenanceRepository = MaintenanceRepository;
