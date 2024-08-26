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
exports.createVerificationEntry = void 0;
const VerificationModel_1 = require("../../models/VerificationModel");
const generateRandomVerificationCode_1 = require("./generateRandomVerificationCode ");
const VERIFICATION_CODE_EXPIRATION_HOURS = 24;
/**
 * Generar y guardar un código de verificación para un usuario.
 * @param userId - ID del usuario para el cual se generará el código.
 * @param email - Correo electrónico del usuario.
 * @returns El código de verificación generado.
 */
const createVerificationEntry = (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationCode = (0, generateRandomVerificationCode_1.generateRandomVerificationCode)();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + VERIFICATION_CODE_EXPIRATION_HOURS);
    yield VerificationModel_1.VerificationModel.create({
        isVerified: false,
        verificationCode: verificationCode,
        verificationCodeExpiration: expirationDate,
        userId: userId,
    });
    return verificationCode;
});
exports.createVerificationEntry = createVerificationEntry;
