import { errorMessages } from "../../../../../middleware/erros/errorMessages";

const PASSWORD_MIN_LENGTH = 10;
const PASSWORD_REGEX_NUMBER = /\d/;
const PASSWORD_REGEX_UPPERCASE = /[A-Z]/;
const PASSWORD_REGEX_LOWERCASE = /[a-z]/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

/**
 * Valida que los campos de entrada no estén vacíos.
 * @param username Nombre de username.
 * @param contrasena Contraseña.
 * @param email Dirección de correo electrónico.
 * @param rol Rol del username.
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
 * Valida la contraseña según los requisitos.
 * @param contrasena La contraseña a validar.
 * @returns Lista de errores de validación de la contraseña.
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
 * @param email El correo electrónico a validar.
 * @returns Lista de errores de validación del correo electrónico.
 */
export const validateEmail = (email: string): string[] => {
    const errors: string[] = [];

    if (!EMAIL_REGEX.test(email)) {
        errors.push(errorMessages.invalidEmail);
    }

    return errors;
};

