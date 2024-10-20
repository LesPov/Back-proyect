import { DataTypes, Model } from 'sequelize';
import { TipoDenunciaModel } from './tipoDenunciaModel';
import sequelize from "../../../../database/connnection";
import { SubtipoDenunciaModel } from './subtipoDenunciaModel ';

// Interfaz para Denuncias Anónimas
export interface DenunciaAnonimaInterface extends Model {
  id: number;
  tipoDenunciaId: number;
  subtipoDenunciaId: number;
  descripcion: string;
  pruebas: boolean;
  evidenciasMultimedia?: string; 
  audio?: string;
  direccion: string;
  latitud: number;
  longitud: number;
  keyAnonima: string;
  status: 'pendiente' | 'en proceso' | 'resuelta' | 'rechazada';
  createdAt?: Date;
  updatedAt?: Date;
}

// Definición del modelo para Denuncias Anónimas
export const DenunciaAnonimaModel = sequelize.define<DenunciaAnonimaInterface>('DenunciaAnonima', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoDenunciaId: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoDenunciaModel,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  subtipoDenunciaId: {
    type: DataTypes.INTEGER,
    references: {
      model: SubtipoDenunciaModel,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pruebas: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  evidenciasMultimedia: {
    type: DataTypes.TEXT, // Cambiado a TEXT para almacenar JSON
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('evidenciasMultimedia');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value: string[]) {
      this.setDataValue('evidenciasMultimedia', JSON.stringify(value));
    },
  },
  audio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitud: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  keyAnonima: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'en proceso', 'resuelta', 'rechazada'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
}, {
  tableName: 'denuncias_anonimas',
  timestamps: true,
});

// Establecer relaciones
TipoDenunciaModel.hasMany(DenunciaAnonimaModel, { foreignKey: 'tipoDenunciaId' });
DenunciaAnonimaModel.belongsTo(TipoDenunciaModel, { foreignKey: 'tipoDenunciaId' });

SubtipoDenunciaModel.hasMany(DenunciaAnonimaModel, { foreignKey: 'subtipoDenunciaId' });
DenunciaAnonimaModel.belongsTo(SubtipoDenunciaModel, { foreignKey: 'subtipoDenunciaId' });