const dotenv = require('dotenv');
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Configurar las variables de entorno del archivo .env
dotenv.config();

const flowPrincipal = addKeyword(['hola', 'alo'])
    .addAnswer(['Hola, bienvenido a mi tienda', '¿Cómo puedo ayudarte?'])
    .addAnswer(['Tengo:', 'Zapatos', 'Bolsos', 'etc...']);

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(WebWhatsappProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
};

main();
