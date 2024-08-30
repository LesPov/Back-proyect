import { Response } from 'express';
import { errorMessages } from "../../../../../middleware/erros/errorMessages";

/**
 * Maneja el error cuando un usuario no es encontrado en la base de datos.
 * 
 * @param user - El objeto de usuario retornado por la consulta a la base de datos.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * 
 * @throws Lanza una excepción si el usuario no fue encontrado.
 */
export const handleUserNotFoundError = (username: string, user: any, res: Response) => {
    if (!user) {
        const errorMsg = errorMessages.userNotFound(username);
        res.status(404).json({
            msg: errorMsg,
            errors: 'Error: El usuario no fue encontrado en la base de datos.',
        });
        throw new Error("Controller Phone failed");
    }
};
