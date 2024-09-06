import { Request, Response } from 'express';
import { handleServerErrorLogin } from "./utils/errors/handleServerError";
import { validateInputLogin } from './utils/validations/loginvalidateInput';
import { handleInputValidationErrors } from '../register/utils/errors/handleInputValidationErrors';



/**
 * Controlador para manejar la solicitud de inicio de sesión de un usuario.
 * 
 * Este controlador autentica al usuario verificando sus credenciales, 
 * maneja los errores de servidor y envía una respuesta adecuada.
 * 
 * @param req - La solicitud HTTP que contiene las credenciales del usuario (nombre de usuario y contraseña).
 * @param res - La respuesta HTTP que será enviada al cliente, con mensajes de éxito o error.
 */
export const loginUser = async (req: Request, res: Response) => {
    try {

        // 1. Extraer los datos del cuerpo de la solicitud
        // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
        const { username, passwordorrandomPassword } = req.body;


        // 2. Validar la entrada de datos (username, passwordorrandomPassword)
        const inputValidationErrors = validateInputLogin(username, passwordorrandomPassword);
        // Manejar cualquier error de validación de la entrada de datos
        handleInputValidationErrors(inputValidationErrors, res);


        //3.


    } catch (error) {

        // 5. Manejo de errores de servidor
        // Manejar errores generales del servidor y responder con un mensaje de error
        handleServerErrorLogin(error, res);
    }
};