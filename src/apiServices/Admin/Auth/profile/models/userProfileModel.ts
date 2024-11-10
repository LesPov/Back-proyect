import { DataTypes } from "sequelize";
import sequelize from "../../../../../database/connnection";
import { UserProfileinterface } from "../interfaces/userProfileInterface";
import { AuthModel } from "../../../../../middleware/models/authModel";

export const UserProfileModel = sequelize.define<UserProfileinterface>('userProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'auth',
      key: 'id',
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  
status: {
    type: DataTypes.ENUM('Activado', 'Desactivado'), // Define un enum para limitar los valores posibles
    allowNull: false,
    defaultValue: 'Activado', // Puedes establecer el valor predeterminado según tus necesidades
  },
});

// Relación entre Auth (usuario) y UserProfile (perfil de usuario)
AuthModel.hasOne(UserProfileModel, { foreignKey: 'userId' });
UserProfileModel.belongsTo(AuthModel, { foreignKey: 'userId' });
