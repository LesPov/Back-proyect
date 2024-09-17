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
exports.handleLoginAttempts = void 0;
const VerificationModel_1 = require("../../../../../middleware/models/VerificationModel");
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_DURATION_MINUTES = 30;
/**
 * Incrementa el contador de intentos de inicio de sesión fallidos.
 * @param userId - ID del usuario
 * @returns El número actualizado de intentos fallidos
 */
const incrementLoginAttempts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const verification = yield VerificationModel_1.VerificationModel.findOne({ where: { userId } });
    if (!verification) {
        throw new Error('Registro de verificación no encontrado');
    }
    verification.loginAttempts += 1;
    yield verification.save();
    return verification.loginAttempts;
});
/**
 * Resetea el contador de intentos de inicio de sesión y elimina el bloqueo.
 * @param userId - ID del usuario
 */
const resetLoginAttempts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield VerificationModel_1.VerificationModel.update({ loginAttempts: 0, blockExpiration: null }, { where: { userId } });
});
/**
 * Verifica si la cuenta está bloqueada.
 * @param verification - Objeto de verificación del usuario
 * @param res - Objeto de respuesta de Express
 * @returns true si la cuenta está bloqueada, false si no
 */
const isAccountBlocked = (verification, res) => {
    if (verification.blockExpiration && new Date() < verification.blockExpiration) {
        const remainingTime = Math.ceil((verification.blockExpiration.getTime() - new Date().getTime()) / 60000);
        res.status(403).json({
            msg: errorMessages_1.errorMessages.accountBlocked(remainingTime),
            errors: `Error: Cuenta bloqueada. Intente nuevamente en ${remainingTime} minutos.`,
        });
        return true;
    }
    return false;
};
/**
 * Maneja los intentos de inicio de sesión.
 * @param userId - ID del usuario
 * @param isPasswordValid - Indica si la contraseña es válida
 * @param res - Objeto de respuesta de Express
 * @returns true si el inicio de sesión es exitoso, false si no
 */
const handleLoginAttempts = (userId, isPasswordValid, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verification = yield VerificationModel_1.VerificationModel.findOne({ where: { userId } });
    if (!verification) {
        throw new Error('Registro de verificación no encontrado');
    }
    // Verificar si la cuenta está bloqueada
    if (isAccountBlocked(verification, res)) {
        return false;
    }
    if (isPasswordValid) {
        // Contraseña correcta, reiniciar intentos fallidos
        yield resetLoginAttempts(userId);
        return true;
    }
    else {
        // Contraseña incorrecta, incrementar intentos fallidos
        verification.loginAttempts += 1;
        if (verification.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            // Bloquear la cuenta
            verification.blockExpiration = new Date(Date.now() + BLOCK_DURATION_MINUTES * 60000);
            verification.loginAttempts = 0; // Opcional: reiniciar intentos después de bloqueo
            yield verification.save();
            res.status(403).json({
                msg: errorMessages_1.errorMessages.maxAttemptsReached,
                errors: `Error: Máximo de intentos alcanzado. Cuenta bloqueada por ${BLOCK_DURATION_MINUTES} minutos.`,
            });
            return false;
        }
        else {
            // Guardar los intentos fallidos
            yield verification.save();
            const remainingAttempts = MAX_LOGIN_ATTEMPTS - verification.loginAttempts;
            res.status(401).json({
                msg: errorMessages_1.errorMessages.incorrectPassword(remainingAttempts),
                errors: `Error: Contraseña incorrecta. Le quedan ${remainingAttempts} intentos.`,
            });
            return false;
        }
    }
});
exports.handleLoginAttempts = handleLoginAttempts;
