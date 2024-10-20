"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenunciaAnonimaModel = void 0;
const sequelize_1 = require("sequelize");
const tipoDenunciaModel_1 = require("./tipoDenunciaModel");
const connnection_1 = __importDefault(require("../../../../database/connnection"));
const subtipoDenunciaModel_1 = require("./subtipoDenunciaModel ");
// Definición del modelo para Denuncias Anónimas
exports.DenunciaAnonimaModel = connnection_1.default.define('DenunciaAnonima', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipoDenunciaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoDenunciaModel_1.TipoDenunciaModel,
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    subtipoDenunciaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: subtipoDenunciaModel_1.SubtipoDenunciaModel,
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    pruebas: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    evidenciasMultimedia: {
        type: sequelize_1.DataTypes.TEXT, // Cambiado a TEXT para almacenar JSON
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('evidenciasMultimedia');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('evidenciasMultimedia', JSON.stringify(value));
        },
    },
    audio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latitud: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    longitud: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    keyAnonima: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pendiente', 'en proceso', 'resuelta', 'rechazada'),
        allowNull: false,
        defaultValue: 'pendiente',
    },
}, {
    tableName: 'denuncias_anonimas',
    timestamps: true,
});
// Establecer relaciones
tipoDenunciaModel_1.TipoDenunciaModel.hasMany(exports.DenunciaAnonimaModel, { foreignKey: 'tipoDenunciaId' });
exports.DenunciaAnonimaModel.belongsTo(tipoDenunciaModel_1.TipoDenunciaModel, { foreignKey: 'tipoDenunciaId' });
subtipoDenunciaModel_1.SubtipoDenunciaModel.hasMany(exports.DenunciaAnonimaModel, { foreignKey: 'subtipoDenunciaId' });
exports.DenunciaAnonimaModel.belongsTo(subtipoDenunciaModel_1.SubtipoDenunciaModel, { foreignKey: 'subtipoDenunciaId' });
