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
exports.getTiposDenunciaOficiales = exports.getTiposDenunciaAnonimas = exports.addTipoDenuncia = void 0;
const tipoDenunciaModel_1 = require("../middleware/models/tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("../middleware/models/subtipoDenunciaModel ");
const addTipoDenuncia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, esAnonimaOficial, flagImage, subtipos } = req.body;
        // Crear el tipo de denuncia
        const tipoDenuncia = yield tipoDenunciaModel_1.TipoDenunciaModel.create({
            nombre,
            descripcion,
            esAnonimaOficial,
            flagImage,
        });
        // Crear los subtipos asociados
        if (subtipos && Array.isArray(subtipos)) {
            for (const subtipo of subtipos) {
                // Agregar flagImage si es necesario para los subtipos
                yield subtipoDenunciaModel_1.SubtipoDenunciaModel.create({
                    nombre: subtipo.nombre,
                    descripcion: subtipo.descripcion,
                    tipoDenunciaId: tipoDenuncia.id,
                    flagImage: subtipo.flagImage || 'default-image.jpg' // Agregar una imagen predeterminada si no se proporciona
                });
            }
        }
        res.status(201).json({ message: 'Tipo de denuncia y subtipos creados con éxito', tipoDenuncia });
    }
    catch (error) {
        console.error('Error al crear tipo de denuncia:', error);
        res.status(500).json({ message: 'Error al crear tipo de denuncia', error });
    }
});
exports.addTipoDenuncia = addTipoDenuncia;
const getTiposDenunciaAnonimas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDenuncias = yield tipoDenunciaModel_1.TipoDenunciaModel.findAll({
            where: {
                esAnonimaOficial: ['Anónima', 'Ambas'] // Filtra denuncias que sean 'Anónima' o 'Ambas'
            }
        });
        res.json(tiposDenuncias);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias anónimas' });
    }
});
exports.getTiposDenunciaAnonimas = getTiposDenunciaAnonimas;
const getTiposDenunciaOficiales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDenuncias = yield tipoDenunciaModel_1.TipoDenunciaModel.findAll({
            where: {
                esAnonimaOficial: ['Oficial', 'Ambas'] // Filtra denuncias que sean 'Oficial' o 'Ambas'
            }
        });
        res.json(tiposDenuncias);
    }
    catch (error) {
        console.error('Error al obtener los tipos de denuncias oficiales:', error);
        res.status(500).json({ message: 'Error al obtener los tipos de denuncias oficiales' });
    }
});
exports.getTiposDenunciaOficiales = getTiposDenunciaOficiales;
