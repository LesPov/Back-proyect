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
import { handleRandomPasswordValidation } from './utils/validations/handleRandomPasswordValidation';

/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
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

        // 5. Determinar si se está usando una contraseña aleatoria
        const isRandomPassword = passwordorrandomPassword.length === 8;

        // 6. Si es una contraseña aleatoria, manejar la validación
        if (isRandomPassword) {
            const isValid = await handleRandomPasswordValidation(user, passwordorrandomPassword, res);
            if (!isValid) return; // Si no es válida, salir
        }

        // 7. Validar la contraseña y manejar los intentos de inicio de sesión
        const isPasswordValid = await validatePassword(user, passwordorrandomPassword);
        const loginSuccess = await handleLoginAttempts(user.id, isPasswordValid, res);

        // 8. Si el inicio de sesión es exitoso
        if (loginSuccess) {
            await handleSuccessfulLogin(user, res, passwordorrandomPassword);
        }
    } catch (error) {
        // 9. Manejo de errores de servidor
        handleServerErrorLogin(error, res);
    }
};
