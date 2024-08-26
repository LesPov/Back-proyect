"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmailError = void 0;
/**
 * Maneja los errores relacionados con el envío del correo de verificación.
 * @param res La respuesta HTTP saliente.
 * @param error El mensaje de error.
 */
const handleEmailError = (res, error) => {
    res.status(500).json({
        msg: 'Error al enviar el correo de verificación.',
        errors: error.message || 'Hubo un problema con el envío del correo.',
    });
    console.error('Error al enviar el correo de verificación:', error);
};
exports.handleEmailError = handleEmailError;
