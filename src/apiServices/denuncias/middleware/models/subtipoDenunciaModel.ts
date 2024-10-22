import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../../database/connnection';
import { TipoDenunciaModel } from './tipoDenunciaModel';

// Interfaz para SubtipoDenuncia
export interface SubtipoDenunciaInterface extends Model {
  id: number;
  nombre: string;
  descripcion: string;
  tipoDenunciaId: number;
  flagImage: string;  
 
} 

// Definición del modelo para Subtipos de Denuncias
export const SubtipoDenunciaModel = sequelize.define<SubtipoDenunciaInterface>('SubtipoDenuncia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  flagImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipoDenunciaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tipos_denuncias',
      key: 'id',
    },
    onDelete: 'CASCADE', // Eliminar subtipo si el tipo de denuncia se elimina
  },
}, {
  tableName: 'subtipos_denuncias',
  timestamps: true, // No agregamos createdAt y updatedAt
});

// Definir la relación entre Tipos de Denuncias y Subtipos de Denuncias
TipoDenunciaModel.hasMany(SubtipoDenunciaModel, {
  foreignKey: 'tipoDenunciaId',

});
SubtipoDenunciaModel.belongsTo(TipoDenunciaModel, {
  foreignKey: 'tipoDenunciaId',

});
 