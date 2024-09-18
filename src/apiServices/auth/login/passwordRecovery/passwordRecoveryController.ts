import { Request, Response } from 'express';
import { handleServerErrorPasswordReset } from './utils/errors/handleServerError';
import { handleInputValidationErrors } from '../../register/utils/errors/handleInputValidationErrors';
import { validateInputPasswordReset } from './utils/validations/resentValidation';
import { findUserPasswordReset } from './utils/findUser/findUserPasswordReset';
import { handleUserNotFoundErrorLogin } from '../utils/findUser/findUserByUsernameLogin';
import { checkisUserVerified, handleUnverifiedUserError } from './utils/check/checkUserVerificationStatus';
import { generateAndSetRandomPassword } from './utils/generate/generateAndRandomPassword';
import { sendPasswordResetEmailPasswordReset } from './utils/email/sendEmailCode';
import { handleSuccessMessagePasswordReset } from './utils/success/handleSuccessMessage';


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

        // 3. Verificación del estado del usuario isverified
        const isVerified = checkisUserVerified(user);
        handleUnverifiedUserError(isVerified, res);

        // 4. Genera una nueva contraseña aleatoria y actualiza el registro de verificación
        const randomPassword = await generateAndSetRandomPassword(user.id); 

        // 5. Envía un correo electrónico con la nueva contraseña aleatoria
       await sendPasswordResetEmailPasswordReset(user.email, user.username, randomPassword);

        // 6. Envia el mesge de exito
        handleSuccessMessagePasswordReset(res);

    } catch (error) {
        
        // 7. Manejo de errores de servidor
        handleServerErrorPasswordReset(error, res);
    }
};
