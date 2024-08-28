import { Router } from "express";
import { verifyUser } from "./emailController";

const emailVerificationRoutes = Router();

/**
 * PUT /api/user/verify/email
 * Ruta para verificar el correo electrónico.
 * Público
 */
emailVerificationRoutes.put('/verify/email', verifyUser);
export default emailVerificationRoutes;
