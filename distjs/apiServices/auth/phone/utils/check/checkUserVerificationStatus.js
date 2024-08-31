"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmailNotVerificationErroruser = exports.checkUserVerificationStatus = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el usuario ya ha sido verificado por email.
 * @param user - El objeto usuario.
 * @returns Verdadero si el email ya está verificado, falso en caso contrario.
 */
const checkUserVerificationStatus = (user) => {
    // Verificar el estado de la verificación del correo electrónico si no esta 
    return user?.verification?.isEmailVerified || false;
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
    if (!isEmailVerified) {
        const errorMsg = errorMessages_1.errorMessages.emailNotVerified();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El correo electrónico no ha sido verificado. Por favor, verifica tu correo antes de continuar.',
        });
        throw new Error("User email not verified.");
    }
};
exports.handleEmailNotVerificationErroruser = handleEmailNotVerificationErroruser;
