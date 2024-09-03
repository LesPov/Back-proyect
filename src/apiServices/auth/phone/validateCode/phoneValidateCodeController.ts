import { Request, Response } from 'express';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { validateInputVerifyCode } from './utils/validations/validateInput';
import { handleServerErrorVerifyCode } from './utils/errors/handleServerError';
import { findUserByUsername } from '../utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from '../utils/errors/handleUserNotFoundError';
import { checkUserVerificationStatusEmail, handleEmailNotVerificationErroruser } from '../utils/check/checkUserVerificationStatus';

export const verifyPhoneNumber = async (req: Request, res: Response) => {
    try {
        // 1. Validación de entrada
        const { username, phoneNumber, verificationCode } = req.body;
        const inputValidationErrors = validateInputVerifyCode(username, phoneNumber, verificationCode);
        handleInputValidationErrors(inputValidationErrors, res);

        // 2. Búsqueda del usuario
        const user = await findUserByUsername(username);
        handleUserNotFoundError(username, user, res);

        // 3. Verificación del estado del usuario Email
        const isEmailVerified = checkUserVerificationStatusEmail(user);
        handleEmailNotVerificationErroruser(isEmailVerified, res);

        // 4. Verificación del estado del usuario Phone
        // const isPhoneNumberVerified = checkUserVerificationStatusPhone(user);
        // handlePhoneNotVerificationErroruser(isPhoneNumberVerified, res);


    } catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerErrorVerifyCode(error, res);
    }
}