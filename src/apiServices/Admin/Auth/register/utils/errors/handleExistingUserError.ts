import { Response } from 'express';

/**
 * Maneja los errores relacionados con la existencia de un usuario o correo electrónico.
 * 
 * Esta función procesa el mensaje de error que indica si el usuario o correo electrónico 
 * ya existe en el sistema. Si se proporciona un mensaje de error, la función envía una 
 * respuesta HTTP con el código de estado 400 (Bad Request) y un mensaje detallado de error. 
 * La función también lanza una excepción para interrumpir la ejecución en caso de error.
 * 
 * @param {string | null} error - Mensaje de error que indica si el usuario o correo electrónico 
 *                                ya existe. Si no hay error, se pasa null.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado 
 *                          para enviar la respuesta de error al cliente.
 * 
 * @throws {Error} Lanza una excepción si se encuentra un mensaje de error, interrumpiendo 
 *                 la ejecución del código posterior.
 */
export const handleExistingUserError = (error: string | null, res: Response) => {
    if (error) {
        res.status(400).json({
            msg: error,
            errors: 'Error usuario o correo ya existe.',
        });
        throw new Error("Register ExistingUser validation failed");
    }
};
