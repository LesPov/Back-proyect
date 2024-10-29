import { Request, Response } from 'express';
import { TipoDenunciaModel, TipoDenunciaInterface } from '../../middleware/models/tipoDenunciaModel';
import { SubtipoDenunciaModel } from '../../middleware/models/subtipoDenunciaModel';
import { errorMessages } from '../../../../middleware/erros/errorMessages';



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

        // Construye el objeto de respuesta con URLs de las imágenes
        const tiposDenunciasConImagen = tiposDenuncias.map((tipo) => {
            return {
                ...tipo.toJSON(),
                imageUrl: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/${tipo.flagImage}` // URL completa de la imagen
            };
        });

        res.json(tiposDenunciasConImagen);  // Respuesta con los tipos de denuncias anónimas y URLs de imágenes
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias anónimas' });
    }
};
