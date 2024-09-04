import { Request, Response } from 'express';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { validateInputVerifyCode } from './utils/validations/validateInput';
import { handleServerErrorVerifyCode } from './utils/errors/handleServerError';
import { findUserByUsername } from '../utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from '../utils/errors/handleUserNotFoundError';
import { checkUserVerificationStatusEmail, handleEmailNotVerificationErroruser } from '../utils/check/checkUserVerificationStatus';
import { checkUserVerificationStatusPhone, handlePhoneNotVerificationErroruser } from './utils/check/checkUserVerificationStatusPhone';
import { checkUserPhoneNumberAssociationCode, handlePhoneNumberAssociationCodeError } from './utils/check/checkUserPhoneNumberAssociation';
import { checkVerificationCodeIsValid, handleVerificationCodeIsValidError } from '../../email/utils/check/checkVerificationCodeIsvValid';
import { checkVerificationCodeExpiration, handleVerificationCodeExpirationError } from '../../email/utils/check/checkVerificationCodeExpiration';
import { markisPhoneVerified, markisVerified } from './markItInDatabase/marckisPhoneVerified';
import whatsappClient from '../../../chatbot/client';
import { sendWhatsAppMessage } from '../utils/send/sendWhatsAppMessage';
import { removeVerificationCode } from '../../email/utils/markItInDatabase/markItInDatabase';

/**
 * Verifica el número de teléfono del usuario en función del código de verificación.
 * @param req - Objeto de solicitud HTTP proporcionado por Express.
 * @param res - Objeto de respuesta HTTP proporcionado por Express.
 */
export const verifyPhoneNumber = async (req: Request, res: Response) => {
    try {

        // 1. Validación de entrada
        // Extrae los parámetros necesarios del cuerpo de la solicitud.
        const { username, phoneNumber, verificationCode } = req.body;
        // Valida los datos de entrada y obtiene cualquier error de validación.
        const inputValidationErrors = validateInputVerifyCode(username, phoneNumber, verificationCode);
        // Maneja los errores de validación si los hay.
        handleInputValidationErrors(inputValidationErrors, res);


        // 2. Búsqueda del usuario si existe
        // Busca al usuario en la base de datos por su nombre de usuario.
        const user = await findUserByUsername(username);
        if (!user) {
            // Si el usuario no existe, maneja el error y termina el flujo.
            return handleUserNotFoundError(username, user, res);
        }
        // 3. Verificación del estado del usuario Email
        // Verifica si el correo electrónico del usuario ha sido verificado.
        const isEmailVerified = checkUserVerificationStatusEmail(user);
        // Maneja el caso en el que el correo electrónico no está verificado.
        handleEmailNotVerificationErroruser(isEmailVerified, res);


        // 4. Verificación del estado del usuario Phone
        // Verifica si el número de teléfono del usuario ya está verificado.
        const isPhoneNumberVerified = checkUserVerificationStatusPhone(user);
        // Maneja el caso en el que el número de teléfono ya está verificado.
        handlePhoneNotVerificationErroruser(isPhoneNumberVerified, res);


        // 5. Validar si el número de teléfono coincide con el almacenado en la base de datos
        const isPhoneNumberAssociated = checkUserPhoneNumberAssociationCode(user, phoneNumber);
        handlePhoneNumberAssociationCodeError(isPhoneNumberAssociated, res);


        // 6. Verifica si el código de verificación proporcionado es inválido.
        const isCodeValid = checkVerificationCodeIsValid(user, verificationCode);
        // Maneja el error si el código de verificación proporcionado es inválido
        handleVerificationCodeIsValidError(isCodeValid, res);
        const currentDate = new Date();
        // Verifica si el código de verificación ha expirado.
        const isCodeExpire = checkVerificationCodeExpiration(user, currentDate);
        console.log(`Código expirado: ${isCodeExpire}`);
        // Maneja el error si el código de verificación ha expirado.
        handleVerificationCodeExpirationError(isCodeExpire, res);

     

        // 8. Marca el número de teléfono como verificado en la base de datos.
        // Actualiza el estado del número de teléfono del usuario a verificado en la base de datos.
        await markisPhoneVerified(user.id);


        // 9. Marca al usuario como completamente verificado si tanto el email como el teléfono están verificados.
        // Actualiza el estado general de verificación del usuario en la base de datos si ambos campos están verificados.
        await markisVerified(user.id);


        // 10. Elimina el código de verificación de la base de datos
        // Borra el código de verificación almacenado para evitar su reutilización.
        await removeVerificationCode(user.id);

        // 11. Responde con éxito si todas las validaciones y actualizaciones se completan correctamente
        // Envía una respuesta exitosa al cliente indicando que el número de teléfono ha sido verificado.
        res.status(200).json({
            msg: 'Número de teléfono verificado con éxito',
        });


        // 12. Mensaje de verificación para enviar
        // Prepara y envía un mensaje por WhatsApp confirmando la verificación del número de teléfono.
        const message = `Hola ${username}, tu número de teléfono ha sido verificado exitosamente. Ya puedes iniciar sesión en tu cuenta.`;
        console.log('El mensaje enviado fue:', message);
        // Enviar el mensaje de verificación por WhatsApp
        await sendWhatsAppMessage(phoneNumber, message);


    } catch (error) {
        // Maneja errores generales del servidor y responde con un mensaje de error.
        handleServerErrorVerifyCode(error, res);
    }
}
