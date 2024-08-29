"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("./emailController");
const verifyUserRateLimit_1 = __importDefault(require("./middleware/verifyUserRateLimit"));
const emailVerificationRoutes = (0, express_1.Router)();
/**
 * PUT /api/user/verify/email
 * Ruta para verificar el correo electrónico.
 * Público
 */
emailVerificationRoutes.put('/verify/email', verifyUserRateLimit_1.default, emailController_1.verifyUser);
exports.default = emailVerificationRoutes;
