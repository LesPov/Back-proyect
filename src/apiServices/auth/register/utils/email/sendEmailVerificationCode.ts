import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
/**
 * Envía un correo de verificación con un código personalizado.
 * @param {string} email - Dirección de correo electrónico del destinatario.
 * @param {string} username - Nombre de usuario asociado al correo.
 * @param {string} verificationCode - Código de verificación generado.
 * @returns {boolean} - True si el correo se envía con éxito, False si hay un error.
 */
export const sendVerificationEmail = async (email: string, username: string, verificationCode: string) => {
    try {
        // Obtiene la ruta absoluta del archivo de plantilla de correo electrónico
        const templatePath = path.join(__dirname, '..', '..', '..', '..', '..', 'apiServices', 'Auth', 'register', 'templates', 'verificationEmail.html');
        console.log(__dirname);
        // Lee la plantilla de correo electrónico desde el archivo
        const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

        // Reemplaza los marcadores {{ username }} y {{ verificationCode }} con los valores reales
        const personalizedEmail = emailTemplate.replace('{{ username }}', username).replace('{{ verificationCode }}', verificationCode);

        // Crea un transporte de nodemailer para reutilizarlo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: true,
        });

        // Registra en la consola el código de verificación enviado
        console.log('Código de verificación enviado:', verificationCode);

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Verificación de correo electrónico',
            html: personalizedEmail, // Utiliza el contenido personalizado en el cuerpo del correo
        };

        // Envía el correo de verificación
        await transporter.sendMail(mailOptions);

        return true; // Indica que el correo de verificación se envió con éxito
    } catch (error) {
        console.error('Error al enviar el correo de verificación:', error);
        return false; // Indica que hubo un error al enviar el correo de verificación
    }
};