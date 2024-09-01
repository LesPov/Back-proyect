"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVerificationCode = exports.markEmailAsVerified = void 0;
const VerificationModel_1 = require("../../../register/models/VerificationModel");
/**
 * Marca el correo electrónico del usuario como verificado en la base de datos.
 *
 * @param userId - El ID del usuario cuyo correo electrónico se va a marcar como verificado.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
const markEmailAsVerified = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Actualiza el estado de verificación del correo electrónico en la base de datos
        yield VerificationModel_1.VerificationModel.update({ isEmailVerified: true }, // Campos a actualizar
        { where: { userId } } // Condición para seleccionar el registro correc to
        );
    }
    catch (error) {
        // Maneja cualquier error que ocurra durante la actualización
        throw new Error(`Error al marcar el correo electrónico como verificado`);
    }
});
exports.markEmailAsVerified = markEmailAsVerified;
/**
 * Elimina el código de verificación de la base de datos.
 *
 * @param userId - El ID del usuario cuyo código de verificación debe eliminarse.
 */
const removeVerificationCode = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield VerificationModel_1.VerificationModel.update({ verificationCode: null }, // Establece el código de verificación como null
        { where: { userId } });
    }
    catch (error) {
        console.error('Error al eliminar el código de verificación:', error);
        throw new Error('Error al eliminar el código de verificación');
    }
});
exports.removeVerificationCode = removeVerificationCode;
