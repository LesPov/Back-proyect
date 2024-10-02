"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paisController_1 = require("./paisController");
const countryPais = express_1.default.Router();
// Ruta para obtener todos los códigos de país
countryPais.get('/countries', paisController_1.getAllCountryCodes);
exports.default = countryPais;
