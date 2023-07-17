"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PartRepository {
    async findAllParts() {
        return prisma.part.findMany();
    }
    async findPartById(id) {
        return prisma.part.findUnique({ where: { id } });
    }
    async createPart(data) {
        return prisma.part.create({ data });
    }
    async updatePart(id, data) {
        return prisma.part.update({ where: { id }, data });
    }
    async deletePart(id) {
        const deletedPart = await prisma.part.delete({ where: { id } });
        return deletedPart !== null;
    }
}
exports.PartRepository = PartRepository;
