import { VerificationModel } from "../../../register/models/VerificationModel";

/**
 * Marca el isPhoneVerified del usuario como verificado en la base de datos.
 * 
 * @param userId - El ID del usuario cuyo markisPhoneVerified se va a marcar como verificado.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
export const markisPhoneVerified = async (userId: number) => {
    try {
        // Actualiza el estado de verificación del markisPhoneVerified en la base de datos
        await VerificationModel.update(
            { isPhoneVerified: true }, // Campos a actualizar
            { where: { userId } } // Condición para seleccionar el registro correc to
        );
    } catch (error) {
        // Maneja cualquier error que ocurra durante la actualización
        throw new Error(`Error al marcar el teléfono como verificado`);
    }
};



/**
 * Marca el isVerified del usuario como verificado en la base de datos si ya están verificados isEmailVerified & isPhoneVerified.
 * 
 * @param userId - El ID del usuario cuyo estado de verificación se va a actualizar.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
export const markisVerified = async (userId: number) => {
    try {
        // Obtén el estado actual del usuario
        const verificationData = await VerificationModel.findOne({
            where: { userId },
            attributes: ['isEmailVerified', 'isPhoneVerified']
        });

        if (!verificationData) {
            throw new Error('Datos de verificación no encontrados');
        }

        // Verifica si ambos campos están marcados como verdaderos
        if (verificationData.isEmailVerified && verificationData.isPhoneVerified) {
            await VerificationModel.update(
                { isVerified: true }, // Campos a actualizar
                { where: { userId } } // Condición para seleccionar el registro correcto
            );
        } else {
            throw new Error('No se puede marcar como verificado, uno o ambos campos de verificación están incompletos');
        }
    } catch (error) {
        throw new Error(`Error al marcar la verificación completa`);
    }
};