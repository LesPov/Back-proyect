/**
 * Genera un código de verificación aleatorio de 6 dígitos.
 * 
 * Esta función produce un número aleatorio de 6 dígitos que se utiliza como código 
 * de verificación. El código es una cadena de texto para su fácil manejo y almacenamiento.
 * 
 * @returns {string} - El código de verificación generado, representado como una cadena de 6 dígitos.
 */
export const generateRandomVerificationCode = (): string => {
    // Genera un número aleatorio entre 100000 y 999999
    return Math.floor(100000 + Math.random() * 900000).toString();
};
