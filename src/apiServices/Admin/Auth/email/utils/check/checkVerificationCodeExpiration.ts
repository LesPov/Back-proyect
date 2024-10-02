import { Response } from 'express';
import { errorMessages } from "../../../../../../middleware/erros/errorMessages";
/**
 * Verifica si el código de verificación ha expirado.
 * 
 * @param user - El objeto de usuario que contiene la fecha de expiración del código.
 * @param currentDate - La fecha actual para comparar con la fecha de expiración.
 * @returns Booleano que indica si el código ha expirado.
 */
export const checkVerificationCodeExpiration = (user: any, currentDate: Date): boolean => {
    // Verifica si la fecha de expiración del código es válida y ha expirado
    const expirationDate = user?.verification?.verificationCodeExpiration;
    return expirationDate ? new Date(expirationDate) < currentDate : false;
};


/**
 * Maneja el error cuando el código de verificación ha expirado.
 * 
 * @param isCodeExpire - Booleano que indica si el código ha expirado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
export const handleVerificationCodeExpirationError = (isCodeExpire: boolean, res: Response) => {
    if (isCodeExpire) {
        const errorMsg = errorMessages.verificationCodeExpired;
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El código de verificación ha expirado.',
        });
        throw new Error("Verification code has expired");
    }
};
