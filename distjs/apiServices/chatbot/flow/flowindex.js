"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendCodePhone_1 = __importDefault(require("./sendCodePhone"));
const BotWhatsapp = require('@bot-whatsapp/bot');
// Crear el flujo usando la función de flujo
const flowindex = BotWhatsapp.createFlow([
    sendCodePhone_1.default
]);
exports.default = flowindex;
