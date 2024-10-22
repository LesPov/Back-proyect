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
    pruebas?: string; // Columna opcional para archivos multimedia (imágenes o videos)
    audio?: string; // Columna opcional para archivos de audio
    tieneEvidencia: boolean; // Indica si la denuncia tiene pruebas (imágenes, videos o audio)
  }

// Definición del modelo para Denuncias Anónimas
// Modificación del modelo para agregar columnas opcionales
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
      defaultValue: 'Pendiente',
    },
    tipoDenunciaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tipos_denuncias',
        key: 'id',
      },
      allowNull: false,
    },
    subtipoDenunciaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subtipos_denuncias',
        key: 'id',
      },
      allowNull: false,
    },
    claveUnica: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pruebas: {
      type: DataTypes.STRING,
      allowNull: true, // Opcional, aquí almacenarías la ruta o nombre del archivo multimedia
    },
    audio: {
      type: DataTypes.STRING,
      allowNull: true, // Opcional, aquí almacenarías la ruta o nombre del archivo de audio
    },
    tieneEvidencia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Por defecto será false
    },
  }, {
    tableName: 'denuncias_anonimas',
    timestamps: true,
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
