"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmailValidationErrors = exports.validateEmail = exports.handlePasswordValidationErrors = exports.validateCharacterClass = exports.validateLength = exports.validatePassword = exports.handleInputValidationErrors = exports.validateInput = void 0;
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
    // ... (validar otros campos)
    return errors;
};
exports.validateInput = validateInput;
/**
 * Maneja los errores de validación de la entrada de datos.
 * @param errors Lista de errores de validación.
 * @param res La respuesta HTTP saliente.
 * @throws {Error} Si hay errores de validación, se lanza un error con el mensaje "Input validation failed".
 */
const handleInputValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        console.log("Validation errors:", errors); // Agrega esta línea para imprimir los errores
        // Concatenar los mensajes de error en una cadena
        const errorMessage = errors.join('. ');
        // Responder con un JSON de error y código de estado 400  
        res.status(400).json({
            msg: errorMessage,
            errors: `Error en la validación de la entrada de datos`,
        });
        // Lanzar un error para indicar que la validación de entrada ha fallado
        throw new Error("Input validation failed");
    }
};
exports.handleInputValidationErrors = handleInputValidationErrors;
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
 * Maneja los errores de validación de la contraseña.
 * @param errors Lista de errores de validación de la contraseña.
 * @param res La respuesta HTTP saliente.
 */
const handlePasswordValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: 'Error en la validación de la contraseña',
        });
        throw new Error("Password validation failed");
    }
};
exports.handlePasswordValidationErrors = handlePasswordValidationErrors;
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
/**
 * Maneja los errores de validación del correo electrónico.
 * @param errors Lista de errores de validación del correo electrónico.
 * @param res La respuesta HTTP saliente.
 */
const handleEmailValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: 'Error en la validación del correo electrónico',
        });
        throw new Error("Email validation failed");
    }
};
exports.handleEmailValidationErrors = handleEmailValidationErrors;
