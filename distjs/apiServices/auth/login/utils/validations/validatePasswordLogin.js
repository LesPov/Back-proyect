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
exports.validatePassword = exports.validateStoredPassword = exports.validateRandomPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
// Máximo de intentos de inicio de sesión permitidos
const MAX_LOGIN_ATTEMPTS = 5;
/**
 * Valida si la contraseña proporcionada es la contraseña aleatoria.
 *
 * @param user - El objeto usuario con los detalles del usuario.
 * @param randomPassword - La contraseña aleatoria proporcionada por el usuario.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña aleatoria es válida o no.
 */
const validateRandomPassword = (user, randomPassword, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isRandomPasswordValid = randomPassword === user.verification.randomPassword;
    if (!isRandomPasswordValid) {
        const errorMsg = errorMessages_1.errorMessages.invalidRandomPassword;
        res.status(401).json({
            msg: errorMsg,
            errors: 'Error: Contraseña aleatoria incorrecta. Por favor, inténtalo de nuevo.',
        });
        throw new Error("Invalid random password provided.");
    }
    return true; // Contraseña aleatoria válida
});
exports.validateRandomPassword = validateRandomPassword;
/**
 * Valida si la contraseña proporcionada coincide con la contraseña almacenada (hash).
 *
 * @param user - El objeto usuario con los detalles del usuario.
 * @param storedPassword - La contraseña proporcionada por el usuario.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña almacenada es válida o no.
 */
const validateStoredPassword = (user, storedPassword, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isStoredPasswordValid = yield bcryptjs_1.default.compare(storedPassword, user.password);
    if (!isStoredPasswordValid) {
        const errorMsg = errorMessages_1.errorMessages.incorrectPasswor1d;
        res.status(401).json({
            msg: errorMsg,
            errors: 'Error: Contraseña almacenada incorrecta. Por favor, inténtalo de nuevo.',
        });
        throw new Error("Invalid stored password provided.");
    }
    return true; // Contraseña almacenada válida
});
exports.validateStoredPassword = validateStoredPassword;
/**
 * Función principal para validar la contraseña del usuario.
 * Se delega a las funciones correspondientes según si la contraseña es aleatoria o almacenada.
 *
 * @param user - El objeto usuario con los detalles del usuario.
 * @param password - La contraseña proporcionada por el usuario.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña es válida o no.
 */
const validatePassword = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Si la longitud de la contraseña es de 8 caracteres, se trata de una contraseña aleatoria
    if (password.length === 8) {
        return (0, exports.validateRandomPassword)(user, password, res);
    }
    else {
        return yield (0, exports.validateStoredPassword)(user, password, res);
    }
});
exports.validatePassword = validatePassword;
