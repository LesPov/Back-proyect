"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateCharacterClass = exports.validateLength = exports.validatePassword = exports.validateInput = void 0;
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
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
const validateInput = (username, contrasena, email, rol) => {
    const errors = [];
    if (!username) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInput = validateInput;
/**
 * Valida la contraseña según los requisitos.
 * @param contrasena La contraseña a validar.
 * @returns Lista de errores de validación de la contraseña.
 */
const validatePassword = (contrasena) => {
    const errors = [];
    (0, exports.validateLength)(contrasena, errors);
    (0, exports.validateCharacterClass)(contrasena, PASSWORD_REGEX_NUMBER, errorMessages_1.errorMessages.passwordNoNumber, errors);
    (0, exports.validateCharacterClass)(contrasena, PASSWORD_REGEX_UPPERCASE, errorMessages_1.errorMessages.passwordNoUppercase, errors);
    (0, exports.validateCharacterClass)(contrasena, PASSWORD_REGEX_LOWERCASE, errorMessages_1.errorMessages.passwordNoLowercase, errors);
    (0, exports.validateCharacterClass)(contrasena, SPECIAL_CHARACTERS_REGEX, errorMessages_1.errorMessages.passwordNoSpecialChar, errors);
    return errors;
};
exports.validatePassword = validatePassword;
/**
 * Valida la longitud de la contraseña.
 * @param contrasena La contraseña a validar.
 * @param errors Lista de errores de validación.
 */
const validateLength = (contrasena, errors) => {
    if (contrasena.length < PASSWORD_MIN_LENGTH) {
        errors.push(errorMessages_1.errorMessages.passwordTooShort);
    }
};
exports.validateLength = validateLength;
/**
 * Valida si la contraseña contiene al menos un carácter de la clase especificada.
 * @param contrasena La contraseña a validar.
 * @param characterClass Expresión regular que define la clase de caracteres.
 * @param errorMessage Mensaje de error si no se encuentra el carácter de la clase.
 * @param errors Lista de errores de validación.
 */
const validateCharacterClass = (contrasena, characterClass, errorMessage, errors) => {
    if (!characterClass.test(contrasena)) {
        errors.push(errorMessage);
    }
};
exports.validateCharacterClass = validateCharacterClass;
/**
 * Valida el formato del correo electrónico.
 * @param email El correo electrónico a validar.
 * @returns Lista de errores de validación del correo electrónico.
 */
const validateEmail = (email) => {
    const errors = [];
    if (!EMAIL_REGEX.test(email)) {
        errors.push(errorMessages_1.errorMessages.invalidEmail);
    }
    return errors;
};
exports.validateEmail = validateEmail;
