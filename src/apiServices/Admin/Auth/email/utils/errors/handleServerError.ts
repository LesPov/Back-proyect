import { errorMessages } from "../../../../../../middleware/erros/errorMessages";
import { Response } from 'express';

/**
 * Maneja errores del servidor en el controlador de verificación de correo electrónico.
 * Esta función captura y maneja los errores que ocurren durante la ejecución del controlador `verifyemail`.
 * Si los encabezados de la respuesta aún no se han enviado, responde con un estado de error 400 y un mensaje apropiado.
 * Además, registra el error en la consola para facilitar la depuración.
 *
 * @param {any} error - El error que se ha generado durante la ejecución del controlador.
 * @param {Response} res - El objeto de respuesta HTTP proporcionado por Express.
 * @throws {Error} - Lanza un nuevo error si ocurre un fallo crítico en el controlador.
 */
export const handleServerError = (error: any, res: Response) => {
    // Registrar el error en la consola
    console.error("Error en el controlador verifyemail:", error);

    // Verificar si los encabezados de la respuesta ya han sido enviados
    if (!res.headersSent) {
        // Si no se han enviado, devolver una respuesta de error con un mensaje y el detalle del error
        res.status(400).json({
            msg: error.message || errorMessages.databaseError, // Mensaje de error predeterminado o personalizado
            error, // Incluir el objeto de error para más información
        });

        // Lanzar un nuevo error indicando que ocurrió un fallo crítico
        throw new Error("Controller VerifyEmail error");
    }
};
