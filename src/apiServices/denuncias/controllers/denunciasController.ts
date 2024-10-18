import { Request, Response } from 'express';
import { TipoDenunciaModel, TipoDenunciaInterface } from '../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../middleware/models/subtipoDenunciaModel ';

export const addTipoDenuncia = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, esAnonimaOficial, subtipos } = req.body;

        // Crear el tipo de denuncia
        const tipoDenuncia = await TipoDenunciaModel.create({
            nombre,
            descripcion,
            esAnonimaOficial
        });

        // Crear los subtipos asociados
        if (subtipos && Array.isArray(subtipos)) {
            for (const subtipo of subtipos) {
                await SubtipoDenunciaModel.create({
                    nombre: subtipo.nombre,
                    descripcion: subtipo.descripcion,
                    tipoDenunciaId: tipoDenuncia.id
                });
            }
        }

        res.status(201).json({ message: 'Tipo de denuncia y subtipos creados con éxito', tipoDenuncia });
    } catch (error) {
        console.error('Error al crear tipo de denuncia:', error);
        res.status(500).json({ message: 'Error al crear tipo de denuncia', error });
    }
};

export const getTiposDenuncia = async (req: Request, res: Response) => {
    try {
        const tiposDenuncia = await TipoDenunciaModel.findAll({
            include: [{
                model: SubtipoDenunciaModel,
                as: 'subtipos'
            }]
        });
        res.status(200).json(tiposDenuncia);
    } catch (error) {
        console.error('Error al obtener tipos de denuncia:', error);
        res.status(500).json({ message: 'Error al obtener tipos de denuncia', error });
    }
};