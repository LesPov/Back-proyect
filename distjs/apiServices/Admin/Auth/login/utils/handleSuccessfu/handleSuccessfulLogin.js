"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = exports.handleSuccessfulLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const successMessages_1 = require("../../../../../../middleware/success/successMessages");
/**
 * Maneja la respuesta cuando un usuario inicia sesión con éxito.
 * @param user - El usuario que inició sesión.
 * @param res - La respuesta HTTP para la solicitud.
 * @param password - La contraseña utilizada para iniciar sesión.
 * @returns Un mensaje de éxito en formato JSON con el token de autenticación, el ID del usuario, el rol y, opcionalmente, la información de la contraseña.
 */
const handleSuccessfulLogin = (user, res, password) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = password.length === 8 ? 'Inicio de sesión por recuperación de contraseña' : successMessages_1.successMessages.userLoggedIn;
    const token = (0, exports.generateAuthToken)(user);
    const userId = user.id;
    const rol = user.rol;
    const passwordorrandomPassword = password.length === 8 ? 'randomPassword' : undefined;
    return res.json({ msg, token, userId, rol, passwordorrandomPassword });
});
exports.handleSuccessfulLogin = handleSuccessfulLogin;
/**
 * Genera un token de autenticación JWT basado en el usuario.
 * @param user - El usuario que inició sesión.
 * @returns El token de autenticación generado.
 */
const generateAuthToken = (user) => {
    return jsonwebtoken_1.default.sign({
        username: user.username,
        rol: user.rol,
        userId: user.id
    }, process.env.SECRET_KEY || 'pepito123', { expiresIn: '1h' });
};
exports.generateAuthToken = generateAuthToken;
