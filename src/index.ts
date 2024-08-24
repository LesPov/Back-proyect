/**
 * @file index.ts
 * @description Archivo principal para configurar y arrancar el servidor de la aplicación.
 */
import dontenv from 'dotenv';
import Server from './services/server';
// Configurar las variables de entorno del archivo .env
dontenv.config();

// Crear una instancia del servidor
const server = new Server();

 