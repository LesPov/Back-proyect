"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistingUserOrEmail = void 0;
const errorMessages_1 = require("../../../../../middleware/erros/errorMessages");
const authModel_1 = require("../../models/authModel");
/**
 * Verifica si un valor dado (username o email) ya existe en la base de datos.
 *
 * Este método realiza una búsqueda en la base de datos para verificar si existe
 * un registro con el valor proporcionado en el campo especificado (username o email).
 * Si ocurre un error durante la consulta, se captura y se lanza un error genérico de base de datos.
 *
 * @param field Nombre del campo a buscar (por ejemplo, 'username' o 'email').
 * @param value Valor del campo a buscar.
 * @returns True si el valor ya existe en la base de datos, de lo contrario, false.
 * @throws errorMessages.databaseError Si ocurre un error durante la consulta a la base de datos.
 */
const findExistingField = async (field, value) => {
    try {
        // Buscar un registro en la base de datos con el campo especificado y el valor dado
        const existingRecord = await authModel_1.AuthModel.findOne({ where: { [field]: value } });
        // Retornar true si se encuentra un registro, de lo contrario, false
        return Boolean(existingRecord);
    }
    catch (error) {
        // Registrar el error en la consola y lanzar un mensaje de error genérico
        console.error(`Error en findExistingField con ${field}:`, error);
        throw errorMessages_1.errorMessages.databaseError;
    }
};
/**
 * Verifica si un nombre de usuario ya existe y devuelve un mensaje de error si es así.
 *
 * Este método utiliza la función `findExistingField` para verificar si el nombre de usuario
 * ya está registrado en la base de datos. Si existe, se devuelve un mensaje de error; de lo contrario, null.
 *
 * @param username Nombre de usuario a verificar.
 * @returns Mensaje de error si el nombre de usuario ya existe, de lo contrario, null.
 */
const checkExistingUsername = async (username) => {
    // Verificar si el nombre de usuario ya existe y devolver el mensaje de error correspondiente
    return (await findExistingField('username', username))
        ? errorMessages_1.errorMessages.userExists(username)
        : null;
};
/**
 * Verifica si una dirección de correo electrónico ya existe y devuelve un mensaje de error si es así.
 *
 * Este método utiliza la función `findExistingField` para verificar si el correo electrónico
 * ya está registrado en la base de datos. Si existe, se devuelve un mensaje de error; de lo contrario, null.
 *
 * @param email Dirección de correo electrónico a verificar.
 * @returns Mensaje de error si la dirección de correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingEmail = async (email) => {
    // Verificar si el correo electrónico ya existe y devolver el mensaje de error correspondiente
    return (await findExistingField('email', email))
        ? errorMessages_1.errorMessages.userEmailExists(email)
        : null;
};
/**
 * Verifica si un nombre de usuario o una dirección de correo electrónico ya existe.
 *
 * Este método llama a `checkExistingUsername` y `checkExistingEmail` para verificar la existencia
 * de ambos en la base de datos. Devuelve un mensaje de error combinado si ambos existen; de lo contrario,
 * devuelve el mensaje de error del que exista o null si ninguno existe.
 *
 * @param username Nombre de usuario a verificar.
 * @param email Dirección de correo electrónico a verificar.
 * @returns Mensaje de error si el nombre de usuario o el correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingUserOrEmail = async (username, email) => {
    // Verificar si el nombre de usuario ya existe
    const usernameError = await checkExistingUsername(username);
    // Verificar si el correo electrónico ya existe
    const emailError = await checkExistingEmail(email);
    // Devolver un mensaje combinado si ambos existen, o el mensaje del que exista, o null si ninguno existe
    if (usernameError && emailError) {
        return `${usernameError}. ${emailError}`;
    }
    return usernameError || emailError || null;
};
exports.checkExistingUserOrEmail = checkExistingUserOrEmail;
