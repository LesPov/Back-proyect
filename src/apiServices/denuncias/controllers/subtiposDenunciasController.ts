import { errorMessages } from "../../../middleware/erros/errorMessages";
import { SubtipoDenunciaModel } from "../middleware/models/subtipoDenunciaModel";
import { TipoDenunciaModel } from "../middleware/models/tipoDenunciaModel";
import { Request, Response } from 'express';

/**
 * Función para buscar un tipo de denuncia por nombre
 * @param nombreTipoDenuncia - Nombre del tipo de denuncia a buscar
 * @returns El tipo de denuncia encontrado o null si no existe
 */
const buscarTipoDenunciaPorNombre = async (nombreTipoDenuncia: string) => {
    return await TipoDenunciaModel.findOne({
        where: { nombre: nombreTipoDenuncia },
        attributes: ['id', 'nombre', 'descripcion', 'flagImage', 'esAnonimaOficial']
    });
};

/**
 * Función para manejar errores y enviar la respuesta adecuada
 * @param res - Objeto de respuesta
 * @param statusCode - Código de estado HTTP
 * @param message - Mensaje de error a enviar
 */
const manejarError = (res: Response, statusCode: number, message: string) => {
    res.status(statusCode).json({
        ok: false,
        message
    });
};
/**
 * Función para buscar todos los subtipos asociados a un tipo de denuncia
 * @param tipoDenunciaId - ID del tipo de denuncia para buscar sus subtipos
 * @returns Un array de subtipos de denuncia
 */
const buscarSubtiposPorTipoDenuncia = async (tipoDenunciaId: number) => {
    return await SubtipoDenunciaModel.findAll({
        where: { tipoDenunciaId },
        attributes: ['id', 'nombre', 'descripcion', 'flagImage'],
        include: [{
            model: TipoDenunciaModel,
            attributes: ['nombre', 'esAnonimaOficial', 'descripcion']
        }]
    });
};
/**
 * Función para estructurar la respuesta del controlador
 * @param tipoDenuncia - Objeto del tipo de denuncia
 * @param subtipos - Array de subtipos de denuncia
 * @returns Un objeto estructurado con la respuesta
 */
const estructurarRespuesta = (tipoDenuncia: any, subtipos: any[]) => {
    return {
        ok: true,
        tipoDenuncia: {
            ...tipoDenuncia.toJSON(),
            cantidadSubtipos: subtipos.length
        },
        subtipos
    };
};
/**
 * Función para manejar la respuesta cuando no hay subtipos registrados
 * @param res - Objeto de respuesta
 * @param response - Objeto estructurado de la respuesta
 * @param nombreTipoDenuncia - Nombre del tipo de denuncia
 */
const manejarRespuestaSinSubtipos = (res: Response, response: any, nombreTipoDenuncia: string) => {
    res.status(200).json({
        ...response,
        message: `El tipo de denuncia '${nombreTipoDenuncia}' no tiene subtipos registrados`
    });
};
/**
 * Función para enviar una respuesta exitosa al cliente
 * @param res - Objeto de respuesta
 * @param response - Objeto estructurado de la respuesta
 * @param mensaje - Mensaje de éxito a enviar
 */
const enviarRespuestaExitosa = (res: Response, response: any, mensaje: string) => {
    res.status(200).json({
        ...response,
        message: 'Subtipos de denuncia recuperados exitosamente'
    });
};

/**
 * Controlador para obtener los subtipos de una denuncia por el nombre del tipo
 * @param req - Request con el parámetro nombreTipoDenuncia
 * @param res - Response para enviar la respuesta al cliente
 */
export const getSubtiposDenuncia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombreTipoDenuncia } = req.params;

        // Llamamos a la función para buscar el tipo de denuncia
        const tipoDenuncia = await buscarTipoDenunciaPorNombre(nombreTipoDenuncia);

        // Si no existe el tipo de denuncia, manejamos el error
        if (!tipoDenuncia) {
            return manejarError(res, 404, `No se encontró el tipo de denuncia con nombre: ${nombreTipoDenuncia}`);
        }

        // Llamamos a la nueva función para buscar los subtipos
        const subtipos = await buscarSubtiposPorTipoDenuncia(tipoDenuncia.id);


        // Estructuramos la respuesta usando la nueva función
        const response = estructurarRespuesta(tipoDenuncia, subtipos);

        // Si no hay subtipos, manejamos la respuesta con mensaje informativo
        if (subtipos.length === 0) {
            return manejarRespuestaSinSubtipos(res, response, nombreTipoDenuncia);
        }

       // Enviamos la respuesta exitosa con los datos usando la nueva función
       enviarRespuestaExitosa(res, response, 'Subtipos de denuncia recuperados exitosamente');

    } catch (error) {
        // Manejo de errores del servidor
        handleServerErrorsubtiposDenuncaiAnonima(error, res);
    }
};

/**
 * Manejo de errores en el controlador DenunciaAnonima.
 * @param error - Error capturado.
 * @param res - Objeto de respuesta.
 */
export const handleServerErrorsubtiposDenuncaiAnonima = (error: any, res: Response) => {
    console.error("Error en el controlador DenunciaAnonima:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages.databaseError,
            error,
        });
        throw new Error("Controller subtiposDenunciaAnonima error");
    }
};