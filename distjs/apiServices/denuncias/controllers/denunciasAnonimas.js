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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputValidationErrors = exports.validateInput = exports.handleServerError = exports.handleNotFoundError = exports.findSubtipoDenuncia = exports.findTipoDenuncia = exports.handleSuccessMessage = exports.crearDenunciaAnonima = void 0;
const tipoDenunciaModel_1 = require("../middleware/models/tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("../middleware/models/subtipoDenunciaModel");
const errorMessages_1 = require("../../../middleware/erros/errorMessages");
const denunciasAnonimasModel_1 = require("../middleware/models/denunciasAnonimasModel");
const crypto_1 = require("crypto"); // Importar para generar la clave única
const successMessages_1 = require("../../../middleware/success/successMessages");
// Crear denuncia anónima y validar tipo y subtipo de denuncia
const crearDenunciaAnonima = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion, direccion, nombreTipo, nombreSubtipo } = req.body;
        // Validar entrada
        const inputValidationErrors = (0, exports.validateInput)(descripcion, direccion, nombreTipo, nombreSubtipo);
        if (inputValidationErrors.length > 0) {
            return (0, exports.handleInputValidationErrors)(inputValidationErrors, res);
        }
        // Validar tipo de denuncia
        const tipoDenuncia = yield (0, exports.findTipoDenuncia)(nombreTipo);
        if (!tipoDenuncia) {
            return (0, exports.handleNotFoundError)('Tipo de denuncia', nombreTipo, res, errorMessages_1.errorMessages.invalidTipoDenuncia);
        }
        // Validar subtipo de denuncia
        const subtipoDenuncia = yield (0, exports.findSubtipoDenuncia)(nombreSubtipo, tipoDenuncia.id);
        if (!subtipoDenuncia) {
            return (0, exports.handleNotFoundError)('Subtipo de denuncia', nombreSubtipo, res, errorMessages_1.errorMessages.invalidSubtipoDenuncia);
        }
        // Generar una clave única
        const claveUnica = (0, crypto_1.randomBytes)(16).toString('hex'); // Genera una cadena hexagonal de 32 caracteres
        // Crear la denuncia
        const nuevaDenuncia = yield denunciasAnonimasModel_1.DenunciaAnonimaModel.create({
            descripcion,
            direccion,
            tipoDenunciaId: tipoDenuncia.id,
            subtipoDenunciaId: subtipoDenuncia.id,
            claveUnica // Almacena la clave única generada
        });
        (0, exports.handleSuccessMessage)(res, nuevaDenuncia);
    }
    catch (error) {
        (0, exports.handleServerError)(error, res);
    }
});
exports.crearDenunciaAnonima = crearDenunciaAnonima;
const handleSuccessMessage = (res, nuevaDenuncia) => {
    res.status(201).json({
        message: successMessages_1.successMessages.denunciaCreada, // Mensaje de éxito específico
        nuevaDenuncia
    });
};
exports.handleSuccessMessage = handleSuccessMessage;
// Función para buscar tipo de denuncia por nombre
const findTipoDenuncia = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.findOne({
        where: { nombre: nombre }
    });
});
exports.findTipoDenuncia = findTipoDenuncia;
// Función para buscar subtipo de denuncia por nombre y tipoDenunciaId
const findSubtipoDenuncia = (nombre, tipoDenunciaId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subtipoDenunciaModel_1.SubtipoDenunciaModel.findOne({
        where: { nombre: nombre, tipoDenunciaId: tipoDenunciaId }
    });
});
exports.findSubtipoDenuncia = findSubtipoDenuncia;
// Manejo de errores de validación
const handleNotFoundError = (field, value, res, customMessage) => {
    const errorMsg = customMessage || `${field} con nombre '${value}' no fue encontrado.`;
    res.status(404).json({
        message: errorMsg,
        errors: `Error: ${field} no encontrado en la base de datos.`,
    });
};
exports.handleNotFoundError = handleNotFoundError;
// Manejo de errores del servidor
const handleServerError = (error, res) => {
    console.error("Error en el controlador:", error);
    res.status(500).json({ message: errorMessages_1.errorMessages.serverError, error });
};
exports.handleServerError = handleServerError;
// Validación de entrada de datos
const validateInput = (descripcion, direccion, nombreTipo, nombreSubtipo) => {
    const errors = [];
    if (!descripcion)
        errors.push(errorMessages_1.errorMessages.missingDescripcion);
    if (!direccion)
        errors.push(errorMessages_1.errorMessages.missingDireccion);
    if (!nombreTipo)
        errors.push(errorMessages_1.errorMessages.missingTipoDenunciaId);
    if (!nombreSubtipo)
        errors.push(errorMessages_1.errorMessages.missingSubtipoDenunciaId);
    return errors;
};
exports.validateInput = validateInput;
const handleInputValidationErrors = (errors, res) => {
    res.status(400).json({
        message: errorMessages_1.errorMessages.datosIncompletos,
        errors: errors
    });
};
exports.handleInputValidationErrors = handleInputValidationErrors;
