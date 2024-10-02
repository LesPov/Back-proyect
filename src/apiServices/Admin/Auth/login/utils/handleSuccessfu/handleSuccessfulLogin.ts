import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { successMessages } from '../../../../../../middleware/success/successMessages';

/**
 * Maneja la respuesta cuando un usuario inicia sesión con éxito.
 * @param user - El usuario que inició sesión.
 * @param res - La respuesta HTTP para la solicitud.
 * @param password - La contraseña utilizada para iniciar sesión.
 * @returns Un mensaje de éxito en formato JSON con el token de autenticación, el ID del usuario, el rol y, opcionalmente, la información de la contraseña.
 */
export const handleSuccessfulLogin = async (user: any, res: Response, password: string) => {
    const msg = password.length === 8 ? 'Inicio de sesión por recuperación de contraseña' : successMessages.userLoggedIn;
    const token = generateAuthToken(user);
    const userId = user.id;
    const rol = user.rol;
    const passwordorrandomPassword = password.length === 8 ? 'randomPassword' : undefined;

    return res.json({ msg, token, userId, rol, passwordorrandomPassword });
};

/**
 * Genera un token de autenticación JWT basado en el usuario.
 * @param user - El usuario que inició sesión.
 * @returns El token de autenticación generado.
 */
export const generateAuthToken = (user: any) => {
    return jwt.sign({
        username: user.username,
        rol: user.rol,
        userId: user.id
    }, process.env.SECRET_KEY || 'pepito123', { expiresIn: '1h' });
};