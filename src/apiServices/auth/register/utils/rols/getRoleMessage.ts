/**
 * Obtener un mensaje de usuario según el rol.
 * @param rol - Rol del usuario.
 * @returns El mensaje asociado al rol del usuario.
 */
export const getRoleMessage = (rol: string) => {
  return rol === 'admin' ? 'administrador' : rol === 'user' ? 'normal' : '';
};