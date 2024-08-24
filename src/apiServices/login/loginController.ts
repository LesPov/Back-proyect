import { Request, Response } from 'express';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, contrasena } = req.body;
        
    } catch (error) {
        // Manejar errores internos del servidor
    }
};
