"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmailNotVerificationErroruser = exports.checkUserVerificationStatus = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el usuario ya ha sido verificado por email.
 * @param user - El objeto usuario.
 * @returns Verdadero si el email ya está verificado, falso en caso contrario.
 */
const checkUserVerificationStatus = (user) => {
    var _a;
    // Verificar el estado de la verificación del correo electrónico
    return ((_a = user === null || user === void 0 ? void 0 : user.verification) === null || _a === void 0 ? void 0 : _a.isEmailVerified) || false;
};
exports.checkUserVerificationStatus = checkUserVerificationStatus;
/**
 * Maneja el error cuando el correo electrónico ya está verificado.
 *
 * @param isEmailVerified - Indicador de si el correo electrónico está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * @throws Lanza una excepción si el correo electrónico ya está verificado.
 */
const handleEmailNotVerificationErroruser = (isEmailVerified, res) => {
    if (isEmailVerified) {
        const errorMsg = errorMessages_1.errorMessages.userAlreadyVerifiedemail();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El correo electrónico ya ha sido verificado.',
        });
        throw new Error("Email already verified");
    }
};
exports.handleEmailNotVerificationErroruser = handleEmailNotVerificationErroruser;
