import { errorMessages } from "../../../../middleware/erros/errorMessages";
import UserModel from "../../../../models/userModel";

/**
 * Verifica si un username o correo electrónico ya existe.
 * @param username Nombre de username.
 * @param email Dirección de correo electrónico.
 * @returns Mensaje de error si el username o correo electrónico ya existe, de lo contrario, null.
 */export const checkExistingUserOrEmail = async (username: string, email: string): Promise<string | null> => {
    const usernameError = await checkExistingUsername(username);
    const emailError = await checkExistingEmail(email);

    if (usernameError && emailError) {
        // Ambos existen, puedes combinar los mensajes de error o manejarlos de acuerdo a tus necesidades
        return `${usernameError}. ${emailError}`;
    }

    return usernameError || emailError || null;
};

/**
 * Verifica si un nombre de username ya existe.
 * @param username Nombre de username a verificar.
 * @returns Mensaje de error si el nombre de username ya existe, de lo contrario, null.
 */
export const checkExistingUsername = async (username: string): Promise<string | null> => {
    return (await findExistingUsername(username))
        ? errorMessages.userExists(username)
        : null;
};

/**
 * Verifica si una dirección de correo electrónico ya existe.
 * @param email Dirección de correo electrónico a verificar.
 * @returns Mensaje de error si la dirección de correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingEmail = async (email: string): Promise<string | null> => {
    return (await findExistingEmail(email))
        ? errorMessages.userEmailExists(email)
        : null;
};

/**
 * Validar si un nombre de username ya existe en la base de datos.
 * @param username Nombre de username a buscar.
 * @returns True si el nombre de username existe, de lo contrario, false.
 */
const findExistingUsername = async (username: string): Promise<boolean> => {
    try {
        const existingusername = await UserModel.findOne({ where: { username } });
        return Boolean(existingusername);
    } catch (error) {
        console.error("Error en findExistingUsername:", error);
        throw errorMessages.databaseError;
    }
};

/**
 * Validar si una dirección de correo electrónico ya existe en la base de datos.
 * @param email Dirección de correo electrónico a buscar.
 * @returns True si la dirección de correo electrónico existe, de lo contrario, false.
 */
const findExistingEmail = async (email: string): Promise<boolean> => {
    try {
        const existingEmail = await UserModel.findOne({ where: { email } });
        return Boolean(existingEmail);
    } catch (error) {
        console.error("Error en findExistingEmail:", error);
        throw errorMessages.databaseError;
    }
};

