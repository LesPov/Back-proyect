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
exports.newUser = void 0;
const validateInput_1 = require("./utils/validateInput");
const handleInputValidationErrors_1 = require("./utils/handleInputValidationErrors");
const validations_1 = require("./utils/validations");
const handleServerError_1 = require("./utils/handleServerError");
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
        const inputValidationErrors = (0, validateInput_1.validateInput)(username, contrasena, email, rol);
        // Manejar cualquier error de validación de la entrada de datos
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // Validar los requisitos de la contraseña
        const passwordValidationErrors = (0, validations_1.validatePassword)(contrasena);
        // Manejar cualquier error de validación de la contraseña
        (0, validations_1.handlePasswordValidationErrors)(passwordValidationErrors, res);
        // Validar el formato del correo electrónico
        const emailErrors = (0, validations_1.validateEmail)(email);
        // Manejar cualquier error de validación del correo electrónico
        (0, validations_1.handleEmailValidationErrors)(emailErrors, res);
        // Aquí se puede añadir la lógica para guardar el usuario en la base de datos
    }
    catch (error) {
        // Manejar errores internos del servidor
        (0, handleServerError_1.handleServerError)(error, res);
    }
});
exports.newUser = newUser;
