// Importaciones necesarias
import sequelize from "../../database/connnection";
import databaseindex from "./database/databaseindex";
import flowindex from "./flow/flowindex";
import providersindex from "./providers/providersindex";
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Importar el bot de WhatsApp
const BotWhatsapp = require('@bot-whatsapp/bot');

// Función principal para crear el bot
const main = async () => {
    try {
         // Verificar la conexión a la base de datos
         await sequelize.authenticate();
         console.log('Conexión a la base de datos establecida correctamente.');
 
    
        await BotWhatsapp.createBot({
            flow: flowindex,
            provider: providersindex,
            database: databaseindex,
        });

        console.log("Bot de WhatsApp iniciado correctamente");
    } catch (error) {
        console.error("Error iniciando el bot de WhatsApp:", error);
    }
};

main();
