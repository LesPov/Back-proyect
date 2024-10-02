"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("./emailController");
const verifyUserRateLimit_1 = __importDefault(require("./middleware/verifyUserRateLimit"));
const resendCodeController_1 = require("./resendCode/resendCodeController");
const emailVerificationRoutes = (0, express_1.Router)();
/**
 * PUT /api/user/verify/email
 * Ruta para verificar el correo electrónico.
 * Público
 */
emailVerificationRoutes.put('/verify/email', verifyUserRateLimit_1.default, emailController_1.verifyUser);
/**
 * POST /api/user/verify/email/resend
 * Ruta para reenviar el código de verificación por correo electrónico.
 * Público
 */
emailVerificationRoutes.post('/verify/email/resend', verifyUserRateLimit_1.default, resendCodeController_1.resendVerificationCode);
exports.default = emailVerificationRoutes;
