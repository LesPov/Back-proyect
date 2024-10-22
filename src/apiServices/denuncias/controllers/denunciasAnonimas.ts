import { Request, Response } from 'express';
import { TipoDenunciaModel } from '../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../middleware/models/subtipoDenunciaModel';
import { errorMessages } from "../../../middleware/erros/errorMessages";
import { DenunciaAnonimaModel } from '../middleware/models/denunciasAnonimasModel';
import { randomBytes } from 'crypto'; // Importar para generar la clave única
import { successMessages } from '../../../middleware/success/successMessages';

// Crear denuncia anónima y validar tipo y subtipo de denuncia
export const crearDenunciaAnonima = async (req: Request, res: Response) => {
    try {
        const { descripcion, direccion, nombreTipo, nombreSubtipo } = req.body;

        // Validar entrada
        const inputValidationErrors = validateInput(descripcion, direccion, nombreTipo, nombreSubtipo);
        if (inputValidationErrors.length > 0) {
            return handleInputValidationErrors(inputValidationErrors, res);
        }

        // Validar tipo de denuncia
        const tipoDenuncia = await findTipoDenuncia(nombreTipo);
        if (!tipoDenuncia) {
            return handleNotFoundError('Tipo de denuncia', nombreTipo, res, errorMessages.invalidTipoDenuncia);
        }

        // Validar subtipo de denuncia
        const subtipoDenuncia = await findSubtipoDenuncia(nombreSubtipo, tipoDenuncia.id);
        if (!subtipoDenuncia) {
            return handleNotFoundError('Subtipo de denuncia', nombreSubtipo, res, errorMessages.invalidSubtipoDenuncia);
        }

        // Generar una clave única
        const claveUnica = randomBytes(16).toString('hex'); // Genera una cadena hexagonal de 32 caracteres

        // Crear la denuncia
        const nuevaDenuncia = await DenunciaAnonimaModel.create({
            descripcion,
            direccion,
            tipoDenunciaId: tipoDenuncia.id,
            subtipoDenunciaId: subtipoDenuncia.id,
            claveUnica // Almacena la clave única generada
        });
        handleSuccessMessage(res, nuevaDenuncia);

    } catch (error) {
        handleServerError(error, res);
    }
};

export const handleSuccessMessage = (res: Response, nuevaDenuncia: any) => {
    res.status(201).json({ 
        message: successMessages.denunciaCreada, // Mensaje de éxito específico
        nuevaDenuncia 
    });
};

// Función para buscar tipo de denuncia por nombre
export const findTipoDenuncia = async (nombre: string) => {
    return await TipoDenunciaModel.findOne({
        where: { nombre: nombre }
    });
};

// Función para buscar subtipo de denuncia por nombre y tipoDenunciaId
export const findSubtipoDenuncia = async (nombre: string, tipoDenunciaId: number) => {
    return await SubtipoDenunciaModel.findOne({
        where: { nombre: nombre, tipoDenunciaId: tipoDenunciaId }
    });
};

// Manejo de errores de validación
export const handleNotFoundError = (field: string, value: string, res: Response, customMessage?: string) => {
    const errorMsg = customMessage || `${field} con nombre '${value}' no fue encontrado.`;
    res.status(404).json({
        message: errorMsg,
        errors: `Error: ${field} no encontrado en la base de datos.`,
    });
};

// Manejo de errores del servidor
export const handleServerError = (error: any, res: Response) => {
    console.error("Error en el controlador:", error);
    res.status(500).json({ message: errorMessages.serverError, error });
};

// Validación de entrada de datos
export const validateInput = (descripcion: string, direccion: string, nombreTipo: string, nombreSubtipo: string): string[] => {
    const errors: string[] = [];
    if (!descripcion) errors.push(errorMessages.missingDescripcion);
    if (!direccion) errors.push(errorMessages.missingDireccion);
    if (!nombreTipo) errors.push(errorMessages.missingTipoDenunciaId);
    if (!nombreSubtipo) errors.push(errorMessages.missingSubtipoDenunciaId);
    return errors;
};

export const handleInputValidationErrors = (errors: string[], res: Response): void => {
    res.status(400).json({
        message: errorMessages.datosIncompletos,
        errors: errors
    });
};
