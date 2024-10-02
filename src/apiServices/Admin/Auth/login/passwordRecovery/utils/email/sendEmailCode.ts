import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

/**
 * Envía un correo de verificación con un código personalizado.
 * 
 * Esta función lee una plantilla de correo electrónico desde un archivo HTML, 
 * personaliza el contenido con el nombre de usuario y el código de verificación, 
 * y envía el correo electrónico utilizando Nodemailer. Si el envío es exitoso, 
 * la función devuelve true; de lo contrario, devuelve false.
 * 
 * @param {string} email - Dirección de correo electrónico del destinatario.
 * @param {string} username - Nombre de usuario asociado al correo.
 * @param {string} verificationCode - Código de verificación generado.
 * @returns {Promise<boolean>} - Devuelve una promesa que resuelve en true si el correo se envía con éxito, o false en caso de error.
 */
export const sendPasswordResetEmailPasswordReset = async (email: string, username: string, randomPassword: string): Promise<boolean> => {
    try {
        // Construye la ruta absoluta del archivo de plantilla de correo electrónico
        const templatePath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Auth', 'login', 'passwordRecovery', 'templates', 'randomPasswordEmail.html');
        // Lee la plantilla de correo electrónico desde el archivo
        const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

        // Personaliza la plantilla reemplazando los marcadores {{ username }} y {{ verificationCode }} con los valores reales
        const personalizedEmail = emailTemplate
            .replace('{{ username }}', username)
            .replace('{{ randomPassword }}', randomPassword);

        // Configura el transporte de Nodemailer para enviar el correo electrónico
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Utiliza el servicio de Gmail para enviar el correo
            auth: {
                user: process.env.MAIL_USER, // Usuario de Gmail para autenticación
                pass: process.env.MAIL_PASS, // Contraseña de Gmail para autenticación
            },
            secure: true, // Usa TLS para la seguridad de la conexión
        });
        // Registra en la consola el código de verificación enviado
        console.log('Código de verificación enviado:', randomPassword);

        // Define las opciones del correo electrónico
        const mailOptions = {
            from: process.env.MAIL_USER, // Dirección de correo electrónico del remitente
            to: email, // Dirección de correo electrónico del destinatario
            subject: 'Recuperación de Contraseña',
            html: personalizedEmail, // Contenido del correo electrónico en formato HTML
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);

        // Envía el correo en segundo plano
        setImmediate(async () => {
            try {
                await transporter.sendMail(mailOptions);
                console.log('Correo de verificación enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de verificación:', error);
            }
        });

        // Devuelve inmediatamente el éxito sin esperar al envío del correo
        return true;
    } catch (error) {
        console.error('Error al procesar el envío del correo:', error);
        return false;
    }
};
