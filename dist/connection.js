"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configurações de conexão
const connectionConfig = {
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.SENHA_DATABASE,
    database: process.env.DATABASE
};
// Cria uma conexão com o banco de dados
exports.pool = promise_1.default.createPool(connectionConfig);
