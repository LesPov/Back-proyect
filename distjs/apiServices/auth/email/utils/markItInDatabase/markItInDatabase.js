"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVerificationCode = exports.markEmailAsVerified = void 0;
const VerificationModel_1 = require("../../../register/models/VerificationModel");
/**
 * Marca el correo electrónico del usuario como verificado en la base de datos.
 *
 * @param userId - El ID del usuario cuyo correo electrónico se va a marcar como verificado.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
const markEmailAsVerified = async (userId) => {
    try {
        // Actualiza el estado de verificación del correo electrónico en la base de datos
        await VerificationModel_1.VerificationModel.update({ isEmailVerified: true }, // Campos a actualizar
        { where: { userId } } // Condición para seleccionar el registro correc to
        );
    }
    catch (error) {
        // Maneja cualquier error que ocurra durante la actualización
        throw new Error(`Error al marcar el correo electrónico como verificado`);
    }
};
exports.markEmailAsVerified = markEmailAsVerified;
/**
 * Elimina el código de verificación de la base de datos.
 *
 * @param userId - El ID del usuario cuyo código de verificación debe eliminarse.
 */
const removeVerificationCode = async (userId) => {
    try {
        await VerificationModel_1.VerificationModel.update({ verificationCode: null }, // Establece el código de verificación como null
        { where: { userId } });
    }
    catch (error) {
        console.error('Error al eliminar el código de verificación:', error);
        throw new Error('Error al eliminar el código de verificación');
    }
};
exports.removeVerificationCode = removeVerificationCode;
