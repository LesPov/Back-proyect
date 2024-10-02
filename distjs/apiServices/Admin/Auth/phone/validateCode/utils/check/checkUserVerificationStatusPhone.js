"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePhoneNotVerificationErroruser = exports.checkUserVerificationStatusPhone = void 0;
const errorMessages_1 = require("../../../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el número de teléfono del usuario ya ha sido verificado.
 * @param user - El objeto usuario que contiene la información de verificación.
 * @returns `true` si el número de teléfono ya está verificado, `false` en caso contrario.
 */
const checkUserVerificationStatusPhone = (user) => {
    var _a;
    // Retorna `true` si el número de teléfono está verificado, `false` en caso contrario.
    return ((_a = user === null || user === void 0 ? void 0 : user.verification) === null || _a === void 0 ? void 0 : _a.isPhoneVerified) || false;
};
exports.checkUserVerificationStatusPhone = checkUserVerificationStatusPhone;
/**
 * Maneja el error cuando el número de teléfono ya está verificado.
 * @param isPhoneVerified - Indicador de si el número de teléfono está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * Si el número de teléfono ya está verificado, responde con un error 400 y un mensaje adecuado.
 * Lanza una excepción para detener la ejecución del flujo en caso de que el número de teléfono ya esté verificado.
 */
const handlePhoneNotVerificationErroruser = (isPhoneVerified, res) => {
    if (isPhoneVerified) {
        // Mensaje de error personalizado para el caso en que el número de teléfono ya está verificado.
        const errorMsg = errorMessages_1.errorMessages.phoneAlreadyVerified();
        // Responde con un estado 400 y un mensaje de error JSON.
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El número de teléfono ya ha sido verificado. No es necesario verificarlo de nuevo.',
        });
        // Lanza una excepción para detener la ejecución del flujo de verificación.
        throw new Error("User VerifyCodePhone.");
    }
};
exports.handlePhoneNotVerificationErroruser = handlePhoneNotVerificationErroruser;
