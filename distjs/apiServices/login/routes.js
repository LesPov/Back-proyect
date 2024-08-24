"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./loginController");
const router = (0, express_1.Router)();
/**
 * POST /api/user/login
 *  Ruta para que los usuarios inicien sesión.
 *  Público
 */
router.post('/login', loginController_1.loginUser);
exports.default = router;
