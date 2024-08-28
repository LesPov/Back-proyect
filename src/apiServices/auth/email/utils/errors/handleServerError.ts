import { errorMessages } from "../../../../../middleware/erros/errorMessages";
import { Response } from 'express';

export const handleServerError = (error: any, res: Response) => {
    console.error("Error en el controlador verifyemail:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages.databaseError,
            error,
        });
        throw new Error("Controller VerifyEmail error");
    }
};
