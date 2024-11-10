"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = __importDefault(require("../../middleware/validateToken/validateToken"));
const validateRole_1 = __importDefault(require("../../middleware/validateRole/validateRole"));
const userRouter = (0, express_1.Router)();
/**
 *  GET /api/user/user
 *  Ruta protegida para los usuarios normales.
 *  Privado (solo para usuarios con rol 'user')
 */
userRouter.get('/user', validateToken_1.default, (0, validateRole_1.default)('User'), (req, res) => {
    res.send('Bienvenido, eres un usuario normal');
});
exports.default = userRouter;
