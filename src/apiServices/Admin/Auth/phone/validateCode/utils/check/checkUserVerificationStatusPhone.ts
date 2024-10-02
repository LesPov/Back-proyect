import { Response } from 'express';
import { errorMessages } from '../../../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el número de teléfono del usuario ya ha sido verificado.
 * @param user - El objeto usuario que contiene la información de verificación.
 * @returns `true` si el número de teléfono ya está verificado, `false` en caso contrario.
 */
export const checkUserVerificationStatusPhone = (user: any): boolean => {
    // Retorna `true` si el número de teléfono está verificado, `false` en caso contrario.
    return user?.verification?.isPhoneVerified || false;
};

/**
 * Maneja el error cuando el número de teléfono ya está verificado.
 * @param isPhoneVerified - Indicador de si el número de teléfono está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * 
 * Si el número de teléfono ya está verificado, responde con un error 400 y un mensaje adecuado.
 * Lanza una excepción para detener la ejecución del flujo en caso de que el número de teléfono ya esté verificado.
 */
export const handlePhoneNotVerificationErroruser = (isPhoneVerified: boolean, res: Response): void => {
    if (isPhoneVerified) {
        // Mensaje de error personalizado para el caso en que el número de teléfono ya está verificado.
        const errorMsg = errorMessages.phoneAlreadyVerified();

        // Responde con un estado 400 y un mensaje de error JSON.
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El número de teléfono ya ha sido verificado. No es necesario verificarlo de nuevo.',
        });

        // Lanza una excepción para detener la ejecución del flujo de verificación.
        throw new Error("User VerifyCodePhone.");
    }
};
