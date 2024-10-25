
export const successMessages = {
    // Éxitos de registro
    userRegistered: (username: string, rol: string) => `Usuario ${rol} ${username} se registró exitosamente!`,
  
    // Éxitos de inicio de sesión
    userLoggedIn: 'Inicio de sesión exitoso',
  
    // Éxitos de verificación de usuario
    userVerified: 'Correo verificado exitosamente, ahora verifica tu número celular',
  
    // Éxitos de envío de código de verificación por SMS
    verificationCodeSent: 'El código de verificación ha sido enviado por whatsaap',
  
    // Éxitos de reenvío de código de verificación por correo electrónico
    verificationCodeResent: 'El código de verificación ha sido reenviado exitosamente por correo electrónico',
  
    // Éxitos de verificación de número de teléfono
    phoneVerified: 'Número de teléfono verificado exitosamente, ahora ya puedes iniciar sesión',
  
    // Éxitos de recuperación y cambio de contraseña
    passwordResetEmailSent:() => 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.',
  
    passwordUpdated:() => 'Contraseña actualizada con éxito.',
  
    profilePictureUploaded: 'la imagen fue actualizada',

      // Éxito de creación de denuncia
      denunciaCreada: 'Denuncia creada exitosamente.',
  
      consultaExitosa: 'Consulta realizada exitosamente',
      denunciaEncontrada: 'Denuncia encontrada correctamente'
  };