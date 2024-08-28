import { Response } from 'express';
import { errorMessages } from '../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el código de verificación proporcionado es válido.
 * 
 * @param user - El objeto de usuario que contiene el código de verificación almacenado.
 * @param verificationCode - El código de verificación proporcionado en la solicitud.
 * @returns Booleano que indica si el código es válido.
 */
export const checkVerificationCodeIsValid = (user: any, verificationCode: string): boolean => {
    return user.verification.verificationCode === verificationCode.trim();
};

/**
 * Maneja el error cuando el código de verificación proporcionado es inválido.
 * 
 * @param isCodeValid - Booleano que indica si el código es válido.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
export const handleVerificationCodeIsValidError = (isCodeValid: boolean, res: Response) => {
    if (!isCodeValid) {
        const errorMsg = errorMessages.invalidVerificationCode();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El código de verificación proporcionado es inválido o no coincide con el de la base de datos.',
        });
        throw new Error("Code is already invalid");
    }
};
