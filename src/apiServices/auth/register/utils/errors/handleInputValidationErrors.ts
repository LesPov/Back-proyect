import { Response } from 'express';

/**
 * Maneja los errores de validación de la entrada de datos.
 * 
 * Esta función procesa una lista de errores de validación y envía una respuesta HTTP con 
 * un código de estado 400 (Bad Request) si se detectan errores. La respuesta incluye 
 * un mensaje detallado de los errores encontrados. La función también lanza una excepción 
 * para interrumpir la ejecución en caso de errores de validación.
 * 
 * @param {string[]} errors - Lista de errores de validación que indican problemas con 
 *                            la entrada de datos proporcionada.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado 
 *                          para enviar la respuesta de error al cliente.
 * 
 * @throws {Error} Lanza una excepción con el mensaje "Input validation failed" si se 
 *                 encuentran errores de validación, interrumpiendo la ejecución del 
 *                 código posterior.
 */
export const handleInputValidationErrors = (errors: string[], res: Response): void => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
        throw new Error("Input validation failed");
    }
};