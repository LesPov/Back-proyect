"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./services/server"));
// Configurar las variables de entorno del archivo .env
dotenv_1.default.config();
// Crear una instancia del servidor y arrancarlo
const server = new server_1.default();
