import { VerificationModel } from "../../models/VerificationModel";
import { generateRandomVerificationCode } from "./generateRandomVerificationCode ";

const VERIFICATION_CODE_EXPIRATION_HOURS = 24;


/**
 * Generar y guardar un código de verificación para un usuario.
 * @param userId - ID del usuario para el cual se generará el código.
 * @param email - Correo electrónico del usuario.
 * @returns El código de verificación generado.
 */
export const createVerificationEntry = async (userId: number, email: string) => {
    const verificationCode = generateRandomVerificationCode();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + VERIFICATION_CODE_EXPIRATION_HOURS);
  
    await VerificationModel.create({
      isVerified: false,
      verificationCode: verificationCode,
      verificationCodeExpiration: expirationDate,
      userId: userId,
    });
  
    return verificationCode;
  };  