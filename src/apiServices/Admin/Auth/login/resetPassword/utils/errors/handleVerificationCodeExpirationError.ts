import { Response } from 'express';
import { errorMessages } from '../../../../../../../middleware/erros/errorMessages';
/**
 * Maneja el error cuando el código de verificación ha expirado.
 * 
 * @param isCodeExpire - Booleano que indica si el código ha expirado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 */
export const handleVerificationCodeExpirationErrorReset = (isCodeExpire: boolean, res: Response) => {
    if (isCodeExpire) {
        const errorMsg = errorMessages.expiredVerificationCode;
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: La contraseña aleatorea  ha expirado.',
        });
        throw new Error("Verification code has expired");
    }
};
