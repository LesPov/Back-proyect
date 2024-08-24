import { errorMessages } from "../../../middleware/errorMessages";
import { Response } from 'express';

/**
 * Valida que los campos de entrada no estén vacíos.
 * @param usuario Nombre de usuario.
 * @param contrasena Contraseña.
 * @param email Dirección de correo electrónico.
 * @param rol Rol del usuario.
 */
export const validateInput = (usuario: string, contrasena: string, email: string, rol: string): string[] => {
    const errors: string[] = [];
    if (!usuario) {
        errors.push(errorMessages.requiredFields);
    }
    // ... (validar otros campos)
    return errors;
};