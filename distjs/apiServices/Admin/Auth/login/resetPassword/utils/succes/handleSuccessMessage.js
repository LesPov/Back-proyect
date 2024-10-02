"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccessMessageResetNewPassword = void 0;
const successMessages_1 = require("../../../../../../../middleware/success/successMessages");
/**
 * Envía una respuesta de éxito al cliente cuando el correo de restablecimiento de contraseña se ha enviado correctamente.
 *
 * @param {Response} res - Objeto de respuesta de Express.
 *
 * La función envía una respuesta HTTP con el estado 200 (OK) y un mensaje de éxito indicando que se ha enviado un correo electrónico de restablecimiento de contraseña. El mensaje se obtiene desde la lista de mensajes de éxito (`successMessages`).
 */
const handleSuccessMessageResetNewPassword = (res) => {
    res.status(200).json({
        msg: successMessages_1.successMessages.passwordUpdated(),
    });
};
exports.handleSuccessMessageResetNewPassword = handleSuccessMessageResetNewPassword;
