"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../database/connnection"));
exports.RolModel = connnection_1.default.define('rol', {
    rol_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sigla: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    fecha_actualizacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('Activado', 'Desactivado'), // Define un enum para limitar los valores posibles
        allowNull: false,
        defaultValue: 'Activado',
    },
}, {
    timestamps: false, // Desactivar las columnas createdAt y updatedAt
});
exports.default = exports.RolModel;
