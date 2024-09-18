"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessages_1 = require("../erros/errorMessages");
// Función que extrae el token Bearer del encabezado de autorización.
// Se espera que el token venga en el formato 'Bearer <token>'.
// Si el encabezado tiene este formato, se elimina la palabra 'Bearer ' para obtener solo el token.
const extractBearerToken = (headerToken) => {
    if (headerToken && headerToken.startsWith('Bearer ')) {
        // Retorna el token excluyendo 'Bearer ' (7 caracteres).
        return headerToken.slice(7);
    }
    // Si no se encuentra el token o no sigue el formato, retorna null.
    return null;
};
// Función que verifica el token JWT utilizando la clave secreta almacenada en las variables de entorno.
// Si no se encuentra la clave secreta en las variables de entorno, usa un valor por defecto ('pepito123').
// Esta función decodifica el token y retorna la información contenida en él.
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'pepito123');
};
// Función auxiliar que gestiona los errores de autenticación.
// Recibe una respuesta HTTP y un mensaje de error, y responde con un código de estado 401 (No autorizado).
const handleAuthError = (res, message) => {
    res.status(401).json({ msg: message });
};
// Middleware principal que valida el token JWT en las solicitudes entrantes.
// Se asegura de que la solicitud tenga un token de autorización válido y lo decodifica.
const validateToken = (req, res, next) => {
    // Obtiene el token del encabezado de autorización.
    const headerToken = req.headers['authorization'];
    // Extrae el token Bearer.
    const bearerToken = extractBearerToken(headerToken);
    // Si no se encuentra el token, responde con un mensaje de acceso denegado.
    if (!bearerToken) {
        return handleAuthError(res, errorMessages_1.errorMessages.accessDeniedNoToken);
    }
    try {
        // Verifica y decodifica el token.
        const decodedToken = verifyToken(bearerToken);
        // Almacena la información del usuario en `req.user` para su uso posterior en otras funciones.
        req.user = decodedToken;
        // Llama a la siguiente función middleware si el token es válido.
        next();
    }
    catch (error) {
        // Si ocurre algún error durante la verificación del token, responde con un mensaje de token inválido.
        handleAuthError(res, errorMessages_1.errorMessages.invalidToken);
    }
};
// Exporta el middleware `validateToken` para su uso en otras partes de la aplicación.
exports.default = validateToken;
