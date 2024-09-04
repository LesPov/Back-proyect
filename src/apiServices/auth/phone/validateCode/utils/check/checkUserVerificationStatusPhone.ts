import { Response } from 'express';
import { errorMessages } from '../../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el usuario ya ha sido verificado por phone.
 * @param user - El objeto usuario.
 * @returns Verdadero si el email ya está verificado, falso en caso contrario.
 */
export const checkUserVerificationStatusPhone = (user: any) => {
    // Verificar el estado de la verificación del numero celular si no esta 
    return user?.verification?.isPhoneVerified || false;
};
/**
 * Maneja el error cuando el numero celular ya está verificado.
 * 
 * @param isPhoneVerified - Indicador de si el numero celular está verificado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * 
 * @throws Lanza una excepción si el numero celular ya está verificado.
 */
export const handlePhoneNotVerificationErroruser = (isPhoneVerified: boolean, res: Response) => {
    if (!isPhoneVerified) {
        const errorMsg = errorMessages.phoneAlreadyVerified();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El numero celular no ha sido verificado. Por favor, verifica tu correo antes de continuar.',
        });
        throw new Error("User email not verified.");
    }
};