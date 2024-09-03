"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const puppeteer_1 = __importDefault(require("puppeteer"));
// Inicializar el cliente de WhatsApp con autenticación local
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
    puppeteer: {
        executablePath: puppeteer_1.default.executablePath(), // Especifica la ruta de Chromium
    }
});
// Generar el código QR para escanear en WhatsApp Web
client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
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
exports.default = client;
