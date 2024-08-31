import { AuthModel } from "../../../register/models/authModel";

/**
 * Actualiza el número de teléfono del usuario en la base de datos.
 * @param {number} userId - ID del usuario.
 * @param {string} phoneNumber - Nuevo número de teléfono a asociar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación se completa.
 * @throws {Error} - Lanza un error si la actualización falla.
 */
export const updatePhoneNumber = async (userId: number, phoneNumber: string): Promise<void> => {
    try {
        await AuthModel.update(
            { phoneNumber },  // Campo a actualizar
            { where: { id: userId } }  // Condición para seleccionar el registro correcto
        );
    } catch (error) {
        throw new Error(`Error al guardar el número de teléfono`);
    }
};
