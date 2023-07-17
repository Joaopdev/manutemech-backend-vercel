// entities/CategoryEntity.ts

import { Prisma, Category } from '@prisma/client';

export type CreateCategoryInput = Prisma.CategoryCreateInput;

export type UpdateCategoryInput = Prisma.CategoryUpdateInput;

export class CategoryEntity {
  private prismaCategory: Category;

  constructor(prismaCategory: Category) {
    this.prismaCategory = prismaCategory;
  }

  get id(): number {
    return this.prismaCategory.id;
  }

  get name(): string {
    return this.prismaCategory.name;
  }

  // Implemente outros getters, setters e métodos de negócio, se necessário
}
