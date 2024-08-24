"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificacionModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../database/connnection"));
const userModel_1 = __importDefault(require("./userModel"));
exports.verificacionModel = connnection_1.default.define('verificacion', {
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: userModel_1.default,
            key: 'usuario_id'
        }
    },
    verificado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    correo_verificado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    codigo_verificacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    intentos_ingreso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    expiracion_intentos_ingreso: {
        type: sequelize_1.DataTypes.DATE,
    },
    expiracion_codigo_verificacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    contrasena_aleatoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    celular_verificado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    fecha_actualizacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    timestamps: false, // Desactivar las columnas createdAt y updatedAt
});
// Establecemos la relación con el modelo de usuarios
userModel_1.default.hasOne(exports.verificacionModel, { foreignKey: 'usuario_id' });
exports.verificacionModel.belongsTo(userModel_1.default, { foreignKey: 'usuario_id' });
exports.default = exports.verificacionModel;
