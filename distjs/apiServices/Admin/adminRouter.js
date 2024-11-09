"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = __importDefault(require("../../middleware/validateToken/validateToken"));
const validateRole_1 = __importDefault(require("../../middleware/validateRole/validateRole"));
const adminRouter = (0, express_1.Router)();
/**
 *  GET /api/user/user
 *  Ruta protegida para los usuarios normales.
 *  Privado (solo para usuarios con rol 'user')
 */
adminRouter.get('/admin', validateToken_1.default, (0, validateRole_1.default)('Admin'), (req, res) => {
    res.send('Bienvenido, eres un administrador');
});
exports.default = adminRouter;
