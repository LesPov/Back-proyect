import { Request, Response } from 'express';
import { handleServerErrorPasswordReset } from './utils/errors/handleServerError';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { validateInputPasswordReset } from './utils/validations/resentValidation';
import { findUserPasswordReset } from './utils/findUser/findUserPasswordReset';
import { handleUserNotFoundErrorLogin } from '../utils/findUser/findUserByUsernameLogin';


export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail } = req.body;
        const inputValidationErrors = validateInputPasswordReset(usernameOrEmail);
        handleInputValidationErrors(inputValidationErrors, res);


        // 2. Búsqueda del usuario
        const user = await findUserPasswordReset(usernameOrEmail);
        if (!user) {
            handleUserNotFoundErrorLogin(usernameOrEmail, user, res);
            return;
        }


    } catch (error) {
        // 7. Manejo de errores de servidor
        handleServerErrorPasswordReset(error, res);
    }
};
