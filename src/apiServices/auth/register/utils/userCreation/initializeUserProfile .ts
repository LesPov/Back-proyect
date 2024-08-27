import { UserProfileModel } from "../../../profile/models/userProfileModel";

/**
 * Inicializa el perfil de un usuario en la base de datos.
 * 
 * Esta función crea una entrada en la tabla `UserProfileModel` para un usuario específico. 
 * El perfil se inicializa con el ID del usuario y campos vacíos para el nombre y el apellido. 
 * Este perfil puede ser actualizado más tarde con la información del usuario.
 * 
 * @param {number} userId - ID del usuario para el cual se inicializará el perfil. 
 *                           Este ID debe corresponder a un usuario ya existente en la base de datos.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el perfil del usuario ha sido creado exitosamente.
 *                            No devuelve un valor específico, solo indica la finalización del proceso.
 */
export const initializeUserProfile = async (userId: number): Promise<void> => {
    // Crea una entrada en el perfil de usuario con el ID proporcionado
    await UserProfileModel.create({
        userId: userId,
        firstName: '', // Inicializa el campo de nombre con una cadena vacía
        lastName: '',  // Inicializa el campo de apellido con una cadena vacía
    });
};
