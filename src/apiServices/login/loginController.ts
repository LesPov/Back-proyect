import { Request, Response } from 'express';
import { validateVerificationFieldslogin } from './utils/validateVerificationFieldslogin';
import { handleServerErrorLogin } from './utils/handleServerErrorLogin';
import { handleInputValidationErrors } from './utils/handleInputValidationErrors';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, contrasena } = req.body;
        // Validar la entrada de datos
        const inputValidationErrors = validateVerificationFieldslogin(
            usernameOrEmail,
            contrasena);
        handleInputValidationErrors(inputValidationErrors, res);

    } catch (error) {
        // Manejar errores internos del servidor
        handleServerErrorLogin(error, res);
    }
};
