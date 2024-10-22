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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tipoDenunciaModel_1 = require("../middleware/models/tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("../middleware/models/subtipoDenunciaModel");
const denunciasRoutes_1 = __importDefault(require("../routes/denunciasRoutes"));
const denunciasAnonimasModel_1 = require("../middleware/models/denunciasAnonimasModel");
dotenv_1.default.config();
class DenunciasServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    routes() {
        this.app.use('/', denunciasRoutes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tipoDenunciaModel_1.TipoDenunciaModel.sync();
                yield subtipoDenunciaModel_1.SubtipoDenunciaModel.sync();
                yield denunciasAnonimasModel_1.DenunciaAnonimaModel.sync();
                console.log('Modelos de denuncias sincronizados correctamente.');
            }
            catch (error) {
                console.error('Error al sincronizar los modelos de denuncias:', error);
            }
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = DenunciasServer;
