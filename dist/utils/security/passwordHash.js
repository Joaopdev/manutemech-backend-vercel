"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 12;
const generateSalt = async () => {
    const salt = await bcrypt_1.default.genSalt(SALT_ROUNDS);
    return salt;
};
const hashPassword = async (password) => {
    const salt = await generateSalt();
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
