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
exports.resendVerificationCode = void 0;
const findUserByUsername_1 = require("../utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("../utils/errors/handleUserNotFoundError");
const sendEmailVerificationCode_1 = require("../../register/utils/email/sendEmailVerificationCode");
const handleServerError_1 = require("../utils/errors/handleServerError");
const createOrUpdateVerificationEntry_1 = require("./utils/errors/createOrUpdateVerificationEntry");
const resendVerificationCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        // Maneja el error si el usuario no existe
        (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        if (!user)
            return; // Si user es null, sale de la función
        // Generar y guardar un código de verificación para el correo electrónico del usuario
        const newVerificationCode = yield (0, createOrUpdateVerificationEntry_1.createOrUpdateVerificationEntry)(user.id);
        // Enviar el correo electrónico de verificación al usuario con el nuevo código
        yield (0, sendEmailVerificationCode_1.sendVerificationEmail)(user.email, username, newVerificationCode);
        // Mensaje de éxito
        res.json({
            msg: 'Código de verificación reenviado exitosamente.',
        });
    }
    catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerError)(error, res);
    }
});
exports.resendVerificationCode = resendVerificationCode;
