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
/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
 *
 * Este controlador autentica al usuario verificando sus credenciales,
 * maneja los errores de servidor y envía una respuesta adecuada.
 *
 * @param req - La solicitud HTTP que contiene las credenciales del usuario (nombre de usuario y contraseña).
 * @param res - La respuesta HTTP que será enviada al cliente, con mensajes de éxito o error.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extraer los datos del cuerpo de la solicitud
        // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
        const { username, passwordorrandomPassword } = req.body;
        // 2. Validar la entrada de datos (username, passwordorrandomPassword)
        const inputValidationErrors = (0, loginvalidateInput_1.validateInputLogin)(username, passwordorrandomPassword);
        // Manejar cualquier error de validación de la entrada de datos
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        //3.
    }
    catch (error) {
        // 5. Manejo de errores de servidor
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerErrorLogin)(error, res);
    }
});
exports.loginUser = loginUser;
