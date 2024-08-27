"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleMessage = void 0;
/**
 * Obtiene un mensaje descriptivo basado en el rol del usuario.
 *
 * Esta función devuelve un mensaje específico dependiendo del rol proporcionado.
 * Si el rol es 'admin', se devuelve 'administrador'; si el rol es 'user', se
 * devuelve 'normal'; de lo contrario, se devuelve una cadena vacía.
 *
 * @param {string} rol - El rol del usuario. Puede ser 'admin', 'user' o cualquier otro valor.
 * @returns {string} - El mensaje asociado al rol del usuario.
 *   - 'administrador' si el rol es 'admin'.
 *   - 'normal' si el rol es 'user'.
 *   - Una cadena vacía si el rol no coincide con ninguno de los valores predefinidos.
 */
const getRoleMessage = (rol) => {
    // Retorna un mensaje basado en el rol del usuario
    return rol === 'admin' ? 'administrador'
        : rol === 'user' ? 'normal'
            : '';
};
exports.getRoleMessage = getRoleMessage;
