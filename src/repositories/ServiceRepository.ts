import { Prisma, Service, PrismaClient } from '@prisma/client';

export class ServiceRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    const service = await this.prisma.service.create({ data });
    return service;
  }

  async findServiceById(id: number): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({ where: { id } });
    return service;
  }

  async updateService(id: number, data: Prisma.ServiceUpdateInput): Promise<Service | null> {
    const service = await this.prisma.service.update({ where: { id }, data });
    return service;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await this.prisma.service.delete({ where: { id } });
    return Boolean(result);
  }

  async findAllServices(): Promise<Service[]> {
    const services = await this.prisma.service.findMany();
    return services;
  }
}
