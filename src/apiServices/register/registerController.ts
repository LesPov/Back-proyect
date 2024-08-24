import { Request, Response } from 'express';


/**
 * Controlador para registrar un nuevo usuario.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 */
export const newUser = async (req: Request, res: Response) => {
    try {
        const { usuario, contrasena, email, rol } = req.body;

        // Validar la entrada de datos
        const inputValidationErrors = validateInput(usuario, contrasena, email, rol);
        handleInputValidationErrors(inputValidationErrors, res);

    } catch (error) {
        // Manejar errores internos del servidor
      
    }
};