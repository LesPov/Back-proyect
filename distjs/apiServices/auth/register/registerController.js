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
exports.newUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkExistingUserOrEmail_1 = require("./utils/check/checkExistingUserOrEmail");
const handleEmailValidationErrors_1 = require("./utils/errors/handleEmailValidationErrors");
const handleExistingUserError_1 = require("./utils/errors/handleExistingUserError");
const handleInputValidationErrors_1 = require("./utils/errors/handleInputValidationErrors");
const handlePasswordValidationErrors_1 = require("./utils/errors/handlePasswordValidationErrors");
const handleServerError_1 = require("./utils/errors/handleServerError");
const registerValidations_1 = require("./utils/validations/registerValidations");
const createNewUser_1 = require("./utils/userCreation/createNewUser");
const initializeUserProfile_1 = require("./utils/userCreation/initializeUserProfile ");
/**
 * Controlador para registrar un nuevo usuario.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 */
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, contrasena, email, rol } = req.body;
        // Validar la entrada de datos (username, contraseña, email, rol)
        const inputValidationErrors = (0, registerValidations_1.validateInput)(username, contrasena, email, rol);
        // Manejar cualquier error de validación de la entrada de datos
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // Validar los requisitos de la contraseña
        const passwordValidationErrors = (0, registerValidations_1.validatePassword)(contrasena);
        // Manejar cualquier error de validación de la contraseña
        (0, handlePasswordValidationErrors_1.handlePasswordValidationErrors)(passwordValidationErrors, res);
        // Validar el formato del correo electrónico
        const emailErrors = (0, registerValidations_1.validateEmail)(email);
        // Manejar cualquier error de validación del correo electrónico
        (0, handleEmailValidationErrors_1.handleEmailValidationErrors)(emailErrors, res);
        // Verificar si el usuario o el correo electrónico ya existen
        const existingUserError = yield (0, checkExistingUserOrEmail_1.checkExistingUserOrEmail)(username, email);
        (0, handleExistingUserError_1.handleExistingUserError)(existingUserError, res);
        // Hash de la contraseña antes de guardarla en la base de datos 
        const hashedPassword = yield bcryptjs_1.default.hash(contrasena, 10);
        // Crear un nuevo usuario en la base de datos
        const newUser = yield (0, createNewUser_1.createNewUser)(username, hashedPassword, email, rol);
        // Inicializar el perfil de usuario
        yield (0, initializeUserProfile_1.initializeUserProfile)(newUser.id);
        // Generar y guardar el código de verificación
        // const verificationCode = await generateAndSaveVerificationCode(newUser.id, email);
    }
    catch (error) {
        // Manejar errores internos del servidor
        (0, handleServerError_1.handleServerError)(error, res);
    }
});
exports.newUser = newUser;
