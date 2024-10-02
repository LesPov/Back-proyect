"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserNotFoundError = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Maneja el error cuando un usuario no es encontrado en la base de datos.
 *
 * @param user - El objeto de usuario retornado por la consulta a la base de datos.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 *
 * @throws Lanza una excepción si el usuario no fue encontrado.
 */
const handleUserNotFoundError = (username, user, res) => {
    if (!user) {
        const errorMsg = errorMessages_1.errorMessages.userNotFound(username);
        res.status(404).json({
            msg: errorMsg,
            errors: 'Error: El usuario no fue encontrado en la base de datos.',
        });
        throw new Error("User not found validation failed");
    }
};
exports.handleUserNotFoundError = handleUserNotFoundError;
