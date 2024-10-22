import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../../database/connnection';
import { TipoDenunciaModel } from './tipoDenunciaModel';
import { SubtipoDenunciaModel } from './subtipoDenunciaModel';
import { randomBytes } from 'crypto'; // Para generar la clave única

// Interfaz para DenunciaAnonima
export interface DenunciaAnonimaInterface extends Model {
  id: number;
  descripcion: string;
  direccion: string;
  status: 'Pendiente' | 'En Proceso' | 'Cerrada'; // Estado de la denuncia
  tipoDenunciaId: number; // Relación con TipoDenuncia
  subtipoDenunciaId: number; // Relación con SubtipoDenuncia
  claveUnica: string; // Nueva columna para la clave única
  pruebas?: string; // Columna de pruebas, opcional
}

// Definición del modelo para Denuncias Anónimas
export const DenunciaAnonimaModel = sequelize.define<DenunciaAnonimaInterface>('DenunciaAnonima', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Cerrada'),
    allowNull: false,
    defaultValue: 'Pendiente', // Todas las denuncias empiezan como pendientes
  },
  tipoDenunciaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tipos_denuncias', // Relación con TipoDenuncia
      key: 'id',
    },
    allowNull: false,
  },
  subtipoDenunciaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'subtipos_denuncias', // Relación con SubtipoDenuncia
      key: 'id',
    },
    allowNull: false,
  },
  claveUnica: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que cada clave es única
  },
  pruebas: {
    type: DataTypes.STRING,
    allowNull: true, // Esta columna es opcional
  },
}, {
  tableName: 'denuncias_anonimas',
  timestamps: true, // Para createdAt y updatedAt
});

// Relación entre DenunciaAnonima y TipoDenuncia
TipoDenunciaModel.hasMany(DenunciaAnonimaModel, {
  foreignKey: 'tipoDenunciaId',
});
DenunciaAnonimaModel.belongsTo(TipoDenunciaModel, {
  foreignKey: 'tipoDenunciaId',
});

// Relación entre DenunciaAnonima y SubtipoDenuncia
SubtipoDenunciaModel.hasMany(DenunciaAnonimaModel, {
  foreignKey: 'subtipoDenunciaId',
});
DenunciaAnonimaModel.belongsTo(SubtipoDenunciaModel, {
  foreignKey: 'subtipoDenunciaId',
});
