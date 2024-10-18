"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDenunciaModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../../../../database/connnection"));
// Definición del modelo para Tipos de Denuncias
exports.TipoDenunciaModel = connnection_1.default.define('TipoDenuncia', {
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
    esAnonimaOficial: {
        type: sequelize_1.DataTypes.ENUM('Anónima', 'Oficial', 'Ambas'),
        allowNull: false,
    },
}, {
    tableName: 'tipos_denuncias',
    timestamps: true, // No agregamos las columnas createdAt y updatedAt
});
