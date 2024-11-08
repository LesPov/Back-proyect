import { errorMessages } from "../../../../middleware/erros/errorMessages";
import { SubtipoDenunciaModel } from "../../middleware/models/subtipoDenunciaModel";
import { TipoDenunciaModel } from "../../middleware/models/tipoDenunciaModel";
import upload from "../../utils/uploadConfig";
import { validateImageUpload } from "../tipo_de_denuncias/tipos_de_DenunciasController";
import { Request, Response } from 'express';

// Función para buscar tipo de denuncia por ID
export const findTipoDenunciaById = async (tipoDenunciaId: number) => {
    return await TipoDenunciaModel.findByPk(tipoDenunciaId);
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
// Manejo de errores de subida de imagen
export const handleImageUploadError = (err: any, res: Response) => {
    console.error(`Error en la subida de la imagen: ${err.message}`);
    res.status(400).json({
        msg: `Error en la subida de la imagen: ${err.message}`,
        errors: 'Error al cargar la imagen',
    });
};


// Controlador para crear un subtipo de denuncia con imagen// Controlador para crear un subtipo de denuncia con imagen
export const creaSubtipoDenuncia = async (req: Request, res: Response) => {
    req.body.subtipo = 'subtipo'; // Marca este registro como subtipo de denuncia
    try {
        // Maneja la subida de imagen

        handleImageUpload(req, res, async () => {
            // Valida si la imagen fue subida
            if (!validateImageUpload(req, res)) return;

            const { nombre, descripcion, tipoDenunciaId } = req.body;
            const flagImage = req.file?.filename || null;

            // Verificar si el tipo de denuncia existe
            const tipoDenuncia = await findTipoDenunciaById(tipoDenunciaId);
            if (!tipoDenuncia) {
                res.status(404).json({
                    message: `El tipo de denuncia con ID ${tipoDenunciaId} no existe.`
                });
                return; // Agregar `return` aquí para evitar que devuelva algo
            }

            // Crear el subtipo de denuncia
            const subtipoDenuncia = await SubtipoDenunciaModel.create({
                nombre,
                descripcion,
                tipoDenunciaId,
                flagImage,
            });

            res.status(201).json({
                message: 'Subtipo de denuncia creado con éxito',
                subtipoDenuncia
            });
        });
    } catch (error) {
        handleServerErrorDenuncaiAnonima(error, res);
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
