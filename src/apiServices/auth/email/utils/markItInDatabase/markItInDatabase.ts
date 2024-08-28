import { VerificationModel } from "../../../register/models/VerificationModel";

/**
 * Marca el correo electrónico del usuario como verificado en la base de datos.
 * 
 * @param userId - El ID del usuario cuyo correo electrónico se va a marcar como verificado.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
export const markEmailAsVerified = async (userId: number) => {
    try {
        // Actualiza el estado de verificación del correo electrónico en la base de datos
        await VerificationModel.update(
            { isEmailVerified: true }, // Campos a actualizar
            { where: { userId } } // Condición para seleccionar el registro correc to
        );
    } catch (error) {
        // Maneja cualquier error que ocurra durante la actualización
        throw new Error(`Error al marcar el correo electrónico como verificado`);
    }
};
