import { Request, Response } from 'express';
import { findUserByUsername } from './utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from './utils/errors/handleUserNotFoundError';
import { handleServerError } from './utils/errors/handleServerError';
import { checkUserVerificationStatus, handleEmailNotVerificationErroruser } from './utils/check/checkUserVerificationStatus';
import { checkVerificationCodeIsValid, handleVerificationCodeIsValidError } from './utils/check/checkVerificationCodeIsvValid';
import { checkVerificationCodeExpiration, handleEmailVerificationCodeExpirationError } from './utils/check/checkVerificationCodeExpiration ';
import { markEmailAsVerified } from './utils/markItInDatabase/markItInDatabase';



export const verifyUser = async (req: Request, res: Response) => {

    try {
        const { username, verificationCode } = req.body;

        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = await findUserByUsername(username);
        // Maneja el error si el usuario no existe
        handleUserNotFoundError(username, user, res);
        if (!user) return; // Si user es null, sale de la función


        // Verificar si el correo electrónico ya está verificado
        const isEmailVerified = checkUserVerificationStatus(user);

        // Maneja el error si el correo ya está verificado
        handleEmailNotVerificationErroruser(isEmailVerified, res);

        // Verifica si el código de verificación proporcionado es inválido.
        const isCodeValid = checkVerificationCodeIsValid(user, verificationCode);
        // Maneja el error si el código de verificación proporcionado es inválido
        handleVerificationCodeIsValidError(isCodeValid, res);

        const currentDate = new Date();
        // Verifica si el código de verificación ha expirado.
        const isCodeExpire = checkVerificationCodeExpiration(user, currentDate);
        console.log(`Código expirado: ${isCodeExpire}`);
        // Maneja el error si el código de verificación ha expirado.
        handleEmailVerificationCodeExpirationError(isCodeExpire, res);

        //Marca el email del usuario como verificado en la base de datos.
        await markEmailAsVerified(user.id);

    } catch (error: any) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerError(error, res);
    }
};
