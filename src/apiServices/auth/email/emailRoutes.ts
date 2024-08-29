import { Router } from "express";
import { verifyUser } from "./emailController";
import verifyUserRateLimit from "./middleware/verifyUserRateLimit";

const emailVerificationRoutes = Router();

/**
 * PUT /api/user/verify/email
 * Ruta para verificar el correo electrónico.
 * Público
 */
emailVerificationRoutes.put('/verify/email', verifyUserRateLimit, verifyUser);
export default emailVerificationRoutes;
