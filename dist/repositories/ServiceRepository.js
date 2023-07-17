"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const client_1 = require("@prisma/client");
class ServiceRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createService(data) {
        const service = await this.prisma.service.create({ data });
        return service;
    }
    async findServiceById(id) {
        const service = await this.prisma.service.findUnique({ where: { id } });
        return service;
    }
    async updateService(id, data) {
        const service = await this.prisma.service.update({ where: { id }, data });
        return service;
    }
    async deleteService(id) {
        const result = await this.prisma.service.delete({ where: { id } });
        return Boolean(result);
    }
    async findAllServices() {
        const services = await this.prisma.service.findMany();
        return services;
    }
}
exports.ServiceRepository = ServiceRepository;
