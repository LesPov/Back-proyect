"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationModel = void 0;
const sequelize_1 = require("sequelize");
const connnection_1 = __importDefault(require("../../../../database/connnection"));
const authModel_1 = require("./authModel");
exports.VerificationModel = connnection_1.default.define('verification', {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: authModel_1.AuthModel,
            key: 'id', // La columna que se usará como clave primaria
        }
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isEmailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    verificationCode: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    loginAttempts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    blockExpiration: {
        type: sequelize_1.DataTypes.DATE,
    },
    verificationCodeExpiration: {
        type: sequelize_1.DataTypes.DATE,
    },
    randomPassword: {
        type: sequelize_1.DataTypes.STRING,
    },
    isPhoneVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
authModel_1.AuthModel.hasOne(exports.VerificationModel, { foreignKey: 'userId' });
exports.VerificationModel.belongsTo(authModel_1.AuthModel, { foreignKey: 'userId' });
