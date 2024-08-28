import { AuthModel } from "../../../register/models/authModel";
import { VerificationModel } from "../../../register/models/VerificationModel";

/**
 * Busca un usuario en la base de datos basado en su nombre de usuario.
 * 
 * @param username - El nombre de usuario del usuario a buscar.
 * @returns El usuario encontrado o `null` si no existe.
 */
export const findUserByUsername = async (username: string) => {
  return AuthModel.findOne({ where: { username: username }, include: [VerificationModel] });
};
