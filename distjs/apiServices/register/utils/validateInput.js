"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const errorMessages_1 = require("../../../middleware/errorMessages");
/**
 * Valida que los campos de entrada no estén vacíos.
 * @param usuario Nombre de usuario.
 * @param contrasena Contraseña.
 * @param email Dirección de correo electrónico.
 * @param rol Rol del usuario.
 */
const validateInput = (usuario, contrasena, email, rol) => {
    const errors = [];
    if (!usuario) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    // ... (validar otros campos)
    return errors;
};
exports.validateInput = validateInput;
