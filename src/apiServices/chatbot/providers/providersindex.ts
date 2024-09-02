const BotWhatsapp = require('@bot-whatsapp/bot');
const ProviderWS = require('@bot-whatsapp/provider/web-whatsapp');
const BaileysProvider = require('@bot-whatsapp/provider/baileys')

// Crear el proveedor de WhatsApp Web
const providersindex = BotWhatsapp.createProvider(BaileysProvider);

export default providersindex;
