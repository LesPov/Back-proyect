import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import puppeteer from 'puppeteer';

// Inicializar el cliente de WhatsApp con autenticación local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: puppeteer.executablePath(), // Especifica la ruta de Chromium
    }
});

// Generar el código QR para escanear en WhatsApp Web
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code generado. Escanéalo con tu aplicación de WhatsApp.');
});

// Confirmar que el cliente está listo
client.on('ready', () => {
    console.log('Cliente de WhatsApp está listo.');
});

// Manejar errores
client.on('auth_failure', () => {
    console.error('Fallo de autenticación, asegúrate de escanear el código QR correctamente.');
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    client.initialize();
});

client.initialize();

export default client;
