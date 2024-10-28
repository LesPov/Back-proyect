"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const denunciasAnonimas_1 = require("../controllers/denunciasAnonimas");
const tiposDenunciasController_1 = require("../controllers/tiposDenunciasController");
const subtiposDenunciasController_1 = require("../controllers/subtiposDenunciasController");
const consultarDenunciaAnonima_1 = require("../controllers/consultas/consultarDenunciaAnonima");
const tipos_de_DenunciasController_1 = require("../controllers/tipo_de_denuncias/tipos_de_DenunciasController");
const router = express_1.default.Router();
router.post('/agregar_tipos', tipos_de_DenunciasController_1.creaTiposDenunciaAnonimas);
router.get('/tipos/anonimas', tiposDenunciasController_1.getTiposDenunciaAnonimas);
// Nueva ruta para obtener los subtipos según el tipo de denuncia
router.get('/tipos/subtiposdenuncia/:nombreTipoDenuncia', subtiposDenunciasController_1.getSubtiposDenuncia);
// Ruta para crear denuncia anónima
router.post('/denuncias', denunciasAnonimas_1.crearDenunciaAnonima);
router.get('/denuncias/consultas_anonimas', consultarDenunciaAnonima_1.consultarDenunciaAnonima);
exports.default = router;
