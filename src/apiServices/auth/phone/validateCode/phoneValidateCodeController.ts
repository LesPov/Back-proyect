import { Request, Response } from 'express';

export const verifyPhoneNumber = async (req: Request, res: Response) => {
    try {
        // 1. Validación de entrada
        const { username, phoneNumber, verificationCode } = req.body;
    } catch (error) {

    }
}