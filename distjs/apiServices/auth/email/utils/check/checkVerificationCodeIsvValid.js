"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVerificationCodeIsValidError = exports.checkVerificationCodeIsValid = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el código de verificación proporcionado es válido.
 *
 * @param user - El objeto de usuario que contiene el código de verificación almacenado.
 * @param verificationCode - El código de verificación proporcionado en la solicitud.
 * @returns Booleano que indica si el código es válido.
 */
const checkVerificationCodeIsValid = (user, verificationCode) => {
    return user.verification.verificationCode === verificationCode.trim();
};
exports.checkVerificationCodeIsValid = checkVerificationCodeIsValid;
/**
 * Maneja el error cuando el código de verificación proporcionado es inválido.
 *
 * @param isCodeValid - Booleano que indica si el código es válido.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
const handleVerificationCodeIsValidError = (isCodeValid, res) => {
    if (!isCodeValid) {
        const errorMsg = errorMessages_1.errorMessages.invalidVerificationCode();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El código de verificación proporcionado es inválido o no coincide con el de la base de datos.',
        });
        throw new Error("Code is already invalid");
    }
};
exports.handleVerificationCodeIsValidError = handleVerificationCodeIsValidError;
