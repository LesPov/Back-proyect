import { Model } from 'sequelize';
import { AuthInterface } from '../../../../../middleware/interfaces/authInterface';

// Modelo para el perfil de usuario
export interface UserProfileinterface extends Model {
  auth: AuthInterface;
  id: number;
  userId: number;
  profilePicture: string | null;
  firstName: string;
  lastName: string;
  biography: string | null;
  direccion: string | null;
  profileType: boolean;
  messageType: boolean;
  status: 'Activado' | 'Desactivado'; // Nueva columna 'status'v 

}