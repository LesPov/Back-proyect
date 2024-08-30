"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phoneController_1 = require("./phoneController");
const phoneVerificationRouter = (0, express_1.Router)();
/**
 * POST /api/user/verify/send
 * Ruta para enviar el código de verificación por SMS.
 * Público
 */
phoneVerificationRouter.post("/phone/send", phoneController_1.sendVerificationCodePhone);
exports.default = phoneVerificationRouter;
