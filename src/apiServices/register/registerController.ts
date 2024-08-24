import { Request, Response } from 'express';
import { validateInput } from './utils/validateInput';
import { handleInputValidationErrors } from './utils/handleInputValidationErrors';
import { handleEmailValidationErrors, handlePasswordValidationErrors, validateEmail, validatePassword } from './utils/validations';
import { handleServerError } from './utils/handleServerError';

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

        // Aquí se puede añadir la lógica para guardar el usuario en la base de datos

    } catch (error) {
        // Manejar errores internos del servidor
        handleServerError(error, res);
    }
};
