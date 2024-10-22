"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtipoDenunciaModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../../../../database/connnection"));
const tipoDenunciaModel_1 = require("./tipoDenunciaModel");
// Definición del modelo para Subtipos de Denuncias
exports.SubtipoDenunciaModel = connnection_1.default.define('SubtipoDenuncia', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    flagImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    tipoDenunciaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tipos_denuncias',
            key: 'id',
        },
        onDelete: 'CASCADE', // Eliminar subtipo si el tipo de denuncia se elimina
    },
}, {
    tableName: 'subtipos_denuncias',
    timestamps: true, // No agregamos createdAt y updatedAt
});
// Definir la relación entre Tipos de Denuncias y Subtipos de Denuncias
tipoDenunciaModel_1.TipoDenunciaModel.hasMany(exports.SubtipoDenunciaModel, {
    foreignKey: 'tipoDenunciaId',
});
exports.SubtipoDenunciaModel.belongsTo(tipoDenunciaModel_1.TipoDenunciaModel, {
    foreignKey: 'tipoDenunciaId',
});
