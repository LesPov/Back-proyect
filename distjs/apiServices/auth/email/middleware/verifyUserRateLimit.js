"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Definir el middleware de limitación de tasa
const verifyUserRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 3 * 60 * 1000, // 15 minutos
    max: 5, // Limita a 5 solicitudes por cada 15 minutos
    message: 'Has excedido el número máximo de solicitudes. Por favor, inténtalo de nuevo más tarde.',
    headers: true, // Incluye información sobre la tasa de limitación en los headers de respuesta
});
exports.default = verifyUserRateLimit;
