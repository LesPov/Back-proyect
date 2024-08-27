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
 * Crea un nuevo usuario en la base de datos.
 *
 * Esta función utiliza el modelo `AuthModel` para crear un nuevo registro de usuario en la base de datos
 * con los datos proporcionados. Si ocurre un error durante el proceso de creación, se captura y se
 * propaga un mensaje de error específico.
 *
 * @param {string} username - Nombre de usuario del nuevo usuario. Debe ser único en la base de datos.
 * @param {string} hashedPassword - Contraseña cifrada del nuevo usuario. Esta contraseña ya debe  haber sido cifrada usando un algoritmo seguro como bcrypt.
 * @param {string} email - Correo electrónico del nuevo usuario. Debe ser único en la base de datos.
 * @param {string} rol - Rol del nuevo usuario. Define el tipo de usuario (por ejemplo, 'admin', 'user').
 * @returns {Promise<any>} - Devuelve una promesa que se resuelve con el nuevo usuario creado. Si ocurre un error durante la creación, se lanza un error.
 * @throws {Error} - Lanza un error con un mensaje específico si ocurre un problema al crear el usuario.
 */
const createNewUser = (username, hashedPassword, email, rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crea un nuevo usuario en la base de datos utilizando AuthModel
        return yield authModel_1.AuthModel.create({
            username: username,
            password: hashedPassword,
            email: email,
            rol: rol,
        });
    }
    catch (error) {
        // Registra el error en la consola para depuración
        console.error("Error en createNewUser:", error);
        // Lanza un error específico para que la función llamadora lo maneje
        throw errorMessages_1.errorMessages.databaseError;
    }
});
exports.createNewUser = createNewUser;
