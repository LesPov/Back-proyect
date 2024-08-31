/**
 * @file index.ts
 * @description Archivo principal para configurar y arrancar el servidor de la aplicación.
 */
import dotenv from 'dotenv';
import Server from './services/server';
import { initializeWhatsAppClient } from './apiServices/Auth/phone/utils/send/whatsappClient';

// Configurar las variables de entorno del archivo .env
dotenv.config();

const startServer = async () => {
    try {
        // Inicializar el cliente de WhatsApp
        await initializeWhatsAppClient();
        console.log('WhatsApp Client initialized successfully.');

        // Crear una instancia del servidor y arrancarlo
        const server = new Server();
    } catch (error) {
        console.error('Error initializing WhatsApp client:', error);
        process.exit(1); // Salir del proceso si hay un error crítico
    }
};

// Iniciar el servidor junto con el cliente de WhatsApp
startServer();
