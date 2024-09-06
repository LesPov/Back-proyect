import { errorMessages } from "../../../../../middleware/erros/errorMessages";

/**
 * Valida que los campos de entrada requeridos para el inicio de sesión no estén vacíos.
 * 
 * Esta función verifica si el nombre de usuario y la contraseña (o contraseña generada aleatoriamente) están presentes.
 * Si alguno de estos campos está vacío, se agrega un mensaje de error a la lista de errores.
 * 
 * @param {string} username - Nombre de usuario. Debe estar presente.
 * @param {string} passwordorrandomPassword - Contraseña o contraseña generada aleatoriamente. Debe estar presente.
 * @returns {string[]} - Lista de mensajes de error si alguno de los campos está vacío, de lo contrario, una lista vacía.
 */
export const validateInputLogin = (username: string, passwordorrandomPassword: string): string[] => {
    const errors: string[] = [];
    if (!username || !passwordorrandomPassword) {
        errors.push(errorMessages.requiredFields);
    }
    return errors;
};
