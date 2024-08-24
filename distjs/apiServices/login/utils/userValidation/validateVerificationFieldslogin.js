"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerificationFieldslogin = void 0;
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Validar campos requeridos para el envío de .
 * @param usuario Nombre de usuario.
 * @param contraseña  Contraseña proporcionada.
 * @returns Array de mensajes de error, vacío si no hay errores.
 */
const validateVerificationFieldslogin = (usernameOrEmail, contrasena) => {
    const errors = [];
    if (!usernameOrEmail || !contrasena) {
        errors.push(errorMessages_1.errorMessages.missingUsernameOrEmail);
    }
    else if (!EMAIL_REGEX.test(usernameOrEmail) && !/^[a-zA-Z0-9_]+$/.test(usernameOrEmail)) {
        errors.push(errorMessages_1.errorMessages.invalidEmail);
    }
    return errors;
};
exports.validateVerificationFieldslogin = validateVerificationFieldslogin;
