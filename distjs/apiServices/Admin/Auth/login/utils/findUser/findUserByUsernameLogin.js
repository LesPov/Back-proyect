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
exports.handleUserNotFoundErrorLogin = exports.findUserByUsernameLogin = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../../../../../middleware/models/authModel");
const VerificationModel_1 = require("../../../../../../middleware/models/VerificationModel");
/**
 * Busca un usuario en la base de datos basado en su nombre de usuario.
 *
 * @param username - El nombre de usuario del usuario a buscar.
 * @returns El usuario encontrado o `null` si no existe.
 */
const findUserByUsernameLogin = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authModel_1.AuthModel.findOne({
        where: { username: username },
        include: [VerificationModel_1.VerificationModel]
    });
});
exports.findUserByUsernameLogin = findUserByUsernameLogin;
/**
 * Maneja el error cuando un usuario no es encontrado en la base de datos.
 *
 * @param user - El objeto de usuario retornado por la consulta a la base de datos.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * @throws Lanza una excepción si el usuario no fue encontrado.
 */
const handleUserNotFoundErrorLogin = (username, user, res) => {
    if (!user) {
        const errorMsg = errorMessages_1.errorMessages.userNotFound(username);
        res.status(404).json({
            msg: errorMsg,
            errors: 'Error: El usuario no fue encontrado en la base de datos.',
        });
        throw new Error("User not found validation failed");
    }
};
exports.handleUserNotFoundErrorLogin = handleUserNotFoundErrorLogin;
