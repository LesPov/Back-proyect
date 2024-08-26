import { Model } from "sequelize";

// Modelo para la verificación de usuarios
export interface VerificationInterface extends Model {
    id: number;
    isVerified: boolean;
    isEmailVerified: boolean;
    verificationCode: string;
    loginAttempts: number;
    verificationCodeExpiration: Date;
    randomPassword: string;
    isPhoneVerified: boolean;
  }