"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../../database/connnection"));
/**
 * Definición del modelo de autenticación (`AuthModel`) utilizando Sequelize.
 * Este modelo representa la tabla `auth` en la base de datos, la cual almacena
 * la información de autenticación de los usuarios, incluyendo el nombre de usuario,
 * contraseña, correo electrónico, número de teléfono y rol.
 *
 * @model AuthModel
 * @interface AuthInterface
 */
exports.AuthModel = connnection_1.default.define('auth', {
    /**
     * Identificador único del usuario (clave primaria).
     * Se genera automáticamente de manera incremental.
     */
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    /**
     * Nombre de usuario único.
     * Este campo es obligatorio y no puede ser nulo.
     */
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    /**
     * Contraseña del usuario.
     * Este campo es obligatorio y no puede ser nulo.
     */
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    /**
     * Dirección de correo electrónico única del usuario.
     * Este campo es obligatorio y no puede ser nulo.
     */
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    /**
     * Número de teléfono del usuario.
     * Este campo es opcional y puede ser nulo.
     * Es único para cada usuario si se proporciona.
     */
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // El campo puede ser nulo
        unique: true,
    },
    /**
     * Rol del usuario en la aplicación (ej. 'admin', 'user', etc.).
     * Este campo es obligatorio y no puede ser nulo.
     */
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    /**
     * Indicador de si el usuario está verificado en general.
     * Valor por defecto: `false`.
     */
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
