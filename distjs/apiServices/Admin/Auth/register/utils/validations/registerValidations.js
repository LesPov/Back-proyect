"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validatePassword = exports.validationRules = exports.validateInput = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
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
 * @param {string} password - Contraseña. Debe estar presente.
 * @param {string} email - Dirección de correo electrónico. Debe estar presente.
 * @param {string} rol - Rol del usuario. Debe estar presente.
 * @returns {string[]} - Lista de mensajes de error si alguno de los campos está vacío, de lo contrario, una lista vacía.
 */
const validateInput = (username, password, email, rol) => {
    const errors = [];
    if (!username || !password || !email || !rol) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInput = validateInput;
// Definir la configuración para validaciones
exports.validationRules = [
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
 * Valida la contraseña según los requisitos especificados.
 *
 * Esta función comprueba si la contraseña cumple con varios requisitos de seguridad,
 * como longitud mínima, presencia de números, mayúsculas, minúsculas y caracteres especiales.
 * Si la contraseña no cumple con alguno de los requisitos, se agrega un mensaje de error a la lista de errores.
 *
 * @param {string} password - La contraseña a validar. Debe cumplir con los requisitos especificados.
 * @returns {string[]} - Lista de mensajes de error si la contraseña no cumple con los requisitos, de lo contrario, una lista vacía.
 */
const validatePassword = (password) => {
    console.log('Contraseña recibida:', password); // Agrega esta línea para depuración
    const errors = [];
    for (const rule of exports.validationRules) {
        if (!rule.test(password)) {
            errors.push("La contraseña es inválida y no cumple con los requisitos.");
            break; // Detener la validación después del primer error
        }
    }
    return errors;
};
exports.validatePassword = validatePassword;
/**
 * Valida el formato del correo electrónico.
 *
 * Esta función verifica si el formato del correo electrónico es válido utilizando una expresión regular.
 * Si el formato del correo electrónico no es válido, se agrega un mensaje de error a la lista de errores.
 *
 * @param {string} email - El correo electrónico a validar. Debe tener un formato válido.
 * @returns {string[]} - Lista de mensajes de error si el correo electrónico no tiene un formato válido, de lo contrario, una lista vacía.
 */
const validateEmail = (email) => {
    const errors = [];
    if (!EMAIL_REGEX.test(email)) {
        errors.push(errorMessages_1.errorMessages.invalidEmail);
    }
    return errors;
};
exports.validateEmail = validateEmail;
