"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCodePhone = void 0;
const validateInput_1 = require("./utils/validations/validateInput");
const handleInputValidationErrors_1 = require("../register/utils/errors/handleInputValidationErrors");
const handleServerError_1 = require("./utils/errors/handleServerError");
const findUserByUsername_1 = require("../email/utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("./utils/errors/handleUserNotFoundError");
const checkUserVerificationStatus_1 = require("./utils/check/checkUserVerificationStatus");
const checkUserPhoneSendCode_1 = require("./utils/check/checkUserPhoneSendCode");
const checkUserPhoneNumberAssociation_1 = require("./utils/check/checkUserPhoneNumberAssociation");
const createVerificationEntryPhone_1 = require("./utils/check/createVerificationEntryPhone");
const updatePhoneNumber_1 = require("./utils/updatePhone/updatePhoneNumber");
const sendWhatsAppMessage_1 = require("./utils/send/sendWhatsAppMessage");
/**
 * Controlador para enviar un código de verificación por mensaje de texto (SMS).
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Response} - Respuesta JSON con un mensaje indicando el estado de la operación.
 */
const sendVerificationCodePhone = async (req, res) => {
    try {
        // 1. Validación de entrada
        const { username, phoneNumber, verificationCode } = req.body;
        const inputValidationErrors = (0, validateInput_1.validateInput)(username, phoneNumber);
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario
        const user = await (0, findUserByUsername_1.findUserByUsername)(username);
        (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        // 3. Verificación del estado del usuario
        const isEmailVerified = (0, checkUserVerificationStatus_1.checkUserVerificationStatus)(user);
        (0, checkUserVerificationStatus_1.handleEmailNotVerificationErroruser)(isEmailVerified, res);
        // 4. Verificación del número de teléfono
        const isPhoneNumberVerified = await (0, checkUserPhoneSendCode_1.checkUserPhoneSendCode)(phoneNumber);
        (0, checkUserPhoneSendCode_1.handlePhoneVerificationError)(isPhoneNumberVerified, res);
        // 5. Verificación de asociación de número de teléfono
        const isPhoneNumberAssociated = (0, checkUserPhoneNumberAssociation_1.checkUserPhoneNumberAssociation)(user);
        (0, checkUserPhoneNumberAssociation_1.handlePhoneNumberAssociationError)(isPhoneNumberAssociated, res);
        if (!user)
            return; // Si user es null, sale de la función
        // 6. Guardar en la base de datos el número de teléfono
        await (0, updatePhoneNumber_1.updatePhoneNumber)(user.id, phoneNumber);
        // 7. Generar nuevo código de verificación
        const sendcodesms = await (0, createVerificationEntryPhone_1.createVerificationEntryPhone)(user.id, phoneNumber);
        // 8. Enviar mensaje por WhatsApp con el código de verificación
        const message = `Tu código de verificación es: ${sendcodesms}`;
        await (0, sendWhatsAppMessage_1.sendWhatsAppMessage)(phoneNumber, message);
        // 9. Responder con un mensaje de éxito
        res.status(200).json({ message: 'Código de verificación enviado exitosamente por WhatsApp.' });
    }
    catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerError)(error, res);
    }
};
exports.sendVerificationCodePhone = sendVerificationCodePhone;
