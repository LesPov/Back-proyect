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
exports.verifyPhoneNumber = void 0;
const handleInputValidationErrors_1 = require("../../register/utils/errors/handleInputValidationErrors");
const validateInput_1 = require("./utils/validations/validateInput");
const handleServerError_1 = require("./utils/errors/handleServerError");
const findUserByUsername_1 = require("../utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("../utils/errors/handleUserNotFoundError");
const checkUserVerificationStatus_1 = require("../utils/check/checkUserVerificationStatus");
const checkUserVerificationStatusPhone_1 = require("./utils/check/checkUserVerificationStatusPhone");
const checkUserPhoneNumberAssociation_1 = require("./utils/check/checkUserPhoneNumberAssociation");
const checkVerificationCodeIsvValid_1 = require("../../email/utils/check/checkVerificationCodeIsvValid");
const checkVerificationCodeExpiration_1 = require("../../email/utils/check/checkVerificationCodeExpiration");
const marckisPhoneVerified_1 = require("./utils/markItInDatabase/marckisPhoneVerified");
const sendWhatsAppMessage_1 = require("../utils/send/sendWhatsAppMessage");
const markItInDatabase_1 = require("../../email/utils/markItInDatabase/markItInDatabase");
const successMessages_1 = require("../../../../middleware/success/successMessages");
/**
 * Verifica el número de teléfono del usuario en función del código de verificación.
 * @param req - Objeto de solicitud HTTP proporcionado por Express.
 * @param res - Objeto de respuesta HTTP proporcionado por Express.
 */
const verifyPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validación de entrada
        // Extrae los parámetros necesarios del cuerpo de la solicitud.
        const { username, phoneNumber, verificationCode } = req.body;
        // Valida los datos de entrada y obtiene cualquier error de validación.
        const inputValidationErrors = (0, validateInput_1.validateInputVerifyCode)(username, phoneNumber, verificationCode);
        // Maneja los errores de validación si los hay.
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario si existe
        // Busca al usuario en la base de datos por su nombre de usuario.
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        if (!user) {
            // Si el usuario no existe, maneja el error y termina el flujo.
            return (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        }
        // 3. Verificación del estado del usuario Email
        // Verifica si el correo electrónico del usuario ha sido verificado.
        const isEmailVerified = (0, checkUserVerificationStatus_1.checkUserVerificationStatusEmail)(user);
        // Maneja el caso en el que el correo electrónico no está verificado.
        (0, checkUserVerificationStatus_1.handleEmailNotVerificationErroruser)(isEmailVerified, res);
        // 4. Verificación del estado del usuario Phone
        // Verifica si el número de teléfono del usuario ya está verificado.
        const isPhoneNumberVerified = (0, checkUserVerificationStatusPhone_1.checkUserVerificationStatusPhone)(user);
        // Maneja el caso en el que el número de teléfono ya está verificado.
        (0, checkUserVerificationStatusPhone_1.handlePhoneNotVerificationErroruser)(isPhoneNumberVerified, res);
        // 5. Validar si el número de teléfono coincide con el almacenado en la base de datos
        const isPhoneNumberAssociated = (0, checkUserPhoneNumberAssociation_1.checkUserPhoneNumberAssociationCode)(user, phoneNumber);
        (0, checkUserPhoneNumberAssociation_1.handlePhoneNumberAssociationCodeError)(isPhoneNumberAssociated, res);
        // 6. Verifica si el código de verificación proporcionado es inválido.
        const isCodeValid = (0, checkVerificationCodeIsvValid_1.checkVerificationCodeIsValid)(user, verificationCode);
        // Maneja el error si el código de verificación proporcionado es inválido
        (0, checkVerificationCodeIsvValid_1.handleVerificationCodeIsValidError)(isCodeValid, res);
        const currentDate = new Date();
        // Verifica si el código de verificación ha expirado.
        const isCodeExpire = (0, checkVerificationCodeExpiration_1.checkVerificationCodeExpiration)(user, currentDate);
        console.log(`Código expirado: ${isCodeExpire}`);
        // Maneja el error si el código de verificación ha expirado.
        (0, checkVerificationCodeExpiration_1.handleVerificationCodeExpirationError)(isCodeExpire, res);
        // 8. Marca el número de teléfono como verificado en la base de datos.
        // Actualiza el estado del número de teléfono del usuario a verificado en la base de datos.
        yield (0, marckisPhoneVerified_1.markisPhoneVerified)(user.id);
        // 9. Marca al usuario como completamente verificado si tanto el email como el teléfono están verificados.
        // Actualiza el estado general de verificación del usuario en la base de datos si ambos campos están verificados.
        yield (0, marckisPhoneVerified_1.markisVerified)(user.id);
        // 10. Elimina el código de verificación de la base de datos
        // Borra el código de verificación almacenado para evitar su reutilización.
        yield (0, markItInDatabase_1.removeVerificationCode)(user.id);
        // 11. Responde con éxito si todas las validaciones y actualizaciones se completan correctamente
        // Envía una respuesta exitosa al cliente indicando que el número de teléfono ha sido verificado.
        res.status(200).json({
            msg: successMessages_1.successMessages.phoneVerified,
        });
        // 12. Mensaje de verificación para enviar
        // Prepara y envía un mensaje por WhatsApp confirmando la verificación del número de teléfono.
        const message = `Hola ${username}, tu número de teléfono ha sido verificado exitosamente. Ya puedes iniciar sesión en tu cuenta.`;
        console.log('El mensaje enviado fue:', message);
        // Enviar el mensaje de verificación por WhatsApp
        yield (0, sendWhatsAppMessage_1.sendWhatsAppMessage)(phoneNumber, message);
    }
    catch (error) {
        // Maneja errores generales del servidor y responde con un mensaje de error.
        (0, handleServerError_1.handleServerErrorVerifyCode)(error, res);
    }
});
exports.verifyPhoneNumber = verifyPhoneNumber;
