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
exports.findUserByUsername = void 0;
const authModel_1 = require("../../../../../../middleware/models/authModel");
const VerificationModel_1 = require("../../../../../../middleware/models/VerificationModel");
/**
 * Busca un usuario en la base de datos basado en su nombre de usuario.
 *
 * @param username - El nombre de usuario del usuario a buscar.
 * @returns El usuario encontrado o `null` si no existe.
 */
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authModel_1.AuthModel.findOne({
        where: { username: username },
        include: [VerificationModel_1.VerificationModel]
    });
});
exports.findUserByUsername = findUserByUsername;
