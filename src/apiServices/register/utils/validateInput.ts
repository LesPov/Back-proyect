import { Response } from 'express';
import { errorMessages } from '../../../middleware/erros/errorMessages';

/**
 * Valida que los campos de entrada no estén vacíos.
 * @param username Nombre de usuario.
 * @param contrasena Contraseña.
 * @param email Dirección de correo electrónico.
 * @param rol Rol del usuario.
 */
export const validateInput = (username: string, contrasena: string, email: string, rol: string): string[] => {
    const errors: string[] = [];
    if (!username) {
        errors.push(errorMessages.requiredFields);
    }
    return errors; 
};