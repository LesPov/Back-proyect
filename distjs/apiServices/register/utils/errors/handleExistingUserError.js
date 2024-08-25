"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExistingUserError = void 0;
/**
 * Maneja los errores relacionados con la existencia de un usuario.
 * @param error Mensaje de error si el usuario ya existe, de lo contrario, null.
 * @param res La respuesta HTTP saliente.
 */
const handleExistingUserError = (error, res) => {
    if (error) {
        res.status(400).json({
            msg: error,
            errors: 'Error usuario o correo ya existe.',
        });
        throw new Error("Password validation failed");
    }
};
exports.handleExistingUserError = handleExistingUserError;
