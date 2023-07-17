import { PrismaClient, Category } from '@prisma/client';
import { CreateCategoryInput, UpdateCategoryInput } from '../entities/CategoryEntity';

const prisma = new PrismaClient();

export class CategoryRepository {
  async findAllCategories(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async findCategoryById(id: number): Promise<Category | null> {
    
    return prisma.category.findUnique({ where: { id } });
  }

  async createCategory(categoryData: CreateCategoryInput): Promise<Category> {
    return prisma.category.create({ data: categoryData });
  }

  async updateCategory(id: number, categoryData: UpdateCategoryInput): Promise<Category | null> {
    return prisma.category.update({ where: { id }, data: categoryData });
  }

  async deleteCategory(id: number): Promise<Category | null> {
    return prisma.category.delete({ where: { id } });
  }
}
