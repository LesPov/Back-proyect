"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputValidationErrors = void 0;
/**
 * Maneja los errores de validación de la entrada de datos.
 * @param errors Lista de errores de validación.
 * @param res La respuesta HTTP saliente.
 * @throws {Error} Si hay errores de validación, se lanza un error con el mensaje "Input validation failed".
 */
const handleInputValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
        throw new Error("Register requiredFields validation failed");
    }
};
exports.handleInputValidationErrors = handleInputValidationErrors;
