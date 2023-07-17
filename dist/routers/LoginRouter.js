"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const loginRouter = express_1.default.Router();
const controller = new LoginController_1.default();
loginRouter.post('/login', controller.login);
exports.default = loginRouter;
