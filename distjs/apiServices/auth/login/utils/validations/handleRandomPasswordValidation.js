"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRandomPasswordValidation = void 0;
const checkVerificationCodeExpiration_1 = require("../../../email/utils/check/checkVerificationCodeExpiration");
const handleVerificationCodeExpirationError_1 = require("../../resetPassword/utils/errors/handleVerificationCodeExpirationError");
const validatePasswordLogin_1 = require("./validatePasswordLogin");
const handleRandomPasswordValidation = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica si la contraseña aleatoria coincide con la del usuario
    const isRandomPasswordValid = yield (0, validatePasswordLogin_1.validateRandomPassword)(user, password);
    if (!isRandomPasswordValid) {
        res.status(401).json({
            msg: 'La contraseña aleatoria es incorrecta.',
            errors: 'Error: La contraseña aleatoria que ingresaste no coincide con la registrada.',
        });
        return false; // Contraseña inválida
    }
    // Si la contraseña es válida, verifica si ha expirado
    const currentDate = new Date();
    const isCodeExpire = (0, checkVerificationCodeExpiration_1.checkVerificationCodeExpiration)(user, currentDate);
    if (isCodeExpire) {
        (0, handleVerificationCodeExpirationError_1.handleVerificationCodeExpirationErrorReset)(isCodeExpire, res);
        return false; // Código expirado
    }
    return true; // Contraseña válida y no expirada
});
exports.handleRandomPasswordValidation = handleRandomPasswordValidation;
