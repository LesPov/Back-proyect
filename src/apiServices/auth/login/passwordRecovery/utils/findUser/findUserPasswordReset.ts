import { errorMessages } from "../../../../../../middleware/erros/errorMessages";
import { AuthInterface } from "../../../../../../middleware/interfaces/authInterface";
import { AuthModel } from "../../../../../../middleware/models/authModel";
import { VerificationModel } from "../../../../../../middleware/models/VerificationModel";
import { Response } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Busca al usuario en la base de datos según el nombre de usuario o correo electrónico.
 * @param {string} usernameOrEmail - Nombre de usuario o correo electrónico.
 * @returns {Promise<AuthModel | null>} - Usuario encontrado o nulo si no se encuentra.
 */
export const findUseRrequestPassword = async (usernameOrEmail: string): Promise<AuthInterface | null> => {
    if (EMAIL_REGEX.test(usernameOrEmail)) {
        return await AuthModel.findOne({ where: { email: usernameOrEmail }, include: [VerificationModel] });
    } else {
        return await AuthModel.findOne({ where: { username: usernameOrEmail }, include: [VerificationModel] });
    }
};


/**
 * Maneja el error cuando un usuario no es encontrado en la base de datos.
 * 
 * @param user - El objeto de usuario retornado por la consulta a la base de datos.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * 
 * @throws Lanza una excepción si el usuario no fue encontrado.
 */
export const handleUserNotFoundErrorPasswordReset = (usernameOrEmail: string, user: any, res: Response) => {
    if (!user) {
        const errorMsg = errorMessages.userNotFound(usernameOrEmail);
        res.status(404).json({
            msg: errorMsg,
            errors: 'Error: El usuario no fue encontrado en la base de datos.',
        });
        throw new Error("User not found validation failed");
    }
};
