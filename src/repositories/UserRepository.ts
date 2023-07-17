import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput } from '../entities/UserEntity';
import { hashPassword } from '../utils/security/passwordHash';

const prisma = new PrismaClient();

export class UserRepository {
  async findAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(userData: CreateUserInput): Promise<User> {
    const hashedPassword = await hashPassword(userData.password);
    const user = await prisma.user.create({ data: { ...userData, password: hashedPassword } });
    return user;
  }

  async updateUser(id: number, userData: Partial<CreateUserInput>): Promise<User | null> {
    return prisma.user.update({ where: { id }, data: userData });
  }

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
