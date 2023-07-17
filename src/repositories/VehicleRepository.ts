import { PrismaClient, Vehicle, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class VehicleRepository {
  async findAllVehicles(): Promise<Vehicle[]> {
    return prisma.vehicle.findMany();
  }

  async findVehicleById(id: number): Promise<Vehicle | null> {
    return prisma.vehicle.findUnique({
      where: { id: id },
    });
  }

  async createVehicle(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return prisma.vehicle.create({
      data,
    });
  }

  async updateVehicle(id: number, data: Prisma.VehicleUpdateInput): Promise<Vehicle | null> {
    return prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async deleteVehicle(id: number): Promise<boolean> {
    const result = await prisma.vehicle.delete({
      where: { id },
    });
    return Boolean(result);
  }
}
