import { Request, Response } from 'express';
import { hashPassword } from '../utils/security/passwordHash';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../@types/controllers/AuthenticatedRequest';

const prisma = new PrismaClient();

export class UserController {

  async getAllUsers(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const users = await prisma.user.findMany();
      return res.status(201).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message});
  }
}
  

async createUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
  
  const { name, email, password, acceptedTerms, acceptedPrivacy } = req.body;

try {
  // Faça a hash da senha
  const hashedPassword = await hashPassword(password);

  // Crie o usuário com os novos campos
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      acceptedTerms,
      acceptedPrivacy,
    },
  });

  return res.status(201).json(user);
} catch (error: any) {
  return res.status(400).json({ error: error.message });
}
}

  async getUserById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = Number(req.userId)

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
    });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.id !== userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, acceptedTerms, acceptedPrivacy } = req.body;
    const userId = Number(req.userId)

    const userData = { name, email, password, acceptedTerms, acceptedPrivacy };

    try {
      const updatedUser = await prisma.user.update({ where: { id: parseInt(id) }, data: userData });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (updatedUser.id !== userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      return res.json({name, email});
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = Number(req.userId)

    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (deletedUser.id !== userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      return res.json({ message: 'User deleted successfully' });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
