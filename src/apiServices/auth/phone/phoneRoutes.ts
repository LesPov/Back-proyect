import { Router } from "express";
import { sendVerificationCodePhone } from "./phoneController";

const phoneVerificationRouter  = Router();

/**
 * POST /api/user/verify/send
 * Ruta para enviar el código de verificación por SMS.
 * Público
 */
phoneVerificationRouter.post("/phone/send", sendVerificationCodePhone);

export default phoneVerificationRouter ;
