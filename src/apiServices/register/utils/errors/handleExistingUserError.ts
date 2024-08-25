import { Response } from 'express';
/** 
 * Maneja los errores relacionados con la existencia de un usuario.
 * @param error Mensaje de error si el usuario ya existe, de lo contrario, null.
 * @param res La respuesta HTTP saliente.
 */
export const handleExistingUserError = (error: string | null, res: Response) => {
    if (error) {
        res.status(400).json({
            msg: error,
            errors: 'Error usuario o correo ya existe.',
        });
        throw new Error("Password validation failed");
    }
};
