import { Request, Response } from 'express';
import { TipoDenunciaModel } from '../../../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../../../middleware/models/subtipoDenunciaModel';
import { DenunciaAnonimaModel } from '../../../middleware/models/denunciasAnonimasModel';
import { errorMessages } from '../../../../../middleware/erros/errorMessages';
import { successMessages } from '../../../../../middleware/success/successMessages';

// Función para validar la clave única
const validateClaveUnica = (claveUnica: string): string[] => {
    const errors: string[] = [];
    if (!claveUnica) {
        errors.push(errorMessages.requiredFields);
    }
    return errors;
};
export const handleInputValidationErrors = (errors: string[], res: Response): void => {
    if (errors.length > 0) {
        res.status(400).json({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
        throw new Error("Input validation failed");
    }
};
// Función para buscar la denuncia con sus relaciones
// Función mejorada para buscar la denuncia con sus relaciones
const findDenunciaWithRelations = async (claveUnica: string) => {
    return await DenunciaAnonimaModel.findOne({
        where: { claveUnica },
        include: [
            {
                model: TipoDenunciaModel,
                as: 'TipoDenuncia', // Asegúrate de que este alias coincida con tu definición de relación
                attributes: ['id', 'nombre'], // Incluimos el ID también para referencia
                required: true // INNER JOIN para asegurar que siempre tengamos el tipo
            },
            {
                model: SubtipoDenunciaModel,
                as: 'SubtipoDenuncia', // Asegúrate de que este alias coincida con tu definición de relación
                attributes: ['id', 'nombre'], // Incluimos el ID también para referencia
                required: true // INNER JOIN para asegurar que siempre tengamos el subtipo
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
            'subtipoDenunciaId'
        ]
    });
};

// Función mejorada para manejar la respuesta exitosa
const handleSuccessResponse = (res: Response, denuncia: any) => {
    // Verificamos que tengamos acceso a los datos de tipo y subtipo
    if (!denuncia.TipoDenuncia || !denuncia.SubtipoDenuncia) {
        throw new Error('No se pudo obtener la información completa de tipo o subtipo de denuncia');
    }

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
                nombre: denuncia.TipoDenuncia.nombre
            },
            subtipoDenuncia: {
                id: denuncia.SubtipoDenuncia.id,
                nombre: denuncia.SubtipoDenuncia.nombre
            },
            pruebas: denuncia.pruebas,
            audio: denuncia.audio,
            tieneEvidencia: denuncia.tieneEvidencia,
            fechaCreacion: denuncia.createdAt,
            fechaActualizacion: denuncia.updatedAt
        }
    });
};



// Función para manejar denuncia no encontrada
const handleDenunciaNotFound = (res: Response) => {
    res.status(404).json({
        success: false,
        message: errorMessages.denunciaNotFound,
        error: 'No se encontró ninguna denuncia con la clave proporcionada'
    });
};


// Controlador principal
export const consultarDenunciaAnonima = async (req: Request, res: Response) => {
    try {
        const { claveUnica } = req.query as { claveUnica: string }; // Cambiamos a req.query

        // Validar la entrada de datos (claveUnica)
        const inputValidationErrors = validateClaveUnica(claveUnica);
        // Manejar cualquier error de validación de la entrada de datos
        handleInputValidationErrors(inputValidationErrors, res);

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
        error: error.message
    });
}; 
