import { Request, Response } from 'express';
import { validateVerificationFieldslogin } from './utils/userValidation/validateVerificationFieldslogin';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, contrasena } = req.body;
        // Validar la entrada de datos
        const inputValidationErrors = validateVerificationFieldslogin(
            usernameOrEmail,
            contrasena);
    } catch (error) {
        // Manejar errores internos del servidor
    }
};
