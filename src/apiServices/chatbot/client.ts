import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';

// Ruta donde se guardará la sesión
const sessionPath = path.resolve(__dirname, 'session');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one", // Cambia esto para múltiples sesiones
        dataPath: sessionPath, // Ruta donde se guardará la sesión
    })
});

client.on('qr', (qr: string) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el siguiente código QR con tu aplicación de WhatsApp:', qr);
});

client.on('authenticated', () => {
    console.log('Autenticación exitosa.');
});

client.on('auth_failure', (message) => {
    console.error('Error de autenticación con WhatsApp:', message);
});

client.on('ready', () => {
    console.log('Conectado a WhatsApp y listo para enviar mensajes.');
});

client.on('disconnected', (reason) => {
    console.log('Desconectado de WhatsApp. Razón:', reason);
});

client.initialize();

export default client;
