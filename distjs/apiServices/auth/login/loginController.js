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
exports.loginUser = void 0;
const handleServerError_1 = require("./utils/errors/handleServerError");
const loginvalidateInput_1 = require("./utils/validations/loginvalidateInput");
const handleInputValidationErrors_1 = require("../register/utils/errors/handleInputValidationErrors");
const findUserByUsernameLogin_1 = require("./utils/findUser/findUserByUsernameLogin");
const checkUserVerificationStatus_1 = require("../phone/utils/check/checkUserVerificationStatus");
const checkUserVerificationStatusPhone_1 = require("./utils/check/checkUserVerificationStatusPhone");
const validatePasswordLogin_1 = require("./utils/validations/validatePasswordLogin");
const loginAttemptsService_1 = require("./utils/loginAttempts/loginAttemptsService");
const handleSuccessfulLogin_1 = require("./utils/handleSuccessfu/handleSuccessfulLogin");
const checkVerificationCodeExpiration_1 = require("../email/utils/check/checkVerificationCodeExpiration");
const handleVerificationCodeExpirationError_1 = require("./resetPassword/utils/errors/handleVerificationCodeExpirationError");
/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
 *
 * @param req - La solicitud HTTP que contiene las credenciales del usuario (nombre de usuario y contraseña).
 * @param res - La respuesta HTTP que será enviada al cliente, con mensajes de éxito o error.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extraer y validar los datos de entrada
        const { username, passwordorrandomPassword } = req.body;
        const inputValidationErrors = (0, loginvalidateInput_1.validateInputLogin)(username, passwordorrandomPassword);
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario
        const user = yield (0, findUserByUsernameLogin_1.findUserByUsernameLogin)(username);
        if (!user) {
            (0, findUserByUsernameLogin_1.handleUserNotFoundErrorLogin)(username, user, res);
            return;
        }
        // 3. Verificación del estado del usuario Email
        const isEmailVerified = (0, checkUserVerificationStatus_1.checkUserVerificationStatusEmail)(user);
        (0, checkUserVerificationStatus_1.handleEmailNotVerificationErroruser)(isEmailVerified, res);
        // 4. Verificación del estado del usuario Phone
        const isPhoneNumberVerified = (0, checkUserVerificationStatusPhone_1.checkUserVerificationStatusPhoneLogin)(user);
        (0, checkUserVerificationStatusPhone_1.handlePhoneLoginNotVerificationErroruser)(isPhoneNumberVerified, res);
        // 5. Validar la contraseña y manejar los intentos de inicio de sesión
        const isPasswordValid = yield (0, validatePasswordLogin_1.validatePassword)(user, passwordorrandomPassword);
        const loginSuccess = yield (0, loginAttemptsService_1.handleLoginAttempts)(user.id, isPasswordValid, res);
        // Verifica si el randomPassword de verificación ha expirado
        const currentDate = new Date();
        const isCodeExpire = (0, checkVerificationCodeExpiration_1.checkVerificationCodeExpiration)(user, currentDate);
        (0, handleVerificationCodeExpirationError_1.handleVerificationCodeExpirationErrorReset)(isCodeExpire, res);
        // 6. Si el inicio de sesión es exitoso
        if (loginSuccess) {
            yield (0, handleSuccessfulLogin_1.handleSuccessfulLogin)(user, res, passwordorrandomPassword);
        }
    }
    catch (error) {
        // 7. Manejo de errores de servidor
        (0, handleServerError_1.handleServerErrorLogin)(error, res);
    }
});
exports.loginUser = loginUser;
