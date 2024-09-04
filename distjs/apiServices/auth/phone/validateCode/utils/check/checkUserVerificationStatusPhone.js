"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePhoneNotVerificationErroruser = exports.checkUserVerificationStatusPhone = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Verifica si el usuario ya ha sido verificado por phone.
 * @param user - El objeto usuario.
 * @returns Verdadero si el email ya está verificado, falso en caso contrario.
 */
const checkUserVerificationStatusPhone = (user) => {
    var _a;
    // Verificar el estado de la verificación del numero celular si no esta 
    return ((_a = user === null || user === void 0 ? void 0 : user.verification) === null || _a === void 0 ? void 0 : _a.isPhoneVerified) || false;
};
exports.checkUserVerificationStatusPhone = checkUserVerificationStatusPhone;
/**
 * Maneja el error cuando el numero celular ya está verificado.
 *
 * @param isPhoneVerified - Indicador de si el numero celular está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * @throws Lanza una excepción si el numero celular ya está verificado.
 */
const handlePhoneNotVerificationErroruser = (isPhoneVerified, res) => {
    if (!isPhoneVerified) {
        const errorMsg = errorMessages_1.errorMessages.phoneAlreadyVerified();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El numero celular no ha sido verificado. Por favor, verifica tu correo antes de continuar.',
        });
        throw new Error("User email not verified.");
    }
};
exports.handlePhoneNotVerificationErroruser = handlePhoneNotVerificationErroruser;
