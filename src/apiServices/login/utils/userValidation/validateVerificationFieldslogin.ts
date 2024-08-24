import { errorMessages } from "../../../../middleware/erros/errorMessages";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validar campos requeridos para el envío de .
 * @param usuario Nombre de usuario.
 * @param contraseña  Contraseña proporcionada.
 * @returns Array de mensajes de error, vacío si no hay errores.
 */
export const validateVerificationFieldslogin = (usernameOrEmail: string, contrasena: string): string[] => {
    const errors: string[] = [];

    if (!usernameOrEmail || !contrasena) {
        errors.push(errorMessages.missingUsernameOrEmail);
    } else if (!EMAIL_REGEX.test(usernameOrEmail) && !/^[a-zA-Z0-9_]+$/.test(usernameOrEmail)) {
        errors.push(errorMessages.invalidEmail);
    }


    return errors;
};
