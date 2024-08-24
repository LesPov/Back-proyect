import { errorMessages } from "../../../middleware/erros/errorMessages";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

/**
 * Verifica si el nombre de usuario o correo electrónico es válido.
 * @param usernameOrEmail Nombre de usuario o correo electrónico.
 * @returns Mensaje de error si es inválido, o undefined si es válido.
 */
const validateUsernameOrEmail = (usernameOrEmail: string): string | undefined => {
    if (!EMAIL_REGEX.test(usernameOrEmail) && !USERNAME_REGEX.test(usernameOrEmail)) {
        return errorMessages.invalidEmail;
    }
    return undefined;
};

/**
 * Verifica si todos los campos requeridos están presentes.
 * @param usernameOrEmail Nombre de usuario o correo electrónico.
 * @param contrasena Contraseña proporcionada.
 * @returns Mensaje de error si falta algún campo, o undefined si es válido.
 */
const validateRequiredFields = (usernameOrEmail: string, contrasena: string): string | undefined => {
    if (!usernameOrEmail || !contrasena) {
        return errorMessages.missingUsernameOrEmail;
    }
    return undefined;
};

/**
 * Validar campos requeridos para el envío de credenciales de inicio de sesión.
 * @param usernameOrEmail Nombre de usuario o correo electrónico.
 * @param contrasena Contraseña proporcionada.
 * @returns Array de mensajes de error, vacío si no hay errores.
 */
export const validateVerificationFieldslogin = (usernameOrEmail: string, contrasena: string): string[] => {
    const errors: string[] = [];

    const requiredFieldsError = validateRequiredFields(usernameOrEmail, contrasena);
    if (requiredFieldsError) {
        errors.push(requiredFieldsError);
    }

    const usernameOrEmailError = validateUsernameOrEmail(usernameOrEmail);
    if (usernameOrEmailError) {
        errors.push(usernameOrEmailError);
    }

    return errors;
};
