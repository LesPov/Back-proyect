import { Request, Response } from 'express';


export const resetPassword  = async (req: Request, res: Response) => {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail, randomPassword, newPassword } = req.body;
        
    } catch (error) {
        
        // 7. Manejo de errores de servidor
        // handleServerErrorresetPassword(error, res);
    }
};
