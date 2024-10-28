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
exports.getTiposDenunciaAnonimas = exports.handleServerErrorDenuncaiAnonima = exports.handleInputValidationErrors = exports.validateInput = exports.addTipoDenuncia = exports.handleDuplicateError = exports.findTipoDenuncia = void 0;
const tipoDenunciaModel_1 = require("../middleware/models/tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("../middleware/models/subtipoDenunciaModel");
const errorMessages_1 = require("../../../middleware/erros/errorMessages");
// Función para buscar tipo de denuncia por nombre
const findTipoDenuncia = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.findOne({
        where: { nombre: nombre }
    });
});
exports.findTipoDenuncia = findTipoDenuncia;
// Función para buscar subtipo de denuncia por nombre y tipoDenunciaId
// Función para manejar el error si el tipo o subtipo ya existe
const handleDuplicateError = (res, message) => {
    res.status(400).json({
        message: message,
        errors: `Error: Ya existe un registro con esos datos.`,
    });
    throw new Error("Duplicate validation failed");
};
exports.handleDuplicateError = handleDuplicateError;
/**
 * Función para crear el tipo de denuncia
 * Solo se ejecuta si no existen duplicados.
 */
const crearTipoDenuncia = (nombre, descripcion, esAnonimaOficial, flagImage) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.create({
        nombre,
        descripcion,
        esAnonimaOficial,
        flagImage,
    });
});
/**
 * Función para crear subtipos asociados
 * Solo se ejecuta si no existen duplicados.
 */
const crearSubtiposDenuncia = (subtipos, tipoDenunciaId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const subtipo of subtipos) {
        yield subtipoDenunciaModel_1.SubtipoDenunciaModel.create({
            nombre: subtipo.nombre,
            descripcion: subtipo.descripcion,
            tipoDenunciaId,
            flagImage: subtipo.flagImage || 'default-image.jpg',
        });
    }
});
const validarSubtipos = (subtipos, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtipoNombres = new Set();
    for (const subtipo of subtipos) {
        // Validar si hay duplicados en los subtipos dentro de la misma solicitud
        if (subtipoNombres.has(subtipo.nombre)) {
            return (0, exports.handleDuplicateError)(res, `El subtipo de denuncia '${subtipo.nombre}' ya está duplicado en la solicitud.`);
        }
        subtipoNombres.add(subtipo.nombre);
        // Validar si ya existe el subtipo en la base de datos
        const subtipoExistente = yield subtipoDenunciaModel_1.SubtipoDenunciaModel.findOne({ where: { nombre: subtipo.nombre } });
        if (subtipoExistente) {
            return (0, exports.handleDuplicateError)(res, `El subtipo de denuncia '${subtipo.nombre}' ya existe.`);
        }
    }
});
/**
 * Controlador para agregar un nuevo tipo de denuncia y sus subtipos asociados.
 * @param req - Objeto de solicitud con los datos del cuerpo (nombre, descripción, etc.).
 * @param res - Objeto de respuesta.
 */
const addTipoDenuncia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, esAnonimaOficial, flagImage, subtipos } = req.body;
        // Llamada a la función de validación de la entrada
        const inputValidationErrors = (0, exports.validateInput)(nombre, descripcion, esAnonimaOficial, flagImage, subtipos);
        (0, exports.handleInputValidationErrors)(inputValidationErrors, res); // Manejo de errores si la validación falla
        // Verificar si el tipo de denuncia ya existe
        const tipoDenunciaExistente = yield (0, exports.findTipoDenuncia)(nombre);
        if (tipoDenunciaExistente) {
            return (0, exports.handleDuplicateError)(res, `El tipo de denuncia '${nombre}' ya existe.`);
        }
        // Validar subtipos
        yield validarSubtipos(subtipos, res);
        const tipoDenuncia = yield crearTipoDenuncia(nombre, descripcion, esAnonimaOficial, flagImage);
        yield crearSubtiposDenuncia(subtipos, tipoDenuncia.id);
        // Envío de la respuesta exitosa
        res.status(201).json({ message: 'Tipo de denuncia y subtipos creados con éxito', tipoDenuncia });
    }
    catch (error) {
        // Manejo de errores del servidor
        (0, exports.handleServerErrorDenuncaiAnonima)(error, res);
    }
});
exports.addTipoDenuncia = addTipoDenuncia;
/**
 * Función para validar los datos de entrada.
 * @param nombre - Nombre del tipo de denuncia.
 * @param descripcion - Descripción del tipo de denuncia.
 * @param esAnonimaOficial - Indica si la denuncia es anónima u oficial.
 * @param flagImage - Imagen asociada.
 * @param subtipos - Subtipos asociados a la denuncia.
 * @returns Lista de errores de validación si los datos son incorrectos.
 */
const validateInput = (nombre, descripcion, esAnonimaOficial, flagImage, subtipos) => {
    const errors = [];
    // Validar campos requeridos del tipo de denuncia
    validateRequiredFields({ nombre, descripcion, esAnonimaOficial, flagImage }, errors);
    // Validar subtipos si están presentes
    if (Array.isArray(subtipos)) {
        validateSubtipos(subtipos, errors);
    }
    return errors; // Retorna los errores
};
exports.validateInput = validateInput;
/**
 * Valida los campos requeridos del tipo de denuncia.
 * @param fields - Objeto con los campos a validar.
 * @param errors - Arreglo donde se almacenarán los mensajes de error.
 */
const validateRequiredFields = (fields, errors) => {
    Object.keys(fields).forEach(key => {
        if (!fields[key]) {
            errors.push(errorMessages_1.errorMessages.requiredFields); // Mensaje de error si algún campo está vacío
        }
    });
};
/**
 * Valida los subtipos de denuncia.
 * @param subtipos - Arreglo de subtipos a validar.
 * @param errors - Arreglo donde se almacenarán los mensajes de error.
 */
const validateSubtipos = (subtipos, errors) => {
    subtipos.forEach((subtipo) => {
        if (!subtipo.nombre || !subtipo.descripcion) {
            errors.push('Cada subtipo debe tener un nombre y una descripción.');
        }
    });
};
/**
 * Manejo de errores de validación de entrada.
 * @param errors - Lista de errores de validación.
 * @param res - Objeto de respuesta.
 */
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Controlador para obtener los tipos de denuncias anónimas.
 * @param req - Objeto de solicitud.
 * @param res - Objeto de respuesta.
 */
const getTiposDenunciaAnonimas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDenuncias = yield tipoDenunciaModel_1.TipoDenunciaModel.findAll({
            where: {
                esAnonimaOficial: ['Anónima', 'Ambas'] // Filtra denuncias que sean 'Anónima' o 'Ambas'
            }
        });
        // Construye el objeto de respuesta con URLs de las imágenes
        const tiposDenunciasConImagen = tiposDenuncias.map((tipo) => {
            return Object.assign(Object.assign({}, tipo.toJSON()), { imageUrl: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/${tipo.flagImage}` // URL completa de la imagen
             });
        });
        res.json(tiposDenunciasConImagen); // Respuesta con los tipos de denuncias anónimas y URLs de imágenes
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias anónimas' });
    }
});
exports.getTiposDenunciaAnonimas = getTiposDenunciaAnonimas;
