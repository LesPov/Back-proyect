import { Response } from 'express';
/**
 * Maneja los errores de validación del correo electrónico.
 * @param errors Lista de errores de validación del correo electrónico.
 * @param res La respuesta HTTP saliente.
 */
export const handleEmailValidationErrors = (errors: string[], res: Response) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: 'Error en la validación del correo electrónico',
        });
        throw new Error("Email validation failed");
    }
};