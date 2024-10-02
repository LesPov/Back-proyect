import { Request, Response } from 'express';
import { findUserByUsername } from './utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from './utils/errors/handleUserNotFoundError';
import { handleServerError } from './utils/errors/handleServerError';
import { checkUserVerificationStatus, handleEmailNotVerificationErroruser } from './utils/check/checkUserVerificationStatus';
import { checkVerificationCodeIsValid, handleVerificationCodeIsValidError } from './utils/check/checkVerificationCodeIsvValid';
import { checkVerificationCodeExpiration, handleVerificationCodeExpirationError } from './utils/check/checkVerificationCodeExpiration';
import { markEmailAsVerified, removeVerificationCode } from './utils/markItInDatabase/markItInDatabase';
import { successMessages } from '../../../../middleware/success/successMessages';



export const verifyUser = async (req: Request, res: Response) => {

    try {
        const { username, verificationCode } = req.body;

        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = await findUserByUsername(username);
        if (!user) {
            // Si el usuario no existe, maneja el error y termina el flujo.
            return handleUserNotFoundError(username, user, res);
        }

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
        handleVerificationCodeExpirationError(isCodeExpire, res);

        //Marca el email del usuario como verificado en la base de datos.
        await markEmailAsVerified(user.id);

        // Elimina el código de verificación de la base de datos
        await removeVerificationCode(user.id);

        //Mensege de exito 
        res.json({
            msg: successMessages.userVerified,
        });
    } catch (error: any) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerError(error, res);
    }
};
