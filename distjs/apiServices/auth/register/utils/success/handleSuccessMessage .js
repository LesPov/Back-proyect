"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccessMessage = void 0;
/**
 * Maneja la respuesta de éxito para la verificación de correo electrónico.
 * @param res La respuesta HTTP saliente.
 * @param email El correo electrónico al que se envió el mensaje de verificación.
 */
const handleSuccessMessage = (res, email) => {
    res.status(200).json({
        msg: `Correo de verificación enviado a ${email}`,
    });
};
exports.handleSuccessMessage = handleSuccessMessage;
