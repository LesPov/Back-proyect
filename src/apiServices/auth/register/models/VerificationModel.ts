import { DataTypes } from "sequelize";
import sequelize from "../../../../database/connnection";
import { VerificationInterface } from "../Interfaces/VerificationInterface";
import { AuthModel } from "./authModel";

export const VerificationModel = sequelize.define<VerificationInterface>('verification', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: AuthModel,
        key: 'id', // La columna que se usará como clave primaria
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    blockExpiration: {
      type: DataTypes.DATE,
    },
    verificationCodeExpiration: {
      type: DataTypes.DATE,
    },
    randomPassword: {
      type: DataTypes.STRING,
    },
    isPhoneVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  
  AuthModel.hasOne(VerificationModel, { foreignKey: 'userId' });
  VerificationModel.belongsTo(AuthModel, { foreignKey: 'userId' });