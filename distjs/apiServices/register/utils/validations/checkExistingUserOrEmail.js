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
exports.handleExistingUserError = exports.checkExistingUsername = exports.checkExistingUserOrEmail = void 0;
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
const userModel_1 = __importDefault(require("../../../../models/userModel"));
/**
 * Verifica si un username o correo electrónico ya existe.
 * @param username Nombre de username.
 * @param email Dirección de correo electrónico.
 * @returns Mensaje de error si el username o correo electrónico ya existe, de lo contrario, null.
 */ const checkExistingUserOrEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameError = yield (0, exports.checkExistingUsername)(username);
    const emailError = yield checkExistingEmail(email);
    if (usernameError && emailError) {
        // Ambos existen, puedes combinar los mensajes de error o manejarlos de acuerdo a tus necesidades
        return `${usernameError}. ${emailError}`;
    }
    return usernameError || emailError || null;
});
exports.checkExistingUserOrEmail = checkExistingUserOrEmail;
/**
 * Verifica si un nombre de username ya existe.
 * @param username Nombre de username a verificar.
 * @returns Mensaje de error si el nombre de username ya existe, de lo contrario, null.
 */
const checkExistingUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield findExistingUsername(username))
        ? errorMessages_1.errorMessages.userExists(username)
        : null;
});
exports.checkExistingUsername = checkExistingUsername;
/**
 * Verifica si una dirección de correo electrónico ya existe.
 * @param email Dirección de correo electrónico a verificar.
 * @returns Mensaje de error si la dirección de correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield findExistingEmail(email))
        ? errorMessages_1.errorMessages.userEmailExists(email)
        : null;
});
/**
 * Busca si un nombre de username ya existe en la base de datos.
 * @param username Nombre de username a buscar.
 * @returns True si el nombre de username existe, de lo contrario, false.
 */
const findExistingUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingusername = yield userModel_1.default.findOne({ where: { username } });
        return Boolean(existingusername);
    }
    catch (error) {
        console.error("Error en findExistingUsername:", error);
        throw errorMessages_1.errorMessages.databaseError;
    }
});
/**
 * Busca si una dirección de correo electrónico ya existe en la base de datos.
 * @param email Dirección de correo electrónico a buscar.
 * @returns True si la dirección de correo electrónico existe, de lo contrario, false.
 */
const findExistingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEmail = yield userModel_1.default.findOne({ where: { email } });
        return Boolean(existingEmail);
    }
    catch (error) {
        console.error("Error en findExistingEmail:", error);
        throw errorMessages_1.errorMessages.databaseError;
    }
});
/**
 * Maneja los errores relacionados con la existencia de un usuario.
 * @param error Mensaje de error si el usuario ya existe, de lo contrario, null.
 * @param res La respuesta HTTP saliente.
 */
const handleExistingUserError = (error, res) => {
    if (error) {
        res.status(400).json({
            msg: error,
            errors: 'Error usuario o correo ya existe.',
        });
        throw new Error("Password validation failed");
    }
};
exports.handleExistingUserError = handleExistingUserError;
