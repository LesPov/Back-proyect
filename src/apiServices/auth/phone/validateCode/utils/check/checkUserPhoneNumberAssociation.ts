import { Response } from 'express';
import { errorMessages } from '../../../../../../middleware/erros/errorMessages';

/**
 * Verifica si el número de teléfono proporcionado coincide con el almacenado en la base de datos.
 * @param user - El objeto del usuario que contiene el número de teléfono registrado.
 * @param phoneNumber - El número de teléfono proporcionado en la solicitud.
 * @returns Verdadero si el número de teléfono coincide, falso en caso contrario.
 */
export const checkUserPhoneNumberAssociationCode = (user: any, phoneNumber: string) => {
    // Verifica si el número de teléfono proporcionado coincide con el almacenado en la base de datos.
    return user.phoneNumber === phoneNumber;
};

/**
 * Maneja el error cuando el número de teléfono proporcionado no coincide con el almacenado en la base de datos.
 * @param isPhoneNumberAssociated - Indicador de si el número de teléfono coincide con el registrado.
 * @param res - El objeto de respuesta HTTP proporcionado por Express.
 * @throws Lanza una excepción si el número de teléfono no coincide.
 */
export const handlePhoneNumberAssociationCodeError = (isPhoneNumberAssociated: boolean, res: Response) => {
    if (!isPhoneNumberAssociated) {
        // Define el mensaje de error si el número de teléfono no coincide.
        const errorMsg = errorMessages.incorrectPhoneNumber();
        res.status(400).json({
            msg: errorMsg,
            errors: 'Número de teléfono no coincide con el registrado.',
        });
        throw new Error("User phone number mismatch.");
    }
};
