"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const passwordHash_1 = require("../utils/security/passwordHash");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async findAllUsers() {
        return prisma.user.findMany();
    }
    async findUserById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
    async findUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async createUser(userData) {
        const hashedPassword = await (0, passwordHash_1.hashPassword)(userData.password);
        const user = await prisma.user.create({ data: { ...userData, password: hashedPassword } });
        return user;
    }
    async updateUser(id, userData) {
        return prisma.user.update({ where: { id }, data: userData });
    }
    async deleteUser(id) {
        return prisma.user.delete({ where: { id } });
    }
}
exports.UserRepository = UserRepository;
