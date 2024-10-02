import { Response } from 'express';
import { errorMessages } from '../../../../../../../middleware/erros/errorMessages';

export const handleServerErrorResendCode = (error: any, res: Response) => {
    console.error("Error en el controlador ResendCodePhone:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages.databaseError,
            error,
        });
        throw new Error("Controller ResendCodePhone error");
    }
};
