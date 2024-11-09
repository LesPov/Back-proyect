"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenunciaAnonimaModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../../../../database/connnection"));
const tipoDenunciaModel_1 = require("./tipoDenunciaModel");
const subtipoDenunciaModel_1 = require("./subtipoDenunciaModel");
const authModel_1 = require("../../../../middleware/models/authModel");
// Definición del modelo para Denuncias Anónimas
// Modificación del modelo para agregar columnas opcionales
exports.DenunciaAnonimaModel = connnection_1.default.define('DenunciaAnonima', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pendiente', 'En Proceso', 'Cerrada'),
        allowNull: false,
        defaultValue: 'Pendiente',
    },
    tipoDenunciaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tipos_denuncias',
            key: 'id',
        },
        allowNull: false,
    },
    subtipoDenunciaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'subtipos_denuncias',
            key: 'id',
        },
        allowNull: false,
    },
    claveUnica: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pruebas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Opcional, aquí almacenarías la ruta o nombre del archivo multimedia
    },
    audio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Opcional, aquí almacenarías la ruta o nombre del archivo de audio
    },
    tieneEvidencia: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Por defecto será false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'auth',
            key: 'id',
        },
        allowNull: true,
    },
}, {
    tableName: 'denuncias_anonimas',
    timestamps: true,
});
// Relación entre AuthModel y DenunciaAnonimaModel para que cada usuario pueda realizar múltiples denuncias
authModel_1.AuthModel.hasMany(exports.DenunciaAnonimaModel, {
    foreignKey: 'userId',
    as: 'Denuncias',
});
exports.DenunciaAnonimaModel.belongsTo(authModel_1.AuthModel, {
    foreignKey: 'userId',
    as: 'Usuario',
});
// Relación entre DenunciaAnonima y TipoDenuncia
tipoDenunciaModel_1.TipoDenunciaModel.hasMany(exports.DenunciaAnonimaModel, {
    foreignKey: 'tipoDenunciaId',
    as: 'Denuncias'
});
exports.DenunciaAnonimaModel.belongsTo(tipoDenunciaModel_1.TipoDenunciaModel, {
    foreignKey: 'tipoDenunciaId',
    as: 'TipoDenuncia' // Este alias debe coincidir con el usado en la consulta
});
// Relación entre DenunciaAnonima y SubtipoDenuncia
subtipoDenunciaModel_1.SubtipoDenunciaModel.hasMany(exports.DenunciaAnonimaModel, {
    foreignKey: 'subtipoDenunciaId',
    as: 'Denuncias'
});
exports.DenunciaAnonimaModel.belongsTo(subtipoDenunciaModel_1.SubtipoDenunciaModel, {
    foreignKey: 'subtipoDenunciaId',
    as: 'SubtipoDenuncia' // Este alias debe coincidir con el usado en la consulta
});
