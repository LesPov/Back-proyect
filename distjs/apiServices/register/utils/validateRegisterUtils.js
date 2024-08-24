"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const errorMessages_1 = require("../../../middleware/erros/errorMessages");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Valida el formato del correo electrónico.
 * @param email El correo electrónico a validar.
 */
const validateEmail = (email) => {
    if (!EMAIL_REGEX.test(email)) {
        throw new Error(errorMessages_1.errorMessages.invalidEmail);
    }
};
exports.validateEmail = validateEmail;
