// validateRandomPassword.ts
export const validateRandomPassword = async (user: any, randomPassword: string): Promise<boolean> => {
    return randomPassword === user.verification.randomPassword;
};

// validateStoredPassword.ts
import bcrypt from 'bcryptjs';

export const validateStoredPassword = async (user: any, storedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(storedPassword, user.password);
};

// validatePassword.ts
export const validatePassword = async (user: any, password: string): Promise<boolean> => {
    // Si la longitud de la contraseña es de 8 caracteres, se trata de una contraseña aleatoria
    if (password.length === 8) {
        return await validateRandomPassword(user, password);
    } else {
        return await validateStoredPassword(user, password);
    }
};
