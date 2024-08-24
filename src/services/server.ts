/**
 * @file server.ts
 * @description Clase que representa el servidor de la aplicación.
 */

import express, { Application } from 'express';
import cors from 'cors';
import RolModel from '../models/rolModel';
import UserModel from '../models/userModel';
import verificacionModel from '../models/verificationModel';
import { newUser } from '../apiServices/register/registerController';


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
        this.app.use('/api/auth',newUser);

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
            await UserModel.sync();
            await RolModel.sync();
            await verificacionModel.sync();

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
