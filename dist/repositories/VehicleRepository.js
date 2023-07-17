"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class VehicleRepository {
    async findAllVehicles() {
        return prisma.vehicle.findMany();
    }
    async findVehicleById(id) {
        return prisma.vehicle.findUnique({
            where: { id: id },
        });
    }
    async createVehicle(data) {
        return prisma.vehicle.create({
            data,
        });
    }
    async updateVehicle(id, data) {
        return prisma.vehicle.update({
            where: { id },
            data,
        });
    }
    async deleteVehicle(id) {
        const result = await prisma.vehicle.delete({
            where: { id },
        });
        return Boolean(result);
    }
}
exports.VehicleRepository = VehicleRepository;
