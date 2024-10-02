import { Response } from 'express';

/**
 * Maneja los errores de validación de la contraseña.
 * 
 * Esta función procesa una lista de errores relacionados con la validación de la contraseña 
 * y envía una respuesta HTTP con un código de estado 400 (Bad Request) si se detectan errores. 
 * La respuesta incluye un mensaje que describe los errores encontrados. La función también 
 * lanza una excepción para interrumpir la ejecución en caso de errores de validación de la contraseña.
 * 
 * @param {string[]} errors - Lista de errores de validación de la contraseña que indican 
 *                            problemas con la contraseña proporcionada.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado 
 *                          para enviar la respuesta de error al cliente.
 * 
 * @throws {Error} Lanza una excepción con el mensaje "Password validation failed" si se 
 *                 encuentran errores de validación de la contraseña, interrumpiendo la 
 *                 ejecución del código posterior.
 */
export const handlePasswordValidationErrors = (errors: string[], res: Response) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: 'Error en la validación de la contraseña',
        });
        throw new Error("Password validation failed");
    }
};
