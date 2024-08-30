import { Request, Response } from 'express';
import { findUserByUsername } from '../utils/findUser/findUserByUsername';
import { handleUserNotFoundError } from '../utils/errors/handleUserNotFoundError';
import { createVerificationEntry } from '../../register/utils/verificationCode/createVerificationEntry';
import { sendVerificationEmail } from '../../register/utils/email/sendEmailVerificationCode';
import { handleServerError } from '../utils/errors/handleServerError';
import { createOrUpdateVerificationEntry } from './utils/errors/createOrUpdateVerificationEntry';

export const resendVerificationCode = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = await findUserByUsername(username);
        // Maneja el error si el usuario no existe
        handleUserNotFoundError(username, user, res);

        if (!user) return; // Si user es null, sale de la función

        // Generar y guardar un código de verificación para el correo electrónico del usuario
        const newVerificationCode = await createOrUpdateVerificationEntry(user.id, user.email);

        // Enviar el correo electrónico de verificación al usuario con el nuevo código
        await sendVerificationEmail(user.email, username, newVerificationCode);

        // Mensaje de éxito
        res.json({
            msg: 'Código de verificación reenviado exitosamente.',
        });

    } catch (error: any) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerError(error, res);
    }

};