import sendCodePhone from "./sendCodePhone";

const BotWhatsapp = require('@bot-whatsapp/bot');

// Crear el flujo usando la función de flujo
const flowindex = BotWhatsapp.createFlow([
    sendCodePhone
]);

export default flowindex;
