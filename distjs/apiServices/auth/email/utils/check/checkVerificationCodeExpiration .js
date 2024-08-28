"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmailVerificationCodeExpirationError = exports.checkVerificationCodeExpiration = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el código de verificación ha expirado.
 *
 * @param user - El objeto de usuario que contiene la fecha de expiración del código.
 * @param currentDate - La fecha actual para comparar con la fecha de expiración.
 * @returns Booleano que indica si el código ha expirado.
 */
const checkVerificationCodeExpiration = (user, currentDate) => {
    var _a;
    // Verifica si la fecha de expiración del código es válida y ha expirado
    const expirationDate = (_a = user === null || user === void 0 ? void 0 : user.verification) === null || _a === void 0 ? void 0 : _a.verificationCodeExpiration;
    return expirationDate ? new Date(expirationDate) < currentDate : false;
};
exports.checkVerificationCodeExpiration = checkVerificationCodeExpiration;
/**
 * Maneja el error cuando el código de verificación ha expirado.
 *
 * @param isCodeExpire - Booleano que indica si el código ha expirado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
const handleEmailVerificationCodeExpirationError = (isCodeExpire, res) => {
    if (isCodeExpire) {
        const errorMsg = errorMessages_1.errorMessages.verificationCodeExpired;
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El código de verificación ha expirado.',
        });
        throw new Error("Verification code has expired");
    }
};
exports.handleEmailVerificationCodeExpirationError = handleEmailVerificationCodeExpirationError;
