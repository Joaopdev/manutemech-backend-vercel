"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const MaintenanceRouter_1 = __importDefault(require("./routers/MaintenanceRouter"));
const MaintenancePartRouter_1 = __importDefault(require("./routers/MaintenancePartRouter"));
const PartRouter_1 = __importDefault(require("./routers/PartRouter"));
const WorkshopRouter_1 = __importDefault(require("./routers/WorkshopRouter"));
const CategoryRouter_1 = __importDefault(require("./routers/CategoryRouter"));
const ServiceRouter_1 = __importDefault(require("./routers/ServiceRouter"));
const SupplierRouter_1 = __importDefault(require("./routers/SupplierRouter"));
const VehicleRouter_1 = __importDefault(require("./routers/VehicleRouter"));
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const dotenv = __importStar(require("dotenv"));
const LoginRouter_1 = __importDefault(require("./routers/LoginRouter"));
const MobileDetect = require('mobile-detect');
dotenv.config();
console.log(process.env.NODE_ENV);
const cookieParser = require('cookie-parser');
const express = require('express');
const userAgent = require('express-useragent');
// Crie uma instância do aplicativo Express
const app = (0, express_1.default)();
// Adicione o middleware para analisar o user agent do cliente
app.use(userAgent.express());
// Defina uma rota para a página inicial
app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const md = new MobileDetect(userAgent);
    const isMobile = md.mobile() !== null || md.tablet() !== null;
    if (isMobile) {
        return res.status(403).send('Esta aplicação não é suportada em dispositivos móveis.');
    }
    // Caso contrário, retorne o conteúdo da aplicação normalmente
    // ... seu código Prisma e outras rotas e manipuladores de solicitação
});
const port = 4000; // Escolha a porta que deseja usar para o servidor
app.use((0, cors_1.default)({ origin: '*' }));
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'same-origin');
    next();
});
// Middleware para análise do corpo das requisições
app.use(body_parser_1.default.json());
//Moddleware de cookie seguro
app.use(cookieParser());
// Roteadores
app.use(LoginRouter_1.default);
app.use(CategoryRouter_1.default);
app.use(MaintenancePartRouter_1.default);
app.use(MaintenanceRouter_1.default);
app.use(PartRouter_1.default);
app.use(ServiceRouter_1.default);
app.use(SupplierRouter_1.default);
app.use(VehicleRouter_1.default);
app.use(WorkshopRouter_1.default);
app.use(UserRouter_1.default);
// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá!');
});
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
