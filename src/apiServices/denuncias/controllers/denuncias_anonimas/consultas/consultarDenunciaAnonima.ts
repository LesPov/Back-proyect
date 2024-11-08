import { Request, Response } from 'express';
import { TipoDenunciaModel } from '../../../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../../../middleware/models/subtipoDenunciaModel';
import { DenunciaAnonimaModel } from '../../../middleware/models/denunciasAnonimasModel';
import { errorMessages } from '../../../../../middleware/erros/errorMessages';
import { successMessages } from '../../../../../middleware/success/successMessages';

// Función para validar la clave única
const validateClaveUnica = (claveUnica: string): string[] => {
    const errors: string[] = [];
    if (!claveUnica || claveUnica.trim() === '') { // Verifica si está vacía o mal formada
        errors.push('La clave única es requerida y no puede estar vacía.');
    }
    return errors;
};
// Función para manejar errores de validación sin lanzar una excepción// Función para manejar errores de validación sin lanzar una excepción
const handleInputValidationErrors = (errors: string[], res: Response): boolean => {
    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: 'Error en la validación de los datos.',
            errors: errors
        });
        return true; // Indica que hubo un error de validación
    }
    return false; // No hubo errores de validación
};


// Función mejorada para buscar la denuncia con sus relaciones
const findDenunciaWithRelations = async (claveUnica: string) => {
    return await DenunciaAnonimaModel.findOne({
        where: { claveUnica },
        include: [
            {
                model: TipoDenunciaModel,
                as: 'TipoDenuncia',
                attributes: ['id', 'nombre'],
                required: true,
            },
            {
                model: SubtipoDenunciaModel,
                as: 'SubtipoDenuncia',
                attributes: ['id', 'nombre'],
                required: true,
            }
        ],
        attributes: [
            'id',
            'descripcion',
            'direccion',
            'status',
            'claveUnica',
            'pruebas',
            'audio',
            'tieneEvidencia',
            'createdAt',
            'updatedAt',
            'tipoDenunciaId',
            'subtipoDenunciaId',
        ]
    });
};

// Función para manejar la respuesta exitosa
const handleSuccessResponse = (res: Response, denuncia: any) => {
    if (!denuncia.TipoDenuncia || !denuncia.SubtipoDenuncia) {
        throw new Error('No se pudo obtener la información completa de tipo o subtipo de denuncia');
    }
    const pruebasUrls = denuncia.pruebas
    ? denuncia.pruebas.split(',').map((file: string) => {
        if (file.trim().endsWith('.webm')) {
            return {
                type: 'video',
                url: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/evidenciasDenuncias/videos/${file.trim()}`
            };
        } else {
            return {
                type: 'image',
                url: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/evidenciasDenuncias/imagenes/${file.trim()}`
            };
        }
    })
    : [];

    const audioUrl = denuncia.audio
        ? `https://g7hr118t-1001.use2.devtunnels.ms/uploads/evidenciasDenuncias/audios/${denuncia.audio}`
        : null;



    res.status(200).json({
        success: true,
        message: successMessages.consultaExitosa,
        denuncia: {
            id: denuncia.id,
            descripcion: denuncia.descripcion,
            direccion: denuncia.direccion,
            status: denuncia.status,
            claveUnica: denuncia.claveUnica,
            tipoDenuncia: {
                id: denuncia.TipoDenuncia.id,
                nombre: denuncia.TipoDenuncia.nombre,
            },
            subtipoDenuncia: {
                id: denuncia.SubtipoDenuncia.id,
                nombre: denuncia.SubtipoDenuncia.nombre,
            },
            pruebas: pruebasUrls,
            audio: audioUrl,
            tieneEvidencia: denuncia.tieneEvidencia,
            fechaCreacion: denuncia.createdAt,
            fechaActualizacion: denuncia.updatedAt,
        },
    });
};

// Función para manejar denuncia no encontrada
const handleDenunciaNotFound = (res: Response) => {
    res.status(404).json({
        success: false,
        message: errorMessages.denunciaNotFound,
        error: 'No se encontró ninguna denuncia con la clave proporcionada',
    });
};

// Controlador principal
// Controlador principal
export const consultarDenunciaAnonima = async (req: Request, res: Response) => {
    try {
        const { claveUnica } = req.query as { claveUnica: string }; // Cambiamos a req.query

        // Validar la entrada de datos (claveUnica)
        const inputValidationErrors = validateClaveUnica(claveUnica);

        // Manejar cualquier error de validación de la entrada de datos
        if (handleInputValidationErrors(inputValidationErrors, res)) {
            return; // Detenemos la ejecución si hubo un error de validación
        }

        // Buscar la denuncia
        const denuncia = await findDenunciaWithRelations(claveUnica);

        // Verificar si se encontró la denuncia
        if (!denuncia) {
            return handleDenunciaNotFound(res);
        }

        // Enviar respuesta exitosa
        handleSuccessResponse(res, denuncia);

    } catch (error) {
        handleServerError(error, res);
    }
};

// Manejador de errores del servidor
export const handleServerError = (error: any, res: Response) => {
    console.error("Error en el controlador de consulta denuncia anónima:", error);
    res.status(500).json({
        message: errorMessages.serverError,
        error: error.message,
    });
};
