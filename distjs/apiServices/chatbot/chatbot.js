"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dotenv = require('dotenv');
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp');
const MockAdapter = require('@bot-whatsapp/database/mock');
// Configurar las variables de entorno del archivo .env
dotenv.config();
const flowPrincipal = addKeyword(['hola', 'alo'])
    .addAnswer(['Hola, bienvenido a mi tienda', '¿Cómo puedo ayudarte?'])
    .addAnswer(['Tengo:', 'Zapatos', 'Bolsos', 'etc...']);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(WebWhatsappProvider);
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
});
main();
