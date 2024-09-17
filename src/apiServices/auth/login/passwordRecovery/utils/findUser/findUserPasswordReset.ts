import { AuthInterface } from "../../../../../../middleware/interfaces/authInterface";
import { AuthModel } from "../../../../../../middleware/models/authModel";
import { VerificationModel } from "../../../../../../middleware/models/VerificationModel";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Busca al usuario en la base de datos según el nombre de usuario o correo electrónico.
 * @param {string} usernameOrEmail - Nombre de usuario o correo electrónico.
 * @returns {Promise<AuthModel | null>} - Usuario encontrado o nulo si no se encuentra.
 */
const findUser = async (usernameOrEmail: string): Promise<AuthInterface | null> => {
    if (EMAIL_REGEX.test(usernameOrEmail)) {
        return await AuthModel.findOne({ where: { email: usernameOrEmail }, include: [VerificationModel] });
    } else {
        return await AuthModel.findOne({ where: { username: usernameOrEmail }, include: [VerificationModel] });
    }
};