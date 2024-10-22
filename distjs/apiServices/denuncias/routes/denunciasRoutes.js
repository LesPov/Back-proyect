"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tiposDenunciasController_1 = require("../controllers/tiposDenunciasController");
const denunciasAnonimas_1 = require("../controllers/denunciasAnonimas");
const router = express_1.default.Router();
router.post('/agregar_tipos', tiposDenunciasController_1.addTipoDenuncia);
// router.get('/tipos/anonimas', getTiposDenunciaAnonimas);
// // Nueva ruta para obtener tipos de denuncias oficiales o ambas
// router.get('/tipos/oficiales', getTiposDenunciaOficiales);
// Ruta para crear denuncia anónima
router.post('/denuncias', denunciasAnonimas_1.crearDenunciaAnonima);
exports.default = router;
