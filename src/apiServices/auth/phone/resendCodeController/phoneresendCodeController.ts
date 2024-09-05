import { Request, Response } from 'express';
import { findUserByUsername } from '../utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from '../utils/errors/handleUserNotFoundError';
import { successMessages } from '../../../../middleware/success/successMessages';
import { sendWhatsAppMessage } from '../utils/send/sendWhatsAppMessage';
import { createOrUpdateVerificationEntry } from '../../email/resendCode/utils/errors/createOrUpdateVerificationEntry';
import { handleServerErrorResendCode } from './utils/errors/handleServerErrorResendCode';
import whatsappClient from '../../../chatbot/client';
import { validateInputVerifyCodeResend } from './utils/validations/validateInputVerifyCodeResend';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';

/**
 * Controlador para reenvío del código de verificación por SMS.
 * Este controlador se encarga de generar un nuevo código de verificación y reenviarlo al usuario a través de WhatsApp.
 * @param req - Objeto de solicitud HTTP proporcionado por Express, que contiene los datos del usuario.
 * @param res - Objeto de respuesta HTTP proporcionado por Express, que envía una respuesta al cliente.
 */
export const resendVerificationCodePhone = async (req: Request, res: Response) => {
    try {
        // 1. Validación de entrada
        // Extrae los datos necesarios del cuerpo de la solicitud (nombre de usuario y número de teléfono).
        const { username, phoneNumber } = req.body;
        // Valida los datos de entrada y obtiene cualquier error de validación.
        const inputValidationErrors = validateInputVerifyCodeResend(username, phoneNumber);
        // Maneja los errores de validación si los hay.
        handleInputValidationErrors(inputValidationErrors, res);


        // 2. Búsqueda del usuario en la base de datos
        // Busca al usuario en la base de datos utilizando el nombre de usuario proporcionado.
        const user = await findUserByUsername(username)
        // Si el usuario no existe en la base de datos, maneja el error y detiene el flujo.
        if (!user) {
            return handleUserNotFoundError(username, user, res);
        }


        // 3. Generación de nuevo código de verificación
        // Crea o actualiza la entrada de verificación con un nuevo código para el usuario en la base de datos.
        const newVerificationCode = await createOrUpdateVerificationEntry(user.id);


        // 4. Envío del mensaje por WhatsApp
        // Crea un mensaje de verificación que será enviado al usuario por WhatsApp.
        const message = `Hola ${username}, tu nuevo código de verificación es ${newVerificationCode}. Por favor, úsalo para verificar tu número de teléfono antes de que se expire.`;
        console.log('El mensaje enviado fue:', message);
        // Envía el mensaje de verificación a través de WhatsApp utilizando el número de teléfono proporcionado.
        await sendWhatsAppMessage(phoneNumber, message);


        // 5. Respuesta exitosa al cliente
        // Si todo es exitoso, responde al cliente con un mensaje indicando que se ha reenviado el código.
        res.status(200).json({
            msg: successMessages.verificationCodeSent,
        });

    } catch (error) {
        // Manejo de errores generales del servidor
        // Si ocurre un error inesperado, responde con un mensaje de error y detiene el flujo.
        handleServerErrorResendCode(error, res);
    }
};
