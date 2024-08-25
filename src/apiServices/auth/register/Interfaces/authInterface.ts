import {  Model } from 'sequelize';

// Modelo para la autenticación de usuarios
export interface AuthInterface extends Model {
  [x: string]: any;

  id: number;
  username: string;
  password: string;
  email: string;
  rol: string;
}