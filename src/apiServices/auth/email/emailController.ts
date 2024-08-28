import { Request, Response } from 'express';
import { findUserByUsername } from './utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from './utils/errors/handleUserNotFoundError';
import { handleServerError } from './utils/errors/handleServerError';
import { checkUserVerificationStatus, handleEmailNotVerificationErroruser } from './utils/check/checkUserVerificationStatus';



export const verifyUser = async (req: Request, res: Response) => {

    try {
        const { username, verificationCode } = req.body;

        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = await findUserByUsername(username);
        // Maneja el error si el usuario no existe
        handleUserNotFoundError(username, user, res);

  
        // Verificar si el correo electrónico ya está verificado
        const isEmailVerified = checkUserVerificationStatus(user);

        // Maneja el error si el correo ya está verificado
        handleEmailNotVerificationErroruser(isEmailVerified, res);

    

    } catch (error: any) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerError(error, res);
    }
};
