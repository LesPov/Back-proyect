import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connnection";
import UserModel from "./userModel";
// Modelo para la tabla 'verificacion'
export interface verificacionInterface extends Model {
    [x: string]: any;

    usuario_id: number;
    verificado: boolean;
    correo_verificado: boolean;
    codigo_verificacion: string;
    intentos_ingreso: number;
    expiracion_intentos_ingreso: Date;
    expiracion_codigo_verificacion: Date;
    contrasena_aleatoria: string;
    celular_verificado: boolean;
    fecha_registro: Date;
    fecha_actualizacion: Date;
} 

export const verificacionModel = sequelize.define<verificacionInterface>('verificacion', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: UserModel,
            key: 'usuario_id'
        }
    },
    verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    correo_verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    codigo_verificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    intentos_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    expiracion_intentos_ingreso: {
        type: DataTypes.DATE,
    },
    expiracion_codigo_verificacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    contrasena_aleatoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    celular_verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false, // Desactivar las columnas createdAt y updatedAt
});
// Establecemos la relación con el modelo de usuarios
UserModel.hasOne(verificacionModel, { foreignKey: 'usuario_id' });
verificacionModel.belongsTo(UserModel, { foreignKey: 'usuario_id' });

export default verificacionModel;
