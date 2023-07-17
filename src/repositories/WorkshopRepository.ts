import { PrismaClient, Workshop, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class WorkshopRepository {
  async findAllWorkshops(): Promise<Workshop[]> {
    return prisma.workshop.findMany();
  }

  async findWorkshopById(id: number): Promise<Workshop | null> {
    return prisma.workshop.findUnique({
      where: { id },
    });
  }

  async createWorkshop(data: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return prisma.workshop.create({
      data,
    });
  }

  async updateWorkshop(id: number, data: Prisma.WorkshopUpdateInput): Promise<Workshop | null> {
    return prisma.workshop.update({
      where: { id },
      data,
    });
  }

  async deleteWorkshop(id: number): Promise<boolean> {
    const result = await prisma.workshop.delete({
      where: { id },
    });
    return Boolean(result);
  }
}
