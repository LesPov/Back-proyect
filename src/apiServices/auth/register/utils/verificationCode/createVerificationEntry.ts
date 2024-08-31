import { VerificationModel } from "../../models/VerificationModel";
import { generateRandomVerificationCode } from "./generateRandomVerificationCode ";

const VERIFICATION_CODE_EXPIRATION_HOURS = 3;

/**
 * Genera y guarda un código de verificación para un usuario específico.
 * 
 * Esta función crea un código de verificación aleatorio, establece su fecha de expiración 
 * y guarda esta información en el modelo de verificación para el usuario proporcionado.
 * 
 * @param {number} userId - El ID del usuario para el cual se generará el código de verificación.
 * @param {string} email - La dirección de correo electrónico del usuario. Este parámetro se proporciona 
 *        para el contexto del usuario, aunque en esta función no se utiliza directamente. 
 * @returns {string} - El código de verificación generado que se ha almacenado en la base de datos.
 */
const VERIFICATION_CODE_EXPIRATION_MINUTES = 3; // Cambio a minutos para la validación correcta

export const  createVerificationEntry = async (userId: number, email: string): Promise<string> => {
    // Genera un código de verificación aleatorio
    const verificationCode = generateRandomVerificationCode();

    // Establece la fecha de expiración del código de verificación
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + VERIFICATION_CODE_EXPIRATION_MINUTES);
    
  
    // Crea una entrada en la base de datos para el código de verificación
    await VerificationModel.create({
        isVerified: false, // Inicialmente, el código no está verificado
        verificationCode: verificationCode, // Código de verificación generado
        verificationCodeExpiration: expirationDate, // Fecha y hora en que expira el código
        userId: userId, // ID del usuario al que pertenece el código
    });
  
    // Devuelve el código de verificación generado
    return verificationCode;
};
 