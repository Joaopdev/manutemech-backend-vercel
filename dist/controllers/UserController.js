"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const passwordHash_1 = require("../utils/security/passwordHash");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            return res.status(201).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = await (0, passwordHash_1.hashPassword)(password);
            const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ error: "Não autorizado!" });
        }
    }
    async getUserById(req, res) {
        const userId = Number(req.userId);
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (user.id !== userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const userId = Number(req.userId);
        const userData = { name, email, password };
        try {
            const updatedUser = await prisma.user.update({ where: { id: parseInt(id) }, data: userData });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (updatedUser.id !== userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            return res.json(updatedUser);
        }
        catch (error) {
            return res.status(400).json({ error: 'Failed to update user' });
        }
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        const userId = Number(req.userId);
        try {
            const deletedUser = await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (deletedUser.id !== userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            return res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
