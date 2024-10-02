import { VerificationModel } from "../../../../../../middleware/models/VerificationModel";

/**
 * Recupera el código de verificación para un usuario específico.
 * 
 * @param {number} userId - El ID del usuario para el cual se recuperará el código de verificación.
 * @returns {Promise<string | null>} - El código de verificación recuperado, o null si no se encuentra.
 */
export const getVerificationCode = async (userId: number): Promise<string | null> => {
    const verificationEntry = await VerificationModel.findOne({
        where: { userId: userId, isVerified: false },
        order: [['createdAt', 'DESC']] // Ordenar por fecha de creación para obtener el más reciente
    });

    if (verificationEntry) {
        return verificationEntry.verificationCode;
    } else {
        return null;
    }
};
