"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./loginController");
const passwordRecoveryController_1 = require("./passwordRecovery/passwordRecoveryController");
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
exports.default = loginUserRouter;
