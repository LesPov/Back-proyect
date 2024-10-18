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
exports.getTiposDenuncia = exports.addTipoDenuncia = void 0;
const tipoDenunciaModel_1 = require("../middleware/models/tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("../middleware/models/subtipoDenunciaModel ");
const addTipoDenuncia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, esAnonimaOficial, subtipos } = req.body;
        // Crear el tipo de denuncia
        const tipoDenuncia = yield tipoDenunciaModel_1.TipoDenunciaModel.create({
            nombre,
            descripcion,
            esAnonimaOficial
        });
        // Crear los subtipos asociados
        if (subtipos && Array.isArray(subtipos)) {
            for (const subtipo of subtipos) {
                yield subtipoDenunciaModel_1.SubtipoDenunciaModel.create({
                    nombre: subtipo.nombre,
                    descripcion: subtipo.descripcion,
                    tipoDenunciaId: tipoDenuncia.id
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
const getTiposDenuncia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDenuncia = yield tipoDenunciaModel_1.TipoDenunciaModel.findAll({
            include: [{
                    model: subtipoDenunciaModel_1.SubtipoDenunciaModel,
                    as: 'subtipos'
                }]
        });
        res.status(200).json(tiposDenuncia);
    }
    catch (error) {
        console.error('Error al obtener tipos de denuncia:', error);
        res.status(500).json({ message: 'Error al obtener tipos de denuncia', error });
    }
});
exports.getTiposDenuncia = getTiposDenuncia;
