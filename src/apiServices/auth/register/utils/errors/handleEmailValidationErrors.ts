import { Response } from 'express';
/**
 * Maneja los errores de validación del correo electrónico y envía una respuesta de error.
 * 
 * Esta función se encarga de procesar una lista de errores relacionados con la validación 
 * del correo electrónico. Si se encuentran errores, se envía una respuesta HTTP con el 
 * código de estado 400 (Bad Request) y un mensaje de error detallado. La función también 
 * lanza una excepción para interrumpir el flujo de ejecución en caso de errores de validación.
 * 
 * @param {string[]} errors - Lista de errores de validación del correo electrónico que se 
 *                            deben manejar. Cada error se representa como una cadena de texto.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado 
 *                          para enviar la respuesta de error al cliente.
 * 
 * @throws {Error} Lanza una excepción si se encuentran errores de validación del correo 
 *                 electrónico, interrumpiendo la ejecución del código posterior.
 */
export const handleEmailValidationErrors = (errors: string[], res: Response) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: 'Error en la validación del correo electrónico',
        });
        throw new Error("Register Email validation failed");
    }
};