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
exports.verifyUser = void 0;
const findUserByUsername_1 = require("./utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("./utils/errors/handleUserNotFoundError");
const handleServerError_1 = require("./utils/errors/handleServerError");
const checkUserVerificationStatus_1 = require("./utils/check/checkUserVerificationStatus");
const checkVerificationCodeIsvValid_1 = require("./utils/check/checkVerificationCodeIsvValid");
const checkVerificationCodeExpiration_1 = require("./utils/check/checkVerificationCodeExpiration ");
const markItInDatabase_1 = require("./utils/markItInDatabase/markItInDatabase");
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, verificationCode } = req.body;
        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        // Maneja el error si el usuario no existe
        (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        if (!user)
            return; // Si user es null, sale de la función
        // Verificar si el correo electrónico ya está verificado
        const isEmailVerified = (0, checkUserVerificationStatus_1.checkUserVerificationStatus)(user);
        // Maneja el error si el correo ya está verificado
        (0, checkUserVerificationStatus_1.handleEmailNotVerificationErroruser)(isEmailVerified, res);
        // Verifica si el código de verificación proporcionado es inválido.
        const isCodeValid = (0, checkVerificationCodeIsvValid_1.checkVerificationCodeIsValid)(user, verificationCode);
        // Maneja el error si el código de verificación proporcionado es inválido
        (0, checkVerificationCodeIsvValid_1.handleVerificationCodeIsValidError)(isCodeValid, res);
        const currentDate = new Date();
        // Verifica si el código de verificación ha expirado.
        const isCodeExpire = (0, checkVerificationCodeExpiration_1.checkVerificationCodeExpiration)(user, currentDate);
        console.log(`Código expirado: ${isCodeExpire}`);
        // Maneja el error si el código de verificación ha expirado.
        (0, checkVerificationCodeExpiration_1.handleEmailVerificationCodeExpirationError)(isCodeExpire, res);
        //Marca el email del usuario como verificado en la base de datos.
        yield (0, markItInDatabase_1.markEmailAsVerified)(user.id);
    }
    catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerError)(error, res);
    }
});
exports.verifyUser = verifyUser;
