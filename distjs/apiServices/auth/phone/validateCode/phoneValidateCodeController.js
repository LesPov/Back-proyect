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
exports.verifyPhoneNumber = void 0;
const handleInputValidationErrors_1 = require("../../register/utils/errors/handleInputValidationErrors");
const validateInput_1 = require("./utils/validations/validateInput");
const handleServerError_1 = require("./utils/errors/handleServerError");
const findUserByUsername_1 = require("../utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("../utils/errors/handleUserNotFoundError");
const checkUserVerificationStatus_1 = require("../utils/check/checkUserVerificationStatus");
const checkUserVerificationStatusPhone_1 = require("./utils/check/checkUserVerificationStatusPhone");
/**
 * Verifica el número de teléfono del usuario en función del código de verificación.
 * @param req - Objeto de solicitud HTTP proporcionado por Express.
 * @param res - Objeto de respuesta HTTP proporcionado por Express.
 */
const verifyPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validación de entrada
        // Extrae los parámetros necesarios del cuerpo de la solicitud.
        const { username, phoneNumber, verificationCode } = req.body;
        // Valida los datos de entrada y obtiene cualquier error de validación.
        const inputValidationErrors = (0, validateInput_1.validateInputVerifyCode)(username, phoneNumber, verificationCode);
        // Maneja los errores de validación si los hay.
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario si existe
        // Busca al usuario en la base de datos por su nombre de usuario.
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        // Maneja el caso en el que el usuario no se encuentra en la base de datos.
        (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        // 3. Verificación del estado del usuario Email
        // Verifica si el correo electrónico del usuario ha sido verificado.
        const isEmailVerified = (0, checkUserVerificationStatus_1.checkUserVerificationStatusEmail)(user);
        // Maneja el caso en el que el correo electrónico no está verificado.
        (0, checkUserVerificationStatus_1.handleEmailNotVerificationErroruser)(isEmailVerified, res);
        // 4. Verificación del estado del usuario Phone
        // Verifica si el número de teléfono del usuario ya está verificado.
        const isPhoneNumberVerified = (0, checkUserVerificationStatusPhone_1.checkUserVerificationStatusPhone)(user);
        // Maneja el caso en el que el número de teléfono ya está verificado.
        (0, checkUserVerificationStatusPhone_1.handlePhoneNotVerificationErroruser)(isPhoneNumberVerified, res);
    }
    catch (error) {
        // Maneja errores generales del servidor y responde con un mensaje de error.
        (0, handleServerError_1.handleServerErrorVerifyCode)(error, res);
    }
});
exports.verifyPhoneNumber = verifyPhoneNumber;
