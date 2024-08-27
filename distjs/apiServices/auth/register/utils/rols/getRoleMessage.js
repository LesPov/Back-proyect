"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleMessage = void 0;
/**
 * Obtener un mensaje de usuario según el rol.
 * @param rol - Rol del usuario.
 * @returns El mensaje asociado al rol del usuario.
 */
const getRoleMessage = (rol) => {
    return rol === 'admin' ? 'administrador' : rol === 'user' ? 'normal' : '';
};
exports.getRoleMessage = getRoleMessage;
