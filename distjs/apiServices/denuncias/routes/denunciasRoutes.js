"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const denunciasController_1 = require("../controllers/denunciasController");
const router = express_1.default.Router();
router.post('/agregar_tipos', denunciasController_1.addTipoDenuncia);
router.get('/tipos', denunciasController_1.getTiposDenuncia);
exports.default = router;
