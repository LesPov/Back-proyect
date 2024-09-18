"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVerificationCodeExpirationErrorReset = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Maneja el error cuando el código de verificación ha expirado.
 *
 * @param isCodeExpire - Booleano que indica si el código ha expirado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
const handleVerificationCodeExpirationErrorReset = (isCodeExpire, res) => {
    if (isCodeExpire) {
        const errorMsg = errorMessages_1.errorMessages.expiredVerificationCode;
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: La contraseña aleatorea  ha expirado.',
        });
        throw new Error("Verification code has expired");
    }
};
exports.handleVerificationCodeExpirationErrorReset = handleVerificationCodeExpirationErrorReset;
