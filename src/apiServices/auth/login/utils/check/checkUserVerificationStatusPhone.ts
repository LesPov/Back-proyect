import { Response } from 'express';
import { errorMessages } from '../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el usuario ya ha sido verificado por isPhoneVerified.
 * @param user - El objeto usuario.
 * @returns Verdadero si el isPhoneVerified ya está verificado, falso en caso contrario.
 */
export const checkUserVerificationStatusPhoneLogin = (user: any) => {
    // Verificar el estado de la verificación del numero si no esta 
    return user?.verification?.isPhoneVerified || false;
};
/**
 * Maneja el error cuando el numero ya está verificado.
 * 
 * @param isPhoneVerified - Indicador de si el numero está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * 
 * @throws Lanza una excepción si el numero ya está verificado.
 */
export const handlePhoneLoginNotVerificationErroruser = (isPhoneVerified: boolean, res: Response) => {
    if (!isPhoneVerified) {
        const errorMsg = errorMessages.numberNotVerified();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El numero no ha sido verificado. Por favor, verifica tu correo antes de continuar.',
        });
        throw new Error("User isPhoneVerified not verified.");
    }
}; 