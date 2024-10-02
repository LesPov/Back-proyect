import { Response } from 'express';
import { errorMessages } from '../../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el usuario ya ha sido verificado por email.
 * @param user - El objeto usuario.
 * @returns Verdadero si el email ya está verificado, falso en caso contrario.
 */
export const checkUserVerificationStatusEmail = (user: any) => {
    // Verificar el estado de la verificación del correo electrónico si no esta 
    return user?.verification?.isEmailVerified || false;
};
/**
 * Maneja el error cuando el correo electrónico ya está verificado.
 * 
 * @param isEmailVerified - Indicador de si el correo electrónico está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * 
 * @throws Lanza una excepción si el correo electrónico ya está verificado.
 */
export const handleEmailNotVerificationErroruser = (isEmailVerified: boolean, res: Response) => {
    if (!isEmailVerified) {
        const errorMsg = errorMessages.emailNotVerified();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El correo electrónico no ha sido verificado. Por favor, verifica tu correo antes de continuar.',
        });
        throw new Error("User email not verified.");
    }
}; 