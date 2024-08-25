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
exports.checkExistingUserOrEmail = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../models/authModel");
/**
 * Verifica si un valor dado (username o email) ya existe en la base de datos.
 * @param field Nombre del campo a buscar (por ejemplo, 'username' o 'email').
 * @param value Valor del campo a buscar.
 * @returns True si el valor ya existe en la base de datos, de lo contrario, false.
 */
const findExistingField = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRecord = yield authModel_1.AuthModel.findOne({ where: { [field]: value } });
        return Boolean(existingRecord);
    }
    catch (error) {
        console.error(`Error en findExistingField con ${field}:`, error);
        throw errorMessages_1.errorMessages.databaseError;
    }
});
/**
 * Verifica si un username ya existe y devuelve un mensaje de error si es así.
 * @param username Nombre de username a verificar.
 * @returns Mensaje de error si el nombre de username ya existe, de lo contrario, null.
 */
const checkExistingUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield findExistingField('username', username))
        ? errorMessages_1.errorMessages.userExists(username)
        : null;
});
/**
 * Verifica si un correo electrónico ya existe y devuelve un mensaje de error si es así.
 * @param email Dirección de correo electrónico a verificar.
 * @returns Mensaje de error si la dirección de correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield findExistingField('email', email))
        ? errorMessages_1.errorMessages.userEmailExists(email)
        : null;
});
/**
 * Verifica si un username o correo electrónico ya existe.
 * @param username Nombre de username.
 * @param email Dirección de correo electrónico.
 * @returns Mensaje de error si el username o correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingUserOrEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameError = yield checkExistingUsername(username);
    const emailError = yield checkExistingEmail(email);
    if (usernameError && emailError) {
        return `${usernameError}. ${emailError}`;
    }
    return usernameError || emailError || null;
});
exports.checkExistingUserOrEmail = checkExistingUserOrEmail;
