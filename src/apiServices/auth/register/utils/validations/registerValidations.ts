import { errorMessages } from "../../../../../middleware/erros/errorMessages";

const PASSWORD_MIN_LENGTH = 10;
const PASSWORD_REGEX_NUMBER = /\d/;
const PASSWORD_REGEX_UPPERCASE = /[A-Z]/;
const PASSWORD_REGEX_LOWERCASE = /[a-z]/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

/**
 * Valida que los campos de entrada no estén vacíos.
 * 
 * Esta función verifica si el nombre de usuario, la contraseña, el correo electrónico y el rol están presentes. 
 * Si alguno de estos campos está vacío, se agrega un mensaje de error a la lista de errores.
 * 
 * @param {string} username - Nombre de usuario. Debe estar presente.
 * @param {string} contrasena - Contraseña. Debe estar presente.
 * @param {string} email - Dirección de correo electrónico. Debe estar presente.
 * @param {string} rol - Rol del usuario. Debe estar presente.
 * @returns {string[]} - Lista de mensajes de error si alguno de los campos está vacío, de lo contrario, una lista vacía.
 */
export const validateInput = (username: string, contrasena: string, email: string, rol: string): string[] => {
    const errors: string[] = [];
    if (!username) {
        errors.push(errorMessages.requiredFields);
    }
    return errors;
};


// Definir la configuración para validaciones
const validationRules = [
    {
        test: (password: string) => password.length >= PASSWORD_MIN_LENGTH,
        errorMessage: errorMessages.passwordTooShort
    },
    {
        test: (password: string) => PASSWORD_REGEX_NUMBER.test(password),
        errorMessage: errorMessages.passwordNoNumber
    },
    {
        test: (password: string) => PASSWORD_REGEX_UPPERCASE.test(password),
        errorMessage: errorMessages.passwordNoUppercase
    },
    {
        test: (password: string) => PASSWORD_REGEX_LOWERCASE.test(password),
        errorMessage: errorMessages.passwordNoLowercase
    },
    {
        test: (password: string) => SPECIAL_CHARACTERS_REGEX.test(password),
        errorMessage: errorMessages.passwordNoSpecialChar
    }
];

/**
 * Valida la contraseña según los requisitos especificados.
 * 
 * Esta función comprueba si la contraseña cumple con varios requisitos de seguridad, 
 * como longitud mínima, presencia de números, mayúsculas, minúsculas y caracteres especiales. 
 * Si la contraseña no cumple con alguno de los requisitos, se agrega un mensaje de error a la lista de errores.
 * 
 * @param {string} contrasena - La contraseña a validar. Debe cumplir con los requisitos especificados.
 * @returns {string[]} - Lista de mensajes de error si la contraseña no cumple con los requisitos, de lo contrario, una lista vacía.
 */
export const validatePassword = (contrasena: string): string[] => {
    const errors: string[] = [];

    validationRules.forEach(rule => {
        if (!rule.test(contrasena)) {
            errors.push(rule.errorMessage);
        }
    });

    return errors;
};


/**
 * Valida el formato del correo electrónico.
 * 
 * Esta función verifica si el formato del correo electrónico es válido utilizando una expresión regular. 
 * Si el formato del correo electrónico no es válido, se agrega un mensaje de error a la lista de errores.
 * 
 * @param {string} email - El correo electrónico a validar. Debe tener un formato válido.
 * @returns {string[]} - Lista de mensajes de error si el correo electrónico no tiene un formato válido, de lo contrario, una lista vacía.
 */
export const validateEmail = (email: string): string[] => {
    const errors: string[] = [];

    if (!EMAIL_REGEX.test(email)) {
        errors.push(errorMessages.invalidEmail);
    }

    return errors;
};

