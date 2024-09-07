import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { errorMessages } from '../../../../../middleware/erros/errorMessages';

// Máximo de intentos de inicio de sesión permitidos
const MAX_LOGIN_ATTEMPTS = 5;

/**
 * Valida si la contraseña proporcionada es la contraseña aleatoria.
 * 
 * @param user - El objeto usuario con los detalles del usuario.
 * @param randomPassword - La contraseña aleatoria proporcionada por el usuario.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña aleatoria es válida o no.
 */
export const validateRandomPassword = async (user: any, randomPassword: string, res: Response): Promise<boolean> => {
    const isRandomPasswordValid = randomPassword === user.verification.randomPassword;

    if (!isRandomPasswordValid) {
        const errorMsg = errorMessages.invalidRandomPassword;
        res.status(401).json({
            msg: errorMsg,
            errors: 'Error: Contraseña aleatoria incorrecta. Por favor, inténtalo de nuevo.',
        });
        

        throw new Error("Invalid random password provided.");
    }

    return true; // Contraseña aleatoria válida
};

/**
 * Valida si la contraseña proporcionada coincide con la contraseña almacenada (hash).
 * 
 * @param user - El objeto usuario con los detalles del usuario.
 * @param storedPassword - La contraseña proporcionada por el usuario.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña almacenada es válida o no.
 */
export const validateStoredPassword = async (user: any, storedPassword: string, res: Response): Promise<boolean> => {
    const isStoredPasswordValid = await bcrypt.compare(storedPassword, user.password);

    if (!isStoredPasswordValid) {
        const errorMsg = errorMessages.incorrectPasswor1d;
        res.status(401).json({
            msg: errorMsg,
            errors: 'Error: Contraseña almacenada incorrecta. Por favor, inténtalo de nuevo.',
        });

        throw new Error("Invalid stored password provided.");
    }

    return true; // Contraseña almacenada válida
};

/**
 * Función principal para validar la contraseña del usuario.
 * Se delega a las funciones correspondientes según si la contraseña es aleatoria o almacenada.
 * 
 * @param user - El objeto usuario con los detalles del usuario.
 * @param password - La contraseña proporcionada por el usuario.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña es válida o no.
 */
export const validatePassword = async (user: any, password: string, res: Response): Promise<boolean> => {
    // Si la longitud de la contraseña es de 8 caracteres, se trata de una contraseña aleatoria
    if (password.length === 8) {
        return validateRandomPassword(user, password, res);
    } else {
        return await validateStoredPassword(user, password, res);
    }
};

