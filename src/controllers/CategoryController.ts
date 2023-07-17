import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class CategoryController {
  
  async getAllCategories(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId); // Obtém o ID do usuário autenticado
  
    try {
      const categories = await prisma.category.findMany({
        where: { userId: userId }, //
      });
  
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }
  

  async createCategory(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { name, description } = req.body;
    
    const userId = Number(req.userId) // Obtém o ID do usuário autenticado
  
  
    try {
      const category = await prisma.category.create({
        data: {
        name,
        description,
        user: {
          connect: { id: userId }
        }
      }});
      return res.status(201).json(category);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  

  async getCategoryById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId) // Obtém o ID do usuário autenticado
  
    try {
      const category = await prisma.category.findUnique({where: {id: Number(id)}});
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Verifica se o usuário autenticado é o criador da categoria
      if (category.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
  
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch category' });
    }
  }
  
  async updateCategory(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = Number(req.userId) // Obtém o ID do usuário autenticado
  
    try {
      const category = await prisma.category.findUnique({where: {id: Number(id)}});
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Verifica se o usuário autenticado é o criador da categoria
      if (category.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
  
      const updatedCategory = await prisma.category.update({where: {id: Number(id)}, data: {name, description}});

      return res.json(updatedCategory);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update category' });
    }
  }
  
  async deleteCategory(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId) // Obtém o ID do usuário autenticado
  
    try {
      const category = await prisma.category.findUnique({where: {id: Number(id)}});
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Verifica se o usuário autenticado é o criador da categoria
      if (category.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
  
      await prisma.category.delete({where: {id: Number(id)}});
      return res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete category' });
    }
  }
  
}
