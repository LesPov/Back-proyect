import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connnection';
// Modelo para la tabla 'usuarios'
export interface userInterface extends Model {
    [x: string]: any;

    usuario_id: number;
    username: string;
    contrasena: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    sexo: string;
    dni: string;
    direccion: string;
    celular: string;
    email: string;
    fecha_nacimiento: Date;
    fecha_registro: Date;
    fecha_actualizacion: Date;
    estado: string;
} 
/**
 * Modelo Sequelize que mapea la tabla `user` en la base de datos.
 * Define la estructura de la tabla, incluyendo tipos de datos, restricciones y relaciones.
 */
export const UserModel = sequelize.define<userInterface>('usuarios', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true, // Puedes ajustar según tus necesidades
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    estado: {
        type: DataTypes.ENUM('Activado', 'Desactivado'), // Define un enum para limitar los valores posibles
        allowNull: false,
        defaultValue: 'Activado',
    },
}, {
    timestamps: false, // Desactivar las columnas createdAt y updatedAt
});
export default UserModel;
