"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessages_1 = require("../erros/errorMessages");
/**
 * Extrae el token del encabezado de autorización.
 * @param req - Objeto de solicitud HTTP
 * @returns El token extraído o null si no está presente
 */
const extractToken = (req) => {
    const authHeader = req.headers['authorization'];
    return authHeader ? authHeader.split(' ')[1] : null;
};
/**
 * Verifica el token JWT y devuelve el token decodificado.
 * @param token - El token JWT a verificar
 * @returns El token decodificado
 * @throws Si el token es inválido o no se puede verificar
 */
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'pepito123');
};
/**
 * Verifica si el rol del usuario es válido.
 * @param userRole - Rol del usuario extraído del token
 * @param requiredRole - Rol requerido para la ruta protegida
 * @returns true si el rol es válido, false en caso contrario
 */
const isRoleValid = (userRole, requiredRole) => {
    return userRole === requiredRole || userRole === 'admin';
};
/**
 * Middleware que valida el rol del usuario.
 * @param requiredRole - Rol requerido para acceder a la ruta protegida
 */
const validateRole = (requiredRole) => {
    return (req, res, next) => {
        const token = extractToken(req);
        if (!token) {
            return res.status(401).json({
                msg: errorMessages_1.errorMessages.tokenNotProvided,
            });
        }
        try {
            const decodedToken = verifyToken(token);
            const userRole = decodedToken.rol;
            if (isRoleValid(userRole, requiredRole)) {
                next(); // El rol es válido, permite el acceso
            }
            else {
                return res.status(403).json({
                    msg: errorMessages_1.errorMessages.accessDenied,
                });
            }
        }
        catch (error) {
            return res.status(401).json({
                msg: errorMessages_1.errorMessages.invalidToken,
            });
        }
    };
};
exports.default = validateRole;
