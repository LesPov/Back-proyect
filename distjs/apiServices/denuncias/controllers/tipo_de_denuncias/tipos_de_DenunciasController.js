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
exports.handleServerErrorDenuncaiAnonima = exports.handleImageUploadError = exports.validateImageUpload = exports.creaTiposDenunciaAnonimas = exports.handleInputValidationErrors = exports.validateInput = exports.handleDuplicateError = exports.findTipoDenuncia = void 0;
const tipoDenunciaModel_1 = require("../../middleware/models/tipoDenunciaModel");
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
const uploadConfig_1 = __importDefault(require("../../utils/uploadConfig"));
// Función para buscar tipo de denuncia por nombre
const findTipoDenuncia = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.findOne({
        where: { nombre }
    });
});
exports.findTipoDenuncia = findTipoDenuncia;
// Función para manejar el error si el tipo o subtipo ya existe
const handleDuplicateError = (res, message) => {
    res.status(400).json({
        message,
        errors: `Error: Ya existe un registro con esos datos.`,
    });
};
exports.handleDuplicateError = handleDuplicateError;
// Validación de campos de entrada
const validateInput = (nombre, descripcion, esAnonimaOficial) => {
    const errors = [];
    validateRequiredFields({ nombre, descripcion, esAnonimaOficial }, errors);
    return errors;
};
exports.validateInput = validateInput;
// Validación de campos requeridos
const validateRequiredFields = (fields, errors) => {
    Object.keys(fields).forEach(key => {
        if (!fields[key]) {
            errors.push(errorMessages_1.errorMessages.requiredFields);
        }
    });
};
// Manejo de errores de validación de entrada
const handleInputValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
        throw new Error("Input validation failed");
    }
};
exports.handleInputValidationErrors = handleInputValidationErrors;
// Crear tipo de denuncia
const crearTipoDenuncia = (nombre, descripcion, esAnonimaOficial, flagImage) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.create({
        nombre,
        descripcion,
        esAnonimaOficial,
        flagImage,
    });
});
// Controlador para crear el tipo de denuncia con subida de imagen
const creaTiposDenunciaAnonimas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.tipo = 'tipo'; // Marca este registro como tipo de denuncia
    try {
        handleImageUpload(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!(0, exports.validateImageUpload)(req, res))
                return;
            const { nombre, descripcion, esAnonimaOficial } = req.body;
            const flagImage = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || null;
            const inputValidationErrors = (0, exports.validateInput)(nombre, descripcion, esAnonimaOficial);
            (0, exports.handleInputValidationErrors)(inputValidationErrors, res);
            const tipoDenunciaExistente = yield (0, exports.findTipoDenuncia)(nombre);
            if (tipoDenunciaExistente) {
                return (0, exports.handleDuplicateError)(res, `El tipo de denuncia '${nombre}' ya existe.`);
            }
            const tipoDenuncia = yield crearTipoDenuncia(nombre, descripcion, esAnonimaOficial, flagImage);
            res.status(201).json({ message: 'Tipo de denuncia creado con éxito', tipoDenuncia });
        }));
    }
    catch (error) {
        (0, exports.handleServerErrorDenuncaiAnonima)(error, res);
    }
});
exports.creaTiposDenunciaAnonimas = creaTiposDenunciaAnonimas;
// Validación de la imagen subida
const validateImageUpload = (req, res) => {
    if (!req.file) {
        res.status(400).json({
            msg: 'Error: La imagen no fue subida.',
            errors: 'Se requiere una imagen para el tipo de denuncia.',
        });
        return false;
    }
    return true;
};
exports.validateImageUpload = validateImageUpload;
// Manejo de errores de subida de imagen
const handleImageUploadError = (err, res) => {
    console.error(`Error en la subida de la imagen: ${err.message}`);
    res.status(400).json({
        msg: `Error en la subida de la imagen: ${err.message}`,
        errors: 'Error al cargar la imagen',
    });
};
exports.handleImageUploadError = handleImageUploadError;
// Encapsular la lógica de subida de imagen
const handleImageUpload = (req, res, callback) => {
    (0, uploadConfig_1.default)(req, res, (err) => {
        if (err) {
            return (0, exports.handleImageUploadError)(err, res);
        }
        callback();
    });
};
// Manejo de errores en el controlador
const handleServerErrorDenuncaiAnonima = (error, res) => {
    console.error("Error en el controlador DenunciaAnonima:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
        throw new Error("Controller DenunciaAnonima error");
    }
};
exports.handleServerErrorDenuncaiAnonima = handleServerErrorDenuncaiAnonima;
