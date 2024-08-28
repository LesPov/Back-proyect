"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserNotFoundError = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
/**
 * Maneja el error cuando un usuario no existe en la base de datos.
 *
 * Esta función verifica si el usuario es `null` y, en caso afirmativo, envía una respuesta HTTP
 * con un código de estado 404 (Not Found) y un mensaje de error indicando que el usuario no existe.
 *
 * @param {string} username - El nombre de usuario que se buscó en la base de datos.
 * @param {any} user - El usuario encontrado o `null` si no existe.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado
 *                          para enviar la respuesta de error al cliente.
 *
 * @throws {Error} Lanza una excepción si el usuario no existe, interrumpiendo la ejecución del
 *                 código posterior.
 */
const handleUserNotFoundError = (username, user, res) => {
    if (!user) {
        res.status(404).json({
            msg: errorMessages_1.errorMessages.userNotExists,
            errors: `El usuario ${username} no se encuentra en la base de datos`,
        });
        throw new Error(`User not found: ${username}`);
    }
};
exports.handleUserNotFoundError = handleUserNotFoundError;
