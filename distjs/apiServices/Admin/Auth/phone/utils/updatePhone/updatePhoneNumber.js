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
exports.updatePhoneNumber = void 0;
const authModel_1 = require("../../../../../../middleware/models/authModel");
/**
 * Actualiza el número de teléfono del usuario en la base de datos.
 * @param {number} userId - ID del usuario.
 * @param {string} phoneNumber - Nuevo número de teléfono a asociar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación se completa.
 * @throws {Error} - Lanza un error si la actualización falla.
 */
const updatePhoneNumber = (userId, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authModel_1.AuthModel.update({ phoneNumber }, // Campo a actualizar
        { where: { id: userId } } // Condición para seleccionar el registro correcto
        );
    }
    catch (error) {
        throw new Error(`Error al guardar el número de teléfono`);
    }
});
exports.updatePhoneNumber = updatePhoneNumber;
