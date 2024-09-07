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
exports.validatePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
/**
 * Valida si la contraseña proporcionada es una contraseña aleatoria o
 * una contraseña almacenada en la base de datos.
 *
 * @param user - El objeto usuario con los detalles del usuario.
 * @param password - La contraseña proporcionada por el usuario (aleatoria o almacenada).
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña es válida o no.
 */
const validatePassword = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (password.length === 8) {
        // Contraseña aleatoria
        const isRandomPasswordValid = password === user.verification.randomPassword;
        // Manejar el error si la contraseña aleatoria no es válida
        if (!isRandomPasswordValid) {
            const errorMsg = errorMessages_1.errorMessages.invalidRandomPassword();
            res.status(401).json({
                msg: errorMsg,
                errors: 'Error: Contraseña aleatoria incorrecta. Por favor, inténtalo de nuevo.',
            });
            throw new Error("Invalid random password provided.");
        }
        return true; // Si la contraseña aleatoria es válida
    }
    else {
        // Contraseña almacenada (hash)
        const isStoredPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        // Manejar el error si la contraseña almacenada no es válida
        if (!isStoredPasswordValid) {
            const errorMsg = errorMessages_1.errorMessages.incorrectPasswor1d();
            res.status(401).json({
                msg: errorMsg,
                errors: 'Error: Contraseña almacenada incorrecta. Por favor, inténtalo de nuevo.',
            });
            throw new Error("Invalid stored password provided.");
        }
        return true; // Si la contraseña almacenada es válida
    }
});
exports.validatePassword = validatePassword;
