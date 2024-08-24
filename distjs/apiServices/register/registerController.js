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
/**
 * Controlador para registrar un nuevo usuario.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 */
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, contrasena, email, rol } = req.body;
        // Validar la entrada de datos
        const inputValidationErrors = (0, validateInput_1.validateInput)(username, contrasena, email, rol);
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
    }
    catch (error) {
        // Manejar errores internos del servidor
    }
});
exports.newUser = newUser;
