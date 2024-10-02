import { errorMessages } from "../../../../../../../middleware/erros/errorMessages";

/**
 * Valida la entrada de datos para el reenvío del código de verificación.
 * Esta función verifica si se han proporcionado tanto el nombre de usuario como el número de teléfono.
 * Si alguno de estos campos está vacío o indefinido, se agrega un mensaje de error correspondiente.
 *
 * @param {string} username - El nombre de usuario que se va a validar.
 * @param {string} phoneNumber - El número de teléfono que se va a validar.
 * @returns {string[]} - Un array que contiene los mensajes de error si hay campos faltantes; de lo contrario, un array vacío.
 */
export const validateInputVerifyCodeResend = (username: string, phoneNumber: string): string[] => {
    const errors: string[] = [];

    // Validar si los campos requeridos están presentes
    if (!username || !phoneNumber) {
        // Si faltan campos, agregar el mensaje de error a la lista de errores
        errors.push(errorMessages.requiredFields);
    }

    // Retornar la lista de errores (vacía si no hay errores)
    return errors;
};
