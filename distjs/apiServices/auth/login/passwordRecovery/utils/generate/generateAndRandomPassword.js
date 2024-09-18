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
exports.generateRandomPassword = exports.generateAndSetRandomPassword = void 0;
const VerificationModel_1 = require("../../../../../../middleware/models/VerificationModel");
/**
 * Genera una contraseña aleatoria, la almacena en el modelo de verificación y establece un tiempo de expiración.
 * @param {number} verificationId - ID de la entrada de verificación a actualizar.
 * @returns {Promise<string>} - La nueva contraseña generada.
 */
const generateAndSetRandomPassword = (verificationId) => __awaiter(void 0, void 0, void 0, function* () {
    // Genera una contraseña aleatoria de 8 dígitos
    const randomPassword = (0, exports.generateRandomPassword)(8);
    // Calcula el tiempo de expiración (5 minutos a partir de ahora)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
    // Actualiza la entrada de verificación con la nueva contraseña y su tiempo de expiración
    yield VerificationModel_1.VerificationModel.update({
        randomPassword: randomPassword,
        verificationCodeExpiration: expirationTime
    }, { where: { userId: verificationId } } // Usa 'userId' en lugar de 'id' si es la clave foránea
    );
    // Borra la contraseña después de 5 minutos
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield VerificationModel_1.VerificationModel.update({ randomPassword: '' }, // Limpia la contraseña
        { where: { userId: verificationId } } // Usa 'userId' en lugar de 'id'
        );
    }), 5 * 60 * 1000); // 5 minutos en milisegundos
    // Retorna la nueva contraseña
    return randomPassword;
});
exports.generateAndSetRandomPassword = generateAndSetRandomPassword;
/**
 * Genera una contraseña aleatoria.
 * @param {number} length - Longitud de la contraseña generada.
 * @returns {string} - Contraseña aleatoria.
 */
const generateRandomPassword = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPassword = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPassword += characters.charAt(randomIndex);
    }
    return randomPassword;
};
exports.generateRandomPassword = generateRandomPassword;
