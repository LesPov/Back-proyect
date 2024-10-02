import { VerificationModel } from "../../../../../../../middleware/models/VerificationModel";

/**
 * Genera una contraseña aleatoria, la almacena en el modelo de verificación y establece un tiempo de expiración.
 * @param {number} verificationId - ID de la entrada de verificación a actualizar.
 * @returns {Promise<string>} - La nueva contraseña generada.
 */
export const generateAndSetRandomPassword = async (verificationId: number): Promise<string> => {
    // Genera una contraseña aleatoria de 8 dígitos
    const randomPassword = generateRandomPassword(8); 

    // Calcula el tiempo de expiración (5 minutos a partir de ahora)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    // Actualiza la entrada de verificación con la nueva contraseña y su tiempo de expiración
    await VerificationModel.update(
        {
            randomPassword: randomPassword,
            verificationCodeExpiration: expirationTime
        },
        { where: { userId: verificationId } } // Usa 'userId' en lugar de 'id' si es la clave foránea
    );

  
    // Retorna la nueva contraseña
    return randomPassword;
};

/**
 * Genera una contraseña aleatoria.
 * @param {number} length - Longitud de la contraseña generada.
 * @returns {string} - Contraseña aleatoria.
 */
export const generateRandomPassword = (length: number): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPassword = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPassword += characters.charAt(randomIndex);
    }

    return randomPassword;
};
