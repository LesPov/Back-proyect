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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones necesarias
const connnection_1 = __importDefault(require("../../database/connnection"));
const databaseindex_1 = __importDefault(require("./database/databaseindex"));
const flowindex_1 = __importDefault(require("./flow/flowindex"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno
dotenv_1.default.config();
// Importar el bot de WhatsApp
const BotWhatsapp = require('@bot-whatsapp/bot');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
// Función principal para crear el bot
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar la conexión a la base de datos
        yield connnection_1.default.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        const providersindex = BotWhatsapp.createProvider(BaileysProvider);
        providersindex.initHttpServer(3002);
        yield BotWhatsapp.createBot({
            flow: flowindex_1.default,
            provider: providersindex,
            database: databaseindex_1.default,
        });
        console.log("Bot de WhatsApp iniciado correctamente");
    }
    catch (error) {
        console.error("Error iniciando el bot de WhatsApp:", error);
    }
});
main();
