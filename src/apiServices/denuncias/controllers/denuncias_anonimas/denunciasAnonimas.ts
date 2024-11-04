import { Request, Response } from 'express';
import { TipoDenunciaModel } from '../../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../../middleware/models/subtipoDenunciaModel';
import { errorMessages } from "../../../../middleware/erros/errorMessages";
import { DenunciaAnonimaModel } from '../../middleware/models/denunciasAnonimasModel';
import { randomBytes } from 'crypto'; // Importar para generar la clave única
import { successMessages } from '../../../../middleware/success/successMessages';
// Nueva función para validar tipo y subtipo de denuncia
export const validateDenunciaTipoYSubtipo = async (nombreTipo: string, nombreSubtipo: string, res: Response) => {
    // Validar tipo de denuncia
    const tipoDenuncia = await findTipoDenuncia(nombreTipo);
    if (!tipoDenuncia) {
        handleNotFoundError('Tipo de denuncia', nombreTipo, res, errorMessages.invalidTipoDenuncia);
        return { tipoDenuncia: null, subtipoDenuncia: null };
    }

    // Validar subtipo de denuncia
    const subtipoDenuncia = await findSubtipoDenuncia(nombreSubtipo, tipoDenuncia.id);
    if (!subtipoDenuncia) {
        handleNotFoundError('Subtipo de denuncia', nombreSubtipo, res, errorMessages.invalidSubtipoDenuncia);
        return { tipoDenuncia, subtipoDenuncia: null };
    }

    return { tipoDenuncia, subtipoDenuncia };
};
// Crear denuncia anónima y validar tipo y subtipo de denuncia
export const crearDenunciaAnonima = async (req: Request, res: Response) => {
    try {
        const { descripcion, direccion, nombreTipo, nombreSubtipo, pruebas, audio } = req.body;

        // Validar entrada
        const inputValidationErrors = validateInput(descripcion, direccion, nombreTipo, nombreSubtipo);
        if (inputValidationErrors.length > 0) {
            return handleInputValidationErrors(inputValidationErrors, res);
        }

        // Validar tipo y subtipo de denuncia
        const { tipoDenuncia, subtipoDenuncia } = await validateDenunciaTipoYSubtipo(nombreTipo, nombreSubtipo, res);
        if (!tipoDenuncia || !subtipoDenuncia) {
            return; // Ya se manejó el error dentro de validateDenunciaTipoYSubtipo
        }


        // Generar una clave única
        const claveUnica = randomBytes(16).toString('hex'); // Genera una cadena hexagonal de 32 caracteres
        // Determinar si tiene evidencia
        const tieneEvidencia = !!pruebas || !!audio; // Si alguna de estas está presente, es true

        // Crear la denuncia
        const nuevaDenuncia = await DenunciaAnonimaModel.create({
            descripcion,
            direccion,
            tipoDenunciaId: tipoDenuncia.id,
            subtipoDenunciaId: subtipoDenuncia.id,
            claveUnica,
            pruebas: pruebas || null, // Asignar 'null' si no hay pruebas
            audio: audio || null, // Asignar 'null' si no hay audio
            tieneEvidencia // Almacenar el estado de tieneEvidencia
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
