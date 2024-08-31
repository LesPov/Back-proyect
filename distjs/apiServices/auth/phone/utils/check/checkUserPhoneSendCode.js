"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePhoneVerificationError = exports.checkUserPhoneSendCode = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../../register/models/authModel");
/**
 * Verifica si el número de teléfono ya está registrado en la base de datos.
 * @param phoneNumber - El número de teléfono a verificar.
 * @returns {boolean} - Retorna true si el número de teléfono ya está registrado.
 */
const checkUserPhoneSendCode = async (phoneNumber) => {
    const userWithPhoneNumber = await authModel_1.AuthModel.findOne({
        where: { phoneNumber: phoneNumber }
    });
    return userWithPhoneNumber !== null;
};
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
