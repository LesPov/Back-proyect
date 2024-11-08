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
exports.handleServerError = exports.consultarDenunciaAnonima = void 0;
const tipoDenunciaModel_1 = require("../../../middleware/models/tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("../../../middleware/models/subtipoDenunciaModel");
const denunciasAnonimasModel_1 = require("../../../middleware/models/denunciasAnonimasModel");
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
const successMessages_1 = require("../../../../../middleware/success/successMessages");
// Función para validar la clave única
const validateClaveUnica = (claveUnica) => {
    const errors = [];
    if (!claveUnica || claveUnica.trim() === '') { // Verifica si está vacía o mal formada
        errors.push('La clave única es requerida y no puede estar vacía.');
    }
    return errors;
};
// Función para manejar errores de validación sin lanzar una excepción// Función para manejar errores de validación sin lanzar una excepción
const handleInputValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: 'Error en la validación de los datos.',
            errors: errors
        });
        return true; // Indica que hubo un error de validación
    }
    return false; // No hubo errores de validación
};
// Función mejorada para buscar la denuncia con sus relaciones
const findDenunciaWithRelations = (claveUnica) => __awaiter(void 0, void 0, void 0, function* () {
    return yield denunciasAnonimasModel_1.DenunciaAnonimaModel.findOne({
        where: { claveUnica },
        include: [
            {
                model: tipoDenunciaModel_1.TipoDenunciaModel,
                as: 'TipoDenuncia',
                attributes: ['id', 'nombre'],
                required: true,
            },
            {
                model: subtipoDenunciaModel_1.SubtipoDenunciaModel,
                as: 'SubtipoDenuncia',
                attributes: ['id', 'nombre'],
                required: true,
            }
        ],
        attributes: [
            'id',
            'descripcion',
            'direccion',
            'status',
            'claveUnica',
            'pruebas',
            'audio',
            'tieneEvidencia',
            'createdAt',
            'updatedAt',
            'tipoDenunciaId',
            'subtipoDenunciaId',
        ]
    });
});
// Función para manejar la respuesta exitosa
const handleSuccessResponse = (res, denuncia) => {
    if (!denuncia.TipoDenuncia || !denuncia.SubtipoDenuncia) {
        throw new Error('No se pudo obtener la información completa de tipo o subtipo de denuncia');
    }
    const pruebasUrls = denuncia.pruebas
        ? denuncia.pruebas.split(',').map((file) => {
            if (file.trim().endsWith('.webm')) {
                return {
                    type: 'video',
                    url: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/evidenciasDenuncias/videos/${file.trim()}`
                };
            }
            else {
                return {
                    type: 'image',
                    url: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/evidenciasDenuncias/imagenes/${file.trim()}`
                };
            }
        })
        : [];
    const audioUrl = denuncia.audio
        ? `https://g7hr118t-1001.use2.devtunnels.ms/uploads/evidenciasDenuncias/audios/${denuncia.audio}`
        : null;
    res.status(200).json({
        success: true,
        message: successMessages_1.successMessages.consultaExitosa,
        denuncia: {
            id: denuncia.id,
            descripcion: denuncia.descripcion,
            direccion: denuncia.direccion,
            status: denuncia.status,
            claveUnica: denuncia.claveUnica,
            tipoDenuncia: {
                id: denuncia.TipoDenuncia.id,
                nombre: denuncia.TipoDenuncia.nombre,
            },
            subtipoDenuncia: {
                id: denuncia.SubtipoDenuncia.id,
                nombre: denuncia.SubtipoDenuncia.nombre,
            },
            pruebas: pruebasUrls,
            audio: audioUrl,
            tieneEvidencia: denuncia.tieneEvidencia,
            fechaCreacion: denuncia.createdAt,
            fechaActualizacion: denuncia.updatedAt,
        },
    });
};
// Función para manejar denuncia no encontrada
const handleDenunciaNotFound = (res) => {
    res.status(404).json({
        success: false,
        message: errorMessages_1.errorMessages.denunciaNotFound,
        error: 'No se encontró ninguna denuncia con la clave proporcionada',
    });
};
// Controlador principal
// Controlador principal
const consultarDenunciaAnonima = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { claveUnica } = req.query; // Cambiamos a req.query
        // Validar la entrada de datos (claveUnica)
        const inputValidationErrors = validateClaveUnica(claveUnica);
        // Manejar cualquier error de validación de la entrada de datos
        if (handleInputValidationErrors(inputValidationErrors, res)) {
            return; // Detenemos la ejecución si hubo un error de validación
        }
        // Buscar la denuncia
        const denuncia = yield findDenunciaWithRelations(claveUnica);
        // Verificar si se encontró la denuncia
        if (!denuncia) {
            return handleDenunciaNotFound(res);
        }
        // Enviar respuesta exitosa
        handleSuccessResponse(res, denuncia);
    }
    catch (error) {
        (0, exports.handleServerError)(error, res);
    }
});
exports.consultarDenunciaAnonima = consultarDenunciaAnonima;
// Manejador de errores del servidor
const handleServerError = (error, res) => {
    console.error("Error en el controlador de consulta denuncia anónima:", error);
    res.status(500).json({
        message: errorMessages_1.errorMessages.serverError,
        error: error.message,
    });
};
exports.handleServerError = handleServerError;
