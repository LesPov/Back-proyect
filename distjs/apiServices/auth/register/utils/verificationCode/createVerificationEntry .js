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
/**
 * Genera y guarda un código de verificación en la base de datos.
 * @param usuarioId ID del usuario.
 * @param email Dirección de correo electrónico.
 * @returns El código de verificación generado.
 */
const createVerificationEntry = (usuarioId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationCode = generateVerificationCode();
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getHours() + VERIFICATION_CODE_EXPIRATION_HOURS);
    yield Verificacion.create({
        usuario_id: usuarioId,
        verificado: false,
        correo_verificado: false,
        codigo_verificacion: verificationCode,
        expiracion_codigo_verificacion: expirationDate,
    });
    return verificationCode;
});
exports.createVerificationEntry = createVerificationEntry;
