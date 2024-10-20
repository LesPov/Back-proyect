"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tiposDenunciasController_1 = require("../controllers/tiposDenunciasController");
const router = express_1.default.Router();
router.post('/agregar_tipos', tiposDenunciasController_1.addTipoDenuncia);
router.get('/tipos/anonimas', tiposDenunciasController_1.getTiposDenunciaAnonimas);
// Nueva ruta para obtener tipos de denuncias oficiales o ambas
router.get('/tipos/oficiales', tiposDenunciasController_1.getTiposDenunciaOficiales);
// Nueva ruta para obtener subtipos de denuncias
exports.default = router;
