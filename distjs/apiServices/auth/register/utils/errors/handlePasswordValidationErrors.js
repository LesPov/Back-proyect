"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePasswordValidationErrors = void 0;
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
        throw new Error("Register Pasword validation failed");
    }
};
exports.handlePasswordValidationErrors = handlePasswordValidationErrors;
