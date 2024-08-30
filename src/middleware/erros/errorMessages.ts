export const errorMessages = {
  //Erores en la base de datos:
  databaseError: 'Ocurrió un error al acceder a la base de datos. Por favor, inténtalo nuevamente más tarde.',

  //Errores en la parte de registro:
  requiredFields: 'Todos los campos son obligatorios',
  passwordTooShort: 'La contraseña debe tener al menos 10 caracteres',
  passwordNoNumber: 'La contraseña debe contener al menos un dígito numérico.',
  passwordNoUppercase: 'La contraseña debe contener al menos una letra mayúscula',
  passwordNoLowercase: 'La contraseña debe contener al menos una letra minúscula',
  passwordNoSpecialChar: 'La contraseña debe contener al menos un carácter especial',
  invalidEmail: 'La dirección de correo electrónico no es válida',
  userEmailExists: (email: string) => `El correo electrónico ${email} ya está registrado.`,
  userExists: (username: string) => `El usuario con el nombre ${username} ya existe.`,


  //Errores en la verificaciondeemail:
  userNotFound: (username: string) => `Usuario con nombre de usuario ${username} no encontrado.`,
  userAlreadyVerifiedemail: () => 'El correo electrónico ya ha sido verificado previamente.',
  invalidVerificationCode: () => 'El código de verificación es inválido.',
  verificationCodeExpired: 'El código de verificación ha expirado. Solicita un nuevo código para continuar..',


// Errores de verificación de usuario   
emailNotVerified: () => 'El correo electrónico no ha sido verificado. Verifica tu correo para continuar.',


  userNotExists: (username: string) => `No existe un usuario con el nombre ${username} en la base de datos`,
  invalidPassword: 'Contraseña aleatorea incorrecta, la contraseña aleatoria debe tener exactamente 8 caracteres.',
  invalidPasswordDB: 'La contraseña aleatoria proporcionada no coincide con la almacenada en la base de datos, o no exite',
  userNotVerified: 'El usuario aún no ha sido verificado. Verifica tu correo electrónico para activar tu cuenta.',
  numberNotVerified: 'El usuario aún no ha sido verificado. Verifica tu numero celular para activar tu cuenta.',
  accountLocked: 'La cuenta está bloqueada temporalmente debido a múltiples intentos fallidos. Inténtalo de nuevo más tarde.',
  failedPasswordReset: 'loll',
  accountLockedv1: (timeLeft: string) => `La cuenta está bloqueada temporalmente debido a múltiples intentos fallidos. Inténtalo de nuevo más tarde. Tiempo restante: ${timeLeft} minutos.`,
  incorrectPassword: (attempts: number) => ` Contraseña incorrecta. Intentos fallidos: ${attempts}`,
  verificationCodeNotFound: `Codigo a expirado registrate de nuevo `,
  tokenNotProvided: 'Acceso denegado, token no proporcionado',
  accessDenied: 'Acceso denegado, no tienes permisos para acceder a esta ruta',
  invalidToken: 'Token no válido',
  accessDeniedNoToken: 'Acceso denegado',
  serverError: 'servidor error',
  verificationRecordNotFound: 'eregistro de verificación correspondiente al usuario no encontrada ',
  noVerificationRecord: 'lapapa',
  phoneNumberNotProvided: 'El número de teléfono es obligatorio para enviar el código de verificación por SMS',
  phoneNumberExists: 'El número de teléfono ya ha sido registrado en la base de datos. ingresa otro',
  phoneNumberVerificationError: 'Error al enviar el código de verificación por SMS',
  emailVerificationError: 'Ocurrió un error al reenviar el código de verificación por correo electrónico',
  incorrectPhoneNumber: 'El número de teléfono no coincide con el registrado para este usuario',
  phoneAlreadyVerified: 'El número de teléfono ya ha sido verificado previamente',
  phoneNumberInUse: 'El número de teléfono ya ha sido registrado para este usuario',
  phoneVerificationRequired: 'El usuario aún no ha sido verificado. Verifica tu numero celular para activar tu cuenta.',
  verificadoVericationRequired: 'El usuario aún no ha sido verificado. Verifica tu numero celular y correo para activar tu cuenta.',

  missingUsernameOrEmail: 'Todos los campos son obligatorios',

  passwordValidationFailed: 'La contraseña no cumple con los requisitos de validación',

  unverifiedAccount: 'Tu correo electrónico o número teléfono no han sido verificados.',
  invalidRandomPassword: 'Contraseña aleatoria incorrecta',
  invalidNewPassword: 'contraseña lol',
  invalidRandomPassworde: 'ya expiro la contraseña',
  incorrectPasswordWithAttempts: 'se requiere la contraseña normal',
  incorrectRandomPassword: 'la contraseña no es valida',
  userAlreadyVerifiedInvalidCode: 'El usuario ya está verificado, pero el código proporcionado es incorrecto.',

  expiredPassword: 'la contraseña ya expìro manito',
  passwordNoSpecialChar1: 'La contraseña debe contener al menos uno de los siguientes signos: & $ @ _ - /',
  errorMessages: 'Error al subir img',
  expiredVerificationCode: 'La contraseña aleatoria ha expirado. Por favor, solicite una nueva.',
  accountBlocked: 'cuenata vloqueada',
  invalidRandomPasswordLength: 'la contraseña aleatorea debe ser de 8 digitos',
  incorrectPasswor1d: 'Contraseña incorrecta',
  expiredRandomPassword: 'La contraseña aleatoria ha expirado',
};
