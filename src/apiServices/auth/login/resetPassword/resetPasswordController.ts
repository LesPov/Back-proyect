import { Request, Response } from 'express';
import { validateInputresetPassword } from './utils/validations/validateInputResetPassword';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { handleServerErrorResetPassword } from './utils/errors/handleServerError';


export const resetPassword  = async (req: Request, res: Response) => {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail, randomPassword, newPassword } = req.body;
        
        const inputValidationErrors = validateInputresetPassword(usernameOrEmail, randomPassword,newPassword);
        handleInputValidationErrors(inputValidationErrors, res);

    } catch (error) {
        
        // 7. Manejo de errores de servidor
        handleServerErrorResetPassword(error, res);
    }
};
