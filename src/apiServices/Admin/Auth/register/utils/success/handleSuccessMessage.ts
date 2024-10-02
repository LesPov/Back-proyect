import { Response } from 'express';
import { successMessages } from '../../../../../../middleware/success/successMessages';

/**
 * Maneja el envío de un mensaje de éxito al cliente.
 * 
 * Esta función toma un mensaje de éxito generado durante la ejecución del controlador
 * y lo envía como respuesta HTTP con un código de estado 200 (OK). Se puede personalizar 
 * el mensaje de éxito para incluir detalles específicos del usuario o de la operación 
 * realizada.
 * 
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado 
 *                          para enviar la respuesta de éxito al cliente.
 * @param {string} username - El nombre de usuario recién registrado, utilizado para 
 *                            personalizar el mensaje de éxito.
 * @param {string} userMessage - Un mensaje específico basado en el rol del usuario, 
 *                               que se incluirá en la respuesta.
 */
export const handleSuccessMessage = (res: Response, username: string, userMessage: string) => {
    res.status(200).json({
        msg: successMessages.userRegistered(username, userMessage),
    });
};
