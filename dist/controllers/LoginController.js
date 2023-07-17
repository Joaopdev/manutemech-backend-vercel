"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const compareHash_1 = require("../utils/security/compareHash");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET; // Defina uma chave secreta forte para assinar os tokens JWT
if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido no arquivo .env');
}
const prisma = new client_1.PrismaClient();
class LoginController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Verificar se o usuário existe no banco de dados
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: 'Usuário ou senha incorretos' });
            }
            // Verificar a senha
            const isPasswordValid = await (0, compareHash_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Usuário ou senha incorretos' });
            }
            // Gerar o token JWT
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret ?? '', { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true, secure: true, domain: 'localhost', path: '/' });
            // Retornar o token como resposta
            return res.json({ token, user });
        }
        catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
    }
}
exports.default = LoginController;
