import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/connnection';
import { AuthInterface } from '../interfaces/authInterface';

/**
 * Definición del modelo de autenticación (`AuthModel`) utilizando Sequelize.
 * Este modelo representa la tabla `auth` en la base de datos, la cual almacena
 * la información de autenticación de los usuarios, incluyendo el nombre de usuario,
 * contraseña, correo electrónico, número de teléfono y rol.
 * 
 * @model AuthModel
 * @interface AuthInterface
 */
export const AuthModel = sequelize.define<AuthInterface>('auth', {

  /**
   * Identificador único del usuario (clave primaria).
   * Se genera automáticamente de manera incremental.
   */
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  /**
   * Nombre de usuario único.
   * Este campo es obligatorio y no puede ser nulo.
   */
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  /**
   * Contraseña del usuario.
   * Este campo es obligatorio y no puede ser nulo.
   */
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  /**
   * Dirección de correo electrónico única del usuario.
   * Este campo es obligatorio y no puede ser nulo.
   */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  /**
   * Número de teléfono del usuario.
   * Este campo es opcional y puede ser nulo.
   * Es único para cada usuario si se proporciona.
   */
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, // El campo puede ser nulo
    unique: true,
  },

  /**
   * Rol del usuario en la aplicación (ej. 'admin', 'user', etc.).
   * Este campo es obligatorio y no puede ser nulo.
   */
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
