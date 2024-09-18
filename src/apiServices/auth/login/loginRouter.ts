import { Router } from "express";
import { loginUser } from "./loginController";
import { requestPasswordReset } from "./passwordRecovery/passwordRecoveryController";
import { resetPassword } from "./resetPassword/resetPasswordController";

const loginUserRouter = Router();

/**
 * POST /api/user/login
 *  Ruta para iniciar sesión de un usuario.
 *  Público
 *  @body {string} email - Correo electrónico del usuario.
 *  @body {string} password - Contraseña del usuario.
 *  @returns {object} - Token de acceso y detalles del usuario si el inicio de sesión es exitoso.
 */
loginUserRouter.post('/login', loginUser);


/**
 * POST /api/user/forgot-password
 * Ruta para solicitar un correo electrónico de recuperación de contraseña.
 * Público
 */
loginUserRouter.post('/forgotPassword', requestPasswordReset);


/**
 * POST /api/user/reset-password
 * Ruta para cambiar la contraseña después de recibir el correo de recuperación.
 * Público
 */
// loginUserRouter.post('/reset-password', validateToken, resetPassword);

export default loginUserRouter;
