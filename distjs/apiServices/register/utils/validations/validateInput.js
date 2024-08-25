"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const errorMessages_1 = require("../../../../middleware/erros/errorMessages");
/**
 * Valida que los campos de entrada no estén vacíos.
 * @param username Nombre de usuario.
 * @param contrasena Contraseña.
 * @param email Dirección de correo electrónico.
 * @param rol Rol del usuario.
 */
const validateInput = (username, contrasena, email, rol) => {
    const errors = [];
    if (!username) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInput = validateInput;
