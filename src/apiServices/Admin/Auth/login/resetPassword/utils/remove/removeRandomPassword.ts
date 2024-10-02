import { VerificationModel } from "../../../../../../../middleware/models/VerificationModel";

/**
 * Elimina el randomPassword de verificación de la base de datos.
 * 
 * @param userId - El ID del usuario cuyo randomPassword de verificación debe eliminarse.
 */
export const removerandomPassword = async (userId: number) => {
    try {
        await VerificationModel.update(
            { randomPassword: null }, // Establece el randomPassword de verificación como null
            { where: { userId } }
        );
    } catch (error) {
        console.error('Error al eliminar el randomPassword de verificación:', error);
        throw new Error('Error al eliminar el randomPassword de verificación');
    }
}; 