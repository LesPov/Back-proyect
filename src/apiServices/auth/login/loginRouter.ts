import { Router } from "express";
import { loginUser } from "./loginController";

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

export default loginUserRouter;
