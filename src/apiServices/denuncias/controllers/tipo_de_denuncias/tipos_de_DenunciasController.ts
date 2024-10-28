import { Request, Response } from 'express';
import { TipoDenunciaModel } from '../../middleware/models/tipoDenunciaModel';
import { errorMessages } from '../../../../middleware/erros/errorMessages';
import upload from '../../utils/uploadConfig';

// Función para buscar tipo de denuncia por nombre
export const findTipoDenuncia = async (nombre: string) => {
    return await TipoDenunciaModel.findOne({
        where: { nombre }
    });
};

// Función para manejar el error si el tipo o subtipo ya existe
export const handleDuplicateError = (res: Response, message: string) => {
    res.status(400).json({
        message,
        errors: `Error: Ya existe un registro con esos datos.`,
    });
    throw new Error("Duplicate validation failed");
};

// Validación de campos de entrada
export const validateInput = (nombre: string, descripcion: string, esAnonimaOficial: string): string[] => {
    const errors: string[] = [];
    validateRequiredFields({ nombre, descripcion, esAnonimaOficial }, errors);
    return errors;
};

// Validación de campos requeridos
const validateRequiredFields = (fields: { [key: string]: string }, errors: string[]): void => {
    Object.keys(fields).forEach(key => {
        if (!fields[key]) {
            errors.push(errorMessages.requiredFields);
        }
    });
};

// Manejo de errores de validación de entrada
export const handleInputValidationErrors = (errors: string[], res: Response): void => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
        throw new Error("Input validation failed");
    }
};

// Validación de la imagen subida
export const validateImageUpload = (req: Request, res: Response): boolean => {
    if (!req.file) {
        res.status(400).json({
            msg: 'Error: La imagen no fue subida.',
            errors: 'Se requiere una imagen para el tipo de denuncia.',
        });
        return false;
    }
    return true;
};

// Crear tipo de denuncia
const crearTipoDenuncia = async (nombre: string, descripcion: string, esAnonimaOficial: string, flagImage: string | null) => {
    return await TipoDenunciaModel.create({
        nombre,
        descripcion,
        esAnonimaOficial,
        flagImage,
    });
};

// Manejo de errores de subida de imagen
export const handleImageUploadError = (err: any, res: Response) => {
    console.error(`Error en la subida de la imagen: ${err.message}`);
    res.status(400).json({
        msg: `Error en la subida de la imagen: ${err.message}`,
        errors: 'Error al cargar la imagen',
    });
};

// Controlador para crear el tipo de denuncia con subida de imagen
export const creaTiposDenunciaAnonimas = async (req: Request, res: Response) => {
    try {
        handleImageUpload(req, res, async () => {
            if (!validateImageUpload(req, res)) return;

            const { nombre, descripcion, esAnonimaOficial } = req.body;
            const flagImage = req.file?.filename || null;

            const inputValidationErrors = validateInput(nombre, descripcion, esAnonimaOficial);
            handleInputValidationErrors(inputValidationErrors, res);

            const tipoDenunciaExistente = await findTipoDenuncia(nombre);
            if (tipoDenunciaExistente) {
                return handleDuplicateError(res, `El tipo de denuncia '${nombre}' ya existe.`);
            }

            const tipoDenuncia = await crearTipoDenuncia(nombre, descripcion, esAnonimaOficial, flagImage);
            res.status(201).json({ message: 'Tipo de denuncia creado con éxito', tipoDenuncia });
        });
    } catch (error) {
        handleServerErrorDenuncaiAnonima(error, res);
    }
};

// Encapsular la lógica de subida de imagen para reducir complejidad
const handleImageUpload = (req: Request, res: Response, callback: () => Promise<void>) => {
    upload(req, res, (err) => {
        if (err) {
            return handleImageUploadError(err, res);
        }
        callback();
    });
};

// Manejo de errores en el controlador
export const handleServerErrorDenuncaiAnonima = (error: any, res: Response) => {
    console.error("Error en el controlador DenunciaAnonima:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages.databaseError,
            error,
        });
        throw new Error("Controller DenunciaAnonima error");
    }
};
