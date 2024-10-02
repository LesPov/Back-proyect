"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePhoneLoginNotVerificationErroruser = exports.checkUserVerificationStatusPhoneLogin = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el usuario ya ha sido verificado por isPhoneVerified.
 * @param user - El objeto usuario.
 * @returns Verdadero si el isPhoneVerified ya está verificado, falso en caso contrario.
 */
const checkUserVerificationStatusPhoneLogin = (user) => {
    var _a;
    // Verificar el estado de la verificación del numero si no esta 
    return ((_a = user === null || user === void 0 ? void 0 : user.verification) === null || _a === void 0 ? void 0 : _a.isPhoneVerified) || false;
};
exports.checkUserVerificationStatusPhoneLogin = checkUserVerificationStatusPhoneLogin;
/**
 * Maneja el error cuando el numero ya está verificado.
 *
 * @param isPhoneVerified - Indicador de si el numero está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * @throws Lanza una excepción si el numero ya está verificado.
 */
const handlePhoneLoginNotVerificationErroruser = (isPhoneVerified, res) => {
    if (!isPhoneVerified) {
        const errorMsg = errorMessages_1.errorMessages.numberNotVerified();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El numero no ha sido verificado. Por favor, verifica tu correo antes de continuar.',
        });
        throw new Error("User isPhoneVerified not verified.");
    }
};
exports.handlePhoneLoginNotVerificationErroruser = handlePhoneLoginNotVerificationErroruser;
