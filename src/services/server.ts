/**
 * @file server.ts
 * @description Clase que representa el servidor de la aplicación.
 */
 
import express, { Application } from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';

import { newUser } from '../apiServices/Auth/register/registerController';
import { AuthModel } from '../apiServices/Auth/register/models/authModel';
import { UserProfileModel } from '../apiServices/Auth/profile/models/userProfileModel';
import { VerificationModel } from '../apiServices/Auth/register/models/VerificationModel';
import registerRouter from '../apiServices/Auth/register/registerRouter';
import emailVerificationRoutes from '../apiServices/Auth/email/emailRoutes';
import phoneVerificationRouter from '../apiServices/Auth/phone/phoneRoutes';


// Configurar las variables de entorno del archivo .env
dotenv.config();


class Server {

    private app: Application; 
    private port: string;
    

    
    /**
     * Constructor de la clase Server.
     */
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '1001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }


    /** 
     * Inicia el servidor y escucha en el puerto especificado.
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }


    /**
     * Configura las rutas de la aplicación.
     */
    routes() {

        // Ruta para registrar nuevos usuarios
        this.app.use('/api/users', registerRouter, emailVerificationRoutes,phoneVerificationRouter); 

    }
 
 
    /**
     * Configura los middlewares de la aplicación.
     */
    middlewares() {
        // Parseo body   
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }


    /**
     * Conecta a la base de datos y sincroniza los modelos de Product y User.
     */
    async dbConnect() {
        try {

            await AuthModel.sync();
            await UserProfileModel.sync();
            await VerificationModel.sync();

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
console.log(new Date());
