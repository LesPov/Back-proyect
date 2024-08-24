import { Response } from 'express';

/**
 * Maneja los errores de validación de la entrada de datos.
 * @param errors Lista de errores de validación.
 * @param res La respuesta HTTP saliente.
 * @throws {Error} Si hay errores de validación, se lanza un error con el mensaje "Input validation failed".
 */
export const handleInputValidationErrors = (errors: string[], res: Response): void => {
    if (errors.length > 0) {
        console.log("Validation errors:", errors); // Agrega esta línea para imprimir los errores

        // Concatenar los mensajes de error en una cadena
        const errorMessage = errors.join('. ');

        // Responder con un JSON de error y código de estado 400  
        res.status(400).json({
            msg: errorMessage,
            errors: `Error en la validación de la entrada de datos`,
        });

        // Lanzar un error para indicar que la validación de entrada ha fallado
        throw new Error("Input validation failed");
    }
}; 