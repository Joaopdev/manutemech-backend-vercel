import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { comparePassword } from "../utils/security/compareHash";

import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET; // Defina uma chave secreta forte para assinar os tokens JWT

if (!jwtSecret) {
    throw new Error("JWT_SECRET não está definido no arquivo .env");
}

const prisma = new PrismaClient();

class LoginController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Verificar se o usuário existe no banco de dados
            const user: User | null = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Usuário ou senha incorretos" });
            }

            // Verificar a senha
            const isPasswordValid = await comparePassword(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ error: "Usuário ou senha incorretos" });
            }

            // Gerar o token JWT
            const token = jwt.sign({ userId: user.id }, jwtSecret ?? "", {
                expiresIn: "1d",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                domain: "localhost",
                path: "/",
            });

            // Retornar o token como resposta
            return res.json({ token, user });
        } catch (error: any) {
            console.error("Erro no login:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default LoginController;
