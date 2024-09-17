import { Request, Response } from 'express';
import { handleServerErrorPasswordReset } from './utils/errors/handleServerError';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { validateInputPasswordReset } from './utils/validations/resentValidation';


export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail } = req.body;
        const inputValidationErrors = validateInputPasswordReset(usernameOrEmail);
        handleInputValidationErrors(inputValidationErrors, res);


        // 2.Busca al usuario en la base de datos según el nombre de usuario o correo electrónico.



    } catch (error) {
        // 7. Manejo de errores de servidor
        handleServerErrorPasswordReset(error, res);
    }
};
