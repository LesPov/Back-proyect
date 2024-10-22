import { Request, Response } from 'express';
import { TipoDenunciaModel, TipoDenunciaInterface } from '../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../middleware/models/subtipoDenunciaModel';
import { errorMessages } from '../../../middleware/erros/errorMessages';

// Función para buscar tipo de denuncia por nombre
export const findTipoDenuncia = async (nombre: string) => {
    return await TipoDenunciaModel.findOne({
        where: { nombre: nombre }
    });
};

// Función para buscar subtipo de denuncia por nombre y tipoDenunciaId


// Función para manejar el error si el tipo o subtipo ya existe
export const handleDuplicateError = (res: Response, message: string) => {
    res.status(400).json({
        message: message,
        errors: `Error: Ya existe un registro con esos datos.`,
    });
    throw new Error("Duplicate validation failed");
};


/**
 * Función para crear el tipo de denuncia
 * Solo se ejecuta si no existen duplicados.
 */
const crearTipoDenuncia = async (nombre: string, descripcion: string, esAnonimaOficial: string, flagImage: string) => {
    return await TipoDenunciaModel.create({
        nombre,
        descripcion,
        esAnonimaOficial,
        flagImage,
    });
};

/**
 * Función para crear subtipos asociados
 * Solo se ejecuta si no existen duplicados.
 */
const crearSubtiposDenuncia = async (subtipos: any[], tipoDenunciaId: number) => {
    for (const subtipo of subtipos) {
        await SubtipoDenunciaModel.create({
            nombre: subtipo.nombre,
            descripcion: subtipo.descripcion,
            tipoDenunciaId,
            flagImage: subtipo.flagImage || 'default-image.jpg',
        });
    }
};

const validarSubtipos = async (subtipos: any[], res: Response) => {
    const subtipoNombres = new Set();

    for (const subtipo of subtipos) {
        // Validar si hay duplicados en los subtipos dentro de la misma solicitud
        if (subtipoNombres.has(subtipo.nombre)) {
            return handleDuplicateError(res, `El subtipo de denuncia '${subtipo.nombre}' ya está duplicado en la solicitud.`);
        }
        subtipoNombres.add(subtipo.nombre);

        // Validar si ya existe el subtipo en la base de datos
        const subtipoExistente = await SubtipoDenunciaModel.findOne({ where: { nombre: subtipo.nombre } });
        if (subtipoExistente) {
            return handleDuplicateError(res, `El subtipo de denuncia '${subtipo.nombre}' ya existe.`);
        }
    }
};

/**
 * Controlador para agregar un nuevo tipo de denuncia y sus subtipos asociados.
 * @param req - Objeto de solicitud con los datos del cuerpo (nombre, descripción, etc.).
 * @param res - Objeto de respuesta.
 */
export const addTipoDenuncia = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, esAnonimaOficial, flagImage, subtipos } = req.body;

        // Llamada a la función de validación de la entrada
        const inputValidationErrors = validateInput(nombre, descripcion, esAnonimaOficial, flagImage, subtipos);
        handleInputValidationErrors(inputValidationErrors, res);  // Manejo de errores si la validación falla
        // Verificar si el tipo de denuncia ya existe
        const tipoDenunciaExistente = await findTipoDenuncia(nombre);
        if (tipoDenunciaExistente) {
            return handleDuplicateError(res, `El tipo de denuncia '${nombre}' ya existe.`);
        }
       // Validar subtipos
       await validarSubtipos(subtipos, res);

        const tipoDenuncia = await crearTipoDenuncia(nombre, descripcion, esAnonimaOficial, flagImage);
        await crearSubtiposDenuncia(subtipos, tipoDenuncia.id);

        // Envío de la respuesta exitosa
        res.status(201).json({ message: 'Tipo de denuncia y subtipos creados con éxito', tipoDenuncia });
    } catch (error) {
        // Manejo de errores del servidor
        handleServerErrorDenuncaiAnonima(error, res);
    }
};

/**
 * Función para validar los datos de entrada.
 * @param nombre - Nombre del tipo de denuncia.
 * @param descripcion - Descripción del tipo de denuncia.
 * @param esAnonimaOficial - Indica si la denuncia es anónima u oficial.
 * @param flagImage - Imagen asociada.
 * @param subtipos - Subtipos asociados a la denuncia.
 * @returns Lista de errores de validación si los datos son incorrectos.
 */
export const validateInput = (nombre: string, descripcion: string, esAnonimaOficial: string, flagImage: string, subtipos: any[]): string[] => {
    const errors: string[] = [];

    // Validar campos requeridos del tipo de denuncia
    validateRequiredFields({ nombre, descripcion, esAnonimaOficial, flagImage }, errors);

    // Validar subtipos si están presentes
    if (Array.isArray(subtipos)) {
        validateSubtipos(subtipos, errors);
    }

    return errors;  // Retorna los errores
};

/**
 * Valida los campos requeridos del tipo de denuncia.
 * @param fields - Objeto con los campos a validar.
 * @param errors - Arreglo donde se almacenarán los mensajes de error.
 */
const validateRequiredFields = (fields: { [key: string]: string }, errors: string[]): void => {
    Object.keys(fields).forEach(key => {
        if (!fields[key]) {
            errors.push(errorMessages.requiredFields);  // Mensaje de error si algún campo está vacío
        }
    });
};

/**
 * Valida los subtipos de denuncia.
 * @param subtipos - Arreglo de subtipos a validar.
 * @param errors - Arreglo donde se almacenarán los mensajes de error.
 */
const validateSubtipos = (subtipos: any[], errors: string[]): void => {
    subtipos.forEach((subtipo) => {
        if (!subtipo.nombre || !subtipo.descripcion) {
            errors.push('Cada subtipo debe tener un nombre y una descripción.');
        }
    });
};


/**
 * Manejo de errores de validación de entrada.
 * @param errors - Lista de errores de validación.
 * @param res - Objeto de respuesta.
 */
export const handleInputValidationErrors = (errors: string[], res: Response): void => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
        throw new Error("Input validation failed");
    }
};
/**
 * Manejo de errores en el controlador DenunciaAnonima.
 * @param error - Error capturado.
 * @param res - Objeto de respuesta.
 */
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



/**
 * Controlador para obtener los tipos de denuncias anónimas.
 * @param req - Objeto de solicitud.
 * @param res - Objeto de respuesta.
 */
export const getTiposDenunciaAnonimas = async (req: Request, res: Response) => {
    try {
        const tiposDenuncias = await TipoDenunciaModel.findAll({
            where: {
                esAnonimaOficial: ['Anónima', 'Ambas']  // Filtra denuncias que sean 'Anónima' o 'Ambas'
            }
        });

        res.json(tiposDenuncias);  // Respuesta con los tipos de denuncias anónimas
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias anónimas' });
    }
};

// /**
//  * Controlador para obtener los tipos de denuncias oficiales.
//  * @param req - Objeto de solicitud.
//  * @param res - Objeto de respuesta.
//  */
// export const getTiposDenunciaOficiales = async (req: Request, res: Response) => {
//     try {
//         const tiposDenuncias = await TipoDenunciaModel.findAll({
//             where: {
//                 esAnonimaOficial: ['Oficial', 'Ambas']  // Filtra denuncias que sean 'Oficial' o 'Ambas'
//             }
//         });

//         res.json(tiposDenuncias);  // Respuesta con los tipos de denuncias oficiales
//     } catch (error) {
//         console.error('Error al obtener los tipos de denuncias oficiales:', error);
//         res.status(500).json({ message: 'Error al obtener los tipos de denuncias oficiales' });
//     }
// };
