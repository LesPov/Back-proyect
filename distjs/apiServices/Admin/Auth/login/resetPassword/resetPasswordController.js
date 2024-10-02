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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Importaciones de utilidades y validaciones
const validateInputResetPassword_1 = require("./utils/validations/validateInputResetPassword");
const handleInputValidationErrors_1 = require("../../register/utils/errors/handleInputValidationErrors");
const handleServerError_1 = require("./utils/errors/handleServerError");
const findUserPasswordReset_1 = require("../passwordRecovery/utils/findUser/findUserPasswordReset");
const findUserByUsernameLogin_1 = require("../utils/findUser/findUserByUsernameLogin");
const checkUserVerificationStatus_1 = require("../passwordRecovery/utils/check/checkUserVerificationStatus");
const checkVerificationRandomPass_1 = require("./utils/check/checkVerificationRandomPass");
const checkVerificationCodeExpiration_1 = require("../../email/utils/check/checkVerificationCodeExpiration");
const handleVerificationCodeExpirationError_1 = require("./utils/errors/handleVerificationCodeExpirationError");
const validateRandomPassword_1 = require("../../register/utils/validations/validateRandomPassword");
const newPassword_1 = require("./utils/newPassword/newPassword");
const handleSuccessMessage_1 = require("./utils/succes/handleSuccessMessage");
const removeRandomPassword_1 = require("./utils/remove/removeRandomPassword");
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail, randomPassword, newPassword } = req.body;
        const inputValidationErrors = (0, validateInputResetPassword_1.validateInputresetPassword)(usernameOrEmail, randomPassword, newPassword);
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario
        const user = yield (0, findUserPasswordReset_1.findUseRrequestPassword)(usernameOrEmail);
        if (!user) {
            (0, findUserByUsernameLogin_1.handleUserNotFoundErrorLogin)(usernameOrEmail, user, res);
            return;
        }
        // 3. Verificación del estado del usuario (si está verificado)
        const isVerified = (0, checkUserVerificationStatus_1.checkisUserVerified)(user);
        (0, checkUserVerificationStatus_1.handleUnverifiedUserError)(isVerified, res);
        // 4. Verifica si el randomPassword de verificación proporcionado es válido
        const isCodeValid = (0, checkVerificationRandomPass_1.checkVerificationRandomPassword)(user, randomPassword);
        (0, checkVerificationRandomPass_1.handleVerificationRandomPasswordError)(isCodeValid, res);
        // Verifica si el randomPassword de verificación ha expirado
        const currentDate = new Date();
        const isCodeExpire = (0, checkVerificationCodeExpiration_1.checkVerificationCodeExpiration)(user, currentDate);
        (0, handleVerificationCodeExpirationError_1.handleVerificationCodeExpirationErrorReset)(isCodeExpire, res);
        // 5. Validar los requisitos de la nueva contraseña
        const newPasswordValidationErrors = (0, validateRandomPassword_1.validateNewPassword)(newPassword);
        (0, validateRandomPassword_1.handleNewPasswordValidationErrors)(newPasswordValidationErrors, res);
        // 6. Si todo es válido, proceder a encriptar la nueva contraseña
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        // 7. Guardar la nueva contraseña en la base de datos
        yield (0, newPassword_1.updatePasswordInDatabase)(user.id, hashedPassword);
        // 8. Eliminar el randomPassword de verificación
        yield (0, removeRandomPassword_1.removerandomPassword)(user.id);
        // 9. Enviar mensaje de éxito
        return (0, handleSuccessMessage_1.handleSuccessMessageResetNewPassword)(res);
    }
    catch (error) {
        // Manejo de errores del servidor
        (0, handleServerError_1.handleServerErrorResetPassword)(error, res);
    }
});
exports.resetPassword = resetPassword;
