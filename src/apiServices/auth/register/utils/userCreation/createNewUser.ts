import { errorMessages } from "../../../../../middleware/erros/errorMessages";
import { AuthModel } from "../../models/authModel";

/**
 * Crear un nuevo usuario en la base de datos.
 * @param username - Nombre de usuario del nuevo usuario.
 * @param hashedPassword - Contraseña cifrada del nuevo usuario.
 * @param email - Correo electrónico del nuevo usuario.
 * @param rol - Rol del nuevo usuario.
 * @returns El nuevo usuario creado.
 */
export const createNewUser = async (username: string, hashedPassword: string, email: string, rol: string) => {
    try {
      return await AuthModel.create({
        username: username,
        password: hashedPassword,
        email: email,
        rol: rol,
      });
    } catch (error) {
      console.error("Error en createNewUser:", error);
      throw errorMessages.databaseError; // Propagar el error a la función llamadora
    }
  };
  