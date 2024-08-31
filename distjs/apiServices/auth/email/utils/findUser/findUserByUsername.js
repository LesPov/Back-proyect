"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = void 0;
const authModel_1 = require("../../../register/models/authModel");
const VerificationModel_1 = require("../../../register/models/VerificationModel");
/**
 * Busca un usuario en la base de datos basado en su nombre de usuario.
 *
 * @param username - El nombre de usuario del usuario a buscar.
 * @returns El usuario encontrado o `null` si no existe.
 */
const findUserByUsername = async (username) => {
    return await authModel_1.AuthModel.findOne({
        where: { username: username },
        include: [VerificationModel_1.VerificationModel]
    });
};
exports.findUserByUsername = findUserByUsername;
