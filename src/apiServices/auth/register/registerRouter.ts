
import { Router } from "express";
import { newUser } from "./registerController";

const registerRouter = Router();
// Rutas existentes para registro 
/**
 * POST /api/user/register
 *  Ruta para registrar un nuevo usuario.
 *  Público
 */
registerRouter.post('/signup', newUser);
export default registerRouter;
 