import { Request, Response } from "express";
import { hashPassword } from "../utils/security/passwordHash";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../@types/controllers/AuthenticatedRequest";
import * as Yup from "yup";

const prisma = new PrismaClient();

export class UserController {
    async getAllUsers(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<Response> {
        try {
            const users = await prisma.user.findMany();
            return res.status(201).json(users);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createUser(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<Response> {
        const { name, email, password, acceptedTerms, acceptedPrivacy } =
            req.body;

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

            return res.status(201).json({ name, email });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getUserById(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<Response> {
        const userId = Number(req.userId);

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            if (user.id !== userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const { password, ...userWithoutPassword } = user;

            console.log(userWithoutPassword);
            return res.json(userWithoutPassword);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch user" });
        }
    }

    async updateUser(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<Response> {
        const { id } = req.params;
        const { name, email, acceptedTerms, acceptedPrivacy } = req.body;
        const userId = Number(req.userId);

        const userData = {
            name,
            email,
            acceptedTerms,
            acceptedPrivacy,
        };

        try {
            // Defina o esquema de validação usando Yup
            const validationSchema = Yup.object().shape({
                name: Yup.string().required("Nome é obrigatório"),
                email: Yup.string()
                    .required("O campo de e-mail é obrigatório")
                    .matches(
                        /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        "Digite um endereço de e-mail válido"
                    ),
                // Defina outras validações para os campos restantes
            });

            // Valide os dados fornecidos
            await validationSchema.validate({
                name,
                email,
                // Passe outros campos do req.body aqui
            });

            const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: userData,
            });

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            if (updatedUser.id !== userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            return res.json({ name, email });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<Response> {
        const { id } = req.params;
        const userId = Number(req.userId);

        try {
            const deletedUser = await prisma.user.delete({
                where: { id: parseInt(id) },
            });

            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            if (deletedUser.id !== userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            return res.json({ message: "User deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
