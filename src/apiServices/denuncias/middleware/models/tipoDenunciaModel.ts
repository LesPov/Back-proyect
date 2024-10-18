import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../database/connnection";

// Interfaz para TipoDenuncia
export interface TipoDenunciaInterface extends Model {
    id: number;
    nombre: string;
    descripcion?: string;
    esAnonimaOficial: 'Anónima' | 'Oficial' | 'Ambas';
  }
  
  // Definición del modelo para Tipos de Denuncias
  export const TipoDenunciaModel = sequelize.define<TipoDenunciaInterface>('TipoDenuncia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    esAnonimaOficial: {
      type: DataTypes.ENUM('Anónima', 'Oficial', 'Ambas'),
      allowNull: false,
    },
  }, {
    tableName: 'tipos_denuncias',
    timestamps: true, // No agregamos las columnas createdAt y updatedAt
  });