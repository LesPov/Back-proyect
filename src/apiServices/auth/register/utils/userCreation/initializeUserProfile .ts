import { UserProfile } from "../../../profile/models/userProfileModel";

/**
 * Inicializar el perfil de usuario.
 * @param userId - ID del usuario para el cual se inicializará el perfil.
 */
export const initializeUserProfile = async (userId: number) => {
    await UserProfile.create({
      userId: userId,
      firstName: '',
      lastName: '',
    });
  };