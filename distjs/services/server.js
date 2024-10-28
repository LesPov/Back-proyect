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
const authModel_1 = require("../middleware/models/authModel");
const VerificationModel_1 = require("../middleware/models/VerificationModel");
const paisModel_1 = require("../middleware/models/paisModel");
const adminRouter_1 = __importDefault(require("../apiServices/Admin/adminRouter"));
const userRouter_1 = __importDefault(require("../apiServices/Users/userRouter"));
const emailRoutes_1 = __importDefault(require("../apiServices/Admin/Auth/email/emailRoutes"));
const loginRouter_1 = __importDefault(require("../apiServices/Admin/Auth/login/loginRouter"));
const paisRouter_1 = __importDefault(require("../apiServices/Admin/Auth/pais/paisRouter"));
const phoneRoutes_1 = __importDefault(require("../apiServices/Admin/Auth/phone/phoneRoutes"));
const userProfileModel_1 = require("../apiServices/Admin/Auth/profile/models/userProfileModel");
const registerRouter_1 = __importDefault(require("../apiServices/Admin/Auth/register/registerRouter"));
const denunciasServer_1 = __importDefault(require("../apiServices/denuncias/services/denunciasServer"));
const path_1 = __importDefault(require("path"));
// Configurar las variables de entorno del archivo .env
dotenv_1.default.config();
class Server {
    /**
     * Constructor de la clase Server.
     */
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '1001';
        this.denunciasServer = new denunciasServer_1.default();
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
        this.app.use('/api/users', registerRouter_1.default, loginRouter_1.default, adminRouter_1.default, userRouter_1.default, emailRoutes_1.default, phoneRoutes_1.default, paisRouter_1.default);
        this.app.use('/api/denuncias', this.denunciasServer.getApp());
    }
    /**
     * Configura los middlewares de la aplicación.
     */
    middlewares() {
        // Parseo body   
        this.app.use(express_1.default.json());
        // Middleware para servir archivos estáticos desde la carpeta uploads
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', '..', 'uploads'), {
            setHeaders: (res, path) => {
                console.log(`Accediendo a: ${path}`); // Aquí se agrega el console.log
            }
        }));
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
                yield paisModel_1.Country.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
console.log(new Date());
