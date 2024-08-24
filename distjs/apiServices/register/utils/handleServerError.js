"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = void 0;
const errorMessages_1 = require("../../../middleware/erros/errorMessages");
const VERIFICATION_CODE_EXPIRATION_HOURS = 24;
const VERIFICATION_CODE_EXPIRATION_MINUTES = 1;
/**
 * Maneja errores internos del servidor.
 * @param error El error ocurrido.
 * @param res La respuesta HTTP saliente.
 */
const handleServerError = (error, res) => {
    console.error("Error en el controlador newUser:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
    }
};
exports.handleServerError = handleServerError;
