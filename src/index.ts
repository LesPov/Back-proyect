
import dotenv from 'dotenv';
import Server from './services/server';
import whatsappClient from './apiServices/chatbot/client'; // Importa el bot desde el archivo separado

// Configurar las variables de entorno del archivo .env
dotenv.config();


// Crear una instancia del servidor y arrancarlo
const server = new Server();
 
