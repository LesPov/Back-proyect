
import dotenv from 'dotenv';
import Server from './services/server';

// Configurar las variables de entorno del archivo .env
dotenv.config();


// Crear una instancia del servidor y arrancarlo
const server = new Server();
 
