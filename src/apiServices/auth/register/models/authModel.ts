import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/connnection';
import { AuthInterface } from '../Interfaces/authInterface';



export const AuthModel = sequelize.define<AuthInterface>('auth', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, // Asegúrate de que el campo pueda ser nulo
    unique: true,
  }, 
  rol: {
    type: DataTypes.ENUM('admin', 'user', 'moderator'),
    allowNull: false,
  },
  
});
