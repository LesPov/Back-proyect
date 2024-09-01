"use strict";
// import dotenv from 'dotenv';
// import Server from './services/server';
// import { initializeWhatsAppClient } from './apiServices/Auth/phone/utils/send/whatsappClient';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Configurar las variables de entorno del archivo .env
// dotenv.config();
// const startServer = async () => {
//     try {
//         // Crear una instancia del servidor y arrancarlo
//         const server = new Server();
//         // Inicializar el cliente de WhatsApp
//         await initializeWhatsAppClient();
//         console.log('WhatsApp Client initialized successfully.');
//     } catch (error) {
//         console.error('Error initializing WhatsApp client:', error);
//         // Aquí no detenemos el servidor, solo registramos el error de WhatsApp
//     }
// };
// // Iniciar el servidor primero y luego intentar inicializar WhatsApp
// startServer();
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./services/server"));
// Configurar las variables de entorno del archivo .env
dotenv_1.default.config();
// Crear una instancia del servidor y arrancarlo
const server = new server_1.default();
