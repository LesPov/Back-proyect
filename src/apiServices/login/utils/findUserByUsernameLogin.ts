import { UsuarioModel } from "../interface/UsuarioModel";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Buscar un usuario por nombre de usuari o email  incluyendo su información de verificación y rol.
 * @param usuario Nombre de usuario.
 * @param res Objeto de respuesta HTTP.
 * @returns Usuario encontrado.
 */
export const findUserByUsernameLogin = async (usernameOrEmail: string, res: Response): Promise<UsuarioModel> => {
    let user: UsuarioModel | null = null;

    if (EMAIL_REGEX.test(usernameOrEmail)) {
        user = await Usuario.findOne({
            where: { email: usernameOrEmail },
            include: [Verificacion, Rol],
        });
    } else {
        user = await Usuario.findOne({
            where: { usuario: usernameOrEmail },
            include: [Verificacion, Rol],
        });
    }

    if (!user) {
        res.status(400).json({ msg: errorMessages.userNotExists(usernameOrEmail) });
        throw new Error("Usuario no encontrado");
    }

    return user;
};