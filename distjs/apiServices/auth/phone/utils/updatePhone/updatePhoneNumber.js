"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoneNumber = void 0;
const authModel_1 = require("../../../register/models/authModel");
/**
 * Actualiza el número de teléfono del usuario en la base de datos.
 * @param {number} userId - ID del usuario.
 * @param {string} phoneNumber - Nuevo número de teléfono a asociar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación se completa.
 * @throws {Error} - Lanza un error si la actualización falla.
 */
const updatePhoneNumber = async (userId, phoneNumber) => {
    try {
        await authModel_1.AuthModel.update({ phoneNumber }, // Campo a actualizar
        { where: { id: userId } } // Condición para seleccionar el registro correcto
        );
    }
    catch (error) {
        throw new Error(`Error al guardar el número de teléfono`);
    }
};
exports.updatePhoneNumber = updatePhoneNumber;
