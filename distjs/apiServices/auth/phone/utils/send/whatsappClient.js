"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWhatsAppClient = exports.client = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
exports.client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
// Evento que genera el código QR
exports.client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
    console.log('QR code generated. Scan it with WhatsApp.');
});
// Evento que indica que el cliente está listo
exports.client.on('ready', () => {
    console.log('WhatsApp Web client is ready!');
});
// Inicializar el cliente de WhatsApp
const initializeWhatsAppClient = async () => {
    return new Promise((resolve, reject) => {
        exports.client.initialize();
        exports.client.on('ready', () => {
            resolve();
        });
        exports.client.on('auth_failure', (msg) => {
            console.error('AUTHENTICATION FAILURE', msg);
            reject(new Error('Authentication failed'));
        });
        exports.client.on('disconnected', (reason) => {
            console.log('Client was logged out', reason);
            reject(new Error('Client disconnected'));
        });
    });
};
exports.initializeWhatsAppClient = initializeWhatsAppClient;
