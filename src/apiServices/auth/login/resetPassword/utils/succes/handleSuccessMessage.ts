import { Response } from 'express';
import { successMessages } from '../../../../../../middleware/success/successMessages';

/**
 * Envía una respuesta de éxito al cliente cuando el correo de restablecimiento de contraseña se ha enviado correctamente.
 * 
 * @param {Response} res - Objeto de respuesta de Express.
 * 
 * La función envía una respuesta HTTP con el estado 200 (OK) y un mensaje de éxito indicando que se ha enviado un correo electrónico de restablecimiento de contraseña. El mensaje se obtiene desde la lista de mensajes de éxito (`successMessages`).
 */
export const handleSuccessMessageResetNewPassword = (res: Response) => {
    res.status(200).json({
        msg: successMessages.passwordUpdated(),
    });
};
