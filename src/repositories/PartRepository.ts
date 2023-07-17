import { PrismaClient, Part, Prisma } from '@prisma/client';
import { CreatePartInput } from '../entities/PartEntity';

const prisma = new PrismaClient();

export class PartRepository {
  async findAllParts(): Promise<Part[]> {
    return prisma.part.findMany();
  }

  async findPartById(id: number): Promise<Part | null> {
    return prisma.part.findUnique({ where: { id } });
  }

  async createPart(data: Prisma.PartCreateInput): Promise<Part> {
    return prisma.part.create({ data });
  }

  async updatePart(id: number, data: Prisma.PartUpdateInput): Promise<Part | null> {
    return prisma.part.update({ where: { id }, data });
  }

  async deletePart(id: number): Promise<boolean> {
    const deletedPart = await prisma.part.delete({ where: { id } });
    return deletedPart !== null;
  }
}
