"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const findUserByUsername_1 = require("./utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("./utils/errors/handleUserNotFoundError");
const handleServerError_1 = require("./utils/errors/handleServerError");
const checkUserVerificationStatus_1 = require("./utils/check/checkUserVerificationStatus");
const checkVerificationCodeIsvValid_1 = require("./utils/check/checkVerificationCodeIsvValid");
const checkVerificationCodeExpiration_1 = require("./utils/check/checkVerificationCodeExpiration");
const markItInDatabase_1 = require("./utils/markItInDatabase/markItInDatabase");
const successMessages_1 = require("../../../middleware/success/successMessages");
const verifyUser = async (req, res) => {
    try {
        const { username, verificationCode } = req.body;
        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = await (0, findUserByUsername_1.findUserByUsername)(username);
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
        await (0, markItInDatabase_1.markEmailAsVerified)(user.id);
        // Elimina el código de verificación de la base de datos
        await (0, markItInDatabase_1.removeVerificationCode)(user.id);
        //Mensege de exito 
        res.json({
            msg: successMessages_1.successMessages.userVerified,
        });
    }
    catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerError)(error, res);
    }
};
exports.verifyUser = verifyUser;
