import { Request, Response } from 'express';
import { TipoDenunciaModel, TipoDenunciaInterface } from '../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../middleware/models/subtipoDenunciaModel ';
export const addTipoDenuncia = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, esAnonimaOficial, flagImage, subtipos } = req.body;

        // Crear el tipo de denuncia
        const tipoDenuncia = await TipoDenunciaModel.create({
            nombre,
            descripcion,
            esAnonimaOficial,
            flagImage,
        });

        // Crear los subtipos asociados
        if (subtipos && Array.isArray(subtipos)) {
            for (const subtipo of subtipos) {
                // Agregar flagImage si es necesario para los subtipos
                await SubtipoDenunciaModel.create({
                    nombre: subtipo.nombre,
                    descripcion: subtipo.descripcion,
                    tipoDenunciaId: tipoDenuncia.id,
                    flagImage: subtipo.flagImage || 'default-image.jpg'  // Agregar una imagen predeterminada si no se proporciona
                });
            }
        }

        res.status(201).json({ message: 'Tipo de denuncia y subtipos creados con éxito', tipoDenuncia });
    } catch (error) {
        console.error('Error al crear tipo de denuncia:', error);
        res.status(500).json({ message: 'Error al crear tipo de denuncia', error });
    }
};
 

// Controlador para obtener todos los tipos de denuncias
export const getTiposDenuncia = async (req: Request, res: Response) => {
    try {
        const tipos = await TipoDenunciaModel.findAll(); // Consulta a la base de datos para obtener todos los tipos de denuncias
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias', error });
    }
};

export const getTiposDenunciaAnonimas = async (req: Request, res: Response) => {
    try {
      const tiposDenuncias = await TipoDenunciaModel.findAll({
        where: {
          esAnonimaOficial: ['Anónima', 'Ambas'] // Filtra denuncias que sean 'Anónima' o 'Ambas'
        }
      });
  
      res.json(tiposDenuncias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los tipos de denuncias anónimas' });
    }
  };