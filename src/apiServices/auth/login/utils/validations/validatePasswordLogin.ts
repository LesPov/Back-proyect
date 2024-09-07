import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { errorMessages } from '../../../../../middleware/erros/errorMessages';

/**
 * Valida si la contraseña proporcionada es una contraseña aleatoria o 
 * una contraseña almacenada en la base de datos.
 * 
 * @param user - El objeto usuario con los detalles del usuario.
 * @param password - La contraseña proporcionada por el usuario (aleatoria o almacenada).
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si la contraseña es válida o no.
 */
export const validatePassword = async (user: any, password: string, res: Response): Promise<boolean> => {
    if (password.length === 8) {
        // Contraseña aleatoria
        const isRandomPasswordValid = password === user.verification.randomPassword;
        
        // Manejar el error si la contraseña aleatoria no es válida
        if (!isRandomPasswordValid) {
            const errorMsg = errorMessages.invalidRandomPassword();
            res.status(401).json({ 
                msg: errorMsg,
                errors: 'Error: Contraseña aleatoria incorrecta. Por favor, inténtalo de nuevo.',
            });
            throw new Error("Invalid random password provided.");
        }

        return true; // Si la contraseña aleatoria es válida
    } else {
        // Contraseña almacenada (hash)
        const isStoredPasswordValid = await bcrypt.compare(password, user.password);

        // Manejar el error si la contraseña almacenada no es válida
        if (!isStoredPasswordValid) {
            const errorMsg = errorMessages.incorrectPasswor1d();
            res.status(401).json({
                msg: errorMsg,
                errors: 'Error: Contraseña almacenada incorrecta. Por favor, inténtalo de nuevo.',
            });
            throw new Error("Invalid stored password provided.");
        }

        return true; // Si la contraseña almacenada es válida
    }
};
