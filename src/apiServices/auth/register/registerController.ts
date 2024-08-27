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

import { sendVerificationEmail } from './utils/email/sendEmailVerificationCode';
import { getRoleMessage } from './utils/rols/getRoleMessage';
import { successMessages } from '../../../middleware/success/successMessages';
import { initializeUserProfile } from './utils/userCreation/initializeUserProfile ';
import { createVerificationEntry } from './utils/verificationCode/createVerificationEntry ';
import { handleSuccessMessage } from './utils/success/handleSuccessMessage';

/**
 * Controlador para registrar un nuevo usuario en el sistema.
 * 
 * Esta función maneja la creación de un nuevo usuario, incluyendo validaciones 
 * de los datos de entrada, verificación de existencia previa de usuario/correo, 
 * encriptación de la contraseña, creación de perfil de usuario, y envío de correo 
 * electrónico de verificación. En caso de éxito, se responde con un mensaje de éxito 
 * adecuado según el rol del usuario.
 * 
 * @param req - La solicitud HTTP entrante que contiene los datos del usuario a registrar.
 * @param res - La respuesta HTTP que se envía de vuelta al cliente.
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

        // Verificar si el usuario o el correo electrónico ya existen en la base de datos
        const existingUserError = await checkExistingUserOrEmail(username, email);
        handleExistingUserError(existingUserError, res);

        // Si todo es válido, proceder a encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear un nuevo usuario en la base de datos con la información proporcionada
        const newUser = await createNewUser(username, hashedPassword, email, rol);

        // Inicializar el perfil de usuario en la base de datos, asignando un ID único
        await initializeUserProfile(newUser.id);

        // Generar y guardar un código de verificación para el correo electrónico del usuario
        const verificationCode = await createVerificationEntry(newUser.id, email);

        // Enviar un correo electrónico de verificación al nuevo usuario con el código generado
        await sendVerificationEmail(email, username, verificationCode);

        // Obtener un mensaje de bienvenida basado en el rol del usuario
        const userMessage = getRoleMessage(rol);

       // Manejar y enviar el mensaje de éxito al cliente
       handleSuccessMessage(res, username, userMessage);
    } catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerError(error, res);
    }
};
