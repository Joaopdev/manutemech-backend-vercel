"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class WorkshopRepository {
    async findAllWorkshops() {
        return prisma.workshop.findMany();
    }
    async findWorkshopById(id) {
        return prisma.workshop.findUnique({
            where: { id },
        });
    }
    async createWorkshop(data) {
        return prisma.workshop.create({
            data,
        });
    }
    async updateWorkshop(id, data) {
        return prisma.workshop.update({
            where: { id },
            data,
        });
    }
    async deleteWorkshop(id) {
        const result = await prisma.workshop.delete({
            where: { id },
        });
        return Boolean(result);
    }
}
exports.WorkshopRepository = WorkshopRepository;
