import { Request, Response } from 'express';
import { handleServerErrorLogin } from "./utils/errors/handleServerError";
import { validateInputLogin } from './utils/validations/loginvalidateInput';
import { handleInputValidationErrors } from '../register/utils/errors/handleInputValidationErrors';
import { findUserByUsernameLogin, handleUserNotFoundErrorLogin } from './utils/findUser/findUserByUsernameLogin';
import { checkUserVerificationStatusEmail, handleEmailNotVerificationErroruser } from '../phone/utils/check/checkUserVerificationStatus';
import { checkUserVerificationStatusPhoneLogin, handlePhoneLoginNotVerificationErroruser } from './utils/check/checkUserVerificationStatusPhone';
import { validatePassword } from './utils/validations/validatePasswordLogin';



/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
 * 
 * Este controlador autentica al usuario verificando sus credenciales, 
 * maneja los errores de servidor y envía una respuesta adecuada.
 * 
 * @param req - La solicitud HTTP que contiene las credenciales del usuario (nombre de usuario y contraseña).
 * @param res - La respuesta HTTP que será enviada al cliente, con mensajes de éxito o error.
 */
export const loginUser = async (req: Request, res: Response) => {
    try {

        // 1. Extraer los datos del cuerpo de la solicitud
        //  Validar la entrada de datos (username, passwordorrandomPassword)
        const { username, passwordorrandomPassword } = req.body;
        const inputValidationErrors = validateInputLogin(username, passwordorrandomPassword);
        // Manejar cualquier error de validación de la entrada de datos
        handleInputValidationErrors(inputValidationErrors, res);


        // 2. Búsqueda del usuario si existe
        const user = await findUserByUsernameLogin(username);
        handleUserNotFoundErrorLogin(username, user, res);


        // 3. Verificación del estado del usuario Email
        const isEmailVerified = checkUserVerificationStatusEmail(user);
        handleEmailNotVerificationErroruser(isEmailVerified, res);


        // 4. Verificación del estado del usuario Phone
        // Verifica si el número de teléfono del usuario ya está verificado.
        const isPhoneNumberVerified = checkUserVerificationStatusPhoneLogin(user);
        handlePhoneLoginNotVerificationErroruser(isPhoneNumberVerified, res);


        // 5. Validar la contraseña ingresada
        // Si la contraseña es incorrecta, incrementar los intentos de login
        await validatePassword(user, passwordorrandomPassword, res); // Solo se llama a esta función para ambas validaciones



    } catch (error) {

        // 6. Manejo de errores de servidor
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerErrorLogin(error, res);
    }
};