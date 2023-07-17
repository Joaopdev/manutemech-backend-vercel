"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryController {
    async getAllCategories(req, res) {
        const userId = Number(req.userId); // Obtém o ID do usuário autenticado
        try {
            const categories = await prisma.category.findMany({
                where: { userId: userId }, //
            });
            return res.status(200).json(categories);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }
    async createCategory(req, res) {
        const { name, description } = req.body;
        const userId = Number(req.userId); // Obtém o ID do usuário autenticado
        try {
            const category = await prisma.category.create({
                data: {
                    name,
                    description,
                    user: {
                        connect: { id: userId }
                    }
                }
            });
            return res.status(201).json(category);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getCategoryById(req, res) {
        const { id } = req.params;
        const userId = Number(req.userId); // Obtém o ID do usuário autenticado
        try {
            const category = await prisma.category.findUnique({ where: { id: Number(id) } });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            // Verifica se o usuário autenticado é o criador da categoria
            if (category.userId !== userId) {
                return res.status(403).json({ error: 'Access denied' });
            }
            return res.json(category);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to fetch category' });
        }
    }
    async updateCategory(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        const userId = Number(req.userId); // Obtém o ID do usuário autenticado
        try {
            const category = await prisma.category.findUnique({ where: { id: Number(id) } });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            // Verifica se o usuário autenticado é o criador da categoria
            if (category.userId !== userId) {
                return res.status(403).json({ error: 'Access denied' });
            }
            const updatedCategory = await prisma.category.update({ where: { id: Number(id) }, data: { name, description } });
            return res.json(updatedCategory);
        }
        catch (error) {
            return res.status(400).json({ error: 'Failed to update category' });
        }
    }
    async deleteCategory(req, res) {
        const { id } = req.params;
        const userId = Number(req.userId); // Obtém o ID do usuário autenticado
        try {
            const category = await prisma.category.findUnique({ where: { id: Number(id) } });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            // Verifica se o usuário autenticado é o criador da categoria
            if (category.userId !== userId) {
                return res.status(403).json({ error: 'Access denied' });
            }
            await prisma.category.delete({ where: { id: Number(id) } });
            return res.json({ message: 'Category deleted successfully' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to delete category' });
        }
    }
}
exports.CategoryController = CategoryController;
