"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrorResetPassword = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
/**
 * Maneja errores internos del servidor.
 *
 * Esta función procesa un error interno del servidor y envía una respuesta HTTP con un
 * código de estado 400 (Bad Request) al cliente. El mensaje del error se incluye en la
 * respuesta, junto con un mensaje genérico para errores de base de datos. La función también
 * registra el error en la consola y lanza una excepción para interrumpir la ejecución en
 * caso de un error interno en el controlador.
 *
 * @param {any} error - El error ocurrido que se debe manejar. Este parámetro puede ser
 *                      cualquier objeto de error que contenga un mensaje y detalles
 *                      sobre el problema que ocurrió.
 * @param {Response} res - Objeto de respuesta HTTP proporcionado por Express, utilizado
 *                          para enviar la respuesta de error al cliente.
 *
 * @throws {Error} Lanza una excepción con el mensaje "Controller resetPassword error" si se
 *                 maneja un error interno del servidor, interrumpiendo la ejecución del
 *                 código posterior.
 */
const handleServerErrorResetPassword = (error, res) => {
    console.error("Error en el controlador resetPassword:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
        throw new Error("Controller resetPassword error");
    }
};
exports.handleServerErrorResetPassword = handleServerErrorResetPassword;
