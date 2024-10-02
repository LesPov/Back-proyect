"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewPasswordValidationErrors = exports.validateNewPassword = void 0;
const registerValidations_1 = require("./registerValidations");
/**
 * Valida la newPassword según los requisitos especificados.
 *
 * Esta función comprueba si la newPassword cumple con varios requisitos de seguridad,
 * como longitud mínima, presencia de números, mayúsculas, minúsculas y caracteres especiales.
 * Si la newPassword no cumple con alguno de los requisitos, se agrega un mensaje de error a la lista de errores.
 *
 * @param {string} newPassword - La newPassword a validar. Debe cumplir con los requisitos especificados.
 * @returns {string[]} - Lista de mensajes de error si la newPassword no cumple con los requisitos, de lo contrario, una lista vacía.
 */
const validateNewPassword = (newPassword) => {
    console.log('Contraseña recibida:', newPassword); // Agrega esta línea para depuración
    const errors = [];
    registerValidations_1.validationRules.forEach(rule => {
        if (!rule.test(newPassword)) {
            errors.push(rule.errorMessage);
        }
    });
    return errors;
};
exports.validateNewPassword = validateNewPassword;
/**
 * Maneja los errores de validación de la newPassword.
 *
 * Esta función procesa una lista de errores relacionados con la validación de la newPassword
 * y envía una respuesta HTTP con un código de estado 400 (Bad Request) si se detectan errores.
 * La respuesta incluye un mensaje que describe los errores encontrados. La función también
 * lanza una excepción para interrumpir la ejecución en caso de errores de validación de la newPassword.
 *
 * @param {string[]} errors - Lista de errores de validación de la newPassword que indican
 *                            problemas con la newPassword proporcionada.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado
 *                          para enviar la respuesta de error al cliente.
 *
 * @throws {Error} Lanza una excepción con el mensaje "newPassword validation failed" si se
 *                 encuentran errores de validación de la newPassword, interrumpiendo la
 *                 ejecución del código posterior.
 */
const handleNewPasswordValidationErrors = (errors, res) => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: 'Error en la validación de la newPassword',
        });
        throw new Error("newPassword validation failed");
    }
};
exports.handleNewPasswordValidationErrors = handleNewPasswordValidationErrors;
