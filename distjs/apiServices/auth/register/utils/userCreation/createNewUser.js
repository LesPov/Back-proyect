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
exports.createNewUser = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../models/authModel");
/**
 * Crear un nuevo usuario en la base de datos.
 * @param username - Nombre de usuario del nuevo usuario.
 * @param hashedPassword - Contraseña cifrada del nuevo usuario.
 * @param email - Correo electrónico del nuevo usuario.
 * @param rol - Rol del nuevo usuario.
 * @returns El nuevo usuario creado.
 */
const createNewUser = (username, hashedPassword, email, rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield authModel_1.AuthModel.create({
            username: username,
            password: hashedPassword,
            email: email,
            rol: rol,
        });
    }
    catch (error) {
        console.error("Error en createNewUser:", error);
        throw errorMessages_1.errorMessages.databaseError; // Propagar el error a la función llamadora
    }
});
exports.createNewUser = createNewUser;
