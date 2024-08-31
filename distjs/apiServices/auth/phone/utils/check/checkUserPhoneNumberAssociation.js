"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePhoneNumberAssociationError = exports.checkUserPhoneNumberAssociation = void 0;
/**
 * Verifica si el usuario ya tiene un número de teléfono asociado a su cuenta.
 * @param user - Objeto del usuario.
 * @returns Verdadero si el usuario ya tiene un número de teléfono asociado, falso en caso contrario.
 */
const checkUserPhoneNumberAssociation = (user) => {
    return !!user?.phoneNumber; // Retorna verdadero si el número de teléfono existe
};
exports.checkUserPhoneNumberAssociation = checkUserPhoneNumberAssociation;
/**
 * Maneja el error cuando el usuario ya tiene un número de teléfono asociado.
 * @param isPhoneNumberAssociated - Indicador de si el número de teléfono ya está asociado al usuario.
 * @param res - Objeto de respuesta HTTP proporcionado por Express.
 * @throws Lanza una excepción si el usuario ya tiene un número de teléfono asociado.
 */
const handlePhoneNumberAssociationError = (isPhoneNumberAssociated, res) => {
    if (isPhoneNumberAssociated) {
        res.status(400).json({
            msg: 'Error: Ya tienes un número de teléfono asociado a tu cuenta. No puedes agregar otro.',
            errors: 'Número de teléfono ya asociado',
        });
        throw new Error("User already has a phone number associated.");
    }
};
exports.handlePhoneNumberAssociationError = handlePhoneNumberAssociationError;
