"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../../../../database/connnection"));
const authModel_1 = require("./authModel");
/**
 * Definición del modelo de verificación (`VerificationModel`) utilizando Sequelize.
 * Este modelo representa la tabla `verification` en la base de datos, la cual almacena
 * la información de verificación relacionada con un usuario, incluyendo la verificación de correo,
 * intentos de inicio de sesión, y otros datos de seguridad.
 *
 * @model VerificationModel
 * @interface VerificationInterface
 */
exports.VerificationModel = connnection_1.default.define('verification', {
    /**
     * Identificador del usuario (clave foránea).
     * Hace referencia al `id` en el `AuthModel`.
     */
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Un usuario debe tener una única entrada de verificación
        references: {
            model: authModel_1.AuthModel, // Modelo al que hace referencia
            key: 'id', // Clave primaria en el modelo AuthModel
        },
    },
    /**
     * Indicador de si el usuario está verificado en general.
     * Valor por defecto: `false`.
     */
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    /**
     * Indicador de si el correo electrónico del usuario ha sido verificado.
     * Valor por defecto: `false`.
     */
    isEmailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    /**
     * Código de verificación generado para el usuario.
     * Valor por defecto: UUID versión 4.
     */
    verificationCode: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    /**
     * Contador de intentos de inicio de sesión fallidos.
     * Valor por defecto: `0`.
     */
    loginAttempts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    /**
     * Fecha y hora de expiración del bloqueo de la cuenta.
     * Este campo se utiliza si el usuario ha excedido los intentos de inicio de sesión.
     */
    blockExpiration: {
        type: sequelize_1.DataTypes.DATE,
    },
    /**
     * Fecha y hora de expiración del código de verificación.
     */
    verificationCodeExpiration: {
        type: sequelize_1.DataTypes.DATE,
    },
    /**
     * Contraseña aleatoria generada para el usuario, si es necesario.
     * Este campo es opcional.
     */
    randomPassword: {
        type: sequelize_1.DataTypes.STRING,
    },
    /**
     * Indicador de si el número de teléfono del usuario ha sido verificado.
     * Valor por defecto: `false`.
     */
    isPhoneVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
/**
 * Relaciones entre modelos:
 *
 * - `AuthModel` tiene una relación de uno a uno con `VerificationModel`, usando `userId` como clave foránea.
 * - `VerificationModel` pertenece a `AuthModel`, también usando `userId` como clave foránea.
 */
authModel_1.AuthModel.hasOne(exports.VerificationModel, { foreignKey: 'userId' });
exports.VerificationModel.belongsTo(authModel_1.AuthModel, { foreignKey: 'userId' });
