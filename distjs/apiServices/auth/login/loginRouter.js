"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./loginController");
const passwordRecoveryController_1 = require("./passwordRecovery/passwordRecoveryController");
const resetPasswordController_1 = require("./resetPassword/resetPasswordController");
const validateToken_1 = __importDefault(require("../../../middleware/validateToken/validateToken"));
const loginUserRouter = (0, express_1.Router)();
/**
 * POST /api/user/login
 *  Ruta para iniciar sesión de un usuario.
 *  Público
 *  @body {string} email - Correo electrónico del usuario.
 *  @body {string} password - Contraseña del usuario.
 *  @returns {object} - Token de acceso y detalles del usuario si el inicio de sesión es exitoso.
 */
loginUserRouter.post('/login', loginController_1.loginUser);
/**
 * POST /api/user/forgot-password
 * Ruta para solicitar un correo electrónico de recuperación de contraseña.
 * Público
 */
loginUserRouter.post('/forgotPassword', passwordRecoveryController_1.requestPasswordReset);
/**
 * POST /api/user/reset-password
 * Ruta para cambiar la contraseña después de recibir el correo de recuperación.
 * Público
 */
loginUserRouter.post('/resetPassword', validateToken_1.default, resetPasswordController_1.resetPassword);
exports.default = loginUserRouter;
