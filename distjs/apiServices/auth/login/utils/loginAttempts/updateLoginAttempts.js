"use strict";
// utils/updateLoginAttempts.ts
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
exports.incrementLoginAttempts = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
/**
 * Incrementa el contador de intentos de inicio de sesión de un usuario.
 * Maneja el caso cuando se alcanza el máximo de intentos permitidos.
 * @param user - El usuario cuyo contador de intentos de inicio de sesión se incrementará.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @returns Un booleano que indica si se alcanzó el máximo de intentos.
 */
const incrementLoginAttempts = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const MAX_LOGIN_ATTEMPTS = 5;
    const currentAttempts = user.verification.loginAttempts || 0;
    const updatedLoginAttempts = currentAttempts + 1;
    // Actualiza los intentos en la base de datos
    yield user.verification.update({ loginAttempts: updatedLoginAttempts });
    if (updatedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
        // Maneja el caso cuando se alcanzan los intentos máximos
        const errorMsg = errorMessages_1.errorMessages;
        res.status(403).json({
            msg: 'erro loka',
            errors: 'Error: Has alcanzado el máximo de intentos de inicio de sesión. Por favor, intenta más tarde.',
        });
        return true;
    }
    return false;
});
exports.incrementLoginAttempts = incrementLoginAttempts;
