import { Request, Response } from 'express';
import { checkExistingUserOrEmail } from './utils/check/checkExistingUserOrEmail';
import { handleEmailValidationErrors } from './utils/errors/handleEmailValidationErrors';
import { handleExistingUserError } from './utils/errors/handleExistingUserError';
import { handleInputValidationErrors } from './utils/errors/handleInputValidationErrors';
import { handlePasswordValidationErrors } from './utils/errors/handlePasswordValidationErrors';
import { handleServerError } from './utils/errors/handleServerError';
import { validateInput, validatePassword, validateEmail } from './utils/validations/registerValidations';


/**
 * Controlador para registrar un nuevo usuario.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 */
export const newUser = async (req: Request, res: Response) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, contrasena, email, rol } = req.body;

        // Validar la entrada de datos (username, contraseña, email, rol)
        const inputValidationErrors = validateInput(username, contrasena, email, rol);
        // Manejar cualquier error de validación de la entrada de datos
        handleInputValidationErrors(inputValidationErrors, res);

        // Validar los requisitos de la contraseña
        const passwordValidationErrors = validatePassword(contrasena);
        // Manejar cualquier error de validación de la contraseña
        handlePasswordValidationErrors(passwordValidationErrors, res);
 
        // Validar el formato del correo electrónico
        const emailErrors = validateEmail(email);
        // Manejar cualquier error de validación del correo electrónico
        handleEmailValidationErrors(emailErrors, res);

        // Verificar si el usuario o el correo electrónico ya existen
        const existingUserError = await checkExistingUserOrEmail(username, email);
        handleExistingUserError(existingUserError, res);

    } catch (error) {
        // Manejar errores internos del servidor
        handleServerError(error, res);
    }
};
