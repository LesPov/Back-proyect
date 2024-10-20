import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import express, { Application, Router } from 'express';
import cors from 'cors';
import { TipoDenunciaModel } from '../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../middleware/models/subtipoDenunciaModel ';
import denunciasRoutes from '../routes/denunciasRoutes';
import { DenunciaAnonimaModel } from '../middleware/models/denunciasAnonimasModel';

dotenv.config();

class DenunciasServer {
    private app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    routes() {
        this.app.use('/', denunciasRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await TipoDenunciaModel.sync();
            await SubtipoDenunciaModel.sync();
            await DenunciaAnonimaModel.sync();
            

            console.log('Modelos de denuncias sincronizados correctamente.');
        } catch (error) {
            console.error('Error al sincronizar los modelos de denuncias:', error);
        }
    }

    getApp() {
        return this.app;
    }
}

export default DenunciasServer;