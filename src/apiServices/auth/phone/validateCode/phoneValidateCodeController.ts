import { Request, Response } from 'express';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { validateInputVerifyCode } from './utils/validations/validateInput';
import { handleServerErrorVerifyCode } from './utils/errors/handleServerError';
import { findUserByUsername } from '../utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from '../utils/errors/handleUserNotFoundError';
import { checkUserVerificationStatusEmail, handleEmailNotVerificationErroruser } from '../utils/check/checkUserVerificationStatus';
import { checkUserVerificationStatusPhone, handlePhoneNotVerificationErroruser } from './utils/check/checkUserVerificationStatusPhone';

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
        // Maneja el caso en el que el usuario no se encuentra en la base de datos.
        handleUserNotFoundError(username, user, res);


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

    } catch (error) {
        // Maneja errores generales del servidor y responde con un mensaje de error.
        handleServerErrorVerifyCode(error, res);
    }
}
