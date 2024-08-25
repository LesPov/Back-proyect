"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validatePassword = exports.validateInput = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
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
// Definir la configuración para validaciones
const validationRules = [
    {
        test: (password) => password.length >= PASSWORD_MIN_LENGTH,
        errorMessage: errorMessages_1.errorMessages.passwordTooShort
    },
    {
        test: (password) => PASSWORD_REGEX_NUMBER.test(password),
        errorMessage: errorMessages_1.errorMessages.passwordNoNumber
    },
    {
        test: (password) => PASSWORD_REGEX_UPPERCASE.test(password),
        errorMessage: errorMessages_1.errorMessages.passwordNoUppercase
    },
    {
        test: (password) => PASSWORD_REGEX_LOWERCASE.test(password),
        errorMessage: errorMessages_1.errorMessages.passwordNoLowercase
    },
    {
        test: (password) => SPECIAL_CHARACTERS_REGEX.test(password),
        errorMessage: errorMessages_1.errorMessages.passwordNoSpecialChar
    }
];
/**
 * Valida la contraseña según los requisitos.
 * @param contrasena La contraseña a validar.
 * @returns Lista de errores de validación de la contraseña.
 */
const validatePassword = (contrasena) => {
    const errors = [];
    validationRules.forEach(rule => {
        if (!rule.test(contrasena)) {
            errors.push(rule.errorMessage);
        }
    });
    return errors;
};
exports.validatePassword = validatePassword;
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
