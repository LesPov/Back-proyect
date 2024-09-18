"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVerificationRandomPasswordError = exports.checkVerificationRandomPassword = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el código de verificación randomPassword proporcionado es válido.
 *
 * @param user - El objeto de usuario que contiene el código de verificación almacenado.
 * @param verificationCode - El código de verificación proporcionado en la solicitud.
 * @returns Booleano que indica si el código es válido.
 */
const checkVerificationRandomPassword = (user, randomPassword) => {
    return user.verification.randomPassword === randomPassword.trim();
};
exports.checkVerificationRandomPassword = checkVerificationRandomPassword;
/**
 * Maneja el error cuando el randomPassword de verificación proporcionado es inválido.
 *
 * @param isCodeValid - Booleano que indica si el código es válido.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
const handleVerificationRandomPasswordError = (isCodeValid, res) => {
    if (!isCodeValid) {
        const errorMsg = errorMessages_1.errorMessages.invalidRandomPassword();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El randomPassword de verificación proporcionado es inválido o no coincide con el de la base de datos.',
        });
        throw new Error("Code is already invalid");
    }
};
exports.handleVerificationRandomPasswordError = handleVerificationRandomPasswordError;
