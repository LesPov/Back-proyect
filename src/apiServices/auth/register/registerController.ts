import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { checkExistingUserOrEmail } from './utils/check/checkExistingUserOrEmail';
import { handleEmailValidationErrors } from './utils/errors/handleEmailValidationErrors';
import { handleExistingUserError } from './utils/errors/handleExistingUserError';
import { handleInputValidationErrors } from './utils/errors/handleInputValidationErrors';
import { handlePasswordValidationErrors } from './utils/errors/handlePasswordValidationErrors';
import { handleServerError } from './utils/errors/handleServerError';
import { validateInput, validatePassword, validateEmail } from './utils/validations/registerValidations';
import { createNewUser } from './utils/userCreation/createNewUser';
import { initializeUserProfile } from './utils/userCreation/initializeUserProfile ';
import { createVerificationEntry } from './utils/verificationCode/createVerificationEntry ';
import { sendVerificationEmail } from './utils/email/sendEmailVerificationCode';


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

        // Hash de la contraseña antes de guardarla en la base de datos 
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear un nuevo usuario en la base de datos
        const newUser = await createNewUser(username, hashedPassword, email, rol);

        // Inicializar el perfil de usuario
        await initializeUserProfile(newUser.id);

        // Generar y guardar el código de verificación
        const verificationCode = await createVerificationEntry(newUser.id, email);

        // Enviar correo electrónico de verificación
        await sendVerificationEmail(email, username, verificationCode);

    } catch (error) {
        // Manejar errores internos del servidor
        handleServerError(error, res);
    }
};
