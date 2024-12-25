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
const handleRandomPasswordValidation_1 = require("./utils/validations/handleRandomPasswordValidation");
/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
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
        // 5. Determinar si se está usando una contraseña aleatoria
        const isRandomPassword = passwordorrandomPassword.length === 8;
        // 6. Si es una contraseña aleatoria, manejar la validación
        if (isRandomPassword) {
            const isValid = yield (0, handleRandomPasswordValidation_1.handleRandomPasswordValidation)(user, passwordorrandomPassword, res);
            if (!isValid)
                return; // Si no es válida, salirpos
        }
        // 7. Validar la contraseña y manejar los intentos de inicio de sesión
        const isPasswordValid = yield (0, validatePasswordLogin_1.validatePassword)(user, passwordorrandomPassword);
        const loginSuccess = yield (0, loginAttemptsService_1.handleLoginAttempts)(user.id, isPasswordValid, res);
        // 8. Si el inicio de sesión es exitoso
        if (loginSuccess) {
            yield (0, handleSuccessfulLogin_1.handleSuccessfulLogin)(user, res, passwordorrandomPassword);
        }
    }
    catch (error) {
        // 9. Manejo de errores de servidor
        (0, handleServerError_1.handleServerErrorLogin)(error, res);
        //
    }
});
exports.loginUser = loginUser;
