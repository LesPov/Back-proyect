import twilio from 'twilio';
import { Request, Response } from 'express';
import { validateInput } from './utils/validations/validateInput';
import { handleInputValidationErrors } from '../register/utils/errors/handleInputValidationErrors';
import { handleServerError } from './utils/errors/handleServerError';
import { findUserByUsername } from '../email/utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from './utils/errors/handleUserNotFoundError';
import { checkUserVerificationStatus, handleEmailNotVerificationErroruser } from './utils/check/checkUserVerificationStatus';
import { checkUserPhoneSendCode, handlePhoneVerificationError } from './utils/check/checkUserPhoneSendCode';
import { checkUserPhoneNumberAssociation, handlePhoneNumberAssociationError } from './utils/check/checkUserPhoneNumberAssociation';
import { createVerificationEntryPhone } from './utils/check/createVerificationEntryPhone';


/**
 * Controlador para enviar un código de verificación por mensaje de texto (SMS).
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Response} - Respuesta JSON con un mensaje indicando el estado de la operación.
 */
export const sendVerificationCodePhone = async (req: Request, res: Response) => {
    try {
        // 1. Validación de entrada
        const { username, phoneNumber } = req.body;
        const inputValidationErrors = validateInput(username, phoneNumber);
        handleInputValidationErrors(inputValidationErrors, res);

        // 2. Búsqueda del usuario
        const user = await findUserByUsername(username);
        handleUserNotFoundError(username, user, res);

        // 3. Verificación del estado del usuario
        const isEmailVerified = checkUserVerificationStatus(user);
        handleEmailNotVerificationErroruser(isEmailVerified, res);

        // 4. Verificación del número de teléfono
        const isPhoneNumberVerified = await checkUserPhoneSendCode(phoneNumber);
        handlePhoneVerificationError(isPhoneNumberVerified, res);

        // 5. Verificación de asociación de número de teléfono
        const isPhoneNumberAssociated = checkUserPhoneNumberAssociation(user);
        handlePhoneNumberAssociationError(isPhoneNumberAssociated, res);
        if (!user) return; // Si user es null, sale de la función

        // 6. generar nuevo codigo de verificacion
        const sendcodesms = await createVerificationEntryPhone(user.id, phoneNumber);

        // Antes de la actualización de Auth
        console.log('Antes de la actualización de Auth:', { phoneNumber, username });

    } catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerError(error, res);
    }
};


