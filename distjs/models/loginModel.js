"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../database/connnection"));
exports.Usuario = connnection_1.default.define('usuarios', {
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    apellido_paterno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    apellido_materno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    sexo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Puedes ajustar según tus necesidades
    },
    celular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.DATE,
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
exports.default = exports.Usuario;
