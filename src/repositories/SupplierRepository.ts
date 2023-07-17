import { PrismaClient, Supplier } from '@prisma/client';

const prisma = new PrismaClient();

export class SupplierRepository {
  async findAllSuppliers(): Promise<Supplier[]> {
    return prisma.supplier.findMany();
  }

  async findSupplierById(id: number): Promise<Supplier | null> {
    return prisma.supplier.findUnique({
      where: { id },
    });
  }

  async createSupplier(data: Supplier): Promise<Supplier> {
    return prisma.supplier.create({
      data,
    });
  }

  async updateSupplier(id: number, data: Supplier): Promise<Supplier | null> {
    return prisma.supplier.update({
      where: { id },
      data,
    });
  }

  async deleteSupplier(id: number): Promise<boolean> {
    const deletedSupplier = await prisma.supplier.delete({
      where: { id },
    });
    return !!deletedSupplier;
  }
}
