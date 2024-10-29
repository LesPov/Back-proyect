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
exports.handleServerErrorDenuncaiAnonima = exports.creaSubtipoDenuncia = exports.handleImageUploadError = exports.findTipoDenunciaById = void 0;
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
const subtipoDenunciaModel_1 = require("../../middleware/models/subtipoDenunciaModel");
const tipoDenunciaModel_1 = require("../../middleware/models/tipoDenunciaModel");
const uploadConfig_1 = __importDefault(require("../../utils/uploadConfig"));
const tipos_de_DenunciasController_1 = require("../tipo_de_denuncias/tipos_de_DenunciasController");
// Función para buscar tipo de denuncia por ID
const findTipoDenunciaById = (tipoDenunciaId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.findByPk(tipoDenunciaId);
});
exports.findTipoDenunciaById = findTipoDenunciaById;
// Encapsular la lógica de subida de imagen para reducir complejidad
const handleImageUpload = (req, res, callback) => {
    (0, uploadConfig_1.default)(req, res, (err) => {
        if (err) {
            return (0, exports.handleImageUploadError)(err, res);
        }
        callback();
    });
};
// Manejo de errores de subida de imagen
const handleImageUploadError = (err, res) => {
    console.error(`Error en la subida de la imagen: ${err.message}`);
    res.status(400).json({
        msg: `Error en la subida de la imagen: ${err.message}`,
        errors: 'Error al cargar la imagen',
    });
};
exports.handleImageUploadError = handleImageUploadError;
// Controlador para crear un subtipo de denuncia con imagen// Controlador para crear un subtipo de denuncia con imagen
const creaSubtipoDenuncia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Maneja la subida de imagen
        handleImageUpload(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            // Valida si la imagen fue subida
            if (!(0, tipos_de_DenunciasController_1.validateImageUpload)(req, res))
                return;
            const { nombre, descripcion, tipoDenunciaId } = req.body;
            const flagImage = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || null;
            // Verificar si el tipo de denuncia existe
            const tipoDenuncia = yield (0, exports.findTipoDenunciaById)(tipoDenunciaId);
            if (!tipoDenuncia) {
                res.status(404).json({
                    message: `El tipo de denuncia con ID ${tipoDenunciaId} no existe.`
                });
                return; // Agregar `return` aquí para evitar que devuelva algo
            }
            // Crear el subtipo de denuncia
            const subtipoDenuncia = yield subtipoDenunciaModel_1.SubtipoDenunciaModel.create({
                nombre,
                descripcion,
                tipoDenunciaId,
                flagImage,
            });
            res.status(201).json({
                message: 'Subtipo de denuncia creado con éxito',
                subtipoDenuncia
            });
        }));
    }
    catch (error) {
        (0, exports.handleServerErrorDenuncaiAnonima)(error, res);
    }
});
exports.creaSubtipoDenuncia = creaSubtipoDenuncia;
/**
 * Manejo de errores en el controlador DenunciaAnonima.
 * @param error - Error capturado.
 * @param res - Objeto de respuesta.
 */
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
