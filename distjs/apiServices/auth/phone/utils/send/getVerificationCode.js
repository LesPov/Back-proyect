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
exports.getVerificationCode = void 0;
const VerificationModel_1 = require("../../../../../middleware/models/VerificationModel");
/**
 * Recupera el código de verificación para un usuario específico.
 *
 * @param {number} userId - El ID del usuario para el cual se recuperará el código de verificación.
 * @returns {Promise<string | null>} - El código de verificación recuperado, o null si no se encuentra.
 */
const getVerificationCode = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationEntry = yield VerificationModel_1.VerificationModel.findOne({
        where: { userId: userId, isVerified: false },
        order: [['createdAt', 'DESC']] // Ordenar por fecha de creación para obtener el más reciente
    });
    if (verificationEntry) {
        return verificationEntry.verificationCode;
    }
    else {
        return null;
    }
});
exports.getVerificationCode = getVerificationCode;
