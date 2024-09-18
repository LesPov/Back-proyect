
// Nueva función que guarda la contraseña en la base de datos
import { AuthModel } from '../../../../../../middleware/models/authModel'; // Asegúrate de que la ruta sea correcta
import { errorMessages } from '../../../../../../middleware/erros/errorMessages';

export const updatePasswordInDatabase = async (userId: number, hashedPassword: string) => {
    try {
        // Actualiza la contraseña en la base de datos para el usuario correspondiente
        return await AuthModel.update({ password: hashedPassword }, {
            where: { id: userId }
        });
    } catch (error) {
        // Manejar errores al interactuar con la base de datos
        console.error('Error al actualizar la contraseña:', error);
        throw new Error(errorMessages.databaseError);
    }
};