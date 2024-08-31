"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = void 0;
const whatsappClient_1 = require("./whatsappClient");
/**
 * Envía un mensaje de WhatsApp con un código de verificación a un número de teléfono.
 *
 * @param {string} phoneNumber - El número de teléfono al que se enviará el mensaje de WhatsApp.
 * @param {string} message - El mensaje que contiene el código de verificación.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se ha enviado el mensaje de WhatsApp.
 */
const sendWhatsAppMessage = async (phoneNumber, message) => {
    try {
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Elimina caracteres no numéricos
        console.log(`Enviando mensaje a ${formattedPhoneNumber}`);
        await whatsappClient_1.client.sendMessage(`${formattedPhoneNumber}@c.us`, message);
        console.log(`Mensaje de WhatsApp enviado a ${formattedPhoneNumber}: ${message}`);
    }
    catch (error) {
        console.error(`Error al enviar el mensaje de WhatsApp a ${phoneNumber}:`, error);
        throw new Error('No se pudo enviar el mensaje de WhatsApp. Inténtalo de nuevo más tarde.');
    }
};
exports.sendWhatsAppMessage = sendWhatsAppMessage;
