import { VerificationModel } from "../../../../../../middleware/models/VerificationModel";
import { generateRandomVerificationCode } from "../../../register/utils/verificationCode/generateRandomVerificationCode ";



const VERIFICATION_CODE_EXPIRATION_MINUTES = 10; // Tiempo de expiración en minutos

/**
 * Genera y guarda un código de verificación para un usuario específico.
 * 
 * Esta función crea un código de verificación aleatorio, establece su fecha de expiración
 * y guarda esta información en el modelo de verificación para el usuario proporcionado.
 * 
 * @param {number} userId - El ID del usuario para el cual se generará el código de verificación.
 * @param {string} phoneNumber - El número de teléfono del usuario. Este parámetro se proporciona
 *        para el contexto del usuario, aunque en esta función no se utiliza directamente.
 * @returns {Promise<string>} - El código de verificación generado que se ha almacenado en la base de datos.
 */
export const createVerificationEntryPhone = async (userId: number, phoneNumber: string): Promise<string> => {
    // Genera un código de verificación aleatorio
    const verificationCode = generateRandomVerificationCode();

    // Establece la fecha de expiración del código de verificación
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + VERIFICATION_CODE_EXPIRATION_MINUTES);

    // Crea o actualiza una entrada en la base de datos para el código de verificación
    await VerificationModel.upsert({
        userId: userId, // ID del usuario al que pertenece el código
        verificationCode: verificationCode, // Código de verificación generado
        verificationCodeExpiration: expirationDate, // Fecha y hora en que expira el código
        isVerified: false, // Inicialmente, el código no está verificado
        // Otras propiedades como isEmailVerified, loginAttempts, etc. se pueden ajustar según sea necesario
    });

    // Devuelve el código de verificación generado
    return verificationCode;
};