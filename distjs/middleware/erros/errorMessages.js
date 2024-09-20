"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessages = void 0;
exports.errorMessages = {
    ///Erores en la base de datos:
    databaseError: 'Ocurrió un error al acceder a la base de datos. Por favor, inténtalo nuevamente más tarde.',
    ///Errores en la parte de registro:
    requiredFields: 'Todos los campos son obligatorios',
    passwordTooShort: 'La contraseña debe tener al menos 10 caracteres',
    passwordNoNumber: 'La contraseña debe contener al menos un dígito numérico.',
    passwordNoUppercase: 'La contraseña debe contener al menos una letra mayúscula',
    passwordNoLowercase: 'La contraseña debe contener al menos una letra minúscula',
    passwordNoSpecialChar: 'La contraseña debe contener al menos un carácter especial',
    invalidEmail: 'La dirección de correo electrónico no es válida',
    userEmailExists: (email) => `El correo electrónico ${email} ya está registrado.`,
    userExists: (username) => `El usuario con el nombre ${username} ya existe.`,
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///Errores en la verificacionDelEmail:
    userNotFound: (username) => `Usuario con nombre ${username} no encontrado en la base de datos.`,
    userAlreadyVerifiedemail: () => 'El correo electrónico ya ha sido verificado previamente.',
    invalidVerificationCode: () => 'El código de verificación es inválido.',
    verificationCodeExpired: 'El código de verificación ha expirado. Solicita un nuevo código para continuar..',
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///Errores de verificación de usuario   
    emailNotVerified: () => 'El correo electrónico no ha sido verificado. Verifica tu correo para continuar.',
    phoneNumberExists: 'El número de teléfono ya ha sido registrado en la base de datos. ingresa otro',
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///Errores de phone 
    incorrectPhoneNumber: () => 'El número de teléfono no coincide con el registrado para este usuario',
    //Error de bloqueo
    accountBlocked: (remainingTime) => `La cuenta está bloqueada temporalmente. Intente nuevamente en ${remainingTime} minutos.`,
    maxAttemptsReached: 'Has alcanzado el máximo número de intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.',
    //passwords 
    incorrectPassword: (attempts) => ` Contraseña incorrecta. te quedan: ${attempts} intentos`,
    //expiracion de codigo 
    expiredVerificationCode: () => 'La contraseña aleatoria ha expirado. Por favor, solicite una nueva.',
    phoneCodeVerify: () => 'El numero de telefono no ha sido verificado',
    numberNotVerified: () => 'El usuario aún no ha sido verificado. Verifica tu numero celular para activar tu cuenta.',
    invalidRandomPassword: () => 'Contraseña aleatoria incorrecta',
    incorrectPasswor1d: () => 'Contraseña incorrecta',
    phoneAlreadyVerified: () => 'El número de teléfono ya ha sido verificado previamente', //Login
    //resentpasswordrestLogin
    unverifiedAccount: () => 'Tu correo electrónico o número teléfono no han sido verificados.',
    //requestPassword 
    // Errores de validación de roles y tokens
    tokenNotProvided: 'Acceso denegado, token no proporcionado',
    accessDenied: 'Acceso denegado, no tienes permisos para acceder a esta ruta',
    invalidToken: 'Token no válido',
    accessDeniedNoToken: 'Acceso denegado',
    serverError: 'servidor error',
    ////////////////////imagenes msg de errror ////////////////
    noFileUploaded: 'Acesso denegado ussuraio ahi un archivo xd',
    userProfileNotFound: 'Perfil de usuario no encontrado',
    invalidImageFormat: 'Formato de imagen inválido. Por favor, sube una imagen válida en formato JPG, JPEG, PNG o GIF',
    unexpectedError: 'Ocurrió un error inesperado al procesar la imagen',
    serverErrorr: 'Error interno del servidor al procesar la imagen',
};
