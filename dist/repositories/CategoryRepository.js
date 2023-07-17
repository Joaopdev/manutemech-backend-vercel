"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryRepository {
    async findAllCategories() {
        return prisma.category.findMany();
    }
    async findCategoryById(id) {
        return prisma.category.findUnique({ where: { id } });
    }
    async createCategory(categoryData) {
        return prisma.category.create({ data: categoryData });
    }
    async updateCategory(id, categoryData) {
        return prisma.category.update({ where: { id }, data: categoryData });
    }
    async deleteCategory(id) {
        return prisma.category.delete({ where: { id } });
    }
}
exports.CategoryRepository = CategoryRepository;
