
import { Router } from "express";
import { loginUser } from "./loginController";

const router = Router();

/**
 * POST /api/user/login
 *  Ruta para que los usuarios inicien sesión.
 *  Público
 */
router.post('/login', loginUser);


export default router;
