"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = require("./registerController");
const registerRouter = (0, express_1.Router)();
// Rutas existentes para registro 
/**
 * POST /api/user/register
 *  Ruta para registrar un nuevo usuario.
 *  Público
 */
registerRouter.post('/signup', registerController_1.newUser);
exports.default = registerRouter;
