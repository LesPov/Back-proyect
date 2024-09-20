import { Router } from "express";
import { sendVerificationCodePhone } from "./phoneController";
import { verifyPhoneNumber } from "./validateCode/phoneValidateCodeController";
import { resendVerificationCodePhone } from "./resendCodeController/phoneresendCodeController";

const phoneVerificationRouter  = Router();

/**
 * POST /api/user/verify/send
 * Ruta para enviar el código de verificación por SMS.
 * Público
 */
phoneVerificationRouter.post("/phone/send", sendVerificationCodePhone);



/**
 * PUT /api/user/verify/phone
 * Ruta para verificar el número de teléfono.
 * Público
 */
phoneVerificationRouter .put('/verify/phone', verifyPhoneNumber);




/**
 * POST /api/user/verify/resend
 * Ruta para reenviar el código de verificación por SMS.
 * Público
 */
phoneVerificationRouter.post("/verify/phone/resend", resendVerificationCodePhone);

export default phoneVerificationRouter ;
