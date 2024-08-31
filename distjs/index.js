"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file index.ts
 * @description Archivo principal para configurar y arrancar el servidor de la aplicación.
 */
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./services/server"));
const whatsappClient_1 = require("./apiServices/Auth/phone/utils/send/whatsappClient");
// Configurar las variables de entorno del archivo .env
dotenv_1.default.config();
const startServer = async () => {
    try {
        // Inicializar el cliente de WhatsApp
        await (0, whatsappClient_1.initializeWhatsAppClient)();
        console.log('WhatsApp Client initialized successfully.');
        // Crear una instancia del servidor y arrancarlo
        const server = new server_1.default();
    }
    catch (error) {
        console.error('Error initializing WhatsApp client:', error);
        process.exit(1); // Salir del proceso si hay un error crítico
    }
};
// Iniciar el servidor junto con el cliente de WhatsApp
startServer();
