import { errorMessages } from "../../../../../middleware/erros/errorMessages";
import { AuthModel } from "../../models/authModel";

/**
 * Verifica si un valor dado (username o email) ya existe en la base de datos.
 * @param field Nombre del campo a buscar (por ejemplo, 'username' o 'email').
 * @param value Valor del campo a buscar.
 * @returns True si el valor ya existe en la base de datos, de lo contrario, false.
 */
const findExistingField = async (field: 'username' | 'email', value: string): Promise<boolean> => {
    try {
        const existingRecord = await AuthModel.findOne({ where: { [field]: value } });
        return Boolean(existingRecord);
    } catch (error) {
        console.error(`Error en findExistingField con ${field}:`, error);
        throw errorMessages.databaseError;
    }
};
/**
 * Verifica si un username ya existe y devuelve un mensaje de error si es así.
 * @param username Nombre de username a verificar.
 * @returns Mensaje de error si el nombre de username ya existe, de lo contrario, null.
 */
const checkExistingUsername = async (username: string): Promise<string | null> => {
    return (await findExistingField('username', username))
        ? errorMessages.userExists(username)
        : null;
};

/**
 * Verifica si un correo electrónico ya existe y devuelve un mensaje de error si es así.
 * @param email Dirección de correo electrónico a verificar.
 * @returns Mensaje de error si la dirección de correo electrónico ya existe, de lo contrario, null.
 */
const checkExistingEmail = async (email: string): Promise<string | null> => {
    return (await findExistingField('email', email))
        ? errorMessages.userEmailExists(email)
        : null;
};

/**
 * Verifica si un username o correo electrónico ya existe.
 * @param username Nombre de username.
 * @param email Dirección de correo electrónico.
 * @returns Mensaje de error si el username o correo electrónico ya existe, de lo contrario, null.
 */
export const checkExistingUserOrEmail = async (username: string, email: string): Promise<string | null> => {
    const usernameError = await checkExistingUsername(username);
    const emailError = await checkExistingEmail(email);

    if (usernameError && emailError) {
        return `${usernameError}. ${emailError}`;
    }

    return usernameError || emailError || null;
};
