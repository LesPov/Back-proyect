
import { DataTypes, Model } from 'sequelize';

// Modelo para la tabla 'usuarios'
export interface UsuarioModel extends Model {
    [x: string]: any;

    usuario_id: number;
    usuario: string;
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