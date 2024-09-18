import { Request, Response } from 'express';
import { handleServerErrorLogin } from "./utils/errors/handleServerError";
import { validateInputLogin } from './utils/validations/loginvalidateInput';
import { handleInputValidationErrors } from '../register/utils/errors/handleInputValidationErrors';
import { findUserByUsernameLogin, handleUserNotFoundErrorLogin } from './utils/findUser/findUserByUsernameLogin';
import { checkUserVerificationStatusEmail, handleEmailNotVerificationErroruser } from '../phone/utils/check/checkUserVerificationStatus';
import { checkUserVerificationStatusPhoneLogin, handlePhoneLoginNotVerificationErroruser } from './utils/check/checkUserVerificationStatusPhone';
import { validatePassword } from './utils/validations/validatePasswordLogin';
import { handleLoginAttempts } from './utils/loginAttempts/loginAttemptsService';
import { handleSuccessfulLogin } from './utils/handleSuccessfu/handleSuccessfulLogin';
import { checkVerificationCodeExpiration } from '../email/utils/check/checkVerificationCodeExpiration';
import { handleVerificationCodeExpirationErrorReset } from './resetPassword/utils/errors/handleVerificationCodeExpirationError';

/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
 * 
 * @param req - La solicitud HTTP que contiene las credenciales del usuario (nombre de usuario y contraseña).
 * @param res - La respuesta HTTP que será enviada al cliente, con mensajes de éxito o error.
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        // 1. Extraer y validar los datos de entrada
        const { username, passwordorrandomPassword } = req.body;
        const inputValidationErrors = validateInputLogin(username, passwordorrandomPassword);
        handleInputValidationErrors(inputValidationErrors, res);

        // 2. Búsqueda del usuario
        const user = await findUserByUsernameLogin(username);
        if (!user) {
            handleUserNotFoundErrorLogin(username, user, res);
            return;
        }

        // 3. Verificación del estado del usuario Email
        const isEmailVerified = checkUserVerificationStatusEmail(user);
        handleEmailNotVerificationErroruser(isEmailVerified, res);

        // 4. Verificación del estado del usuario Phone
        const isPhoneNumberVerified = checkUserVerificationStatusPhoneLogin(user);
        handlePhoneLoginNotVerificationErroruser(isPhoneNumberVerified, res);

        // 5. Validar la contraseña y manejar los intentos de inicio de sesión
        const isPasswordValid = await validatePassword(user, passwordorrandomPassword);
        const loginSuccess = await handleLoginAttempts(user.id, isPasswordValid, res);
        // Verifica si el randomPassword de verificación ha expirado
        const currentDate = new Date();
        const isCodeExpire = checkVerificationCodeExpiration(user, currentDate);
        handleVerificationCodeExpirationErrorReset(isCodeExpire, res);
        // 6. Si el inicio de sesión es exitoso
        if (loginSuccess) {
            await handleSuccessfulLogin(user, res, passwordorrandomPassword);
        }

    } catch (error) {
        // 7. Manejo de errores de servidor
        handleServerErrorLogin(error, res);
    }
};
