import { Request, Response } from 'express';
import { validateInput } from './utils/validateInput';
import { handleInputValidationErrors } from './utils/handleInputValidationErrors';


/**
 * Controlador para registrar un nuevo usuario.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 */
export const newUser = async (req: Request, res: Response) => {
    try {
        const { username, contrasena, email, rol } = req.body;

        // Validar la entrada de datos
        const inputValidationErrors = validateInput(username, contrasena, email, rol);
        handleInputValidationErrors(inputValidationErrors, res);

    } catch (error) {
        // Manejar errores internos del servidor
      
    }
};