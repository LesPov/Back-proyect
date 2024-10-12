"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessages_1 = require("../erros/errorMessages");
const extractToken = (req) => {
    const authHeader = req.headers['authorization'];
    return authHeader ? authHeader.split(' ')[1] : null;
};
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'pepito123');
};
const isRoleValid = (userRole, requiredRole) => {
    return userRole === requiredRole;
};
const validateRole = (requiredRole) => {
    return (req, res, next) => {
        const token = extractToken(req);
        if (!token) {
            res.status(401).json({
                msg: errorMessages_1.errorMessages.tokenNotProvided,
            });
            return;
        }
        try {
            const decodedToken = verifyToken(token);
            const userRole = decodedToken.rol;
            if (isRoleValid(userRole, requiredRole)) {
                next();
            }
            else {
                res.status(403).json({
                    msg: errorMessages_1.errorMessages.accessDenied,
                });
            }
        }
        catch (error) {
            res.status(401).json({
                msg: errorMessages_1.errorMessages.invalidToken,
            });
        }
    };
};
exports.default = validateRole;
