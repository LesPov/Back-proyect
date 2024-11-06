"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const denunciasAnonimas_1 = require("../controllers/denuncias_anonimas/denuncia/denunciasAnonimas");
const consultarDenunciaAnonima_1 = require("../controllers/denuncias_anonimas/consultas/consultarDenunciaAnonima");
const tipos_de_DenunciasController_1 = require("../controllers/denuncias_anonimas/tipo_de_denuncias/tipos_de_DenunciasController");
const subtipos_de_DenunciasController_1 = require("../controllers/denuncias_anonimas/subtipo_de_denuncias/subtipos_de_DenunciasController");
const obtenerTipos_de_DenunciasController_1 = require("../controllers/denuncias_anonimas/tipo_de_denuncias/obtenerTipos_de_DenunciasController");
const obtenerSubtipos_de_DenunciasController_1 = require("../controllers/denuncias_anonimas/subtipo_de_denuncias/obtenerSubtipos_de_DenunciasController");
const router = express_1.default.Router();
router.post('/agregar_tipos', tipos_de_DenunciasController_1.creaTiposDenunciaAnonimas);
router.get('/tipos/anonimas', obtenerTipos_de_DenunciasController_1.getTiposDenunciaAnonimas);
router.post('/agregar_subtipo', subtipos_de_DenunciasController_1.creaSubtipoDenuncia);
// Nueva ruta para obtener los subtipos según el tipo de denuncia
router.get('/tipos/subtiposdenuncia/:nombreTipoDenuncia', obtenerSubtipos_de_DenunciasController_1.getSubtiposDenuncia);
// Ruta para crear denuncia anónima
router.post('/denuncias', denunciasAnonimas_1.crearDenunciaAnonima);
router.get('/denuncias/consultas_anonimas', consultarDenunciaAnonima_1.consultarDenunciaAnonima);
exports.default = router;
