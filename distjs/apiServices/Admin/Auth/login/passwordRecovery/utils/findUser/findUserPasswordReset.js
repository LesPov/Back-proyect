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
exports.handleUserNotFoundErrorPasswordReset = exports.findUseRrequestPassword = void 0;
const errorMessages_1 = require("../../../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../../../../../../middleware/models/authModel");
const VerificationModel_1 = require("../../../../../../../middleware/models/VerificationModel");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Busca al usuario en la base de datos según el nombre de usuario o correo electrónico.
 * @param {string} usernameOrEmail - Nombre de usuario o correo electrónico.
 * @returns {Promise<AuthModel | null>} - Usuario encontrado o nulo si no se encuentra.
 */
const findUseRrequestPassword = (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
    if (EMAIL_REGEX.test(usernameOrEmail)) {
        return yield authModel_1.AuthModel.findOne({ where: { email: usernameOrEmail }, include: [VerificationModel_1.VerificationModel] });
    }
    else {
        return yield authModel_1.AuthModel.findOne({ where: { username: usernameOrEmail }, include: [VerificationModel_1.VerificationModel] });
    }
});
exports.findUseRrequestPassword = findUseRrequestPassword;
/**
 * Maneja el error cuando un usuario no es encontrado en la base de datos.
 *
 * @param user - El objeto de usuario retornado por la consulta a la base de datos.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * @throws Lanza una excepción si el usuario no fue encontrado.
 */
const handleUserNotFoundErrorPasswordReset = (usernameOrEmail, user, res) => {
    if (!user) {
        const errorMsg = errorMessages_1.errorMessages.userNotFound(usernameOrEmail);
        res.status(404).json({
            msg: errorMsg,
            errors: 'Error: El usuario no fue encontrado en la base de datos.',
        });
        throw new Error("User not found validation failed");
    }
};
exports.handleUserNotFoundErrorPasswordReset = handleUserNotFoundErrorPasswordReset;
