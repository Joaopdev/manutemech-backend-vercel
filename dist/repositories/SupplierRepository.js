"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SupplierRepository {
    async findAllSuppliers() {
        return prisma.supplier.findMany();
    }
    async findSupplierById(id) {
        return prisma.supplier.findUnique({
            where: { id },
        });
    }
    async createSupplier(data) {
        return prisma.supplier.create({
            data,
        });
    }
    async updateSupplier(id, data) {
        return prisma.supplier.update({
            where: { id },
            data,
        });
    }
    async deleteSupplier(id) {
        const deletedSupplier = await prisma.supplier.delete({
            where: { id },
        });
        return !!deletedSupplier;
    }
}
exports.SupplierRepository = SupplierRepository;
