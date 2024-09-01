

// import dotenv from 'dotenv';
// import Server from './services/server';
// import { initializeWhatsAppClient } from './apiServices/Auth/phone/utils/send/whatsappClient';

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


import dotenv from 'dotenv';
import Server from './services/server';

// Configurar las variables de entorno del archivo .env
dotenv.config();


// Crear una instancia del servidor y arrancarlo
const server = new Server();
 
