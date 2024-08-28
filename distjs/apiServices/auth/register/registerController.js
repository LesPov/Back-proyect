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
const sendEmailVerificationCode_1 = require("./utils/email/sendEmailVerificationCode");
const getRoleMessage_1 = require("./utils/rols/getRoleMessage");
const initializeUserProfile_1 = require("./utils/userCreation/initializeUserProfile ");
const createVerificationEntry_1 = require("./utils/verificationCode/createVerificationEntry ");
const handleSuccessMessage_1 = require("./utils/success/handleSuccessMessage");
/**
 * Controlador para registrar un nuevo usuario en el sistema.
 *
 * Esta función maneja la creación de un nuevo usuario, incluyendo validaciones
 * de los datos de entrada, verificación de existencia previa de usuario/correo,
 * encriptación de la contraseña, creación de perfil de usuario, y envío de correo
 * electrónico de verificación. En caso de éxito, se responde con un mensaje de éxito
 * adecuado según el rol del usuario.
 *
 * @param req - La solicitud HTTP entrante que contiene los datos del usuario a registrar.
 * @param res - La respuesta HTTP que se envía de vuelta al cliente.
 */
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, password, email, rol } = req.body;
        // Validar la entrada de datos (username, contraseña, email, rol)
        const inputValidationErrors = (0, registerValidations_1.validateInput)(username, password, email, rol);
        // Manejar cualquier error de validación de la entrada de datos
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // Validar los requisitos de la contraseña
        const passwordValidationErrors = (0, registerValidations_1.validatePassword)(password);
        // Manejar cualquier error de validación de la contraseña
        (0, handlePasswordValidationErrors_1.handlePasswordValidationErrors)(passwordValidationErrors, res);
        // Validar el formato del correo electrónico
        const emailErrors = (0, registerValidations_1.validateEmail)(email);
        // Manejar cualquier error de validación del correo electrónico
        (0, handleEmailValidationErrors_1.handleEmailValidationErrors)(emailErrors, res);
        // Verificar si el usuario o el correo electrónico ya existen en la base de datos
        const existingUserError = yield (0, checkExistingUserOrEmail_1.checkExistingUserOrEmail)(username, email);
        (0, handleExistingUserError_1.handleExistingUserError)(existingUserError, res);
        // Si todo es válido, proceder a encriptar la contraseña antes de guardarla
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Crear un nuevo usuario en la base de datos con la información proporcionada
        const newUser = yield (0, createNewUser_1.createNewUser)(username, hashedPassword, email, rol);
        // Inicializar el perfil de usuario en la base de datos, asignando un ID único
        yield (0, initializeUserProfile_1.initializeUserProfile)(newUser.id);
        // Generar y guardar un código de verificación para el correo electrónico del usuario
        const verificationCode = yield (0, createVerificationEntry_1.createVerificationEntry)(newUser.id, email);
        // Enviar un correo electrónico de verificación al nuevo usuario con el código generado
        yield (0, sendEmailVerificationCode_1.sendVerificationEmail)(email, username, verificationCode);
        // Obtener un mensaje de bienvenida basado en el rol del usuario
        const userMessage = (0, getRoleMessage_1.getRoleMessage)(rol);
        // Manejar y enviar el mensaje de éxito al cliente
        (0, handleSuccessMessage_1.handleSuccessMessage)(res, username, userMessage);
    }
    catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerError)(error, res);
    }
});
exports.newUser = newUser;
