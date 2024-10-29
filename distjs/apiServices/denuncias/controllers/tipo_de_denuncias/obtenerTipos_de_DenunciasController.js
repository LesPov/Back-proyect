"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTiposDenunciaAnonimas = void 0;
const tipoDenunciaModel_1 = require("../../middleware/models/tipoDenunciaModel");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Controlador para obtener los tipos de denuncias anónimas.
 * @param req - Objeto de solicitud.
 * @param res - Objeto de respuesta.
 */
const getTiposDenunciaAnonimas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDenuncias = yield tipoDenunciaModel_1.TipoDenunciaModel.findAll({
            where: {
                esAnonimaOficial: ['Anónima', 'Ambas'] // Filtra denuncias que sean 'Anónima' o 'Ambas'
            }
        });
        // Construye el objeto de respuesta con URLs de las imágenes
        const tiposDenunciasConImagen = tiposDenuncias.map((tipo) => {
            return Object.assign(Object.assign({}, tipo.toJSON()), { imageUrl: `https://g7hr118t-1001.use2.devtunnels.ms/uploads/${tipo.flagImage}` // URL completa de la imagen
             });
        });
        res.json(tiposDenunciasConImagen); // Respuesta con los tipos de denuncias anónimas y URLs de imágenes
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias anónimas' });
    }
});
exports.getTiposDenunciaAnonimas = getTiposDenunciaAnonimas;
