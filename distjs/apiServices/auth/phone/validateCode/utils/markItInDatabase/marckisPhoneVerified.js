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
exports.markisVerified = exports.markisPhoneVerified = void 0;
const VerificationModel_1 = require("../../../../../../middleware/models/VerificationModel");
/**
 * Marca el isPhoneVerified del usuario como verificado en la base de datos.
 *
 * @param userId - El ID del usuario cuyo markisPhoneVerified se va a marcar como verificado.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
const markisPhoneVerified = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Actualiza el estado de verificación del markisPhoneVerified en la base de datos
        yield VerificationModel_1.VerificationModel.update({ isPhoneVerified: true }, // Campos a actualizar
        { where: { userId } } // Condición para seleccionar el registro correc to
        );
    }
    catch (error) {
        // Maneja cualquier error que ocurra durante la actualización
        throw new Error(`Error al marcar el teléfono como verificado`);
    }
});
exports.markisPhoneVerified = markisPhoneVerified;
/**
 * Marca el isVerified del usuario como verificado en la base de datos si ya están verificados isEmailVerified & isPhoneVerified.
 *
 * @param userId - El ID del usuario cuyo estado de verificación se va a actualizar.
 * @returns - Una promesa que resuelve cuando la actualización está completa.
 */
const markisVerified = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el estado actual del usuario
        const verificationData = yield VerificationModel_1.VerificationModel.findOne({
            where: { userId },
            attributes: ['isEmailVerified', 'isPhoneVerified']
        });
        if (!verificationData) {
            throw new Error('Datos de verificación no encontrados');
        }
        // Verifica si ambos campos están marcados como verdaderos
        if (verificationData.isEmailVerified && verificationData.isPhoneVerified) {
            yield VerificationModel_1.VerificationModel.update({ isVerified: true }, // Campos a actualizar
            { where: { userId } } // Condición para seleccionar el registro correcto
            );
        }
        else {
            throw new Error('No se puede marcar como verificado, uno o ambos campos de verificación están incompletos');
        }
    }
    catch (error) {
        throw new Error(`Error al marcar la verificación completa`);
    }
});
exports.markisVerified = markisVerified;
