"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const path_1 = __importDefault(require("path"));
// Ruta donde se guardará la sesión
const sessionPath = path_1.default.resolve(__dirname, '../../../.wwebjs_sessions');
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth({
        clientId: "client-one", // Cambia esto para múltiples sesiones
        dataPath: sessionPath, // Ruta donde se guardará la sesión
    })
});
client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
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
exports.default = client;
