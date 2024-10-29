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
exports.handleServerErrorsubtiposDenuncaiAnonima = exports.getSubtiposDenuncia = void 0;
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
const subtipoDenunciaModel_1 = require("../../middleware/models/subtipoDenunciaModel");
const tipoDenunciaModel_1 = require("../../middleware/models/tipoDenunciaModel");
/**
 * Función para buscar un tipo de denuncia por nombre
 * @param nombreTipoDenuncia - Nombre del tipo de denuncia a buscar
 * @returns El tipo de denuncia encontrado o null si no existe
 */
const buscarTipoDenunciaPorNombre = (nombreTipoDenuncia) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tipoDenunciaModel_1.TipoDenunciaModel.findOne({
        where: { nombre: nombreTipoDenuncia },
        attributes: ['id', 'nombre', 'descripcion', 'flagImage', 'esAnonimaOficial']
    });
});
/**
 * Función para manejar errores y enviar la respuesta adecuada
 * @param res - Objeto de respuesta
 * @param statusCode - Código de estado HTTP
 * @param message - Mensaje de error a enviar
 */
const manejarError = (res, statusCode, message) => {
    res.status(statusCode).json({
        ok: false,
        message
    });
};
/**
 * Función para buscar todos los subtipos asociados a un tipo de denuncia
 * @param tipoDenunciaId - ID del tipo de denuncia para buscar sus subtipos
 * @returns Un array de subtipos de denuncia con URLs de las imágenes
 */
const buscarSubtiposPorTipoDenuncia = (tipoDenunciaId) => __awaiter(void 0, void 0, void 0, function* () {
    const subtipos = yield subtipoDenunciaModel_1.SubtipoDenunciaModel.findAll({
        where: { tipoDenunciaId },
        attributes: ['id', 'nombre', 'descripcion', 'flagImage'],
        include: [{
                model: tipoDenunciaModel_1.TipoDenunciaModel,
                attributes: ['nombre', 'esAnonimaOficial', 'descripcion']
            }]
    });
    // Agregar URL completa para cada imagen de subtipo
    return subtipos.map((subtipo) => (Object.assign(Object.assign({}, subtipo.toJSON()), { imageUrl: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/${subtipo.flagImage}` })));
});
/**
 * Función para estructurar la respuesta del controlador
 * @param tipoDenuncia - Objeto del tipo de denuncia
 * @param subtipos - Array de subtipos de denuncia
 * @returns Un objeto estructurado con la respuesta
 */
const estructurarRespuesta = (tipoDenuncia, subtipos) => {
    return {
        ok: true,
        tipoDenuncia: Object.assign(Object.assign({}, tipoDenuncia.toJSON()), { cantidadSubtipos: subtipos.length, imageUrl: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/${tipoDenuncia.flagImage}` }),
        subtipos
    };
};
/**
 * Función para manejar la respuesta cuando no hay subtipos registrados
 * @param res - Objeto de respuesta
 * @param response - Objeto estructurado de la respuesta
 * @param nombreTipoDenuncia - Nombre del tipo de denuncia
 */
const manejarRespuestaSinSubtipos = (res, response, nombreTipoDenuncia) => {
    res.status(200).json(Object.assign(Object.assign({}, response), { message: `El tipo de denuncia '${nombreTipoDenuncia}' no tiene subtipos registrados` }));
};
/**
 * Función para enviar una respuesta exitosa al cliente
 * @param res - Objeto de respuesta
 * @param response - Objeto estructurado de la respuesta
 * @param mensaje - Mensaje de éxito a enviar
 */
const enviarRespuestaExitosa = (res, response, mensaje) => {
    res.status(200).json(Object.assign(Object.assign({}, response), { message: 'Subtipos de denuncia recuperados exitosamente' }));
};
/**
 * Controlador para obtener los subtipos de una denuncia por el nombre del tipo
 * @param req - Request con el parámetro nombreTipoDenuncia
 * @param res - Response para enviar la respuesta al cliente
 */
const getSubtiposDenuncia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreTipoDenuncia } = req.params;
        // Buscar el tipo de denuncia
        const tipoDenuncia = yield buscarTipoDenunciaPorNombre(nombreTipoDenuncia);
        if (!tipoDenuncia) {
            return manejarError(res, 404, `No se encontró el tipo de denuncia con nombre: ${nombreTipoDenuncia}`);
        }
        // Buscar subtipos del tipo de denuncia
        const subtipos = yield buscarSubtiposPorTipoDenuncia(tipoDenuncia.id);
        // Estructurar y enviar la respuesta
        const response = estructurarRespuesta(tipoDenuncia, subtipos);
        if (subtipos.length === 0) {
            return manejarRespuestaSinSubtipos(res, response, nombreTipoDenuncia);
        }
        enviarRespuestaExitosa(res, response, 'Subtipos de denuncia recuperados exitosamente');
    }
    catch (error) {
        (0, exports.handleServerErrorsubtiposDenuncaiAnonima)(error, res);
    }
});
exports.getSubtiposDenuncia = getSubtiposDenuncia;
/**
 * Manejo de errores en el controlador DenunciaAnonima.
 * @param error - Error capturado.
 * @param res - Objeto de respuesta.
 */
const handleServerErrorsubtiposDenuncaiAnonima = (error, res) => {
    console.error("Error en el controlador DenunciaAnonima:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
    }
};
exports.handleServerErrorsubtiposDenuncaiAnonima = handleServerErrorsubtiposDenuncaiAnonima;
