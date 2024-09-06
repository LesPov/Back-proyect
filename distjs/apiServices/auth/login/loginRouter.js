"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./loginController");
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
exports.default = loginUserRouter;
