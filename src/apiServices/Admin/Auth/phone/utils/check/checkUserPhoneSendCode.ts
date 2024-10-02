import { Response } from 'express';
import { errorMessages } from '../../../../../../middleware/erros/errorMessages';
import { AuthModel } from '../../../../../../middleware/models/authModel';

/**
 * Verifica si el número de teléfono ya está registrado en la base de datos.
 * @param phoneNumber - El número de teléfono a verificar.
 * @returns {boolean} - Retorna true si el número de teléfono ya está registrado.
 */
export const checkUserPhoneSendCode = async (phoneNumber: string): Promise<boolean> => {
    const userWithPhoneNumber = await AuthModel.findOne({
        where: { phoneNumber: phoneNumber }
    });
    return userWithPhoneNumber !== null;
};

/**
 * Maneja el error si el número de teléfono ya está registrado.
 * @param isPhoneNumberRegistered - Booleano indicando si el número de teléfono ya está registrado.
 * @param res - Objeto de respuesta de Express.
 */
export const handlePhoneVerificationError = (isPhoneNumberRegistered: boolean, res: Response) => {
    if (isPhoneNumberRegistered) {
        const errorMsg = errorMessages.phoneNumberExists;
        res.status(400).json({
            msg: errorMsg,
            errors: 'Error: El número de teléfono ya ha sido registrado en la base de datos. Ingresa otro.',
        });
        throw new Error("Phone number already exists in the database.");
    }
};