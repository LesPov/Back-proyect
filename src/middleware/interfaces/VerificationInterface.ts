import { Model } from "sequelize";

/**
 * Interfaz para el modelo de verificación de usuarios.
 * Representa la estructura de la tabla `verification` en la base de datos.
 */
export interface VerificationInterface extends Model {
  
  /** Identificador único para la verificación (clave primaria). */
  id: number;
  
  /** Indicador de si el usuario está verificado en general. */
  isVerified: boolean;
  
  /** Indicador de si el correo electrónico del usuario ha sido verificado. */
  isEmailVerified: boolean;
  
  /** Código de verificación generado para el usuario. */
  verificationCode: string;
  
  /** Contador de intentos fallidos de inicio de sesión. */
  loginAttempts: number;
  
  blockExpiration:Date;
  /** Fecha y hora de expiración del código de verificación. */
  verificationCodeExpiration: Date;
  
  /** Contraseña aleatoria generada para el usuario, si es necesario. */
  randomPassword: string;
  
  /** Indicador de si el número de teléfono del usuario ha sido verificado. */
  isPhoneVerified: boolean;
}
