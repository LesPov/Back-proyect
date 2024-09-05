"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phoneController_1 = require("./phoneController");
const phoneValidateCodeController_1 = require("./validateCode/phoneValidateCodeController");
const phoneresendCodeController_1 = require("./resendCodeController/phoneresendCodeController");
const phoneVerificationRouter = (0, express_1.Router)();
/**
 * POST /api/user/verify/send
 * Ruta para enviar el código de verificación por SMS.
 * Público
 */
phoneVerificationRouter.post("/phone/send", phoneController_1.sendVerificationCodePhone);
/**
 * PUT /api/user/verify/phone
 * Ruta para verificar el número de teléfono.
 * Público
 */
phoneVerificationRouter.put('/verify/phone', phoneValidateCodeController_1.verifyPhoneNumber);
/**
 * POST /api/user/verify/resend
 * Ruta para reenviar el código de verificación por SMS.
 * Público
 */
phoneVerificationRouter.post("/verify/resend", phoneresendCodeController_1.resendVerificationCodePhone);
exports.default = phoneVerificationRouter;
