"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const denunciasAnonimas_1 = require("../controllers/denunciasAnonimas");
const tiposDenunciasController_1 = require("../controllers/tiposDenunciasController");
const subtiposDenunciasController_1 = require("../controllers/subtiposDenunciasController");
const router = express_1.default.Router();
router.post('/agregar_tipos', tiposDenunciasController_1.addTipoDenuncia);
router.get('/tipos/anonimas', tiposDenunciasController_1.getTiposDenunciaAnonimas);
// Nueva ruta para obtener los subtipos según el tipo de denuncia
router.get('/tipos/subtiposdenuncia/:nombreTipoDenuncia', subtiposDenunciasController_1.getSubtiposDenuncia);
// Ruta para crear denuncia anónima
router.post('/denuncias', denunciasAnonimas_1.crearDenunciaAnonima);
exports.default = router;
