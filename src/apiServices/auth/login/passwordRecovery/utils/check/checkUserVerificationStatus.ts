import { Response } from 'express';
import { errorMessages } from '../../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el usuario ha completado la verificación (`isVerified`).
 * 
 * @param user - El objeto usuario que contiene la información de verificación.
 * @returns {boolean} - Retorna `true` si el usuario está verificado (`isVerified`), de lo contrario, retorna `false`.
 */
export const checkisUserVerified = (user: any): boolean => {
    // Verifica el estado del campo `isVerified` en el objeto `verification` del usuario.
    return user?.verification?.isVerified || false;
};

/**
 * Maneja el error cuando el usuario no ha completado la verificación (`isVerified`).
 * 
 * @param isVerified - Booleano que indica si el usuario ha sido verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express para enviar la respuesta.
 * 
 * @throws Lanza una excepción y envía una respuesta HTTP 400 si el usuario no está verificado (`isVerified`).
 */
export const handleUnverifiedUserError = (isVerified: boolean, res: Response): void => {
    // Si el usuario no está verificado (`isVerified`)
    if (!isVerified) {
        // Obtiene el mensaje de error desde el archivo de mensajes de error
        const errorMsg = errorMessages.unverifiedAccount();

        // Envía una respuesta con el código de estado 400 y el mensaje de error
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El usuario no ha completado la verificación. Por favor, verifica tu cuenta antes de continuar.',
        });

        // Lanza un error para detener el flujo del proceso
        throw new Error("User is not verified.");
    }
};
