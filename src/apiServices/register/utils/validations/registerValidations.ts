import { errorMessages } from '../../../../middleware/erros/errorMessages';

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


/**
 * Valida la contraseña según los requisitos.
 * @param contrasena La contraseña a validar.
 * @returns Lista de errores de validación de la contraseña.
 */
export const validatePassword = (contrasena: string): string[] => {
    const errors: string[] = [];

    validateLength(contrasena, errors);
    validateCharacterClass(contrasena, PASSWORD_REGEX_NUMBER, errorMessages.passwordNoNumber, errors);
    validateCharacterClass(contrasena, PASSWORD_REGEX_UPPERCASE, errorMessages.passwordNoUppercase, errors);
    validateCharacterClass(contrasena, PASSWORD_REGEX_LOWERCASE, errorMessages.passwordNoLowercase, errors);
    validateCharacterClass(contrasena, SPECIAL_CHARACTERS_REGEX, errorMessages.passwordNoSpecialChar, errors);

    return errors;
};

/**
 * Valida la longitud de la contraseña.
 * @param contrasena La contraseña a validar.
 * @param errors Lista de errores de validación.
 */
export const validateLength = (contrasena: string, errors: string[]) => {
    if (contrasena.length < PASSWORD_MIN_LENGTH) {
        errors.push(errorMessages.passwordTooShort);
    }
};

/**
 * Valida si la contraseña contiene al menos un carácter de la clase especificada.
 * @param contrasena La contraseña a validar.
 * @param characterClass Expresión regular que define la clase de caracteres.
 * @param errorMessage Mensaje de error si no se encuentra el carácter de la clase.
 * @param errors Lista de errores de validación.
 */
export const validateCharacterClass = (contrasena: string, characterClass: RegExp, errorMessage: string, errors: string[]) => {
    if (!characterClass.test(contrasena)) {
        errors.push(errorMessage);
    }
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

