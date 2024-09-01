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
exports.initializeUserProfile = void 0;
const userProfileModel_1 = require("../../../profile/models/userProfileModel");
/**
 * Inicializa el perfil de un usuario en la base de datos.
 *
 * Esta función crea una entrada en la tabla `UserProfileModel` para un usuario específico.
 * El perfil se inicializa con el ID del usuario y campos vacíos para el nombre y el apellido.
 * Este perfil puede ser actualizado más tarde con la información del usuario.
 *
 * @param {number} userId - ID del usuario para el cual se inicializará el perfil.
 *                           Este ID debe corresponder a un usuario ya existente en la base de datos.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el perfil del usuario ha sido creado exitosamente.
 *                            No devuelve un valor específico, solo indica la finalización del proceso.
 */
const initializeUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Crea una entrada en el perfil de usuario con el ID proporcionado
    yield userProfileModel_1.UserProfileModel.create({
        userId: userId,
        firstName: '', // Inicializa el campo de nombre con una cadena vacía
        lastName: '', // Inicializa el campo de apellido con una cadena vacía
    });
});
exports.initializeUserProfile = initializeUserProfile;
