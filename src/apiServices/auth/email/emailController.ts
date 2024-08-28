import { Request, Response } from 'express';
import { findUserByUsername } from './utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from './utils/errors/handleUserNotFoundError';
import { checkVerificationCodeExpiration } from './utils/check/checkVerificationCodeExpiration ';



export const verifyUser = async (req: Request, res: Response) => {

    try {
        const { username, verificationCode } = req.body;

        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = await findUserByUsername(username);
        // Maneja el error si el usuario no existe
        handleUserNotFoundError(username, user, res);

        const currentDate = new Date();
        await checkVerificationCodeExpiration(user, currentDate)
    } catch (error: any) {
    }
};
