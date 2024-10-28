/**
 * @file server.ts
 * @description Clase que representa el servidor de la aplicación.
 */

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { AuthModel } from '../middleware/models/authModel';
import { VerificationModel } from '../middleware/models/VerificationModel';

import { Country } from '../middleware/models/paisModel';
import adminRouter from '../apiServices/Admin/adminRouter';
import userRouter from '../apiServices/Users/userRouter';
import emailVerificationRoutes from '../apiServices/Admin/Auth/email/emailRoutes';
import loginUserRouter from '../apiServices/Admin/Auth/login/loginRouter';
import countryPais from '../apiServices/Admin/Auth/pais/paisRouter';
import phoneVerificationRouter from '../apiServices/Admin/Auth/phone/phoneRoutes';
import { UserProfileModel } from '../apiServices/Admin/Auth/profile/models/userProfileModel';
import registerRouter from '../apiServices/Admin/Auth/register/registerRouter';
import DenunciasServer from '../apiServices/denuncias/services/denunciasServer';

import path from 'path';

// Configurar las variables de entorno del archivo .env
dotenv.config();


class Server {

    private app: Application;
    private port: string;
    private denunciasServer: DenunciasServer;


    /**
     * Constructor de la clase Server.
     */
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '1001';
        this.denunciasServer = new DenunciasServer();
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
        this.app.use('/api/users', registerRouter, loginUserRouter, adminRouter, userRouter, emailVerificationRoutes, phoneVerificationRouter, countryPais);
        this.app.use('/api/denuncias', this.denunciasServer.getApp());

    }
 

    /**
     * Configura los middlewares de la aplicación.
     */
    middlewares() {
        // Parseo body   
        this.app.use(express.json());
        // Middleware para servir archivos estáticos desde la carpeta uploads
        this.app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads'), {
            setHeaders: (res, path) => {
                console.log(`Accediendo a: ${path}`);  // Aquí se agrega el console.log
            }
        }));
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
            await Country.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
console.log(new Date());
