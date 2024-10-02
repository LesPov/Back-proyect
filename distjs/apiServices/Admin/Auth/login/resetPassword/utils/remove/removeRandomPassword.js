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
exports.removerandomPassword = void 0;
const VerificationModel_1 = require("../../../../../../../middleware/models/VerificationModel");
/**
 * Elimina el randomPassword de verificación de la base de datos.
 *
 * @param userId - El ID del usuario cuyo randomPassword de verificación debe eliminarse.
 */
const removerandomPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield VerificationModel_1.VerificationModel.update({ randomPassword: null }, // Establece el randomPassword de verificación como null
        { where: { userId } });
    }
    catch (error) {
        console.error('Error al eliminar el randomPassword de verificación:', error);
        throw new Error('Error al eliminar el randomPassword de verificación');
    }
});
exports.removerandomPassword = removerandomPassword;
