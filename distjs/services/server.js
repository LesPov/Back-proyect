"use strict";
/**
 * @file server.ts
 * @description Clase que representa el servidor de la aplicación.
 */
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authModel_1 = require("../apiServices/Auth/register/models/authModel");
const userProfileModel_1 = require("../apiServices/Auth/profile/models/userProfileModel");
const VerificationModel_1 = require("../apiServices/Auth/register/models/VerificationModel");
const registerRouter_1 = __importDefault(require("../apiServices/Auth/register/registerRouter"));
const emailRoutes_1 = __importDefault(require("../apiServices/Auth/email/emailRoutes"));
const phoneRoutes_1 = __importDefault(require("../apiServices/Auth/phone/phoneRoutes"));
// Configurar las variables de entorno del archivo .env
dotenv_1.default.config();
class Server {
    /**
     * Constructor de la clase Server.
     */
    constructor() {
        this.app = (0, express_1.default)();
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
        });
    }
    /**
     * Configura las rutas de la aplicación.
     */
    routes() {
        // Ruta para registrar nuevos usuarios
        this.app.use('/api/users', registerRouter_1.default, emailRoutes_1.default, phoneRoutes_1.default);
    }
    /**
     * Configura los middlewares de la aplicación.
     */
    middlewares() {
        // Parseo body   
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    /**
     * Conecta a la base de datos y sincroniza los modelos de Product y User.
     */
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield authModel_1.AuthModel.sync();
                yield userProfileModel_1.UserProfileModel.sync();
                yield VerificationModel_1.VerificationModel.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
console.log(new Date());
