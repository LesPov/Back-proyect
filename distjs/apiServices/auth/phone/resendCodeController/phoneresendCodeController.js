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
exports.resendVerificationCodePhone = void 0;
const findUserByUsername_1 = require("../utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("../utils/errors/handleUserNotFoundError");
const successMessages_1 = require("../../../../middleware/success/successMessages");
const sendWhatsAppMessage_1 = require("../utils/send/sendWhatsAppMessage");
const createOrUpdateVerificationEntry_1 = require("../../email/resendCode/utils/errors/createOrUpdateVerificationEntry");
const handleServerErrorResendCode_1 = require("./utils/errors/handleServerErrorResendCode");
const validateInputVerifyCodeResend_1 = require("./utils/validations/validateInputVerifyCodeResend");
const handleInputValidationErrors_1 = require("../../register/utils/errors/handleInputValidationErrors");
/**
 * Controlador para reenvío del código de verificación por SMS.
 * Este controlador se encarga de generar un nuevo código de verificación y reenviarlo al usuario a través de WhatsApp.
 * @param req - Objeto de solicitud HTTP proporcionado por Express, que contiene los datos del usuario.
 * @param res - Objeto de respuesta HTTP proporcionado por Express, que envía una respuesta al cliente.
 */
const resendVerificationCodePhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validación de entrada
        // Extrae los datos necesarios del cuerpo de la solicitud (nombre de usuario y número de teléfono).
        const { username, phoneNumber } = req.body;
        // Valida los datos de entrada y obtiene cualquier error de validación.
        const inputValidationErrors = (0, validateInputVerifyCodeResend_1.validateInputVerifyCodeResend)(username, phoneNumber);
        // Maneja los errores de validación si los hay.
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario en la base de datos
        // Busca al usuario en la base de datos utilizando el nombre de usuario proporcionado.
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        // Si el usuario no existe en la base de datos, maneja el error y detiene el flujo.
        if (!user) {
            return (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        }
        // 3. Generación de nuevo código de verificación
        // Crea o actualiza la entrada de verificación con un nuevo código para el usuario en la base de datos.
        const newVerificationCode = yield (0, createOrUpdateVerificationEntry_1.createOrUpdateVerificationEntry)(user.id);
        // 4. Envío del mensaje por WhatsApp
        // Crea un mensaje de verificación que será enviado al usuario por WhatsApp.
        const message = `Hola ${username}, tu nuevo código de verificación es ${newVerificationCode}. Por favor, úsalo para verificar tu número de teléfono.`;
        console.log('El mensaje enviado fue:', message);
        // Envía el mensaje de verificación a través de WhatsApp utilizando el número de teléfono proporcionado.
        yield (0, sendWhatsAppMessage_1.sendWhatsAppMessage)(phoneNumber, message);
        // 5. Respuesta exitosa al cliente
        // Si todo es exitoso, responde al cliente con un mensaje indicando que se ha reenviado el código.
        res.status(200).json({
            msg: successMessages_1.successMessages.verificationCodeSent,
        });
    }
    catch (error) {
        // Manejo de errores generales del servidor
        // Si ocurre un error inesperado, responde con un mensaje de error y detiene el flujo.
        (0, handleServerErrorResendCode_1.handleServerErrorResendCode)(error, res);
    }
});
exports.resendVerificationCodePhone = resendVerificationCodePhone;
