import { Response } from 'express';
import { errorMessages } from '../../../../middleware/erros/errorMessages';

const VERIFICATION_CODE_EXPIRATION_HOURS = 24;
const VERIFICATION_CODE_EXPIRATION_MINUTES = 1;
/** 
 * Maneja errores internos del servidor.
 * @param error El error ocurrido.
 * @param res La respuesta HTTP saliente.
 */
export const handleServerError = (error: any, res: Response) => {
    console.error("Error en el controlador newUser:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages.databaseError,
            error,
        });
    }
};