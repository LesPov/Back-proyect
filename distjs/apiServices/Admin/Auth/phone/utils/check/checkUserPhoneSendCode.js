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
exports.handlePhoneVerificationError = exports.checkUserPhoneSendCode = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../../../../../middleware/models/authModel");
/**
 * Verifica si el número de teléfono ya está registrado en la base de datos.
 * @param phoneNumber - El número de teléfono a verificar.
 * @returns {boolean} - Retorna true si el número de teléfono ya está registrado.
 */
const checkUserPhoneSendCode = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithPhoneNumber = yield authModel_1.AuthModel.findOne({
        where: { phoneNumber: phoneNumber }
    });
    return userWithPhoneNumber !== null;
});
exports.checkUserPhoneSendCode = checkUserPhoneSendCode;
/**
 * Maneja el error si el número de teléfono ya está registrado.
 * @param isPhoneNumberRegistered - Booleano indicando si el número de teléfono ya está registrado.
 * @param res - Objeto de respuesta de Express.
 */
const handlePhoneVerificationError = (isPhoneNumberRegistered, res) => {
    if (isPhoneNumberRegistered) {
        const errorMsg = errorMessages_1.errorMessages.phoneNumberExists;
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El número de teléfono ya ha sido registrado en la base de datos. Ingresa otro.',
        });
        throw new Error("Phone number already exists in the database.");
    }
};
exports.handlePhoneVerificationError = handlePhoneVerificationError;
