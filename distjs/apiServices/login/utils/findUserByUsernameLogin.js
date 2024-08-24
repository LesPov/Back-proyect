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
exports.findUserByUsernameLogin = void 0;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Buscar un usuario por nombre de usuari o email  incluyendo su información de verificación y rol.
 * @param usuario Nombre de usuario.
 * @param res Objeto de respuesta HTTP.
 * @returns Usuario encontrado.
 */
const findUserByUsernameLogin = (usernameOrEmail, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    if (EMAIL_REGEX.test(usernameOrEmail)) {
        user = yield Usuario.findOne({
            where: { email: usernameOrEmail },
            include: [Verificacion, Rol],
        });
    }
    else {
        user = yield Usuario.findOne({
            where: { usuario: usernameOrEmail },
            include: [Verificacion, Rol],
        });
    }
    if (!user) {
        res.status(400).json({ msg: errorMessages.userNotExists(usernameOrEmail) });
        throw new Error("Usuario no encontrado");
    }
    return user;
});
exports.findUserByUsernameLogin = findUserByUsernameLogin;
